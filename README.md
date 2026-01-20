# Spinning Wheel Promo

A gamified promotional component for e-commerce websites that engages users through an interactive spinning wheel experience. Users spin the wheel to win discounts, offers, or prizes — a proven conversion optimization technique used by modern e-commerce platforms.

## Feature Overview

**Core User Flow:**

1. User visits the page and sees a promotional call-to-action
2. User enters their email address to participate
3. User clicks "Spin the Wheel" to trigger the animation
4. Wheel spins and lands on a random prize segment
5. User receives their reward (discount code, free shipping, etc.)
6. Result is displayed with appropriate visual feedback

**Key Features:**

- Smooth, realistic spinning animation with physics-based deceleration
- Randomized prize selection with configurable probabilities
- Responsive design (mobile, tablet, desktop)
- Email validation and form handling
- Confetti animation on winning result
- Accessible UI with keyboard navigation support

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Animations:** CSS transforms + JavaScript
- **Deployment:** Vercel

## Project Structure

```
spinning-wheel-promo/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── SpinningWheel.tsx   # Core wheel component
├── lib/
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Implementation Notes

### Animation Strategy

- The wheel uses CSS `transform: rotate()` for hardware-accelerated performance
- Spinning physics: eased deceleration using cubic-bezier timing functions
- Final angle is calculated to land on the selected prize segment
- Minimum rotation of 4-5 full spins ensures engaging UX

### Prize Logic

- Prizes are defined with configurable probabilities (weights)
- Weighted random selection algorithm ensures fair distribution
- Prize segments are evenly distributed around 360° circle
- Colors and labels are easily customizable via props

### UX Considerations

- Disabled state during spin prevents double-submission
- Visual feedback at every interaction point (hover, active, disabled states)
- Email validation with error messages
- Mobile-optimized touch interactions
- Loading states and smooth transitions

### Accessibility

- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard-navigable form inputs
- Color contrast meets WCAG AA standards

## Scope & Limitations

**Frontend-Only Implementation:**

- This is a client-side demonstration with no backend API
- Email submissions are **simulated** (not persisted)
- Prize selection is **random client-side** (no server validation)
- No authentication, database, or email service integration

**Production Considerations:**
In a production environment, this would include:

- Backend API endpoint to record email submissions
- Server-side prize selection to prevent client manipulation
- Email service integration (SendGrid, Mailchimp, etc.)
- Rate limiting and abuse prevention
- Analytics tracking (conversion rates, prize distribution)
- A/B testing framework

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

```bash
# Deploy to Vercel
npx vercel

# Deploy to production
npx vercel --prod
```

Alternatively, connect your GitHub repository to Vercel for automatic deployments on push.

## Note for Reviewers

This assignment demonstrates:

- ✅ Clean component architecture with separation of concerns
- ✅ TypeScript for type safety
- ✅ Modern React patterns (hooks, composition)
- ✅ Responsive design with Tailwind CSS
- ✅ Smooth animations and attention to UX details
- ✅ Professional code structure suitable for team collaboration

**Time Investment:** ~4-6 hours (component logic, animations, styling, testing)

Thank you for reviewing this submission. I'm happy to discuss architectural decisions, implementation details, or potential enhancements.
