import { Business } from '@/types/business';

export interface DaneCompanyData {
  id: string;
  nombre: string;
  direccion: string;
  ciiu: string;
  descripcionCiiu: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
  departamento: string;
  municipio: string;
}

export class DaneScraper {
  private readonly baseUrl = 'https://geoportal.dane.gov.co/geovisores/economia/directorio-estadistico-de-empresas/';
  
  constructor() {}

  /**
   * Obtiene datos de empresas del DANE para Palmira
   */
  async getCompaniesFromPalmira(): Promise<DaneCompanyData[]> {
    try {
      // Simular consulta al geovisor del DANE
      // En implementación real, se usarían las APIs del geoportal
      const mockData: DaneCompanyData[] = [
        {
          id: 'dane_001',
          nombre: 'Ingenio Manuelita S.A.',
          direccion: 'Km 15 Vía Palmira - Candelaria',
          ciiu: '1071',
          descripcionCiiu: 'Elaboración de azúcar',
          coordenadas: { lat: 3.5389, lng: -76.3089 },
          departamento: 'Valle del Cauca',
          municipio: 'Palmira'
        },
        {
          id: 'dane_002', 
          nombre: 'Comercializadora Internacional C.I. Expofruit S.A.',
          direccion: 'Calle 30 #29-50',
          ciiu: '4631',
          descripcionCiiu: 'Comercio al por mayor de productos alimenticios',
          coordenadas: { lat: 3.5395, lng: -76.3034 },
          departamento: 'Valle del Cauca',
          municipio: 'Palmira'
        }
      ];

      return mockData;
    } catch (error) {
      console.error('Error al obtener datos del DANE:', error);
      return [];
    }
  }

  /**
   * Convierte datos del DANE al formato Business de la aplicación
   */
  convertToBusinessFormat(daneData: DaneCompanyData[]): Business[] {
    return daneData.map((company, index) => ({
      id: `dane_${company.id}`,
      name: company.nombre,
      category: this.mapCiiuToCategory(company.ciiu),
      address: company.direccion,
      phone: '', // No disponible en DANE
      website: '',
      rating: 0,
      reviews: 0,
      description: `Empresa registrada en DANE - ${company.descripcionCiiu}`,
      tags: ['dane', 'oficial', company.descripcionCiiu.toLowerCase()],
      ownerName: '',
      foundingDate: '',
      employeeCount: 0,
      annualRevenue: 0,
      productsServices: [company.descripcionCiiu],
      socialMedia: {},
      status: 'active' as const,
      zoneId: this.getZoneIdFromAddress(company.direccion),
      latitude: company.coordenadas.lat,
      longitude: company.coordenadas.lng,
    }));
  }

  /**
   * Mapea códigos CIIU a categorías de negocio
   */
  private mapCiiuToCategory(ciiu: string): string {
    const ciiuMap: { [key: string]: string } = {
      '1071': 'Industria Alimentaria',
      '4631': 'Comercio al por Mayor',
      '5611': 'Restaurante',
      '4711': 'Comercio al por Menor',
      '6820': 'Inmobiliaria',
      '7820': 'Servicios',
    };
    
    return ciiuMap[ciiu] || 'Otros';
  }

  /**
   * Determina la zona basada en la dirección
   */
  private getZoneIdFromAddress(address: string): string {
    const addressLower = address.toLowerCase();
    
    if (addressLower.includes('centro') || addressLower.includes('calle 2')) {
      return 'zone-centro';
    } else if (addressLower.includes('italia')) {
      return 'zone-la-italia';
    } else if (addressLower.includes('norte')) {
      return 'zone-norte';
    }
    
    return 'zone-sur'; // Zona por defecto
  }

  /**
   * Actualiza los datos desde el DANE
   */
  async updateCompanyData(): Promise<Business[]> {
    console.log('Actualizando datos de empresas desde DANE...');
    const daneData = await this.getCompaniesFromPalmira();
    return this.convertToBusinessFormat(daneData);
  }
}