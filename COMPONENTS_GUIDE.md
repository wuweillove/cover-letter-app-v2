# Components Guide

## Overview

This document provides detailed information about all components in the Cover Letter Generator v2 application.

## Component Structure

### 📁 Core Components

#### **1. FileUpload.tsx**
**Location:** `components/FileUpload.tsx`

**Purpose:** Handles file uploads for resumes (PDF and DOCX)

**Features:**
- Drag-and-drop interface using react-dropzone
- Support for PDF and DOCX files
- 5MB file size limit
- Client-side file processing
- Automatic data extraction (name, email, phone, skills, experience)
- Success/error state management
- File removal functionality

**Props:**
```typescript
interface FileUploadProps {
  onFileProcessed: (data: Partial<any>) => void;
  onError: (error: string) => void;
}
```

**Usage:**
```tsx
<FileUpload 
  onFileProcessed={handleFileProcessed}
  onError={handleError}
/>
```

---

#### **2. URLInput.tsx**
**Location:** `components/URLInput.tsx`

**Purpose:** Fetches and parses job descriptions from URLs

**Features:**
- URL input with validation
- Fetch job postings from major job sites
- Automatic parsing of job details
- Loading states
- Error handling
- Enter key support
- Success/error feedback

**Props:**
```typescript
interface URLInputProps {
  onContentFetched: (data: any) => void;
  onError: (error: string) => void;
}
```

**Usage:**
```tsx
<URLInput 
  onContentFetched={handleUrlContentFetched}
  onError={handleError}
/>
```

**Supported Sites:**
- LinkedIn
- Indeed
- Glassdoor
- Most standard job posting sites

---

#### **3. LanguageToggle.tsx**
**Location:** `components/LanguageToggle.tsx`

**Purpose:** Switch between available languages

**Features:**
- Toggle between EN/ES
- Smooth locale switching
- Router integration
- Icon display

**Usage:**
```tsx
<LanguageToggle />
```

---

#### **4. CoverLetterForm.tsx**
**Location:** `components/CoverLetterForm.tsx`

**Purpose:** Main form for entering cover letter information

**Features:**
- Internationalized labels and placeholders
- Organized into sections:
  - Personal Information
  - Company Information
  - Experience
  - Skills & Details
- Real-time data updates
- Form validation

**Props:**
```typescript
interface CoverLetterFormProps {
  data: CoverLetterData;
  onChange: (data: CoverLetterData) => void;
}
```

---

#### **5. CoverLetterPreview.tsx**
**Location:** `components/CoverLetterPreview.tsx`

**Purpose:** Real-time preview of the cover letter

**Features:**
- Live preview updates
- Template-based rendering
- PDF export compatible
- Styled output

---

#### **6. TemplateSelector.tsx**
**Location:** `components/TemplateSelector.tsx`

**Purpose:** Select from available cover letter templates

**Features:**
- 4 template options:
  - Professional
  - Modern
  - Creative
  - Minimal
- Visual template preview
- Template switching

---

### 🛠️ Utility Components (UI Library)

#### **Button.tsx**
**Location:** `components/ui/Button.tsx`

**Variants:**
- `default` - Primary button
- `outline` - Outlined button
- `ghost` - Minimal button
- `destructive` - Danger/delete button

**Sizes:**
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large

---

#### **Input.tsx**
**Location:** `components/ui/Input.tsx`

Standard input component with consistent styling.

---

#### **Textarea.tsx**
**Location:** `components/ui/Textarea.tsx`

Multi-line text input with consistent styling.

---

#### **Label.tsx**
**Location:** `components/ui/Label.tsx`

Form label component.

---

#### **Card.tsx**
**Location:** `components/ui/Card.tsx`

Container component with variants:
- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title element
- `CardContent` - Content section

---

## 📚 Utility Files

### **lib/file-utils.ts**
**Purpose:** File processing utilities

**Functions:**

1. **extractTextFromFile(file: File): Promise<string>**
   - Extracts text from PDF or DOCX files
   - Uses pdf-parse for PDFs
   - Uses mammoth for DOCX

2. **extractRelevantInfo(text: string): object**
   - Parses extracted text
   - Identifies: name, email, phone, skills, experience, education
   - Uses regex patterns

3. **validateFile(file: File): { valid: boolean; error?: string }**
   - Validates file type and size
   - Returns validation result

4. **formatExtractedData(data: any): object**
   - Formats parsed data for form
   - Structures data to match CoverLetterData type

---

### **lib/types.ts**
**Purpose:** TypeScript type definitions

**Main Types:**

```typescript
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CompanyInfo {
  companyName: string;
  position: string;
  hiringManager: string;
}

interface ExperienceInfo {
  currentRole: string;
  yearsOfExperience: string;
}

interface CoverLetterData {
  personalInfo: PersonalInfo;
  companyInfo: CompanyInfo;
  experienceInfo: ExperienceInfo;
  skills: string;
  achievements: string;
  customMessage: string;
  templateId: string;
}

type TemplateType = 'professional' | 'modern' | 'creative' | 'minimal';
```

