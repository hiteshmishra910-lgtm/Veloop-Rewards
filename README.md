# VELOOP Rewards – Rewards & Engagement Banner/Card Redesign

A production-grade, high-conversion frontend redesign for **VELOOP Rewards** promotional and utility banner suite. Built with modern React, Vite, CSS Modules, Bootstrap, and Lucide icons, adhering to strict fintech design principles (anti-AI slop, zero-pill metadata discipline, WCAG AA accessibility, and responsive typography).

---

## 📌 Project Overview

VELOOP Rewards required a complete visual and functional redesign of its 5 primary engagement and utility cards. The solution achieves a premium institutional aesthetic — utilizing deep navy (`#161827`), soft blue (`#3B82F6`), rich gold (`#F59E0B`), warm amber, and metallic silver tones while strictly rejecting noisy neon colors, rainbow gradients, and excessive gaming-style glow.

Every banner is responsive, keyboard accessible, animated with GPU-accelerated transforms (`transform`, `opacity`), and features a working interactive modal simulation so that no CTA button is a dead click.

---

## 🌟 The 5 Redesigned Banners

### 1. Refer & Earn (`ReferEarnBanner`)
- **Headline**: *"Invite Friends. Earn Rewards."* (Alternative: *"Refer & Earn"*)
- **Description**: *"Invite your friends to VELOOP Rewards and unlock exciting rewards when they complete eligible activities."*
- **Visual Composition**:
  - Two user avatar nodes (Alex as Inviter, Sara as Invited Friend) connected via an animated SVG stroke path with sharing hub badge.
  - 3D-styled deep navy gift chest with satin gold ribbons and glowing lid.
  - Floating VE coins with gentle levitation keyframes.
  - Referral milestone preview card (`Reward Unlocked`).
- **Interactive Action**: Opens referral cockpit with instant one-click link generator, code copy (`VELOOP-VIP88`), tier milestone matrix, and friend signup simulation (demo reward credit).

### 2. Swap Center (`SwapCenterBanner`)
- **Headline**: *"Swap Center"*
- **Description**: *"Convert eligible reward balances between supported currencies and manage your rewards more efficiently."*
- **Key Purpose**: **Conversion & Liquidity Utility** (VE Points ⇄ SVE Staked Yield Points), explicitly distinct from an earning task or external payout.
- **Visual Composition**:
  - Dual ledger cards displaying live balances (VE standard activity vs SVE staking pool).
  - Circular swap node with bidirectional arrows that accelerates and rotates 180° on hover.
  - Live utility indicator showing `1 VE = 0.75 SVE` and `0% Slippage`.
- **Interactive Action**: Real-time swap calculator with percentage shortcuts (25%, 50%, 75%, Max), reverse direction toggle, and simulated instant settlement updating the user's balances.

### 3. Bonus VEs (`BonusVEsBanner`)
- **Headline**: *"Get Extra VEs"*
- **Description**: *"Complete eligible activities and unlock additional VEs through special bonus opportunities."*
- **Key Purpose**: Dynamic multiplier and streak boost without claiming a fixed reward promise.
- **Visual Composition**:
  - Hexagonal high-tech vault chamber with radiant golden VE coin core.
  - Dynamic multiplier floating badge (`Up to 3.5× Multiplier`).
  - 5-Day activity streak progress meter with shimmer fill animation.
  - Multiplied floating coins (2×, 3.5×).
- **Interactive Action**: 7-Day streak ladder with interactive mystery multiplier roll, subtle gold confetti burst (`canvas-confetti`), and direct wallet balance credit.

### 4. Captcha Tasks (`CaptchaTasksBanner`)
- **Headline**: *"Captcha Tasks"*
- **Description**: *"Complete available captcha tasks accurately and earn rewards for eligible submissions."*
- **Key Purpose**: **Accuracy-driven human verification task**, strictly distinguished from advertisement clicks.
- **Visual Composition**:
  - Human Verification Protocol terminal card with security badge.
  - Sliding puzzle challenge track with animated knob movement.
  - Green verification status pill and `Accuracy Check` validation badge.
  - Floating `Reward Available (Demo)` stamp.
