import { NextRequest, NextResponse } from 'next/server';
import { generatePropertyDescription } from '@/lib/groq';

let properties: any[] = [];

export async function GET() {
  return NextResponse.json({ properties });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { city, size, bedrooms, bathrooms, propertyType, additionalDetails, language } = data;

    const aiContent = await generatePropertyDescription(
      city,
      size,
      bedrooms,
      bathrooms,
      language as 'ar' | 'es'
    );

    const newProperty = {
      id: Date.now().toString(),
      title: aiContent.title,
      description: aiContent.description,
      city,
      size,
      bedrooms,
      bathrooms,
      propertyType,
      additionalDetails,
      createdAt: new Date(),
    };

    properties.push(newProperty);

    return NextResponse.json({ property: newProperty }, { status: 201 });
  } catch (error) {
    console.error('Property API error:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}