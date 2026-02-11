'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslations } from 'next-intl';
import { Upload, File as FileIcon, CheckCircle, X } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { extractTextFromFile, extractRelevantInfo } from '../lib/file-utils';

interface FileUploadProps {
  onFileProcessed: (data: Partial<any>) => void;
  onError: (error: string) => void;
}

export function FileUpload({ onFileProcessed, onError }: FileUploadProps) {
  const t = useTranslations('CoverLetter');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastProcessedFile, setLastProcessedFile] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsProcessing(true);
    
    try {
      const content = await extractTextFromFile(file);
      const extractedData = extractRelevantInfo(content);
      onFileProcessed(extractedData);
      setLastProcessedFile(file.name);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      onError(`Error processing file: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  }, [onFileProcessed, onError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const clearFile = () => {
    setLastProcessedFile(null);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            
            {isProcessing ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                <p className="text-sm text-gray-600">{t('file.processing')}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <Upload className="w-8 h-8 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {isDragActive ? t('file.dropZone') : t('file.upload')}
                </p>
                <p className="text-xs text-gray-400">{t('file.supported')}</p>
              </div>
            )}
          </div>

          {lastProcessedFile && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-800">
                    File processed: {lastProcessedFile}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFile}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
