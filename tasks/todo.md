# Groundbreaking Interactive Scrollytelling Plan

## Proposed Solution (Innovation Phase)
The user requires an "Awwwards-level" or Nhan Dan E-magazine style experience, not just a basic PowerPoint-like landing page. 
To achieve this, we will pivot to extreme editorial design combined with smooth, performant GSAP-style reveals (achievable via CSS + Scrollama). 

**Key Features for the Upgrade:**
1. **Dramatic Hero Section (100vh)**:
   - Fullscreen background with a slow pan/zoom animation (`transform: scale()`) to create cinematic tension.
   - Elegant, oversized serif typography for titles, fading and sliding up.
   - Bouncing "Scroll Down" indicator.
2. **Editorial Typography & Spacing (E-magazine Polish)**:
   - **Drop Caps (Chữ cái đầu to)** for the first paragraphs.
   - **Pull Quotes (Trích dẫn)**: Beautiful, oversized quotes with distinct background patterns or borders (e.g. gold lines, big quotation marks).
   - Better line-heights and letter-spacing to match high-end journalism.
3. **Advanced Scrolling/Parallax Interactions**:
   - Give the steps smooth fade-in and slide-up animations (`opacity: 0`, `transform: translateY(30px)`) that resolve when the class `.is-active` is added by Scrollama.
   - Reading progress bar fixed at the top of the screen.
4. **Thematic Audio (Optional/Visual)**:
   - A toggle button for ambient historical soundtrack to increase immersion.
5. **Vintage Newspaper Borders**:
   - Detailed, intricate borders mapping the historical period, instead of simple solid boxes. Include "băng ghim" (staples or tape) or torn paper effects using SVG/CSS.

## Checklist
- [ ] 1. Upgrade `index.html` structure (Add Reading Progress, Cinematic Hero, Quote styled blocks).
- [ ] 2. Update `style.css` (Cinematic animations, layout spacing, Drop Caps, modern E-mag typography).
- [ ] 3. Update `script.js` (Track scrolling for progress bar, logic for step animations).
- [ ] 4. Verify functionality and aesthetics.
- [ ] 5. Push to GitHub to trigger Vercel deployment and notify the user.
