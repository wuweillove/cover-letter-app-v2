'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    router.push(`/${newLocale}`);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Languages className="w-4 h-4" />
      {locale === 'en' ? 'ES' : 'EN'}
    </Button>
  );
}
