'use client';

import { ChangeEvent, FormEvent } from 'react';
import { CoverLetterData } from '@/lib/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface CoverLetterFormProps {
  data: CoverLetterData;
  onChange: (data: CoverLetterData) => void;
}

export default function CoverLetterForm({ data, onChange }: CoverLetterFormProps) {
  const handleChange = (field: string, value: string, section?: string) => {
    if (section) {
      onChange({
        ...data,
        [section]: {
          ...(data[section as keyof CoverLetterData] as object),
          [field]: value,
        },
      });
    } else {
      onChange({ ...data, [field]: value });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
    if (field) {
      handleChange(field, value, section);
    } else {
      handleChange(section, value);
    }
  };

  return (
    <form className="space-y-6" onSubmit={(e: FormEvent) => e.preventDefault()}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="personalInfo.name">Full Name *</Label>
            <Input
              id="personalInfo.name"
              name="personalInfo.name"
              value={data.personalInfo.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <Label htmlFor="personalInfo.email">Email *</Label>
            <Input
              id="personalInfo.email"
              name="personalInfo.email"
              type="email"
              value={data.personalInfo.email}
              onChange={handleInputChange}
              placeholder="john.doe@email.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="personalInfo.phone">Phone</Label>
            <Input
              id="personalInfo.phone"
              name="personalInfo.phone"
              type="tel"
              value={data.personalInfo.phone}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="personalInfo.address">Address</Label>
            <Input
              id="personalInfo.address"
              name="personalInfo.address"
              value={data.personalInfo.address}
              onChange={handleInputChange}
              placeholder="City, State, ZIP"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="companyInfo.companyName">Company Name *</Label>
            <Input
              id="companyInfo.companyName"
              name="companyInfo.companyName"
              value={data.companyInfo.companyName}
              onChange={handleInputChange}
              placeholder="Acme Corporation"
              required
            />
          </div>
          <div>
            <Label htmlFor="companyInfo.position">Position *</Label>
            <Input
              id="companyInfo.position"
              name="companyInfo.position"
              value={data.companyInfo.position}
              onChange={handleInputChange}
              placeholder="Senior Software Engineer"
              required
            />
          </div>
          <div>
            <Label htmlFor="companyInfo.hiringManager">Hiring Manager</Label>
            <Input
              id="companyInfo.hiringManager"
              name="companyInfo.hiringManager"
              value={data.companyInfo.hiringManager}
              onChange={handleInputChange}
              placeholder="Jane Smith"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="experienceInfo.currentRole">Current Role *</Label>
            <Input
              id="experienceInfo.currentRole"
              name="experienceInfo.currentRole"
              value={data.experienceInfo.currentRole}
              onChange={handleInputChange}
              placeholder="Software Engineer"
              required
            />
          </div>
          <div>
            <Label htmlFor="experienceInfo.yearsOfExperience">Years of Experience *</Label>
            <Input
              id="experienceInfo.yearsOfExperience"
              name="experienceInfo.yearsOfExperience"
              value={data.experienceInfo.yearsOfExperience}
              onChange={handleInputChange}
              placeholder="5"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Skills & Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="skills">Key Skills *</Label>
            <Textarea
              id="skills"
              name="skills"
              value={data.skills}
              onChange={handleInputChange}
              placeholder="List your relevant skills, separated by commas"
              rows={3}
              required
            />
          </div>
          <div>
            <Label htmlFor="achievements">Notable Achievements</Label>
            <Textarea
              id="achievements"
              name="achievements"
              value={data.achievements}
              onChange={handleInputChange}
              placeholder="Describe your key accomplishments and impact"
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="customMessage">Custom Message/Motivation *</Label>
            <Textarea
              id="customMessage"
              name="customMessage"
              value={data.customMessage}
              onChange={handleInputChange}
              placeholder="Why are you interested in this position? What makes you a great fit?"
              rows={6}
              required
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
