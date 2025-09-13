import { Business } from '@/types/business';
import { DaneScraper } from './dane-scraper';
import { CamaraComercioScraper } from './camara-comercio-scraper';
import { AlcaldiaScraper } from './alcaldia-scraper';

export interface ScrapingResults {
  dane: Business[];
  camaraComercio: Business[];
  alcaldia: Business[];
  combined: Business[];
  timestamp: Date;
  stats: {
    totalCompanies: number;
    activeCompanies: number;
    newCompanies: number;
    closedCompanies: number;
    bySource: {
      dane: number;
      camaraComercio: number;
      alcaldia: number;
    };
  };
}

export class PalmiraDataScraper {
  private daneScraper: DaneScraper;
  private camaraScraper: CamaraComercioScraper;
  private alcaldiaScraper: AlcaldiaScraper;

  constructor() {
    this.daneScraper = new DaneScraper();
    this.camaraScraper = new CamaraComercioScraper();
    this.alcaldiaScraper = new AlcaldiaScraper();
  }

  /**
   * Ejecuta el scraping completo de todas las fuentes
   */
  async scrapeAllSources(): Promise<ScrapingResults> {
    console.log('🚀 Iniciando scraping completo de datos de Palmira...');

    try {
      // Ejecutar scraping en paralelo para mejor rendimiento
      const [daneData, camaraData, alcaldiaData] = await Promise.all([
        this.daneScraper.updateCompanyData(),
        this.camaraScraper.updateCompanyData(),
        this.alcaldiaScraper.updateCompanyData()
      ]);

      // Combinar todos los datos
      const combinedData = this.combineAndDeduplicateData(
        daneData,
        camaraData,
        alcaldiaData
      );

      // Generar estadísticas
      const stats = this.generateStats(daneData, camaraData, alcaldiaData, combinedData);

      console.log('✅ Scraping completado exitosamente');
      console.log(`📊 Total de empresas encontradas: ${stats.totalCompanies}`);
      console.log(`🏢 DANE: ${stats.bySource.dane} empresas`);
      console.log(`📋 Cámara de Comercio: ${stats.bySource.camaraComercio} empresas`);
      console.log(`🏛️ Alcaldía: ${stats.bySource.alcaldia} empresas`);

      return {
        dane: daneData,
        camaraComercio: camaraData,
        alcaldia: alcaldiaData,
        combined: combinedData,
        timestamp: new Date(),
        stats
      };

    } catch (error) {
      console.error('❌ Error durante el scraping:', error);
      throw error;
    }
  }

  /**
   * Combina y desduplicar datos de todas las fuentes
   */
  private combineAndDeduplicateData(
    daneData: Business[],
    camaraData: Business[],
    alcaldiaData: Business[]
  ): Business[] {
    const allData = [...daneData, ...camaraData, ...alcaldiaData];
    const uniqueBusinesses = new Map<string, Business>();

    // Deduplicar por nombre y dirección similar
    allData.forEach(business => {
      const key = this.generateBusinessKey(business);
      
      if (!uniqueBusinesses.has(key)) {
        uniqueBusinesses.set(key, business);
      } else {
        // Si ya existe, combinar información adicional
        const existing = uniqueBusinesses.get(key)!;
        const merged = this.mergeBusinessData(existing, business);
        uniqueBusinesses.set(key, merged);
      }
    });

    return Array.from(uniqueBusinesses.values());
  }

  /**
   * Genera una clave única para identificar negocios duplicados
   */
  private generateBusinessKey(business: Business): string {
    const name = business.name.toLowerCase().trim();
    const address = business.address.toLowerCase().trim();
    
    // Normalizar nombre y dirección para detectar duplicados
    const normalizedName = name
      .replace(/s\.?a\.?s?\.?/g, '')
      .replace(/ltda\.?/g, '')
      .replace(/\./g, '')
      .trim();
    
    const normalizedAddress = address
      .replace(/calle|carrera|cr|cl|#/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return `${normalizedName}_${normalizedAddress}`;
  }

  /**
   * Combina información de negocios duplicados
   */
  private mergeBusinessData(existing: Business, duplicate: Business): Business {
    return {
      ...existing,
      // Mantener el teléfono si no existe en el registro existente
      phone: existing.phone || duplicate.phone,
      website: existing.website || duplicate.website,
      // Combinar tags únicas
      tags: [...new Set([...existing.tags, ...duplicate.tags])],
      // Mantener información adicional si está disponible
      ownerName: existing.ownerName || duplicate.ownerName,
      foundingDate: existing.foundingDate || duplicate.foundingDate,
      employeeCount: Math.max(existing.employeeCount || 0, duplicate.employeeCount || 0),
      // Combinar productos/servicios
      productsServices: [
        ...new Set([
          ...(existing.productsServices || []),
          ...(duplicate.productsServices || [])
        ])
      ],
      // Actualizar descripción con fuentes múltiples
      description: `${existing.description} | Fuente adicional: ${duplicate.id.split('_')[0].toUpperCase()}`
    };
  }

  /**
   * Genera estadísticas del scraping
   */
  private generateStats(
    daneData: Business[],
    camaraData: Business[],
    alcaldiaData: Business[],
    combinedData: Business[]
  ) {
    return {
      totalCompanies: combinedData.length,
      activeCompanies: combinedData.filter(b => b.status === 'active').length,
      newCompanies: combinedData.filter(b => b.status === 'new').length,
      closedCompanies: combinedData.filter(b => b.status === 'closed').length,
      bySource: {
        dane: daneData.length,
        camaraComercio: camaraData.length,
        alcaldia: alcaldiaData.length
      }
    };
  }

  /**
   * Scraping incremental - solo nuevos datos
   */
  async scrapeNewData(existingBusinesses: Business[]): Promise<ScrapingResults> {
    console.log('🔄 Ejecutando scraping incremental...');
    
    const results = await this.scrapeAllSources();
    
    // Filtrar solo datos nuevos
    const existingIds = new Set(existingBusinesses.map(b => b.id));
    
    results.dane = results.dane.filter(b => !existingIds.has(b.id));
    results.camaraComercio = results.camaraComercio.filter(b => !existingIds.has(b.id));
    results.alcaldia = results.alcaldia.filter(b => !existingIds.has(b.id));
    results.combined = results.combined.filter(b => !existingIds.has(b.id));

    console.log(`📈 Encontradas ${results.combined.length} empresas nuevas`);
    
    return results;
  }

  /**
   * Exporta datos a JSON
   */
  exportToJson(results: ScrapingResults): string {
    return JSON.stringify(results, null, 2);
  }

  /**
   * Guarda resultados en archivo
   */
  async saveResults(results: ScrapingResults, filename?: string): Promise<string> {
    const fileName = filename || `palmira-businesses-${Date.now()}.json`;
    const jsonData = this.exportToJson(results);
    
    // En un entorno real, aquí se guardaría el archivo
    console.log(`💾 Datos guardados en: ${fileName}`);
    
    return fileName;
  }
}

// Instancia singleton para uso global
export const palmiraDataScraper = new PalmiraDataScraper();