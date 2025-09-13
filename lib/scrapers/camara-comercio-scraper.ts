import { Business } from '@/types/business';

export interface CamaraComercioData {
  id: string;
  razonSocial: string;
  direccion: string;
  telefono: string;
  email?: string;
  sitioWeb?: string;
  actividadEconomica: string;
  fechaMatricula: string;
  estadoMatricula: 'ACTIVA' | 'INACTIVA' | 'CANCELADA';
}

export class CamaraComercioScraper {
  private readonly baseUrl = 'https://www.ccpalmira.org.co';
  
  constructor() {}

  /**
   * Obtiene datos de empresas de la Cámara de Comercio de Palmira
   */
  async getRegisteredCompanies(): Promise<CamaraComercioData[]> {
    try {
      // Simular scraping de la Cámara de Comercio
      // En implementación real, se haría scraping del sitio web
      const mockData: CamaraComercioData[] = [
        {
          id: 'cc_001',
          razonSocial: 'Distribuidora La Palmira S.A.S.',
          direccion: 'Carrera 29 #25-45, Centro',
          telefono: '3145678901',
          email: 'info@lapalmira.co',
          sitioWeb: 'https://www.lapalmira.co',
          actividadEconomica: 'Distribución de productos de consumo masivo',
          fechaMatricula: '2018-03-15',
          estadoMatricula: 'ACTIVA'
        },
        {
          id: 'cc_002',
          razonSocial: 'Inversiones Turísticas del Valle Ltda.',
          direccion: 'Calle 27 #30-12, La Italia',
          telefono: '3187654321',
          email: 'contacto@turisticasvalle.com',
          sitioWeb: 'https://www.turisticasvalle.com',
          actividadEconomica: 'Servicios de alojamiento turístico',
          fechaMatricula: '2020-07-22',
          estadoMatricula: 'ACTIVA'
        },
        {
          id: 'cc_003',
          razonSocial: 'Panadería y Repostería El Trigal',
          direccion: 'Calle 25 #28-07, Centro',
          telefono: '3109876543',
          actividadEconomica: 'Elaboración de productos de panadería',
          fechaMatricula: '2015-11-08',
          estadoMatricula: 'ACTIVA'
        }
      ];

      return mockData;
    } catch (error) {
      console.error('Error al obtener datos de la Cámara de Comercio:', error);
      return [];
    }
  }

  /**
   * Busca empresas por sector económico
   */
  async getCompaniesBySector(sector: string): Promise<CamaraComercioData[]> {
    const allCompanies = await this.getRegisteredCompanies();
    return allCompanies.filter(company => 
      company.actividadEconomica.toLowerCase().includes(sector.toLowerCase())
    );
  }

  /**
   * Convierte datos de la Cámara de Comercio al formato Business
   */
  convertToBusinessFormat(camaraData: CamaraComercioData[]): Business[] {
    return camaraData.map((company) => ({
      id: `cc_${company.id}`,
      name: company.razonSocial,
      category: this.mapActivityToCategory(company.actividadEconomica),
      address: company.direccion,
      phone: company.telefono,
      website: company.sitioWeb || '',
      rating: 0,
      reviews: 0,
      description: `Empresa registrada en Cámara de Comercio - ${company.actividadEconomica}`,
      tags: ['camara-comercio', 'registrada', this.extractCategoryTag(company.actividadEconomica)],
      ownerName: '',
      foundingDate: company.fechaMatricula,
      employeeCount: 0,
      annualRevenue: 0,
      productsServices: [company.actividadEconomica],
      socialMedia: {},
      status: company.estadoMatricula === 'ACTIVA' ? 'active' as const : 'closed' as const,
      zoneId: this.getZoneIdFromAddress(company.direccion),
      latitude: this.getLatitudeFromAddress(company.direccion),
      longitude: this.getLongitudeFromAddress(company.direccion),
    }));
  }

  /**
   * Mapea actividad económica a categoría
   */
  private mapActivityToCategory(activity: string): string {
    const activityLower = activity.toLowerCase();
    
    if (activityLower.includes('distribu') || activityLower.includes('comercio')) {
      return 'Comercio';
    } else if (activityLower.includes('turístic') || activityLower.includes('alojamiento')) {
      return 'Turismo';
    } else if (activityLower.includes('panader') || activityLower.includes('aliment')) {
      return 'Alimentación';
    } else if (activityLower.includes('servicio')) {
      return 'Servicios';
    }
    
    return 'Otros';
  }

  /**
   * Extrae tag de categoría de la actividad económica
   */
  private extractCategoryTag(activity: string): string {
    return activity.split(' ')[0].toLowerCase();
  }

  /**
   * Obtiene zona basada en dirección
   */
  private getZoneIdFromAddress(address: string): string {
    const addressLower = address.toLowerCase();
    
    if (addressLower.includes('centro')) {
      return 'zone-centro';
    } else if (addressLower.includes('italia')) {
      return 'zone-la-italia';
    } else if (addressLower.includes('norte')) {
      return 'zone-norte';
    }
    
    return 'zone-sur';
  }

  /**
   * Obtiene latitud estimada basada en la dirección
   */
  private getLatitudeFromAddress(address: string): number {
    // Coordenadas aproximadas para diferentes zonas de Palmira
    const addressLower = address.toLowerCase();
    
    if (addressLower.includes('centro')) {
      return 3.5395 + (Math.random() - 0.5) * 0.01;
    } else if (addressLower.includes('italia')) {
      return 3.5310 + (Math.random() - 0.5) * 0.01;
    }
    
    return 3.5350 + (Math.random() - 0.5) * 0.02;
  }

  /**
   * Obtiene longitud estimada basada en la dirección
   */
  private getLongitudeFromAddress(address: string): number {
    // Coordenadas aproximadas para diferentes zonas de Palmira
    const addressLower = address.toLowerCase();
    
    if (addressLower.includes('centro')) {
      return -76.3034 + (Math.random() - 0.5) * 0.01;
    } else if (addressLower.includes('italia')) {
      return -76.3089 + (Math.random() - 0.5) * 0.01;
    }
    
    return -76.3050 + (Math.random() - 0.5) * 0.02;
  }

  /**
   * Actualiza los datos desde la Cámara de Comercio
   */
  async updateCompanyData(): Promise<Business[]> {
    console.log('Actualizando datos de empresas desde Cámara de Comercio...');
    const camaraData = await this.getRegisteredCompanies();
    return this.convertToBusinessFormat(camaraData);
  }
}