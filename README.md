# Portfolio | Jhensen Ray Agni

A modern, cyberpunk-themed portfolio website built with Vite, React, and TypeScript. Features a drone HUD aesthetic with neon accents, smooth animations, and full responsiveness.

🌐 **Live Site**: [jragni.github.io](https://jragni.github.io)

## ✨ Features

- **Cyberpunk Aesthetic**: Dark navy background with neon teal accents (#64FFDA)
- **Drone HUD Interface**: Military-style brackets, scanlines, and grid overlays
- **Fully Responsive**: Mobile-first design with breakpoints for all screen sizes
- **Smooth Animations**: Type animations, scroll effects, and interactive components
- **Modern Tech Stack**: Built with Vite for blazing-fast HMR and optimized builds
- **shadcn UI Components**: Beautiful, accessible components with Tailwind CSS
- **Three.js Ready**: Prepared for future 3D visualizations and interactive elements
- **Auto-Deploy**: GitHub Actions workflow for continuous deployment

## 🚀 Tech Stack

### Core
- **[Vite 6.4.1](https://vitejs.dev/)** - Next-generation frontend tooling
- **[React 19](https://react.dev/)** - UI component library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components & Styling
- **[shadcn UI](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[class-variance-authority](https://cva.style/)** - Component variant utilities

### Animations & Effects
- **[react-type-animation](https://www.npmjs.com/package/react-type-animation)** - Typing effect animations
- **[tailwindcss-animate](https://www.npmjs.com/package/tailwindcss-animate)** - Animation utilities

### Future Integrations (Installed)
- **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/)** - React renderer for Three.js
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Useful helpers for Three.js
- **[Three.js](https://threejs.org/)** - 3D graphics library

## 📦 Installation

### Prerequisites
- Node.js 20+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jragni/jragni.github.io.git
   cd jragni.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view in your browser.

## 🛠️ Development

### Available Scripts

- **`npm run dev`** - Start development server with hot module replacement
- **`npm run build`** - Build for production (runs TypeScript check + Vite build)
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality

### Build Output

Production builds are optimized and output to the `./dist` directory:
- **Bundle size**: ~296 KB (92 KB gzipped)
- **Build time**: ~1.15s

## 🌐 Deployment

The site automatically deploys to GitHub Pages via GitHub Actions on every push to the `master` branch.

### Deployment Workflow

1. **Push to master**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin master
   ```

2. **GitHub Actions runs** (`.github/workflows/deploy.yml`):
   - Checks out code
   - Sets up Node.js 20
   - Installs dependencies with `npm ci`
   - Builds with `npm run build`
   - Uploads `./dist` artifacts
   - Deploys to GitHub Pages

3. **Site goes live** at https://jragni.github.io

### Manual Deployment

To deploy manually:
```bash
npm run build
# Upload the ./dist folder to your hosting provider
```

## 📁 Project Structure

```
jragni.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/
│   ├── .nojekyll               # Disables Jekyll processing
│   └── vite.svg                # Vite logo
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx      # Main layout with HUD brackets
│   │   │   └── NavigationBar.tsx # Fixed top navigation
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx     # Landing page with typing animation
│   │   │   ├── AboutSection.tsx    # Biography and background
│   │   │   ├── SkillsSection.tsx   # Skills organized by category
│   │   │   ├── ExperienceSection.tsx # Work history timeline
│   │   │   ├── ProjectsSection.tsx   # Portfolio projects grid
│   │   │   └── ContactSection.tsx    # Contact form and links
│   │   └── ui/                 # shadcn UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       └── ...
│   ├── data/
│   │   └── constants.ts        # Work experience and projects data
│   ├── styles/
│   │   └── globals.css         # Global styles and theme variables
│   ├── App.tsx                 # Main app component
│   └── main.tsx                # Entry point
├── index.html                  # HTML template
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── components.json            # shadcn UI configuration
└── package.json               # Project dependencies
```

## 🎨 Customization

### Theme Colors

The cyberpunk color scheme is defined in `src/styles/globals.css` using CSS variables:

```css
:root {
  --background: 219 67 11;      /* #0a192f - Dark navy */
  --foreground: 219 60 88;      /* #ccd6f6 - Light slate */
  --primary: 167 100 70;        /* #64FFDA - Neon teal */
  --secondary: 219 47 20;       /* #172a45 - Darker navy */
  --accent: 167 100 70;         /* #64FFDA - Neon teal accent */
  --muted: 219 47 20;           /* #172a45 - Muted background */
  --border: 167 100 70;         /* #64FFDA - Border color */
}
```

### Content Updates

- **Personal Info**: Update `src/components/sections/HeroSection.tsx` for name and titles
- **Biography**: Edit `src/components/sections/AboutSection.tsx` for your story
- **Skills**: Modify skill categories in `src/components/sections/SkillsSection.tsx`
- **Work History**: Update `workExperienceList` in `src/data/constants.ts`
- **Projects**: Update `projectsList` in `src/data/constants.ts`
- **Navigation**: Edit `navigationItems` in `src/components/layout/NavigationBar.tsx`


## 📄 License

This portfolio is a personal project. Feel free to use it as inspiration for your own portfolio, but please don't use my personal information or content.

## 📧 Contact

**Jhensen Ray Agni**
- Website: [jragni.github.io](https://jragni.github.io)
- GitHub: [@jragni](https://github.com/jragni)

---

Built with ❤️ using Vite + React + TypeScript
