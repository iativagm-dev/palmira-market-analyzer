export interface Zone {
  id: string;
  name: string;
  description: string;
  location: string; // e.g., "Norte de Palmira"
  area_sq_km: number;
  population: number;
  average_income: number; // in USD
  growth_rate: string; // e.g., "Alto", "Medio", "Bajo"
  key_businesses: string[]; // Names of key businesses or categories
  // Demographics
  demographics: {
    population: number;
    ageDistribution: {
      '0-14': number; // percentage
      '15-64': number; // percentage
      '65+': number; // percentage
    };
    incomeLevels: {
      'low': number; // percentage
      'medium': number; // percentage
      'high': number; // percentage
    };
    educationLevel: {
      primary: number; // percentage
      secondary: number; // percentage
      higher: number; // percentage
    };
  };
  // Business Metrics
  businessMetrics: {
    totalBusinesses: number;
    newBusinessesLastYear: number;
    closedBusinessesLastYear: number;
    topCategories: string[]; // e.g., ['Retail', 'Food & Beverage']
    averageBusinessAge: number; // in years
  };
  // Opportunities
  opportunities: {
    score: number; // 0-100
    description: string;
    categories: string[]; // e.g., ['New Retail', 'Tourism']
  };
  // Challenges
  challenges: {
    score: number; // 0-100
    description: string;
    issues: string[]; // e.g., ['Traffic Congestion', 'High Competition']
  };
  // For map integration
  latitude: number;
  longitude: number;
}
