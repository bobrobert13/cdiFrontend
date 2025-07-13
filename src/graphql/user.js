import gql from "graphql-tag";

const UserSchema = `
  oneUser {
    id
    profileImage
    name
    email
    role
    roleEspecialidad
    dni
    telefono
    direccion {
      numero
      sector
      calle
    }
    createdAt
  }
`;

export const DATOS_PERSONALES_QUERY = gql`
  query oneUser {
    ${UserSchema}
  }
`;

export const MY_WORKERS_QUERY = gql`
  query MyWorkers {
    MyWorkers {
    id
    profileImage
    name
    email
    role
    createdAt
    }
  }
`;

export const PACIENTES_QUERY = gql`
  query allPacientes {
    allPacientes {
    id
    name
    role
    nacionalidad
    dni
    telefono
    direccion {
      numero
      sector
      calle
    }
    sexo
    edad
    diagnostico
    createdAt
    fatherID
    }
  }
`;



export const PERSONA_DETALLES = gql`
  fragment personaDetalles on Persona {
    nombre1
    edad
    estado_civil
    id_persona
    sexo
    nacionalidad
    cedula_identidad
    ocupacion
    telefono {
      codigo
      numero
      id_telefono
    }
    correo {
      id_correo
      correo
    }
    direccion {
      codigo_postal
      id_direccion
      parroquia
      numero_casa
      calle
      punto_referencia
      sector
    }
  }
`;

export const CONSULTAS_DETALLES = gql`
fragment consultasDetalles on Consulta {
  id_consulta, fecha_consulta, estado_consulta, tipo_consulta, motivo_consulta, sintomas, notas_medicas, createdAt 
}
`;

export const DIAGNOSTICO_DETALLES = gql`
fragment diagnosticoDetalles on Diagnostico {
    id_diagnostico
    fecha_diagnostico
    condicion
    descripcion
    gravedad
    createdAt
    updatedAt
}
`;

export const EXAMENES_DETALLES = gql`
fragment examenes on ExamenesResultados {
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
`;

export const TRATAMIENTOS_DETALLES = gql`
fragment tratamientos on Tratamiento {
  id_tratamiento
  tipo_de_tratamiento
  fecha_inicio
  fecha_culminacion
  estado
  detalles
  createdAt
}
`;

export const MEDICAMENTOS_DETALLES = gql`
fragment medicamento on Medicamento {
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
`;

export const EMERGENCIA_DETALLES = gql`
fragment emergenciaDetalles on Emergencia {
    id_emergencia
    motivo_emergencia
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
`;

export const HOSPITALIZACION_DETALLES = gql`
fragment hospitalizacionDetalles on Hospitalizacion {
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
`;

export const DOCTOR_DETALLES = gql`
  fragment doctorDetalles on Doctor {
    id_doctor
    anos_experiencia
    numero_carnet
    area_de_trabajo
    horario
          usuarios {
        id_usuario
        nombre_usuario
        rol
        estado
      }
    persona {
      ...personaDetalles
    }
    pacientes {
      id_paciente
      vacunas
      antecedentes_familiares
      tipo_de_sangre
      alergias
      discapacidad
      createdAt
      persona {
        ...personaDetalles
      }
       consultas {
      ...consultasDetalles
    }
          diagnosticos {
      ...diagnosticoDetalles
    }
          examenes {
      ...examenes
    }
    medicamentos {
      ...medicamento
    }
    tratamientos {
      ...tratamientos
    }
    emergencias {
      ...emergenciaDetalles
    }
    hospitalizaciones {
      ...hospitalizacionDetalles
    }

    }

  }
  ${PERSONA_DETALLES}
  ${CONSULTAS_DETALLES}
  ${DIAGNOSTICO_DETALLES}
  ${EXAMENES_DETALLES}
  ${MEDICAMENTOS_DETALLES}
  ${TRATAMIENTOS_DETALLES}
  ${EMERGENCIA_DETALLES}
  ${HOSPITALIZACION_DETALLES}
`;


