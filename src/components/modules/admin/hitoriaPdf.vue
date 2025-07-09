<template>
  <div style="margin: 12px 12px">
    <img src="../../../assets/membrete.png" class=" full-width" />
    <q-markup-table>
      <thead class="bg-primary no-border no-border-radius">
        <tr class="text-white">
          <th class="text-left">Nacionalidad</th>
          <th class="text-left">Documento de identidad</th>
          <th class="text-left">Edad</th>
          <th class="text-left">Estado civil</th>
          <th class="text-left">Sexo</th>
          <th class="text-left">Fecha de registro</th>
        </tr>
      </thead>
      <tbody class="bg-grey-3">
        <tr>
          <td class="text-left">{{ data.persona.nacionalidad }}</td>
          <td class="text-left">{{ data.persona.cedula_identidad }}</td>
          <td class="text-left">{{ data.persona.edad }}</td>
          <td class="text-left">{{ data.persona.estado_civil }}</td>
          <td class="text-left">{{ data.persona.sexo }}</td>
          <td class="text-left">{{ entradaFecha(data.createdAt) }}</td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- INFORMACION DE CONTACTO -->
    <q-markup-table>
      <thead class="bg-primary no-border no-border-radius">
        <tr class="text-white">
          <th class="text-left">Teléfono</th>
          <th class="text-left">Correo electrónico</th>
        </tr>
      </thead>
      <tbody class="bg-grey-3">
        <tr>
          <td class="text-left">{{ data.persona.telefono.codigo }} {{ data.persona.telefono.numero }}</td>
          <td class="text-left">{{ data.persona.correo.correo }}</td>

        </tr>
      </tbody>
    </q-markup-table>


    <!-- INFORMACION DE UBICACION -->
    <q-markup-table>
      <thead class="bg-primary no-border no-border-radius">
        <tr class="text-white">
          <th class="text-left">Código postal</th>
          <th class="text-left">Parroquia</th>
          <th class="text-left">Calle</th>
          <th class="text-left">Sector</th>
          <th class="text-left">Casa n°</th>
        </tr>
      </thead>
      <tbody class="bg-grey-3">
        <tr>
          <td class="text-left">{{ data.persona.direccion.codigo_postal }}</td>
          <td class="text-left">{{ data.persona.direccion.parroquia }}</td>
          <td class="text-left">{{ data.persona.direccion.calle }}</td>
          <td class="text-left">{{ data.persona.direccion.sector }}</td>
          <td class="text-left">{{ data.persona.direccion.numero_casa }}</td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- INFORMACION DE CONSULTAS -->
    <q-markup-table>
      <thead class="bg-primary no-border no-border-radius">
        <tr>
          <th colspan="5">
            <div class="row no-wrap items-center">
              <div class="text-bold text-white">Consultas del paciente</div>
            </div>
          </th>
        </tr>
        <tr class="text-white">
          <th class="text-left">Tipo de consulta</th>
          <th class="text-left">Motivo</th>
          <th class="text-left">Sintomas</th>
          <th class="text-left">Fecha de consulta</th>
          <th class="text-left">Estado</th>
        </tr>
      </thead>
      <tbody v-if="data.consultas.length > 0" class="bg-grey-3">
        <tr v-for="(consulta, index) in data.consultas" :key="index">
          <td class="text-left">{{ consulta.tipo_consulta }}</td>
          <td class="text-left">{{ consulta.motivo_consulta }}</td>
          <td class="text-left">{{ consulta.sintomas }}</td>
          <td class="text-left">{{ entradaFecha(consulta.fecha_consulta) }}</td>
          <td class="text-left">{{ consulta.estado_consulta }}</td>
        </tr>
      </tbody>
      <tbody v-else class="bg-grey-3">
        <tr>
          <td colspan="5" class="text-left">El paciente no ha tenido ninguna consulta</td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- INFORMACION DE DIAGNOSTICOS -->
    <q-markup-table>
      <thead class="bg-primary no-border no-border-radius">
        <tr>
          <th colspan="5">
            <div class="row no-wrap items-center">
              <div class="text-bold text-white">Diagnósticos del paciente</div>
            </div>
          </th>
        </tr>
        <tr class="text-white">
          <th class="text-left">Condición</th>
          <th class="text-left">Descripción</th>
          <th class="text-left">Gravedad</th>
          <th class="text-left">Fecha de diagnóstico</th>
          <th class="text-left">Última actualización</th>
        </tr>
      </thead>
      <tbody v-if="data.diagnosticos.length > 0" class="bg-grey-3">
        <tr v-for="(diagnostico, index) in data.diagnosticos" :key="index">
          <td class="text-left">{{ diagnostico.condicion }}</td>
          <td class="text-left">{{ diagnostico.descripcion }}</td>
          <td class="text-left">{{ diagnostico.gravedad }}</td>
          <td class="text-left">{{ entradaFecha(diagnostico.fecha_diagnostico) }}</td>
          <td class="text-left">{{ entradaFecha(diagnostico.updatedAt) }}</td>
        </tr>
      </tbody>
      <tbody v-else class="bg-grey-3">
        <tr>
          <td colspan="5" class="text-left">El paciente no tiene diagnósticos registrados</td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- INFORMACION DE EXAMENES -->
    <q-markup-table>
      <thead class="bg-primary no-border no-border-radius">
        <tr>
          <th colspan="6">
            <div class="row no-wrap items-center">
              <div class="text-bold text-white">Exámenes del paciente</div>
            </div>
          </th>
        </tr>
        <tr class="text-white">
          <th class="text-left">Tipo de examen</th>
          <th class="text-left">Descripción</th>
          <th class="text-left">Resultados</th>
          <th class="text-left">Estado</th>
          <th class="text-left">Fecha</th>
        </tr>
      </thead>
      <tbody v-if="data.examenes.length > 0" class="bg-grey-3">
        <tr v-for="(examen, index) in data.examenes" :key="index">
          <td class="text-left">{{ examen.tipo_de_examen }}</td>
          <td class="text-left">{{ examen.descripcion }}</td>
          <td class="text-left">{{ examen.resultados || 'Aún no se ha realizado' }}</td>
          <td class="text-left">{{ examen.estado_examen || 'Aún no se ha realizado' }}</td>
          <td class="text-left">{{ entradaFecha(examen.createdAt) }}</td>
        </tr>
      </tbody>
      <tbody v-else class="bg-grey-3">
        <tr>
          <td colspan="6" class="text-left">El paciente no tiene exámenes registrados</td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- INFORMACION DE TRATAMIENTOS -->
    <q-markup-table>
      <thead class="bg-primary no-border no-border-radius">
        <tr>
          <th colspan="6">
            <div class="row no-wrap items-center">
              <div class="text-bold text-white">Tratamientos del paciente</div>
            </div>
          </th>
        </tr>
        <tr class="text-white">
          <th class="text-left">Tipo de tratamiento</th>
          <th class="text-left">Detalles</th>
          <th class="text-left">Estado</th>
          <th class="text-left">Fecha de inicio</th>
          <th class="text-left">Fecha de culminación</th>
        </tr>
      </thead>
      <tbody v-if="data.tratamientos.length > 0" class="bg-grey-3">
        <tr v-for="(tratamiento, index) in data.tratamientos" :key="index">
          <td class="text-left">{{ tratamiento.tipo_de_tratamiento }}</td>
          <td class="text-left">{{ tratamiento.detalles }}</td>
          <td class="text-left">{{ tratamiento.estado }}</td>
          <td class="text-left">{{ entradaFecha(tratamiento.fecha_inicio) }}</td>
          <td class="text-left">{{ entradaFecha(tratamiento.fecha_culminacion) }}</td>
        </tr>
      </tbody>
      <tbody v-else class="bg-grey-3">
        <tr>
          <td colspan="6" class="text-left">El paciente no tiene tratamientos registrados</td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- INFORMACION DE MEDICAMENTOS -->
    <q-markup-table>
      <thead class="bg-primary no-border no-border-radius">
        <tr>
          <th colspan="8">
            <div class="row no-wrap items-center">
              <div class="text-bold text-white">Medicamentos del paciente</div>
            </div>
          </th>
        </tr>
        <tr class="text-white">
          <th class="text-left">Nombre</th>
          <th class="text-left">Dosis</th>
          <th class="text-left">Vía de administración</th>
          <th class="text-left">Frecuencia</th>
          <th class="text-left">Duración</th>
          <th class="text-left">Estado</th>
          <th class="text-left">Fecha de inicio</th>
          <th class="text-left">Fecha de fin</th>
        </tr>
      </thead>
      <tbody v-if="data.medicamentos.length > 0" class="bg-grey-3">
        <tr v-for="(medicamento, index) in data.medicamentos" :key="index">
          <td class="text-left">{{ medicamento.nombre }}</td>
          <td class="text-left">{{ medicamento.dosis }}</td>
          <td class="text-left">{{ medicamento.via_administracion }}</td>
          <td class="text-left">{{ medicamento.frecuencia }}</td>
          <td class="text-left">{{ medicamento.duracion }}</td>
          <td class="text-left">{{ medicamento.estado_tratamiento }}</td>
          <td class="text-left">{{ entradaFecha(medicamento.fecha_inicio) }}</td>
          <td class="text-left">{{ entradaFecha(medicamento.fecha_fin) }}</td>
        </tr>
      </tbody>
      <tbody v-else class="bg-grey-3">
        <tr>
          <td colspan="8" class="text-left">El paciente no tiene medicamentos registrados</td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- INFORMACION DE EMERGENCIAS -->
    <q-markup-table>
      <thead class="bg-primary no-border no-border-radius">
        <tr>
          <th colspan="7">
            <div class="row no-wrap items-center">
              <div class="text-bold text-white">Emergencias del paciente</div>
            </div>
          </th>
        </tr>
        <tr class="text-white">
          <th class="text-left">Motivo de emergencia</th>
          <th class="text-left">Diagnóstico provisional</th>
          <th class="text-left">Estado del paciente</th>
          <th class="text-left">Estado de emergencia</th>
          <th class="text-left">Procesamiento realizado</th>
          <th class="text-left">Tiempo de atención</th>
          <th class="text-left">Destino</th>
        </tr>
      </thead>
      <tbody v-if="data.emergencias.length > 0" class="bg-grey-3">
        <tr v-for="(emergencia, index) in data.emergencias" :key="index">
          <td class="text-left">{{ emergencia.motivo_emergencia }}</td>
          <td class="text-left">{{ emergencia.diagnostico_provisional }}</td>
          <td class="text-left">{{ emergencia.estado_paciente }}</td>
          <td class="text-left">{{ emergencia.estado_emergencia }}</td>
          <td class="text-left">{{ emergencia.procesamiento_realizado }}</td>
          <td class="text-left">{{ emergencia.tiempo_atencion }}</td>
          <td class="text-left">{{ emergencia.destino }}</td>
        </tr>
      </tbody>
      <tbody v-else class="bg-grey-3">
        <tr>
          <td colspan="7" class="text-left">El paciente no tiene emergencias registradas</td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- INFORMACION DE HOSPITALIZACIONES -->
    <q-markup-table>
      <thead class="bg-primary no-border no-border-radius">
        <tr>
          <th colspan="6">
            <div class="row no-wrap items-center">
              <div class="text-bold text-white">Hospitalizaciones del paciente</div>
            </div>
          </th>
        </tr>
        <tr class="text-white">
          <th class="text-left">Motivo de hospitalización</th>
          <th class="text-left">Unidad hospitalaria</th>
          <th class="text-left">Estado</th>
          <th class="text-left">Fecha de ingreso</th>
          <th class="text-left">Fecha de egreso</th>
          <th class="text-left">Última actualización</th>
        </tr>
      </thead>
      <tbody v-if="data.hospitalizaciones.length > 0" class="bg-grey-3">
        <tr v-for="(hospitalizacion, index) in data.hospitalizaciones" :key="index">
          <td class="text-left">{{ hospitalizacion.motivo_de_hospitalizacion }}</td>
          <td class="text-left">{{ hospitalizacion.unidad_hospitalaria }}</td>
          <td class="text-left">{{ hospitalizacion.estado  }}</td>
          <td class="text-left">{{ entradaFecha(hospitalizacion.fecha_ingreso) }}</td>
          <td class="text-left">{{ entradaFecha(hospitalizacion.fecha_egreso) || 'No definida' }}</td>
        </tr>
      </tbody>
      <tbody v-else class="bg-grey-3">
        <tr>
          <td colspan="6" class="text-left">El paciente no tiene hospitalizaciones registradas</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "historiaPdf",
  components: {},
  props: ["data"],
  methods: {
    salidaFecha(salida) {
      return moment(salida).format('DD-MM-YYYY')
    },
    entradaFecha(entrada) {
      return moment(entrada).format('DD-MM-YYYY')
    },
  }
}
</script>

<style lang="scss" scoped></style>
