import gql from "graphql-tag";

export const ESTADISTICA_PACIENTES_TOTALES_QUERY = gql`
  query getCantidadPacienteTotales($id_cdi: ID!) {
    cantidadPacienteTotales(id_cdi: $id_cdi)
  }
`;

export const ESTADISTICA_PACIENTES_NUEVOS_QUERY = gql`
  query getCantidadPacientesNuevos($id_cdi: ID!, $periodo: String, $mes: Int) {
    cantidadPacientesNuevos(id_cdi: $id_cdi, periodo: $periodo, mes: $mes)
  }
`;

export const ESTADISTICA_PACIENTES_POR_GENERO_QUERY = gql`
  query getDistribucionPorGenero($id_cdi: ID!) {
    distribucionPorGenero(id_cdi: $id_cdi) {
    masculino
    femenino
    masculinoNinos
    masculinoAdolescentes
    masculinoAdultos
    masculinoMayores
    femeninoNinas
    femeninoAdolescentes
    femeninoAdultas
    femeninoMayores
    }
  }
`;

export const ESTADISTICA_PACIENTES_POR_EDAD_QUERY = gql`
  query getDistribucionPorEdad($id_cdi: ID!) {
    distribucionPorEdad(id_cdi: $id_cdi)
  }
`;

export const ESTADISTICA_PACIENTES_POR_AREA_QUERY = gql`
  query getCantidadPacientesPorAreaDeTrabajo($id_cdi: ID!) {
    cantidadPacientesPorAreaDeTrabajo(id_cdi: $id_cdi) {
      areas
      totales
    }
  }
`;

export const ESTADISTICA_CONSULTAS_POR_PERIODO_QUERY = gql`
  query getTotalConsultasRealizadasPeriodo($id_cdi: ID!, $periodo: String, $mes: Int) {
    totalConsultasRealizadasPeriodo(id_cdi: $id_cdi, periodo: $periodo, mes: $mes)
  }
`;

export const ESTADISTICA_CONSULTAS_POR_DOCTOR_QUERY = gql`
  query getTotalConsultasRealizadasPorMedico($id_cdi: ID!, $periodo: String, $mes: Int) {
    totalConsultasRealizadasPorMedico(id_cdi: $id_cdi, periodo: $periodo, mes: $mes) {
    nombresDoctores
    consultasMedico
    }
  }
`;

export const ESTADISTICA_TOP_TEN_DIAGNOSTICOS_QUERY = gql`
  query getTop10DiagnosticosMasComunes($id_cdi: ID!, $periodo: String, $mes: Int) {
    top10DiagnosticosMasComunes(id_cdi: $id_cdi, periodo: $periodo, mes: $mes) {
    condiciones
    totales
    }
  }
`;
