import Foundation

@main
enum PreviewScrollStateTests {
    static func main() {
        var state = PreviewScrollState()
        state.reset(offset: 0)
        assert(!state.isHidden, "Visible when opening a preview")
        state.update(offset: 12)
        assert(!state.isHidden, "Always visible near the top")
        state.update(offset: 19)
        assert(state.isHidden, "Scrolling down hides the button")
        state.update(offset: 16)
        assert(state.isHidden, "Small movements must not flicker")
        state.update(offset: 12)
        assert(!state.isHidden, "Returning to the top reveals the button")

        state.reset(offset: 100)
        for offset in [102.0, 104, 106] { state.update(offset: offset) }
        assert(!state.isHidden, "Small movements accumulate up to the threshold")
        state.update(offset: 107)
        assert(state.isHidden, "Slow downward scrolling eventually hides it")
        state.update(offset: 99)
        assert(!state.isHidden, "Scrolling upward reveals it away from the top")
        state.update(offset: 130)
        assert(state.isHidden)
        state.reset(offset: 200)
        assert(!state.isHidden, "Each newly opened preview starts with a visible button")
        state.update(offset: -20)
        assert(!state.isHidden, "Top overscroll stays visible")
        print("Preview scroll-state checks passed")
    }
}
