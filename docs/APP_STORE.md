# Shipping Loopaloo to the App Store (and Google Play)

Loopaloo is one web page (`index.html`) built from `src/`. The same build runs on the website (Vercel) and inside the app, which [Capacitor](https://capacitorjs.com) wraps as a native iPhone/iPad and Android app.

## Already done in this repo
- Fonts, icons and the game are bundled, so the app works with no internet.
- App icon (`icons/icon-1024.png`, square with no transparency, as Apple requires) and home-screen icons.
- Web app manifest and offline service worker (the website can be installed with "Add to Home Screen").
- `capacitor.config.json` (app ID `com.loopaloo.cursive`, which you can change before the first upload) and npm scripts.
- Draft privacy policy (`privacy.html`). **Fill in the date and contact email, and have it reviewed before submitting.**

## One-time setup (needs a Mac)
1. Install Xcode from the Mac App Store and Node.js (LTS) from nodejs.org.
2. Join the Apple Developer Program ($99/year) at developer.apple.com.
3. Clone the repo, then run:
   ```bash
   npm install
   npm run build:www
   npx cap add ios
   ```
   Commit the new `ios/` folder.
4. In Xcode (`npm run ios` opens it): set your Team under Signing & Capabilities, add `icons/icon-1024.png` to the AppIcon asset, and set the display name to Loopaloo.

## Before the first App Store release
- **Turn off voice input:** set `const VOICE_INPUT=false;` in `src/page.html` and rebuild. This was decided so the app collects no audio. Then update `privacy.html` to remove the microphone section. See `CLAUDE.md`.

## Every release
1. Make changes in `src/`, then run `npm run ios` (rebuilds, syncs and opens Xcode).
2. Bump `VERSION` in `sw.js` and the version and build number in Xcode.
3. Product → Archive → Distribute App → App Store Connect.

## App Store Connect checklist (Kids category)
- **Category:** Education, plus the Kids category (age band 6–8 or 9–11).
- **Privacy policy URL:** host `privacy.html` (it deploys with the website, e.g. `https://<your-site>/privacy.html`).
- **App Privacy ("nutrition label"):** "Data Not Collected", if the voice feature stays as described below.
- **Screenshots:** 6.9" iPhone and 13" iPad, required sizes per Apple.
- **Kids category rules** (App Review Guidelines 1.3 and 5.1.4): no third-party ads or analytics, no outside links or purchases without a parental gate, and nothing personal collected. Loopaloo currently meets these. If you later add purchases, links, a parents' area or sign-in, add a parental gate first.

## Voice input in the app
Planned: voice input is turned off for the App Store version (see above). For reference: the microphone button uses the browser's speech recognition, which is not available inside the iOS app's web view. The game detects this and hides the mic button, so typing still works. To offer voice in the app, add an on-device speech plugin (for example `@capacitor-community/speech-recognition`) with a microphone and speech-recognition usage description in `Info.plist`, and update the privacy policy.

## Google Play (optional)
`npx cap add android`, open with `npm run android`, and build a signed App Bundle in Android Studio. Play's "Designed for Families" program has similar rules to Apple's Kids category.
