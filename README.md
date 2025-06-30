# 🚀 Personal Portfolio

A modern, responsive portfolio website built with cutting-edge technologies and beautiful animations.

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black)](https://nextjs.org) [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-38B2AC)](https://tailwindcss.com) [![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.18-FF0055)](https://www.framer.com/motion)

## ✨ Features

### 🎨 **Modern Design**

- **Dark & Light Theme**: Seamless theme switching with system preference detection
- **Animated Background**: Dynamic particle effects and gradient animations
- **Glass Morphism**: Beautiful glass effects with backdrop blur
- **Responsive Design**: Fully responsive across all devices and screen sizes

### 🎬 **Smooth Animations**

- **Framer Motion**: Advanced animations and transitions
- **Scroll-triggered Animations**: Elements animate as they enter the viewport
- **Interactive Hover Effects**: Engaging micro-interactions
- **Performance Optimized**: Smooth 60fps animations

### 📱 **User Experience**

- **Fast Loading**: Optimized performance and lazy loading
- **SEO Optimized**: Proper meta tags and structured data
- **Accessibility**: WCAG compliant with keyboard navigation
- **Contact Form**: Functional contact form with email integration

### 🧩 **Sections**

1. **Hero Section**: Eye-catching introduction with animated elements
2. **About**: Personal information and background
3. **Experience**: Professional timeline and achievements
4. **Education**: Academic background and certifications
5. **Tech Stack**: Skills and technologies with visual icons
6. **Projects**: Interactive project showcase
7. **Contact**: Contact form and social links

## 🛠️ Tech Stack

### **Frontend Framework**

- **Next.js 15.3** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 19** - Latest React features

### **Styling & Animation**

- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Framer Motion** - Advanced animations library
- **Lucide React** - Beautiful, customizable icons
- **Radix UI** - Accessible component primitives

### **UI Components**

- **HeroUI** - Modern component library
- **Custom Components** - Hand-crafted reusable components
- **Responsive Design** - Mobile-first approach

### **Backend & Services**

- **Resend** - Email service for contact form
- **React Email** - Email template system
- **API Routes** - Next.js API endpoints

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your environment variables:

   ```env
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### **Personal Information**

Update your details in `components/portfolio/constants.ts`:

- Personal information and bio
- Social media links
- Contact information
- Resume/CV link

### **Projects**

Modify the projects array in `components/portfolio/Projects.tsx`:

```typescript
{
  title: "Your Project Title",
  description: "Project description...",
  technologies: ["React", "Node.js", "MongoDB"],
  githubUrl: "https://github.com/username/repo",
  liveUrl: "https://yourproject.com",
  imageUrl: "/path/to/image.jpg"
}
```

### **Experience**

Update your work experience in `components/portfolio/Experience.tsx`:

```typescript
{
  company: "Company Name",
  position: "Your Role",
  duration: "2023 - Present",
  description: "Role description...",
  achievements: ["Achievement 1", "Achievement 2"]
}
```

### **Tech Stack**

Add your technologies in `components/portfolio/TechStack.tsx`:

- Add SVG icons to `public/TechStack/`
- Update the technologies array with your skills

### **Styling**

- **Colors**: Customize color schemes in `tailwind.config.js`
- **Animations**: Modify animations in component files
- **Layout**: Adjust layouts in component files

## 📂 Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main portfolio page
│   └── favicon.ico               # Site favicon
├── components/
│   ├── portfolio/                # Portfolio-specific components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── TechStack.tsx
│   │   ├── constants.ts          # Portfolio data and constants
│   │   └── types.ts              # TypeScript type definitions
│   ├── ui/                       # Reusable UI components
│   │   ├── animated-background.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── navbar.tsx
│   ├── AutoReplyTemplate.tsx     # Email template
│   └── ThemeProvider.tsx         # Theme context provider
├── lib/
│   └── utils.ts                  # Utility functions
├── public/
│   ├── Certificates/             # Certificate images
│   ├── TechStack/               # Technology icons
│   ├── cv.pdf                   # Resume/CV file
│   └── social.png               # Social media preview image
├── .env.example                 # Environment variables template
├── next.config.ts               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── package.json                 # Dependencies and scripts
```

## 📱 Browser Support

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

- **Netlify**: Connect GitHub repository and deploy
- **Railway**: Deploy with automatic builds
- **DigitalOcean**: Use App Platform for easy deployment

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Beautiful animations library
- **Radix UI** - Accessible component primitives
- **Lucide** - Beautiful icon library

---

_This portfolio showcases modern web development practices and demonstrates the power of Next.js, TypeScript, and Tailwind CSS._
