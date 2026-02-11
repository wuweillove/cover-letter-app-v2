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

- **🌍 Multi-language Support**: Full internationalization (i18n)
  - English and Spanish translations
  - Easy language switching
  - Locale-based routing

- **📤 File Upload**: Smart resume parsing
  - Drag-and-drop file upload
  - Support for PDF and DOCX files
  - Automatic data extraction (name, email, phone, skills, experience)
  - File validation and size limits

- **🔗 URL Fetching**: Import job descriptions
  - Paste job posting URLs
  - Automatic content extraction
  - Parse company name, position, requirements
  - Smart text parsing

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

Navigate to [http://localhost:3000](http://localhost:3000) or [http://localhost:3000/en](http://localhost:3000/en)

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
│   ├── [locale]/               # Locale-based routing
│   │   ├── layout.tsx          # Locale layout with i18n provider
│   │   └── page.tsx            # Main application page
│   ├── api/                    # API routes
│   │   ├── parse-file/         # File parsing endpoint
│   │   └── fetch-url/          # URL fetching endpoint
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Label.tsx
│   │   └── Card.tsx
│   ├── CoverLetterForm.tsx     # Form component with i18n
│   ├── CoverLetterPreview.tsx  # Preview component
│   ├── TemplateSelector.tsx    # Template selection
│   ├── FileUploader.tsx        # File upload with drag-and-drop
│   ├── URLFetcher.tsx          # URL content fetcher
│   └── LanguageToggle.tsx      # Language switcher
├── lib/
│   ├── types.ts                # TypeScript type definitions
│   ├── utils.ts                # Utility functions
│   ├── templates.ts            # Template configurations
│   └── pdf-export.ts           # PDF export functionality
├── messages/                   # i18n translation files
│   ├── en.json                 # English translations
│   └── es.json                 # Spanish translations
├── public/                     # Static assets
├── middleware.ts               # Next-intl middleware
├── i18n.ts                     # i18n configuration
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
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **File Upload**: [react-dropzone](https://react-dropzone.js.org/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/)
- **File Parsing**: [mammoth](https://github.com/mwilliamson/mammoth.js) (DOCX) + [pdf-parse](https://www.npmjs.com/package/pdf-parse) (PDF)
- **HTML Parsing**: [cheerio](https://cheerio.js.org/) + [jsdom](https://github.com/jsdom/jsdom)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## 📝 Usage

### Basic Flow

1. **Choose a Language**: Toggle between English and Spanish
2. **Choose a Template**: Select from 4 professional templates
3. **Import Data** (Optional):
   - **Upload Resume**: Drag and drop your resume (PDF/DOCX) to auto-fill personal info
   - **Fetch Job Posting**: Paste a job URL to import company and position details
4. **Fill in Your Information**:
   - Personal details (name, email, phone, address)
   - Company information (company name, position, hiring manager)
   - Experience details (current role, years of experience)
   - Skills and achievements
   - Custom message/motivation
5. **Preview**: See real-time preview as you type
6. **Export**: Download as PDF when ready
7. **Save**: Your progress is automatically saved

### File Upload Feature

The file upload feature supports:
- **PDF files**: Extracts text from resume PDFs
- **DOCX files**: Parses Word documents
- **Auto-extraction**: Automatically detects and fills:
  - Name
  - Email address
  - Phone number
  - Skills
  - Experience

### URL Fetching Feature

The URL fetcher can:
- Parse job posting pages
- Extract company name
- Extract position/job title
- Parse job requirements
- Parse responsibilities
- Extract qualifications

## ⚙️ Configuration

### Adding New Languages

1. Create a new translation file in `messages/` (e.g., `messages/fr.json`)
2. Update `middleware.ts` to include the new locale:

```typescript
export default createMiddleware({
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en'
});
```

3. Update the locale matcher in the config:

```typescript
export const config = {
  matcher: ['/', '/(es|en|fr)/:path*']
};
```

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

Update SEO metadata in `app/[locale]/layout.tsx`:

```typescript
export const metadata = {
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

### File Size Limits

Default file upload limit is 5MB. To adjust, modify the `maxSize` prop in `FileUploader` component.

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

- [x] Multiple language support
- [x] Cloud storage integration
- [x] File upload functionality
- [ ] More template options
- [ ] Custom color schemes
- [ ] AI-powered suggestions
- [ ] Email functionality
- [ ] Template customization
- [ ] More language options (French, German, etc.)
- [ ] Cloud-based document storage
- [ ] Collaboration features

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- next-intl for internationalization support
- Vercel for hosting platform
- All open-source contributors

---

<div align="center">

Made with ❤️ by Sebastian Llovera Studio

⭐ Star this repo if you find it helpful!

</div>
