<template>
  <div>
    <div style="margin: 12px 12px">
      <!-- Encabezado con membrete -->
      <img src="../../../assets/membrete.png" class="full-width" />

      <!-- Título del documento -->
      <div class="text-center q-mt-md q-mb-lg">
        <h6 class="text-primary q-mb-none">DOCTOR</h6>
        <p class="text-grey-6 q-mt-sm">Información Personal y Profesional</p>
      </div>

      <!-- Información Personal -->
      <div class="q-mb-lg">
        <h5 class="text-primary q-mb-md">DATOS PERSONALES</h5>
        <q-markup-table class="q-mb-md">
          <thead class="bg-primary">
            <tr class="text-white">
              <th class="text-left">Campo</th>
              <th class="text-left">Información</th>
            </tr>
          </thead>
          <tbody class="bg-grey-1">
            <tr>
              <td class="text-weight-medium">Nombre Completo</td>
              <td>{{ data.persona.nombre1 || 'No especificado' }}</td>
            </tr>
            <tr>
              <td class="text-weight-medium">Nacionalidad</td>
              <td>{{ data.persona.nacionalidad || 'No especificado' }}</td>
            </tr>
            <tr>
              <td class="text-weight-medium">Documento de Identidad</td>
              <td>{{ data.persona.cedula_identidad || 'No especificado' }}</td>
            </tr>
            <tr>
              <td class="text-weight-medium">Número de contacto</td>
              <td>{{ data.persona.telefono.codigo || "+" }}{{ data.persona.telefono.numero || "No especificado" }}</td>
            </tr>
            <tr>
              <td class="text-weight-medium">Correo electrónico</td>
              <td>{{ data.persona.correo.correo || 'No especificado' }}</td>
            </tr>
                        <tr>
              <td class="text-weight-medium">Código postal</td>
              <td>{{ data.persona.direccion.codigo_postal || 'No especificado' }}</td>
            </tr>
                        <tr>
              <td class="text-weight-medium">Parroquia</td>
              <td>{{ data.persona.direccion.parroquia || 'No especificado' }}</td>
            </tr>
                        <tr>
              <td class="text-weight-medium">Sector</td>
              <td>{{ data.persona.direccion.sector || 'No especificado' }}</td>
            </tr>

                                    <tr>
              <td class="text-weight-medium">Calle</td>
              <td>{{ data.persona.direccion.calle || 'No especificado' }}</td>
            </tr>

                                    <tr>
              <td class="text-weight-medium">Número de casa</td>
              <td>{{ data.persona.direccion.numero_casa || 'No especificado' }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>

      <!-- Información Profesional -->
      <div class="q-mb-lg">
        <h6 class="text-primary q-mb-md">INFORMACIÓN PROFESIONAL</h6>
        <q-markup-table class="q-mb-md">
          <thead class="bg-primary">
            <tr class="text-white">
              <th class="text-left">Campo</th>
              <th class="text-left">Información</th>
            </tr>
          </thead>
          <tbody class="bg-grey-1">
            <tr>
              <td class="text-weight-medium">Número de Carnet</td>
              <td>{{ data.numero_carnet || 'No especificado' }}</td>
            </tr>
            <tr>
              <td class="text-weight-medium">Años de Experiencia</td>
              <td>{{ data.anos_experiencia || 'No especificado' }} años</td>
            </tr>
            <tr>
              <td class="text-weight-medium">Área de Trabajo</td>
              <td>{{ data.area_de_trabajo || 'No especificado' }}</td>
            </tr>
            <tr>
              <td class="text-weight-medium">Horario</td>
              <td>{{ data.horario || 'No especificado' }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>

      <!-- Información de Contacto -->
      <!-- <div class="q-mb-lg">
        <h5 class="text-primary q-mb-md">INFORMACIÓN DE CONTACTO</h5>
        <q-markup-table class="q-mb-md">
          <thead class="bg-primary">
            <tr class="text-white">
              <th class="text-left">Campo</th>
              <th class="text-left">Información</th>
            </tr>
          </thead>
          <tbody class="bg-grey-1">
            <tr>
              <td class="text-weight-medium">Teléfono</td>
              <td>
                <span v-if="data.persona.telefono">
                  {{ data.persona.telefono.codigo }} - {{ data.persona.telefono.numero }}
                </span>
                <span v-else>No especificado</span>
              </td>
            </tr>
            <tr>
              <td class="text-weight-medium">Correo Electrónico</td>
              <td>{{ data.persona.correo.correo || 'No especificado' }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div> -->

      <!-- Dirección -->
      <!-- <div class="q-mb-lg" v-if="data.persona.direccion">
        <h5 class="text-primary q-mb-md">DIRECCIÓN</h5>
        <q-markup-table class="q-mb-md">
          <thead class="bg-primary">
            <tr class="text-white">
              <th class="text-left">Campo</th>
              <th class="text-left">Información</th>
            </tr>
          </thead>
          <tbody class="bg-grey-1">
            <tr>
              <td class="text-weight-medium">Calle</td>
              <td>{{ data.persona.direccion.calle || 'No especificado' }}</td>
            </tr>
            <tr>
              <td class="text-weight-medium">Número de Casa</td>
              <td>{{ data.persona.direccion.numero_casa || 'No especificado' }}</td>
            </tr>
            <tr>
              <td class="text-weight-medium">Sector</td>
              <td>{{ data.persona.direccion.sector || 'No especificado' }}</td>
            </tr>
            <tr>
              <td class="text-weight-medium">Parroquia</td>
              <td>{{ data.persona.direccion.parroquia || 'No especificado' }}</td>
            </tr>
            <tr>
              <td class="text-weight-medium">Código Postal</td>
              <td>{{ data.persona.direccion.codigo_postal || 'No especificado' }}</td>
            </tr>
            <tr v-if="data.persona.direccion.punto_referencia">
              <td class="text-weight-medium">Punto de Referencia</td>
              <td>{{ data.persona.direccion.punto_referencia }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div> -->

      <!-- Información del Sistema -->
      <!-- <div class="q-mb-lg">
        <h5 class="text-primary q-mb-md">INFORMACIÓN DEL SISTEMA</h5>
        <q-markup-table class="q-mb-md">
          <thead class="bg-primary">
            <tr class="text-white">
              <th class="text-left">Campo</th>
              <th class="text-left">Información</th>
            </tr>
          </thead>
          <tbody class="bg-grey-1">
            <tr>
              <td class="text-weight-medium">ID del Doctor</td>
              <td>{{ data.id_doctor || 'No especificado' }}</td>
            </tr>
            <tr>
              <td class="text-weight-medium">Estado del Usuario</td>
              <td>
                <q-chip 
                  :color="data.usuarios[0].estado === 'activo' ? 'positive' : 'negative'"
                  text-color="white"
                  size="sm"
                >
                  {{ data.usuarios[0].estado || 'No especificado' }}
                </q-chip>
              </td>
            </tr>
            <tr>
              <td class="text-weight-medium">Rol en el Sistema</td>
              <td>{{ data.usuarios[0].rol || 'No especificado' }}</td>
            </tr>
            <tr>
              <td class="text-weight-medium">Fecha de Registro</td>
              <td>{{ entradaFecha(data.createdAt) }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div> -->

      <!-- Pie de página -->
      <div class="text-center q-mt-xl q-pa-md">
        <p class="text-grey-6 q-mb-none">
          Documento generado el {{ fechaActual() }} - Sistema CDI
        </p>
      </div>
    </div>

    <!-- Mensaje cuando no hay datos -->
    <!-- <div v-else class="text-center q-pa-xl">
      <q-icon name="info" size="48px" color="grey-5" />
      <p class="text-grey-6 q-mt-md">No hay información disponible para mostrar</p>
    </div> -->
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "historiaPdfDr",
  components: {},
  props: ["data"],
  created() {
    console.log("dataProps", this.data);
  },
  methods: {
    salidaFecha(salida) {
      return moment(salida).format('DD-MM-YYYY')
    },
    entradaFecha(entrada) {
      return moment(entrada).format('DD-MM-YYYY')
    },
    fechaActual() {
      return moment().format('DD-MM-YYYY HH:mm:ss')
    }
  }
}
</script>

<style scoped>
.q-markup-table {
  border-radius: 8px;
  overflow: hidden;
}

.q-markup-table thead th {
  font-weight: bold;
  font-size: 14px;
}

.q-markup-table tbody td {
  font-size: 13px;
}

h4,
h5 {
  font-weight: 600;
}

.text-weight-medium {
  font-weight: 500;
}
</style>
