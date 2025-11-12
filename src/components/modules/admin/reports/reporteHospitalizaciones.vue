<template>
  <div class="pdf-container">
    <img src="../../../../assets/membrete.png" class="full-width q-mb-sm" style="max-height: 80px; object-fit: contain;" />

    <!-- INFORMACIÓN PERSONAL COMPACTA -->
    <div  class="info-section">
      <div class="section-title">INFORMACIÓN PERSONAL</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Nacionalidad:</span>
          <span v-if="data.persona" class="value">{{ data.persona.nacionalidad }}</span>
        </div>
        <div class="info-item">
          <span class="label">Cédula:</span>
          <span v-if="data.persona" class="value">{{ data.persona.cedula_identidad }}</span>
        </div>
        <div class="info-item">
          <span class="label">Edad:</span>
          <span v-if="data.persona" class="value">{{ data.persona.edad }}</span>
        </div>
        <div class="info-item">
          <span class="label">Estado Civil:</span>
          <span v-if="data.persona" class="value">{{ data.persona.estado_civil }}</span>
        </div>
        <div class="info-item">
          <span class="label">Sexo:</span>
          <span v-if="data.persona" class="value">{{ data.persona.sexo }}</span>
        </div>
        <div class="info-item">
          <span class="label">Fecha Registro:</span>
          <span v-if="data.persona || data.createdAt" class="value">{{ entradaFecha(data.createdAt) }}</span>
        </div>
      </div>
    </div>

    <!-- INFORMACIÓN DE CONTACTO -->
    <div v-if="data.persona" class="info-section">
      <div class="section-title">CONTACTO</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Teléfono:</span>
          <span class="value">{{ data.persona.telefono.codigo || 'No especificado' }} {{ data.persona.telefono.numero || 'No especificado' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Correo:</span>
          <span  class="value">{{ data.persona.correo.correo || 'No especificado' }}</span>
        </div>
      </div>
    </div>

        <!-- INFORMACIÓN DE CDI -->
    <div v-if="data.cdi" class="info-section">
      <div class="section-title">CDI</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Nombre de CDI:</span>
          <span class="value">{{ data.cdi.nombre }}</span>
        </div>
        <div class="info-item">
          <span class="label">Encargado:</span>
          <span class="value">{{ data.cdi.encargado }}</span>
        </div>
        <div class="info-item">
          <span class="label">Cuadrante:</span>
          <span class="value">{{ data.cdi.cuadrante }}</span>
        </div>
      </div>
    </div>

    <!-- INFORMACIÓN DE UBICACIÓN -->
    <div v-if="data.persona" class="info-section">
      <div class="section-title">DIRECCIÓN</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Código Postal:</span>
          <span class="value">{{ data.persona.direccion.codigo_postal }}</span>
        </div>
        <div class="info-item">
          <span class="label">Parroquia:</span>
          <span class="value">{{ data.persona.direccion.parroquia }}</span>
        </div>
        <div class="info-item">
          <span class="label">Calle:</span>
          <span class="value">{{ data.persona.direccion.calle }}</span>
        </div>
        <div class="info-item">
          <span class="label">Sector:</span>
          <span class="value">{{ data.persona.direccion.sector }}</span>
        </div>
        <div class="info-item">
          <span class="label">Casa N°:</span>
          <span class="value">{{ data.persona.direccion.numero_casa }}</span>
        </div>
      </div>
    </div>

    <!-- DOCTOR REGISTRADOR -->
    <div v-if="data.doctor" class="info-section">
      <div class="section-title">DOCTOR REGISTRADOR</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Carnet:</span>
          <span class="value">{{ data.doctor.numero_carnet }}</span>
        </div>
        <div class="info-item">
          <span class="label">Nombre:</span>
          <span class="value">{{ data.doctor.persona.nombre1 }}</span>
        </div>
        <div class="info-item">
          <span class="label">Área:</span>
          <span class="value">{{ data.doctor.area_de_trabajo }}</span>
        </div>
      </div>
    </div>

  <!-- HOSPITALIZACIONES -->
  <div v-if="data.hospitalizaciones && data.hospitalizaciones.length > 0" class="info-section">
      <div class="section-title">HOSPITALIZACIONES ({{ data.hospitalizaciones.length }})</div>

      <div class="compact-table">
        <div class="table-header" style="grid-template-columns: repeat(5, 1fr);">
          <div class="header-cell">Motivo</div>
          <div class="header-cell">Unidad</div>
          <div class="header-cell">Estado</div>
          <div class="header-cell">Ingreso</div>
          <div class="header-cell">Egreso</div>
        </div>

        <div v-for="(h, idx) in data.hospitalizaciones" :key="h.id_hospitalizacion || idx">
          <div class="table-row" style="grid-template-columns: repeat(5, 1fr);">
            <div class="table-cell" :title="h.motivo_de_hospitalizacion || 'No especificado'">{{ h.motivo_de_hospitalizacion || 'No especificado' }}</div>
            <div class="table-cell" :title="h.unidad_hospitalaria || 'No especificado'">{{ h.unidad_hospitalaria || 'No especificado' }}</div>
            <div class="table-cell" :title="h.estado || 'No especificado'">{{ h.estado || 'No especificado' }}</div>
            <div class="table-cell">{{ h.fecha_ingreso ? entradaFecha(h.fecha_ingreso) : '-' }}</div>
            <div class="table-cell">{{ h.fecha_egreso ? salidaFecha(h.fecha_egreso) : '-' }}</div>
          </div>

          <div class="table-row" style="grid-template-columns: 1fr;">
            <div class="table-cell">
              <strong>Notas médicas:</strong>
              <div :title="h.notas_medicas || 'No especificado'">{{ shortText(h.notas_medicas || '', 200) || 'No especificado' }}</div>
            </div>
          </div>

          <div class="table-row" style="grid-template-columns: repeat(2, 1fr);">
            <div class="table-cell">
              <strong>Creado:</strong>
              <div>{{ h.createdAt ? entradaFecha(h.createdAt) : '-' }}</div>
            </div>
            <div class="table-cell">
              <strong>Actualizado:</strong>
              <div>{{ h.updatedAt ? entradaFecha(h.updatedAt) : '-' }}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div v-else class="info-section">
      <div class="section-title">HOSPITALIZACIONES</div>
      <div class="no-data">El paciente no posee hospitalizaciones registradas</div>
    </div>







    </div>

</template>

<script>
import moment from 'moment'
export default {
  name: "historiaPdf",
  components: {},
  props: ["data"],
	mounted() {
		console.log('Data recibida en historiaPdf:', this.data);
	},
  methods: {
    salidaFecha(salida) {
      return moment(salida).format('DD-MM-YYYY')
    },
    entradaFecha(entrada) {
      return moment(entrada).format('DD-MM-YYYY')
    },
    shortText(text, max = 100) {
      if (!text) return ''
      const t = String(text).trim()
      if (t.length <= max) return t
      return t.slice(0, max - 1) + '…'
    },
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
	grid-template-columns: repeat(5, 0.5fr);
	background-color: #e3f2fd;
	font-weight: bold;
	font-size: 9px;
}

.header-cell {
  padding: 3px 4px;
  border-right: 1px solid #ddd;
  text-align: center;
}

.header-cell:last-child {
  border-right: none;
}

.table-row {
  display: grid;
  grid-template-columns:repeat(5, 0.5fr);
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

.no-data {
  padding: 6px 8px;
  color: #666;
  font-style: italic;
}
</style>
