# Weave

Your tasks as a web of sewn-on buttons. Bigger buttons are due sooner, triangles are important,
and threads join related tasks. Tap or hover a button to tug the web; pinch, scroll or use the
tape measure to zoom.

## Run it

It's a plain static site with no build step. Open `index.html` through any static server, e.g.

```
python3 -m http.server
```

then visit http://localhost:8000.

## Publish on GitHub Pages

1. Push this folder's contents to a repository (with `index.html` at the top level).
2. In the repo: Settings → Pages → Build and deployment → Deploy from a branch → `main` / root.

All paths are relative, so it also works from a sub-path such as `username.github.io/weave/`.

## Files

- `index.html`: page shell and the app template
- `css/app.css`: styles, including the responsive layout
- `js/runtime.js`: tiny renderer for the template (no dependencies)
- `js/app.js`: the app's logic (tasks, palettes, sounds, zoom, touch)
- `js/main.js`: starts the app with its default settings (palette, labels, hover nudge)
- `assets/`: app icons, and needle cursor images (needle cursor is currently switched off)
- `manifest.webmanifest`: lets phones add Weave to the home screen

Fonts load from Google Fonts; everything else is local.
