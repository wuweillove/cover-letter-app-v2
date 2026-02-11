export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface CompanyInfo {
  companyName: string;
  position: string;
  hiringManager: string;
}

export interface ExperienceInfo {
  currentRole: string;
  yearsOfExperience: string;
}

export interface CoverLetterData {
  personalInfo: PersonalInfo;
  companyInfo: CompanyInfo;
  experienceInfo: ExperienceInfo;
  skills: string;
  achievements: string;
  customMessage: string;
  templateId: string;
}

export type TemplateType = 'professional' | 'modern' | 'creative' | 'minimal';

export interface Template {
  id: TemplateType;
  name: string;
  description: string;
}
