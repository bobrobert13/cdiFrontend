<template>
  <div class="pdf-container">
    <img src="../../../../../assets/membrete.png" class="full-width q-mb-sm" style="max-height: 80px; object-fit: contain;" />

    <!-- Título del documento -->
    <div class="text-center q-mb-md">
      <h6 class="text-primary no-padding no-margin q-mb-none">REPORTE DE ESTADISTICA</h6>
      <p class="text-grey-6 no-padding q-mt-sm">Total de pacientes nuevos en el mes</p>
    </div>

    <!-- RESUMEN PRINCIPAL -->
    <div class="info-section" v-if="data">
      <div class="section-title">Resumen del Reporte</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Reporte:</span>
          <span class="value">{{ data.reporte || 'Consultas del Mes' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Mes:</span>
          <span class="value">{{ nombreMes(data.mes) }}</span>
        </div>
        <div class="info-item">
          <span class="label">Periodo:</span>
          <span class="value">{{ etiquetaPeriodo(data.periodo) }}</span>
        </div>
        <div class="info-item">
          <span class="label">ID CDI:</span>
          <span class="value">{{ data.id_cdi || 'N/D' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Total Pacientes Nuevos:</span>
          <span class="value text-primary" style="font-weight: bold;">{{ data.total || 0 }}</span>
        </div>
      </div>
    </div>

    <!-- DISTRIBUCIÓN POR SEMANA -->
    <div class="info-section" v-if="filasSemanas.length">
      <div class="section-title">Distribución Semanal de Pacientes Nuevos</div>
      <div class="compact-table">
        <div class="table-header semanal">
          <div class="header-cell">Semana</div>
          <div class="header-cell">Pacientes</div>
          <div class="header-cell">% del Total</div>
          <div class="header-cell">Indicador</div>
        </div>
        <div v-for="(fila, i) in filasSemanas" :key="i" class="table-row semanal">
          <div class="table-cell">{{ fila.semana }}</div>
          <div class="table-cell">{{ fila.pacientes }}</div>
          <div class="table-cell">{{ fila.porcentaje.toFixed(1) }}%</div>
          <div class="table-cell">
            <div class="bar-container">
              <div class="bar" :style="{ width: fila.porcentaje + '%' }"></div>
            </div>
          </div>
        </div>
        <div class="table-row semanal" v-if="data && filasSemanas.length">
          <div class="table-cell" style="font-weight:bold;">TOTAL</div>
          <div class="table-cell" style="font-weight:bold;">{{ data.total || 0 }}</div>
          <div class="table-cell" style="font-weight:bold;">{{ (data.total || 0) > 0 ? '100%' : '0%' }}</div>
          <div class="table-cell"></div>
        </div>
      </div>
    </div>
    <div class="info-section" v-else>
      <div class="section-title">Distribución Semanal de Pacientes Nuevos</div>
      <p class="text-grey-6" style="padding:4px 8px; background:#f5f5f5; border-radius:3px;">No hay datos para el periodo seleccionado.</p>
    </div>

    <!-- Pie de página -->
    <div class="text-center q-pa-sm q-mt-md">
      <p class="text-grey-6 q-mb-none">
        Documento generado el {{ fechaActual() }} - Sistema CDI
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/es'

export default {
  name: "reporteTotalPacientes",
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    console.log('reporteTotalPacientes:', this.data);
    moment.locale('es')
  },
  computed: {
    filasSemanas() {
      if (!this.data || !Array.isArray(this.data.categorias) || !Array.isArray(this.data.datos)) return [];
      const total = this.data.total || 0;
      return this.data.categorias.map((semana, idx) => {
        const valor = Number(this.data.datos[idx]) || 0;
        const porcentaje = total > 0 ? (valor / total) * 100 : 0;
        return { semana, pacientes: valor, porcentaje };
      });
    }
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
    },
    nombreMes(numero) {
      if (!numero && numero !== 0) return 'N/D';
      return moment().month(numero - 1).format('MMMM').toUpperCase();
    },
    etiquetaPeriodo(periodo) {
      const map = { month: 'Mensual', week: 'Semanal', day: 'Diario' };
      return map[periodo] || periodo;
    }
  }
}
</script>

<style lang="scss" scoped>
.pdf-container {
  padding: 10px;
  font-family: Arial, sans-serif;
  font-size: 10px;
  line-height: 1.2;
  max-width: 210mm; /* A4 width */
  margin: 0 auto;
}

.info-section {
  margin-bottom: 15px;
  page-break-inside: avoid;
}

.section-title {
  background-color: #1976d2;
  color: white;
  padding: 4px 8px;
  font-weight: bold;
  font-size: 11px;
  margin-bottom: 5px;
  border-radius: 3px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3px;
  margin-bottom: 5px;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background-color: #f5f5f5;
  border-radius: 2px;
}

.label {
  font-weight: bold;
  margin-right: 5px;
  min-width: 80px;
  color: #333;
}

.value {
  color: #666;
  word-break: break-word;
}

.compact-table {
  border: 1px solid #ddd;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 5px;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background-color: #1976d2;
  font-weight: bold;
  font-size: 9px;
}

.table-header.semanal {
  grid-template-columns: 1fr 0.7fr 0.7fr 2fr;
}

.header-cell {
  padding: 3px 4px;
  border-right: 1px solid #ddd;
  text-align: center;
  color: white;
}

.header-cell:last-child {
  border-right: none;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  border-top: 1px solid #ddd;
  font-size: 9px;
}

.table-row.semanal {
  grid-template-columns: 1fr 0.7fr 0.7fr 2fr;
}

.table-row:nth-child(even) {
  background-color: #f9f9f9;
}

.table-cell {
  padding: 3px 4px;
  border-right: 1px solid #ddd;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table-cell:last-child {
  border-right: none;
}

.bar-container {
  background: #e0e0e0;
  height: 6px;
  border-radius: 4px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: #1976d2;
}

/* Responsive adjustments for printing */
@media print {
  .pdf-container {
    padding: 5px;
    font-size: 9px;
  }

  .info-section {
    margin-bottom: 10px;
  }

  .section-title {
    font-size: 10px;
    padding: 3px 6px;
  }

  .info-grid {
    gap: 2px;
  }

  .info-item {
    padding: 1px 3px;
  }

  .table-header,
  .table-row {
    font-size: 8px;
  }

  .header-cell,
  .table-cell {
    padding: 2px 3px;
  }
}
</style>
