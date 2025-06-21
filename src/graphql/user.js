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

export const MIS_PACIENTES_QUERY = gql`
  query MisPacientes {
    MisPacientes {
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
      id
      diagnostico
      salida
      ingreso
      createdAt
    }
    createdAt
    fatherID
    }
  }
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

export const ADDPACIENTE_MUTATION = gql`
  mutation AddPaciente($data: PacienteInput) {
    AddPaciente(data: $data) {
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
export const ADDCONSULTA_MUTATION = gql`
  mutation AddConsulta($id: ID!, $data: ConsultaInput!) {
    AddConsulta(id: $id, data: $data) {
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

export const GET_SEGURIDAD = gql `
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

export const ACTUALIZAR_CONTRASEÑA = gql `
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
