'use client';

import { templates } from '@/lib/templates';
import { TemplateType } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onSelect: (templateId: TemplateType) => void;
}

export default function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Choose a Template</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              'cursor-pointer transition-all hover:shadow-md',
              selectedTemplate === template.id
                ? 'ring-2 ring-slate-900 shadow-md'
                : 'hover:border-slate-400'
            )}
            onClick={() => onSelect(template.id)}
          >
            <CardContent className="p-4">
              <h4 className="font-semibold mb-1">{template.name}</h4>
              <p className="text-sm text-slate-600">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
