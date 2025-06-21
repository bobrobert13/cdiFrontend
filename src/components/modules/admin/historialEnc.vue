<template>
  <div style="margin: 12px 12px">
    <img
      src="../../../assets/membrete.png"
      class=" full-width"
    />
    <q-markup-table flat bordered>
      <thead class="bg-primary">
        <tr>
          <th colspan="5">
            <div class="row no-wrap items-center">
              <div class="text-h4 q-ml-md text-white">Encargado: {{ data.name }}</div>
            </div>
          </th>
        </tr>
        <tr class="text-white">
          <th class="text-left">Cédula</th>
          <th class="text-right">E-mail</th>
          <th class="text-right">Rol</th>
          <th class="text-right">Telefono</th>
          <!-- <th class="text-right">Dirección</th> -->
        </tr>
      </thead>
      <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
        <tr>
          <td class="text-left">{{data.dni}}</td>
          <td class="text-right">{{data.email}}</td>
          <td class="text-right">Encargado</td>
          <td class="text-right">{{ data.telefono }}</td>
          <!-- <td class="text-right"> {{ data.direccion.calle }} - Sector:  {{data.direccion.sector}} - Casa n° {{data.direccion.numero   }}</td> -->
        </tr>
      </tbody>
    </q-markup-table>
    <!-- <q-markup-table flat bordered class="q-mt-md">
      <thead class="bg-primary">
        <tr>
          <th colspan="5">
            <div class="row no-wrap items-center">
              <div class="text-h4 q-ml-md text-white">Consultas:</div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
        <tr v-for="(consulta, index) in data.consultas" :key="index" >
          <td class="text-left">{{consulta.diagnostico}} / Entrada: {{ entradaFecha(consulta.ingreso) }} / Salida: {{ salidaFecha(consulta.salida) }}</td>
        </tr>
      </tbody>
    </q-markup-table> -->
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
      salidaFecha (salida) {
        return moment(salida).format('DD-MM-YYYY')
      },
      entradaFecha (entrada){
        return moment(entrada).format('DD-MM-YYYY')
      },
    }
  }
</script>

<style >

</style>
