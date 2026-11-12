# Builds the game from src/ into:
#   index.html              - the website (Vercel) and the app (Capacitor), with bundled fonts, icons and offline support
#   loopaloo-artifact.html  - the Claude preview copy (fonts from Google, no service worker)
python3 - <<'PY'
s=open('page.html').read()
for k,f in (('/*GLYPHS*/','glyphs.js'),('/*GAMES*/','games.js'),('/*PALS*/','pals.js')):
    s=s.replace(k,open(f).read())
GOOGLE='<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@600;800;900&family=Playwrite+US+Trad:wght@300;400&display=swap">'
open('../loopaloo-artifact.html','w').write(s.replace('<!--FONTS-->',GOOGLE))
head=('<!doctype html><html lang="en"><head><meta charset="utf-8">'
 '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
 '<meta name="theme-color" content="#7A3FE0"><meta name="description" content="Learn cursive handwriting with friendly pals: trace letters, join words, read silly stories and play mini-games.">'
 '<link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icons/favicon.svg" type="image/svg+xml"><link rel="icon" href="icons/favicon-32.png" sizes="32x32" type="image/png"><link rel="icon" href="favicon.ico" sizes="any">'
 '<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">'
 '<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">'
 '<meta name="apple-mobile-web-app-status-bar-style" content="default"><meta name="apple-mobile-web-app-title" content="Loopaloo">'
 '<style>:root{color-scheme:light}body{margin:0;font:14px sans-serif}[hidden]{display:none!important}</style></head><body>')
tail='<script>if("serviceWorker" in navigator&&location.protocol==="https:")addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}))</script></body></html>'
open('../index.html','w').write(head+s.replace('<!--FONTS-->','<link rel="stylesheet" href="fonts/fonts.css">')+tail)
PY
