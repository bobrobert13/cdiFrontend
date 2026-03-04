import gql from "graphql-tag";

export const LISTAR_RESPALDOS_QUERY = gql`
  query listarRespaldos {
    listarRespaldos {
      filename
      size
      createdAt
    }
  }
`;

export const CREAR_RESPALDO_MUTATION = gql`
  mutation crearRespaldo {
    crearRespaldo {
      filename
      size
      createdAt
    }
  }
`;

export const RESTAURAR_RESPALDO_MUTATION = gql`
  mutation restaurarRespaldo($filename: String!) {
    restaurarRespaldo(filename: $filename)
  }
`;

export const ELIMINAR_RESPALDO_MUTATION = gql`
  mutation eliminarRespaldo($filename: String!) {
    eliminarRespaldo(filename: $filename)
  }
`;
