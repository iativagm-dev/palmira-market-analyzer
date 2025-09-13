import { Business } from '@/types/business';

export interface AlcaldiaLicenseData {
  id: string;
  nombreEstablecimiento: string;
  propietario: string;
  direccion: string;
  telefono?: string;
  actividadComercial: string;
  numeroLicencia: string;
  fechaExpedicion: string;
  fechaVencimiento: string;
  estado: 'VIGENTE' | 'VENCIDA' | 'SUSPENDIDA';
  zona: string;
}

export class AlcaldiaScraper {
  private readonly baseUrl = 'https://palmira.gov.co';
  
  constructor() {}

  /**
   * Obtiene datos de licencias de funcionamiento de la Alcaldía
   */
  async getLicensedBusinesses(): Promise<AlcaldiaLicenseData[]> {
    try {
      // Simular scraping de licencias de funcionamiento
      // En implementación real, se accedería a la base de datos pública de licencias
      const mockData: AlcaldiaLicenseData[] = [
        {
          id: 'alc_001',
          nombreEstablecimiento: 'Supermercado San Andrés',
          propietario: 'Carlos Mendoza',
          direccion: 'Carrera 31 #15-23, Centro',
          telefono: '3201234567',
          actividadComercial: 'Venta al por menor de productos alimenticios',
          numeroLicencia: 'LIC-2024-001',
          fechaExpedicion: '2024-01-15',
          fechaVencimiento: '2025-01-15',
          estado: 'VIGENTE',
          zona: 'Centro'
        },
        {
          id: 'alc_002',
          nombreEstablecimiento: 'Restaurante La Hacienda',
          propietario: 'Ana Patricia Gómez',
          direccion: 'Calle 26 #32-15, La Italia',
          telefono: '3156789012',
          actividadComercial: 'Servicios de restaurante y bar',
          numeroLicencia: 'LIC-2024-002',
          fechaExpedicion: '2024-02-10',
          fechaVencimiento: '2025-02-10',
          estado: 'VIGENTE',
          zona: 'La Italia'
        },
        {
          id: 'alc_003',
          nombreEstablecimiento: 'Ferretería El Martillo',
          propietario: 'José Luis Ramírez',
          direccion: 'Carrera 28 #20-08, Norte',
          telefono: '3112345678',
          actividadComercial: 'Venta de herramientas y materiales de construcción',
          numeroLicencia: 'LIC-2023-087',
          fechaExpedicion: '2023-11-20',
          fechaVencimiento: '2024-11-20',
          estado: 'VENCIDA',
          zona: 'Norte'
        },
        {
          id: 'alc_004',
          nombreEstablecimiento: 'Peluquería Estilo y Belleza',
          propietario: 'María Elena Vargas',
          direccion: 'Calle 24 #29-12, Centro',
          telefono: '3189876543',
          actividadComercial: 'Servicios de peluquería y estética',
          numeroLicencia: 'LIC-2024-003',
          fechaExpedicion: '2024-03-05',
          fechaVencimiento: '2025-03-05',
          estado: 'VIGENTE',
          zona: 'Centro'
        }
      ];

      return mockData;
    } catch (error) {
      console.error('Error al obtener datos de la Alcaldía:', error);
      return [];
    }
  }

  /**
   * Busca licencias por zona
   */
  async getLicensesByZone(zone: string): Promise<AlcaldiaLicenseData[]> {
    const allLicenses = await this.getLicensedBusinesses();
    return allLicenses.filter(license => 
      license.zona.toLowerCase().includes(zone.toLowerCase())
    );
  }

  /**
   * Busca licencias por estado
   */
  async getLicensesByStatus(status: 'VIGENTE' | 'VENCIDA' | 'SUSPENDIDA'): Promise<AlcaldiaLicenseData[]> {
    const allLicenses = await this.getLicensedBusinesses();
    return allLicenses.filter(license => license.estado === status);
  }

