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
              <div class="text-h4 q-ml-md text-white">Paciente: {{ data.name }}</div>
            </div>
          </th>
        </tr>
        <tr class="text-white">
          <th class="text-left">Cédula</th>
          <th class="text-right">Edad</th>
          <th class="text-right">Sexo</th>
        </tr>
      </thead>
      <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
        <tr>
          <td class="text-left">{{data.dni}}</td>
          <td class="text-right">{{data.edad}}</td>
          <td class="text-right">{{ data.sexo }}</td>
        </tr>
      </tbody>

    </q-markup-table>

    <q-markup-table flat bordered>
      <thead class="bg-primary">
        <tr class="text-white">
          <th class="text-left text-bold">Dirección</th>
        </tr>
        <tr class="text-white">
          <th class="text-left">Calle</th>
          <th class="text-left">Sector</th>
          <th class="text-left">Casa n°</th>
        </tr>
      </thead>
      <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
        <tr>
          <td class="text-left"> {{ data.direccion.calle }}</td>
          <td class="text-left">{{data.direccion.sector}} </td>
          <td class="text-left">{{data.direccion.numero }} </td>
        </tr>
      </tbody>

    </q-markup-table>


    <q-markup-table flat bordered class="q-mt-md">
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
          <td class="text-left"><b>Diagnostico:</b> {{consulta.diagnostico}} / <b>Entrada</b>: {{ entradaFecha(consulta.ingreso) }} / <b>Salida</b>: {{ salidaFecha(consulta.salida) }}</td>
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
      salidaFecha (salida) {
        return moment(salida).format('DD-MM-YYYY')
      },
      entradaFecha (entrada){
        return moment(entrada).format('DD-MM-YYYY')
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
