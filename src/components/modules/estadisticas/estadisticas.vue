<template>
  <q-page padding>

    <section v-if="this.$store.state.user.role === 'admin' && !showStatsPanel" class=" column">

      <h4 class=" q-my-sm text-primary">Estadisticas de CDIs</h4>
      <p>A continuación se presenta la lista de CDIs en el sistema. Haz click para ir a sus estadisticas.</p>

      <q-table flat bordered dense :data="rows" :columns="columns" row-key="id" :filter="filter"
        rows-per-page-label="Registros por página" no-data-label="No hay datos disponibles"
        class="text-primary full-height" style=" min-height: 80vh;">
        <template v-slot:top-right>
          <div class=" q-px-lg q-py-sm">
                      <q-input dense color="primary" filled  v-model="filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          </div>
        </template>

        <template v-slot:body="props">
          <tr class="q-px-md">
            <td class="text-left">{{ props.row.name }}</td>
            <td class="text-center">{{ props.row.numero_cdi }}</td>
            <td class="text-left">{{ props.row.encargado }}</td>
            <td class="text-center">{{ props.row.cuadrante }}</td>
            <td class="text-center">
              <q-btn color="primary" @click="showStats(props.row.id)" label="Ver Estadísticas" size="sm" />
            </td>
          </tr>
        </template>
      </q-table>

    </section>

    <div v-else-if="showStatsPanel" class="q-pa-xs">
      <!-- SECCIÓN DE FILTROS -->
      <!-- Los filtros permiten cambiar el período de tiempo de los datos mostrados -->

      <div v-if="this.$store.state.user.role === 'admin'" class="row q-mb-sm">
        <div class="col-12">
          <q-btn color="primary" label="Volver a la lista de CDIs" @click="backToListCdi" icon="arrow_back" />
        </div>
      </div>

      <div class="row q-mb-sm">
        <div class="col-12">
          <q-card class="q-pa-md">
            <div class="text-h6 q-mb-md">Filtros de Período (Semana/Mes)</div>
            <div class="row q-gutter-md items-center">
              <!-- Selector de período principal -->
              <div class="col-auto">
                <q-select v-model="selectedPeriod" outlined dense :options="periodOptions" label="Período" emit-value
                  map-options @update:model-value="onPeriodChange" style="min-width: 150px" />
              </div>

              <!-- Selector de mes (solo visible cuando el período es 'Mes') -->
              <div class="col-auto" v-if="selectedPeriod === 'month'">
                <q-select
                  v-model="selectedMonth"
                  outlined
                  dense
                  :options="monthOptions"
                  label="Mes"
                  emit-value
                  map-options
                  @update:model-value="onMonthChange"
                  style="min-width: 170px"
                />
              </div>

              <!-- Botón para actualizar datos -->
              <!-- <div class="col-auto">
                <q-btn color="primary" label="Actualizar" @click="updateChartData" :loading="isLoading" />
              </div> -->

              <!-- Indicador del período actual -->
              <div class="col-auto">
                <q-chip color="primary" size="md" text-color="white">
                  {{ getCurrentPeriodLabel() }}
                </q-chip>
              </div>
            </div>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-xs q-mb-sm">
        <div class="col-12 col-md-4" v-for="(stat, index) in stats" :key="index">
          <q-card class="full-height q-pa-sm">
            <q-card-section>
            <q-btn v-if="stat.id !== 'stat-pacientes-registrados'" color="primary" icon="download" class=" cursor-pointer float-right" dense flat @click="onReport(stat.id)" />
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

      <div class="row q-col-gutter-md q-mb-sm">
        <div class="col-12 col-md-7">
          <q-card>
            <q-card-section>
            <q-btn color="primary" icon="download" class=" cursor-pointer z-max float-right" dense flat @click="onReport('dist-edad')" />
              <apexchart type="bar" height="350" :options="barChartOptions" :series="barChartSeries"></apexchart>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-5">
          <q-card>

            <q-card-section>
            <q-btn color="primary" icon="download" class=" cursor-pointer z-max float-right" dense flat @click="onReport('dist-genero')" />
              <apexchart type="donut" height="350" :options="donutChartOptions" :series="donutChartSeries"></apexchart>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-sm">
        <div class="col-12 col-md-12">
          <q-card>
            <q-card-section>
            <q-btn color="primary" icon="download" class=" cursor-pointer z-max float-right" dense flat @click="onReport('consultas-periodo')" />
              <apexchart type="line" height="350" :options="consultasPeriodoOptions" :series="consultasPeriodoSeries">
              </apexchart>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-12">
          <q-card>
            <q-card-section>
            <q-btn color="primary" icon="download" class=" cursor-pointer z-max float-right" dense flat @click="onReport('consultas-medico')" />
              <apexchart type="bar" height="350" :options="consultasMedicoOptions" :series="consultasMedicoSeries">
              </apexchart>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-sm">
        <div class="col-12">
          <q-card>
            <q-card-section>
            <q-btn color="primary" icon="download" class=" cursor-pointer z-max float-right" dense flat @click="onReport('top-diagnosticos')" />
              <apexchart type="bar" height="400" :options="diagnosticosOptions" :series="diagnosticosSeries">
              </apexchart>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>


       <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="false" :preview-modal="true"
        :paginate-elements-by-height="1400" filename="Consulta_del_Mes_CDI" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="html2PdfConsultaMes">
        <section slot="pdf-content">
          <ReporteConsultaMes :data="reporteConsultasDelMes" />
        </section>
      </vue-html2pdf>
    </div>

           <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="false" :preview-modal="true"
        :paginate-elements-by-height="1400" filename="Paciente_Por_Periodo_del_CDI" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="html2PdfPacientePorPeriodo">
        <section slot="pdf-content">
          <ReportePacienteNuevosPeriodo :data="reportePacienteNuevosPeriodoVar" />
        </section>
      </vue-html2pdf>
    </div>


               <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="false" :preview-modal="true"
        :paginate-elements-by-height="1400" filename="Consultas_Por_Medico_Por_Periodo_del_CDI" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="html2PdfConsultasPorMedicoPeriodo">
        <section slot="pdf-content">
          <ReporteConsultasPorMedicoPeriodo :data="reporteConsultasPorMedicoPorPeriodo" />
        </section>
      </vue-html2pdf>
    </div>


                   <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="false" :preview-modal="true"
        :paginate-elements-by-height="1400" filename="Consultas_Por_Periodo_del_CDI" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="html2PdfConsultasPeriodo">
        <section slot="pdf-content">
          <ReporteConsultasPeriodo :data="reporteConsultasPeriodo" />
        </section>
      </vue-html2pdf>
    </div>


                       <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="false" :preview-modal="true"
        :paginate-elements-by-height="1400" filename="Distribucion_Por_Edad_del_CDI" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="html2PdfDistEdad">
        <section slot="pdf-content">
          <ReporteDistEdad :data="reporteDistEdad" />
        </section>
      </vue-html2pdf>
    </div>

                           <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="false" :preview-modal="true"
        :paginate-elements-by-height="1400" filename="Distribucion_Por_Genero_del_CDI" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="html2PdfDistGenero">
        <section slot="pdf-content">
          <ReporteDistGenero :data="reporteDistGenero" />
        </section>
      </vue-html2pdf>
    </div>

                               <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="false" :preview-modal="true"
        :paginate-elements-by-height="1400" filename="Top_Diagnosticos_del_CDI" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="html2PdfTopDiagnosticos">
        <section slot="pdf-content">
          <ReporteTopDiagnosticos :data="reporteTopDiagnosticos" />
        </section>
      </vue-html2pdf>
    </div>

  </q-page>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import VueHtml2pdf from "vue-html2pdf";
