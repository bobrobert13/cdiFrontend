<template>
  <div class="pdf-container">
    <img src="../../../assets/membrete.png" class="full-width q-mb-sm" style="max-height: 80px; object-fit: contain;" />
    
    <!-- Título del documento -->
    <div class="text-center q-mb-md">
      <h6 class="text-primary no-padding no-margin q-mb-none">DOCTOR</h6>
      <p class="text-grey-6 no-padding q-mt-sm">Información Personal y Profesional</p>
    </div>

    <!-- INFORMACIÓN PERSONAL -->
    <div class="info-section">
      <div class="section-title">DATOS PERSONALES</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Nombre:</span>
          <span class="value">{{ data.persona.nombre1 || 'No especificado' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Nacionalidad:</span>
          <span class="value">{{ data.persona.nacionalidad || 'No especificado' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Cédula:</span>
          <span class="value">{{ data.persona.cedula_identidad || 'No especificado' }}</span>
        </div>
        <div class="info-item" v-if="data.persona.telefono">
          <span class="label">Teléfono:</span>
          <span class="value">{{ data.persona.telefono.codigo || "+" }}{{ data.persona.telefono.numero || "No especificado" }}</span>
        </div>
        <div class="info-item" v-if="data.persona.correo">
          <span class="label">Correo:</span>
          <span class="value">{{ data.persona.correo.correo || 'No especificado' }}</span>
        </div>
      </div>
    </div>

    <!-- INFORMACIÓN DE DIRECCIÓN -->
    <div v-if="data.persona.direccion" class="info-section">
      <div class="section-title">DIRECCIÓN</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Código Postal:</span>
          <span class="value">{{ data.persona.direccion.codigo_postal || 'No especificado' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Parroquia:</span>
          <span class="value">{{ data.persona.direccion.parroquia || 'No especificado' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Sector:</span>
          <span class="value">{{ data.persona.direccion.sector || 'No especificado' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Calle:</span>
          <span class="value">{{ data.persona.direccion.calle || 'No especificado' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Casa N°:</span>
          <span class="value">{{ data.persona.direccion.numero_casa || 'No especificado' }}</span>
        </div>
      </div>
    </div>

    <!-- INFORMACIÓN PROFESIONAL -->
    <div class="info-section">
      <div class="section-title">INFORMACIÓN PROFESIONAL</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Número Carnet:</span>
          <span class="value">{{ data.numero_carnet || 'No especificado' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Años Experiencia:</span>
          <span class="value">{{ data.anos_experiencia || 'No especificado' }} años</span>
        </div>
        <div class="info-item">
          <span class="label">Área Trabajo:</span>
          <span class="value">{{ data.area_de_trabajo || 'No especificado' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Horario:</span>
          <span class="value">{{ data.horario || 'No especificado' }}</span>
        </div>
      </div>
    </div>

    <!-- PACIENTES DEL DOCTOR -->
    <div v-if="data.pacientes && data.pacientes.length > 0" class="info-section">
      <div class="section-title">PACIENTES ({{ data.pacientes.length }})</div>
      <div class="compact-table">
        <div class="table-header">
          <div class="header-cell">Nacionalidad</div>
          <div class="header-cell">Cédula</div>
          <div class="header-cell">Edad</div>
          <div class="header-cell">Estado Civil</div>
          <div class="header-cell">Sexo</div>
        </div>
        <div v-for="paciente in data.pacientes" :key="paciente.id_paciente" class="table-row">
          <div class="table-cell">{{ paciente.persona.nacionalidad }}</div>
          <div class="table-cell">{{ paciente.persona.cedula_identidad }}</div>
          <div class="table-cell">{{ paciente.persona.edad }}</div>
          <div class="table-cell">{{ paciente.persona.estado_civil }}</div>
          <div class="table-cell">{{ paciente.persona.sexo }}</div>
        </div>
      </div>
    </div>

    <!-- INFORMACIÓN DEL CDI -->
    <div v-if="data.usuarios && data.usuarios.cdi" class="info-section">
      <div class="section-title">CDI ASIGNADO</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Número CDI:</span>
          <span class="value">{{ data.usuarios.cdi.numero_cdi || 'No especificado' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Nombre:</span>
          <span class="value">{{ data.usuarios.cdi.nombre || 'No especificado' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Cuadrante:</span>
          <span class="value">{{ data.usuarios.cdi.cuadrante || 'No especificado' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Encargado:</span>
          <span class="value">{{ data.usuarios.cdi.encargado || 'No especificado' }}</span>
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
  name: "historiaPdfDr",
  components: {},
  props: ["data"],
  created() {
    console.log("dataProps", this.data);
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
