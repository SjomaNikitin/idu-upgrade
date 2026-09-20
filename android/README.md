# IDU2 for Android

Native Kotlin WebView shell for the same IDU site and Cloudflare assets used by
the iOS application. No widgets or native schedule bridge are included.

## Run

Open this `android` directory in Android Studio, let Gradle sync, select an
Android device/emulator, and press Run. Requires Android 8.0 (API 26) or later
and an up-to-date Android System WebView/Chrome with document-start scripting.

Build from this directory with an Android SDK configured through `ANDROID_HOME`
or Android Studio's generated `local.properties`:

```sh
./gradlew :app:assembleDebug :app:lintDebug
```

The build uses Java 17 (install it or select it as the Gradle JDK in Android
Studio), Android SDK 36, Gradle 8.13, and Android Gradle Plugin 8.11.1.
The APK is `app/build/outputs/apk/debug/app-debug.apk`.
The initial application ID is `pl.edu.idu.upgrade`.

## Loading sequence

1. Register the platform bootstrap at document start, for the main frame only.
2. Fetch `content.js` and `styles.css` concurrently from the exact URLs in the
   iOS `AppConfig.swift`. Each request uses a 15-second connection/read timeout,
   validates HTTP success and UTF-8, and atomically saves its last successful
   response in the app's private `RemoteAssets` directory. Failures use disk,
   then the current `dist` assets packaged in the APK on a fresh installation.
3. Once both assets are available, register the CSS installer, then the complete
   JavaScript bundle, using `WebViewCompat.addDocumentStartJavaScript`.
4. Only after registration, navigate directly to `https://idu.edu.pl`.
5. For each new document, run bootstrap → CSS installer → content bundle.
   CSS waits for `<head>` if necessary. On `DOMContentLoaded`, move the custom
   style to the end of `<head>`, exactly as iOS does, before the content bundle's
   DOM-ready handlers. The bundle keeps the ordering produced by
   `scripts/release.js`; Android does not split or rebuild it.

If Chromium starts scripting before `<html>` exists, the content runner waits
for that node with a MutationObserver. It does not wait for page completion.
If an asset has neither a network response nor a saved copy, Android uses the
version packaged from the repository's `dist` directory. The original website
is loaded only if all three sources fail. These fallbacks cover injected
assets, not offline access to the IDU website.

The document-start feature is required; unsupported WebViews show an update
message instead of changing injection timing. Scripts are restricted to the
main frame on `https://idu.edu.pl` and its HTTPS tenant subdomains such as
`s35.idu.edu.pl`. HTTP and HTTPS redirects stay inside the WebView; telephone
and email links open their corresponding Android apps.

Android sets `data-app-platform="android"` and `android-app`. Native window
insets keep the WebView clear of system bars and the keyboard, so it does not
reuse iOS's extra top padding. Login cookies and DOM storage persist in WebView.
The launcher icon is copied from the existing iOS app.

JavaScript behavior checks, from the repository root:

```sh
node --test android/tests/document-scripts.test.mjs
```

Before release, test on a device: login, remembered session after reopening,
page navigation/back, themes, keyboard, rotation, and a warm-cache asset-host
failure. Remote assets remain updated through the existing `npm run publish`
workflow; creating/building the Android project does not publish them.
