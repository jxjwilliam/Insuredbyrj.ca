# Insured by Rajan

Modern, multilingual life insurance agency website for British Columbia. Built with Next.js 15, Tailwind CSS, and shadcn/ui. Features multi-language support (EN/FR/PA/HI), quote requests, contact forms, and comprehensive insurance product information.

## 🌟 Features

- **Multi-language Support**: Full internationalization with support for English, French, Punjabi, and Hindi
- **Responsive Design**: Mobile-first design that works seamlessly across all devices (320px+)
- **Modern UI**: Built with shadcn/ui components, MagicUI, and Acernity UI components
- **Advanced Animations**: GSAP ScrollTrigger, Framer Motion viewport animations, parallax effects
- **Visual Effects**: Aurora backgrounds, gradient meshes, shimmer buttons, border beams, 3D cards
- **Contact Forms**: Integrated contact and newsletter subscription forms
- **Product Information**: Detailed information about term life, whole life, universal life, and critical illness insurance
- **Interactive Maps**: Google Maps integration for office location
- **QR Code**: Footer QR code for easy mobile access
- **SEO Optimized**: Proper meta tags, hreflang tags, and semantic HTML
- **Accessibility**: WCAG 2.1 AA compliant with ARIA labels, keyboard navigation, and reduced motion support
- **Design System**: Consistent spacing, typography, colors, and component styling

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (built on Radix UI)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/) with ScrollTrigger
- **UI Enhancements**: MagicUI components & Acernity UI components
- **Fonts**: Google Fonts (Inter, Playfair Display, Montserrat)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/react), [Playwright](https://playwright.dev/)
- **QR Code**: [react-qr-code](https://www.npmjs.com/package/react-qr-code)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) 18.x or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd insuredbyrj
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Next.js
NEXT_PUBLIC_BASE_URL=https://insuredbyrj-ca.vercel.app

# Google Maps API (optional, for map functionality)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm test` - Run unit tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run test:e2e:ui` - Run E2E tests with Playwright UI mode

## 📁 Project Structure

```
insuredbyrj/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Locale-based routes (en, fr, pa, hi)
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/            # Layout components (header, footer)
│   ├── sections/          # Page sections
│   ├── shared/            # Shared components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions and configurations
│   ├── i18n/             # Internationalization setup
│   ├── constants.ts       # Static content data
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions
├── public/                # Static assets
├── specs/                 # Feature specifications
├── docs/                  # Documentation
├── tests/                 # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
└── middleware.ts         # Next.js middleware for locale detection
```

## 🌍 Multi-language Support

The application supports four languages:
- **English (en)** - Default
- **French (fr)**
- **Punjabi (pa)**
- **Hindi (hi)**

Language detection is handled automatically via:
1. URL path prefix (`/en`, `/fr`, etc.)
2. Browser cookies (`NEXT_LOCALE`)
3. `Accept-Language` header

Translation files are located in `lib/i18n/translations/`.

## 🧪 Testing

### Unit Tests

```bash
npm test
```

### Integration Tests

```bash
npm test -- tests/integration
```

### End-to-End Tests

```bash
npm run test:e2e
```

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
npm run build
npm run start
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_BASE_URL` | Base URL of the application | Yes |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key | No |
| `NEXT_PUBLIC_GOOGLE_API_KEY` | Alternative Google API key | No |

## 🎨 Styling

The project uses Tailwind CSS for styling. Custom configuration is in `tailwind.config.ts`.

### Color Palette

- Primary: Blue (#3B82F6)
- Secondary: Amber (#F59E0B)
- Accent: Orange (#FF671F) and Green (#046A38)

## 📚 Documentation

- [Implementation Docs](./docs/) - Detailed implementation documentation for each feature
- [Specifications](./specs/) - Feature specifications and planning documents
- [API Contracts](./specs/*/contracts/) - API endpoint documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👤 Author

**Rajan Thind**
- Website: [Insured by Rajan](https://insuredbyrj-ca.vercel.app)
- Email: infinity@insureline.com
- Phone: 778-830-0142

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Note**: This is a private project. For questions or support, please contact the project owner.
