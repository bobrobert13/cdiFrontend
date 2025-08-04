import gql from "graphql-tag";

export const ESTADISTICA_PACIENTES_TOTALES_QUERY = gql`
  query getCantidadPacienteTotales($id_cdi: ID!) {
    cantidadPacienteTotales(id_cdi: $id_cdi)
  }
`;

export const ESTADISTICA_PACIENTES_NUEVOS_QUERY = gql`
  query getCantidadPacientesNuevos($id_cdi: ID!, $periodo: String) {
    cantidadPacientesNuevos(id_cdi: $id_cdi, periodo: $periodo)
  }
`;

export const ESTADISTICA_PACIENTES_POR_GENERO_QUERY = gql`
  query getDistribucionPorGenero($id_cdi: ID!) {
    distribucionPorGenero(id_cdi: $id_cdi) {
    masculino
    femenino
    }
  }
`;

export const ESTADISTICA_PACIENTES_POR_EDAD_QUERY = gql`
  query getDistribucionPorEdad($id_cdi: ID!) {
    distribucionPorEdad(id_cdi: $id_cdi)
  }
`;


export const ESTADISTICA_CONSULTAS_POR_PERIODO_QUERY = gql`
  query getTotalConsultasRealizadasPeriodo($id_cdi: ID!, $periodo: String) {
    totalConsultasRealizadasPeriodo(id_cdi: $id_cdi, periodo: $periodo)
  }
`;

export const ESTADISTICA_CONSULTAS_POR_DOCTOR_QUERY = gql`
  query getTotalConsultasRealizadasPorMedico($id_cdi: ID!, $periodo: String) {
    totalConsultasRealizadasPorMedico(id_cdi: $id_cdi, periodo: $periodo) {
    nombresDoctores
    consultasMedico
    }
  }
`;

export const ESTADISTICA_TOP_TEN_DIAGNOSTICOS_QUERY = gql`
  query getTop10DiagnosticosMasComunes($id_cdi: ID!, $periodo: String) {
    top10DiagnosticosMasComunes(id_cdi: $id_cdi, periodo: $periodo) {
    condiciones
    totales
    }
  }
`;
