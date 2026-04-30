# Dental Warranty Card 2-Up PVC Printer

## Purpose
A web-based tool for "Degital dental lab" to generate and print 2-up PVC warranty cards on A4 paper (8.263″ × 11.693″ at 300 dpi). It includes a form to fill out patient and dentist details, a live preview, fine-tuning offset sliders, and an export-to-JPG functionality using `html2canvas`.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (global variables & custom utility classes)
- **Fonts**: `DM Serif Display` and `Barlow` via `next/font/google`
- **Export**: `html2canvas` (dynamically imported for client-side rendering)

## Architecture Overview
The application state is managed at the root `page.tsx` and distributed across components.
- **`CardData` Interface**: Represents the state of a single card.
- **`Header.tsx`**: Simple branding header.
- **`CardForm.tsx`**: Renders inputs for each card's details.
- **`PrintOffsetSliders.tsx`**: X/Y sliders for print offset adjustments.
- **`A4Preview.tsx`**: A live scaling representation of an A4 page with two cards.
- **`CardPreview.tsx`**: The visual representation of a warranty card.
- **`ExportPanel.tsx`**: A hidden off-screen panel rendering the card at exactly 300 DPI (2479x3508 pixels) to create a high-resolution export when the user clicks "Save A4 JPG".

## Key Mechanisms
### Print Offset
The offset X and Y sliders dynamically adjust both the `A4Preview` and the `ExportPanel` absolute positioning properties (`top` and `left`), scaled properly based on their respective mm-to-pixel ratios.

### SSR Workaround
`html2canvas` interacts with the DOM and cannot be imported or executed server-side. It is imported dynamically (`await import('html2canvas')`) inside the export function handler.

### Run Instructions
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Build for production: `npm run build`
4. Start production server: `npm run start`
