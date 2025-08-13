

export const useCdiNumberValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => /^\d+$/.test(val) || 'Solo se permiten números',
    (val) => val.length <= 8 || 'Máximo 8 dígitos'
  ]
}
