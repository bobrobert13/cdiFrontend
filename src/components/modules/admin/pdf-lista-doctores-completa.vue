<template>
  <div class="pdf-container">
    <img src="../../../assets/membrete.png" class="full-width q-mb-sm" style="max-height: 80px; object-fit: contain;" />

    <!-- Título del documento -->
    <div class="text-center q-mb-md">
      <h6 class="text-primary no-padding no-margin q-mb-none">DOCTORES</h6>
      <p class="text-grey-6 no-padding q-mt-sm">Información Personal y Profesional</p>
    </div>

    <!-- LISTADO DE DOCTORES separado en dos columnas: Activos / Inactivos -->
    <div class="info-section">
      <div class="section-title">DOCTORES REGISTRADOS ({{ totalCount }})</div>

      <div class="two-columns">
        <div  class="column">
          <div class="compact-table small">
            <div class="table-header">
              <div class="header-cell">Nombre</div>
              <div class="header-cell">Nacionalidad</div>
              <div class="header-cell">Cédula</div>
              <div class="header-cell">Teléfono</div>
              <div class="header-cell">Correo</div>
              <div class="header-cell">Estado</div>
            </div>
            <div v-for="(doctor, index) in doctores" :key="'act-'+index" class="table-row">
               <span class="value"  >{{ doctor.persona.nombre1 || 'No especificado' }}</span>
              <div class="table-cell">{{ doctor.persona.nacionalidad || 'No especificado' }}</div>
              <div class="table-cell">{{ doctor.persona.cedula_identidad || 'No especificado' }}</div>
              <div class="table-cell">{{ doctor.persona.telefono.codigo + ' ' + (doctor.persona.telefono.numero || 'No especificado') }}</div>
              <div class="table-cell">{{ doctor.persona.correo.correo || 'No especificado' }}</div>
                <div class="table-cell">{{ doctor.usuarios.estado || 'No especificado' }}</div>
            </div>
          </div>
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
  name: "historiaPdfListaDoctor",
  props: ["data"], // isActive: true para activos, false para inactivos
  created() {
    console.log('lista de doctores: ', this.data);
    
  },
  computed: {
    // total general
    doctores() {
      return Array.isArray(this.data) ? this.data : [];
    },
    totalCount() {
      return Array.isArray(this.data) ? this.data.length : 0;
    },
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
  max-width: 210mm;
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
  overflow-x: auto;
  margin-top: 5px;
  width: 100%;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: repeat(6, minmax(100px, 1fr));
  background-color: #1976d2;
  font-weight: bold;
  font-size: 9px;
  min-width: 600px;
}

.table-row {
  background-color: #fff;
  font-weight: normal;
  border-top: 1px solid #ddd;
  font-size: 9px;
}

.table-row:nth-child(even) {
  background-color: #f9f9f9;
}

.header-cell, .table-cell, .value {
  padding: 3px 4px;
  border-right: 1px solid #ddd;
  text-align: center;
  color: #333;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.header-cell {
  color: white;
  background-color: #1976d2;
}

.header-cell:last-child, .table-cell:last-child, .value:last-child {
  border-right: none;
}

/* Responsive: stack columns on small screens */
@media (max-width: 900px) {
  .pdf-container {
    font-size: 9px;
  }
  .table-header, .table-row {
    grid-template-columns: repeat(6, minmax(80px, 1fr));
    min-width: 480px;
  }
}

@media (max-width: 600px) {
  .pdf-container {
    font-size: 8px;
    padding: 2px;
  }
  .section-title {
    font-size: 9px;
    padding: 2px 4px;
  }
  .compact-table {
    margin-top: 2px;
  }
  .table-header, .table-row {
    grid-template-columns: 1fr;
    display: block;
    min-width: unset;
  }
  .table-header, .table-row {
    background-color: transparent;
  }
  .header-cell, .table-cell, .value {
    display: block;
    border-right: none;
    border-bottom: 1px solid #eee;
    text-align: left;
    white-space: normal;
    padding: 4px 2px;
  }
  .header-cell:last-child, .table-cell:last-child, .value:last-child {
    border-bottom: none;
  }
}

/* Two column layout for active/inactive lists */
.two-columns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.column {
  flex: 1 1 50%;
  min-width: 200px;
}
.sub-title {
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 10px;
}
.compact-table.small .table-header {
  font-size: 8px;
}
.compact-table.small .table-row {
  font-size: 8px;
}
.compact-table.small .table-cell {
  padding: 2px 4px;
}
</style>
