
export default function validation(dataForm){
  
  const errors = {}

  if (!dataForm.typeAuto) errors.typeAuto = 'selecciona un tipo de automovil'
  if (!dataForm.selectedMarca) errors.selectedMarca = 'selecciona una marca'
  if (!dataForm.selectedModel) errors.selectedModel = 'selecciona un modelo'
  if (!dataForm.selectedYear) errors.selectedYear = 'selecciona el año de tu modelo'
  
  return errors 

}