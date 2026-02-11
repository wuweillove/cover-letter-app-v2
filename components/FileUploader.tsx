'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { useTranslations } from 'next-intl';

interface FileUploaderProps {
  onFileProcessed: (data: any) => void;
  acceptedFileTypes?: { [key: string]: string[] };
  maxSize?: number;
}

export function FileUploader({
  onFileProcessed,
  acceptedFileTypes = {
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  },
  maxSize = 5242880, // 5MB
}: FileUploaderProps) {
  const t = useTranslations('CoverLetter.file');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process file');
      }

      const data = await response.json();
      onFileProcessed(data);
      setUploadedFile(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('File processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        processFile(acceptedFiles[0]);
      }
    },
    [onFileProcessed]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxSize,
    multiple: false,
  });

  const removeFile = () => {
    setUploadedFile(null);
    setError(null);
  };

  return (
    <div className="w-full">
      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-slate-300 hover:border-slate-400 bg-white'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            {isProcessing ? (
              <>
                <Loader2 className="h-12 w-12 text-slate-400 animate-spin" />
                <p className="text-sm text-slate-600">{t('processing')}</p>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {isDragActive ? t('dropZone') : t('upload')}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{t('supported')}</p>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-slate-900">{uploadedFile.name}</p>
                <p className="text-xs text-slate-500">
                  {(uploadedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={removeFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
