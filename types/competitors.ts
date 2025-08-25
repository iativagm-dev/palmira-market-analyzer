export interface Competitor {
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
  pricingStrategy?: 'Económico' | 'Medio' | 'Alto' | 'Premium';
  marketShare?: number; // as percentage, e.g., 0.15 for 15%
  strengthScore?: number; // 0-100
  weaknessScore?: number; // 0-100
  keyFeatures?: string[];
  keyStrategies?: string[];
  customerSatisfactionScore?: number; // 1-5 scale
  nearbyBusinesses?: number; // count of businesses in close proximity
  nearbyResidentialDensity?: 'low' | 'medium' | 'high';
  annualRevenue?: number; // in USD
  employeeCount?: number;
  growthRateLastYear?: string; // e.g., "+10%", "-5%"
  status: 'active' | 'new' | 'closed';
  zoneId: string; // Link to a zone
}

export interface CompetitiveAnalysis {
  id: string;
  competitorId: string;
  marketShareEstimate: number; // as percentage
  growthRateEstimate: number; // as decimal
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  pricingComparison: {
    yourPriceLevel: 'Económico' | 'Medio' | 'Alto' | 'Premium';
    competitorPriceLevel: 'Económico' | 'Medio' | 'Alto' | 'Premium';
    difference: string; // e.g., "Competitor is 10% cheaper"
  };
  recommendations: string[];
}

export interface ProximityAnalysis {
  id: string;
  competitorId: string;
  zoneId: string;
  proximityScore: number; // 0-100
  nearbyBusinesses: { name: string; category: string; distanceKm: number }[];
  strategicImplications: string[];
}

export interface BenchmarkData {
  id: string;
  category: string;
  averageMarketShare: number; // as percentage
  averageGrowthRate: number; // as decimal
  averageRating: number;
  topPerformers: { name: string; marketShare: number; growthRate: number }[];
  industryChallenges: string[];
}

export interface CompetitorMovement {
  id: string;
  competitorId: string;
  date: string; // YYYY-MM-DD
  type: 'new_location' | 'promotion_launch' | 'product_launch' | 'closure';
  description: string;
  zoneId?: string; // If applicable
}
