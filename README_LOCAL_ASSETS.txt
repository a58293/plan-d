This package has been updated to use local assets.

What changed:
- Fonts now load from /public/fonts/*.ttf
- Images now load from /public/images/** instead of a remote CDN
- Home page no longer prefetches whole sections on mount
- Only the first visible image uses eager/high priority on gallery pages
- Graphic detail page no longer preloads adjacent images or hidden cache images
- Mobile skips color extraction on detail view to reduce image work

Before pushing to GitHub:
1. Put your images under public/images/
2. Keep the filenames and folder structure referenced in src/content.ts
3. If your optimized files use names like 01x200.webp instead of 01.webp, update src/content.ts to match, or rename the files.
4. Fonts are currently:
   - public/fonts/Genkaimincho.ttf
   - public/fonts/NamiLaoSong-A-subset.ttf
