import { NextRequest, NextResponse } from 'next/server';
import { palmiraDataScraper } from '@/lib/scrapers';
import { getAllBusinesses } from '@/data/enhanced-business-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source');
    const incremental = searchParams.get('incremental') === 'true';

    console.log('📊 Iniciando proceso de scraping...');
    console.log(`🎯 Fuente: ${source || 'todas'}, Incremental: ${incremental}`);

    let results;

    if (incremental) {
      // Scraping incremental - solo nuevos datos
      const existingBusinesses = getAllBusinesses();
      results = await palmiraDataScraper.scrapeNewData(existingBusinesses);
    } else {
      // Scraping completo
      results = await palmiraDataScraper.scrapeAllSources();
    }

    // Filtrar por fuente específica si se solicita
    let responseData = results;
    if (source) {
      switch (source.toLowerCase()) {
        case 'dane':
          responseData = {
            ...results,
            combined: results.dane,
            stats: {
              ...results.stats,
              totalCompanies: results.dane.length
            }
          };
          break;
        case 'camara-comercio':
        case 'camara':
          responseData = {
            ...results,
            combined: results.camaraComercio,
            stats: {
              ...results.stats,
              totalCompanies: results.camaraComercio.length
            }
          };
          break;
        case 'alcaldia':
          responseData = {
            ...results,
            combined: results.alcaldia,
            stats: {
              ...results.stats,
              totalCompanies: results.alcaldia.length
            }
          };
          break;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Scraping ${incremental ? 'incremental' : 'completo'} ejecutado exitosamente`,
      data: responseData,
      metadata: {
        executionTime: new Date().toISOString(),
        source: source || 'todas',
        incremental,
        totalResults: responseData.combined.length
      }
    });

  } catch (error) {
    console.error('❌ Error en el endpoint de scraping:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error al ejecutar el scraping',
      error: error instanceof Error ? error.message : 'Error desconocido',
      data: null
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      sources = ['dane', 'camara-comercio', 'alcaldia'],
      filters = {},
      saveResults = false 
    } = body;

    console.log('📋 Configuración de scraping personalizado:', {
      sources,
      filters,
      saveResults
    });

    // Ejecutar scraping con configuración personalizada
    const results = await palmiraDataScraper.scrapeAllSources();

    // Aplicar filtros si se especifican
    let filteredResults = results.combined;
    
    if (filters.zone) {
      filteredResults = filteredResults.filter(business => 
        business.zoneId === filters.zone
      );
    }
    
    if (filters.category) {
      filteredResults = filteredResults.filter(business => 
        business.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    
    if (filters.status) {
      filteredResults = filteredResults.filter(business => 
        business.status === filters.status
      );
    }

    // Guardar resultados si se solicita
    let savedFile = null;
    if (saveResults) {
      savedFile = await palmiraDataScraper.saveResults({
        ...results,
        combined: filteredResults
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Scraping personalizado ejecutado exitosamente',
      data: {
        ...results,
        combined: filteredResults,
        stats: {
          ...results.stats,
          filtered: filteredResults.length
        }
      },
      metadata: {
        executionTime: new Date().toISOString(),
        sources,
        filters,
        savedFile,
        totalResults: filteredResults.length
      }
    });

  } catch (error) {
    console.error('❌ Error en scraping personalizado:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error al ejecutar el scraping personalizado',
      error: error instanceof Error ? error.message : 'Error desconocido',
      data: null
    }, { status: 500 });
  }
}

// Endpoint para obtener el estado del scraping
export async function HEAD() {
  try {
    return NextResponse.json({
      status: 'available',
      sources: ['dane', 'camara-comercio', 'alcaldia'],
      supportedMethods: ['GET', 'POST'],
      lastUpdate: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}