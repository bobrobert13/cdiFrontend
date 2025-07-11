<template>
  <div class="pdf-container">
    <img src="../../../assets/membrete.png" class="full-width q-mb-sm" style="max-height: 80px; object-fit: contain;" />
    
    <!-- Título del documento -->
    <div class="text-center q-mb-md">
      <h6 class="text-primary no-padding no-margin q-mb-none">CDIs DEL SISTEMA</h6>
      <p class="text-grey-6 no-padding q-mt-sm">Listado de Centros de Diagnóstico Integral</p>
    </div>

    <!-- LISTADO DE CDIs -->
    <div class="info-section">
      <div class="section-title">CDIs REGISTRADOS ({{ data.length }})</div>
      <div class="compact-table">
        <div class="table-header">
          <div class="header-cell">Número CDI</div>
          <div class="header-cell">Nombre</div>
          <div class="header-cell">Encargado</div>
          <div class="header-cell">Cuadrante</div>
          <div class="header-cell">Estado</div>
        </div>
        <div v-for="(cdi, index) in data" :key="index" class="table-row">
          <div class="table-cell">{{ cdi.numero_cdi }}</div>
          <div class="table-cell">{{ cdi.nombre }}</div>
          <div class="table-cell">{{ cdi.encargado }}</div>
          <div class="table-cell">{{ cdi.cuadrante }}</div>
          <div class="table-cell">{{ cdi.estado }}</div>
        </div>
      </div>
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
