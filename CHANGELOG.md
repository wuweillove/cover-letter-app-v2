# Changelog

All notable changes to the Cover Letter Generator v2 project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-02-11

### 🎉 Major Release - Internationalization & File Upload Features

### Added

#### Internationalization (i18n)
- **Multi-language support**: Full internationalization with English and Spanish
- **Locale-based routing**: `/en` and `/es` routes for each language
- **Language toggle**: Easy switching between languages with toggle button
- **Translation files**: Comprehensive translation coverage for all UI elements
- **next-intl integration**: Proper Next.js 14 App Router i18n setup
- **Middleware**: Automatic locale detection and routing
- **i18n configuration**: Centralized translation management

#### File Upload Feature
- **Drag-and-drop upload**: Modern file upload interface with react-dropzone
- **PDF parsing**: Extract text from PDF resumes using pdf-parse
- **DOCX parsing**: Extract text from Word documents using mammoth
- **Smart data extraction**: Automatically detect and extract:
  - Full name
  - Email address
  - Phone number
  - Skills
  - Work experience
- **File validation**: Size limits (5MB) and type checking
- **Error handling**: User-friendly error messages
- **Upload progress**: Visual feedback during file processing
- **File removal**: Option to remove uploaded file

#### URL Fetching Feature
- **Job posting URL input**: Paste job URLs to import details
- **HTML parsing**: Extract content using cheerio and jsdom
- **Smart extraction**: Automatically detect:
  - Company name
  - Job title/position
  - Job requirements
  - Job responsibilities
  - Qualifications
- **URL validation**: Check for valid URLs before fetching
- **Error handling**: Graceful failure with error messages
- **Loading states**: Visual feedback during fetch operation

#### New Components
- `FileUploader.tsx`: Drag-and-drop file upload component
- `URLFetcher.tsx`: URL input and content fetcher
- `LanguageToggle.tsx`: Language switcher component

#### New API Routes
- `/api/parse-file`: POST endpoint for parsing uploaded files
- `/api/fetch-url`: POST endpoint for fetching and parsing URLs

#### Project Structure Updates
- Reorganized to `app/[locale]/` structure for i18n routing
- Added `messages/` directory for translation files
- Created `IMPLEMENTATION_GUIDE.md` for detailed documentation

### Changed

#### Dependencies
- Added `next-intl` (^3.22.0) for internationalization
- Added `react-dropzone` (^14.2.9) for file uploads
- Added `mammoth` (^1.8.0) for DOCX parsing
- Added `pdf-parse` (^1.1.1) for PDF parsing
- Added `node-fetch` (^3.3.2) for HTTP requests
- Added `jsdom` (^25.0.1) for HTML manipulation
- Added `cheerio` (^1.0.0) for HTML parsing
- Added `@types/jsdom` (^21.1.7) as dev dependency

#### Configuration
- Updated `next.config.js` to integrate next-intl plugin
- Created `middleware.ts` for locale routing
- Created `i18n.ts` for internationalization config

#### Components
- Updated `CoverLetterForm.tsx` with translation support
- Updated main `page.tsx` with new features integration
- Moved layout to `app/[locale]/layout.tsx` for i18n

#### Documentation
- Completely updated `README.md` with new features
- Added comprehensive `IMPLEMENTATION_GUIDE.md`
- Created this `CHANGELOG.md`

### Technical Details

#### File Structure Changes
```
app/
├── [locale]/              # NEW: Locale-based routing
│   ├── layout.tsx         # MOVED: From app/layout.tsx
│   └── page.tsx           # UPDATED: With i18n and new features
├── api/                   # NEW: API routes directory
│   ├── parse-file/
│   │   └── route.ts       # NEW: File parsing endpoint
│   └── fetch-url/
│       └── route.ts       # NEW: URL fetching endpoint
└── globals.css            # UNCHANGED

components/
├── FileUploader.tsx       # NEW: File upload component
├── URLFetcher.tsx         # NEW: URL fetcher component
├── LanguageToggle.tsx     # NEW: Language switcher
├── CoverLetterForm.tsx    # UPDATED: With translations
└── ...                    # UNCHANGED

messages/                  # NEW: Translation files
├── en.json                # NEW: English translations
└── es.json                # NEW: Spanish translations

middleware.ts              # NEW: i18n middleware
i18n.ts                    # NEW: i18n configuration
```

#### Breaking Changes
- Root route now redirects to `/en` by default
- Old `app/layout.tsx` and `app/page.tsx` need to be removed
- All routes now require locale prefix (`/en` or `/es`)

#### Migration Guide
If you're upgrading from v1.x:

1. **Update dependencies**:
   ```bash
   npm install
   ```

2. **Remove old files**:
   - `app/layout.tsx` (replaced by `app/[locale]/layout.tsx`)
   - `app/page.tsx` (replaced by `app/[locale]/page.tsx`)

3. **Update URLs**:
   - Old: `http://localhost:3000`
   - New: `http://localhost:3000/en` or `http://localhost:3000/es`

4. **Test translations**:
   - Verify all UI elements are translated
   - Test language switching

### Performance

- Added code splitting for locale-specific bundles
- Optimized file parsing with streaming where possible
- Lazy loading of translation files

### Security

- File upload validation (type and size)
- URL validation before fetching
- Sanitization of extracted content
- CORS handling for URL fetching

## [1.0.0] - 2024

### Initial Release

#### Features
- 4 professional cover letter templates
- Real-time preview
- PDF export functionality
- Auto-save to localStorage
- Responsive design
- TypeScript implementation
- Tailwind CSS styling
- Form validation
- Template selector

#### Components
- CoverLetterForm
- CoverLetterPreview
- TemplateSelector
- UI components (Button, Input, Textarea, Label, Card)

#### Tech Stack
- Next.js 14+
- TypeScript 5.6+
- Tailwind CSS 3.4+
- jsPDF + html2canvas
- Lucide React icons

---

## Future Releases

### [2.1.0] - Planned
- [ ] French language support
- [ ] German language support
- [ ] Portuguese language support
- [ ] Additional template options
- [ ] Custom color schemes

### [3.0.0] - Planned
- [ ] User accounts and authentication
- [ ] Cloud storage integration
- [ ] AI-powered content suggestions
- [ ] Email functionality
- [ ] Collaboration features
- [ ] Analytics dashboard

---

**Note**: Version numbers follow [Semantic Versioning](https://semver.org/):
- MAJOR version for incompatible API changes
- MINOR version for added functionality (backwards compatible)
- PATCH version for backwards compatible bug fixes
