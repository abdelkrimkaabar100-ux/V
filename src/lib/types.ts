export type Language = 'ar' | 'es';

export interface Property {
  id: string;
  title: {
    ar: string;
    es: string;
  };
  description: {
    ar: string;
    es: string;
  };
  city: string;
  country: 'MA' | 'ES';
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  type: 'sale' | 'rent';
  image: string;
  createdAt: Date;
}

export interface City {
  id: string;
  name: {
    ar: string;
    es: string;
  };
  country: 'MA' | 'ES';
  avgPricePerMeter: number;
}

export interface PriceEstimate {
  estimatedPrice: number;
  explanation: {
    ar: string;
    es: string;
  };
  confidence: 'low' | 'medium' | 'high';
}

export interface BudgetAdvice {
  affordableCities: City[];
  recommendedSize: number;
  explanation: {
    ar: string;
    es: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  language: Language;
  timestamp: Date;
}

export interface SellerFormData {
  city: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  additionalDetails?: string;
}