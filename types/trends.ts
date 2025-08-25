export interface TrendData {
  id: string; // Added ID for easier lookup
  period: string; // e.g., "Q1 2024", "Jul 2024"
  newBusinesses: number;
  closedBusinesses: number;
  growthRate: number; // percentage, e.g., 0.05 for 5%
}

export interface TrendAnalysis {
  id: string;
  category: string;
  growth: number; // percentage, e.g., 0.10 for 10%
  keyDrivers: string[];
  challenges: string[];
  recommendations: string[];
  summary?: string;
  overallImpact?: "Positivo" | "Neutral" | "Negativo";
  topTrends?: Trend[];
  emergingTrends?: Trend[];
  decliningTrends?: Trend[];
  crossCategoryImpact?: {
    category: string;
    impact: "Positivo" | "Neutral" | "Negativo";
    trends: string[]; // Names of trends
  }[];
  strategicRecommendations?: string[];
}

export interface MarketTrend {
  category: string;
  zones: {
    [zone: string]: {
      current: number;
      growth: number;
      prediction: number;
      confidence: number;
    };
  };
  overall: {
    trend: number;
    volatility: number;
    seasonality: number;
  };
}

export interface SeasonalPattern {
  month: string;
  monthNumber: number;
  categories: {
    [category: string]: {
      multiplier: number;
      description: string;
      confidence: number;
    };
  };
}

export interface HistoricalData {
  yearly: { year: string; businesses: number; revenue: number; employment: number }[];
  monthly: { month: string; businesses: number; growth: number }[];
  categories: { [key: string]: number | string }[]; // Adjusted to allow string for category name
}

export interface EconomicPredictions {
  nextQuarter: {
    businessGrowth: number;
    revenueGrowth: number;
    employmentGrowth: number;
    confidence: number;
  };
  nextYear: {
    businessGrowth: number;
    revenueGrowth: number;
    employmentGrowth: number;
    confidence: number;
  };
  factors: { factor: string; impact: number; description: string }[];
}

export interface Trend {
  id: string;
  name: string;
  description: string;
  category: string; // e.g., 'Consumo', 'Tecnología', 'Servicios'
  impact_level?: 'Bajo' | 'Medio' | 'Alto';
  status: 'emerging' | 'growing' | 'mainstream' | 'declining';
  startDate: string; // YYYY-MM-DD
  impactLevel: 'low' | 'medium' | 'high';
  keywords: string[];
  relatedBusinessIds?: string[]; // IDs of businesses related to this trend
  industryImpact?: { industry: string; impact: 'positive' | 'negative' | 'neutral' }[];
  geographicImpact?: { zoneId: string; impact: 'positive' | 'negative' | 'neutral' }[];
  recommendations?: string[];
  relatedBusinesses?: string[]; // IDs of related businesses
  lastUpdated?: Date;
  growthRate?: number; // percentage
  adoptionRate?: number; // percentage
  keyDrivers?: string[];
  potentialOpportunities?: string[];
  potentialThreats?: string[];
  dataSources?: string[];
}

export interface TrendAnalysisResult {
  trendId: string;
  summary: string;
  drivers: string[];
  implications: string[];
  recommendations: string[];
}

export interface MarketTrendData {
  period: string; // e.g., "2023-Q1"
  newBusinesses: number;
  closedBusinesses: number;
  growthRate: number; // as a decimal
}
