import type { Trend, TrendAnalysis, MarketTrendData } from '@/types/trends';

export const mockTrends: Trend[] = [
  {
    id: 't1',
    name: 'Comida Saludable y Orgánica',
    description: 'Creciente demanda por productos alimenticios naturales, orgánicos y saludables.',
    startDate: '2022-01-01',
    impactLevel: 'high',
    status: 'growing',
    keywords: ['orgánico', 'saludable', 'natural', 'bienestar', 'vegano'],
    relatedBusinessIds: ['b1', 'b2'], // Example related businesses
    industryImpact: [
      { industry: 'Alimentos y Bebidas', impact: 'positive' },
      { industry: 'Restaurantes', impact: 'positive' },
      { industry: 'Supermercados', impact: 'positive' },
    ],
    geographicImpact: [
      { zoneId: 'zone-la-italia', impact: 'positive' },
      { zoneId: 'zone-campestre', impact: 'positive' },
    ],
    recommendations: [
      'Desarrollar alianzas con productores locales.',
      'Ofrecer opciones de entrega a domicilio.',
      'Invertir en marketing digital enfocado en beneficios para la salud.',
    ],
  },
  {
    id: 't2',
    name: 'E-commerce Local',
    description: 'Auge de las plataformas de comercio electrónico para negocios locales en Palmira.',
    startDate: '2020-03-01',
    impactLevel: 'high',
    status: 'mainstream',
    keywords: ['online', 'delivery', 'digital', 'comercio electrónico', 'logística'],
    relatedBusinessIds: ['b3', 'b9'],
    industryImpact: [
      { industry: 'Retail', impact: 'positive' },
      { industry: 'Logística', impact: 'positive' },
      { industry: 'Servicios Financieros', impact: 'neutral' },
    ],
    geographicImpact: [
      { zoneId: 'zone-centro', impact: 'positive' },
      { zoneId: 'zone-obrero', impact: 'positive' },
    ],
    recommendations: [
      'Crear una tienda online optimizada.',
      'Ofrecer opciones de recogida en tienda.',
      'Participar en plataformas de e-commerce locales.',
    ],
  },
  {
    id: 't3',
    name: 'Bienestar y Fitness Personalizado',
    description: 'Creciente interés en la salud física y mental, con demanda de servicios de fitness y bienestar a medida.',
    startDate: '2021-06-01',
    impactLevel: 'medium',
    status: 'growing',
    keywords: ['fitness', 'bienestar', 'salud mental', 'yoga', 'entrenamiento personal'],
    relatedBusinessIds: ['b4'],
    industryImpact: [
      { industry: 'Fitness', impact: 'positive' },
      { industry: 'Salud', impact: 'positive' },
      { industry: 'Servicios Profesionales', impact: 'positive' },
    ],
    geographicImpact: [
      { zoneId: 'zone-la-italia', impact: 'positive' },
      { zoneId: 'zone-campestre', impact: 'positive' },
    ],
    recommendations: [
      'Ofrecer clases especializadas y programas de membresía flexibles.',
      'Colaborar con nutricionistas y terapeutas.',
    ],
  },
  {
    id: 't4',
    name: 'Educación Bilingüe',
    description: 'Demanda sostenida por programas educativos que ofrecen inmersión en un segundo idioma, principalmente inglés.',
    startDate: '2015-01-01',
    impactLevel: 'medium',
    status: 'mainstream',
    keywords: ['bilingüe', 'inglés', 'educación', 'idiomas', 'colegios'],
    relatedBusinessIds: ['b6'],
    industryImpact: [
      { industry: 'Educación', impact: 'positive' },
      { industry: 'Servicios Profesionales', impact: 'neutral' },
    ],
    geographicImpact: [
      { zoneId: 'zone-la-italia', impact: 'positive' },
      { zoneId: 'zone-campestre', impact: 'positive' },
    ],
    recommendations: [
      'Fortalecer programas de inmersión y obtener acreditaciones internacionales.',
      'Ofrecer actividades extracurriculares en inglés.',
    ],
  },
  {
    id: 't5',
    name: 'Sostenibilidad y Productos Ecológicos',
    description: 'Aumento de la conciencia ambiental y preferencia por productos y prácticas sostenibles.',
    startDate: '2023-01-01',
    impactLevel: 'low',
    status: 'emerging',
    keywords: ['sostenible', 'ecológico', 'reciclaje', 'verde', 'impacto ambiental'],
    industryImpact: [
      { industry: 'Retail', impact: 'positive' },
      { industry: 'Manufactura', impact: 'neutral' },
      { industry: 'Servicios', impact: 'positive' },
    ],
    geographicImpact: [
      { zoneId: 'zone-campestre', impact: 'positive' },
    ],
    recommendations: [
      'Incorporar prácticas sostenibles en la cadena de suministro.',
      'Comunicar el compromiso ambiental a los clientes.',
    ],
  },
];

export const mockTrendAnalyses: TrendAnalysis[] = [
  {
    id: 'ta1',
    category: 'Alimentos y Bebidas',
    growth: 0.12,
    keyDrivers: ['Mayor conciencia de salud', 'Disponibilidad de productos locales', 'Influencia de redes sociales'],
    challenges: ['Costos de producción más altos', 'Educación del consumidor', 'Competencia de productos tradicionales'],
    recommendations: ['Desarrollar alianzas con productores locales', 'Ofrecer opciones de entrega a domicilio', 'Invertir en marketing digital enfocado en beneficios para la salud'],
  },
  {
    id: 'ta2',
    category: 'Retail',
    growth: 0.08,
    keyDrivers: ['Conveniencia', 'Apoyo a la economía local', 'Mejora de la infraestructura de internet'],
    challenges: ['Necesidad de digitalización para pequeños negocios', 'Desarrollo de soluciones de logística de última milla', 'Mayor competencia online'],
    recommendations: ['Crear una tienda online optimizada', 'Ofrecer opciones de recogida en tienda', 'Participar en plataformas de e-commerce locales'],
  },
  {
    id: 'ta3',
    category: 'Servicios Profesionales',
    growth: 0.05,
    keyDrivers: ['Demanda de especialización', 'Flexibilidad laboral', 'Digitalización de servicios'],
    challenges: ['Alta competencia', 'Necesidad de actualización constante', 'Retención de talento'],
    recommendations: ['Ofrecer servicios nicho', 'Invertir en capacitación continua', 'Construir una marca personal fuerte'],
  },
  {
    id: 'ta4',
    category: 'Salud',
    growth: 0.10,
    keyDrivers: ['Envejecimiento de la población', 'Mayor conciencia de bienestar', 'Avances tecnológicos'],
    challenges: ['Regulaciones estrictas', 'Costos de equipos', 'Escasez de personal especializado'],
    recommendations: ['Invertir en tecnología médica', 'Desarrollar programas de prevención', 'Colaborar con aseguradoras'],
  },
];

export const mockMarketTrendData: MarketTrendData[] = [
  { period: '2023-Q1', newBusinesses: 100, closedBusinesses: 20, growthRate: 0.05 },
  { period: '2023-Q2', newBusinesses: 110, closedBusinesses: 18, growthRate: 0.06 },
  { period: '2023-Q3', newBusinesses: 120, closedBusinesses: 22, growthRate: 0.055 },
  { period: '2023-Q4', newBusinesses: 130, closedBusinesses: 15, growthRate: 0.07 },
  { period: '2024-Q1', newBusinesses: 140, closedBusinesses: 17, growthRate: 0.075 },
  { period: '2024-Q2', newBusinesses: 150, closedBusinesses: 19, growthRate: 0.08 },
];
