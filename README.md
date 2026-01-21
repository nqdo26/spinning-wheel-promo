# 🎡 Spinning Wheel Promo

An interactive promotional spinning wheel application for e-commerce platforms. Built with Next.js 15, TypeScript, and Tailwind CSS, featuring smooth SVG animations, bilingual support, and dark/light mode themes.

## ✨ Features

### Core Functionality

- **Interactive Spinning Wheel** - Custom SVG-based wheel with 8 prize segments
- **Smooth Animation** - Physics-based rotation with cubic-bezier easing (4s duration)
- **Random Prize Selection** - Fair prize distribution with variance for natural feel
- **Result Modal** - Display winning prize with auto-generated promo code

### UI/UX Features

- **🌓 Dark/Light Mode** - Theme toggle with next-themes, persisted across sessions
- **🌍 Bilingual Support** - Full English and Vietnamese translations via custom i18n context
- **📱 Responsive Design** - Optimized for mobile, tablet, and desktop
- **♿ Accessible** - ARIA labels, keyboard navigation, semantic HTML
- **🎨 Modern UI** - Clean interface with Tailwind CSS and shadcn/ui components

## 🛠 Tech Stack

| Category             | Technology                      |
| -------------------- | ------------------------------- |
| **Framework**        | Next.js 15 (App Router)         |
| **Language**         | TypeScript                      |
| **Styling**          | Tailwind CSS v4                 |
| **UI Components**    | shadcn/ui (Radix UI primitives) |
| **Theme Management** | next-themes                     |
| **Icons**            | lucide-react                    |
| **Runtime**          | React 19                        |

## 📁 Project Structure

```
spinning-wheel-promo/
├── app/
│   ├── layout.tsx              # Root layout with theme provider
│   ├── page.tsx                # Main page with wheel logic
│   └── globals.css             # Global styles + Tailwind directives
├── components/
│   ├── spinning-wheel.tsx      # Core wheel component (SVG-based)
│   ├── result-modal.tsx        # Prize result modal
│   ├── language-toggle.tsx     # EN/VI language switcher
│   ├── theme-toggle.tsx        # Light/Dark mode toggle
│   └── ui/                     # shadcn/ui components (Button, Dialog)
├── lib/
│   ├── language-context.tsx    # Custom i18n context provider
│   ├── locales/
│   │   ├── en.ts              # English translations
│   │   └── vi.ts              # Vietnamese translations
│   └── utils.ts               # Utility functions (cn)
└── public/
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, yarn, pnpm, or bun

### Installation

```bash
# Clone repository
git clone <repository-url>
cd spinning-wheel-promo

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

## 🎮 How to Use

1. **Initial View** - Click "Spin Now" / "Quay Ngay" button
2. **Wheel Appears** - Interactive spinning wheel is displayed
3. **Spin** - Click center "SPIN" button to start animation
4. **Result** - After 4 seconds, modal shows your prize with promo code
5. **Repeat** - Click "Try Again" to spin again or "Back to Home" to return

## 🎯 Prize Segments

| Index | Prize                 | Color   | Translation Key     |
| ----- | --------------------- | ------- | ------------------- |
| 0     | 10% Off               | Red     | prizes.discount10   |
| 1     | Free Shipping         | Amber   | prizes.freeShipping |
| 2     | 20% Off               | Emerald | prizes.discount20   |
| 3     | $50 Gift Card         | Blue    | prizes.giftCard50   |
| 4     | 30% Off               | Violet  | prizes.discount30   |
| 5     | Mystery Prize         | Pink    | prizes.mystery      |
| 6     | Better Luck Next Time | Gray    | prizes.noLuck       |
| 7     | $100 Gift Card        | Teal    | prizes.giftCard100  |

## 🌐 Internationalization (i18n)

### Supported Languages

- 🇺🇸 **English** (en)
- 🇻🇳 **Tiếng Việt** (vi)

### Language Toggle

- Located in top-right corner
- Shows "EN" or "VI" text
- Persisted in localStorage
- Instant language switching without page reload

### Adding New Languages

1. Create new file in `lib/locales/<lang>.ts`
2. Follow `TranslationKeys` interface from `en.ts`
3. Import and add to `LanguageProvider` in `language-context.tsx`

## 🎨 Theme System

### Dark/Light Mode

- **Toggle Button** - Sun/Moon icon in top-right
- **System Preference** - Respects OS dark mode setting
- **Persistence** - Theme saved in localStorage
- **Smooth Transitions** - CSS transitions for theme changes

### Theme Implementation

- Powered by `next-themes` library
- Tailwind CSS dark mode with `class` strategy
- Theme provider wraps entire app in root layout

## 🔧 Implementation Details

### Spinning Wheel Animation

**Rotation Formula:**

```typescript
const segmentMidAngle = randomIndex * segmentAngle + segmentAngle / 2;
const angleToRotate = -segmentMidAngle;
const variance = (Math.random() - 0.5) * (segmentAngle * 0.3);
const newRotation = extraRotation + angleToRotate + variance;
```

**Key Points:**

- Arrow fixed at top (0° position, between segment 7 and 0)
- Wheel rotates to align selected segment center with arrow
- Minimum 5 full rotations (1800°) + target angle
- Small variance (±13.5°) for natural feel
- Rotation resets to 0° after each spin for consistency

### SVG Architecture

**Coordinate System:**

- `polarToCartesian()` - Converts angles to (x, y) coordinates
- `describeArc()` - Generates SVG path for pie-slice segments
- Segments drawn from 0° (right/3 o'clock) clockwise
- Text positioned at 62% radius with rotation transform

**Multi-line Text:**

- Automatic word splitting for long prize names
- 1 word = 1 line, 2 words = 2 lines, 3+ words = balanced split
- SVG `<tspan>` elements with calculated dy offsets

## 🎓 Assignment Compliance

This project fulfills technical interview requirements:

✅ **SVG-Based Wheel** - Custom SVG rendering (not canvas or images)  
✅ **Smooth Animation** - CSS transforms with easing functions  
✅ **Random Selection** - Fair prize distribution algorithm  
✅ **Result Display** - Modal with prize and promo code  
✅ **Clean Code** - TypeScript, component separation, no comments  
✅ **Responsive** - Mobile-first design with Tailwind  
✅ **User Flow** - Button → Wheel → Spin → Modal (no email input)

**Bonus Features:**

- 🌓 Dark/Light mode toggle
- 🌍 Bilingual EN/VI support
- ♻️ Reset mechanism for multiple spins
- 🎯 Fixed arrow with rotating wheel segments only

## 📝 Notes

### Frontend-Only Implementation

- **No Backend** - All logic runs client-side
- **Simulated Prizes** - Random selection on frontend
- **No Persistence** - Promo codes not saved to database
- **No Email Service** - No email collection or notifications

### Production Considerations

For real-world deployment, consider adding:

- Backend API for prize selection validation
- Database to store user entries and prevent duplicates
- Email service integration (SendGrid, Mailchip)
- Rate limiting and abuse prevention
- Analytics tracking (Google Analytics, Mixpanel)
- A/B testing for conversion optimization

## 🚀 Deployment

### Deploy to Vercel

```bash
# One-time deployment
npx vercel

# Production deployment
npx vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments on every push.

### Environment Variables

No environment variables required for this demo version.

## 📄 License

This project is created for technical interview/assessment purposes.
