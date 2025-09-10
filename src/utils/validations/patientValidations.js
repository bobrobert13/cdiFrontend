// Validaciones para nombre completo
export const useFullNameValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => val.length >= 3 || 'Mínimo 3 caracteres',
    (val) => val.length <= 200 || 'Máximo 200 caracteres',
    (val) => /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) || 'Solo se permiten caracteres'
  ]
}

// Validaciones para correo electrónico
export const useEmailValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => val.length >= 3 || 'Mínimo 3 caracteres',
    (val) => val.length <= 200 || 'Máximo 200 caracteres',
    (val) => /.+@.+\..+/.test(val) || 'Formato de correo electrónico inválido'
  ]
}

// Validaciones para DNI/Cédula
export const useDniValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => /^\d+$/.test(val) || 'Solo se permiten números',
    (val) => /^\d{1,8}$/.test(val) || 'Solo se permiten números (máximo 8 dígitos)',
  ]
}

// Validaciones para campos de texto general (calle, sector, etc.)
export const useTextFieldValidation = (required = false, minLength = 3, maxLength = 200) => {
  const rules = []

  if (required) {
    rules.push((val) => !!val || 'Este campo es obligatorio')
  }

  rules.push(
    (val) => !val || val.length >= minLength || `Mínimo ${minLength} caracteres`,
    (val) => !val || val.length <= maxLength || `Máximo ${maxLength} caracteres`
  )

  return rules
}

// Validaciones para campos de texto con caracteres especiales (nombres, direcciones)
export const useTextWithSpecialCharsValidation = (required = false, minLength = 3, maxLength = 200) => {
  const rules = []

  if (required) {
    rules.push((val) => !!val || 'Este campo es obligatorio')
  }

  rules.push(
    (val) => !val || val.length >= minLength || `Mínimo ${minLength} caracteres`,
    (val) => !val || val.length <= maxLength || `Máximo ${maxLength} caracteres`,
    (val) => !val || /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) || 'Solo se permiten caracteres'
  )

  return rules
}

// Validaciones para número de casa
export const useHouseNumberValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => /^\d+$/.test(val) || 'Solo se permiten números',
    (val) => val.length <= 16 || 'Máximo 16 caracteres'
  ]
}

// validaciones para el numero de orden de representante min 2 max 8
export const useOrderNumberValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => /^\d+$/.test(val) || 'Solo se permiten números',
    (val) => val.length >= 2 || 'Mínimo 2 caracteres',
    (val) => val.length <= 8 || 'Máximo 8 caracteres'
  ]
}

// Validaciones para código postal
export const usePostalCodeValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => /^\d+$/.test(val) || 'Solo se permiten números',
    (val) => val.length <= 8 || 'Máximo 8 caracteres'
  ]
}

// Validaciones para edad
export const useAgeValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => /^\d+$/.test(val) || 'Solo se permiten números',
    (val) => val.length <= 3 || 'Máximo 3 caracteres',
    (val) => parseInt(val) >= 1 || 'La edad debe ser mayor a 0',
    (val) => parseInt(val) <= 120 || 'La edad debe ser menor a 120 años'
  ]
}

// Validaciones para teléfono
export const usePhoneValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => /^\d+$/.test(val) || 'Solo se permiten números',
    (val) => val.length <= 11 || 'Máximo 11 caracteres'
  ]
}

// Validaciones para peso
export const useWeightValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => /^\d+$/.test(val) || 'Solo se permiten números',
    (val) => val.length <= 3 || 'Máximo 3 caracteres',
    (val) => parseInt(val) >= 1 || 'El peso debe ser mayor a 0',
    (val) => parseInt(val) <= 500 || 'El peso debe ser menor a 500 kg'
  ]
}

// Validaciones para campos de selección obligatorios
export const useRequiredSelectValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio'
  ]
}

// Validaciones para enfermedades crónicas
export const useChronicDiseasesValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => val.length >= 3 || 'Mínimo 3 caracteres',
    (val) => val.length <= 200 || 'Máximo 200 caracteres',
    (val) => /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) || 'Solo se permiten caracteres'
  ]
}

// Validaciones para discapacidad
export const useDisabilityValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => val.length >= 3 || 'Mínimo 3 caracteres',
    (val) => val.length <= 200 || 'Máximo 200 caracteres',
    (val) => /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) || 'Solo se permiten caracteres'
  ]
}

// Validaciones para antecedentes familiares
export const useFamilyHistoryValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => val.length >= 3 || 'Mínimo 3 caracteres',
    (val) => val.length <= 200 || 'Máximo 200 caracteres',
    (val) => /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) || 'Solo se permiten caracteres'
  ]
}

// Validaciones para alergias
export const useAllergiesValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => val.length >= 3 || 'Mínimo 3 caracteres',
    (val) => val.length <= 200 || 'Máximo 200 caracteres',
    (val) => /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) || 'Solo se permiten caracteres'
  ]
}

// Validaciones para ocupación
export const useOccupationValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => val.length >= 3 || 'Mínimo 3 caracteres',
    (val) => val.length <= 200 || 'Máximo 200 caracteres',
    (val) => /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) || 'Solo se permiten caracteres'
  ]
}
