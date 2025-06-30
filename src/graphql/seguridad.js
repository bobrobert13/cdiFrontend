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

export const DO_LOGIN_QUERY = gql`
mutation doLogin($input: LoginInput!){
  	login(input: $input){
   	 token,
    usuario {
      id_usuario,
      nombre_usuario,
      estado,
      rol,
      fk_doctor_id,
      fk_cdi_id
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
