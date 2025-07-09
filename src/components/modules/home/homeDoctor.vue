<template>
  <div class="row justify-center">
    <div class="col-12  ">
      <span class="text-bold text-h6  text-accent">Pacientes</span>
    </div>
    <div class="col-12  bg-white" style="min-height: 85vh; border-radius: 20px">
      <q-scroll-area class="q-mt-md q-mb-md" :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 80vh">
        <div class="row justify-center">
          <div class="col-10" v-if="viewType === 'userList'">
            <div class="row justify-center">
              <div class="col self-center text-right">
              </div>
              <div class="col q-pa-md self-center text-right">
                <q-icon style="cursor: pointer" @click="workerView('searchUser')" name="mdi-account-search"
                  class="text-primary q-mr-md" size="md"></q-icon>
                <q-icon style="cursor: pointer" @click="workerView('addWorker')" name="mdi-plus q-mr-md" class="text-primary"
                  size="md"></q-icon>

              </div>
            </div>
            <div class="row justify-center" v-if="this.users.length !== 0">
              <div class="col-12 text-left q-mb-md">
                <p class=" text-subtitle text-medium">Tu lista de pacientes:</p>
              </div>
              <div class="col-12 q-mb-sm" v-for="(user, index) in users" :key="index">
                <q-list class="rounded-borders bg-grey-1" style="border-radius: 15px">
                  <q-item v-if="user.persona">
                    <q-item-section top class=" q-py-md" style="cursor: pointer">
                      <q-item-label class="text-left q-mb-xs" lines="1">
                        <span class="text-weight-medium">Nombre de paciente: {{ user.persona.nombre1 }}</span>
                      </q-item-label>
                      <q-item-label class="text-left q-mb-xs" lines="1">
                        <span class="text-weight-medium">Documento de identidad: {{ user.persona.nacionalidad }} - {{
                          user.persona.cedula_identidad
                          }}</span>
                      </q-item-label>
                      <q-item-label class="text-left" lines="1">
                        <span class="text-weight-medium">Edad del paciente: {{ user.persona.edad }} años</span>
                      </q-item-label>
                      <q-separator spaced color="blue-grey" />
                      <q-item-label class="text-left" lines="1">
                        <div class="row col-12 items-center self-center no-wrap ">

                          <span v-if="!estadoEmergenciaPaciente(user.emergencias)"
                            @click="seleccionarUrgencias(user.persona, user.id_paciente)" lines="2"
                            class=" q-mr-lg cursor-pointer text-red-9 self-center text-bold" style="cursor: pointer">
                            <q-icon name="mdi-alert" /> Enviar a emergencias
                          </span>
                          <span v-else @click="verDetallesDeEmergencia(user.emergencias)" lines="2"
                            class=" q-mr-sm cursor-pointer text-red-9  self-center text-bold" style="cursor: pointer">
                            <q-icon name="mdi-information" /> Paciente en emergencias
                          </span>
                          <span v-if="!estadoHospitalizadoPaciente(user.hospitalizaciones)"
                            @click="seleccionarHospitalizacion(user.persona, user.id_paciente)" lines="2"
                            class=" q-mr-sm cursor-pointer text-primary self-center text-bold" style="cursor: pointer">
                            <q-icon name="mdi-hospital" /> Marcar como hospitalizado
                          </span>

                          <span v-else @click="verDetallesDeHospitalizacion(user.hospitalizaciones)" lines="2"
                            class=" q-mr-sm cursor-pointer text-orange-9 self-center text-bold" style="cursor: pointer">
                            <q-icon name="mdi-information" /> Paciente hospitalizado
                          </span>

                          
                          <button @click="generatePacientePDF(user)" type="button"
                            lines="2"
                            class=" q-ml-xl cursor-pointer text-primary self-center text-bold" style="cursor: pointer">
                            <q-icon name="mdi-printer-pos" /> Descargar ficha del paciente
                          </button>


                        </div>
                      </q-item-label>
                      <q-item-section side class="q-mt-md row no-wrap">
                        <button type="button"
                          class="no-outline no-border q-px-md q-py-xs rounded-borders bg-blue-grey text-white cursor-pointer"
                          @click="userDetail(user)"><q-icon name="mdi-eye" class="q-mr-sm" /> Inspeccionar
                          paciente</button>
                      </q-item-section>
                    </q-item-section>

                  </q-item>
                </q-list>
              </div>
            </div>
            <div class="row justify-center" v-else>
              <div class="col-12 text-center q-mt-xl">
                <span class="text-caption">No hay pacientes registrados</span>
              </div>
            </div>
          </div>
          <div class="col-10">
            <div class="row justify-center" v-if="viewType === 'searchUser'">
              <div class="col-12">
                <div>
                  <div class="col-12 text-left">
                    <q-icon style="cursor: pointer" @click="workerView('userList')" name="mdi-arrow-left"
                      class="text-primary" size="md"></q-icon>
                  </div>
                  <div class="row justify-center">
                    <div class="col-12 text-bold text-accent text-center text-h6">
                      <span>Buscar paciente</span>
                    </div>
                    <q-icon name="mdi-account-search" size="200px" class="text-secondary"></q-icon>
                    <div class="col-10 q-mt-md">
                      <q-input outlined filled type="number" color="deep-purple-6" v-model="dni"
                        label="Documento de identidad" />
                    </div>
                  </div>
                  <div class="row justify-center">
                    <div class="col-4 q-mt-md">
                      <q-btn label="Buscar" class="full-width" color="primary" :disable="dni === ''"
                        @click="buscarUsuario(dni)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-between " v-if="viewType === 'addWorker'">
              <div class="col-12 text-left row items-center q-mt-md q-mb-md">
                <q-icon style="cursor: pointer" @click="workerView('userList')" name="mdi-arrow-left"
                  class="text-primary" size="md"></q-icon>
                <span style="cursor: pointer" class="text-bold text-accent text-h6"
                  @click="workerView('userList')">Nuevo paciente</span>
              </div>
              <div class=" col-7">
                <div class="column justify-center">
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                    <q-input filled color="deep-purple-6" v-model="fullName" label="Nombre completo" :rules="[
                      (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                      (val) => val.length <= 200 || 'Máximo 200 caracteres',
                      (val) =>
                        /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                        'Solo se permiten caracteres',
                    ]" />
                  </div>
                  <div class="row q-pb-xs">
                    <div class="col-12">
                      <q-input type="email" filled v-model="correo" label="Correo electrónico" :rules="[
                        (val) => !!val || 'Este campo es obligatorio',
                        (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                        (val) => val.length <= 200 || 'Máximo 200 caracteres',
                        (val) => /.+@.+\..+/.test(val) || 'Formato de correo electrónico inválido'
                      ]" />
                    </div>
                  </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pb-xs">
                    <div class="row">
                      <div class="col-4">
                        <q-select filled v-model="nacionalidad" :options="nacionalidades" option-label="label"
                          option-value="value" emit-value />
                      </div>
                      <div class="col-8">
                        <q-input filled color="deep-purple-6" type="number" v-model="dni" :rules="[
                          val => /^\d+$/.test(val) || 'Solo se permiten números',
                          val => val.length <= 10 || 'Máximo 10 caracteres'
                        ]" label="Cédula" />
                      </div>
                    </div>
                    <div class="row q-mt-sm">
                      <div class="col-8">
                        <q-select filled label="Estado" v-model="estado" :options="estados" option-label="label"
                          option-value="value" />
                      </div>
                      <div class="col-4">
                        <q-select filled label="Ciudad" v-model="ciudad" :options="ciudades[estado.value]"
                          option-label="label" option-value="value" emit-value />
                      </div>
                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                      <div class="row q-mt-xs q-pb-xs">
                        <div class="col-8">
                          <q-input filled color="deep-purple-6" v-model="calle" label="Calle" />
                        </div>
                        <div class="col-4">
                          <q-input filled color="deep-purple-6" v-model="numero" label="Número de casa" type="number" />
                        </div>
                      </div>
                      <div class="col-xl-8 col-lg-8 col-md-8 q-pb-xs col-sm-12 col-xs-12 ">
                        <q-input filled color="deep-purple-6" v-model="sector" label="Sector" />
                      </div>
                      <div class="col-xl-8 col-lg-8 col-md-8 q-pb-xs col-sm-12 col-xs-12 ">
                        <q-input filled color="deep-purple-6" v-model="punto_referencia" label="Punto de referencia" />
                      </div>
                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                        <q-input filled color="deep-purple-6" type="number" :rules="[
                          val => /^\d+$/.test(val) || 'Solo se permiten números',
                          val => val.length <= 8 || 'Máximo 8 caracteres'
                        ]" v-model="codigo_postal" label="Código postal" />
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pb-xs ">
                    <q-select filled v-model="sexo" :options="sexoPaciente" label="Sexo" option-label="label"
                      option-value="value" emit-value />
                  </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                    <q-input filled color="deep-purple-6" :rules="[
                      val => /^\d+$/.test(val) || 'Solo se permiten números',
                      val => val.length <= 3 || 'Máximo 3 caracteres'
                    ]" v-model="edad" label="Edad" type="number" />
                  </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pb-xs">
                    <div class="row">
                      <div class="col-4">
                        <q-select filled v-model="codigo" :options="codigoTel" label="Codigo" option-label="label"
                          option-value="value" emit-value />
                      </div>
                      <div class="col-8">
                        <q-input filled color="deep-purple-6" :rules="[
                          val => /^\d+$/.test(val) || 'Solo se permiten números',
                          val => val.length <= 12 || 'Máximo 12 caracteres'
                        ]" v-model="telefono" type="number" label="Número de telefono" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class=" col-5" style="border-left: 3px solid white;">
                <div class="column justify-center">
                  <div class="row ">

                  </div>
                  <div class="row q-pb-xs">
                    <div class="col-12">
                      <q-select filled label="Vacunas" v-model="vacunasSeleccionadas" :options="vacunas"
                        option-label="label" option-value="value" />
                    </div>

                  </div>

                  <div class="row q-pb-xs">
                    <div class="col-12">
                      <q-select filled label="Tipo de sangre" v-model="sangreSeleccionada" :options="tipo_de_sangre" />
                    </div>

                  </div>

                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                    <div class="row  ">
                      <div class="col-12">
                        <q-input filled label="Enfermedades cronicas" :rules="[
                          (val) => !!val || 'Este campo es obligatorio',
                          (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                          (val) => val.length <= 200 || 'Máximo 200 caracteres',
                          (val) =>
                            /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                            'Solo se permiten caracteres',
                        ]" v-model="enfermedades_cronicas" />
                      </div>

                    </div>
                    <div class="row ">
                      <div class="col-12">
                        <q-input filled :rules="[
                          (val) => !!val || 'Este campo es obligatorio',
                          (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                          (val) => val.length <= 200 || 'Máximo 200 caracteres',
                          (val) =>
                            /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                            'Solo se permiten caracteres',
                        ]" label="Discapacidad" v-model="discapacidad" />
                      </div>

                    </div>

                    <div class="row ">
                      <div class="col-12">
                        <q-input :rules="[
                          (val) => !!val || 'Este campo es obligatorio',
                          (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                          (val) => val.length <= 200 || 'Máximo 200 caracteres',
                          (val) =>
                            /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                            'Solo se permiten caracteres',
                        ]" filled label="Antecedentes familiares" v-model="antecedentes_familiares" />
                      </div>

                    </div>

                    <div class="row ">
                      <div class="col-12">
                        <q-input :rules="[
                          (val) => !!val || 'Este campo es obligatorio',
                          (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                          (val) => val.length <= 200 || 'Máximo 200 caracteres',
                          (val) =>
                            /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                            'Solo se permiten caracteres',
                        ]" filled label="Alergias" v-model="alergias" />
                      </div>

                    </div>

                    <div class="row ">
                      <div class="col-12">
                        <q-input :rules="[
                          (val) => !!val || 'Este campo es obligatorio',
                          (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                          (val) => val.length <= 200 || 'Máximo 200 caracteres',
                          (val) =>
                            /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                            'Solo se permiten caracteres',
                        ]" filled label="Ocupación" v-model="ocupacion" />
                      </div>

                    </div>

                    <div class="row ">
                      <div class="col-12">
                        <q-select filled label="Estado civil" v-model="estadoCivilSeleccionado"
                          :options="estado_civil" />
                      </div>

                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                      <div class="row ">
                        <div class="col-12">
                          <q-input type="number" :rules="[
                            val => /^\d+$/.test(val) || 'Solo se permiten números',
                            val => val.length <= 3 || 'Máximo 3 caracteres'
                          ]" filled color="deep-purple-6" v-model="peso" label="Peso" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="viewType === 'addWorker'" class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 q-pa-xs q-pa-xs">
              <q-btn unelevated :loading="loader" type="submit" @click="addPaciente()" :disable="!valid ||
                dni === '' ||
                dni.length > 30 ||
                !sexo ||
                !edad ||
                edad > 100 ||
                edad < 1 ||
                telefono === '' ||
                telefono.length > 12 ||
                !estado ||
                !ciudad ||
                !calle ||
                calle.length > 200 ||
                !numero ||
                numero.length > 16 ||
                !sector ||
                sector.length > 100 ||
                !punto_referencia ||
                !codigo_postal ||
                !estadoCivilSeleccionado ||
                !peso ||
                !vacunasSeleccionadas ||
                !sangreSeleccionada
                " class="full-width text-white bg-primary" label="Añadir paciente" />
            </div>
          </div>
          <q-dialog v-model="modalDetailUser">
            <q-card class="my-card" flat bordered style="min-width: 450px">
              <q-card-section>
                <q-card-section class="col-5 flex flex-center no-padding">
                  <div class="text-overline text-h6 text-grey-9">Historia clinica</div>
                </q-card-section>
                <q-card-section class="col-5 flex flex-center">
                  <q-avatar>
                    <q-icon size="xl" name="mdi-doctor"></q-icon>
                  </q-avatar>
                </q-card-section>
                <q-card-section v-if="dataUser.persona" class="q-pt-xs q-pb-none no-margin">
                  <p class="text-subtitle text-bold text-grey-9">Detalles del paciente</p>
                  <div class="text-caption text-bold q-mt-sm q-mb-xs">Paciente: {{ dataUser.persona.nombre1 }}</div>
                  <div class="text-caption q-mt-sm q-mb-xs">Documento de identidad:
                    {{ dataUser.persona.nacionalidad }} - {{ dataUser.persona.cedula_identidad }}</div>
                  <div class="text-caption q-mt-sm q-mb-xs">Edad del paciente: {{ dataUser.persona.edad }}</div>
                  <div class="text-caption q-mt-sm q-mb-xs">Sexo: {{ dataUser.persona.sexo }}</div>
                  <!-- <div class="text-caption q-mt-sm q-mb-xs">Diagnostico: {{dataUser.diagnostico}}</div> -->
                </q-card-section>
              </q-card-section>

              <q-card-section class="no-padding column items-center full-width justify-center q-mx-sm q-mb-md">
                <q-avatar>
                  <q-icon size="xl" name="mdi-badge-account-alert"></q-icon>
                </q-avatar>
                <span class=" q-mt-xs">Más información respecto al estado del paciente:</span>
                <div class=" row wrap q-px-md q-mt-sm ">
                  <button @click="openModals('diagnosticos', true)" type="button"
                    class="no-outline q-mr-xs no-border q-px-md q-py-xs rounded-borders bg-blue-grey-9 text-white cursor-pointer">Diagnosticos</button>
                  <button @click="openModals('examenes', true)" type="button"
                    class="no-outline q-mr-xs no-border q-px-md q-py-xs rounded-borders bg-blue-grey-9 text-white cursor-pointer">Examenes</button>
                  <button @click="openModals('tratamientos', true)" type="button"
                    class="no-outline no-border q-px-md q-py-xs q-mr-xs rounded-borders bg-blue-grey-9 text-white cursor-pointer">Tratamientos</button>
                  <button @click="openModals('medicamentos', true)" type="button"
                    class="no-outline no-border q-px-md q-py-xs rounded-borders bg-blue-grey-9 text-white cursor-pointer">Medicamentos</button>
                </div>
              </q-card-section>
              <q-card-section class="no-padding column items-center full-width q-ml-md q-mb-md">
                <span class=" q-mt-xs">Emergencias y Hospitalizaciones:</span>
                <div class=" row wrap q-px-md q-mt-sm ">
                  <button @click="verDetallesDeEmergencia(dataUser.emergencias)" type="button"
                    class="no-outline q-mr-xs no-border q-px-md q-py-xs rounded-borders bg-blue-grey-9 text-white cursor-pointer">Emergencias</button>
                  <button @click="verDetallesDeHospitalizacion(dataUser.hospitalizaciones)" type="button"
                    class="no-outline q-mr-xs no-border q-px-md q-py-xs rounded-borders bg-blue-grey-9 text-white cursor-pointer">Hospitalizaciones</button>
                </div>
              </q-card-section>
              <q-card-section class="q-pt-md">
                <div class="row items-center q-px-sm justify-center">
                  <div class="col-6">
                    <span class="text-caption text-bold q-mt-sm q-mb-xs">Consultas</span>
                  </div>
                  <div class="col-6 text-right">
                    <span class="text-caption text-positive text-bold q-mt-sm q-mb-xs" @click="addConsulta()"
                      style="cursor: pointer;">Nueva consulta</span>
                  </div>
                </div>
                <q-item-section v-if="!dataUser.consultas || !dataUser.consultas.length">
                  <q-item-section class="row q-pa-sm justify-center">
                    El paciente aún no tiene consultas asignadas
                  </q-item-section>
                </q-item-section>
                <q-scroll-area v-else style="height: 250px; max-width: 100%;">
                  <div v-for="(consulta, index) in dataUser.consultas" :key="index" class="q-py-xs">

                    <q-list @click="updateConsulModal(consulta)">
                      <q-item style="cursor:pointer;">
                        <q-item-section>
                          <q-item-label caption>Paciente debe asistir el: <b>{{ entradaFecha(consulta.fecha_consulta)
                          }}</b></q-item-label>
                          <span class="q-my-sm"> <q-icon name="mdi-information" color="primary" /> Estado actual: <b>{{
                            consulta.estado_consulta }}</b></span>
                          <q-item-label>Tipo de consulta: <b>{{ consulta.tipo_consulta }}</b></q-item-label>
                          <q-item-label><b>Motivo:</b> {{ consulta.motivo_consulta }}</q-item-label>
                          <q-item-label><b>Síntomas:</b> {{ consulta.sintomas }}</q-item-label>

                        </q-item-section>

                      </q-item>
                      <div v-if="consulta.estado_consulta === 'Activo'"
                        class="q-ml-md row col-12 items-center self-center no-wrap ">
                        <span @click="ActualizarEstadoConsulta(consulta, 'Suspendido')" lines="2"
                          class=" q-mr-sm cursor-pointer text-primary self-center text-bold">
                          Suspender consulta
                        </span>
                      </div>
                      <div v-if="consulta.estado_consulta === 'Suspendido'"
                        class="q-ml-md row col-12 items-center self-center no-wrap ">
                        <span @click="ActualizarEstadoConsulta(consulta, 'Activo')" lines="2"
                          class=" q-mr-sm cursor-pointer text-primary self-center text-bold">
                          Activar consulta
                        </span>
                      </div>
                      <q-separator spaced inset />
                    </q-list>
                  </div>
                </q-scroll-area>
              </q-card-section>
              <q-separator />

              <q-card-actions align="center">
                <q-btn flat v-close-popup>
                  Cerrar
                </q-btn>
                <!-- <q-btn @click="generatePDF()" flat v-close-popup> Descargar historial </q-btn> -->
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- ELIMINAR USUARIO -->
          <q-dialog v-model="deleteUserModal">
            <q-card style="background-color: #015958" class="text-white">
              <q-bar>
                <q-space />
                <q-btn dense flat icon="close" v-close-popup>
                  <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>
                </q-btn>
              </q-bar>

              <q-card-section>
                <div class="text-h6">Confirmar</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                ¿Estás seguro que deseas eliminar este doctor?
              </q-card-section>
              <q-card-actions align="right" class="text-white">
                <q-btn flat label="Confirmar" @click="workerDelete(workerID)" />
                <q-btn flat label="Cancelar" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN ELIMINAR USUARIO -->

          <!-- PACIENTE A EMERGENCIAS -->
          <q-dialog v-model="modalUrgencias">
            <q-card class="my-card" flat bordered style="min-width: 350px">
              <q-card-section>
                Nueva emergencia
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div v-if="pacienteSeleccionado" class="col-12">
                    <span class="text-bold">Paciente: {{ pacienteSeleccionado.nombre1 }}</span>
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="emergencia_motivoEmergencia" filled label="Motivo de emergencia" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="emergencia_diagnosticoProvisional" filled label="Diagnóstico provisional" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="emergencia_estadoPaciente" filled label="Estado del paciente" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="emergencia_procesamientoRealizado" filled label="Procesamiento realizado" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="emergencia_tiempoAtencion" type="number" filled label="Tiempo de atención" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="emergencia_destino" filled label="Destino" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="emergencia_notasDeAtencion" filled label="Notas de atención" />
                  </div>
                </div>
              </q-card-section>
              <q-separator />

              <q-card-actions align="center">
                <q-btn flat :disable="this.emergencia_motivoEmergencia === '' ||
                  this.emergencia_diagnosticoProvisional === '' ||
                  this.emergencia_estadoPaciente === '' ||
                  this.emergencia_procesamientoRealizado === '' ||
                  this.emergencia_tiempoAtencion === '' ||
                  this.emergencia_destino === '' ||
                  this.emergencia_notasDeAtencion === ''
                  " @click="NuevaEmergencia()">
                  Crear emergencia para paciente
                </q-btn>
                <q-btn flat v-close-popup>
                  Cerrar
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN DE PACIENTE A EMERGENCIAS -->

          <!-- DETALLES DE EMERGENCIAS -->
          <q-dialog v-model="modalDetallesEmergencias" position="right">
            <q-card class="my-card" flat bordered style="min-width: 550px">
              <q-card-section>
                <q-card-section class="col-5 no-padding no-margin flex flex-center">
                  <q-avatar>
                    <q-icon size="lg" name="mdi-text-box-search"></q-icon>
                  </q-avatar>
                </q-card-section>
                <q-card-section class="col-5 no-margin flex flex-center no-padding">
                  <div class="text-overline text-h6 text-grey-9">Historial de emergencias</div>
                </q-card-section>
              </q-card-section>
              <q-card-section class="q-pt-md">
                <div class="row items-center q-px-sm justify-center">
                  <div class="col-6">
                    <span class="text-caption text-bold q-mt-sm q-mb-xs">Historial de emergencias</span>
                  </div>
                </div>
                <q-item-section v-if="!emegenciasPaciente.length">
                  <q-item-section class="row q-pa-sm justify-center">
                    El paciente aún no tiene historia de emergencias
                  </q-item-section>
                </q-item-section>
                <q-scroll-area style="height: 600px; max-width: 100%;">
                  <div v-for="(emergencia, index) in emegenciasPaciente" :key="index" class="q-py-xs">
                    <q-list>
                      <q-item style="cursor:pointer;">
                        <q-item-section>
                          <q-item-label lines="2" class=" q-mt-sm"> <q-icon name="mdi-information" color="primary" />
                            <b> Estado:</b> <b> {{
                              emergencia.estado_emergencia }}</b></q-item-label>
                          <q-item-label lines="2"><b>Motivo de emergencia:</b> {{
                            emergencia.motivo_emergencia
                          }}</q-item-label>

                          <q-item-label><b>Diagnóstico provisional:</b> {{ emergencia.diagnostico_provisional
                          }}</q-item-label>
                          <q-item-label><b>Estado del paciente:</b> {{ emergencia.estado_paciente
                          }}</q-item-label>
                          <q-item-label><b>Procesamiento realizado:</b> {{ emergencia.procesamiento_realizado
                          }}</q-item-label>
                          <q-item-label><b>Destino:</b> {{ emergencia.destino
                          }}</q-item-label>
                          <q-item-label><b>Notas de atención:</b> {{ emergencia.notas_de_atencion
                          }}</q-item-label>
                        </q-item-section>

                      </q-item>
                      <div class="q-ml-md row col-12 items-center self-center no-wrap ">
                        <span v-if="emergencia.estado_emergencia === 'Activo'"
                          @click="ActualizarEstadoEmergencia(emergencia, 'Finalizado')" lines="2"
                          class=" q-mr-sm cursor-pointer text-primary self-center text-bold">
                          Finalizar emergencia
                        </span>
                      </div>
                      <q-separator spaced inset />
                    </q-list>

                  </div>
                </q-scroll-area>
              </q-card-section>
              <q-card-actions align="center">
                <q-btn flat label="Cerrar" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN DETALLES DE EMERGENCIAS -->

          <!-- PACIENTE A HOSPITALIZACION -->
          <q-dialog v-model="modalHospitalizacion">
            <q-card class="my-card" flat bordered style="min-width: 350px">
              <q-card-section>
                Nuevo hospitalización
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div v-if="this.pacienteSeleccionado" class="col-12">
                    <span class="text-bold">Paciente: {{ pacienteSeleccionado.nombre1 }}</span>
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="hospitalizacion_motivoDeHospitalizacion" filled
                      label="Motivo de hospitalización" />
                  </div>

                  <div class="col-12 q-mt-xs">
                    <q-input v-model="hospitalizacion_unidadHospitalaria" filled label="Unidad hospitalaria" />
                  </div>

                  <div class="col-12 q-mt-xs">
                    <q-input v-model="hospitalizacion_notasMedicas" filled label="Notas médicas" type="textarea" />
                  </div>

                  <div class="col-11 q-pa-xs">
                    <span>Fecha de ingreso:</span>
                    <q-input filled v-model="hospitalizacion_fechaIngreso" disable label="Fecha de ingreso "></q-input>
                  </div>
                  <div class="col-1 self-center q-pa-xs q-pt-md">
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="hospitalizacion_fechaIngreso">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </div>

                  <div class="col-11 q-pa-xs">
                    <span>Fecha de egreso:</span>
                    <q-input filled v-model="hospitalizacion_fechaEgreso" disable label="Fecha de egreso"></q-input>
                  </div>
                  <div class="col-1 self-center q-pa-xs q-pt-md">
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="hospitalizacion_fechaEgreso">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </div>

                </div>
              </q-card-section>
              <q-separator />

              <q-card-actions align="center">
                <q-btn flat :disable="this.hospitalizacion_fechaIngreso === '' ||
                  this.hospitalizacion_fechaEgreso === '' ||
                  this.hospitalizacion_motivoDeHospitalizacion === '' ||
                  this.hospitalizacion_unidadHospitalaria === '' ||
                  this.hospitalizacion_notasMedicas === ''

                  " @click="NuevaHospitalizacion()">
                  Crear hospitalización para paciente
                </q-btn>
                <q-btn flat v-close-popup>
                  Cerrar
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN PACIENTE A HOSPITALIZACION -->

          <!-- DETALLES DE HOSPITALIZACION -->
          <q-dialog v-model="modalDetallesHospitalizacion" position="right">
            <q-card class="my-card" flat bordered style="min-width: 550px">
              <q-card-section>
                <q-card-section class="col-5 no-padding no-margin flex flex-center">
                  <q-avatar>
                    <q-icon size="lg" name="mdi-text-box-search"></q-icon>
                  </q-avatar>
                </q-card-section>
                <q-card-section class="col-5 no-margin flex flex-center no-padding">
                  <div class="text-overline text-h6 text-grey-9">Historial de hospitalización</div>
                </q-card-section>
              </q-card-section>
              <q-card-section class="q-pt-md">
                <div class="row items-center q-px-sm justify-center">
                  <div class="col-6">
                    <span class="text-caption text-bold q-mt-sm q-mb-xs">Historial de hospitalización</span>
                  </div>
                </div>
                <q-item-section v-if="!hospitalizacionesPaciente.length">
                  <q-item-section class="row q-pa-sm justify-center">
                    El paciente aún no tiene historia de hospitalización
                  </q-item-section>
                </q-item-section>
                <q-scroll-area style="height: 600px; max-width: 100%;">
                  <div v-for="(hospitalizacion, index) in hospitalizacionesPaciente" :key="index" class="q-py-xs">
                    <q-list>
                      <q-item style="cursor:pointer;">
                        <q-item-section>
                          <q-item-label lines="2" class=" q-mt-sm"> <q-icon name="mdi-information" color="primary" />
                            <b> Estado:</b> <b> {{
                              hospitalizacion.estado }}</b></q-item-label>
                          <q-item-label lines="2"><b>Motivo de hospitalización:</b> {{
                            hospitalizacion.motivo_de_hospitalizacion
                          }}</q-item-label>

                          <q-item-label><b>Unidad hospitalaria:</b> {{ hospitalizacion.unidad_hospitalaria
                          }}</q-item-label>
                          <q-item-label><b>Fecha de ingreso:</b> {{ entradaFecha(hospitalizacion.fecha_ingreso)
                          }}</q-item-label>
                          <q-item-label><b>Fecha de egreso:</b> {{ salidaFecha(hospitalizacion.fecha_egreso)
                          }}</q-item-label>
                          <q-item-label><b>Notas médicas:</b> {{ hospitalizacion.notas_medicas
                          }}</q-item-label>
                        </q-item-section>

                      </q-item>
                      <div class="q-ml-md row col-12 items-center self-center no-wrap ">
                        <span v-if="hospitalizacion.estado === 'Activo'"
                          @click="ActualizarEstadoHospitalizacion(hospitalizacion, 'Finalizado')" lines="2"
                          class=" q-mr-sm cursor-pointer text-primary self-center text-bold">
                          Dar de alta
                        </span>
                      </div>
                      <q-separator spaced inset />
                    </q-list>

                  </div>
                </q-scroll-area>
              </q-card-section>
              <q-card-actions align="center">
                <q-btn flat label="Cerrar" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN DETALLES DE HOSPITALIZACION -->

          <!-- AGREGAR CONSULTA -->
          <q-dialog v-model="modalAddConsulta">
            <q-card class="my-card" flat bordered style="min-width: 350px">
              <q-card-section>
                Añadir consulta
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div v-if="dataUser.persona" class="col-12">
                    <span class="text-bold">Paciente: {{ dataUser.persona.nombre1 }}</span>
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-select v-model="tipo_consulta" filled label="Tipo de consulta"
                      :options="['General', 'Especialista', 'Prioritario']" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="motivo_consulta" filled label="Motivo de consulta" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="sintomas_consulta" filled label="Detalles de síntomas" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="notas_medicas" filled label="Notas médicas" type="textarea" />
                  </div>

                  <div class="col-11 q-pa-xs">
                    <span>Fecha de consulta:</span>
                    <q-input filled v-model="ingresoSalida" disable label="Ingrese el dia de la consulta "></q-input>
                  </div>
                  <div class="col-1 self-center q-pa-xs q-pt-md">
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="ingresoSalida">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-separator />

              <q-card-actions align="center">
                <q-btn flat :disable="this.ingreso === ''
                  || this.salida === '' ||
                  this.tipo_consulta === '' ||
                  this.motivo_consulta === '' ||
                  this.sintomas_consulta === '' ||
                  this.notas_medicas === '' ||
                  this.ingresoSalida === ''

                  " @click="añadirConsul()">
                  Añadir
                </q-btn>
                <q-btn flat v-close-popup>
                  Cerrar
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN AGREGAR CONSULTA -->

          <!-- AGREGAR NUEVO Diagnostico -->
          <q-dialog v-model="modalAddDiagnostico">
            <q-card class="my-card" flat bordered style="min-width: 350px">
              <q-card-section>
                Nuevo diagnostico
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div v-if="dataUser.persona" class="col-12">
                    <span class="text-bold">Paciente: {{ dataUser.persona.nombre1 }}</span>
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-select v-model="diagnostico_nivel_gravedad" filled label="Nivel de gravedad"
                      :options="['Leve', 'Moderada', 'Grave', 'Crítica']" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="diagnostico_condicion" filled label="Condición de paciente" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="diagnostico_descripcion" filled label="Descripción" type="textarea" />
                  </div>

                </div>
              </q-card-section>
              <q-separator />

              <q-card-actions align="center">
                <q-btn flat :disable="this.diagnostico_nivel_gravedad === '' ||
                  this.diagnostico_condicion === '' ||
                  this.diagnostico_descripcion === ''
                  " @click="añadirDiagnostico()">
                  Diagnosticar
                </q-btn>
                <q-btn flat v-close-popup>
                  Cerrar
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN AGREGAR NUEVO DIAGNOSTICO -->

          <!-- ACTUALIZAR Diagnostico -->
          <q-dialog v-model="modalUpdateDiagnostico">
            <q-card class="my-card" flat bordered style="min-width: 350px">
              <q-card-section>
                Actualizar diagnostico
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div v-if="dataUser.persona" class="col-12">
                    <span class="text-bold">Paciente: {{ dataUser.persona.nombre1 }}</span>
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-select v-model="diagnostico_nivel_gravedad" filled label="Nivel de gravedad"
                      :options="['Leve', 'Moderada', 'Grave', 'Crítica']" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="diagnostico_condicion" filled label="Condición de paciente" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="diagnostico_descripcion" filled label="Descripción" type="textarea" />
                  </div>

                </div>
              </q-card-section>
              <q-separator />

              <q-card-actions align="center">
                <q-btn flat :disable="this.diagnostico_nivel_gravedad === '' ||
                  this.diagnostico_condicion === '' ||
                  this.diagnostico_descripcion === ''
                  " @click="actualizarDiagnostico()">
                  Actualizar diagnostico actual
                </q-btn>
                <q-btn flat v-close-popup>
                  Cerrar
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN ACTUALIZAR  DIAGNOSTICO -->

          <!-- AGREGAR NUEVO EXAMEN -->
          <q-dialog v-model="modalAddExamen">
            <q-card class="my-card" flat bordered style="min-width: 350px">
              <q-card-section>
                Nuevo examen
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div v-if="dataUser.persona" class="col-12">
                    <span class="text-bold">Paciente: {{ dataUser.persona.nombre1 }}</span>
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-select v-model="examen_tipoDeExamen" filled label="Tipo de examen" :options="['Sangre',
                      'Orina',
                      'Radiografía',
                      'Tomografía',
                      'Resonancia Magnética',
                      'Ecografía',
                      'Electrocardiograma',
                      'Endoscopia',
                      'Biopsia',
                      'Cultivo',
                      'Análisis Genético',
                      'Prueba de Esfuerzo',
                      'Mamografía',
                      'Densitometría',
                      'Otros']" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-select disable v-model="examen_estadoExamen" filled label="Estado del examen"
                      :options="['Pendiente', 'Completado', 'Cancelado']" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="examen_descripcion" filled label="Descripción" />
                  </div>

                  <div class="col-12 q-mt-xs">
                    <q-input v-model="examen_laboratorioCentro" filled label="Laboratorio en especifico" />
                  </div>
                  <!-- <div class="col-12 q-mt-xs">
                    <q-input v-model="examen_resultados" filled label="Resultatos" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="examen_valoresReferencia" filled label="Valores de referencia" />
                  </div> -->
                  <!-- <div class="col-12 q-mt-xs">
                    <q-input v-model="examen_observaciones" filled label="Observaciones" type="textarea" />
                  </div> -->
                </div>
              </q-card-section>
              <q-separator />

              <q-card-actions align="center">
                <q-btn flat :disable="this.examen_tipoDeExamen === '' ||
                  this.examen_estadoExamen === '' ||
                  this.examen_descripcion === '' ||
                  this.examen_laboratorioCentro === ''  
                  " @click="añadirExamen()">
                  Crear examen para paciente
                </q-btn>
                <q-btn flat v-close-popup>
                  Cerrar
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN AGREGAR NUEVO examen -->

          <!-- ACTUALIZAR EXAMEN -->
          <q-dialog v-model="modalUpdateExamen">
            <q-card class="my-card" flat bordered style="min-width: 350px">
              <q-card-section class="text-bold text-primary">
                Actualización de estado del examen
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div v-if="dataUser.persona" class="col-12">
                    <span class="text-bold">Paciente: {{ dataUser.persona.nombre1 }}</span>
                  </div>

                  <div class="col-12 q-mt-xs">
                    <q-select v-model="examen_tipoDeExamen" filled label="Tipo de examen" :options="['Sangre',
                      'Orina',
                      'Radiografía',
                      'Tomografía',
                      'Resonancia Magnética',
                      'Ecografía',
                      'Electrocardiograma',
                      'Endoscopia',
                      'Biopsia',
                      'Cultivo',
                      'Análisis Genético',
                      'Prueba de Esfuerzo',
                      'Mamografía',
                      'Densitometría',
                      'Otros']" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-select v-model="examen_estadoExamen" filled label="Estado del examen"
                      :options="['Completado', 'Pendiente']" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="examen_resultados" filled label="Resultatos" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="examen_valoresReferencia" filled label="Valores de referencia" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="examen_observaciones" filled label="Observaciones" type="textarea" />
                  </div>
                </div>
              </q-card-section>
              <q-separator />

              <q-card-actions align="center">
                <q-btn flat :disable="this.examen_estadoExamen === '' ||
                  this.examen_resultados === '' ||
                  this.examen_tipoDeExamen === '' ||
                  this.examen_valoresReferencia === '' ||
                  this.examen_observaciones === ''
                  " @click="actualizarExamen()">
                  Actualizar estado del examen
                </q-btn>
                <q-btn flat v-close-popup>
                  Cerrar
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN ACTUALIZAR EXAMEN -->


          <!-- AGREGAR NUEVO tratamiento -->
          <q-dialog v-model="modalAddTratamiento">
            <q-card class="my-card" flat bordered style="min-width: 350px">
              <q-card-section>
                Nuevo Tratamiento
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div v-if="dataUser.persona" class="col-12">
                    <span class="text-bold">Paciente: {{ dataUser.persona.nombre1 }}</span>
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-select v-model="tratamiento_tipoDeTratamiento" filled label="Tipo de tratamiento" :options="['Farmacologico',
                      'Quirurgico',
                      'Fisioterapia',
                      'Psicologico',
                      'Nutricional',
                      'Radioterapia',
                      'Quimioterapia',
                      'Otro']" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="tratamiento_detalles" filled label="Detalles de tratamiento" type="textarea" />
                  </div>

                  <div class="col-11 q-pa-xs">
                    <span>Inicio del tratamiento: </span>
                    <q-input filled v-model="tratamiento_fechaInicio" disable label="Ingrese fecha "></q-input>
                  </div>
                  <div class="col-1 self-center q-pa-xs q-pt-md">
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="tratamiento_fechaInicio">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </div>

                  <div class="col-11 q-pa-xs">
                    <span>Final del tratamiento: </span>
                    <q-input filled v-model="tratamiento_fechaCulminacion" disable label="Ingrese fecha "></q-input>
                  </div>
                  <div class="col-1 self-center q-pa-xs q-pt-md">
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="tratamiento_fechaCulminacion">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-separator />

              <q-card-actions align="center">
                <q-btn flat :disable="this.tratamiento_tipoDeTratamiento === '' ||
                  this.tratamiento_detalles === '' ||
                  this.tratamiento_fechaInicio === '' ||
                  this.tratamiento_fechaCulminacion === ''
                  " @click="añadirTratamiento()">
                  Añadir tratamiento para el paciente
                </q-btn>
                <q-btn flat v-close-popup>
                  Cerrar
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN AGREGAR NUEVO TRATAMIENTO -->


          <!-- AGREGAR NUEVO MEDICAMENTO -->
          <q-dialog v-model="modalAddMedicamento">
            <q-card class="my-card" flat bordered style="min-width: 350px">
              <q-card-section>
                Nuevo medicamento
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div v-if="dataUser.persona" class="col-12">
                    <span class="text-bold">Paciente: {{ dataUser.persona.nombre1 }}</span>
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="medicamento_nombre" filled label="Nombre del medicamento" />
                  </div>

                  <div class="col-12 q-mt-xs">
                    <q-input v-model="medicamento_principioActivo" filled label="Principio activo del medicamento" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-select v-model="medicamento_dosis" filled label="Dosis recomendada" :options='["250mg",
                      "500mg",
                      "750mg",
                      "1g",
                      "5mg",
                      "10mg",
                      "20mg",
                      "40mg",
                      "100mg",
                      "200mg",
                      "300mg",
                      "400mg"]' />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-select v-model="medicamento_viaAdministracion" filled label="Vía de administración" :options='["Oral",
                      "Intravenosa",
                      "Intramuscular",
                      "Subcutánea",
                      "Tópica",
                      "Inhalatoria",
                      "Sublingual",
                      "Rectal",
                      "Transdérmica",
                      "Ocular",
                      "Nasal"]' />
                  </div>


                  <div class="col-12 q-mt-xs">
                    <q-select v-model="medicamento_frecuencia" filled label="Frecuencia recomendada" :options='["Cada 8 horas",
                      "Cada 12 horas",
                      "Una vez al día",
                      "Dos veces al día",
                      "Tres veces al día",
                      "Cada 4 horas",
                      "Cada 6 horas",
                      "Cada semana",
                      "Cada mes",
                      "Según sea necesario"]' />
                  </div>

                  <div class="col-12 q-mt-xs">
                    <q-select v-model="medicamento_duracion" filled label="Duración" :options='["1 día",
                      "3 días",
                      "5 días",
                      "7 días",
                      "10 días",
                      "14 días",
                      "21 días",
                      "30 días",
                      "Indefinido",
                      "Según indicación médica"]' />
                  </div>


                  <div class="col-12 q-mt-xs">
                    <q-select disable v-model="medicamento_estadoTratamiento" filled
                      label="Estado del tratamiento con esta medicina" :options='["Activo",
                        "Suspendido", "Completado", "Cancelado"]' />
                  </div>

                  <div class="col-12 q-mt-xs">
                    <q-select v-model="medicamento_tipoMedicamento" filled label="Tipo de medicamento" :options="['Antibiotico',
                      'Analgesico',
                      'Antiinflamatorio',
                      'Antihipertensivo',
                      'Antidiabetico',
                      'Anticoagulante',
                      'Vitamina',
                      'Suplemento',
                      'Hormonal',
                      'Psiquiatrico',
                      'Cardiovascular',
                      'Respiratorio',
                      'Digestivo',
                      'Otros']" />
                  </div>


                  <div class="col-12 q-mt-xs">
                    <q-input v-model="medicamento_contraindicaciones" filled label="Contraindicaciones" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="medicamento_efectosSecundarios" filled label="Efectos secundarios" />
                  </div>

                  <div class="col-12 q-mt-xs">
                    <q-input v-model="medicamento_observaciones" filled label="Observaciones" type="textarea" />
                  </div>

                  <div class="col-11 q-pa-xs">
                    <span>Inicio de toma del medicamento </span>
                    <q-input filled v-model="medicamento_fechaInicio" disable label="Ingrese fecha de inicio"></q-input>
                  </div>
                  <div class="col-1 self-center q-pa-xs q-pt-md">
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="medicamento_fechaInicio">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </div>

                  <div class="col-11 q-pa-xs">
                    <span>Fin de toma del medicamento </span>
                    <q-input filled v-model="medicamento_fechaFin" disable
                      label="Ingrese fecha de finalización"></q-input>
                  </div>
                  <div class="col-1 self-center q-pa-xs q-pt-md">
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="medicamento_fechaFin">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-separator />

              <q-card-actions align="center">
                <q-btn flat :disable="this.medicamento_nombre === '' ||
                  this.medicamento_dosis === '' ||
                  this.medicamento_viaAdministracion === '' ||
                  this.medicamento_frecuencia === '' ||
                  this.medicamento_duracion === '' ||
                  this.medicamento_principioActivo === '' ||
                  this.medicamento_estadoTratamiento === '' ||
                  this.medicamento_tipoMedicamento === '' ||
                  this.medicamento_contraindicaciones === '' ||
                  this.medicamento_efectosSecundarios === '' ||
                  this.medicamento_observaciones === '' ||
                  this.medicamento_fechaInicio === '' ||
                  this.medicamento_fechaFin === ''
                  " @click="añadirMedicamento()">
                  Añadir medicamento para el paciente
                </q-btn>
                <q-btn flat v-close-popup>
                  Cerrar
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN AGREGAR NUEVO MEDICAMENTO -->

          <!-- ACTUALIZAR CONSULTA -->
          <q-dialog persistent v-model="modalUpdateConsulta">
            <q-card class="my-card" flat bordered style="min-width: 350px">
              <q-card-section>
                Actualizar consulta
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div v-if="dataUser.persona" class="col-12">
                    <span class="text-bold">Paciente: {{ dataUser.persona.nombre1 }}</span>
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-select v-model="tipo_consulta" filled label="Tipo de consulta"
                      :options="['General', 'Especialista', 'Prioritario']" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="motivo_consulta" filled label="Motivo de consulta" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="sintomas_consulta" filled label="Detalles de síntomas" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-input v-model="notas_medicas" filled label="Notas médicas" type="textarea" />
                  </div>

                  <div class="col-11 q-pa-xs">
                    <span>Fecha de consulta:</span>
                    <q-input filled v-model="ingresoSalida" disable label="Ingrese el dia de la consulta "></q-input>
                  </div>
                  <div class="col-1 self-center q-pa-xs q-pt-md">
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="ingresoSalida">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-separator />

              <q-card-actions align="center">
                <q-btn flat :disable="this.ingreso === ''
                  || this.salida === '' ||
                  this.tipo_consulta === '' ||
                  this.motivo_consulta === '' ||
                  this.sintomas_consulta === '' ||
                  this.notas_medicas === '' ||
                  this.ingresoSalida === ''
                  " @click="updateConsulta()">
                  Actualizar
                </q-btn>
                <q-btn flat v-close-popup @click="clearData()">
                  Cerrar
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN ACTUALIZAR CONSULTA -->

          <q-dialog v-model="modalDiagnosticos" position="left">
            <q-card class="my-card" flat bordered style="min-width: 550px">
              <q-card-section>
                <q-card-section class="col-5 no-padding no-margin flex flex-center">
                  <q-avatar>
                    <q-icon size="lg" name="mdi-clipboard-edit-outline"></q-icon>
                  </q-avatar>
                </q-card-section>
                <q-card-section class="col-5 no-margin flex flex-center no-padding">
                  <div class="text-overline text-h6 text-grey-9">Dianosticos al paciente</div>
                </q-card-section>
                <div v-if="dataUser.persona" class="col-5 no-margin flex flex-center no-padding">
                  <div class="text-overline text-h6 text-grey-9">{{ dataUser.persona.nombre1 }}</div>
                </div>
              </q-card-section>
              <q-card-section class="q-pt-md">
                <div class="row items-center q-px-sm justify-center">
                  <div class="col-6">
                    <span class="text-caption text-bold q-mt-sm q-mb-xs">Historial de diagnosticos</span>
                  </div>
                  <div class="col-6 text-right">
                    <span class="text-caption text-positive text-bold q-mt-sm q-mb-xs"
                      @click="modalAddDiagnostico = true" style="cursor: pointer;"> <q-icon name="mdi-plus" />Nuevo
                      diagnostico</span>
                  </div>
                </div>
                <q-item-section v-if="!dataUser.diagnosticos || !dataUser.diagnosticos.length">
                  <q-item-section class="row q-pa-sm justify-center">
                    El paciente aún no tiene diagnosticos asignados
                  </q-item-section>
                </q-item-section>
                <q-scroll-area v-else style="height: 200px; max-width: 100%;">
                  <div v-for="(diagnostico, index) in dataUser.diagnosticos" :key="index" class="q-py-xs">

                    <q-list>
                      <q-item style="cursor:pointer;">
                        <q-item-section>
                          <q-item-label caption>Fecha de diagnostico: {{ entradaFecha(diagnostico.createdAt)
                          }}</q-item-label>
                          <q-item-label lines="2"><b>Diagnostico:</b> {{ diagnostico.condicion }}</q-item-label>
                          <q-item-label lines="2"><b>Gravedad:</b> {{ diagnostico.gravedad }}</q-item-label>
                          <small class=" q-mt-xs"><b>Descripción:</b> {{ diagnostico.descripcion }}</small>
                        </q-item-section>
                      </q-item>

                      <div class="q-ml-md row col-12 items-center self-center no-wrap ">
                        <span @click="seleccionarDiagnostico(diagnostico)" lines="2"
                          class=" q-mr-sm cursor-pointer text-primary self-center text-bold">
                          Corregir Diagnostico
                        </span>
                      </div>
                      <q-separator spaced inset />
                    </q-list>
                  </div>
                </q-scroll-area>
              </q-card-section>
              <q-card-actions align="center">
                <q-btn flat label="Cerrar" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="modalExamenes" position="right">
            <q-card class="my-card" flat bordered style="min-width: 550px">
              <q-card-section>
                <q-card-section class="col-5 no-padding no-margin flex flex-center">
                  <q-avatar>
                    <q-icon size="lg" name="mdi-text-box-search"></q-icon>
                  </q-avatar>
                </q-card-section>
                <q-card-section class="col-5 no-margin flex flex-center no-padding">
                  <div class="text-overline text-h6 text-grey-9">Exámenes al paciente</div>
                </q-card-section>
                <div v-if="dataUser.persona" class="col-5 no-margin flex flex-center no-padding">
                  <div class="text-overline text-h6 text-grey-9">{{ dataUser.persona.nombre1 }}</div>
                </div>
              </q-card-section>
              <q-card-section class="q-pt-md">
                <div class="row items-center q-px-sm justify-center">
                  <div class="col-6">
                    <span class="text-caption text-bold q-mt-sm q-mb-xs">Historial de exámenes</span>
                  </div>
                  <div class="col-6 text-right">
                    <span class="text-caption text-positive text-bold q-mt-sm q-mb-xs" @click="modalAddExamen = true"
                      style="cursor: pointer;"> <q-icon name="mdi-plus" />Nuevo examen</span>
                  </div>
                </div>
                <q-item-section v-if="!dataUser.examenes || !dataUser.examenes.length">
                  <q-item-section class="row q-pa-sm justify-center">
                    El paciente aún no tiene examenes asignados
                  </q-item-section>
                </q-item-section>
                <q-scroll-area v-else style="height: 600px; max-width: 100%;">
                  <div v-for="(examen, index) in dataUser.examenes" :key="index" class="q-py-xs">

                    <q-list>
                      <q-item style="cursor:pointer;">
                        <q-item-section>
                          <q-item-label caption>Fecha de asignado: {{ entradaFecha(examen.createdAt) }}</q-item-label>
                          <q-item-label lines="2"><b>Tipo de examen tratado:</b> {{ examen.tipo_de_examen
                          }}</q-item-label>
                          <small class=" q-mt-xs"><b>Descripción:</b> {{ examen.descripcion }}</small>

                          <q-item-section class=" q-mt-sm">
                            <q-item-label caption>Laboratorio: {{ examen.laboratorio_centro }}</q-item-label>

                            <q-item-label lines="2" class=" q-mt-sm"><b>Observaciones:</b> {{ examen.observaciones
                            }}</q-item-label>
                            <span class=" q-mt-xs"><b>Descripción:</b> {{ examen.descripcion }}</span>
                          </q-item-section>
                          <q-item-label lines="2" class=" q-mt-sm"><b>Valores de referencia:</b> {{
                            examen.valores_referencia }}</q-item-label>
                          <q-item-section class=" q-mt-sm">
                            <q-item-label lines="2" class=" q-mt-sm"> <q-icon name="mdi-information" color="primary" />
                              <b> Estado del examen:</b> <b> {{
                                examen.estado_examen }}</b></q-item-label>
                            <small class=" q-mt-xs"><b>Resultados:</b> {{ examen.resultados }}</small>
                          </q-item-section>
                          <q-item-section class=" q-mt-sm">
                            <q-item-label @click="seleccionarExamen(examen)" lines="2"
                              class=" text-primary text-bold q-mt-sm">
                              Actualizar estado del examen
                            </q-item-label>
                          </q-item-section>
                        </q-item-section>



                      </q-item>
                      <q-separator spaced inset />
                    </q-list>
                  </div>
                </q-scroll-area>
              </q-card-section>
              <q-card-actions align="center">
                <q-btn flat label="Cerrar" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="modalTratamientos" position="right">
            <q-card class="my-card" flat bordered style="min-width: 550px">
              <q-card-section>
                <q-card-section class="col-5 no-padding no-margin flex flex-center">
                  <q-avatar>
                    <q-icon size="lg" name="mdi-text-box-search"></q-icon>
                  </q-avatar>
                </q-card-section>
                <q-card-section class="col-5 no-margin flex flex-center no-padding">
                  <div class="text-overline text-h6 text-grey-9">Tratamientos al paciente</div>
                </q-card-section>
                <div v-if="dataUser.persona" class="col-5 no-margin flex flex-center no-padding">
                  <div class="text-overline text-h6 text-grey-9">{{ dataUser.persona.nombre1 }}</div>
                </div>
              </q-card-section>
              <q-card-section class="q-pt-md">
                <div class="row items-center q-px-sm justify-center">
                  <div class="col-6">
                    <span class="text-caption text-bold q-mt-sm q-mb-xs">Historial de tratamientos</span>
                  </div>
                  <div class="col-6 text-right">
                    <span class="text-caption text-positive text-bold q-mt-sm q-mb-xs"
                      @click="modalAddTratamiento = true" style="cursor: pointer;"> <q-icon name="mdi-plus" />Nuevo
                      tratamiento</span>
                  </div>
                </div>
                <q-item-section v-if="!dataUser.tratamientos || !dataUser.tratamientos.length">
                  <q-item-section class="row q-pa-sm justify-center">
                    El paciente aún no tiene tratamientos asignados
                  </q-item-section>
                </q-item-section>
                <q-scroll-area v-else style="height: 600px; max-width: 100%;">
                  <div v-for="(tratamiento, index) in dataUser.tratamientos" :key="index" class="q-py-xs">

                    <q-list>
                      <q-item style="cursor:pointer;">
                        <q-item-section>
                          <q-item-label lines="2" class=" q-mt-sm"> <q-icon name="mdi-information" color="primary" />
                            <b> Estado del tratamiento:</b> <b> {{
                              tratamiento.estado }}</b></q-item-label>
                          <q-item-label lines="2"><b>Tipo de tratamiento:</b> {{ tratamiento.tipo_de_tratamiento
                          }}</q-item-label>
                          <small class=" q-mt-xs"><b>Detalles:</b> {{ tratamiento.detalles }}</small>
                          <q-item-label caption>Fecha de inicio: {{ entradaFecha(tratamiento.fecha_inicio)
                          }}</q-item-label>
                          <q-item-label caption>Fecha de culminación: {{ entradaFecha(tratamiento.fecha_culminacion)
                          }}</q-item-label>
                        </q-item-section>

                      </q-item>
                      <div class="q-ml-md row col-12 items-center self-center no-wrap ">
                        <span @click="ActualizarEstadoTratamiento(tratamiento, 'Suspendido')" lines="2"
                          class=" q-mr-sm cursor-pointer text-primary self-center text-bold">
                          Suspender Tratamiento
                        </span>
                        <span @click="ActualizarEstadoTratamiento(tratamiento, 'Finalizado')" lines="2"
                          class=" text-primary cursor-pointer self-center text-bold ">
                          Finalizar Tratamiento
                        </span>
                      </div>
                      <q-separator spaced inset />
                    </q-list>

                  </div>
                </q-scroll-area>
              </q-card-section>
              <q-card-actions align="center">
                <q-btn flat label="Cerrar" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="modalMedicamentos" position="right">
            <q-card class="my-card" flat bordered style="min-width: 550px">
              <q-card-section>
                <q-card-section class="col-5 no-padding no-margin flex flex-center">
                  <q-avatar>
                    <q-icon size="lg" name="mdi-text-box-search"></q-icon>
                  </q-avatar>
                </q-card-section>
                <q-card-section class="col-5 no-margin flex flex-center no-padding">
                  <div class="text-overline text-h6 text-grey-9">Medicamentos al paciente</div>
                </q-card-section>
                <div v-if="dataUser.persona" class="col-5 no-margin flex flex-center no-padding">
                  <div class="text-overline text-h6 text-grey-9">{{ dataUser.persona.nombre1 }}</div>
                </div>
              </q-card-section>
              <q-card-section class="q-pt-md">
                <div class="row items-center q-px-sm justify-center">
                  <div class="col-6">
                    <span class="text-caption text-bold q-mt-sm q-mb-xs">Historial de medicamentos</span>
                  </div>
                  <div class="col-6 text-right">
                    <span class="text-caption text-positive text-bold q-mt-sm q-mb-xs"
                      @click="modalAddMedicamento = true" style="cursor: pointer;"> <q-icon name="mdi-plus" />Asignar
                      medicamento</span>
                  </div>
                </div>
                <q-item-section v-if="!dataUser.medicamentos || !dataUser.medicamentos.length">
                  <q-item-section class="row q-pa-sm justify-center">
                    El paciente aún no tiene medicamentos asignados
                  </q-item-section>
                </q-item-section>
                <q-scroll-area v-else style="height: 600px; max-width: 100%;">
                  <div v-for="(medicamento, index) in dataUser.medicamentos" :key="index" class="q-py-xs">

                    <q-list>
                      <q-item style="cursor:pointer;">
                        <q-item-section>

                          <q-item-label lines="2" class=" text-h6 text-medium text-primary"><b>{{ medicamento.nombre
                          }}</b> </q-item-label>
                          <q-item-label class="q-my-sm" lines="2"> <q-icon color="primary" name="mdi-information" />
                            Estado actual: <b>{{ medicamento.estado_tratamiento }}</b> </q-item-label>
                          <q-item-label lines="2"><b>Dosis recomentada:</b> {{ medicamento.dosis
                          }}</q-item-label>
                          <q-item-label lines="2"><b>Administración:</b> {{ medicamento.via_administracion
                          }}</q-item-label>
                          <q-item-label lines="2"><b>Frecuencia de administración:</b> {{ medicamento.frecuencia
                          }}</q-item-label>
                          <q-item-label lines="2"><b>Duración recomentada:</b> {{ medicamento.duracion
                          }}</q-item-label>
                          <q-item-label lines="2"><b>Dosis recomentada:</b> {{ medicamento.dosis
                          }}</q-item-label>
                          <q-item-label lines="2"><b>Dosis recomentada:</b> {{ medicamento.dosis
                          }}</q-item-label>
                          <small class=" q-mt-xs"><b>Observaciones:</b> {{ medicamento.observaciones }}</small>
                          <q-item-label caption>Fecha de inicio: {{ entradaFecha(medicamento.fecha_inicio)
                          }}</q-item-label>
                          <q-item-label caption>Fecha de culminación: {{ entradaFecha(medicamento.fecha_fin)
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                      <div class="q-ml-md row col-12 items-center self-center no-wrap ">
                        <span @click="ActualizarEstadoMedicamento(medicamento, 'Suspendido')" lines="2"
                          class=" q-mr-sm cursor-pointer text-primary self-center text-bold">
                          Suspender Medicamento
                        </span>
                        <span @click="ActualizarEstadoMedicamento(medicamento, 'Completado')" lines="2"
                          class=" text-primary cursor-pointer self-center text-bold ">
                          Completar Medicamento
                        </span>
                      </div>
                      <q-separator spaced inset />
                    </q-list>
                  </div>
                </q-scroll-area>
              </q-card-section>
              <q-card-actions align="center">
                <q-btn flat label="Cerrar" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>


        </div>
      </q-scroll-area>
    </div>

    <div>
        <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
          :paginate-elements-by-height="1400" filename="historialDoctorEnc" :pdf-quality="2" :manual-pagination="false"
          pdf-format="a4" :pdf-margin="2" pdf-orientation="portrait" pdf-content-width="800px"
          @progress="onProgress($event)" ref="html2Pdf">
          <section slot="pdf-content">
            <historiaPdf :data="dataUser" />
          </section>
        </vue-html2pdf>
    </div>


  </div>
</template>
<script>
import config from "../../../config";
import moment from 'moment';
import VueHtml2pdf from "vue-html2pdf";
import historiaPdf from "../admin/hitoriaPdf.vue"
import {
  MIS_PACIENTES_QUERY,
  ADDPACIENTE_MUTATION,
  USER_DELETE,
  BUSCAR_PACIENTE_QUERY,
  ADDCONSULTA_MUTATION,
  UPDATE_CONSULTA_MUTATION,
  ADDDIAGNOSTICO_MUTATION,
  ADDEXAMEN_MUTATION,
  ADDTRATAMIENTO_MUTATION,
  ADDMEDICAMENTO_MUTATION,
  UPDATE_EXAMEN_MUTATION,
  UPDDATE_CONSULTA_MUTATION,
  UPDDATE_ESTADO_CONSULTA_MUTATION,
  UPDDATE_EXAMEN_MUTATION,
  UPDDATE_DIAGNOSTICO_MUTATION,
  UPDDATE_ESTADO_TRATAMIENTO_MUTATION,
  UPDDATE_ESTADO_MEDICAMENTO_MUTATION,
  ADD_EMERGENCIA_MUTATION,
  ADD_HOSPITALIZACION_MUTATION,
  UPDDATE_ESTADO_HOSPITALIZACION_MUTATION,
  UPDDATE_ESTADO_EMERGENCIA_MUTATION
} from "../../../graphql/user";
export default {
  name: "homeDoctor",
  components: {
    historiaPdf,
    VueHtml2pdf
  },
  data() {
    return {

      // MODALES
      modalUpdateExamen: false,
      modalUpdateDiagnostico: false,
      modalAddDiagnostico: false,
      modalAddExamen: false,
      modalAddTratamiento: false,
      modalAddMedicamento: false,
      modalUrgencias: false,
      modalHospitalizacion: false,
      modalDetallesEmergencias: false,
      modalDetallesHospitalizacion: false,

      modalDiagnosticos: false,
      modalExamenes: false,
      modalTratamientos: false,
      modalMedicamentos: false,

      // DATOS DE PADECIMIENTOS:
      enfermedades_cronicas: '',       // Ejemplo: 'Ninguna'
      peso: null,                      // Ejemplo: 72.5
      vacunasSeleccionadas: '',
      vacunas: [
        { label: "Ninguna", value: "Ninguna" },
        { label: "Vacuna contra la gripe", value: "gripe" },
        { label: "Vacuna contra el tétanos", value: "tetano" },
        { label: "Vacuna contra la hepatitis B", value: "hepatitis_B" },
        { label: "Vacuna contra la hepatitis A", value: "hepatitis_A" },
        { label: "Vacuna contra el sarampión", value: "sarampion" },
        { label: "Vacuna contra la rubéola", value: "rubeola" },
        { label: "Vacuna contra la varicela", value: "varicela" },
        { label: "Vacuna contra el neumococo", value: "neumococo" },
        { label: "Vacuna contra el VPH", value: "VPH" },
        { label: "Vacuna contra la fiebre amarilla", value: "fiebre_amarilla" },
        { label: "Vacuna contra COVID-19 (Pfizer)", value: "covid_pfizer" },
        { label: "Vacuna contra COVID-19 (Moderna)", value: "covid_moderna" },
        { label: "Vacuna contra COVID-19 (AstraZeneca)", value: "covid_astrazeneca" },
        { label: "Vacuna contra COVID-19 (Johnson & Johnson)", value: "covid_johnson" },
        { label: "Vacuna contra COVID-19 (Sinovac)", value: "covid_sinovac" },
        { label: "Vacuna contra COVID-19 (Sputnik V)", value: "covid_sputnik" }
      ],                     // Ejemplo: 'Covid, Hepatitis'
      discapacidad: '',                // Ejemplo: 'Ninguna'
      antecedentes_familiares: '',     // Ejemplo: 'Diabetes'
      sangreSeleccionada: '',
      tipo_de_sangre: [
        { label: "A+", value: "A+" },
        { label: "A-", value: "A-" },
        { label: "B+", value: "B+" },
        { label: "B-", value: "B-" },
        { label: "AB+", value: "AB+" },
        { label: "AB-", value: "AB-" },
        { label: "O+", value: "O+" },
        { label: "O-", value: "O-" }
      ],              // Ejemplo: 'O+'
      alergias: '',
      estadoCivilSeleccionado: '',
      estado_civil: [
        { label: "Soltero", value: "Soltero" },
        { label: "Casado", value: "Casado" },
        { label: "Divorciado", value: "Divorciado" },
        { label: "Viudo", value: "Viudo" },
        { label: "Unión libre", value: "Unión libre" }
      ],                // Ejemplo: 'Soltero'
      ocupacion: '',                   // Ejemplo: 'Ingeniero'

      punto_referencia: '',            // Ejemplo: 'Cerca de la plaza'
      codigo_postal: '',               // Ejemplo: '1010'
      correo: '',

      canEdit: false,
      ingreso: "",
      salida: "",
      ingresoSalida: '',
      fecha: "",
      idConsulta: "",
      modalAddConsulta: false,
      modalUpdateConsulta: false,
      modalDetailUser: false,
      config: config,
      previewImgs: "",
      imghightlight: "",
      highlight: [],
      highlightPreview: "",
      image: [],
      imagePreview: [],
      tab: "users",
      role: "Paciente",
      dni: "",
      telefono: "",
      sexo: "Masculino",

      // PACIENTE EN URGENCIAS
      pacienteSeleccionado: {},
      emegenciasPaciente: [],
      hospitalizacionesPaciente: [],

      //CONSULTA
      tipo_consulta: "",
      motivo_consulta: "",
      sintomas: "",
      notas_medicas: "",
      sintomas_consulta: '',
      diagnostico: '',

      // DIAGNOSTICO
      diagnostico_nivel_gravedad: '',
      diagnostico_condicion: '',
      diagnostico_descripcion: '',
      diagnosticoSeleccionado: {},

      // EXAMEN
      examenSeleccionado: {},
      examen_tipoDeExamen: "",
      examen_descripcion: "",
      examen_resultados: "",
      examen_estadoExamen: 'Pendiente',
      examen_laboratorioCentro: "",
      examen_valoresReferencia: "",
      examen_observaciones: "",

      // TRATAMIENTO
      tratamientoSeleccionado: {},
      tratamiento_tipoDeTratamiento: "",
      tratamiento_fechaInicio: "",
      tratamiento_fechaCulminacion: "",
      tratamiento_estado: "",
      tratamiento_detalles: "",

      // MEDICAMENTO
      medicamentoSeleccionado: {},
      medicamento_nombre: "",
      medicamento_dosis: "",
      medicamento_viaAdministracion: "",
      medicamento_frecuencia: "",
      medicamento_duracion: "",
      medicamento_observaciones: "",
      medicamento_principioActivo: "",
      medicamento_fechaInicio: "",
      medicamento_fechaFin: "",
      medicamento_estadoTratamiento: 'Activo',
      medicamento_tipoMedicamento: "",
      medicamento_contraindicaciones: "",
      medicamento_efectosSecundarios: "",

      // EMERGENCIAS

      emergencia_motivoEmergencia: "",
      emergencia_diagnosticoProvisional: "",
      emergencia_estadoPaciente: "",
      emergencia_procesamientoRealizado: "",
      emergencia_tiempoAtencion: null,
      emergencia_notasDeAtencion: "",
      emergencia_destino: "",


      // HOSPITALIZACION

      hospitalizacion_fechaIngreso: "",
      hospitalizacion_fechaEgreso: null,
      hospitalizacion_motivoDeHospitalizacion: "",
      hospitalizacion_unidadHospitalaria: "",
      hospitalizacion_estado: "Activo",
      hospitalizacion_notasMedicas: "",


      edad: 0,
      estado: "",
      direccion: {
        UserId: this.$store.state.user.id,
        CiudadId: 1,
      },
      calle: "",
      numero: "",
      sector: "",
      estado: { label: 'Anzoátegui', value: 2 },
      ciudad: "",
      roleEspecialidad: "Enfermeria",
      deleteUserModal: false,
      credAdd: false,
      isPwd: true,
      fullName: "",
      addCreditSide: false,
      deleteUserModal: false,
      userModal: false,
      loader: false,
      email: "",
      loaderUser: false,
      workerID: "",
      userAdd: false,
      maximizedToggle: true,
      userName: "",
      password: "",
      userId: "",
      dataUser: "",
      user: "",
      valid: false,
      buscador: true,
      roleUser: [
        { label: "Paciente", value: "Paciente" }
      ],
      codigo: 414,
      codigoTel: [
        { label: "0414", value: 414 },
        { label: "0424", value: 424 },
        { label: "0412", value: 412 },
        { label: "0416", value: 416 },
        { label: "0426", value: 426 }
      ],
      estados: [
        { label: 'Amazonas', value: 1 },
        { label: 'Anzoátegui', value: 2 },
        { label: 'Apure', value: 3 },
        { label: 'Aragua', value: 4 },
        { label: 'Barinas', value: 5 },
        { label: 'Bolívar', value: 6 },
        { label: 'Carabobo', value: 7 },
        { label: 'Cojedes', value: 8 },
        { label: 'Delta Amacuro', value: 9 },
        { label: 'Falcón', value: 10 },
        { label: 'Guárico', value: 11 },
        { label: 'Lara', value: 12 },
        { label: 'Mérida', value: 13 },
        { label: 'Miranda', value: 14 },
        { label: 'Monagas', value: 15 },
        { label: 'Nueva Esparta', value: 16 },
        { label: 'Portuguesa', value: 17 },
        { label: 'Sucre', value: 18 },
        { label: 'Táchira', value: 19 },
        { label: 'Trujillo', value: 20 },
        { label: 'Vargas', value: 21 },
        { label: 'Yaracuy', value: 22 },
        { label: 'Zulia', value: 23 },
        { label: 'Distrito Capital', value: 24 },
        { label: 'Dependencias Federales', value: 25 }
      ],
      ciudades: {
        1: ['Puerto Ayacucho', 'San Fernando de Atabapo', 'Maroa'],
        2: ['Barcelona', "Puerto La Cruz", "Lechería", "El Tigre", "San José de Guanipa"],
        3: ['San Fernando de Apure', 'Guasdualito', 'Biruaca'],
        4: ['Maracay', 'Cagua', 'La Victoria'],
        5: ['Barinas', 'Ciudad Bolivia', 'Socopó'],
        6: ['Ciudad Bolívar', 'Puerto Ordaz', 'Upata'],
        7: ['Valencia', 'Naguanagua', 'Guacara'],
        8: ['San Carlos', 'Tinaquillo', 'El Baúl'],
        9: ['Tucupita', 'Pedernales', 'Curiapo'],
        10: ['Coro', 'Punto Fijo', 'Chichiriviche'],
        11: ['San Juan de los Morros', 'Calabozo', 'Zaraza'],
        12: ['Barquisimeto', 'Cabudare', 'Carora'],
        13: ['Mérida', 'El Vigía', 'Tovar'],
        14: ['Los Teques', 'Guarenas', 'Ocumare del Tuy'],
        15: ['Maturín', 'Punta de Mata', 'Caripito'],
        16: ['Porlamar', 'La Asunción', 'Juan Griego'],
        17: ['Guanare', 'Acarigua', 'Araure'],
        18: ['Cumaná', 'Carúpano', 'Güiria'],
        19: ['San Cristóbal', 'Rubio', 'La Fría'],
        20: ['Trujillo', 'Valera', 'Boconó'],
        21: ['La Guaira', 'Maiquetía', 'Caraballeda'],
        22: ['San Felipe', 'Chivacoa', 'Yaritagua'],
        23: ['Maracaibo', 'Cabimas', 'Ciudad Ojeda'],
        24: ['Caracas', 'El Hatillo', 'Sucre'],
        25: ['Isla de Aves', 'Isla la Sola', 'Isla de Patos']
      },
      sexoPaciente: [
        { label: "Masculino", value: "Masculino" },
        { label: "Femenino", value: "Femenino" }
      ],
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#015958",
        width: "5px",
        opacity: 0.75,
      },
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#015958",
        width: "9px",
        opacity: 0.2,
      },
      users: {},
      viewType: "userList",
      nacionalidad: "V",
      nacionalidadUser: "",
      nacionalidades: [
        { label: "V", value: "V" },
        { label: "E", value: "E" }
      ],
    };
  },
  created() {
    this.AllPacientes();
  },
  watch: {
    ingresoSalida(newValue) {
      console.log(newValue)
      if (!newValue.to) {
        this.fecha = "Desde: " + newValue
        this.ingreso = newValue
        this.salida = newValue
      } else {
        this.fecha = "Desde: " + newValue.from + "| Hasta: " + newValue.to
        this.ingreso = newValue.from
        this.salida = newValue.to
      }
    },
    estado(newVal) {
      this.ciudad = ""
    },
    async highlight(newValue) {
      this.imghightlight = "";
      let image = await this.readFileAsync(newValue);
      this.imghightlight = image;
    },
    enfermedades_cronicas(newValue) {
      this.validarCampoEnfermedadesCronicas(newValue);
    },
    discapacidad(newValue) {
      this.validarCampoDiscapacidad(newValue);
    },
    antecedentes_familiares(newValue) {
      this.validarCampoAntecedentesFamiliares(newValue);
    },
    alergias(newValue) {
      this.validarCampoAlergias(newValue);
    },
    dni(newValue) {
      this.validarDNI(newValue);
    },
    ocupacion(newValue) {
      this.validarCampoOcupacion(newValue);
    },
    peso(newValue) {
      this.validarCampoPeso(newValue);
    },
    telefono(newValue) {
      this.validarCampoTelefono(newValue);
    },
    email(newValue) {
      if (
        newValue !== "" &&
        newValue.length <= 40 &&
        /^([a-zA-Z0-9._-]{3,}[@][a-zA-Z0-9.]{3,}[.][a-zA-Z0-9.]{2,5})*$/.test(
          newValue
        )
      ) {
        return (this.valid = false);
      } else {
        return (this.valid = true);
      }
    },
    fullName(newValue) {
      if (
        newValue === '' ||
        newValue.length < 3 || newValue.length > 200 ||
        !/^([a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+)$/.test(newValue)
      ) {
        this.valid = false;
      } else {
        this.valid = true;
      }
    },
  },
  methods: {

    validarCampoEnfermedadesCronicas(value) {
      let isValid = true;
      if (!value) {
        isValid = false;
      } else if (value.length < 3) {
        isValid = false;
      } else if (value.length > 200) {
        isValid = false;
      } else if (!/^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,200})*$/.test(value)) {
        isValid = false;
      }
      this.valid = isValid;
      return this.valid;
    },

    validarCampoDiscapacidad(value) {
      let isValid = true;
      if (!value) {
        isValid = false;
      } else if (value.length < 3) {
        isValid = false;
      } else if (value.length > 200) {
        isValid = false;
      } else if (!/^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,200})*$/.test(value)) {
        isValid = false;
      }
      this.valid = isValid;
      return this.valid;
    },

    validarCampoAntecedentesFamiliares(value) {
      let isValid = true;
      if (!value) {
        isValid = false;
      } else if (value.length < 3) {
        isValid = false;
      } else if (value.length > 200) {
        isValid = false;
      } else if (!/^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,200})*$/.test(value)) {
        isValid = false;
      }
      this.valid = isValid;
      return this.valid;
    },
    validarCampoAlergias(value) {
      let isValid = true;
      if (!value) {
        isValid = false;
      } else if (value.length < 3) {
        isValid = false;
      } else if (value.length > 200) {
        isValid = false;
      } else if (!/^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,200})*$/.test(value)) {
        isValid = false;
      }
      this.valid = isValid;
      return this.valid;
    },
    validarCampoOcupacion(value) {
      let isValid = true;
      if (!value) {
        isValid = false;
      } else if (value.length < 3) {
        isValid = false;
      } else if (value.length > 200) {
        isValid = false;
      } else if (!/^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,200})*$/.test(value)) {
        isValid = false;
      }
      this.valid = isValid;
      return this.valid;
    },

    validarDNI(value) {
      let isValid = true;
      if (!/^\d+$/.test(value)) {
        isValid = false;
      }
      else if (value <= 0) isValid = false;
      else if (value.length > 10) {
        isValid = false;
      }
      this.valid = isValid;
      return this.valid;
    },

    validarCampoPeso(value) {
      let isValid = true;
      if (!/^\d+$/.test(value)) {
        isValid = false;
      }
      else if (value <= 0) isValid = false;
      else if (value.length > 3) {
        isValid = false;
      }
      this.valid = isValid;
      return this.valid;
    },

    validarCampoTelefono(value) {
      let isValid = true;
      if (!/^\d+$/.test(value)) {
        isValid = false;
      }
      else if (value <= 0) isValid = false;
      else if (value.length > 12) {
        isValid = false;
      }
      this.valid = isValid;
      return this.valid;
    },


    seleccionarExamen(examen) {
      this.examenSeleccionado = examen;
      this.examen_estadoExamen = 'Completado';
      this.examen_tipoDeExamen = examen.tipo_de_examen;
      this.examen_resultados = examen.resultados;
      this.examen_observaciones = examen.observaciones;
      this.examen_laboratorioCentro = examen.laboratorio_centro;
      this.examen_valoresReferencia = examen.valores_referencia;
      this.modalUpdateExamen = true;

    },
    seleccionarDiagnostico(diagnostico) {
      this.diagnosticoSeleccionado = diagnostico;
      this.diagnostico_nivel_gravedad = diagnostico.gravedad;
      this.diagnostico_condicion = diagnostico.condicion;
      this.diagnostico_descripcion = diagnostico.descripcion;
      this.modalUpdateDiagnostico = true;

    },
    seleccionarTratamiento(tratamiento) {
      this.tratamientoSeleccionado = tratamiento;
      this.modalUpdateTratamiento = true;
    },
    seleccionarMedicamento(medicamento) {
      this.medicamentoSeleccionado = medicamento;
      this.modalUpdateMedicamento = true;
    },
    seleccionarUrgencias(paciente, id_paciente) {
      this.pacienteSeleccionado = { ...paciente, id_paciente };
      console.log('paciente seleccionado:', this.pacienteSeleccionado);
      this.modalUrgencias = true;
    },
    seleccionarHospitalizacion(paciente, id_paciente) {
      this.pacienteSeleccionado = { ...paciente, id_paciente };
      console.log('paciente seleccionado:', this.pacienteSeleccionado);
      this.modalHospitalizacion = true;
    },
    verDetallesDeEmergencia(emergencia) {
      this.emegenciasPaciente = emergencia;
      this.modalDetallesEmergencias = true;
    },
    verDetallesDeHospitalizacion(hospitalizacion) {
      this.hospitalizacionesPaciente = hospitalizacion;
      this.modalDetallesHospitalizacion = true;
    },
    openModals(modalType, value) {
      console.log(modalType, value);
      if (modalType === 'diagnosticos') {
        this.modalDiagnosticos = true;
      } else if (modalType === 'examenes') {
        this.modalExamenes = value;
      } else if (modalType === 'tratamientos') {
        this.modalTratamientos = value;
      } else if (modalType === 'medicamentos') {
        this.modalMedicamentos = value;
      }
    },
    estadoHospitalizadoPaciente(hospitalizaciones) {
      if (hospitalizaciones && hospitalizaciones.length === 0) return false;
      if (hospitalizaciones && hospitalizaciones.length > 0) {
        const estaHospitalizado = hospitalizaciones.some(hospitalizacion => hospitalizacion.estado === 'Activo');
        return estaHospitalizado
      }
    },
    estadoEmergenciaPaciente(emergencias) {
      if (emergencias && emergencias.length === 0) return false;
      if (emergencias && emergencias.length > 0) {
        const estaEmergencia = emergencias.some(emergencias => emergencias.estado_emergencia === 'Activo');
        return estaEmergencia
      }
    },
    generatePDF() {
      this.$refs.html2Pdf.generatePdf();
    },
    generatePacientePDF(paciente) {
      this.dataUser = paciente;
      console.log("enviando todos los pacientes: ", this.dataUser);
      this.$refs.html2Pdf.generatePdf();
    },
    checkDate(date) {
      var currentDate = new Date();
      console.log("current date: " + date)
      const CINCO_MIN = 5 * 60 * 1000;
      // const UNA_HORA=60 *60 * 1000;
      // const VENTICUATRO_HORAS=1 * 24 * 60 * 60 * 1000;
      if ((currentDate - new Date(date)) > CINCO_MIN) {
        console.log("no puede editar porque han pasado las 24 horas: ", date)
        this.canEdit = false;
      } else {
        console.log("puede editar porque no han pasado las 24 horas: ", date)
        this.canEdit = true;
      }
    },
    salidaFecha(salida) {
      return moment(salida).format('DD-MM-YYYY')
    },
    entradaFecha(entrada) {
      return moment(entrada).format('DD-MM-YYYY')
    },
    workerView(typeView) {
      this.viewType = typeView
    },
    userDetail(user) {
      console.log('detalles: ', user);

      this.modalDetailUser = true;
      this.dataUser = user;
      if (this.dataUser.nacionalidad === 'V') {
        this.nacionalidadUser = "Venezolano/a"
      } else if (this.dataUser.nacionalidad === 'J') {
        this.nacionalidadUser = "Jurídico"
      } else {
        this.nacionalidadUser = "Extranjero/a"
      }
    },
    readFileAsync(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
      });
    },
    AllPacientes() {
      // console.log('id doctoez;',   this.$store.state.user);

      this.$apollo
        .query({
          query: MIS_PACIENTES_QUERY,
          fetchPolicy: "network-only",
          variables: {
            id_doctor: this.$store.state.user.doctor_id
          }
        })
        .then((response) => {
          this.loaderUser = false;
          // console.log(response.data.doctorPacientes);
          this.users = Object.assign([], response.data.doctorPacientes.pacientes);
        })
        .catch((err) => {
          this.loaderUser = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    addPaciente() {
      this.loader = true;
      if (this.nacionalidad === 'V') this.nacionalidadUser = 'Venezolano/a';
      else if (this.nacionalidad === 'J') this.nacionalidadUser = 'Jurídico';
      else this.nacionalidadUser = 'Extranjero/a';

      this.$apollo
        .mutate({
          mutation: ADDPACIENTE_MUTATION,
          variables: {
            input: {
              enfermedades_cronicas: this.enfermedades_cronicas,
              peso: parseInt(this.peso),
              vacunas: this.vacunasSeleccionadas.value,
              discapacidad: this.discapacidad,
              antecedentes_familiares: this.antecedentes_familiares,
              tipo_de_sangre: this.sangreSeleccionada.value,
              alergias: this.alergias,
              fk_doctor_id: this.$store.state.user.doctor_id,
              fk_cdi_id: this.$store.state.user.cdi_id,
              personaInput: {
                fk_cdi_id: this.$store.state.user.cdi_id,
                estado_civil: this.estadoCivilSeleccionado.value,
                ocupacion: this.ocupacion,
                nacionalidad: this.nacionalidadUser,
                nombre1: this.fullName,
                sexo: this.sexo,
                edad: parseInt(this.edad),
                cedula_identidad: parseInt(this.dni),
                telefonoInput: {
                  codigo: this.codigo,
                  numero: this.telefono
                },
                correoInput: {
                  correo: this.correo || ''
                },
                direccionInput: {
                  codigo_postal: this.codigo_postal,
                  punto_referencia: this.punto_referencia,

                  parroquia: this.ciudad,
                  numero_casa: this.numero,
                  calle: this.calle,
                  sector: this.sector
                }
              }
            }
          },
        })
        .then((response) => {
          this.loader = false;
          this.fullName = "";
          this.calle = "";
          this.numero = "";
          this.sector = "";
          this.estado = { label: 'Anzoátegui', value: 2 }
          this.ciudad = ""
          this.email = "";
          this.dni = "";
          this.telefono = "";
          this.direccion = "";
          this.password = "";
          this.highlight = "";
          this.viewType = "userList"
          this.AllPacientes();
          this.$q.notify({
            message: "Paciente añadido",
            color: "positive",
          });
          this.$emit("updateUsers", {
            users: true,
          });
        })
        .catch((err) => {
          this.loader = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    addConsulta() {
      this.modalAddConsulta = true
    },
    // AllConsultas(){
    //   this.$apollo
    //     .query({
    //       query: MIS_CONSULTAS_QUERY,
    //       fetchPolicy: "network-only",
    //     })
    //     .then((response) => {
    //       this.loaderUser = false;
    //       console.log(response.data.MisConsultas);
    //       this.consultas = Object.assign([], response.data.MisConsultas);
    //     })
    //     .catch((err) => {
    //       this.loaderUser = false;
    //       this.$q.notify({
    //         message: err.message.split("GraphQL error:"),
    //         color: "negative",
    //       });
    //     });
    // },
    ActualizarEstadoConsulta(consulta, estado) {
      this.loader = true;
      return this.$apollo
        .mutate({
          mutation: UPDDATE_ESTADO_CONSULTA_MUTATION,
          variables: {
            id_consulta: consulta.id_consulta,
            estado_consulta: estado
          },
        })
        .then((response) => {
          this.loader = false;
          this.modalDetailUser = false;
          this.modalUpdateConsulta = false;
          this.AllPacientes()
          this.$q.notify({
            message: "Consulta actualizada",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          console.log("error: ", err);
        });
    },
    ActualizarEstadoEmergencia(emergencia, estado) {
      this.loader = true;
      return this.$apollo
        .mutate({
          mutation: UPDDATE_ESTADO_EMERGENCIA_MUTATION,
          variables: {
            id_emergencia: emergencia.id_emergencia,
            estado_emergencia: estado
          },
        })
        .then((response) => {
          this.loader = false;
          this.modalDetailUser = false;
          this.modalDetallesEmergencias = false;
          this.emegenciasPaciente = [];

          this.AllPacientes()
          this.$q.notify({
            message: "Paciente en emergencia actualizado",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          console.log("error: ", err);
        });
    },
    ActualizarEstadoHospitalizacion(hospitalizacion, estado) {
      this.loader = true;
      return this.$apollo
        .mutate({
          mutation: UPDDATE_ESTADO_HOSPITALIZACION_MUTATION,
          variables: {
            id_hospitalizacion: hospitalizacion.id_hospitalizacion,
            estado: estado
          },
        })
        .then((response) => {
          this.loader = false;
          this.modalDetailUser = false;
          this.modalDetallesHospitalizacion = false;
          this.hospitalizacionesPaciente = [];
          this.AllPacientes()
          this.$q.notify({
            message: "Paciente dado de alta",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          console.log("error: ", err);
        });
    },
    ActualizarEstadoMedicamento(medicamento, estado) {
      this.loader = true;
      return this.$apollo
        .mutate({
          mutation: UPDDATE_ESTADO_MEDICAMENTO_MUTATION,
          variables: {
            id_medicamento: medicamento.id_medicamento,
            estado_tratamiento: estado
          },
        })
        .then((response) => {
          this.loader = false;
          this.modalDetailUser = false;
          this.modalMedicamentos = false;
          this.AllPacientes()
          this.$q.notify({
            message: "Medicamento actualizado",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          console.log("error: ", err);
        });
    },
    ActualizarEstadoTratamiento(tratamiento, estado) {
      this.loader = true;
      return this.$apollo
        .mutate({
          mutation: UPDDATE_ESTADO_TRATAMIENTO_MUTATION,
          variables: {
            id_tratamiento: tratamiento.id_tratamiento,
            estado: estado
          },
        })
        .then((response) => {
          this.loader = false;
          this.modalDetailUser = false;
          this.modalTratamientos = false;
          this.modalUpdateTratamiento = false;
          this.AllPacientes()
          this.$q.notify({
            message: "Tratamiento actualizado",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          console.log("error: ", err);
        });
    },
    NuevaEmergencia() {
      this.loader = true;
      return this.$apollo
        .mutate({
          mutation: ADD_EMERGENCIA_MUTATION,
          variables: {
            input: {
              motivo_emergencia: this.emergencia_motivoEmergencia,
              diagnostico_provisional: this.emergencia_diagnosticoProvisional,
              estado_paciente: this.emergencia_estadoPaciente,
              procesamiento_realizado: this.emergencia_procesamientoRealizado,
              tiempo_atencion: parseInt(this.emergencia_tiempoAtencion),
              notas_de_atencion: this.emergencia_notasDeAtencion,
              destino: this.emergencia_destino,
              estado_emergencia: 'Activo',
              fk_doctor_id: this.$store.state.user.doctor_id,
              fk_cdi_id: this.$store.state.user.cdi_id,
              fk_paciente_id: this.pacienteSeleccionado.id_paciente
            },
          }
        })
        .then((response) => {
          this.loader = false;
          this.modalDetailUser = false;
          this.modalUrgencias = false;
          this.pacienteSeleccionado = {};
          this.emergencia_destino = '';
          this.emergencia_diagnosticoProvisional = '';
          this.emergencia_estadoPaciente = '';
          this.emergencia_procesamientoRealizado = '';
          this.emergencia_tiempoAtencion = null;
          this.emergencia_notasDeAtencion = '';
          this.emergencia_motivoEmergencia = '';
          this.AllPacientes()
          this.$q.notify({
            message: "Paciente enviado a emergencias",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          console.log("error: ", err);
        });
    },
    NuevaHospitalizacion() {
      this.loader = true;


      // validar que la fecha de ingreso no sea menor a la fecha actual
      const fechaIngreso = moment(this.hospitalizacion_fechaIngreso);
      const fechaActual = moment();

      if (fechaIngreso.isBefore(fechaActual)) {
        this.$q.notify({
          message: "La fecha de ingreso no puede ser menor a la fecha actual",
          color: "negative",
        });
        return
      }
      // validar que la fecha de ingreso y egreso no sean iguales
      if (this.hospitalizacion_fechaIngreso === this.hospitalizacion_fechaEgreso) {
        this.$q.notify({
          message: "La fecha de ingreso y egreso no pueden ser iguales",
          color: "negative",
        });
        return
      }

      if (!this.hospitalizacion_fechaIngreso || !this.hospitalizacion_fechaEgreso) {
        this.$q.notify({
          message: "Debes ingresar una fecha de ingreso y egreso",
          color: "negative",
        });
        return
      }

      // validar que la fecha de ingreso sea menor a la fecha de egreso
      if (this.hospitalizacion_fechaIngreso > this.hospitalizacion_fechaEgreso) {
        this.$q.notify({
          message: "La fecha de ingreso no puede ser mayor a la fecha de egreso",
          color: "negative",
        });
        return
      }

      return this.$apollo
        .mutate({
          mutation: ADD_HOSPITALIZACION_MUTATION,
          variables: {
            input: {
              fecha_ingreso: this.hospitalizacion_fechaIngreso,
              fecha_egreso: this.hospitalizacion_fechaEgreso,
              motivo_de_hospitalizacion: this.hospitalizacion_motivoDeHospitalizacion,
              unidad_hospitalaria: this.hospitalizacion_unidadHospitalaria,
              estado: 'Activo',
              notas_medicas: this.hospitalizacion_notasMedicas,
              fk_doctor_id: this.$store.state.user.doctor_id,
              fk_cdi_id: this.$store.state.user.cdi_id,
              fk_paciente_id: this.pacienteSeleccionado.id_paciente
            }
          },
        })
        .then((response) => {
          this.loader = false;
          this.modalDetailUser = false;
          this.pacienteSeleccionado = {};
          this.modalHospitalizacion = false;
          this.hospitalizacion_fechaIngreso = '';
          this.hospitalizacion_fechaEgreso = '';
          this.hospitalizacion_motivoDeHospitalizacion = '';
          this.hospitalizacion_unidadHospitalaria = '';
          this.hospitalizacion_estado = '';
          this.hospitalizacion_notasMedicas = '';
          this.AllPacientes()
          this.$q.notify({
            message: "Paciente marcado a hospitalizado",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          console.log("error: ", err);
        });
    },
    ActualizarConsulta() {
      this.$apollo
        .mutate({
          mutation: UPDATE_CONSULTA_MUTATION,
          variables: {
            input: {
              tipo_consulta: this.tipo_consulta.value || 'General',
              motivo_consulta: this.motivo_consulta,
              sintomas: this.sintomas_consulta,
              notas_medicas: this.notas_medicas,
              fecha_consulta: this.ingresoSalida,
              fk_doctor_id: this.$store.state.user.doctor_id,
              fk_cdi_id: this.$store.state.user.cdi_id,
              fk_paciente_id: this.dataUser.id_paciente
            },

          },
        })
        .then((response) => {
          this.loader = false;
          this.salida = "";
          this.ingreso = "";
          this.diagnostico = "";
          this.tipo_consulta = '';
          this.motivo_consulta = '';
          this.sintomas_consulta = '';
          this.notas_medicas = '';
          this.modalAddConsulta = false;
          this.modalDetailUser = false;
          this.ingresoSalida = {};
          this.fecha = "";
          this.AllPacientes()
          this.$q.notify({
            message: "Nueva consulta añadida",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    actualizarDiagnostico() {
      this.$apollo
        .mutate({
          mutation: UPDDATE_DIAGNOSTICO_MUTATION,
          variables: {
            id_diagnostico: this.diagnosticoSeleccionado.id_diagnostico,
            input: {
              condicion: this.diagnostico_condicion,
              descripcion: this.diagnostico_descripcion,
              gravedad: this.diagnostico_nivel_gravedad,
              fk_doctor_id: this.$store.state.user.doctor_id,
              fk_cdi_id: this.$store.state.user.cdi_id,
              fk_paciente_id: this.dataUser.id_paciente
            },

          },
        })
        .then((response) => {
          this.loader = false;
          this.modalAddDiagnostico = false;
          this.modalDetailUser = false;
          this.modalDiagnosticos = false;
          this.modalUpdateDiagnostico = false;
          this.diagnostico_condicion = '';
          this.diagnostico_nivel_gravedad = '';
          this.diagnostico_descripcion = '';
          this.AllPacientes()
          this.$q.notify({
            message: "Nueva consulta añadida",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    añadirConsul() {

      // validar que la fecha de inicio sea apartir de la fecha actual, no es valido el dia anterior
      const fechaInicio = moment(this.ingresoSalida).startOf("day");
      const fechaActual = moment().startOf("day");

      if (fechaInicio.isBefore(fechaActual)) {
        this.$q.notify({
          message: "La fecha de inicio no puede ser menor a la fecha actual",
          color: "negative",
        });
        return;
      }
      this.$apollo
        .mutate({
          mutation: ADDCONSULTA_MUTATION,
          variables: {
            input: {
              tipo_consulta: this.tipo_consulta.value || 'General',
              motivo_consulta: this.motivo_consulta,
              sintomas: this.sintomas_consulta,
              notas_medicas: this.notas_medicas,
              fecha_consulta: this.ingresoSalida,
              fk_doctor_id: this.$store.state.user.doctor_id,
              fk_cdi_id: this.$store.state.user.cdi_id,
              fk_paciente_id: this.dataUser.id_paciente
            },

          },
        })
        .then((response) => {
          this.loader = false;
          this.salida = "";
          this.ingreso = "";
          this.diagnostico = "";
          this.tipo_consulta = '';
          this.motivo_consulta = '';
          this.sintomas_consulta = '';
          this.notas_medicas = '';
          this.modalAddConsulta = false;
          this.modalDetailUser = false;
          this.ingresoSalida = "";
          this.fecha = "";
          this.AllPacientes()
          this.$q.notify({
            message: "Nueva consulta añadida",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    añadirDiagnostico() {
      this.loader = true;
      this.$apollo
        .mutate({
          mutation: ADDDIAGNOSTICO_MUTATION,
          variables: {
            input: {
              condicion: this.diagnostico_condicion,
              descripcion: this.diagnostico_descripcion,
              gravedad: this.diagnostico_nivel_gravedad,
              fk_doctor_id: this.$store.state.user.doctor_id,
              fk_cdi_id: this.$store.state.user.cdi_id,
              fk_paciente_id: this.dataUser.id_paciente
            },
          },
        })
        .then((response) => {
          this.loader = false;
          this.modalAddDiagnostico = false;
          this.modalDetailUser = false;
          this.modalDiagnosticos = false;
          this.diagnostico_condicion = '';
          this.diagnostico_nivel_gravedad = '';
          this.diagnostico_descripcion = '';
          this.AllPacientes()
          this.$q.notify({
            message: "Has hecho un diagnostico nuevo",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    añadirExamen() {
      this.loader = true;
      this.$apollo
        .mutate({
          mutation: ADDEXAMEN_MUTATION,
          variables: {
            input: {
              tipo_de_examen: this.examen_tipoDeExamen,
              descripcion: this.examen_descripcion,
              // resultados: this.examen_resultados,
              // valores_referencia: this.examen_valoresReferencia,
              estado_examen: 'Pendiente',
              laboratorio_centro: this.examen_laboratorioCentro,
              observaciones: this.examen_observaciones,
              fk_doctor_id: this.$store.state.user.doctor_id,
              fk_paciente_id: this.dataUser.id_paciente
            },
          },
        })
        .then((response) => {
          this.loader = false;
          this.modalAddDiagnostico = false;
          this.modalDetailUser = false;
          this.modalAddExamen = false;
          this.modalExamenes = false;
          this.examen_tipoDeExamen = '';
          this.examen_descripcion = '';
          this.examen_resultados = '';
          this.examen_estadoExamen = '';
          this.examen_laboratorioCentro = '';
          this.examen_valoresReferencia = '';
          this.examen_observaciones = '';
          this.AllPacientes()
          this.$q.notify({
            message: "Has agregado un nuevo examen",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    actualizarExamen() {
      this.loader = true;
      this.$apollo
        .mutate({
          mutation: UPDDATE_EXAMEN_MUTATION,
          variables: {
            id_examenes: this.examenSeleccionado.id_examenes,
            input: {
              resultados: this.examen_resultados,
              valores_referencia: this.examen_valoresReferencia,
              estado_examen: this.examen_estadoExamen,
              observaciones: this.examen_observaciones,
              tipo_de_examen: this.examen_tipoDeExamen,
              fk_doctor_id: this.$store.state.user.doctor_id,
              fk_paciente_id: this.dataUser.id_paciente
            },
          },
        })
        .then((response) => {
          this.loader = false;
          this.modalUpdateExamen = false;
          this.modalDetailUser = false;
          this.examen_resultados = '';
          this.examen_estadoExamen = '';
          this.examen_observaciones = '';
          this.examen_tipoDeExamen = '';
          this.examen_laboratorioCentro = '';
          this.modalExamenes = false;
          this.examen_valoresReferencia = '';
          this.modalUpdateExamen = false;
          this.AllPacientes()
          this.$q.notify({
            message: "Examen en curso actualizado",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    añadirTratamiento() {
      this.loader = true;
      // validar que la fecha de inicio sea menor a la fecha de finalizacion
      // la fecha de inicio no puede ser menor a la fecha actual
      const fechaInicio = moment(this.tratamiento_fechaInicio);
      const fechaActual = moment();

      if (fechaInicio.isBefore(fechaActual)) {
        this.$q.notify({
          message: "La fecha de inicio no puede ser menor a la fecha actual",
          color: "negative",
        });
        return;
      }


      if (this.tratamiento_fechaInicio > this.tratamiento_fechaCulminacion) {
        this.$q.notify({
          message: "La fecha de inicio no puede ser mayor a la fecha de finalizacion",
          color: "negative",
        });
        return;
      }
      this.$apollo
        .mutate({
          mutation: ADDTRATAMIENTO_MUTATION,
          variables: {
            input: {
              tipo_de_tratamiento: this.tratamiento_tipoDeTratamiento,
              fecha_inicio: this.tratamiento_fechaInicio,
              fecha_culminacion: this.tratamiento_fechaCulminacion,
              estado: 'Activo', //Terminado
              detalles: this.tratamiento_detalles,
              fk_doctor_id: this.$store.state.user.doctor_id,
              fk_paciente_id: this.dataUser.id_paciente
            },
          },
        })
        .then((response) => {
          this.loader = false;
          this.modalAddDiagnostico = false;
          this.modalDetailUser = false;
          this.modalDiagnosticos = false;
          this.modalAddTratamiento = false;
          this.modalTratamientos = false;
          this.tratamiento_tipoDeTratamiento = '';
          this.tratamiento_fechaInicio = '';
          this.tratamiento_fechaCulminacion = '';
          this.tratamiento_estado = '';
          this.tratamiento_detalles = '';
          this.AllPacientes()
          this.$q.notify({
            message: "Tratamiento agregado",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    añadirMedicamento() {
      this.loader = true;
      const fechaInicio = moment(this.medicamento_fechaInicio);
      const fechaActual = moment();

      if (fechaInicio.isBefore(fechaActual)) {
        this.$q.notify({
          message: "La fecha de inicio no puede ser menor a la fecha actual",
          color: "negative",
        });
        return;
      }


      if (this.medicamento_fechaInicio > this.medicamento_fechaFin) {
        this.$q.notify({
          message: "La fecha de inicio no puede ser mayor a la fecha de finalizacion",
          color: "negative",
        });
        return;
      }
      this.$apollo
        .mutate({
          mutation: ADDMEDICAMENTO_MUTATION,
          variables: {
            input: {
              nombre: this.medicamento_nombre,
              dosis: this.medicamento_dosis,
              via_administracion: this.medicamento_viaAdministracion,
              frecuencia: this.medicamento_frecuencia,
              duracion: this.medicamento_duracion,
              observaciones: this.medicamento_observaciones,
              principio_activo: this.medicamento_principioActivo,
              estado_tratamiento: 'Activo',
              tipo_medicamento: this.medicamento_tipoMedicamento,
              contraindicaciones: this.medicamento_contraindicaciones,
              efectos_secundarios: this.medicamento_efectosSecundarios,
              fecha_inicio: this.medicamento_fechaInicio,
              fecha_fin: this.medicamento_fechaFin,
              fk_doctor_id: this.$store.state.user.doctor_id,
              fk_paciente_id: this.dataUser.id_paciente
            },
          },
        })
        .then((response) => {
          this.loader = false;
          this.modalAddDiagnostico = false;
          this.modalDetailUser = false;
          this.modalDiagnosticos = false;
          this.modalAddMedicamento = false;
          this.modalMedicamentos = false;
          this.medicamento_nombre = '';
          this.medicamento_dosis = '';
          this.medicamento_viaAdministracion = '';
          this.medicamento_frecuencia = '';
          this.medicamento_duracion = '';
          this.medicamento_principioActivo = '';
          this.medicamento_estadoTratamiento = 'Activo';
          this.medicamento_tipoMedicamento = '';
          this.medicamento_contraindicaciones = '';
          this.medicamento_efectosSecundarios = '';
          this.medicamento_observaciones = '';
          this.medicamento_fechaInicio = '';
          this.medicamento_fechaFin = '';

          this.AllPacientes()
          this.$q.notify({
            message: "Medicamento asignado",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    clearData() {
      this.salida = "";
      this.ingreso = "";
      this.diagnostico = "";
      this.ingresoSalida = {};
      this.fecha = "";
    },
    updateConsulModal(data) {
      this.tipo_consulta = data.tipo_consulta;
      this.motivo_consulta = data.motivo_consulta;
      this.sintomas_consulta = data.sintomas;
      this.notas_medicas = data.notas_medicas;
      this.ingresoSalida = moment(data.ingreso).format('YYYY/MM/DD  ');
      this.idConsulta = data.id_consulta
      this.modalUpdateConsulta = true;
    },
    updateConsulta() {
      this.loader = true;
      const data = {
        id: this.idConsulta,
        diagnostico: this.diagnostico,
        ingreso: this.ingreso,
        salida: this.salida,
      };
      return this.$apollo
        .mutate({
          mutation: UPDDATE_CONSULTA_MUTATION,
          variables: {
            id_consulta: this.idConsulta,
            input: {
              tipo_consulta: this.tipo_consulta,
              motivo_consulta: this.motivo_consulta,
              sintomas: this.sintomas_consulta,
              notas_medicas: this.notas_medicas,
              estado_consulta: this.estado_consulta,
              fecha_consulta: this.ingresoSalida,
              fk_doctor_id: this.$store.state.user.doctor_id,
              fk_cdi_id: this.$store.state.user.cdi_id,
              fk_paciente_id: this.dataUser.id_paciente
            },
          },
        })
        .then((response) => {
          this.loader = false;
          this.salida = "";
          this.ingreso = "";
          this.diagnostico = "";
          this.tipo_consulta = '';
          this.motivo_consulta = '';
          this.sintomas_consulta = '';
          this.notas_medicas = '';
          this.modalAddConsulta = false;
          this.modalUpdateConsulta = false;
          this.modalDetailUser = false;
          this.ingresoSalida = "";
          this.fecha = "";
          this.AllPacientes()
          this.$q.notify({
            message: "Consulta actualizada",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          console.log("error: ", err);
        });
    },
    deleteWorker(workerID) {
      console.log(workerID)
      this.workerID = workerID;
      this.deleteUserModal = true;
    },
    workerDelete(workerID) {
      console.log(workerID);
      this.$apollo
        .mutate({
          mutation: USER_DELETE,
          variables: {
            id: workerID,
          },
        })
        .then((response) => {
          this.$q.notify({
            message: "Doctor eliminado",
            color: "positive",
          });
          this.deleteUserModal = false;
          this.$emit("updateUsers", {
            users: true,
          });
          this.viewType = "userList";
          this.AllDoctores();
        })
        .catch((err) => {
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    buscarUsuario(dni) {
      const paciente = this.users.filter((paciente) => paciente.persona.cedula_identidad === dni)
      if (paciente.length !== 0) {
        this.dataUser = paciente[0];
        this.modalDetailUser = true;
      } else {
        this.$q.notify({
          message: "Este paciente no existe",
          color: "negative",
        });
      };
      this.dni = "";
    },
  },
};
</script>