export const CDI_DOCTORES_QUERY = gql`
  query doCdiDoctores($id_cdi: ID!) {
    doctoresCDI(id_cdi: $id_cdi) {
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
      persona {
        ...personaDetalles
      }
}
        persona {
      ...personaDetalles
    }
      usuarios {
        id_usuario
        nombre_usuario
        rol
        estado
      }
    }
  }
  ${PERSONA_DETALLES}
`;

export const ADMIN_DOCTORES_QUERY = gql`
  query doGetDoctores{
    doctores {
  	id_doctor
    anos_experiencia
    numero_carnet
    area_de_trabajo
    horario
        persona {
      ...personaDetalles
    }
      usuarios {
        id_usuario
        nombre_usuario
        rol
        estado
        cdi {
          id_cdi
          numero_cdi
          nombre
          encargado
          cuadrante
          estado}
      }
    }
  }
  ${PERSONA_DETALLES}
`;

export const ADMIN_CDIS_QUERY = gql`
  query doGetCDIs{
    cdis {
    id_cdi
    numero_cdi
    nombre
    encargado
    cuadrante
    estado
    usuarios {
      id_usuario
      nombre_usuario
      rol
      estado
    }
    }
  }
`;

export const ADMIN_ALL_CDIS_QUERY = gql`
  query doGetALLCDIs{
    todosCdis {
    id_cdi
    numero_cdi
    nombre
    encargado
    cuadrante
    }
  }
`;

export const ADMIN_PROFILE_QUERY = gql`
  query doGetAdminProfile($id_usuario: ID!) {
    usuario(id_usuario: $id_usuario) {
      id_usuario
      nombre_usuario
      rol
      estado
    }
  }
`;


export const CDI_PACIENTES_QUERY = gql`
  query doCdiPacientes($id_cdi: ID!) {
    pacientesCDI(id_cdi: $id_cdi) {
  	id_paciente
    vacunas
    antecedentes_familiares
    tipo_de_sangre
    alergias
    discapacidad
    persona {
      ...personaDetalles
    }
    consultas {
      ...consultasDetalles
    }
    diagnosticos {
      ...diagnosticoDetalles
    }
    examenes {
      ...examenes
    }
    medicamentos {
      ...medicamento
    }
    tratamientos {
      ...tratamientos
    }
    emergencias {
      ...emergenciaDetalles
    }
    hospitalizaciones {
      ...hospitalizacionDetalles
    }
    doctor {
      ...doctorDetalles
    }
    }
  }
  ${PERSONA_DETALLES}
  ${CONSULTAS_DETALLES}
  ${DIAGNOSTICO_DETALLES}
  ${EXAMENES_DETALLES}
  ${MEDICAMENTOS_DETALLES}
  ${TRATAMIENTOS_DETALLES}
  ${EMERGENCIA_DETALLES}
  ${HOSPITALIZACION_DETALLES}
  ${DOCTOR_DETALLES}
`;




export const MIS_PACIENTES_QUERY = gql`
  query getDoctorPacientes($id_doctor: ID!) {
    doctorPacientes(id_doctor: $id_doctor) {
      ...doctorDetalles
    }
  }
  ${DOCTOR_DETALLES}
`;


// export const MIS_CONSULTAS_QUERY = gql`
//   query MisConsultas {
//     MisConsultas {
//     diagnostico
//     salida
//     ingreso
//     }
//   }
// `;

export const MY_CORREOS_QUERY = gql`
  query MyCorreos {
    MyCorreos {
      _id
      name
      email
      userId
    }
  }
`;

export const CREATECORREO_MUTATION = gql`
  mutation createCorreo($data: CorreosInput) {
    createCorreo(data: $data) {
      name
      email
      userId
    }
  }
`;

export const DELETE_CORREO_MUTATION = gql`
  mutation DelCorreo($correoID: ID!) {
    DelCorreo(correoID: $correoID) {
      status
    }
  }
`;

export const ADDUSER_MUTATION = gql`
  mutation AddUser($data: UserInput) {
    AddUser(data: $data) {
      id
      profileImage
      name
      email
      role
      roleEspecialidad
      nacionalidad
      dni
      telefono
      direccion {
      numero
      sector
      calle
    }
      createdAt
    }
  }
`;


