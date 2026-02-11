import { NextRequest, NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'No URL provided' },
        { status: 400 }
      );
    }

    // Validate URL format
    let validUrl: URL;
    try {
      validUrl = new URL(url);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch the webpage content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Failed to fetch URL: ${response.statusText}` },
        { status: response.status }
      );
    }

    const html = await response.text();
    
    // Parse HTML content with cheerio
    const $ = cheerio.load(html);
    
    // Remove unwanted elements
    $('script, style, nav, header, footer, iframe, noscript').remove();
    
    // Extract text content
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
    
    // Parse job description data
    const parsedData = parseJobDescription(bodyText, $);

    return NextResponse.json({
      success: true,
      data: parsedData,
      rawText: bodyText.substring(0, 3000), // Limit raw text to 3000 chars
    });
  } catch (error) {
    console.error('URL fetch error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch and parse URL content' 
      },
      { status: 500 }
    );
  }
}

function parseJobDescription(text: string, $: cheerio.CheerioAPI) {
  const data: any = {
    companyName: '',
    position: '',
    description: '',
    requirements: '',
    responsibilities: '',
    qualifications: '',
  };

  // Extract job title (often in h1, title, or specific classes)
  const titleSelectors = [
    'h1',
    '[class*="job-title"]',
    '[class*="jobTitle"]',
    '[class*="position"]',
    '[data-job-title]',
    'title'
  ];
  
  for (const selector of titleSelectors) {
    const title = $(selector).first().text().trim();
    if (title && title.length > 0 && title.length < 150) {
      data.position = title.replace(/\s*\|\s*.*$/, '').trim(); // Remove company name if present
      break;
    }
  }

  // Extract company name (common patterns and selectors)
  const companySelectors = [
    '[class*="company"]',
    '[class*="employer"]',
    '[class*="organization"]',
    '[data-company]',
    '[itemprop="hiringOrganization"]',
  ];
  
  for (const selector of companySelectors) {
    const company = $(selector).first().text().trim();
    if (company && company.length > 0 && company.length < 100) {
      data.companyName = company;
      break;
    }
  }

  // If company not found in selectors, try to extract from text
  if (!data.companyName) {
    const companyMatch = text.match(/(?:at|@)\s+([A-Z][A-Za-z\s&,.-]{2,50})(?:\s+is hiring|\s+seeks|\s+is looking)/i);
    if (companyMatch && companyMatch[1]) {
      data.companyName = companyMatch[1].trim();
    }
  }

  // Extract requirements section
  const requirementsPatterns = [
    /(?:requirements?|qualifications?|what (?:you'll need|we're looking for))[:.]?\s*([\s\S]{50,1500}?)(?=\n\n|responsibilities|about|benefits|$)/i,
    /(?:required|must have)[:.]?\s*([\s\S]{50,1000}?)(?=\n\n|preferred|nice to have|responsibilities|$)/i,
  ];

  for (const pattern of requirementsPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      data.requirements = match[1].trim();
      break;
    }
  }

  // Extract responsibilities section
  const responsibilitiesPatterns = [
    /(?:responsibilities|what you(?:'ll| will) do|role overview|job duties)[:.]?\s*([\s\S]{50,1500}?)(?=\n\n|requirements|qualifications|about|$)/i,
    /(?:you will|you'll)[:.]?\s*([\s\S]{50,1000}?)(?=\n\n|requirements|qualifications|$)/i,
  ];

  for (const pattern of responsibilitiesPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      data.responsibilities = match[1].trim();
      break;
    }
  }

  // Extract qualifications
  const qualificationsMatch = text.match(/(?:preferred qualifications?|nice to have|bonus)[:.]?\s*([\s\S]{50,1000}?)(?=\n\n|requirements|responsibilities|about|$)/i);
  if (qualificationsMatch && qualificationsMatch[1]) {
    data.qualifications = qualificationsMatch[1].trim();
  }

  // Extract job description/overview
  const descriptionMatch = text.match(/(?:job description|about (?:the|this) (?:role|position)|overview)[:.]?\s*([\s\S]{50,1000}?)(?=\n\n|requirements|responsibilities|qualifications|$)/i);
  if (descriptionMatch && descriptionMatch[1]) {
    data.description = descriptionMatch[1].trim();
  }

  // If no structured data found, use first meaningful chunk as description
  if (!data.requirements && !data.responsibilities && !data.description) {
    const meaningfulText = text.substring(0, 800).trim();
    if (meaningfulText) {
      data.description = meaningfulText;
    }
  }

  // Clean up extracted data
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string') {
      data[key] = data[key]
        .replace(/\s+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    }
  });

  return data;
}

// GET method for health check
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'URL fetching API is ready' 
  });
}
