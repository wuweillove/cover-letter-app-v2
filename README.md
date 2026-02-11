# Cover Letter Generator v2

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)

A modern, professional cover letter generator built with Next.js 14+ and TypeScript.

[Demo](https://cover-letter-app-v2.vercel.app) • [Report Bug](https://github.com/wuweillove/cover-letter-app-v2/issues) • [Request Feature](https://github.com/wuweillove/cover-letter-app-v2/issues)

</div>

## ✨ Features

- **📝 Multiple Templates**: Choose from 4 professionally designed templates
  - Professional - Classic and formal design
  - Modern - Clean contemporary layout
  - Creative - Bold and vibrant design
  - Minimal - Simple and elegant

- **🔄 Real-time Preview**: See your cover letter as you type
- **📥 PDF Export**: Download your cover letter as a PDF
- **💾 Auto-save**: Automatically saves your progress to localStorage
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ Type-safe**: Built with TypeScript for reliability
- **🎨 Modern UI**: Clean interface with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/wuweillove/cover-letter-app-v2.git
cd cover-letter-app-v2
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
npm run start
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/wuweillove/cover-letter-app-v2)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Next.js and deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Click "Deploy site"

### Deploy to Other Platforms

This app can be deployed to any platform that supports Next.js:

- **AWS Amplify**: Connect your GitHub repo
- **Railway**: One-click deploy from GitHub
- **Render**: Supports Next.js out of the box
- **DigitalOcean App Platform**: Deploy from GitHub

## 📁 Project Structure

```
cover-letter-app-v2/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with app logic
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Label.tsx
│   │   └── Card.tsx
│   ├── CoverLetterForm.tsx     # Form component
│   ├── CoverLetterPreview.tsx  # Preview component
│   └── TemplateSelector.tsx    # Template selection
├── lib/
│   ├── types.ts            # TypeScript type definitions
│   ├── utils.ts            # Utility functions
│   ├── templates.ts        # Template configurations
│   └── pdf-export.ts       # PDF export functionality
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## 📝 Usage

1. **Choose a Template**: Select from 4 professional templates
2. **Fill in Your Information**:
   - Personal details (name, email, phone, address)
   - Company information (company name, position, hiring manager)
   - Experience details (current role, years of experience)
   - Skills and achievements
   - Custom message/motivation
3. **Preview**: See real-time preview as you type
4. **Export**: Download as PDF when ready
5. **Save**: Your progress is automatically saved

## ⚙️ Configuration

### TypeScript

The project uses strict TypeScript configuration. Adjust `tsconfig.json` if needed:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"]
  }
}
```

### Tailwind CSS

Customize styles in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      // Add your custom styles here
    },
  },
};
```

### Metadata

Update SEO metadata in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Title',
  description: 'Your Description',
  keywords: ['keyword1', 'keyword2'] as unknown as string,
};
```

## 🐛 Known Issues & Solutions

### TypeScript Metadata Keywords

Next.js metadata types don't accept string arrays for keywords. The solution:

```typescript
keywords: ['keyword1', 'keyword2'] as unknown as string,
```

### PDF Export on Mobile

PDF export works best on desktop. For mobile users, consider using the browser's print function.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Sebastian Llovera Studio**

- GitHub: [@wuweillove](https://github.com/wuweillove)

## 🚀 Future Enhancements

- [ ] More template options
- [ ] Custom color schemes
- [ ] Multiple language support
- [ ] Cloud storage integration
- [ ] AI-powered suggestions
- [ ] Email functionality
- [ ] Template customization

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vercel for hosting platform

---

<div align="center">

Made with ❤️ by Sebastian Llovera Studio

⭐ Star this repo if you find it helpful!

</div>
