'use client';

import { useState, useEffect } from 'react';
import { Save, Download, Trash2, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CoverLetterForm from '@/components/CoverLetterForm';
import CoverLetterPreview from '@/components/CoverLetterPreview';
import TemplateSelector from '@/components/TemplateSelector';
import { FileUploader } from '@/components/FileUploader';
import { URLFetcher } from '@/components/URLFetcher';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CoverLetterData, TemplateType } from '@/lib/types';
import { saveDraft, loadDraft, clearDraft } from '@/lib/utils';
import { exportToPDF } from '@/lib/pdf-export';

const initialData: CoverLetterData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
  },
  companyInfo: {
    companyName: '',
    position: '',
    hiringManager: '',
  },
  experienceInfo: {
    currentRole: '',
    yearsOfExperience: '',
  },
  skills: '',
  achievements: '',
  customMessage: '',
  templateId: 'professional',
};

export default function Home() {
  const t = useTranslations('CoverLetter');
  const [data, setData] = useState<CoverLetterData>(initialData);
  const [isSaved, setIsSaved] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Load saved draft on mount
  useEffect(() => {
    const savedData = loadDraft<CoverLetterData>();
    if (savedData) {
      setData(savedData);
      setIsSaved(true);
    }
  }, []);

  // Auto-save on data change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (data.personalInfo.name || data.companyInfo.companyName) {
        saveDraft(data);
        setIsSaved(true);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [data]);

  const handleSaveDraft = () => {
    saveDraft(data);
    setIsSaved(true);
    alert('Draft saved successfully!');
  };

  const handleClearDraft = () => {
    if (confirm('Are you sure you want to clear all data?')) {
      clearDraft();
      setData(initialData);
      setIsSaved(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      const filename = `cover-letter-${data.companyInfo.companyName || 'draft'}.pdf`;
      await exportToPDF('cover-letter-preview', filename);
      alert('PDF exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleTemplateChange = (templateId: TemplateType) => {
    setData({ ...data, templateId });
  };

  const handleFileProcessed = (fileData: any) => {
    // Merge parsed data with existing data
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...(fileData.name && { name: fileData.name }),
        ...(fileData.email && { email: fileData.email }),
        ...(fileData.phone && { phone: fileData.phone }),
      },
      ...(fileData.skills && { skills: fileData.skills }),
      ...(fileData.experience && { achievements: fileData.experience }),
    }));
  };

  const handleUrlContentFetched = (urlData: any) => {
    // Merge fetched URL data with existing data
    setData((prev) => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        ...(urlData.companyName && { companyName: urlData.companyName }),
        ...(urlData.jobTitle && { position: urlData.jobTitle }),
      },
      ...(urlData.requirements && { 
        customMessage: `${prev.customMessage}\n\nPosition Requirements:\n${urlData.requirements}` 
      }),
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-slate-900" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{t('title')}</h1>
                <p className="text-sm text-slate-600">{t('subtitle')}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <LanguageToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveDraft}
                className="hidden sm:flex"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaved ? t('buttons.save') : t('buttons.save')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearDraft}
                className="hidden sm:flex"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {t('buttons.clear')}
              </Button>
              <Button
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting}
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : t('buttons.generatePDF')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Template Selector */}
        <div className="mb-8">
          <TemplateSelector
            selectedTemplate={data.templateId as TemplateType}
            onSelect={handleTemplateChange}
          />
        </div>

        {/* File Upload and URL Fetcher */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('file.upload')}</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploader onFileProcessed={handleFileProcessed} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fetch Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <URLFetcher onContentFetched={handleUrlContentFetched} />
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Column */}
          <div className="space-y-6">
            <div className="lg:sticky lg:top-4">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                {t('sections.personalInfo')}
              </h2>
              <CoverLetterForm data={data} onChange={setData} />
              
              {/* Mobile Action Buttons */}
              <div className="flex gap-2 mt-6 sm:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveDraft}
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {t('buttons.save')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearDraft}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t('buttons.clear')}
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Column */}
          <div className="space-y-4">
            <div className="lg:sticky lg:top-4">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                {t('buttons.preview')}
              </h2>
              <div className="bg-slate-200 p-4 rounded-lg">
                <CoverLetterPreview data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-600">
            Created by Sebastian Llovera Studio • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}
