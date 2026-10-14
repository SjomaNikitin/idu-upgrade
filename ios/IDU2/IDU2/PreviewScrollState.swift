import Foundation

struct PreviewScrollState {
    private(set) var isHidden = false
    private var lastOffset: Double = 0

    mutating func reset(offset: Double) {
        lastOffset = max(0, offset)
        isHidden = false
    }

    mutating func update(offset: Double) {
        let currentOffset = max(0, offset)
        let delta = currentOffset - lastOffset
        // Match the custom header: reveal near the top, ignore tiny movements.
        if currentOffset <= 12 {
            isHidden = false
            lastOffset = currentOffset
        } else if delta > 6 {
            isHidden = true
            lastOffset = currentOffset
        } else if delta < -6 {
            isHidden = false
            lastOffset = currentOffset
        }
    }
}
