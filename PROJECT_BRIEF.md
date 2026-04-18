# PROJECT BRIEF: HVAN Interactive Scrollytelling

## 📌 Mục tiêu
Xây dựng một trang **Long-form Interactive Report** (E-magazine tương tác) cho cuộc thi an ninh học viện, trình bày nội dung lịch sử và trách nhiệm bảo vệ an ninh quốc gia dưới dạng Scrollytelling — chuẩn báo chí cao cấp (tham khảo The Pudding, Nhân Dân E-magazine, Awwwards Data Viz).

## 🏗️ Tech Stack
- **HTML5 / CSS3 / Vanilla JS** — Không dùng framework (React/Vue)
- **Scrollama** (CDN) — Scroll-triggered storytelling via IntersectionObserver
- **D3.js** (CDN, reserved) — Cho data visualization tương lai
- **Google Fonts**: Playfair Display (heading), Noto Serif (traditional), Inter (body)
- **Deploy**: GitHub → Vercel (auto-deploy on push to `main`)

## 🔗 Links
- **Live**: https://interactivelongform.vercel.app
- **Repo**: https://github.com/anhvt3/hvan-interactive-infographic

## 📁 Cấu trúc thư mục
```
interactive_longform/
├── index.html          # Main structure
├── style.css           # All styles (retro theme, timeline, glassmorphism)
├── script.js           # Scrollama init, IntersectionObserver, progress bar
├── assets/
│   └── images/
│       ├── hero_soldier.png        # AI-generated retro hero illustration
│       ├── police_action.png       # AI-generated police action illustration
│       ├── student_future.png      # AI-generated student illustration
│       └── old_paper_texture.png   # Aged paper texture for overlay
├── tasks/
│   └── todo.md
└── PROJECT_BRIEF.md    # This file
```

## 🎨 Design System
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-color` | `#f0e9df` | Aged paper base |
| `--accent-red` | `#8B0000` | Headings, timeline dots, key accents |
| `--accent-red-bright` | `#C8102E` | Stat numbers, CTA elements |
| `--accent-gold` | `#D4AF37` | Dividers, milestone badges, quotes |
| `--text-primary` | `#1a1a1a` | Body text |
| `--text-secondary` | `#4a4a4a` | Secondary text |

**Fonts**: Playfair Display (headings), Noto Serif (traditional/italic), Inter (body)

## 📐 Sections & Layout Patterns

### 1. Hero (100vh Cinematic)
- Fullscreen background image with `animation: slowPan` (scale 1→1.12)
- Vignette overlay via `radial-gradient`
- Staggered fade-up text animations
- Bouncing mouse scroll indicator

### 2. Timeline (Vertical Checkpoint)
- **Layout**: Alternating left/right cards along a center vertical line
- **CSS**: `::before` pseudo-element for the line, `.timeline-dot` for checkpoints
- **Animation**: `IntersectionObserver` adds `.is-visible` class → opacity + translateY transition
- **Milestones**: Special gold-bordered cards with `.milestone-badge` labels
- **Connector lines**: Horizontal lines from dot to card via `::after`

### 3. Dak Lak 2023 (Immersive Background)
- **Layout**: Sticky background image (100vh) + scrolling `.glass-card` overlay
- **Glass Cards**: `backdrop-filter: blur(12px)`, dark semi-transparent bg
- **Scrollama**: `.is-active` class for fade-in/slide-up on each card
- **Stats**: Large `stat-number` (font-size 5rem) with text-shadow glow

### 4. Responsibility (Card Grid)
- 3-column responsive grid (`grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`)
- Staggered reveal via IntersectionObserver with `setTimeout` delay

### 5. Footer (Quote Block)
- Grayscale background image
- Giant decorative quote mark (8rem Georgia)
- Signature with gold color + uppercase tracking

## 🧱 Key Visual Effects
1. **Old Paper Texture Overlay**: `position: fixed`, `mix-blend-mode: multiply`, `opacity: 0.12` — ảnh texture giấy cũ phủ toàn trang
2. **Noise Grain**: SVG feTurbulence filter, `opacity: 0.06`, `mix-blend-mode: multiply`
3. **Progress Bar**: Fixed top, width controlled by scroll %, gradient red→gold
4. **Drop Caps**: `::first-letter` pseudo-element, 4.5rem Playfair Display
5. **Pull Quotes**: `border-left: gold`, italic Playfair, decorative quote marks

## ⚠️ Vấn đề cần Review / Cải thiện

### Chưa đạt yêu cầu
1. **Layer báo cũ**: Đã có texture overlay nhưng opacity cần cân bằng (quá cao thì che chữ, quá thấp thì không thấy). Hiện set 0.12. Có thể cần approach khác (chỉ apply lên `.paper-texture-bg` sections thay vì toàn trang fixed).
2. **Timeline chưa đủ ấn tượng**: Có center line + dots + alternating cards rồi nhưng cần thêm:
   - Animated progress fill trên đường kẻ dọc (line fill gold khi scroll qua)
   - Micro-interactions phức tạp hơn (ví dụ: card xoay nhẹ khi appear, particle effects)
   - Có thể cần horizontal scrolling timeline hoặc 3D transform
3. **Thiếu Data Visualization**: Chưa có biểu đồ D3.js nào, chỉ có stat numbers tĩnh

### Yêu cầu từ User
- Phải **đột phá**, không được giống landing page PowerPoint bình thường
- Theme **retro lịch sử** nhất quán: layer giấy cũ, vết ố, font serif truyền thống
- Timeline phải có **checkpoint visual rõ ràng** (đường kẻ, nốt, nhánh)
- Tham khảo chuẩn: **The Pudding**, **Nhân Dân E-magazine**, **Awwwards Data Viz**

## 📚 Nguồn nội dung
- Thư mục drafts: `D:\projectlocal\clevai\PLAYGROUND.Brainstorm\hvan\Timhieulucluonganninh\drafts\`
- Các file MD outline cho từng chương (CD01 → CD31)
- Tổng ~600 trang, chỉ dùng outline/tóm tắt

## 🖼️ Asset Generation
- Ảnh minh họa: AI-generated (retro/propaganda style)
- Xử lý: Python script `remove_backgrounds.py` dùng `rembg` để cắt nền thành PNG trong suốt
- Texture: AI-generated old paper texture