- **Interactive Action**: Live alphanumeric challenge generator with randomized characters, input validation, instant verification feedback, and reward credit.

### 5. Exchange Center (`ExchangeCenterBanner`)
- **Headline**: *"Exchange Center"* (Alternative: *"Redeem Your Rewards"*)
- **Description**: *"Explore available redemption options and exchange eligible VEs for supported rewards."*
- **Key Purpose**: **Redeeming into real-world payout rails** (UPI Instant Transfer, Amazon E-Gift Voucher, Apple, Steam) — fundamentally distinct from internal token swaps.
- **Visual Composition**:
  - Fanned layout featuring a physical contactless UPI card and retail e-gift voucher.
  - Floating exchange badge: `Eligible VEs → Supported Payout (Demo)`.
  - Stream of VE coins heading into instant cashout rail with `0% Payout Fee`.
- **Interactive Action**: Full redemption catalog with balance check, beneficiary UPI VPA input, instant voucher receipt dispatch, and VE deduction.

---

## 🛠️ Technology Stack

- **React 19** – Functional components, hooks, accessibility state management
- **Vite 8** – Lightning-fast build tool and dev server
- **Bootstrap 5 & CSS Modules (`.module.css`)** – Scoped component styles, responsive layout rules
- **Tailwind CSS v4** – Utility foundation and tabular typography integration
- **Lucide React** – Clean, lightweight, semantic icon set
- **Canvas Confetti** – Micro-interaction celebrations on bonus claim
- **TypeScript** – Strict type checking and reliable interfaces

---

## 📐 Responsive Height Specifications

| Breakpoint | Target Height Range | Layout Behavior |
| :--- | :--- | :--- |
| **Desktop / Laptop ($\ge 1024\text{px}$)** | **410px – 450px** (Implemented at 430px) | Balanced horizontal 2-column composition (Content + Large Visual) |
| **Tablet ($641\text{px} - 1023\text{px}$)** | **380px – 540px** (Adaptive 400px–440px) | Streamlined horizontal or centered grid layout |
| **Mobile ($\le 640\text{px}$)** | **330px – 520px** (Adaptive 420px) | Natural vertical reordering: Visual $\rightarrow$ Heading $\rightarrow$ Description $\rightarrow$ Metrics $\rightarrow$ CTA |

---

## 🎨 Global Design & Anti-Slop Rules

1. **Background**: `#161827` main body background.
2. **Fintech Color Palette**:
   - Canvas: Deep Navy (`#161827`, `#1A1E32`, `#121420`)
   - Accent Primary: Satin Gold (`#F59E0B`, `#FBBF24`)
   - Accent Utility: Soft Blue (`#3B82F6`, `#60A5FA`)
   - Neutral Surfaces: Cool Silver (`#CBD5E1`, `#94A3B8`, `#64748B`)
   - Highlight Accents: Muted Purple (`#8B5CF6`) and Emerald (`#34D399`)
3. **Banned Clichés**:
   - ❌ No neon green, neon pink, or neon blue
   - ❌ No rainbow gradients or blinding glows
   - ❌ No gaming arcade metaphors or gambling iconography
   - ❌ No pill capsule tags on static metadata (clean unboxed typographic separators used)
   - ❌ No mechanical comment headers (`// 01_REFERRAL`)
4. **Motion Budget**:
   - Feedback settles in $\le 200\text{ms}$ with `cubic-bezier(0.16, 1, 0.3, 1)`.
   - Animations exclusively target `transform` and `opacity`.
   - Full support for `prefers-reduced-motion: reduce`.

---

## 📂 Project Structure

