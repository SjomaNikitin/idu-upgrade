import UIKit
import WebKit

final class FilePreviewWebView: WKWebView {
    var onSafeAreaInsetsChange: (() -> Void)?
    private(set) var isFilePreview = false

    private let closeButton = UIButton(type: .system)
    private var scrollState = PreviewScrollState()
    private var scrollObservation: NSKeyValueObservation?
    private var historyObservation: NSKeyValueObservation?

    override init(frame: CGRect, configuration: WKWebViewConfiguration) {
        super.init(frame: frame, configuration: configuration)
        configurePreviewButton()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configurePreviewButton()
    }

    private func configurePreviewButton() {
        var buttonConfiguration = UIButton.Configuration.plain()
        // This asset uses the same SVG path as the website's Settings close icon.
        buttonConfiguration.image = UIImage(named: "PreviewClose")?.withRenderingMode(.alwaysTemplate)
        buttonConfiguration.baseForegroundColor = .label
        buttonConfiguration.background.backgroundColor = .secondarySystemBackground
        buttonConfiguration.background.cornerRadius = 24
        buttonConfiguration.background.strokeColor = .separator
        buttonConfiguration.background.strokeWidth = 1
        buttonConfiguration.contentInsets = NSDirectionalEdgeInsets(top: 6, leading: 6, bottom: 6, trailing: 6)
        closeButton.configuration = buttonConfiguration
        closeButton.accessibilityLabel = "Zamknij podgląd pliku"
        closeButton.accessibilityHint = "Wraca do poprzedniej strony"
        closeButton.accessibilityIdentifier = "file-preview-close"
        closeButton.addTarget(self, action: #selector(closePreview), for: .touchUpInside)
        closeButton.isHidden = true
        addSubview(closeButton)

        // Observe the public scroll view without replacing WebKit's delegate.
        scrollObservation = scrollView.observe(\.contentOffset, options: [.new]) { [weak self] _, _ in
            guard let self, self.isFilePreview else { return }
            let wasHidden = self.scrollState.isHidden
            self.scrollState.update(offset: self.previewScrollOffset)
            if self.scrollState.isHidden != wasHidden {
                self.updatePreviewButton(animated: true)
            }
        }
        historyObservation = observe(\.canGoBack, options: [.new]) { [weak self] _, _ in
            self?.updatePreviewButton(animated: false)
        }
    }

    func setFilePreview(_ enabled: Bool) {
        isFilePreview = enabled
        scrollState.reset(offset: previewScrollOffset)
        updatePreviewButton(animated: false)
        setNeedsLayout()
    }

    private var previewScrollOffset: Double {
        let inset = scrollView.adjustedContentInset
        let maximum = max(0, scrollView.contentSize.height - scrollView.bounds.height + inset.top + inset.bottom)
        // Ignore rubber-band movement at either end of a document.
        return Double(min(max(0, scrollView.contentOffset.y + inset.top), maximum))
    }

    private func updatePreviewButton(animated: Bool) {
        let available = isFilePreview && canGoBack
        let hidden = !available || scrollState.isHidden
        closeButton.isHidden = !available
        closeButton.isUserInteractionEnabled = !hidden
        closeButton.accessibilityElementsHidden = hidden
        let transform = hidden
            ? CGAffineTransform(translationX: 0, y: -(safeAreaInsets.top + 64))
            : .identity
        let updates = {
            self.closeButton.alpha = hidden ? 0 : 1
            self.closeButton.transform = transform
        }
        if animated && !UIAccessibility.isReduceMotionEnabled {
            UIView.animate(withDuration: 0.22, delay: 0,
                           options: [.beginFromCurrentState, .allowUserInteraction, .curveEaseInOut],
                           animations: updates)
        } else {
            updates()
        }
    }

    @objc private func closePreview() {
        guard isFilePreview, canGoBack else { return }
        goBack()
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        // Place the control outside the scrolling content and below the notch.
        // Set bounds/center so layout remains correct during a hide animation.
        closeButton.bounds = CGRect(x: 0, y: 0, width: 48, height: 48)
        closeButton.center = CGPoint(x: bounds.width - safeAreaInsets.right - 32,
                                     y: safeAreaInsets.top + 32)
        bringSubviewToFront(closeButton)
    }

    override func safeAreaInsetsDidChange() {
        super.safeAreaInsetsDidChange()
        onSafeAreaInsetsChange?()
        updatePreviewButton(animated: false)
        setNeedsLayout()
    }
}
