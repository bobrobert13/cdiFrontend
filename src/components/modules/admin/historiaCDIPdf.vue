<template>
    <div class="pdf-container">
        <img src="../../../assets/membrete.png" class="full-width q-mb-sm"
            style="max-height: 80px; object-fit: contain;" />

        <!-- Título del documento -->
        <div class="text-center q-mb-md">
            <h6 class="text-primary no-padding no-margin q-mb-none">CDI</h6>
            <p class="text-grey-6 no-padding q-mt-sm">{{ data.nombre }}</p>
        </div>

        <!-- INFORMACIÓN CDI -->
        <div class="info-section">
            <div class="section-title">DATOS DEL CDI</div>
            <div class="info-grid">
                <div class="info-item">
                    <span class="label">Nombre:</span>
                    <span class="value">{{ data.nombre || 'No especificado' }}</span>
                </div>
                <div class="info-item">
                    <span class="label">Número CDI:</span>
                    <span class="value">{{ data.numero_cdi || 'No especificado' }}</span>
                </div>
                <div class="info-item">
                    <span class="label">Encargado:</span>
                    <span class="value">{{ data.encargado || 'No especificado' }}</span>
                </div>
                <div class="info-item">
                    <span class="label">Fecha de registro:</span>
                    <span class="value">{{ entradaFecha(data.createdAt) || 'No especificado' }}</span>
                </div>
            </div>
        </div>

        <!-- DOCTORES DEL CDI -->
        <div v-if="data.doctores && data.doctores.length > 0" class="info-section">
            <div class="section-title">Doctores ({{ data.doctores.length }})</div>
            <table class="compact-table">
                <thead>
                    <tr>
                        <th class="header-cell">Nombre</th>
                        <th class="header-cell">Cédula</th>
                        <th class="header-cell">Especialidad</th>
                        <th class="header-cell">Horario</th>
                        <th class="header-cell">Experiencia</th>
                        <th class="header-cell">Carnet</th>
                        <th class="header-cell">N. Teléfono</th>
                        <th class="header-cell">Correo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(doctor, index) in data.doctores" :key="index" class="table-row">
                        <td class="table-cell">{{ doctor.persona ? doctor.persona.nombre1 : 'N/A' }}</td>
                        <td class="table-cell">{{ doctor.persona ? doctor.persona.cedula_identidad : 'N/A' }}</td>
                        <td class="table-cell">{{ doctor.area_de_trabajo }}</td>
                        <td class="table-cell">{{ doctor.horario }}</td>
                        <td class="table-cell">{{ doctor.anos_experiencia }} años</td>
                        <td class="table-cell">{{ doctor.numero_carnet }}</td>
                        <td class="table-cell">{{ doctor.persona ? doctor.persona.telefono.codigo + doctor.persona.telefono.numero : 'N/A' }}</td>
                        <td class="table-cell">{{ doctor.persona ? doctor.persona.correo.correo : 'N/A' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else class="info-section">
            <div class="section-title">DOCTORES (0)</div>
            <table class="compact-table">
                <tbody>
                    <tr>
                        <td class="table-cell text-center">No hay doctores asignados</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- PACIENTES DEL CDI -->
        <div v-if="data.pacientes && data.pacientes.length > 0" class="info-section">
            <div class="section-title">PACIENTES ({{ data.pacientes.length }})</div>
            <table class="compact-table">
                <thead>
                    <tr>
                        <th class="header-cell">Nombre</th>
                        <th class="header-cell">Nac.</th>
                        <th class="header-cell">Cédula</th>
                        <th class="header-cell">Céd. Rep.</th>
                        <th class="header-cell">Edad</th>
                        <th class="header-cell">Estado Civil</th>
                        <th class="header-cell">F. Ingreso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="paciente in data.pacientes" :key="paciente.id_paciente" class="table-row">
                        <td class="table-cell">{{ paciente.persona ? paciente.persona.nombre1 : 'N/A' }}</td>
                        <td class="table-cell">{{ paciente.persona ? paciente.persona.nacionalidad : 'N/A' }}</td>
                        <td class="table-cell">
                            {{ (paciente.persona && paciente.persona.cedula_identidad) ? paciente.persona.cedula_identidad : 'N/A' }}
                        </td>
                        <td class="table-cell">
                            {{ (paciente.persona && paciente.persona.cedula_identidad) ? 'N/A' : (paciente.documento_identidad_representante || 'N/A') }}
                        </td>
                        <td class="table-cell">{{ paciente.persona ? paciente.persona.edad : 'N/A' }}</td>
                        <td class="table-cell">{{ paciente.persona ? paciente.persona.estado_civil : 'N/A' }}</td>
                        <td class="table-cell">{{ paciente.persona ? entradaFecha(paciente.createdAt) : 'N/A' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else class="info-section">
            <div class="section-title">PACIENTES (0)</div>
            <table class="compact-table">
                <tbody>
                    <tr>
                        <td class="table-cell text-center">No hay pacientes asignados</td>
                    </tr>
                </tbody>
            </table>
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
    name: "historialCDIVue",
    components: {},
    props: ["data"],
    created() {
    },
    methods: {
        salidaFecha(salida) {
            return moment(salida).format('DD-MM-YYYY')
        },
        entradaFecha(entrada) {
            return moment(entrada).format('DD-MM-YYYY HH:mm:ss')
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
    /* A4 width */
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
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
    border-radius: 3px;
    overflow: hidden;
    margin-top: 5px;
}

.header-cell {
    background-color: #1976d2;
    font-weight: bold;
    font-size: 9px;
    padding: 3px 4px;
    border: 1px solid #ddd;
    text-align: center;
    color: white;
}

.table-row {
    font-size: 9px;
    page-break-inside: avoid;
}

.table-row:nth-child(even) {
    background-color: #f9f9f9;
}

.table-cell {
    padding: 3px 4px;
    border: 1px solid #ddd;
    word-break: break-word;
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

    .header-cell,
    .table-cell {
        font-size: 8px;
        padding: 2px 3px;
    }
}
</style>
