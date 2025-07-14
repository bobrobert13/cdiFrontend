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
            </div>
        </div>

        <!-- DOCTORES DEL CDI -->
        <div v-if="data.doctores && data.doctores.length > 0" class="info-section">
            <div class="section-title">Doctores ({{ data.doctores.length }})</div>
            <div class="compact-table">
                <div class="table-header">
                    <div class="header-cell">Nombre</div>
                    <div class="header-cell">Especialidad</div>
                    <div class="header-cell">Horario</div>
                    <div class="header-cell">Años de experiencia</div>
                    <div class="header-cell">Número de carnet</div>
                </div>
                <div v-for="(doctor, index) in data.doctores" :key="index" class="table-row">
                    <div class="table-cell">{{ doctor.persona.nombre1 }}</div>
                    <div class="table-cell">{{ doctor.area_de_trabajo }}</div>
                    <div class="table-cell">{{ doctor.horario }}</div>
                    <div class="table-cell">{{ doctor.anos_experiencia }}</div>
                    <div class="table-cell">{{ doctor.numero_carnet }}</div>
                </div>
            </div>
        </div>

        <div v-else class="info-section">
            <div class="section-title">PACIENTES (0)</div>
            <div class="compact-table">
                <div class="table-header">
                    <div class="header-cell">No hay pacientes asignados</div>
                </div>
            </div>
        </div>

        <!-- PACIENTES DEL CDI -->
        <div v-if="data.pacientes && data.pacientes.length > 0" class="info-section">
            <div class="section-title">PACIENTES ({{ data.pacientes.length }})</div>
            <div class="compact-table">
                <div class="table-header">
                    <div class="header-cell">Nombre</div>
                    <div class="header-cell">Nacionalidad</div>
                    <div class="header-cell">Cédula</div>
                    <div class="header-cell">Edad</div>
                    <div class="header-cell">Estado Civil</div>
                </div>
                <div v-for="paciente in data.pacientes" :key="paciente.id_paciente" class="table-row">
                    <div class="table-cell">{{ paciente.persona.nombre1 }}</div>
                    <div class="table-cell">{{ paciente.persona.nacionalidad }}</div>
                    <div class="table-cell">{{ paciente.persona.cedula_identidad }}</div>
                    <div class="table-cell">{{ paciente.persona.edad }}</div>
                    <div class="table-cell">{{ paciente.persona.estado_civil }}</div>
                </div>
            </div>
        </div>

        <div v-else class="info-section">
            <div class="section-title">PACIENTES (0)</div>
            <div class="compact-table">
                <div class="table-header">
                    <div class="header-cell">No hay pacientes asignados</div>
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
    name: "historialCDIVue",
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
