python3 - <<'PY'
s=open('page.html').read()
old='${[...new Intl.Segmenter?new Intl.Segmenter("en",{granularity:"grapheme"}).segment(art):art].map(g=>`<span>${typeof g==="string"?g:g.segment}</span>`).join("")}'
if old in s:
    s=s.replace(old,'${graphemes(art).map(g=>`<span>${g}</span>`).join("")}')
    s=s.replace('function wordsHTML(t)','const graphemes=t=>window.Intl&&Intl.Segmenter?[...new Intl.Segmenter("en",{granularity:"grapheme"}).segment(t)].map(g=>g.segment):[...t];\nfunction wordsHTML(t)')
    open('page.html','w').write(s)
g=open('glyphs.js').read()
s=s.replace('/*GLYPHS*/',g).replace('/*GAMES*/',open('games.js').read())
open('../loopaloo-artifact.html','w').write(s)
open('../index.html','w').write('<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light}body{margin:0;font:14px sans-serif}[hidden]{display:none!important}</style></head><body>'+s+'</body></html>')
PY
