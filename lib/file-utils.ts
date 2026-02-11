import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';

/**
 * Extract text content from uploaded file (PDF or DOCX)
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (file.type === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  } else if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else {
    throw new Error('Unsupported file type');
  }
}

/**
 * Extract relevant information from text content
 */
export function extractRelevantInfo(text: string): {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string;
  experience?: string;
  education?: string;
} {
  const data: any = {};

  // Extract email
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) {
    data.email = emailMatch[0];
  }

  // Extract phone number (various formats)
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) {
    data.phone = phoneMatch[0];
  }

  // Extract name (first few words that look like a name)
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    // Name is typically short and contains only letters and spaces
    if (firstLine.length < 50 && /^[A-Za-z\s.'-]+$/.test(firstLine)) {
      data.name = firstLine;
    }
  }

  // Extract skills section
  const skillsRegex = /(?:skills?|technical skills?|competencies)[:.]?\s*([\s\S]{0,500}?)(?:\n\n|experience|education|$)/i;
  const skillsMatch = text.match(skillsRegex);
  if (skillsMatch && skillsMatch[1]) {
    data.skills = skillsMatch[1].trim();
  }

  // Extract experience section
  const experienceRegex = /(?:experience|work history|employment)[:.]?\s*([\s\S]{0,1000}?)(?:\n\n|education|skills|$)/i;
  const experienceMatch = text.match(experienceRegex);
  if (experienceMatch && experienceMatch[1]) {
    data.experience = experienceMatch[1].trim();
  }

  // Extract education section
  const educationRegex = /(?:education|academic background)[:.]?\s*([\s\S]{0,500}?)(?:\n\n|experience|skills|$)/i;
  const educationMatch = text.match(educationRegex);
  if (educationMatch && educationMatch[1]) {
    data.education = educationMatch[1].trim();
  }

  return data;
}

/**
 * Validate file before processing
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 5MB limit' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only PDF and DOCX files are supported' };
  }

  return { valid: true };
}

/**
 * Format extracted data for cover letter
 */
export function formatExtractedData(data: any) {
  return {
    personalInfo: {
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      address: '',
    },
    skills: data.skills || '',
    achievements: data.experience || '',
  };
}