export const ADD_DOCTOR_USER_MUTATION = gql`
mutation doCreateDoctor($input: CrearDoctorInput!){
  	crearDoctor(input: $input) {
			id_doctor,
    anos_experiencia,
    numero_carnet,
    area_de_trabajo,
    horario,
    persona  {
      nombre1
    }
  }
}

`;


export const ADD_CDI_USER_MUTATION = gql`
mutation doCreateCDI($input: CrearCDIInput!){
  	crearCDI(input: $input) {
		id_cdi
    numero_cdi
    nombre
    encargado
    cuadrante
  }
}
`;



export const ADMIN_PACIENTES_QUERY = gql`
  query doGetPacientes{
    pacientes {
    id_paciente
    vacunas
    antecedentes_familiares
    tipo_de_sangre
    alergias
    discapacidad
    doctor {
    id_doctor
    anos_experiencia
    numero_carnet
    area_de_trabajo
    horario
      persona {
        ...personaDetalles
      }
    }
    cdi {
      id_cdi
      numero_cdi
      nombre
      encargado
      cuadrante
    }
    persona {
      ...personaDetalles
    }
    consultas {
      ...consultasDetalles
    }
    diagnosticos {
      ...diagnosticoDetalles
    }
    examenes {
      ...examenes
    }
    medicamentos {
      ...medicamento
    }
    tratamientos {
      ...tratamientos
    }
    emergencias {
      ...emergenciaDetalles
    }
    hospitalizaciones {
      ...hospitalizacionDetalles
    }
    }
  }
  ${PERSONA_DETALLES}
  ${CONSULTAS_DETALLES}
  ${DIAGNOSTICO_DETALLES}
  ${EXAMENES_DETALLES}
  ${MEDICAMENTOS_DETALLES}
  ${TRATAMIENTOS_DETALLES}
  ${EMERGENCIA_DETALLES}
  ${HOSPITALIZACION_DETALLES}
`;

export const ADDPACIENTE_MUTATION = gql`
mutation doCreatePaciente($input: CrearPacienteInput!) {
  crearPaciente(input: $input) {
    id_paciente
    persona {
      nombre1
    }
  }
}
`;

export const ADD_EMERGENCIA_MUTATION = gql`
mutation doCreateEmergencia($input: EmergenciaInput!) {
  crearEmergencia(input: $input) {
    id_emergencia
    motivo_emergencia
    diagnostico_provisional
    estado_paciente
    procesamiento_realizado
    tiempo_atencion
    notas_de_atencion
    destino
    createdAt
    updatedAt
  }
}
`;

export const ADD_HOSPITALIZACION_MUTATION = gql`
mutation doCreateHospitalizacion($input: HospitalizacionInput!) {
  crearHospitalizacion(input: $input) {
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
}
`;


export const ADDCONSULTA_MUTATION = gql`
mutation doCreateConsulta($input: ConsultaInput!){
  	crearConsulta(input: $input) {
    id_consulta,
    tipo_consulta,motivo_consulta,sintomas,notas_medicas,createdAt,updatedAt
  }
}
`;

export const UPDDATE_CONSULTA_MUTATION = gql`
mutation doUpdateConsulta($id_consulta: ID! $input: ConsultaInput!){
  actualizarConsulta(id_consulta: $id_consulta, input: $input) {
    id_consulta
    updatedAt
  }
}
`;


export const UPDDATE_DOCTOR_MUTATION = gql`
mutation doUpdateDoctor($id_doctor: ID! $input: ActualizarDoctorInput!){
  actualizarDoctor(id_doctor: $id_doctor, input: $input) {
    id_doctor
  }
}
`;

export const UPDDATE_CDI_MUTATION = gql`
mutation doUpdateCDI($id_cdi: ID! $input: ActualizarCDIInput!){
  actualizarCDI(id_cdi: $id_cdi, input: $input) {
    id_cdi
  }
}
`;

