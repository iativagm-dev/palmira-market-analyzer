'use client'

import { useActionState } from 'react'
import { processExcelFile } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function ExcelUploadForm() {
  const [state, formAction, isPending] = useActionState(processExcelFile, null)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Cargar Datos Excel</CardTitle>
        <CardDescription>Sube un archivo Excel para alimentar el proyecto con datos.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="excelFile">Archivo Excel</Label>
            <Input id="excelFile" name="excelFile" type="file" accept=".xlsx, .xls" required />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Procesando...' : 'Cargar y Procesar'}
          </Button>
          {state && (
            <div className={`mt-4 text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
              {state.message}
              {state.success && state.data && (
                <pre className="mt-2 p-2 bg-gray-100 rounded-md overflow-auto max-h-40">
                  {JSON.stringify(state.data, null, 2)}
                </pre>
              )}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
