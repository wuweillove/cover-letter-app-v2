'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Globe, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';

interface URLInputProps {
  onContentFetched: (data: any) => void;
  onError: (error: string) => void;
}

export function URLInput({ onContentFetched, onError }: URLInputProps) {
  const t = useTranslations('CoverLetter');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateURL = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleFetch = async () => {
    setError(null);

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateURL(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/fetch-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        onContentFetched(result.data);
        setUrl(''); // Clear input on success
      } else {
        throw new Error(result.error || 'Failed to fetch content');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleFetch();
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="job-url" className="text-sm font-medium">
              {t('url.placeholder')}
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="job-url"
                type="url"
                placeholder="https://example.com/job-posting"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleFetch}
                disabled={!url.trim() || isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('status.loading')}
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4" />
                    {t('url.fetch')}
                  </>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500">
            <p>Supported sites: LinkedIn, Indeed, Glassdoor, and most job posting websites</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
