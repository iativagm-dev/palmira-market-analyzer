export interface Business {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  website?: string;
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
  // Additional fields for business directory
  ownerName?: string;
  foundingDate?: string;
  employeeCount?: number;
  annualRevenue?: number; // in USD
  productsServices?: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  status: 'active' | 'closed' | 'new';
  zoneId: string; // Link to a zone
  // For map integration
  latitude: number;
  longitude: number;
}