import { ADMIN_ALL_CDIS_QUERY } from 'src/graphql/user.js';

import {
  ESTADISTICA_PACIENTES_TOTALES_QUERY,
  ESTADISTICA_PACIENTES_NUEVOS_QUERY,
  ESTADISTICA_PACIENTES_POR_GENERO_QUERY,
  ESTADISTICA_PACIENTES_POR_EDAD_QUERY,
  ESTADISTICA_CONSULTAS_POR_PERIODO_QUERY,
  ESTADISTICA_CONSULTAS_POR_DOCTOR_QUERY,
  ESTADISTICA_TOP_TEN_DIAGNOSTICOS_QUERY
} from '../../../graphql/estadisticas.js';

// PLANTILLAS DE ESTADISTICAS:
import ReporteTotalPacientes from '../../modules/admin/reports/estadisticas/reporteTotalPacientes.vue';
import ReportePacienteNuevosPeriodo from '../../modules/admin/reports/estadisticas/reportePacienteNuevosPeriodo.vue';
import ReporteConsultasPeriodo from '../../modules/admin/reports/estadisticas/reporteConsultasPeriodo.vue';
import ReporteDistGenero from '../../modules/admin/reports/estadisticas/reporteDistGenero.vue';
import ReporteDistEdad from '../../modules/admin/reports/estadisticas/reporteDistEdad.vue';
import ReporteConsultasPorMedicoPeriodo from '../../modules/admin/reports/estadisticas/reporteConsultasPorMedicoPeriodo.vue';
import ReporteTopDiagnosticos from '../../modules/admin/reports/estadisticas/reporteTopDiagnosticos.vue';
import ReporteConsultaMes from '../../modules/admin/reports/estadisticas/reporteConsultaMes.vue';


