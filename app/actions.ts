'use server'

import * as XLSX from 'xlsx'

export async function processExcelFile(formData: FormData) {
  const file = formData.get('excelFile') as File | null

  if (!file) {
    return { success: false, message: 'No file uploaded.' }
  }

  if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && file.type !== 'application/vnd.ms-excel') {
    return { success: false, message: 'Invalid file type. Please upload an Excel file (.xlsx or .xls).' }
  }

  try {
    const arrayBuffer = await file.arrayBuffer()
    const data = new Uint8Array(arrayBuffer)
    const workbook = XLSX.read(data, { type: 'array' })

    // Asume que quieres leer la primera hoja del libro
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]

    // Convierte la hoja a un array de objetos JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet)

    console.log('Datos del Excel procesados:', jsonData)

    // Aquí es donde normalmente integrarías con tu base de datos
    // Por ejemplo:
    // await db.insertMany('your_table', jsonData);

    return { success: true, message: 'Excel file processed successfully!', data: jsonData }
  } catch (error) {
    console.error('Error processing Excel file:', error)
    return { success: false, message: `Failed to process Excel file: ${(error as Error).message}` }
  }
}
