# Extension Icons

The extension requires PNG icons in three sizes:
- `icon16.png` - 16x16 pixels
- `icon48.png` - 48x48 pixels
- `icon128.png` - 128x128 pixels

## Quick Generation

You can convert the provided `icon.svg` to PNG using any of these methods:

### Method 1: Online Converter
1. Go to https://cloudconvert.com/svg-to-png
2. Upload `icon.svg`
3. Convert to 128x128, 48x48, and 16x16 sizes
4. Save as `icon128.png`, `icon48.png`, and `icon16.png`

### Method 2: Using ImageMagick (if installed)
```bash
convert icon.svg -resize 128x128 icon128.png
convert icon.svg -resize 48x48 icon48.png
convert icon.svg -resize 16x16 icon16.png
```

### Method 3: Using Inkscape (if installed)
```bash
inkscape icon.svg --export-type=png --export-filename=icon128.png -w 128 -h 128
inkscape icon.svg --export-type=png --export-filename=icon48.png -w 48 -h 48
inkscape icon.svg --export-type=png --export-filename=icon16.png -w 16 -h 16
```

### Temporary Workaround
The extension will still load without proper icons, but the browser will show a default placeholder. The functionality will work perfectly fine!