export const UPDDATE_DIAGNOSTICO_MUTATION = gql`
mutation doUpdateDiagnostico($id_diagnostico: ID! $input: DiagnosticoInput!){
  actualizarDiagnostico(id_diagnostico: $id_diagnostico, input: $input) {
    updatedAt
  }
}
`;

export const UPDDATE_EXAMEN_MUTATION = gql`
mutation doUpdateExamen($id_examenes: ID! $input: ExamenesResultadosInput!){
  actualizarExamenResultado(id_examenes: $id_examenes, input: $input) {
    updatedAt
  }
}
`;

export const UPDDATE_ESTADO_TRATAMIENTO_MUTATION = gql`
mutation doUpdateEstadoTratamiento($id_tratamiento: ID! $estado: EstadoTratamiento!){
  actualizarEstadoTratamiento(id_tratamiento: $id_tratamiento, estado: $estado)
}
`;

export const UPDDATE_ESTADO_MEDICAMENTO_MUTATION = gql`
mutation doUpdateEstadoMedicamento($id_medicamento: ID! $estado_tratamiento: EstadoTratamientoMedicamento!){
  actualizarEstadoMedicamento(id_medicamento: $id_medicamento, estado_tratamiento: $estado_tratamiento)
}
`;

export const UPDDATE_ESTADO_CONSULTA_MUTATION = gql`
mutation doUpdateEstadoConsulta($id_consulta: ID! $estado_consulta: String!){
  actualizarEstadoConsulta(id_consulta: $id_consulta, estado_consulta: $estado_consulta)
}
`;

export const UPDDATE_ESTADO_EMERGENCIA_MUTATION = gql`
mutation doUpdateEstadoEmergencia($id_emergencia: ID! $estado_emergencia: String!){
  actualizarEstadoEmergencia(id_emergencia: $id_emergencia, estado_emergencia: $estado_emergencia)
}
`;

export const UPDDATE_ESTADO_HOSPITALIZACION_MUTATION = gql`
mutation doUpdateEstadoHospitalizacion($id_hospitalizacion: ID! $estado: String!){
  actualizarEstadoHospitalizacion(id_hospitalizacion: $id_hospitalizacion, estado: $estado)
}
`;

export const ADDDIAGNOSTICO_MUTATION = gql`
mutation doCreateDiagnostico($input: DiagnosticoInput!) {
  crearDiagnostico(input: $input) {
    id_diagnostico
    condicion
    descripcion
    gravedad
    createdAt
    updatedAt
  }
}
`;

export const ADDEXAMEN_MUTATION = gql`
mutation doCreateExamen($input: ExamenesResultadosInput!) {
  crearExamenResultado(input: $input) {
    id_examenes
    tipo_de_examen
    resultados
    estado_examen
    medico_solicitante
    createdAt
    updatedAt
  }
}
`;

export const UPDATE_EXAMEN_MUTATION = gql`
mutation doCreateExamen($input: ExamenesResultadosInput!) {
  crearExamenResultado(input: $input) {
    id_examenes
    tipo_de_examen
    resultados
    estado_examen
    medico_solicitante
    createdAt
    updatedAt
  }
}
`;

export const UPDATE_USUARIO_MUTATION = gql`
mutation doUpdateUsuario($id_usuario: ID! $input: ActualizarUsuarioInput!) {
  actualizarUsuario(id_usuario: $id_usuario, input: $input) {
    id_usuario
    nombre_usuario
    estado
    rol
  }
}
`;


export const UPDATE_CDI_STATUS_MUTATION = gql`
mutation doUpdateCDIStatus($id_cdi: ID! $estado: String!) {
  inhabilitarCDI(id_cdi: $id_cdi, estado: $estado)
}
`;



export const INFORMACION_CDI_QUERY = gql`
  query doGetCDIProfile($id_cdi: ID!) {
    cdi(id_cdi: $id_cdi) {
    id_cdi
    numero_cdi
    nombre
    encargado
    cuadrante
    estado
    usuarios {
      id_usuario
      nombre_usuario
      rol
      estado
    }
    }
  }
`;


