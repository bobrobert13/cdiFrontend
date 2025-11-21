<template>
  <div class="pdf-container">
    <img src="../../../../../assets/membrete.png" class="full-width q-mb-sm" style="max-height: 80px; object-fit: contain;" />

    <!-- Título del documento -->
    <div class="text-center q-mb-md">
      <h6 class="text-primary no-padding no-margin q-mb-none">REPORTE DE ESTADISTICA</h6>
      <p class="text-grey-6 no-padding q-mt-sm">Distribución por género</p>
    </div>

    <!-- RESUMEN PRINCIPAL -->
    <div class="info-section" v-if="data">
      <div class="section-title">Resumen del Reporte</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Reporte:</span>
          <span class="value">{{ data.reporte || 'Distribución por Género' }}</span>
        </div>
        <div class="info-item">
          <span class="label">ID CDI:</span>
          <span class="value">{{ data.id_cdi || 'N/D' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Total Pacientes:</span>
          <span class="value text-primary" style="font-weight: bold;">{{ totalPacientes }}</span>
        </div>
        <div class="info-item" v-if="filasGenero.length">
          <span class="label">Género Mayor:</span>
          <span class="value">{{ generoMayor.nombre }} ({{ generoMayor.cantidad }})</span>
        </div>
        <div class="info-item" v-if="filasGenero.length">
          <span class="label">Promedio por Género:</span>
          <span class="value">{{ promedioGenero.toFixed(1) }}</span>
        </div>
      </div>
    </div>

    <!-- DISTRIBUCIÓN POR GÉNERO -->
    <div class="info-section" v-if="filasGenero.length">
      <div class="section-title">Distribución por Género</div>
      <div class="compact-table">
        <div class="table-header semanal">
          <div class="header-cell">Género</div>
          <div class="header-cell">Pacientes</div>
          <div class="header-cell">% del Total</div>
          <div class="header-cell">Indicador</div>
        </div>
        <div v-for="(fila, i) in filasGenero" :key="i" class="table-row semanal">
          <div class="table-cell">{{ fila.nombre }}</div>
          <div class="table-cell">{{ fila.cantidad }}</div>
          <div class="table-cell">{{ fila.porcentaje.toFixed(1) }}%</div>
          <div class="table-cell">
            <div class="bar-container">
              <div class="bar" :style="{ width: fila.porcentaje + '%' }"></div>
            </div>
          </div>
        </div>
        <div class="table-row semanal" v-if="data && filasGenero.length">
          <div class="table-cell" style="font-weight:bold;">TOTAL</div>
          <div class="table-cell" style="font-weight:bold;">{{ totalPacientes }}</div>
          <div class="table-cell" style="font-weight:bold;">{{ totalPacientes > 0 ? '100%' : '0%' }}</div>
          <div class="table-cell"></div>
        </div>
      </div>
    </div>
    <div class="info-section" v-else>
      <div class="section-title">Distribución por Género</div>
      <p class="text-grey-6" style="padding:4px 8px; background:#f5f5f5; border-radius:3px;">No hay datos de distribución por género.</p>
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
  name: "reporteDistGenero",
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    console.log('reporteConsultasPorMedicoPeriodo:', this.data);
    moment.locale('es')
  },
  computed: {
    totalPacientes() {
      if (!this.data || !Array.isArray(this.data.datos)) return 0;
      return this.data.datos.reduce((a, b) => a + Number(b || 0), 0);
    },
    filasGenero() {
      if (!this.data || !Array.isArray(this.data.datos) || !Array.isArray(this.data.etiquetas)) return [];
      const total = this.totalPacientes;
      return this.data.etiquetas.map((nombre, idx) => {
        const valor = Number(this.data.datos[idx]) || 0;
        const porcentaje = total > 0 ? (valor / total) * 100 : 0;
        return { nombre, cantidad: valor, porcentaje };
      });
    },
    generoMayor() {
      if (!this.filasGenero.length) return { nombre: 'N/D', cantidad: 0 };
      return this.filasGenero.reduce((max, cur) => cur.cantidad > max.cantidad ? cur : max);
    },
    promedioGenero() {
      if (!this.filasGenero.length) return 0;
      return this.totalPacientes / this.filasGenero.length;
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
    nombreMes() { return 'N/D'; }
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
