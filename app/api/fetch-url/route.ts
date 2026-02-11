import { NextRequest, NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'No URL provided' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch the webpage content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch URL content' },
        { status: response.status }
      );
    }

    const html = await response.text();
    
    // Parse HTML content
    const $ = cheerio.load(html);
    
    // Remove script and style elements
    $('script, style, nav, header, footer').remove();
    
    // Extract text content
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
    
    // Try to extract structured information
    const parsedData = parseJobDescription(bodyText, $);

    return NextResponse.json({
      success: true,
      data: parsedData,
      rawText: bodyText.substring(0, 5000), // Limit raw text
    });
  } catch (error) {
    console.error('URL fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch and parse URL content' },
      { status: 500 }
    );
  }
}

function parseJobDescription(text: string, $: cheerio.CheerioAPI) {
  const data: any = {
    description: '',
    requirements: '',
    responsibilities: '',
  };

  // Extract job title (often in h1 or title)
  const title = $('h1').first().text().trim() || $('title').text().trim();
  if (title) {
    data.jobTitle = title;
  }

  // Extract company name (common patterns)
  const companySelectors = [
    '[class*="company"]',
    '[class*="employer"]',
    '[data-company]',
  ];
  
  for (const selector of companySelectors) {
    const company = $(selector).first().text().trim();
    if (company && company.length < 100) {
      data.companyName = company;
      break;
    }
  }

  // Extract requirements section
  const requirementsMatch = text.match(/requirements?:?\s*([\s\S]*?)(?=responsibilities|qualifications|about|$)/i);
  if (requirementsMatch && requirementsMatch[1]) {
    data.requirements = requirementsMatch[1].trim().substring(0, 1000);
  }

  // Extract responsibilities section
  const responsibilitiesMatch = text.match(/responsibilities?:?\s*([\s\S]*?)(?=requirements|qualifications|about|$)/i);
  if (responsibilitiesMatch && responsibilitiesMatch[1]) {
    data.responsibilities = responsibilitiesMatch[1].trim().substring(0, 1000);
  }

  // Extract qualifications
  const qualificationsMatch = text.match(/qualifications?:?\s*([\s\S]*?)(?=requirements|responsibilities|about|$)/i);
  if (qualificationsMatch && qualificationsMatch[1]) {
    data.qualifications = qualificationsMatch[1].trim().substring(0, 1000);
  }

  // If no structured data found, use first 1000 chars as description
  if (!data.requirements && !data.responsibilities) {
    data.description = text.substring(0, 1000);
  }

  return data;
}
