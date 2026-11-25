# Weave

Your tasks as a web of sewn-on buttons. Bigger buttons are due sooner, triangles are important,
and threads join related tasks. Tap or hover a button to tug the web; pinch, scroll or use the
tape measure to zoom.

Jot down all your daily tasks in Weave's web, keeping you up to date but still allowing for flexibility. Large buttons indicate urgency, so you can stay on top of upcoming deadlines. Tasks are grouped by category to help you stay organized. With this circular way of viewing your timeline, you can decide which tasks are truly necessary to do instead of rushing to finish everything at once and burning out. 

## Run it

Visit: https://des112-f26.github.io/weave-site/

## Tools
Weave was created using Claude Design and Claude Code. After researching and sketching, I used Claude design to build and ideate on Weave's interface, building and improving on the design with every pass. Once satisfied, I switched over to Claude Code to push it onto Github. 

## Files

- `index.html`: page shell and the app template
- `css/app.css`: styles, including the responsive layout
- `js/runtime.js`: tiny renderer for the template (no dependencies)
- `js/app.js`: the app's logic (tasks, palettes, sounds, zoom, touch)
- `js/main.js`: starts the app with its default settings (palette, labels, hover nudge)
- `assets/`: app icons, and needle cursor images (needle cursor is currently switched off)
- `manifest.webmanifest`: lets phones add Weave to the home screen

Fonts load from Google Fonts; everything else is local.
