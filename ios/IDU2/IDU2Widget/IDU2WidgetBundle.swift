//
//  IDU2WidgetBundle.swift
//  IDU2Widget
//
//  Created by Szymon Nikitin on 14/07/2026.
//

import WidgetKit
import SwiftUI

@main
struct IDU2WidgetBundle: WidgetBundle {
    var body: some Widget {
        IDU2Widget()
        IDU2WidgetControl()
        IDU2WidgetLiveActivity()
    }
}
