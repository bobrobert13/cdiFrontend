import gql from "graphql-tag";

export const ADMIN_USERS_QUERY = gql`
  query allUsers {
    allUsers {
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
    }
  }
`;

export const ADMINss_PACIENTES_QUERY = gql`
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

export const ADMIN_ENCARGADO_QUERY = gql`
  query allEncargados {
    allEncargados {
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
    }
  }
`;

// export const ADMIN_DOCTORES_QUERY = gql`
//   query allDoctores($data: FilterInput) {
//     allDoctores(data: $data) {
//     id
//     profileImage
//     name
//     email
//     role
//     roleEspecialidad
//     nacionalidad
//     dni
//     telefono
//     direccion {
//       numero
//       sector
//       calle
//     }
//     }
//   }
// `;
