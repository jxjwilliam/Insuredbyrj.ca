# Color Options for Contact Section Titles

This document records color options for the contact section card titles (Phone, Email, Office Hours).

## Current Primary Color in Use

The project now uses **teal/cyan** as the primary color for fonts and UI elements:

- **RGB**: `rgb(13, 148, 136)`
- **Hex**: `#0D9488`
- **OKLCH**: `oklch(0.55 0.12 180)`
- **HSL**: `hsl(174, 84%, 32%)`
- **CSS Variable**: `--primary-color: rgb(13, 148, 136)`
- **CSS Variable**: `--primary: oklch(0.55 0.12 180)`
- **Tailwind Classes**: Use `text-primary`, `bg-primary`, `border-primary` instead of blue variants
- **Updated**: All sections now use the new teal/cyan primary color

## Color Options

### Option 1: Teal/Cyan
- **RGB**: `rgb(13, 148, 136)`
- **Hex**: `#0d9488`
- **Description**: Teal/cyan color with low red, medium green, and medium blue-green values
- **Visual**: Teal/cyan tone

### Option 2: Bright Green/Lime
- **RGB**: `rgb(140, 198, 62)` or `rgb(141, 198, 63)`
- **Hex**: `#8cc63e`
- **Description**: Bright green/lime color with medium red, high green, and low blue values
- **Visual**: Bright green/lime tone
- **Note**: Currently implemented in contact section (as of latest update)

### Option 3: Dark Desaturated Blue-Purple
- **OKLCH**: `oklch(0.25 0.02 260)`
- **Description**: Very dark, desaturated blue-purple
  - Lightness: 25% (dark)
  - Chroma: 0.02 (very low saturation, almost gray)
  - Hue: 260° (blue-purple range)
- **Visual**: Dark grayish blue-purple tone

## Current Implementation

As of the latest update, the contact section titles use:
- **Color**: `rgb(141, 198, 63)` (Option 2 - Bright Green/Lime)
- **Applied to**: Phone, Email, and Office Hours card titles and icons

## Decision Pending

User will choose which color option to use for the contact section titles.