export const ADDTRATAMIENTO_MUTATION = gql`
mutation doCreateTratamiento($input: TratamientoInput!) {
  crearTratamiento(input: $input) {
    id_tratamiento
    tipo_de_tratamiento
    estado
    fecha_inicio
    fecha_culminacion
    detalles
    createdAt
    updatedAt
  }
}
`;

export const ADDMEDICAMENTO_MUTATION = gql`
mutation doCreateMedicamento($input: MedicamentoInput!) {
  crearMedicamento(input: $input) {
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
    medico_prescriptor
    estado_tratamiento
    tipo_medicamento
    contraindicaciones
    efectos_secundarios
    fk_doctor_id
    fk_paciente_id
    createdAt
    updatedAt
  }
}
`;

// export const ADDCONSULTA_MUTATION = gql`
//   mutation AddConsulta($data: ConsultaInput) {
//     AddConsulta(data: $data) {
//       dni
//       diagnostico
//       salida
//       ingreso
//     }
//   }
// `;

export const USER_DELETE = gql`
  mutation DelUser($id: ID!) {
    DelUser(id: $id) {
      status
    }
  }
`;

export const UPDATE_MUTATION = gql`
  mutation UpdateUserInfo($id: ID!, $data: UserInput!) {
    UpdateUserInfo(id: $id, data: $data) {
      profileImage
      name
      email
    }
  }
`;

export const UPDATE_CONSULTA_MUTATION = gql`
  mutation UpdateConsulta($id: ID!, $data: ConsultaInput!) {
    UpdateConsulta(id: $id, data: $data) {
      id
      name
      role
      nacionalidad
      dni
      telefono
      direccion {
      numero
      sector
      calle
    }
      sexo
      edad
      diagnostico
      consultas {
        diagnostico
        salida
        ingreso
      }
      createdAt
      fatherID
    }
  }
`;

export const BUSCAR_USER_QUERY = gql`
  query BuscarUser($data: UserInput!) {
    BuscarUser(data: $data) {
      id
      profileImage
      name
      email
      role
      roleEspecialidad
      nacionalidad
      dni
      telefono
      direccion {
      numero
      sector
      calle
    }
      createdAt
    }
  }
`;

export const BUSCAR_DOCTOR_QUERY = gql`
  query BuscarDoctor($data: UserInput!) {
    BuscarDoctor(data: $data) {
      id
      profileImage
      name
      email
      role
      roleEspecialidad
      nacionalidad
      dni
      telefono
      direccion {
      numero
      sector
      calle
    }
      createdAt
    }
  }
`;


export const BUSCAR_PACIENTE_QUERY = gql`
  query BuscarPaciente($data: PacienteInput!) {
    BuscarPaciente(data: $data) {
      id
      name
      role
      nacionalidad
      dni
      telefono
      direccion {
        sector
        calle
        numero
      }
      sexo
      edad
      diagnostico
      createdAt
      fatherID
      consultas{diagnostico salida ingreso createdAt}
    }
  }


`;

export const CREAR_SEGURIDAD = gql`
  mutation setPreguntas($data: seguridadInput) {
	setPreguntas(data: $data)
}
`

export const GET_SEGURIDAD = gql`
query getSeguridad($UserId: ID) {
	getSeguridad(UserId: $UserId) {
		id
		pregunta1
		respuesta1
		pregunta2
		respuesta2
		pregunta3
    respuesta3
	}
}
`

export const ACTUALIZAR_SEGURIDAD = gql`
mutation updatePreguntas($data: seguridadInput) {
	updatePreguntas(data: $data)
}
`

export const COMPROBAR_PREGUNTAS = gql`
query recuperarContrasena($data: respuestasSeguridadInput) {
	recuperarContrasena(data: $data)
}
`

export const ACTUALIZAR_CONTRASEÑA = gql`
mutation setNewPassword($UserId: ID, $password: String) {
	setNewPassword(UserId: $UserId, password: $password)
}
`

export const CHECK_USER_SEGURIDAD = gql`
query checkUserRecovery($email: String) {
	checkUserRecovery(email: $email) {
		id
		pregunta1
		respuesta1
		pregunta2
		respuesta2
		pregunta3
		pregunta1
		UserId
	}
}

`
