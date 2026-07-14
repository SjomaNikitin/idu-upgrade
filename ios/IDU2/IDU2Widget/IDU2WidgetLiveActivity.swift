//
//  IDU2WidgetLiveActivity.swift
//  IDU2Widget
//
//  Created by Szymon Nikitin on 14/07/2026.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct IDU2WidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct IDU2WidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: IDU2WidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension IDU2WidgetAttributes {
    fileprivate static var preview: IDU2WidgetAttributes {
        IDU2WidgetAttributes(name: "World")
    }
}

extension IDU2WidgetAttributes.ContentState {
    fileprivate static var smiley: IDU2WidgetAttributes.ContentState {
        IDU2WidgetAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: IDU2WidgetAttributes.ContentState {
         IDU2WidgetAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: IDU2WidgetAttributes.preview) {
   IDU2WidgetLiveActivity()
} contentStates: {
    IDU2WidgetAttributes.ContentState.smiley
    IDU2WidgetAttributes.ContentState.starEyes
}
