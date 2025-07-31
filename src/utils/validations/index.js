/**
 * Índice de validaciones
 * Exporta todas las validaciones disponibles para fácil importación
 */

export {
  useFullNameValidation,
  useEmailValidation,
  useDniValidation,
  useTextFieldValidation,
  useTextWithSpecialCharsValidation,
  useHouseNumberValidation,
  usePostalCodeValidation,
  useAgeValidation,
  usePhoneValidation,
  useWeightValidation,
  useRequiredSelectValidation,
  useChronicDiseasesValidation,
  useDisabilityValidation,
  useFamilyHistoryValidation,
  useAllergiesValidation,
  useOccupationValidation
} from './patientValidations.js'

export {
  useDoctorAnosExperienciaValidation,
  useDoctorEspecialidadValidation,
  useDoctorCarnetValidation,
  useDoctorHorarioValidation,
  useDoctorNombreUsuarioValidation,
  useDoctorOcupacionValidation,
  usePasswordValidation,
} from './doctorValidations.js'
