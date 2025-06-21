import gql from "graphql-tag";

export const REGISTRAR_MUTATION = gql`
  mutation SignUp($data: SignUp) {
    SignUp(data: $data) {
      user {
        name
        email
      }
      message
    }
  }
`;

export const LOGIN_QUERY = gql`
  query Auth($data: Auth) {
    Login(data: $data) {
      token {
        code
        expire
      }
      user {
        id
        profileImage
        name
        email
        role
        createdAt
      }
    }
  }
`;

// Solicitud para recuperar contraseña, el emil es de la tienda solicitante
export const RECUPERAR_MUTATION = gql`
  mutation RecoveryPasswordMutation($email: String!) {
    RecoveryPassword(email: $email) {
      status
    }
  }
`;

export const RESET_MUTATION = gql`
  mutation ResetPasswordMutation($token: String!, $password: String!) {
    ResetPassword(token: $token, password: $password) {
      status
    }
  }
`;
