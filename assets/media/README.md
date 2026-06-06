# Project media

Drop screenshots and videos for each project into its folder here. Each project's
detail page (in `/projects/`) already references these exact filenames — once the
files exist, the placeholders are replaced automatically (after you swap the markup,
see below).

## Folders

- `99-days-zombie-survival/`
- `nitro-racers/`
- `four-reaction/`
- `strike-master/`
- `pookie-park/`
- `meta-space/`

## Expected files (per folder)

| File            | What it is                          |
|-----------------|-------------------------------------|
| `shot-1.png`    | Screenshot 1                        |
| `shot-2.png`    | Screenshot 2                        |
| `shot-3.png`    | Screenshot 3                        |
| `shot-4.png`    | Screenshot 4                        |
| `gameplay.mp4`  | Gameplay / demo video (optional)    |
| `poster.png`    | Thumbnail shown before video plays  |

`.png`, `.jpg`, or `.webp` all work for screenshots — just match the extension in the HTML.

## How to swap a placeholder for real media

Open the project's page in `/projects/` and find the placeholder block. Each one has a
commented-out example right above it showing exactly what to paste.

**Screenshot** — replace:
```html
<div class="media-frame">
    <div class="media-placeholder">...</div>
</div>
```
with:
```html
<div class="media-frame">
    <img src="../assets/media/PROJECT/shot-1.png" alt="Screenshot 1">
</div>
```

**Video (local file)**:
```html
<div class="media-frame video-frame">
    <video controls poster="../assets/media/PROJECT/poster.png">
        <source src="../assets/media/PROJECT/gameplay.mp4" type="video/mp4">
    </video>
</div>
```

**Video (YouTube)** — usually best for large files, keeps the repo small:
```html
<div class="media-frame video-frame">
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/VIDEO_ID"
            frameborder="0" allowfullscreen></iframe>
</div>
```

> Tip: GitHub repos have file-size limits and Pages has bandwidth limits. For anything
> over ~25 MB, prefer a YouTube embed over committing the `.mp4`.
