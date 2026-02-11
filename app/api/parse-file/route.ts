import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    let text = '';
    const metadata = {
      fileName: file.name,
      fileSize: file.size,
      pageCount: 0,
    };

    // Process based on file type
    if (fileExtension === 'pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const pdfData = await pdfParse(Buffer.from(arrayBuffer));
      text = pdfData.text;
      metadata.pageCount = pdfData.numpages;
    } else if (fileExtension === 'docx') {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      text = result.value;
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Extract relevant information
    const extractedData = extractRelevantInfo(text);

    return NextResponse.json({
      extractedData,
      metadata,
      success: true
    });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}

function extractRelevantInfo(text: string): any {
  const extracted: any = {};
  
  // Extract email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) {
    extracted.email = emailMatch[0];
  }

  // Extract phone number
  const phoneMatch = text.match(/(?:\+1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    extracted.phone = phoneMatch[0];
  }

  // Extract name (first non-empty line that looks like a name)
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine.length < 50 && /^[A-Za-z\s.'-]+$/.test(firstLine)) {
      extracted.name = firstLine;
    }
  }

  // Extract skills section
  const skillsMatch = text.match(/(?:skills?|competencies|expertise|technical skills?)[:.]?\s*([\s\S]{0,500}?)(?:\n\n|experience|education|$)/i);
  if (skillsMatch && skillsMatch[1]) {
    extracted.skills = skillsMatch[1].trim();
  }

  // Extract experience section
  const experienceMatch = text.match(/(?:experience|work history|employment)[:.]?\s*([\s\S]{0,1000}?)(?:\n\n|education|skills|$)/i);
  if (experienceMatch && experienceMatch[1]) {
    extracted.experience = experienceMatch[1].trim();
  }

  // Extract education section
  const educationMatch = text.match(/(?:education|academic background)[:.]?\s*([\s\S]{0,500}?)(?:\n\n|experience|skills|$)/i);
  if (educationMatch && educationMatch[1]) {
    extracted.education = educationMatch[1].trim();
  }

  return extracted;
}

// GET method for health check
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'File parsing API is ready' 
  });
}
