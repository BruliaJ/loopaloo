# Loopaloo: notes for Claude

A cursive handwriting game for kids. One static page built from `src/` (see README.md).

## Build and check
- Edit files in `src/` only, then run `cd src && bash build.sh`. That regenerates `index.html` (website and app) and `loopaloo-artifact.html` (Claude preview, git-ignored).
- Test at a small phone size (iPhone SE) as well as desktop. Buttons must stay reachable and every screen needs a way back to the map or into play.
- Pushing to `main` deploys the website on Vercel.

## Product decisions to keep
- Never ask for or store a child's name or other personal info. "Practice a name" is optional and is not saved.
- No ads, analytics, tracking, outside links or sign-in (App Store Kids category rules).
- Letter shapes follow the Zaner-Bloser-based school model (Playwrite US Trad as the reference); capital H has a plain crossbar.

## ⚠️ Before the App Store release: remove voice input
The owner decided the App Store version should have **no voice input**, so the app collects no audio and the privacy label can say "Data Not Collected". Keep voice on the website for now.

When preparing the App Store build:
1. In `src/page.html`, set `const VOICE_INPUT=false;` (this hides every 🎤 button and never starts dictation or speech recognition).
2. Remove the `dictation` capability when publishing the Claude preview, if one is still published.
3. Update `privacy.html` to drop the microphone section, and make sure no microphone usage text is added to the iOS `Info.plist`.
4. Confirm with the owner whether read-aloud (on-device text-to-speech, the 🔊 buttons) should stay. It sends nothing off the device.
