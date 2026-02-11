'use client';

import { useState } from 'react';
import { Globe, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { useTranslations } from 'next-intl';

interface URLFetcherProps {
  onContentFetched: (data: any) => void;
}

export function URLFetcher({ onContentFetched }: URLFetcherProps) {
  const t = useTranslations('CoverLetter.url');
  const tStatus = useTranslations('CoverLetter.status');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!url) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/fetch-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }

      const data = await response.json();
      onContentFetched(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('URL fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="job-url">{t('placeholder')}</Label>
        <div className="flex gap-2 mt-2">
          <Input
            id="job-url"
            type="url"
            placeholder="https://example.com/job-posting"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleFetch}
            disabled={!url || isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {tStatus('loading')}
              </>
            ) : (
              <>
                <Globe className="h-4 w-4" />
                {t('fetch')}
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
