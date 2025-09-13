import { NextResponse } from 'next/server';
import { getAllBusinesses, getBusinessesBySource, getDataStatistics } from '@/data/enhanced-business-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source');
    const stats = searchParams.get('stats') === 'true';

    // Si solo se solicitan estadísticas
    if (stats) {
      const statistics = getDataStatistics();
      return NextResponse.json({
        success: true,
        message: 'Estadísticas obtenidas exitosamente',
        data: statistics
      });
    }

    // Obtener negocios por fuente específica
    if (source) {
      const validSources = ['mock', 'dane', 'camara-comercio', 'alcaldia'];
      if (!validSources.includes(source)) {
        return NextResponse.json({
          success: false,
          message: `Fuente inválida. Fuentes válidas: ${validSources.join(', ')}`,
          data: null
        }, { status: 400 });
      }

      const businesses = getBusinessesBySource(source as any);
      return NextResponse.json({
        success: true,
        message: `Negocios de ${source} obtenidos exitosamente`,
        data: {
          source,
          count: businesses.length,
          businesses
        }
      });
    }

    // Obtener todos los negocios
    const allBusinesses = getAllBusinesses();
    const statistics = getDataStatistics();

    return NextResponse.json({
      success: true,
      message: 'Todos los negocios obtenidos exitosamente',
      data: {
        count: allBusinesses.length,
        statistics,
        businesses: allBusinesses
      }
    });

  } catch (error) {
    console.error('❌ Error en el endpoint de negocios:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error al obtener los datos de negocios',
      error: error instanceof Error ? error.message : 'Error desconocido',
      data: null
    }, { status: 500 });
  }
}