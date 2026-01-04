export const useCdiNumberValidation = () => {
  return [
    (val) => !!val || 'Este campo es obligatorio',
    (val) => /^\d+$/.test(val) || 'Solo se permiten números',
    (val) => val.length <= 8 || 'Máximo 8 dígitos',
    (val) => Number(val) > 0 || 'Debe ser mayor a cero'
  ]
}
