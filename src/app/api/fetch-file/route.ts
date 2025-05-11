import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url, fileType } = await req.json();
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }

    // Handle different file types
    if (fileType === 'txt' || fileType === 'csv') {
      const text = await response.text();
      return NextResponse.json({ content: text, type: 'text' });
    } 
    else if (fileType === 'xlsx' || fileType === 'xls') {
      const arrayBuffer = await response.arrayBuffer();
      return NextResponse.json({ 
        content: Array.from(new Uint8Array(arrayBuffer)), 
        type: 'binary' 
      });
    }
    else {
      // For other file types (PDF, doc, docx, etc.), return the URL
      return NextResponse.json({ 
        url: url,
        type: 'url' 
      });
    }
  } catch (error) {
    console.error('Error fetching file:', error);
    return NextResponse.json(
      { error: 'Failed to fetch file' }, 
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    const fileType = searchParams.get('fileType');

    if (!url) {
      return new Response('URL parameter is required', { status: 400 });
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }

    // For PDFs, stream the response directly
    if (fileType === 'pdf') {
      const contentType = response.headers.get('content-type');
      return new Response(response.body, {
        headers: {
          'Content-Type': contentType || 'application/pdf',
          'Content-Disposition': 'inline',
        },
      });
    }

    return new Response('Invalid file type', { status: 400 });
  } catch (error) {
    console.error('Error fetching file:', error);
    return new Response('Failed to fetch file', { status: 500 });
  }
}