---

### **lib/utils.ts**
**Purpose:** General utility functions

**Functions:**
- `saveDraft(data: any): void` - Save to localStorage
- `loadDraft<T>(): T | null` - Load from localStorage
- `clearDraft(): void` - Clear localStorage
- `cn(...classes: string[]): string` - Tailwind class merger

---

### **lib/pdf-export.ts**
**Purpose:** PDF export functionality

**Function:**
- `exportToPDF(elementId: string, filename: string): Promise<void>`
- Uses jsPDF and html2canvas
- Converts preview to PDF

---

## 🌐 API Routes

### **app/api/parse-file/route.ts**
**Purpose:** Parse uploaded files server-side

**Endpoint:** `POST /api/parse-file`

**Request:**
```typescript
FormData with 'file' field
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    name?: string;
    email?: string;
    phone?: string;
    skills?: string;
    experience?: string;
  };
  rawText: string;
}
```

---

### **app/api/fetch-url/route.ts**
**Purpose:** Fetch and parse job descriptions from URLs

**Endpoint:** `POST /api/fetch-url`

**Request:**
```typescript
{
  url: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    companyName: string;
    position: string;
    description: string;
    requirements: string;
    responsibilities: string;
    qualifications: string;
  };
  rawText: string;
}
```

**Also supports:** `GET /api/fetch-url` for health check

---

## 🎨 Component Usage Examples

### Complete Integration Example

```tsx
'use client';

import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { URLInput } from '@/components/URLInput';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function Page() {
  const [formData, setFormData] = useState({});

  const handleFileProcessed = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleUrlFetched = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <LanguageToggle />
      
      <FileUpload 
        onFileProcessed={handleFileProcessed}
        onError={handleError}
      />
      
      <URLInput 
        onContentFetched={handleUrlFetched}
        onError={handleError}
      />
    </div>
  );
}
```

---

## 🔄 Data Flow

### File Upload Flow
```
User drops file → FileUpload component
  ↓
extractTextFromFile (lib/file-utils.ts)
  ↓
extractRelevantInfo (lib/file-utils.ts)
  ↓
onFileProcessed callback
  ↓
Form data updated
```

### URL Fetch Flow
```
User enters URL → URLInput component
  ↓
POST /api/fetch-url
  ↓
cheerio parses HTML
  ↓
parseJobDescription extracts data
  ↓
onContentFetched callback
  ↓
Form data updated
```

### Language Switch Flow
```
User clicks toggle → LanguageToggle component
  ↓
Router pushes new locale
  ↓
Middleware intercepts
  ↓
Page reloads with new locale
  ↓
Translations updated
```

---

## 🎯 Best Practices

### Component Guidelines

1. **Always use TypeScript types**
   ```tsx
   interface MyComponentProps {
     data: CoverLetterData;
     onChange: (data: CoverLetterData) => void;
   }
   ```

2. **Use translations for all text**
   ```tsx
   const t = useTranslations('CoverLetter');
   <p>{t('file.upload')}</p>
   ```

3. **Handle errors gracefully**
   ```tsx
   try {
     await processFile(file);
   } catch (error) {
     onError(error.message);
   }
   ```

4. **Provide user feedback**
   ```tsx
   const [isLoading, setIsLoading] = useState(false);
   {isLoading && <Spinner />}
   ```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: File upload not working**
- Check file size (must be < 5MB)
- Verify file type (PDF or DOCX only)
- Ensure mammoth and pdf-parse are installed

**Issue: URL fetch fails**
- Some sites block scraping
- Check CORS settings
- Verify URL is accessible

**Issue: Translations not showing**
- Check locale is correct
- Verify translation keys exist
- Restart dev server

---

## 📈 Performance Tips

1. **File Processing**
   - Process files client-side when possible
   - Use Web Workers for large files
   - Limit file size to 5MB

2. **URL Fetching**
   - Cache common job sites
   - Implement rate limiting
   - Use server-side fetching

3. **Rendering**
   - Use React.memo for preview component
   - Debounce form inputs
   - Lazy load heavy components

---

## 🔐 Security Considerations

1. **File Upload**
   - Validate file types
   - Limit file sizes
   - Scan for malicious content

2. **URL Fetching**
   - Validate URLs
   - Sanitize extracted content
   - Implement rate limiting

3. **Data Storage**
   - Don't store sensitive data
   - Clear localStorage on logout
   - Use secure connections

---

## 📝 Adding New Components

### Template

```tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface MyComponentProps {
  // Define props
}

export function MyComponent({ }: MyComponentProps) {
  const t = useTranslations('CoverLetter');

  return (
    <div>
      {/* Component content */}
    </div>
  );
}
```

### Checklist
- [ ] Create component file
- [ ] Define TypeScript interfaces
- [ ] Add translations
- [ ] Write documentation
- [ ] Add tests (if applicable)
- [ ] Update this guide

---

**Last Updated:** February 11, 2026  
**Version:** 2.0.0