  /**
   * Convierte datos de la Alcaldía al formato Business
   */
  convertToBusinessFormat(alcaldiaData: AlcaldiaLicenseData[]): Business[] {
    return alcaldiaData.map((license) => ({
      id: `alc_${license.id}`,
      name: license.nombreEstablecimiento,
      category: this.mapActivityToCategory(license.actividadComercial),
      address: license.direccion,
      phone: license.telefono || '',
      website: '',
      rating: 0,
      reviews: 0,
      description: `Establecimiento con licencia municipal - ${license.actividadComercial}`,
      tags: ['alcaldia', 'licenciado', this.extractCategoryTag(license.actividadComercial), license.estado.toLowerCase()],
      ownerName: license.propietario,
      foundingDate: license.fechaExpedicion,
      employeeCount: 0,
      annualRevenue: 0,
      productsServices: [license.actividadComercial],
      socialMedia: {},
      status: this.mapLicenseStatus(license.estado),
      zoneId: this.mapZoneToZoneId(license.zona),
      latitude: this.getLatitudeFromZone(license.zona),
      longitude: this.getLongitudeFromZone(license.zona),
    }));
  }

  /**
   * Mapea actividad comercial a categoría
   */
  private mapActivityToCategory(activity: string): string {
    const activityLower = activity.toLowerCase();
    
    if (activityLower.includes('alimenticio') || activityLower.includes('supermercado')) {
      return 'Supermercado';
    } else if (activityLower.includes('restaurante') || activityLower.includes('bar')) {
      return 'Restaurante';
    } else if (activityLower.includes('ferretería') || activityLower.includes('construcción')) {
      return 'Ferretería';
    } else if (activityLower.includes('peluquería') || activityLower.includes('estética')) {
      return 'Servicios de Belleza';
    } else if (activityLower.includes('servicio')) {
      return 'Servicios';
    }
    
    return 'Comercio';
  }

  /**
   * Extrae tag de categoría
   */
  private extractCategoryTag(activity: string): string {
    const activityLower = activity.toLowerCase();
    
    if (activityLower.includes('alimenticio')) return 'alimenticio';
    if (activityLower.includes('restaurante')) return 'restaurante';
    if (activityLower.includes('ferretería')) return 'ferreteria';
    if (activityLower.includes('belleza')) return 'belleza';
    
    return 'comercio';
  }

  /**
   * Mapea estado de licencia a estado de negocio
   */
  private mapLicenseStatus(licenseStatus: string): 'active' | 'closed' | 'new' {
    switch (licenseStatus) {
      case 'VIGENTE':
        return 'active';
      case 'VENCIDA':
      case 'SUSPENDIDA':
        return 'closed';
      default:
        return 'active';
    }
  }

  /**
   * Mapea zona a zoneId
   */
  private mapZoneToZoneId(zone: string): string {
    const zoneMap: { [key: string]: string } = {
      'Centro': 'zone-centro',
      'La Italia': 'zone-la-italia',
      'Norte': 'zone-norte',
      'Sur': 'zone-sur'
    };
    
    return zoneMap[zone] || 'zone-centro';
  }

  /**
   * Obtiene latitud por zona
   */
  private getLatitudeFromZone(zone: string): number {
    const zoneCoords: { [key: string]: number } = {
      'Centro': 3.5395,
      'La Italia': 3.5310,
      'Norte': 3.5450,
      'Sur': 3.5280
    };
    
    const baseLat = zoneCoords[zone] || 3.5350;
    return baseLat + (Math.random() - 0.5) * 0.01;
  }

  /**
   * Obtiene longitud por zona
   */
  private getLongitudeFromZone(zone: string): number {
    const zoneCoords: { [key: string]: number } = {
      'Centro': -76.3034,
      'La Italia': -76.3089,
      'Norte': -76.3020,
      'Sur': -76.3100
    };
    
    const baseLng = zoneCoords[zone] || -76.3050;
    return baseLng + (Math.random() - 0.5) * 0.01;
  }

  /**
   * Actualiza los datos desde la Alcaldía
   */
  async updateCompanyData(): Promise<Business[]> {
    console.log('Actualizando datos de empresas desde Alcaldía...');
    const alcaldiaData = await this.getLicensedBusinesses();
    return this.convertToBusinessFormat(alcaldiaData);
  }
}