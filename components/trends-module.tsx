export const TrendsModule = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Análisis de Tendencias</h1>
          <p className="text-gray-600">Tendencias del mercado y patrones de consumo en Palmira</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Tendencias de Crecimiento</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Sector Alimentario</span>
                <span className="text-green-600 font-semibold">+15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Servicios Digitales</span>
                <span className="text-green-600 font-semibold">+28%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Comercio Minorista</span>
                <span className="text-blue-600 font-semibold">+8%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Patrones de Consumo</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Compras Online</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Compras Presenciales</span>
                  <span>35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '35%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}