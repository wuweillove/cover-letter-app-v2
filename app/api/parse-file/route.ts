import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = '';

    // Process based on file type
    if (file.type === 'application/pdf') {
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else {
      return NextResponse.json(
        { error: 'Unsupported file type' },
        { status: 400 }
      );
    }

    // Parse the extracted text to identify relevant information
    const parsedData = parseResumeContent(extractedText);

    return NextResponse.json({
      success: true,
      data: parsedData,
      rawText: extractedText,
    });
  } catch (error) {
    console.error('File parsing error:', error);
    return NextResponse.json(
      { error: 'Failed to parse file' },
      { status: 500 }
    );
  }
}

function parseResumeContent(text: string) {
  const data: any = {
    skills: '',
    experience: '',
    education: '',
    rawText: text,
  };

  // Extract email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) {
    data.email = emailMatch[0];
  }

  // Extract phone
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    data.phone = phoneMatch[0];
  }

  // Extract potential name (first line that's not empty and looks like a name)
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine.length < 50 && /^[A-Za-z\s]+$/.test(firstLine)) {
      data.name = firstLine;
    }
  }

  // Extract skills section
  const skillsMatch = text.match(/skills?:?\s*([\s\S]*?)(?=experience|education|$)/i);
  if (skillsMatch && skillsMatch[1]) {
    data.skills = skillsMatch[1].trim().substring(0, 500);
  }

  // Extract experience section
  const experienceMatch = text.match(/experience:?\s*([\s\S]*?)(?=education|skills|$)/i);
  if (experienceMatch && experienceMatch[1]) {
    data.experience = experienceMatch[1].trim().substring(0, 1000);
  }

  return data;
}
