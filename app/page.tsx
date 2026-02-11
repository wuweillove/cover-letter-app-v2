'use client';

import { useState, useEffect } from 'react';
import { Save, Download, Trash2, FileText } from 'lucide-react';
import CoverLetterForm from '@/components/CoverLetterForm';
import CoverLetterPreview from '@/components/CoverLetterPreview';
import TemplateSelector from '@/components/TemplateSelector';
import { Button } from '@/components/ui/Button';
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-slate-900" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Cover Letter Generator</h1>
                <p className="text-sm text-slate-600">Create professional cover letters in minutes</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveDraft}
                className="hidden sm:flex"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaved ? 'Saved' : 'Save Draft'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearDraft}
                className="hidden sm:flex"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting}
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export PDF'}
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Column */}
          <div className="space-y-6">
            <div className="lg:sticky lg:top-4">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Your Information</h2>
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
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearDraft}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Column */}
          <div className="space-y-4">
            <div className="lg:sticky lg:top-4">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Preview</h2>
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
