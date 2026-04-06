<template>
  <div class="pdf-container">
    <!-- Membrete / Encabezado -->
    <div class="header-logo">
      <img src="../../../assets/membrete.png" class="full-width" style="max-height: 80px; object-fit: contain;" />
    </div>

    <!-- Título del documento -->
    <div class="text-center q-mb-lg header-title">
      <h5 class="text-primary no-padding no-margin text-bold">LISTADO GENERAL DE DOCTORES</h5>
      <p class="text-grey-7 no-padding q-mt-xs">Control de Personal Médico y Profesional - CDI</p>
    </div>

    <!-- LISTADO DE DOCTORES -->
    <div class="info-section">
      <div class="section-title">
        <span>DOCTORES REGISTRADOS</span>
        <span class="count-badge">Total: {{ totalCount }}</span>
      </div>

      <div class="table-wrapper">
        <table class="styled-table">
          <thead>
            <tr>
              <th class="text-left" style="width: 25%;">Nombre y Apellido</th>
              <th style="width: 15%;">Nacionalidad</th>
              <th style="width: 15%;">Cédula</th>
              <th style="width: 15%;">Teléfono</th>
              <th style="width: 20%;">Correo Electrónico</th>
              <th style="width: 10%;">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(doctor, index) in doctores" :key="'dr-' + index">
              <td class="text-left text-bold text-primary">
                {{ (doctor.persona && doctor.persona.nombre1) || 'No especificado' }}
              </td>
              <td class="text-center">{{ (doctor.persona && doctor.persona.nacionalidad) || 'No especificado' }}</td>
              <td class="text-center">{{ (doctor.persona && doctor.persona.cedula_identidad) || 'No especificado' }}</td>
              <td class="text-center">
                {{ (doctor.persona && doctor.persona.telefono) ? (doctor.persona.telefono.codigo + ' ' + (doctor.persona.telefono.numero || '')) : 'N/A' }}
              </td>
              <td class="text-center text-lowercase">
                {{ (doctor.persona && doctor.persona.correo && doctor.persona.correo.correo) || 'No especificado' }}
              </td>
              <td class="text-center">
                <span :class="['status-chip', doctor.usuarios && doctor.usuarios.estado]">
                  {{ (doctor.usuarios && doctor.usuarios.estado) || 'N/A' }}
                </span>
              </td>
            </tr>
            <tr v-if="doctores.length === 0">
              <td colspan="6" class="text-center q-pa-md text-grey">
                No se encontraron doctores registrados.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pie de página -->
    <div class="pdf-footer">
      <div class="divider"></div>
      <p class="text-grey-6">
        Documento oficial generado por el Sistema CDI el {{ fechaActual() }}
      </p>
      <p class="text-grey-5 page-number">Página 1 de 1</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "historiaPdfListaDoctor",
  props: ["data"],
  computed: {
    doctores() {
      return Array.isArray(this.data) ? this.data : [];
    },
    totalCount() {
      return this.doctores.length;
    },
  },
  methods: {
    fechaActual() {
      return moment().format('DD/MM/YYYY hh:mm A')
    }
  }
}
</script>

<style lang="scss" scoped>
/* Configuraciones base para PDF */
.pdf-container {
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 11px;
  color: #333;
  background-color: white;
  min-height: 297mm; /* A4 height */
}

.header-logo {
  margin-bottom: 20px;
  text-align: center;
}

.header-title {
  border-bottom: 2px solid #1976d2;
  padding-bottom: 10px;
  margin-bottom: 20px;
  
  h5 {
    letter-spacing: 1px;
    font-size: 18px;
  }
}

.info-section {
  margin-bottom: 30px;
}

.section-title {
  background-color: #1976d2;
  color: white;
  padding: 8px 12px;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px 4px 0 0;
}

.count-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
}

/* Tabla Estilizada */
.table-wrapper {
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 0 0 4px 4px;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;

  thead tr {
    background-color: #f5f5f5;
    color: #555;
    text-align: center;
    font-weight: bold;
  }

  th {
    padding: 10px 8px;
    border-bottom: 2px solid #e0e0e0;
    font-size: 10px;
    text-transform: uppercase;
  }

  td {
    padding: 8px;
    border-bottom: 1px solid #eee;
    font-size: 10px;
    vertical-align: middle;
  }

  tbody tr:nth-of-type(even) {
    background-color: #fafafa;
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid #1976d2;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }
}

/* Status Chips */
.status-chip {
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 9px;
  font-weight: bold;
  text-transform: uppercase;
  display: inline-block;
  min-width: 60px;
}

.status-chip.activo {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #c8e6c9;
}

.status-chip.inactivo {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ffcdd2;
}

/* Footer Styling */
.pdf-footer {
  margin-top: auto;
  padding-top: 20px;
  text-align: center;
  position: relative;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin-bottom: 10px;
}

.page-number {
  font-size: 9px;
  margin-top: 5px;
}

/* Helpers */
.text-left { text-align: left !important; }
.text-center { text-align: center !important; }
.text-bold { font-weight: bold; }
.text-primary { color: #1976d2; }
.text-lowercase { text-transform: lowercase; }

/* Impresión */
@media print {
  .pdf-container {
    padding: 0;
  }
  .styled-table {
    page-break-inside: auto;
  }
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
}
</style>

