export interface MarketAnalysisRequest {
  businessType: string;
  location: string; // e.g., "Zona Centro", "La Italia"
  targetAudience: string;
  specificQuestions?: string;
}

export interface MarketAnalysisResult {
  summary: string;
  marketSize: {
    currentValue: number; // in USD
    projectedValue: number; // in USD
    unit: string; // e.g., "USD", "clientes"
  };
  growthRate: number; // as a decimal, e.g., 0.05 for 5%
  targetAudienceInsights: string[];
  competitionAnalysis: {
    summary: string;
    directCompetitors: number;
    indirectCompetitors: number;
    topCompetitors: { name: string; strength: string }[];
  };
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  recommendations: string[];
  keyTrends: string[];
  demographics: {
    population: number;
    ageDistribution: { range: string; percentage: number }[];
    incomeLevels: { range: string; percentage: number }[];
  };
  pricingStrategy: {
    recommendedLevel: 'Económico' | 'Medio' | 'Alto' | 'Premium';
    description: string;
  };
}
