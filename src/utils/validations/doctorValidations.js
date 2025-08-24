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

// Validaciones para teléfono
export const usePhoneValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => /^\d+$/.test(val) || 'Solo se permiten números',
    (val) => val.length <= 11 || 'Máximo 11 caracteres'
  ]
}

// Validaciones para campos de texto general (calle, sector, punto de referencia)
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

// Validaciones para número de casa
export const useHouseNumberValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => /^\d+$/.test(val) || 'Solo se permiten números',
    (val) => val.length <= 16 || 'Máximo 16 caracteres'
  ]
}

// Validaciones para campos de selección obligatorios
export const useRequiredSelectValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio'
  ]
}

// ===== VALIDACIONES ESPECÍFICAS PARA DOCTORES =====

// Validaciones para número de carnet del doctor
export const useDoctorCarnetValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => val.length >= 3 || 'Mínimo 3 caracteres',
    (val) => val.length <= 50 || 'Máximo 50 caracteres'
  ]
}

// Validaciones para ocupación del doctor
export const useDoctorOcupacionValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => val.length >= 3 || 'Mínimo 3 caracteres',
    (val) => val.length <= 200 || 'Máximo 200 caracteres',
    (val) => /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) || 'Solo se permiten caracteres'
  ]
}

// Validaciones para horario del doctor (campo de selección)
export const useDoctorHorarioValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio'
  ]
}

// Validaciones para años de experiencia del doctor
export const useDoctorAnosExperienciaValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => /^\d{1,2}$/.test(val) || 'Solo se permiten números (máximo 2 dígitos)',
    (val) => parseInt(val, 10) >= 0 || 'Los años de experiencia deben ser mayor o igual a 0',
    (val) => parseInt(val, 10) <= 50 || 'Los años de experiencia deben ser menor o igual a 50 años'
  ]
}

// Validaciones para especialidad del doctor (campo de selección)
export const useDoctorEspecialidadValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio'
  ]
}

// Validaciones para nombre de usuario
export const useDoctorNombreUsuarioValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => val.length >= 5 || 'Mínimo 5 caracteres',
    (val) => val.length <= 20 || 'Máximo 20 caracteres',
    (val) => /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(val) || 'Solo se permiten letras (sin números ni caracteres especiales)'
  ]
}

// Validaciones para contraseña (reutilizable para doctores)
export const usePasswordValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => val.length >= 8 || 'Mínimo 8 caracteres',
    (val) => val.length <= 50 || 'Máximo 50 caracteres',
    (val) => /(?=.*[a-z])/.test(val) || 'Debe contener al menos una letra minúscula',
    (val) => /(?=.*[A-Z])/.test(val) || 'Debe contener al menos una letra mayúscula',
    (val) => /(?=.*\d)/.test(val) || 'Debe contener al menos un número'
  ]
}
