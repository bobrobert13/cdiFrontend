<template>
  <q-page padding>
    <div class="q-pa-md">

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-3" v-for="(stat, index) in stats" :key="index">
          <q-card class="full-height">
            <q-card-section>
              <div class="row items-center">
                <q-icon :name="stat.icon" size="lg" class="q-mr-md" :color="stat.color" />
                <div>
                  <div class="text-h5">{{ stat.value }}</div>
                  <div class="text-subtitle2">{{ stat.label }}</div>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <apexchart type="area" height="100" :options="stat.chartOptions" :series="stat.series"></apexchart>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-7">
          <q-card>
            <q-card-section>
              <apexchart type="bar" height="350" :options="barChartOptions" :series="barChartSeries"></apexchart>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-5">
          <q-card>

            <q-card-section>
              <apexchart type="donut" height="350" :options="donutChartOptions" :series="donutChartSeries"></apexchart>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-7">
          <q-card>
            <q-card-section>
              <apexchart type="line" height="350" :options="consultasPeriodoOptions" :series="consultasPeriodoSeries"></apexchart>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-5">
          <q-card>
            <q-card-section>
              <apexchart type="bar" height="350" :options="consultasMedicoOptions" :series="consultasMedicoSeries"></apexchart>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12">
          <q-card>
            <q-card-section>
              <apexchart type="bar" height="400" :options="diagnosticosOptions" :series="diagnosticosSeries"></apexchart>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <q-card>
            <q-card-section>
              <div class="text-h6">Últimos Pacientes Registrados</div>
            </q-card-section>
            <q-table
              :rows="lastRegisters"
              :columns="columns"
              row-key="id"
            />
          </q-card>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'EstadisticasDashboard',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      stats: [
        {
          label: 'Pacientes Registrados',
          value: '1,500',
          icon: 'groups',
          color: 'primary',
          series: [{ name: 'Pacientes', data: [200, 250, 300, 320, 400, 450, 500] }],
          chartOptions: { chart: { type: 'area', sparkline: { enabled: true } }, stroke: { curve: 'smooth' }, fill: { opacity: 0.3 } , yaxis: { min: 0 } }
        },
        {
          label: 'Pacientes Nuevos (Mes)',
          value: '82',
          icon: 'person_add',
          color: 'green',
          series: [{ name: 'Nuevos', data: [5, 15, 10, 20, 18, 25, 22] }],
          chartOptions: { chart: { type: 'area', sparkline: { enabled: true } }, stroke: { curve: 'smooth' }, fill: { opacity: 0.3 } , yaxis: { min: 0 } }
        },
        {
          label: 'Pacientes Atendidos (Hoy)',
          value: '45',
          icon: 'today',
          color: 'orange',
          series: [{ name: 'Atendidos', data: [5, 10, 15, 12, 20, 25, 30] }],
          chartOptions: { chart: { type: 'area', sparkline: { enabled: true } }, stroke: { curve: 'smooth' }, fill: { opacity: 0.3 } , yaxis: { min: 0 } }
        },
        {
          label: 'Consultas del Mes',
          value: '620',
          icon: 'event_available',
          color: 'red',
          series: [{ name: 'Consultas', data: [20, 25, 22, 30, 28, 35, 40] }],
          chartOptions: { chart: { type: 'area', sparkline: { enabled: true } }, stroke: { curve: 'smooth' }, fill: { opacity: 0.3 } , yaxis: { min: 0 } }
        }
      ],
      barChartOptions: {
        chart: { id: 'dist-edad' },
        title: { text: 'Distribución por Edad' },
        xaxis: { categories: ['Niños (0-12)', 'Adolescentes (13-18)', 'Adultos (19-64)', 'Mayores (65+)'] },
      },
      barChartSeries: [{
        name: 'Cantidad de Pacientes',
        data: [150, 200, 950, 200]
      }],
      donutChartOptions: {
        chart: { id: 'dist-genero' },
        title: { text: 'Distribución por Género' },
        labels: ['Masculino', 'Femenino'],
      },
      donutChartSeries: [700, 800],

      consultasPeriodoOptions: {
        chart: { id: 'consultas-periodo' },
        title: { text: 'Consultas por Período (Últimos 30 días)' },
        xaxis: { categories: Array.from({length: 30}, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit'});
        }).reverse() },
      },
      consultasPeriodoSeries: [{
        name: 'Nro. Consultas',
        data: [25, 30, 22, 40, 35, 50, 45, 48, 42, 55, 60, 58, 62, 53, 70]
      }],

      consultasMedicoOptions: {
        chart: { id: 'consultas-medico' },
        title: { text: 'Consultas por Médico' },
        xaxis: { categories: ['Dr. Martínez', 'Dra. González', 'Dr. Rodríguez', 'Dra. Pérez'] },
      },
      consultasMedicoSeries: [{
        name: 'Consultas Atendidas',
        data: [180, 220, 150, 70]
      }],

      diagnosticosOptions: {
        chart: { id: 'top-diagnosticos', type: 'bar' },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        title: { text: 'Top 10 Diagnósticos Más Frecuentes' },
        xaxis: {
          categories: [
            'Hipertensión Arterial',
            'Diabetes Mellitus Tipo 2',
            'Infección Respiratoria Aguda',
            'Gripe Común',
            'Dolor Lumbar',
            'Faringitis',
            'Migraña',
            'Gastritis',
            'Ansiedad',
            'Dermatitis'
          ],
        },
      },
      diagnosticosSeries: [{
        name: 'Nro. de Casos',
        data: [450, 380, 320, 280, 250, 210, 180, 150, 120, 100]
      }],

      columns: [
        { name: 'id', required: true, label: 'ID', align: 'left', field: 'id', sortable: true },
        { name: 'nombre', label: 'Nombre', align: 'left', field: 'nombre', sortable: true },
        { name: 'cedula', label: 'Cédula', align: 'left', field: 'cedula', sortable: true },
        { name: 'edad', label: 'Edad', align: 'left', field: 'edad', sortable: true },
        { name: 'genero', label: 'Género', align: 'left', field: 'genero', sortable: true },
      ],
      lastRegisters: [
        { id: 1, nombre: 'Juan Pérez', cedula: 'V-12.345.678', edad: 45, genero: 'Masculino' },
        { id: 2, nombre: 'Ana Gómez', cedula: 'V-18.765.432', edad: 29, genero: 'Femenino' },
        { id: 3, nombre: 'Carlos Ruiz', cedula: 'V-9.876.543', edad: 68, genero: 'Masculino' },
        { id: 4, nombre: 'María Fernández', cedula: 'V-25.432.109', edad: 15, genero: 'Femenino' },
        { id: 5, nombre: 'Luis Torres', cedula: 'V-14.567.890', edad: 8, genero: 'Masculino' },
      ]
    };
  }
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
