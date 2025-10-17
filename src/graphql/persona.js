import gql from "graphql-tag";

export const PERSONA_POR_CEDULA_QUERY = gql`
  fragment TelefonoFrag on Telefono {
    id_telefono
    codigo
    numero
  }

  fragment CorreoFrag on Correo {
    id_correo
    correo
  }

  fragment DireccionFrag on Direccion {
    id_direccion
    parroquia
    codigo_postal
    numero_casa
    calle
    punto_referencia
    sector
  }

  fragment ConsultaFrag on Consulta {
    id_consulta
    fecha_consulta
    estado_consulta
    tipo_consulta
    motivo_consulta
    sintomas
    notas_medicas
    createdAt
  }

  fragment DiagnosticoFrag on Diagnostico {
    id_diagnostico
    fecha_diagnostico
    condicion
    descripcion
    gravedad
    createdAt
    updatedAt
  }

  fragment ExamenFrag on ExamenesResultados {
    id_examenes
    tipo_de_examen
    descripcion
    resultados
    estado_examen
    medico_solicitante
    laboratorio_centro
    valores_referencia
    observaciones
    createdAt
  }

  fragment MedicamentoFrag on Medicamento {
    id_medicamento
    nombre
    dosis
    via_administracion
    frecuencia
    duracion
    observaciones
    principio_activo
    laboratorio
    fecha_inicio
    fecha_fin
    estado_tratamiento
    tipo_medicamento
    contraindicaciones
    efectos_secundarios
    createdAt
  }

  fragment TratamientoFrag on Tratamiento {
    id_tratamiento
    tipo_de_tratamiento
    fecha_inicio
    fecha_culminacion
    estado
    detalles
    createdAt
  }

  fragment EmergenciaFrag on Emergencia {
    id_emergencia
    motivo_emergencia
    fecha_ingreso
    fecha_egreso
    diagnostico_provisional
    estado_paciente
    estado_emergencia
    procesamiento_realizado
    tiempo_atencion
    notas_de_atencion
    destino
    createdAt
    updatedAt
  }

  fragment HospitalizacionFrag on Hospitalizacion {
    id_hospitalizacion
    fecha_ingreso
    fecha_egreso
    motivo_de_hospitalizacion
    unidad_hospitalaria
    estado
    notas_medicas
    createdAt
    updatedAt
  }

  fragment DoctorFrag on Doctor {
    id_doctor
    anos_experiencia
    numero_carnet
    area_de_trabajo
    horario
    pacientes {
      id_paciente
      vacunas
      antecedentes_familiares
      tipo_de_sangre
      alergias
      discapacidad
      createdAt
      consultas { ...ConsultaFrag }
      diagnosticos { ...DiagnosticoFrag }
      examenes { ...ExamenFrag }
      medicamentos { ...MedicamentoFrag }
      tratamientos { ...TratamientoFrag }
      emergencias { ...EmergenciaFrag }
      hospitalizaciones { ...HospitalizacionFrag }
    }
  }

  fragment PacienteFrag on Paciente {
    id_paciente
    vacunas
    antecedentes_familiares
    tipo_de_sangre
    alergias
    enfermedades_cronicas
    peso
    discapacidad
    createdAt
    cdi { id_cdi numero_cdi nombre }
    doctor { ...DoctorFrag }
    consultas { ...ConsultaFrag }
    diagnosticos { ...DiagnosticoFrag }
    examenes { ...ExamenFrag }
    medicamentos { ...MedicamentoFrag }
    tratamientos { ...TratamientoFrag }
    emergencias { ...EmergenciaFrag }
    hospitalizaciones { ...HospitalizacionFrag }
  }

  fragment PersonaFrag on Persona {
    id_persona
    nombre1
    nombre2
    apellido1
    apellido2
    nacionalidad
    sexo
    edad
    estado_civil
    ocupacion
    cedula_identidad
    paciente { ...PacienteFrag }
    doctor { ...DoctorFrag }
    telefono { ...TelefonoFrag }
    correo { ...CorreoFrag }
    direccion { ...DireccionFrag }
    fk_cdi_id
    fk_direccion_id
    fk_telefono_id
    fk_correo_id
  }

  query PersonaPorCedula($cedula_identidad: Float!) {
    personaPorCedula(cedula_identidad: $cedula_identidad) {
      ...PersonaFrag
    }
  }
`;