export default {
  name: 'EstadisticasDashboard',
  components: {
    VueApexCharts,
    VueHtml2pdf,
    ReporteConsultasPeriodo,
    ReporteTotalPacientes,
    ReportePacienteNuevosPeriodo,
    ReporteDistGenero,
    ReporteDistEdad,
    ReporteConsultasPorMedicoPeriodo,
    ReporteTopDiagnosticos,
    ReporteConsultaMes
  },
  data() {
    return {
      filter: '',
      userId: this.$store.state.user.id,
      showStatsPanel: false,

      reporteConsultasDelMes: {},
      reportePacienteNuevosPeriodoVar: {},
      reporteConsultasPorMedicoPorPeriodo: {},
      reporteConsultasPeriodo: {},
      reporteDistEdad: {},
      reporteDistGenero: {},
      reporteTopDiagnosticos: {},

      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nombre CDI',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'numero_cdi',
          label: 'Número CDI',
          align: 'center',
          field: row => row.numero_cdi,
          sortable: true
        },
        {
          name: 'encargado',
          label: 'Encargado',
          align: 'left',
          field: row => row.encargado,
          sortable: true
        },
        {
          name: 'cuadrante',
          label: 'Cuadrante',
          align: 'center',
          field: row => row.cuadrante,
          sortable: true
        },
        {
          name: 'id',
          label: '',
          align: 'center',
          field: '',
          sortable: false,
        },

      ],
      rows: [],
      totalPacientes: 0,
      totalPacientesNuevos: 0,
      totalConsultas: 0,
      pacientesPorGenero: [0, 0],
      pacientesPorEdad: [0, 0, 0, 0],
      totalConsultasMedico: 0,
      totalDiagnosticos: 0,
      // Arrays para datos de estadísticas
      pacientesNuevosData: [],
      consultasData: [],
      // === CONFIGURACIÓN DE FILTROS ===
      // Estado actual del filtro seleccionado
      selectedPeriod: 'month', // Valores posibles: 'week', 'month'
  // Mes seleccionado (1-12). Por defecto, mes actual
  selectedMonth: new Date().getMonth() + 1,

      // Opciones disponibles para el selector de período
      periodOptions: [
        { label: 'Esta Semana', value: 'week' },
        { label: 'Este Mes', value: 'month' }
      ],

      // Opciones de meses
      monthOptions: [
        { label: 'Enero', value: 1 },
        { label: 'Febrero', value: 2 },
        { label: 'Marzo', value: 3 },
        { label: 'Abril', value: 4 },
        { label: 'Mayo', value: 5 },
        { label: 'Junio', value: 6 },
        { label: 'Julio', value: 7 },
        { label: 'Agosto', value: 8 },
        { label: 'Septiembre', value: 9 },
        { label: 'Octubre', value: 10 },
        { label: 'Noviembre', value: 11 },
        { label: 'Diciembre', value: 12 }
      ],

      // Estado de carga para mostrar spinner en el botón
      isLoading: false,

      // Datos originales (simulan los datos que vendrían de tu API)
      // IMPORTANTE: Estos serán reemplazados por tus datos reales
      // NOTA: Solo incluye datos que cambian con los filtros
      originalData: {
        // === DATOS SEMANALES (7 días) ===
        weekly: {
          consultas: [180, 220, 195, 240, 210, 280, 265],
          pacientes: [45, 55, 48, 62, 52, 68, 61],
          pacientesNuevos: [5, 8, 6, 12, 9, 15, 11],
          // Datos para consultas por médico
          consultasMedico: [85, 110, 75, 35, 12, 210],
          // Datos para top diagnósticos
          diagnosticos: [220, 190, 160, 140, 125, 105, 90, 75, 60, 50]
        },
        // === DATOS MENSUALES (4-6 semanas) ===
        monthly: {
          consultas: [620, 580, 720, 650, 690, 750],
          pacientes: [155, 145, 180, 162, 172, 188],
          pacientesNuevos: [25, 22, 35, 28, 32, 38],
          // Datos para consultas por médico
          consultasMedico: [180, 220, 150, 70, 12, 210],
          // Datos para top diagnósticos
          diagnosticos: [450, 380, 320, 280, 250, 210, 180, 150, 120, 100]
        }
      },
      stats: [
        {
          label: 'Pacientes Registrados',
          value: '10',
          id: 'stat-pacientes-registrados',
          icon: 'groups',
          color: 'primary',
          series: [{ name: 'Pacientes', data: [0, 10,] }],
          chartOptions: { chart: { type: 'area', sparkline: { enabled: true }, toolbar: { show: false } }, stroke: { curve: 'smooth' }, fill: { opacity: 0.3 }, yaxis: { min: 0 } }
        },
        {
          label: 'Pacientes Nuevos (Mes)',
          value: '82',
          id: 'stat-pacientes-nuevos',
          icon: 'person_add',
          color: 'green',
          series: [{ name: 'Nuevos', data: [0] }],
          chartOptions: { chart: { type: 'area', sparkline: { enabled: true }, toolbar: { show: false } }, stroke: { curve: 'smooth' }, fill: { opacity: 0.3 }, yaxis: { min: 0 } }
        },
        {
          label: 'Consultas del Mes',
          value: '620',
          id: 'stat-consultas-mes',
          icon: 'event_available',
          color: 'red',
          series: [{ name: 'Consultas', data: [20, 25, 22, 30, 28, 35, 40] }],
          chartOptions: { chart: { type: 'area', sparkline: { enabled: true }, toolbar: { show: false } }, stroke: { curve: 'smooth' }, fill: { opacity: 0.3 }, yaxis: { min: 0 } }
        }
      ],
      barChartOptions: {
        chart: { id: 'dist-edad', toolbar: { show: false } },
        title: { text: 'Distribución por Edad' },
        xaxis: { categories: ['Niños (0-12)', 'Adolescentes (13-18)', 'Adultos (19-64)', 'Mayores (65+)'] },
      },
      barChartSeries: [{
        name: 'Cantidad de Pacientes',
        data: [0, 0, 0, 0]
      }],
      donutChartOptions: {
        chart: { id: 'dist-genero', toolbar: { show: false } },
        title: { text: 'Distribución por Género' },
        labels: ['Masculino', 'Femenino'],
      },
      donutChartSeries: [0, 0],

      consultasPeriodoOptions: {
        chart: { id: 'consultas-periodo', toolbar: { show: false } },
        title: { text: 'Consultas por Período (Últimos 30 días)' },
        xaxis: {
          categories: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4']
        },
      },
      consultasPeriodoSeries: [{
        name: 'Nro. Consultas',
        data: [25, 30, 22, 40]
      }],

      consultasMedicoOptions: {
        chart: { id: 'consultas-medico', toolbar: { show: false } },
        title: { text: 'Consultas por Médico' },
        xaxis: { categories: ['Dr. Martínez', 'Dra. González', 'Dr. Rodríguez', 'Dra. Pérez', 'Dr. Rodrísguez', 'Dra. sPérez'] },
      },
      consultasMedicoSeries: [{
        name: 'Consultas Atendidas',
        data: [180, 220, 150, 70, 12, 210]
      }],

      diagnosticosOptions: {
        chart: { id: 'top-diagnosticos', type: 'bar', toolbar: { show: false } },
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
    };
  },

  // === MÉTODOS PARA MANEJO DE FILTROS ===
  methods: {

    AllEncargados() {
      this.$apollo
        .query({
          query: ADMIN_ALL_CDIS_QUERY,
          fetchPolicy: "network-only",
        })
        .then((response) => {
          const cdis = response.data.todosCdis || [];
          // llenando registro para el row de la tabla
          if(!cdis.length) {
            this.rows = [];
            return;
          }
          this.rows = cdis.map(cdi => ({
            name: cdi.nombre,
            id: cdi.id_cdi,
            numero_cdi: cdi.numero_cdi,
            encargado: cdi.encargado,
            cuadrante: cdi.cuadrante,
          }));
        })
        .catch((err) => {
          this.$q.notify({
            message: err.message.split('Ha ocurrido un error consultando todos los CDIs'),
            color: "negative",
          });
        });
    },

    onReport(typeId) {
      if (typeId === 'stat-pacientes-registrados') {
        this.onReportTotalPacientes();
      } else if (typeId === 'stat-pacientes-nuevos') {
        this.onReportPacientesNuevos();
      } else if (typeId === 'stat-consultas-mes') {
        this.onReportConsultas();
      } else if (typeId === 'dist-genero') {
        this.onReportDistribucionGenero();
      } else if (typeId === 'dist-edad') {
        this.onReportDistribucionEdad();
      } else if (typeId === 'consultas-periodo') {
        this.onReportConsultasPeriodo();
      } else if (typeId === 'consultas-medico') {
        this.onReportConsultasMedico();
      } else if (typeId === 'top-diagnosticos') {
        this.onReportTopDiagnosticos();
      } else {
        console.log('Tipo de reporte desconocido');
      }
    },

    onReportTotalPacientes() {
      console.log({
        reporte: 'Pacientes Registrados',
        id_cdi: this.userId,
        totalPacientes: this.totalPacientes
      });
    },
    onReportPacientesNuevos() {
      const datos = Array.isArray(this.totalPacientesNuevos)
        ? this.totalPacientesNuevos
        : [this.totalPacientesNuevos || 0];
      const categorias = this.selectedPeriod === 'week'
        ? ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7']
        : ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
      this.reportePacienteNuevosPeriodoVar = {
        reporte: this.selectedPeriod === 'week' ? 'Pacientes Nuevos (Semana)' : 'Pacientes Nuevos (Mes)',
        id_cdi: this.userId,
        periodo: this.selectedPeriod,
        mes: this.selectedPeriod === 'month' ? this.selectedMonth : undefined,
        categorias,
        datos,
        total: datos.reduce((a, b) => a + b, 0)
      }
      console.log(this.reportePacienteNuevosPeriodoVar);
      this.$refs.html2PdfPacientePorPeriodo.generatePdf();
    },
    onReportConsultas() {
      const datos = Array.isArray(this.totalConsultas)
        ? this.totalConsultas
        : [this.totalConsultas || 0];
      const categorias = this.selectedPeriod === 'week'
        ? ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7']
        : ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
      this.reporteConsultasDelMes = {
        reporte: this.selectedPeriod === 'week' ? 'Consultas de la Semana' : 'Consultas del Mes',
        id_cdi: this.userId,
        periodo: this.selectedPeriod,
        mes: this.selectedPeriod === 'month' ? this.selectedMonth : undefined,
        categorias,
        datos,
        total: datos.reduce((a, b) => a + b, 0)
      }
      this.$refs.html2PdfConsultaMes.generatePdf();
    },
    onReportDistribucionGenero() {
      const masculino = typeof this.pacientesPorGenero === 'object' && this.pacientesPorGenero !== null && !Array.isArray(this.pacientesPorGenero)
        ? (this.pacientesPorGenero.masculino || 0)
        : (Array.isArray(this.pacientesPorGenero) ? (this.pacientesPorGenero[0] || 0) : 0);
      const femenino = typeof this.pacientesPorGenero === 'object' && this.pacientesPorGenero !== null && !Array.isArray(this.pacientesPorGenero)
        ? (this.pacientesPorGenero.femenino || 0)
        : (Array.isArray(this.pacientesPorGenero) ? (this.pacientesPorGenero[1] || 0) : 0);
      this.reporteDistGenero = {
        reporte: 'Distribución por Género',
        id_cdi: this.userId,
        etiquetas: ['Masculino', 'Femenino'],
        datos: [masculino, femenino]
      };
      this.$refs.html2PdfDistGenero.generatePdf();
    },
    onReportDistribucionEdad() {
      const categorias = (this.barChartOptions && this.barChartOptions.xaxis && this.barChartOptions.xaxis.categories)
        ? this.barChartOptions.xaxis.categories
        : ['Niños (0-12)', 'Adolescentes (13-18)', 'Adultos (19-64)', 'Mayores (65+)'];
      const datos = Array.isArray(this.distribucionPorEdad)
        ? this.distribucionPorEdad
        : [0, 0, 0, 0];
      this.reporteDistEdad = {
        reporte: 'Distribución por Edad',
        id_cdi: this.userId,
        categorias,
        datos
      };
      this.$refs.html2PdfDistEdad.generatePdf();
    },
    onReportConsultasPeriodo() {
      const categorias = (this.consultasPeriodoOptions && this.consultasPeriodoOptions.xaxis && this.consultasPeriodoOptions.xaxis.categories)
        ? this.consultasPeriodoOptions.xaxis.categories
        : (this.selectedPeriod === 'week'
          ? ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7']
          : ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4']);
      const datos = Array.isArray(this.totalConsultas)
        ? this.totalConsultas
        : [this.totalConsultas || 0];
      this.reporteConsultasPeriodo = {
        reporte: 'Consultas por Período',
        id_cdi: this.userId,
        periodo: this.selectedPeriod,
        mes: this.selectedPeriod === 'month' ? this.selectedMonth : undefined,
        categorias,
        datos,
        total: datos.reduce((a, b) => a + b, 0)
      };
      this.$refs.html2PdfConsultasPeriodo.generatePdf();
    },
    onReportConsultasMedico() {
      const categorias = this.totalConsultasMedico && this.totalConsultasMedico.nombresDoctores
        ? this.totalConsultasMedico.nombresDoctores
        : [];
      const datos = this.totalConsultasMedico && this.totalConsultasMedico.consultasMedico
        ? this.totalConsultasMedico.consultasMedico
        : [];
      this.reporteConsultasPorMedicoPorPeriodo = {
        reporte: 'Consultas por Médico',
        id_cdi: this.userId,
        periodo: this.selectedPeriod,
        mes: this.selectedPeriod === 'month' ? this.selectedMonth : undefined,
        medicos: categorias,
        consultas: datos
      };
      this.$refs.html2PdfConsultasPorMedicoPeriodo.generatePdf();
    },
    onReportTopDiagnosticos() {
      const condiciones = this.totalDiagnosticos && this.totalDiagnosticos.condiciones
        ? this.totalDiagnosticos.condiciones
        : [];
      const totales = this.totalDiagnosticos && this.totalDiagnosticos.totales
        ? this.totalDiagnosticos.totales
        : [];
      this.reporteTopDiagnosticos = {
        reporte: 'Top 10 Diagnósticos Más Frecuentes',
        id_cdi: this.userId,
        condiciones,
        totales
      };
      this.$refs.html2PdfTopDiagnosticos.generatePdf();
    },

    onPeriodChange(newPeriod) {
      this.selectedPeriod = newPeriod;
      // Actualizar automáticamente cuando cambia el período
      this.updateChartData();
    },

    onMonthChange(newMonth) {
      this.selectedMonth = newMonth;
      if (this.selectedPeriod === 'month') {
        this.updateChartData();
      }
    },


    async updateChartData() {
      this.isLoading = true;

      try {
        await this.simulateApiCall();
        this.updateStatsCards();

      } catch (error) {
        console.error('Error al actualizar datos:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async simulateApiCall() {
      await this.fetchTotalPacientes();
      await this.fetchPacientesNuevos();
      await this.fetchDistribucionPorGenero();
      await this.fetchDistribucionPorEdad();
      await this.fetchConsultasPorPeriodo();
      await this.fetchConsultasPorDoctor();
      await this.fetchTopDiagnosticos();
    },


    getDataForPeriod(period) {
      let periodData;

      switch (period) {
        case 'week':
          periodData = {
            type: 'weekly',
            data: {
              consultas: this.consultasData.length > 0 ? this.consultasData : this.originalData.weekly.consultas,
              pacientes: this.originalData.weekly.pacientes,
              pacientesNuevos: this.pacientesNuevosData.length > 0 ? this.pacientesNuevosData : this.originalData.weekly.pacientesNuevos,
              consultasMedico: this.originalData.weekly.consultasMedico,
              diagnosticos: this.originalData.weekly.diagnosticos
            },
            categories: this.generateWeekCategories(),
            title: 'Esta Semana'
          };
          break;

        case 'month':
        default:
          periodData = {
            type: 'monthly',
            data: {
              consultas: this.consultasData.length > 0 ? this.consultasData : this.originalData.monthly.consultas,
              pacientes: this.originalData.monthly.pacientes,
              pacientesNuevos: this.pacientesNuevosData.length > 0 ? this.pacientesNuevosData : this.originalData.monthly.pacientesNuevos,
              consultasMedico: this.originalData.monthly.consultasMedico,
              diagnosticos: this.originalData.monthly.diagnosticos
            },
            categories: this.generateMonthCategories(),
            title: 'Este Mes'
          };
          break;
      }

      return periodData;
    },

    updateMainCharts(periodData) {


      this.consultasPeriodoOptions = {
        ...this.consultasPeriodoOptions,
        title: { text: `Consultas - ${periodData.title}` },
        xaxis: { categories: periodData.categories }
      };

      // === 2. ACTUALIZAR GRÁFICO DE CONSULTAS POR MÉDICO ===
      this.consultasMedicoSeries = [{
        name: 'Consultas Atendidas',
        data: periodData.data.consultasMedico
      }];

      this.consultasMedicoOptions = {
        ...this.consultasMedicoOptions,
        title: { text: `Consultas por Médico - ${periodData.title}` }
      };

      // === 3. ACTUALIZAR GRÁFICO DE TOP DIAGNÓSTICOS ===
      this.diagnosticosSeries = [{
        name: 'Nro. de Casos',
        data: periodData.data.diagnosticos
      }];

      this.diagnosticosOptions = {
        ...this.diagnosticosOptions,
        title: { text: `Top 10 Diagnósticos Más Frecuentes - ${periodData.title}` }
      };

    },


    async updateStatsCards() {


      this.stats[0].value = this.totalPacientes.toString();
      this.stats[0].series = [{
        name: 'Pacientes', data: this.selectedPeriod === 'week' ?
          [this.totalPacientes, this.totalPacientes] : [this.totalPacientes, this.totalPacientes]
      }];

      this.stats[1].label = this.selectedPeriod === 'week' ? 'Pacientes Nuevos (Semana)' : 'Pacientes Nuevos (Mes)';
      this.stats[1].value = this.totalPacientesNuevos.reduce((a, b) => a + b, 0).toString();
      this.stats[1].series = [{ name: 'Nuevos', data: this.totalPacientesNuevos }];

      this.stats[2].label = this.selectedPeriod === 'week' ? 'Consultas de la semana' : `Consultas del mes`;
      this.stats[2].value = this.totalConsultas.reduce((a, b) => a + b, 0).toString();

      this.stats[2].series = [{ name: 'Consultas', data: this.totalConsultas }];


      // DISTRIBUCION POR GENERO
      this.donutChartSeries = [this.pacientesPorGenero.masculino || 0, this.pacientesPorGenero.femenino || 0];

      // DISTRIBUCION POR EDAD
      this.barChartSeries = [{
        name: 'Cantidad de Pacientes',
        data: this.distribucionPorEdad
      }];

      // GRÁFICO DE CONSULTAS POR PERÍODO

      this.consultasPeriodoOptions = {
        ...this.consultasPeriodoOptions,
        xaxis: { categories: this.selectedPeriod === 'week' ? ['dia 1', 'dia 2', 'dia 3', 'dia 4', 'dia 5', 'dia 6', 'dia 7'] : ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'] }
      }

      this.consultasPeriodoSeries = [{
        name: 'Nro. Consultas',
        data: this.totalConsultas
      }];

      // GRÁFICO DE CONSULTAS POR MEDICO
      this.consultasMedicoOptions = {
        ...this.consultasMedicoOptions,
        xaxis: { categories: this.totalConsultasMedico.nombresDoctores }
      }

      this.consultasMedicoSeries = [{
        name: 'Consultas Atendidas',
        data: this.totalConsultasMedico.consultasMedico
      }];

      // GRÁFICO DE TOP DIAGNOSTICOS
      this.diagnosticosOptions = {
        ...this.diagnosticosOptions,
        xaxis: { categories: this.totalDiagnosticos.condiciones }
      }

      this.diagnosticosSeries = [{
        name: 'Nro. de Casos',
        data: this.totalDiagnosticos.totales
      }];



    },


    generateWeekCategories() {
      const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
      return days;
    },

    generateMonthCategories() {
      return ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'];
    },

    getCurrentPeriodLabel() {
      const option = this.periodOptions.find(opt => opt.value === this.selectedPeriod);
      if (this.selectedPeriod === 'month') {
        const m = this.monthOptions.find(m => m.value === this.selectedMonth);
        return `${option ? option.label : 'Mes'}${m ? `: ${m.label}` : ''}`;
      }
      return option ? option.label : 'Período Desconocido';
    },

    fetchTotalPacientes() {
      return this.$apollo
        .query({
          query: ESTADISTICA_PACIENTES_TOTALES_QUERY,
          variables: { id_cdi: this.userId },
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.totalPacientes = response.data.cantidadPacienteTotales || 0;
          return response;
        })
        .catch((err) => {
          console.error("Error fetching total pacientes:", err);
          this.totalPacientes = 0;
        });
    },


    fetchPacientesNuevos() {
      const variables = {
        id_cdi: this.userId,
        periodo: this.selectedPeriod
      };
      if (this.selectedPeriod === 'month') variables.mes = this.selectedMonth;

      return this.$apollo
        .query({
          query: ESTADISTICA_PACIENTES_NUEVOS_QUERY,
          variables,
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.totalPacientesNuevos = response.data.cantidadPacientesNuevos || 0;
        })
        .catch((err) => {
          console.error("Error fetching pacientes nuevos:", err);
          this.totalPacientesNuevos = 0;
        });
    },


    fetchDistribucionPorGenero() {
      return this.$apollo
        .query({
          query: ESTADISTICA_PACIENTES_POR_GENERO_QUERY,
          variables: { id_cdi: this.userId },
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.pacientesPorGenero = response.data.distribucionPorGenero;
        })
        .catch((err) => {
          console.error("Error fetching distribución por género:", err);

        });
    },

    fetchDistribucionPorEdad() {
      return this.$apollo
        .query({
          query: ESTADISTICA_PACIENTES_POR_EDAD_QUERY,
          variables: { id_cdi: this.userId },
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.distribucionPorEdad = response.data.distribucionPorEdad;
        })
        .catch((err) => {
          console.error("Error fetching distribución por edad:", err);
        });
    },


    fetchConsultasPorPeriodo() {
      const variables = {
        id_cdi: this.userId,
        periodo: this.selectedPeriod
      };
      if (this.selectedPeriod === 'month') variables.mes = this.selectedMonth;

      return this.$apollo
        .query({
          query: ESTADISTICA_CONSULTAS_POR_PERIODO_QUERY,
          variables,
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.totalConsultas = response.data.totalConsultasRealizadasPeriodo
        })
        .catch((err) => {
          console.error("Error fetching consultas por período:", err);
        });
    },


    fetchConsultasPorDoctor() {
      const variables = {
        id_cdi: this.userId,
        periodo: this.selectedPeriod
      };
      if (this.selectedPeriod === 'month') variables.mes = this.selectedMonth;

      return this.$apollo
        .query({
          query: ESTADISTICA_CONSULTAS_POR_DOCTOR_QUERY,
          variables,
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.totalConsultasMedico = response.data.totalConsultasRealizadasPorMedico;
        })
        .catch((err) => {
          console.error("Error fetching consultas por doctor:", err);
        });
    },


    fetchTopDiagnosticos() {
      const variables = {
        id_cdi: this.userId,
        periodo: this.selectedPeriod
      };
      if (this.selectedPeriod === 'month') variables.mes = this.selectedMonth;

      return this.$apollo
        .query({
          query: ESTADISTICA_TOP_TEN_DIAGNOSTICOS_QUERY,
          variables,
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.totalDiagnosticos = response.data.top10DiagnosticosMasComunes;
        })
        .catch((err) => {
          console.error("Error fetching top diagnósticos:", err);
        });
    },

    showStats(cdiId = null) {
      if (this.$store.state.user.role === 'admin') {
        this.AllEncargados();
        this.userId = cdiId;
        if(cdiId) {
          this.showStatsPanel = true;
          this.updateChartData();
        }
      } 
      else {
        this.showStatsPanel = true;
        this.userId = this.$store.state.user.cdi_id;
        this.updateChartData();
        
      }
    },

    backToListCdi() {
      this.showStatsPanel = false;
      this.userId = null;
    },
  },
  watch: {
    // Observador para actualizar datos cuando cambian los filtros
    selectedPeriod() {
      this.updateChartData();
    },
    selectedMonth() {
      if (this.selectedPeriod === 'month') {
        this.updateChartData();
      }
    }
  },
  mounted() {
    this.showStats();
  }
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
