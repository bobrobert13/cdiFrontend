<template>
  <div style="margin: 12px 12px">
    <img src="../../../assets/membrete.png" class=" full-width" />
    <q-markup-table flat bordered>
      <thead class="bg-primary">
        <tr>
          <th colspan="5">
            <div class="row no-wrap items-center">
              <div class="text-h4 q-ml-md text-white">CDIs del sistema</div>
            </div>
          </th>
        </tr>
        <tr class="text-white">
          <th class="text-left">Número de CDI</th>
          <th class="text-left">Nombre de CDI</th>
          <th class="text-left">Encargado</th>
          <th class="text-left">Cuadrante</th>
          <th class="text-left">Estado</th>
        </tr>
      </thead>
      <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
        <tr v-for="(data, index) in data" :key="index">
          <td class="text-left">{{ data.numero_cdi }}</td>
          <td class="text-left">{{ data.nombre }}</td>
          <td class="text-left">{{ data.encargado }}</td>
          <td class="text-left">{{ data.cuadrante }}</td>
          <td class="text-left">{{ data.estado }}</td>
        </tr>
      </tbody>
    </q-markup-table>
    <div class="text-center q-mt-xl q-pa-md">
      <p class="text-grey-6 q-mb-none">
        Documento generado el {{ fechaActual() }} - Sistema CDI
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "historiaPdfEnc",
  components: {},
  props: ["data"],
  created() {
    console.log("di hola pdf", this.props.data);
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

<style></style>
