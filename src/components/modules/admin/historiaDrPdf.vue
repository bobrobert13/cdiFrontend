<template>
  <div>
    <div v-if="!Array.isArray(data)" style="margin: 12px 12px">
    <img
      src="../../../assets/membrete.png"
      class=" full-width"
    />
    <q-markup-table flat bordered>
      <thead class="bg-primary">
        <tr>
          <th colspan="5">
            <div class="row no-wrap items-center">
              <div class="text-h4 q-ml-md text-white">Doctor: {{ data.name }}</div>
            </div>
          </th>
        </tr>
        <tr class="text-white">
          <th class="text-left">Cédula</th>
          <th class="text-right">E-mail</th>
          <th class="text-right">Especialidad</th>
          <th class="text-right">Telefono</th>
        </tr>
      </thead>
      <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
        <tr>
          <td class="text-left">{{data.dni}}</td>
          <td class="text-right">{{data.email}}</td>
          <td class="text-right">{{ data.roleEspecialidad }}</td>
          <td class="text-right">{{ data.telefono }}</td>
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
          <!-- <td class="text-left"> {{ data.direccion.calle }}</td>
          <td class="text-left">{{data.direccion.sector}} </td>
          <td class="text-left">{{data.direccion.numero }} </td> -->
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
  <div v-else style="margin: 12px 12px">
    <img
      src="../../../assets/membrete.png"
      class=" full-width"
    />
  <div v-for="(user, index) in data" :key="index">
    <q-markup-table  flat bordered>
      <thead class="bg-primary">
        <tr>
          <th colspan="5">
            <div class="row no-wrap items-center">
              <div class="text-h4 q-ml-md text-white">Doctor: {{ user.name }}</div>
            </div>
          </th>
        </tr>
        <tr class="text-white">
          <th class="text-left">Cédula</th>
          <th class="text-right">E-mail</th>
          <th class="text-right">Especialidad</th>
          <th class="text-right">Telefono</th>
        </tr>
      </thead>
      <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
        <tr>
          <td class="text-left">{{user.dni}}</td>
          <td class="text-right">{{user.email}}</td>
          <td class="text-right">{{ user.roleEspecialidad }}</td>
          <td class="text-right">{{ user.telefono }}</td>
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
          <td class="text-left"> {{ user.direccion.calle }}</td>
          <td class="text-left">{{user.direccion.sector}} </td>
          <td class="text-left">{{user.direccion.numero }} </td>
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
  </div>

  </div>
</template>

<script>
import moment from 'moment'
  export default {
    name: "historiaPdfDr",
    components: {},
    props: ["data"],
    created() {
      console.log("dataProps", this.props.data);
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