```
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── App.tsx                               # Master application container & state orchestration
│   ├── index.css                             # Global root variables, bootstrap import, fonts
│   ├── main.tsx                              # Application entry point
│   ├── types/
│   │   └── rewards.ts                        # TypeScript interfaces for banners, wallets & modals
│   ├── utils/
│   │   └── formatters.ts                     # Tabular number & currency formatters
│   ├── components/
│   │   ├── RewardBanner/                     # Reusable base banner wrapper
│   │   │   ├── RewardBanner.tsx
│   │   │   └── RewardBanner.module.css
│   │   ├── ReferEarnBanner/                  # Banner 1: Refer & Earn
│   │   │   ├── ReferEarnBanner.tsx
│   │   │   └── ReferEarnBanner.module.css
│   │   ├── SwapCenterBanner/                 # Banner 2: Swap Center (Conversion utility)
│   │   │   ├── SwapCenterBanner.tsx
│   │   │   └── SwapCenterBanner.module.css
│   │   ├── BonusVEsBanner/                   # Banner 3: Bonus VEs (Dynamic multiplier)
│   │   │   ├── BonusVEsBanner.tsx
│   │   │   └── BonusVEsBanner.module.css
│   │   ├── CaptchaTasksBanner/               # Banner 4: Captcha Tasks (Human verification)
│   │   │   ├── CaptchaTasksBanner.tsx
│   │   │   └── CaptchaTasksBanner.module.css
│   │   ├── ExchangeCenterBanner/             # Banner 5: Exchange Center (Vouchers & UPI Payouts)
│   │   │   ├── ExchangeCenterBanner.tsx
│   │   │   └── ExchangeCenterBanner.module.css
│   │   ├── Navbar/                           # Top Bar Contract navigation
│   │   │   └── Navbar.tsx
│   │   ├── BannerControls/                   # Carousel / Stack / Grid / Specs & Viewport Switcher
│   │   │   └── BannerControls.tsx
│   │   ├── SpecsInspector/                   # Live Design System & UI/UX Audit inspector
│   │   │   └── SpecsInspector.tsx
│   │   ├── Toast/                            # Feedback toast notifications
│   │   │   └── Toast.tsx
│   │   └── Modals/                           # Interactive working modals for all 5 CTAs
│   │       ├── ReferEarnModal.tsx
│   │       ├── SwapCenterModal.tsx
│   │       ├── BonusModal.tsx
│   │       ├── CaptchaTaskModal.tsx
│   │       └── ExchangeModal.tsx
```

---

## 🚀 Installation & Local Development

### 1. Clone & Install
```bash
git clone https://github.com/your-username/veloop-rewards-banner-suite.git
cd veloop-rewards-banner-suite
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

### 5. Lint & Type Check
```bash
npm run lint
```

---

## 🌐 Deployment Instructions

### Deploy to GitHub
1. Initialize repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete VELOOP rewards banner suite redesign"
   ```
2. Link remote and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/your-username/veloop-rewards-banner-suite.git
   git push -u origin main
   ```

### Deploy to Vercel
1. Install Vercel CLI or import via [vercel.com](https://vercel.com).
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Click **Deploy**.

### Deploy to Netlify
1. Connect repository on [netlify.com](https://netlify.com).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Click **Deploy Site**.

---

## 📱 Interactive Testing Toolbar

The application includes an in-app evaluation toolbar at the top:
1. **Layout Switcher**:
   - **Carousel Slider**: Smooth banner rotation with pause/play and indicators.
   - **Full Stack**: All 5 banners rendered vertically for simultaneous comparison.
   - **Grid Overview**: 2-column responsive layout.
   - **Specs Inspector**: Live design rationale, color tokens, and animation budgets for each banner.
2. **Viewport Simulation**:
   - **Desktop**: 100% full-width layout (1280px container).
   - **Tablet**: 768px bounded frame.
   - **Mobile**: 390px iPhone portrait frame.
3. **Reduced Motion Toggle**:
   - Instantly test accessibility compliance when animations are toggled off.

---

## 📷 Screenshots

| Desktop Showcase (1440px) | Tablet View (768px) | Mobile View (390px) |
| :---: | :---: | :---: |
| *[Screenshot Placeholder]* | *[Screenshot Placeholder]* | *[Screenshot Placeholder]* |

---

## 🔗 Links

- **Live Demo**: `[https://veloop-rewards.vercel.app](https://placeholder-link)`
- **GitHub Repository**: `[https://github.com/your-username/veloop-rewards-banners](https://placeholder-link)`

---

## 👤 Author

- **Internship Project Submission**: VELOOP Rewards Frontend Engineering Assignment
- **Role**: Senior Frontend Developer & Fintech UI/UX Specialist
- **Contact**: `hiteshmishra2810@gmail.com`
