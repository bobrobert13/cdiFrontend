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




export const ADD_PREGUNTAS_RECUPERACION = gql`
  mutation docrearPreguntaSeguridad($input: CrearPreguntaSeguridadInput! ) {
    crearPreguntaSeguridad(input: $input) 
  }
`;

export const ADD_PIN_RECUPERACION = gql`
  mutation docrearPinRecuperacion($input: CrearPinInput!) {
    crearPinRecuperacion(input: $input) 
  }
`;

export const GET_SEGURIDAD_RECUPERACION = gql`
  query dometodosRecuperacion($nombre_usuario: String!) {
    metodosRecuperacion(nombre_usuario: $nombre_usuario) {
      tienePin
      preguntas {
      id_pregunta
      pregunta
      }
    }
  }
`;

export const VALIDAR_RECUPERACION_PREGUNTA = gql`
  mutation dorestaurarClavePorPregunta($input: ValidarPreguntaInput!) {
    restaurarClavePorPregunta(input: $input)
  }
`;

export const VALIDAR_RECUPERACION_PIN = gql`
  mutation dorestaurarClavePorPin($input: ValidarPinInput!) {
    restaurarClavePorPin(input: $input)
  }
`;







