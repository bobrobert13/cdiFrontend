// Utilidad para validar dinámicamente formularios según reglas y campos
// Uso: isFormValid(formValues, validationRules, fieldsToCheck)
// - formValues: { campo: valor }
// - validationRules: { campo: [reglas...] }
// - fieldsToCheck: ['campo1', 'campo2'] (opcional)

export function isFormValid(formValues, validationRules, fieldsToCheck) {
  console.log('validando: ', validationRules);
  
  // Si no se especifican campos, valida todos los definidos en validationRules
  const fields = fieldsToCheck || Object.keys(validationRules)

  for (const field of fields) {
    const value = formValues[field]
    const rules = validationRules[field] || []
    for (const rule of rules) {
      const result = rule(value)
      // Si la regla devuelve un string (mensaje de error) o false, no es válido
      if (result !== true) {
        return false
      }
    }
  }
  return true
}

// Ejemplo de uso:
// import { isFormValid } from '@/utils/formUtils'
// const canSubmit = isFormValid(formValues, {
//   nombre: useFullNameValidation(),
//   email: useEmailValidation(),
//   ...
// })
//
// Si quieres validar solo algunos campos:
// const canSubmit = isFormValid(formValues, reglas, ['nombre', 'email'])
