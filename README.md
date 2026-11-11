# Loopaloo

A cursive handwriting game for kids. Loopy the snail teaches every lowercase and capital letter stroke by stroke, then joined words, names, and silly stories to read in cursive.

- **Lowercase Lagoon**: all 26 lowercase letters (watch, trace, write on your own, read)
- **Link-Up Lane**: joined words
- **Capital Castle**: all 26 capitals, names, and capitalization rules
- **Story Swamp**: funny stories written in cursive, with reading questions
- **My Words**: type or say your name and any word, and Loopy teaches it
- **Mini-games** per world, where every skin (shell, hat, pen, paper) gives a silly power

It's a single static page (`index.html`) with no build step needed to host it.

## Editing

Source lives in `src/`:
- `glyphs.js`: the cursive letter shapes (centerlines) and word layout
- `games.js`: world backdrops and mini-games
- `page.html`: everything else, with `/*GLYPHS*/` and `/*GAMES*/` placeholders

Rebuild `index.html` after editing:

```bash
cd src && bash build.sh
```

Progress (stars, coins, skins) is saved in the browser's local storage on each device.
