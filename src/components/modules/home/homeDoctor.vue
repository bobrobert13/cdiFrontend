<template>
  <div class="row justify-center">

    <div class="col-12 bg-white" style="min-height: 85vh; border-radius: 20px">
      <q-scroll-area class=" q-mb-md" :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 80vh">
        <div class="row justify-center">
          <div class="col-10" v-if="viewType === 'userList'">
            <div class="row justify-center">
              <div class="col self-center text-right">
              </div>
              <div class="col q-pa-md self-center text-right">
                <q-icon style="cursor: pointer" @click="workerView('searchUser')" name="mdi-account-search"
                  class="text-primary q-mr-md" size="md"></q-icon>
                <q-icon style="cursor: pointer" @click="workerView('addWorker')" name="mdi-plus q-mr-md"
                  class="text-primary" size="md"></q-icon>

              </div>
            </div>
            <div class="row justify-center" v-if="this.users.length !== 0">
              <div class="col-12 text-left q-mb-md">
                <p class="text-h6 text-weight-light ">Tu lista de pacientes:</p>
              </div>
              <div class="col-12 q-mb-sm" v-for="(user, index) in users" :key="index">
                <q-list class="rounded-borders bg-grey-2" style="border-radius: 15px">
                  <q-item v-if="user.persona" >
                    <q-item-section top class=" q-py-md" style="cursor: pointer">
                        <div class="row">
                          <div class="col-6 q-mb-xs">
                            <q-item-label class="text-left" lines="1">
                              <span class="text-weight-medium">Nombre:</span> {{ user.persona.nombre1 }} {{ user.persona.apellido1 }}
                            </q-item-label>
                          </div>
                          <div class="col-6 q-mb-xs">
                            <q-item-label class="text-right" lines="1">
                              <span class="text-weight-medium">Edad:</span> {{ user.persona.edad }} años
                            </q-item-label>
                          </div>
                          <div class="col-6 q-mb-xs">
                            <q-item-label class="text-left" lines="1">
                              <span class="text-weight-medium">Nacionalidad:</span> {{ user.persona.nacionalidad }}
                            </q-item-label>
														 <q-item-label class="text-left" lines="1">
                              <span class="text-weight-medium">Documento:</span>  {{ user.persona.cedula_identidad }}
                            </q-item-label>
                          </div>
                          <div class="col-6 q-mb-xs">
                            <q-item-label class="text-right" lines="1">
                              <span class="text-weight-medium">Sexo:</span> {{ user.persona.sexo }}
                            </q-item-label>
                            <q-item-label class="text-right" lines="1">
                              <span class="text-weight-medium">Telefono:</span> {{ user.persona.telefono.codigo }}-{{ user.persona.telefono.numero }}
                            </q-item-label>
                          </div>
                        </div>
                      <q-separator spaced color="blue-grey" />
                      <q-item-label class="text-left" lines="1">
                        <div class="row col-12 items-center self-center no-wrap ">

                          <small v-if="!estadoEmergenciaPaciente(user.emergencias)"
                            @click="seleccionarUrgencias(user.persona, user.id_paciente)" lines="2"
                            class=" q-mr-lg cursor-pointer text-red-9 self-center text-bold" style="cursor: pointer">
                            <q-icon name="mdi-alert" /> Enviar a emergencias
                          </small>
                          <small v-else @click="verDetallesDeEmergencia(user.emergencias)" lines="2"
                            class=" q-mr-sm cursor-pointer text-red-9  self-center text-bold" style="cursor: pointer">
                            <q-icon name="mdi-information" /> Paciente en emergencias
                          </small>
                          <small v-if="!estadoHospitalizadoPaciente(user.hospitalizaciones)"
                            @click="seleccionarHospitalizacion(user.persona, user.id_paciente)" lines="2"
                            class=" q-mr-sm cursor-pointer text-primary self-center text-bold" style="cursor: pointer">
                            <q-icon name="mdi-hospital" /> Marcar como hospitalizado
                          </small>

                          <small v-else @click="verDetallesDeHospitalizacion(user.hospitalizaciones)" lines="2"
                            class=" q-mr-sm cursor-pointer text-orange-9 self-center text-bold" style="cursor: pointer">
                            <q-icon name="mdi-information" /> Paciente hospitalizado
                          </small>

                        </div>
                      </q-item-label>
                      <q-item-section  class="q-mt-md row no-wrap q-gutter-y-xs">
                        <button type="button"
                          class="no-outline no-border q-px-md q-py-xs rounded-borders bg-primary text-white cursor-pointer"
                          @click="userDetail(user)"><q-icon name="mdi-eye" class="q-mr-sm" /> Inspeccionar
                          paciente</button>

													<button type="button"
                          class="no-outline no-border q-px-md q-py-xs rounded-borders bg-blue-grey text-white cursor-pointer"
                         @click="generatePacientePDF(user)"><q-icon name="mdi-printer" class="q-mr-sm" />Descargar ficha del paciente</button>
                      </q-item-section>
                    </q-item-section>

                  </q-item>
                </q-list>
								<hr class="q-my-md ">
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


            <!-- CREACION DE NUEVO PACIENTE -->

            <div v-if="viewType === 'addWorker'">
              <div class="col-12 text-left row items-center q-mt-md q-mb-lg">
                <q-icon style="cursor: pointer" @click="workerView('userList')" name="mdi-arrow-left"
                  class="text-primary" size="md"></q-icon>
                <span style="cursor: pointer" class="text-bold text-accent text-h6"
                  @click="workerView('userList')">Crear nuevo paciente</span>
              </div>
              <small class="q-my-md block text-red text-bold"> <q-icon name="mdi-information" class="q-mr-xs" size="sm"
                  color="primary" /> Los campos marcados con * son obligatorios</small>
              <div class=" col-7">
                <div class="column justify-center">
									                   <div class="row">
                      <div class="col-2">
                        <q-select filled v-model="nacionalidad" :options="nacionalidades" option-label="label"
                          option-value="value" emit-value />
                      </div>
                      <div class="col-10">
                        <q-input filled color="deep-purple-6" type="number" v-model="dni" @blur="obtenerInformacionPersonaRegistrada" :rules="dniRules"
                          label="Cédula*" />
                      </div>
                    </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                    <q-input filled color="deep-purple-6" v-model="fullName" label="Nombre completo*"
                      :rules="fullNameRules" />
                  </div>
                  <div class="row q-pb-xs">
                    <div class="col-12">
                      <q-input type="email" filled v-model="correo" label="Correo electrónico*" :rules="emailRules" />
                    </div>
                  </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pb-xs">

                    <div class="row ">
                      <div class="col-md-8 col-xl-8 col-lg-8 col-sm-12 col-xs-12">
                        <q-select filled label="Estado*" v-model="estado" :options="estados" option-label="label"
                          option-value="value" />
                      </div>
                      <div class="col-md-4 col-xl-4 col-lg-4  col-sm-12 col-xs-12">
                        <q-select filled label="Ciudad*" v-model="ciudad" :options="ciudades[estado.value]"
                          option-label="label" option-value="value" emit-value :rules="requiredSelectRules" />
                      </div>
                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                      <div class="row q-mt-xs q-pb-xs">
                        <div class="col-8">
                          <q-input filled color="deep-purple-6" v-model="calle" label="Calle*" :rules="streetRules" />
                        </div>
                        <div class="col-4">
                          <q-input filled color="deep-purple-6" v-model="numero" label="Número de casa*" type="number"
                            :rules="houseNumberRules" />
                        </div>
                      </div>
                      <div class="col-xl-8 col-lg-8 col-md-8 q-pb-xs col-sm-12 col-xs-12 ">
                        <q-input filled color="deep-purple-6" v-model="sector" label="Sector*" :rules="sectorRules" />
                      </div>
                      <div class="col-xl-8 col-lg-8 col-md-8 q-pb-xs col-sm-12 col-xs-12 ">
                        <q-input filled color="deep-purple-6" v-model="punto_referencia" label="Punto de referencia*"
                          :rules="referencePointRules" />
                      </div>
                      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                        <q-input filled color="deep-purple-6" type="number" v-model="codigo_postal"
                          label="Código postal*" :rules="postalCodeRules" />
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pb-xs ">
                    <q-select filled v-model="sexo" :options="sexoPaciente" label="Sexo*" option-label="label"
                      option-value="value" emit-value :rules="requiredSelectRules" />
                  </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                    <q-input filled color="deep-purple-6" v-model="edad" label="Edad*"
                      :rules="ageRules" />
                  </div>


                  <div v-if="edad < 18 && edad" class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 column ">
                    <p class=" text-weight-medium text-red q-mb-xs"><b>El paciente es menor de edad *</b></p>
                    <small>Se necesita información adicional del representante legal.</small>
                    <div class="row q-mt-sm"></div>
                      <div class="col-6">
                        <q-input filled color="deep-purple-6" v-model="documento_identidad_representante"
                          label="Documento de identidad del representante*" :rules="dniRules" />
                      </div>
                      <div class="col-6">
                        <q-input filled color="deep-purple-6" type="number" v-model="numero_orden_representante"
                          label="Número de orden del representante*" :rules="orderNumberRules" />
                      </div>
                  </div>


                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pb-xs">
                    <div class="row">
                      <div class="col-4">
                        <q-select filled v-model="codigo" :options="codigoTel" label="Codigo*" option-label="label"
                          option-value="value" emit-value />
                      </div>
                      <div class="col-8">
                        <q-input filled color="deep-purple-6" v-model="telefono" type="number"
                          label="Número de telefono*" :rules="phoneRules" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class=" col-5" style="border-left: 3px solid white;">
                <p class="text-h6 q-my-md text-weight-medium text-accent">Información adicional médica</p>

                <div class="column justify-center">
                  <div class="row ">

                  </div>
                  <div class="row q-pb-xs">
                    <div class="col-12">
                      <q-select filled label="Vacunas*" v-model="vacunasSeleccionadas" :options="vacunas"
                        option-label="label" option-value="value" :rules="requiredSelectRules" />
                    </div>

                  </div>

                  <div class="row q-pb-xs">
                    <div class="col-12">
                      <q-select filled label="Tipo de sangre*" v-model="sangreSeleccionada" :options="tipo_de_sangre"
                        :rules="requiredSelectRules" />
                    </div>

                  </div>

                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                    <div class="row  ">
                      <div class="col-12">
                        <q-input filled label="Enfermedades cronicas*" v-model="enfermedades_cronicas" :rules="[
                          (val) => !!val || 'Este campo es obligatorio',
                          (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                          (val) => val.length <= 200 || 'Máximo 200 caracteres',
                          (val) =>
                            /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                            'Solo se permiten caracteres',
                        ]" />
                      </div>

                    </div>
                    <div class="row ">
                      <div class="col-12">
                        <q-input filled label="Discapacidad*" v-model="discapacidad" :rules="[
                          (val) => !!val || 'Este campo es obligatorio',
                          (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                          (val) => val.length <= 200 || 'Máximo 200 caracteres',
                          (val) =>
                            /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                            'Solo se permiten caracteres',
                        ]" />
                      </div>

                    </div>

                    <div class="row ">
                      <div class="col-12">
                        <q-input filled label="Antecedentes familiares*" v-model="antecedentes_familiares" :rules="[
                          (val) => !!val || 'Este campo es obligatorio',
                          (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                          (val) => val.length <= 200 || 'Máximo 200 caracteres',
                          (val) =>
                            /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                            'Solo se permiten caracteres',
                        ]" />
                      </div>

                    </div>

                    <div class="row ">
                      <div class="col-12">
                        <q-input filled label="Alergias*" v-model="alergias" :rules="[
                          (val) => !!val || 'Este campo es obligatorio',
                          (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                          (val) => val.length <= 200 || 'Máximo 200 caracteres',
                          (val) =>
                            /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                            'Solo se permiten caracteres',
                        ]" />
                      </div>

                    </div>

                    <div class="row ">
                      <div class="col-12">
                        <q-input filled label="Ocupación*" v-model="ocupacion" :rules="[
                          (val) => !!val || 'Este campo es obligatorio',
                          (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                          (val) => val.length <= 200 || 'Máximo 200 caracteres',
                          (val) =>
                            /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                            'Solo se permiten caracteres',
                        ]" />
                      </div>

                    </div>

                    <div class="row ">
                      <div class="col-12">
                        <q-select filled label="Estado civil*" v-model="estadoCivilSeleccionado" :options="estado_civil"
                          :rules="requiredSelectRules" />
                      </div>

                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                      <div class="row ">
                        <div class="col-12">
                          <q-input filled color="deep-purple-6" v-model="peso" label="Peso (kg)*" type="number" :rules="[
                            (val) => !!val || 'Este campo es obligatorio',
                            (val) => val.length <= 3 || 'Máximo 3 caracteres',
                            (val) => /^\d+$/.test(val) || 'Solo se permiten números',
                          ]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="viewType === 'addWorker'" class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 q-pa-xs q-pa-xs">
              <q-btn unelevated :loading="loader" type="submit" @click="addPaciente()" :disable="!formHasNoErrors"
                class="full-width text-white bg-primary" label="Añadir paciente" />
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


          <!-- BUSCAR PACIENTE -->
          <q-dialog v-model="modals.searchUser" style="min-width: 460px">
            <q-card style="min-width: 460px" class="text-white">
              <q-bar class="bg-primary">
                <q-space />
                <q-btn dense flat icon="close" v-close-popup>
                </q-btn>
              </q-bar>
              <q-card-section>
                <div class="text-h6 text-primary">Buscar paciente</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <q-input v-model="dni" label="Escribe el DNI del paciente" />
              </q-card-section>
              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancelar" v-close-popup />
                <q-btn flat label="Buscar" :disable="!dni.length" @click="buscarUsuario(dni)" />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- FIN BUSCAR PACIENTE -->


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

									                  <div class="col-11 q-mt-md q-pa-xs">
                    <span>Fecha de ingreso emergencia:</span>
                    <q-input filled v-model="emergencia_fechaIngreso" disable label="Fecha de ingreso "></q-input>
                  </div>
                  <div class="col-1 self-center q-pa-xs q-pt-md">
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="emergencia_fechaIngreso">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </div>

                  <div class="col-11 q-pa-xs">
                    <span>Fecha de egreso emergencia:</span>
                    <q-input filled v-model="emergencia_fechaEgreso" disable label="Fecha de egreso"></q-input>
                  </div>
                  <div class="col-1 self-center q-pa-xs q-pt-md">
                    <q-btn icon="event" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="emergencia_fechaEgreso">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
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
                  this.emergencia_notasDeAtencion === '' ||
                  this.emergencia_fechaIngreso === '' ||
                  this.emergencia_fechaEgreso === ''
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
                  <div class="col-6 column">
                   
                   <p @click="downloadEmergenciesReport(user)" class=" cursor-pointer no-padding no-margin"> <q-icon name="mdi-cloud-print" size="20px" color="primary"  /> Descargar lista de diagnosticos </p>

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

														<br>
                          <q-item-label><b>Fecha de ingreso:</b> {{
                            entradaFechaHora(emergencia.fecha_ingreso)
                            }}</q-item-label>
													<q-item-label><b>Fecha de egreso:</b> {{
														salidaFechaHora(emergencia.fecha_egreso)
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
                Nueva hospitalización
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
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
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
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
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
                  <div class="col-6 column">
                    <p @click="downloadHospitalizationReport()" class=" cursor-pointer no-padding no-margin"> <q-icon name="mdi-cloud-print" size="20px" color="primary"  /> Descargar lista de hospitalizaciones </p>
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
                          <q-item-label><b>Fecha de ingreso:</b> {{ salidaFechaHora(hospitalizacion.fecha_ingreso)
                            }}</q-item-label>
                          <q-item-label><b>Fecha de egreso:</b> {{ entradaFechaHora(hospitalizacion.fecha_egreso)
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
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-separator />

              <q-card-actions align="center">
                <q-btn flat :disable="tipo_consulta === '' ||
                  motivo_consulta === '' ||
                  sintomas_consulta === '' ||
                  notas_medicas === '' ||
                  !ingresoSalida
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
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
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
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
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
                    <q-select v-model="medicamento_dosis_medida" filled label="Medida de dosis"
                      :options="opcionesMedidas" />
                  </div>
                  <div class="col-12 q-mt-xs">
                    <q-select v-model="medicamento_dosis" filled label="Dosis recomendada" :options="dosisFiltradas"
                      :disable="!medicamento_dosis_medida" />
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
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
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
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
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
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-separator />

              <q-card-actions align="center">
                <q-btn flat :disable="tipo_consulta === '' ||
                  motivo_consulta === '' ||
                  sintomas_consulta === '' ||
                  notas_medicas === '' ||
                  !ingresoSalida
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
             
                  <div class="text-overline text-h6 text-grey-9">Dianosticos al paciente </div>
                </q-card-section>
                <div v-if="dataUser.persona" class="col-5 no-margin flex flex-center no-padding">
                  <div class="text-overline text-h6 text-grey-9">{{ dataUser.persona.nombre1 }}</div>
                </div>
              </q-card-section>
              <q-card-section class="q-pt-md">
                <div class="row items-center q-px-sm justify-center">
                  <div class="col-6 column">
                     <p @click="downloadDiagnosticsReport(dataUser)" class=" cursor-pointer no-padding no-margin"> <q-icon name="mdi-cloud-print" size="20px" color="primary"  /> Descargar lista de diagnosticos </p>
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
                  <div class="col-6 column">
                    <p @click="downloadExamsReport()" class=" cursor-pointer no-padding no-margin"> <q-icon name="mdi-cloud-print" size="20px" color="primary"  /> Descargar lista de exámenes </p>
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
                  <div class="col-6 column">
                                         <p @click="downloadTreatmentsReport()" class=" cursor-pointer no-padding no-margin"> <q-icon name="mdi-cloud-print" size="20px" color="primary"  /> Descargar lista de tratamientos </p>

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
                  <div class="col-6 column">
                    <p @click="downloadMedicationsReport()" class=" cursor-pointer no-padding no-margin"> <q-icon name="mdi-cloud-print" size="20px" color="primary"  /> Descargar lista de medicamentos </p>
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
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
        :paginate-elements-by-height="1400" filename="FichaDePacienteDoctor" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="html2Pdf">
        <section slot="pdf-content">
          <historiaPdf :data="dataUser" />
        </section>
      </vue-html2pdf>
    </div>

        <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
        :paginate-elements-by-height="1400" filename="Diagnosticos_del_Paciente" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="downloadDiagnosticsReport">
        <section slot="pdf-content">
          <historiaDiagPdf :data="dataUser" />
        </section>
      </vue-html2pdf>
    </div>

            <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
        :paginate-elements-by-height="1400" filename="Examenes_del_Paciente" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="downloadExamsReport">
        <section slot="pdf-content">
          <ReporteExamenes :data="dataUser" />
        </section>
      </vue-html2pdf>
    </div>

                <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
        :paginate-elements-by-height="1400" filename="Tratamientos_del_Paciente" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="downloadTratamientosReport">
        <section slot="pdf-content">
          <ReporteTratamientos :data="dataUser" />
        </section>
      </vue-html2pdf>
    </div>


              <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
        :paginate-elements-by-height="1400" filename="Medicamentos_del_Paciente" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="downloadMedicamentosReport">
        <section slot="pdf-content">
          <ReporteMedicamentos :data="dataUser" />
        </section>
      </vue-html2pdf>
    </div>

                  <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
        :paginate-elements-by-height="1400" filename="Emergencias_del_Paciente" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="downloadEmergenciasReport">
        <section slot="pdf-content">
          <ReporteEmergencias :data="dataUser" />
        </section>
      </vue-html2pdf>
    </div>


                      <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
        :paginate-elements-by-height="1400" filename="Hospitalizaciones_del_Paciente" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="2" pdf-orientation="landscape" pdf-content-width="1050px"
        @progress="onProgress($event)" ref="downloadHospitalizacionesReport">
        <section slot="pdf-content">
          <ReporteHospitalizaciones :data="dataUser" />
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
import historiaDiagPdf from "../admin/historiaDiagPdf.vue"

import {
  useFullNameValidation,
  useEmailValidation,
  useDniValidation,
  useTextFieldValidation,
  useTextWithSpecialCharsValidation,
  useHouseNumberValidation,
  usePostalCodeValidation,
  useAgeValidation,
  usePhoneValidation,
  useWeightValidation,
  useRequiredSelectValidation,
  useChronicDiseasesValidation,
  useDisabilityValidation,
  useFamilyHistoryValidation,
  useAllergiesValidation,
  useOccupationValidation,
  useOrderNumberValidation
} from '../../../utils/validations'
import { isFormValid } from '../../../utils/formUtils'
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
import { PERSONA_POR_CEDULA_QUERY } from "src/graphql/persona";
import ReporteExamenes from "../admin/reports/reporteExamenes.vue";
import ReporteTratamientos from "../admin/reports/reporteTratamientos.vue";
import ReporteEmergencias from "../admin/reports/reporteEmergencias.vue";
import ReporteHospitalizaciones from "../admin/reports/reporteHospitalizaciones.vue";
import ReporteMedicamentos from "../admin/reports/reporteMedicamentos.vue";
export default {
  name: "homeDoctor",
    components: {
    historiaPdf,
    ReporteExamenes,
    ReporteTratamientos,
    ReporteEmergencias,
    ReporteHospitalizaciones,
    ReporteMedicamentos,
    historiaDiagPdf,
    VueHtml2pdf
  },
  computed: {
    fullNameRules() {
      return useFullNameValidation();
    },
    emailRules() {
      return useEmailValidation();
    },
    dniRules() {
      return useDniValidation();
    },
    orderNumberRules() {
      return useOrderNumberValidation();
    },
    streetRules() {
      return useTextWithSpecialCharsValidation(true, 3, 200);
    },
    houseNumberRules() {
      return useHouseNumberValidation();
    },
    sectorRules() {
      return useTextWithSpecialCharsValidation(true, 3, 100);
    },
    referencePointRules() {
      return useTextFieldValidation(true, 3, 200);
    },
    postalCodeRules() {
      return usePostalCodeValidation();
    },
    ageRules() {
      return useAgeValidation();
    },
    phoneRules() {
      return usePhoneValidation();
    },
    chronicDiseasesRules() {
      return useChronicDiseasesValidation();
    },
    disabilityRules() {
      return useDisabilityValidation();
    },
    familyHistoryRules() {
      return useFamilyHistoryValidation();
    },
    allergiesRules() {
      return useAllergiesValidation();
    },
    occupationRules() {
      return useOccupationValidation();
    },
    weightRules() {
      return useWeightValidation();
    },
    requiredSelectRules() {
      return useRequiredSelectValidation();
    },
    formHasNoErrors() {
      // Valores actuales del formulario
      const formValues = {
        fullName: this.fullName,
        correo: this.correo,
        dni: this.dni,
        calle: this.calle,
        numero: this.numero,
        sector: this.sector,
        punto_referencia: this.punto_referencia,
        codigo_postal: this.codigo_postal,
        sexo: this.sexo,
        edad: this.edad,
        telefono: this.telefono,
        ciudad: this.ciudad,
        vacunasSeleccionadas: this.vacunasSeleccionadas,
        sangreSeleccionada: this.sangreSeleccionada,
        enfermedades_cronicas: this.enfermedades_cronicas,
        discapacidad: this.discapacidad,
        documento_identidad_representante: this.documento_identidad_representante,
        numero_orden_representante: this.numero_orden_representante,
        antecedentes_familiares: this.antecedentes_familiares,
        alergias: this.alergias,
        ocupacion: this.ocupacion,
        estadoCivilSeleccionado: this.estadoCivilSeleccionado,
        peso: this.peso
      }
      // Reglas por campo
      const validationRules = {
        fullName: useFullNameValidation(),
        correo: useEmailValidation(),
        dni: useDniValidation(),
        calle: useTextFieldValidation(true),
        numero: useHouseNumberValidation(),
        sector: useTextFieldValidation(true),
        ciudad: useRequiredSelectValidation(),
        punto_referencia: useTextFieldValidation(false),
        codigo_postal: usePostalCodeValidation(),
        sexo: useRequiredSelectValidation(),
        edad: useAgeValidation(),
        ...(this.edad < 18 && {
          documento_identidad_representante: useDniValidation(),
          numero_orden_representante: useOrderNumberValidation(),
        }),
        telefono: usePhoneValidation(),
        vacunasSeleccionadas: useRequiredSelectValidation(),
        sangreSeleccionada: useRequiredSelectValidation(),
        enfermedades_cronicas: useChronicDiseasesValidation(),
        discapacidad: useDisabilityValidation(),
        antecedentes_familiares: useFamilyHistoryValidation(),
        alergias: useAllergiesValidation(),
        ocupacion: useOccupationValidation(),
        estadoCivilSeleccionado: useRequiredSelectValidation(),
        peso: useWeightValidation()
      }
      return isFormValid(formValues, validationRules)
    },
    dosisFiltradas() {
      if (!this.medicamento_dosis_medida) return [];
      return this.opcionesDosisPorMedida[this.medicamento_dosis_medida] || [];
    }
  },

  data() {
    return {

      // MODALES
      modals: {
        searchUser: false,
      },


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

      numero_orden_representante: '',
      documento_identidad_representante: '',

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
      medicamento_dosis_medida: null,
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


      opcionesMedidas: [
        'mg',
        'g',
        'mcg',
        'ml',
        'UI',
        'tabletas',
        'cápsulas',
        'gotas',
        'ampollas',
        'comprimidos',
        'supositorios',
        'parches',
        'spray',
        'sobres',
        'viales',
        'pastillas'
      ],
      opcionesDosisPorMedida: {
        mg: ["250mg", "500mg", "750mg", "100mg", "200mg", "300mg", "400mg"],
        g: ["1g", "2g", "5g"],
        mcg: ["50mcg", "100mcg", "250mcg", "500mcg"],
        ml: ["5ml", "10ml", "15ml", "20ml", "30ml"],
        UI: ["1000UI", "2000UI", "5000UI", "10000UI"],
        tabletas: ["1 tableta", "2 tabletas", "3 tabletas"],
        cápsulas: ["1 cápsula", "2 cápsulas"],
        gotas: ["5 gotas", "10 gotas", "20 gotas"],
        ampollas: ["1 ampolla", "2 ampollas"],
        comprimidos: ["1 comprimido", "2 comprimidos"],
        supositorios: ["1 supositorio"],
        parches: ["1 parche"],
        spray: ["1 spray", "2 sprays"],
        sobres: ["1 sobre"],
        viales: ["1 vial"],
        pastillas: ["1 pastilla", "2 pastillas"]
      },

      // EMERGENCIAS

      emergencia_motivoEmergencia: "",
      emergencia_diagnosticoProvisional: "",
      emergencia_estadoPaciente: "",
      emergencia_procesamientoRealizado: "",
      emergencia_tiempoAtencion: null,
      emergencia_notasDeAtencion: "",
      emergencia_destino: "",
			emergencia_fechaIngreso: '',
			emergencia_fechaEgreso: '',


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
    // ingresoSalida(newValue) {
    //   console.log(newValue)
    //   if (!newValue.to) {
    //     this.fecha = "Desde: " + newValue
    //     this.ingreso = newValue
    //     this.salida = newValue
    //   } else {
    //     this.fecha = "Desde: " + newValue.from + "| Hasta: " + newValue.to
    //     this.ingreso = newValue.from
    //     this.salida = newValue.to
    //   }
    // },
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
  watch: {
    medicamento_duracion: 'actualizarFechasMedicamento'
  },
  methods: {
		 obtenerInformacionPersonaRegistrada() {
			console.log('dni:', this.dni);
			let dniRules = useDniValidation();
			let validDni = dniRules.every(rule => rule(this.dni) === true);
			console.log('dni valido?', validDni);
			if(!validDni) return;
			this.$apollo
        .query({
					query: PERSONA_POR_CEDULA_QUERY,
					          variables: {
            cedula_identidad: parseFloat(this.dni)
          }
				}).then((response) => {
					const datosPersona = response.data.personaPorCedula;
					const { correo, telefono, direccion, doctor, paciente, ...persona} = datosPersona;
					this.limpiarTodoslosCampos();
					this.llenarCamposDePersonaExistente({correo, telefono, direccion, doctor, paciente, persona: persona});
				}).catch((err) => {
					this.limpiarTodoslosCampos();
          // this.$q.notify({
          //   message: err.message.split("GraphQL error:"),
          //   color: "negative",
          // });
        });
		},
		llenarCamposDePersonaExistente({correo, telefono, direccion, doctor, paciente, persona}) {
			this.fullName = persona.nombre1;
			this.ocupacion = persona.ocupacion;
			this.estadoCivilSeleccionado = persona.estado_civil;
			this.correo = correo.correo;
			this.ciudad = direccion.parroquia;
			this.calle = direccion.calle;
			this.numero = direccion.numero_casa;
			this.punto_referencia = direccion.punto_referencia;
			this.sector = direccion.sector;
			this.codigo_postal = direccion.codigo_postal;
			this.sexo = persona.sexo;
			this.edad = persona.edad.toString();
			this.codigo = telefono.codigo;
			this.telefono = telefono.numero;
			if (!paciente) return;
			this.vacunasSeleccionadas = paciente.vacunas;
			this.sangreSeleccionada = paciente.tipo_de_sangre;
			this.enfermedades_cronicas = paciente.enfermedades_cronicas;
			this.discapacidad = paciente.discapacidad;
			this.antecedentes_familiares = paciente.antecedentes_familiares;
			this.alergias = paciente.alergias;
			this.peso = paciente.peso.toString();
		},
		limpiarTodoslosCampos(){
			this.fullName = "";
			this.ocupacion = "";
			this.estadoCivilSeleccionado = "";
			this.correo = "";
			this.ciudad = "";
			this.calle = "";
			this.numero = "";
			this.punto_referencia = "";
			this.sector = "";
			this.codigo_postal = "";
			this.sexo = "Masculino";
			this.edad = 0;
			this.codigo = 414;
			this.telefono = "";
			this.vacunasSeleccionadas = "";
			this.sangreSeleccionada = "";
			this.enfermedades_cronicas = "";
			this.discapacidad = "";
			this.antecedentes_familiares = "";
			this.alergias = "";
			this.peso = null;
		},
    actualizarFechasMedicamento(newVal) {
      if (!newVal) {
        this.medicamento_fechaInicio = '';
        this.medicamento_fechaFin = '';
        return;
      }

      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      this.medicamento_fechaInicio = `${year}/${month}/${day}`;

      if (newVal === 'Indefinido' || newVal === 'Según indicación médica') {
        this.medicamento_fechaFin = '';
        return;
      }

      const daysMatch = newVal.match(/(\d+)\s*días?/);
      if (daysMatch) {
        const days = parseInt(daysMatch[1], 10);
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + days);
        const endYear = endDate.getFullYear();
        const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
        const endDay = String(endDate.getDate()).padStart(2, '0');
        this.medicamento_fechaFin = `${endYear}/${endMonth}/${endDay}`;
      } else {
        this.medicamento_fechaFin = '';
      }
    },

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
    },

    validarDNI(value) {
      let isValid = true;
      if (!/^\d+$/.test(value)) {
        isValid = false;
      }
      else if (value <= 0) isValid = false;
      else if (value.length > 8) {
        isValid = false;
      }
      this.valid = isValid;
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
      this.$refs.html2Pdf.generatePdf();
    },
    downloadDiagnosticsReport(dataUser) {
      this.$refs.downloadDiagnosticsReport.generatePdf();
    },
    downloadExamsReport() {
      this.$refs.downloadExamsReport.generatePdf();
    },
    downloadTreatmentsReport() {
      this.$refs.downloadTratamientosReport.generatePdf();
    },
    downloadMedicationsReport() {
      this.$refs.downloadMedicamentosReport.generatePdf();
    },
    downloadEmergenciesReport() {
      this.$refs.downloadEmergenciasReport.generatePdf();
    },
    downloadHospitalizationReport() {
      this.$refs.downloadHospitalizacionesReport.generatePdf();
    },
    checkDate(date) {
      var currentDate = new Date();
      const CINCO_MIN = 5 * 60 * 1000;
      // const UNA_HORA=60 *60 * 1000;
      // const VENTICUATRO_HORAS=1 * 24 * 60 * 60 * 1000;
      if ((currentDate - new Date(date)) > CINCO_MIN) {
        this.canEdit = false;
      } else {
        this.canEdit = true;
      }
    },
    salidaFecha(salida) {
      return moment(salida).format('DD-MM-YYYY')
    },
    entradaFecha(entrada) {
      return moment(entrada).format('DD-MM-YYYY')
    },

    salidaFechaHora(salida) {
      if (!salida) return '';

      if (typeof salida === 'string' && /([zZ]|[+-]\d{2}:?\d{2})$/.test(salida)) {
        const mz = moment.parseZone(salida).local();
  return mz.isValid() ? mz.format('DD-MM-YYYY hh:mm A') : '';
      }

      let m = moment.utc(salida, ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DDTHH:mm:ss', 'YYYY-MM-DD'], true).local();
      if (!m.isValid()) {
        m = moment(salida).local();
      }
  return m.isValid() ? m.format('DD-MM-YYYY hh:mm A') : '';
    },
    entradaFechaHora(entrada) {
      if (!entrada) return '';

      if (typeof entrada === 'string' && /([zZ]|[+-]\d{2}:?\d{2})$/.test(entrada)) {
        const mz = moment.parseZone(entrada).local();
  return mz.isValid() ? mz.format('DD-MM-YYYY hh:mm A') : '';
      }

      let m = moment.utc(entrada, ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DDTHH:mm:ss', 'YYYY-MM-DD'], true).local();
      if (!m.isValid()) m = moment(entrada).local();
  return m.isValid() ? m.format('DD-MM-YYYY hh:mm A') : '';
    },

    workerView(typeView) {
      if (typeView === 'searchUser') return this.modals.searchUser = true;
			if(typeView === 'workersList') {
				this.AllWorkers();
				this.limpiarTodoslosCampos();
			}
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
              documento_identidad_representante: parseInt(this.documento_identidad_representante),
              numero_orden_representante: parseInt(this.numero_orden_representante),
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
          this.edad = 0;
          this.$q.notify({
            message: "Paciente añadido",
            color: "positive",
          });
          this.$emit("updateUsers", {
            users: true,
          });
					setTimeout(() => window.location.reload(), 2000);
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

      // Validar que se hayan ingresado las fechas
      if (!this.emergencia_fechaIngreso || !this.emergencia_fechaEgreso) {
        this.$q.notify({
          message: "Debes ingresar una fecha de ingreso y egreso",
          color: "negative",
        });
        return;
      }

      // Crear objetos moment para comparar fechas
      const fechaIngreso = moment(this.emergencia_fechaIngreso).startOf("day");
      const fechaEgreso = moment(this.emergencia_fechaEgreso).startOf("day");
      const fechaActual = moment().startOf("day");

      // Validar que la fecha de ingreso no sea menor a la fecha actual
      if (fechaIngreso.isBefore(fechaActual)) {
        this.$q.notify({
          message: "La fecha de ingreso no puede ser menor a la fecha actual",
          color: "negative",
        });
        return;
      }

      // Validar que la fecha de ingreso y egreso no sean iguales
      if (fechaIngreso.isSame(fechaEgreso)) {
        this.$q.notify({
          message: "La fecha de ingreso y egreso no pueden ser iguales",
          color: "negative",
        });
        return;
      }

      // Validar que la fecha de ingreso sea menor a la fecha de egreso
      if (fechaIngreso.isAfter(fechaEgreso)) {
        this.$q.notify({
          message: "La fecha de ingreso no puede ser mayor a la fecha de egreso",
          color: "negative",
        });
        return;
      }

      return this.$apollo
        .mutate({
          mutation: ADD_EMERGENCIA_MUTATION,
          variables: {
            input: {
              motivo_emergencia: this.emergencia_motivoEmergencia,
              fecha_ingreso: this.emergencia_fechaIngreso,
              fecha_egreso: this.emergencia_fechaEgreso,
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
					this.emergencia_fechaIngreso = '';
					this.emergencia_fechaEgreso = '';
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

      // Validar que se hayan ingresado las fechas
      if (!this.hospitalizacion_fechaIngreso || !this.hospitalizacion_fechaEgreso) {
        this.$q.notify({
          message: "Debes ingresar una fecha de ingreso y egreso",
          color: "negative",
        });
        return;
      }

      // Crear objetos moment para comparar fechas
      const fechaIngreso = moment(this.hospitalizacion_fechaIngreso).startOf("day");
      const fechaEgreso = moment(this.hospitalizacion_fechaEgreso).startOf("day");
      const fechaActual = moment().startOf("day");

      // Validar que la fecha de ingreso no sea menor a la fecha actual
      if (fechaIngreso.isBefore(fechaActual)) {
        this.$q.notify({
          message: "La fecha de ingreso no puede ser menor a la fecha actual",
          color: "negative",
        });
        return;
      }

      // Validar que la fecha de ingreso y egreso no sean iguales
      if (fechaIngreso.isSame(fechaEgreso)) {
        this.$q.notify({
          message: "La fecha de ingreso y egreso no pueden ser iguales",
          color: "negative",
        });
        return;
      }

      // Validar que la fecha de ingreso sea menor a la fecha de egreso
      if (fechaIngreso.isAfter(fechaEgreso)) {
        this.$q.notify({
          message: "La fecha de ingreso no puede ser mayor a la fecha de egreso",
          color: "negative",
        });
        return;
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

      // Validar que se haya ingresado la fecha
      if (!this.ingresoSalida) {
        this.$q.notify({
          message: "Debes ingresar una fecha de consulta",
          color: "negative",
        });
        return;
      }

      const fechaInicio = moment(this.ingresoSalida).startOf("day");
      const fechaActual = moment().startOf("day");

      // Validar que la fecha de consulta no sea menor a la fecha actual
      if (fechaInicio.isBefore(fechaActual)) {
        this.$q.notify({
          message: "La fecha de consulta no puede ser menor a la fecha actual",
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
          this.examen_estadoExamen = 'Pendiente';
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

      // Validar que se hayan ingresado las fechas
      if (!this.tratamiento_fechaInicio || !this.tratamiento_fechaCulminacion) {
        this.$q.notify({
          message: "Debes ingresar una fecha de inicio y culminación",
          color: "negative",
        });
        return;
      }

      const fechaInicio = moment(this.tratamiento_fechaInicio).startOf("day");
      const fechaCulminacion = moment(this.tratamiento_fechaCulminacion).startOf("day");
      const fechaActual = moment().startOf("day");

      // Validar que la fecha de inicio no sea menor a la fecha actual
      if (fechaInicio.isBefore(fechaActual)) {
        this.$q.notify({
          message: "La fecha de inicio no puede ser menor a la fecha actual",
          color: "negative",
        });
        return;
      }

      // Validar que la fecha de inicio no sea mayor a la fecha de culminación
      if (fechaInicio.isAfter(fechaCulminacion)) {
        this.$q.notify({
          message: "La fecha de inicio no puede ser mayor a la fecha de finalización",
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

      // Validar que se hayan ingresado las fechas
      if (!this.medicamento_fechaInicio || !this.medicamento_fechaFin) {
        this.$q.notify({
          message: "Debes ingresar una fecha de inicio y finalización",
          color: "negative",
        });
        return;
      }

      // Crear objetos moment para comparar fechas
      const fechaInicio = moment(this.medicamento_fechaInicio).startOf("day");
      const fechaFin = moment(this.medicamento_fechaFin).startOf("day");
      const fechaActual = moment().startOf("day");

      // Validar que la fecha de inicio no sea menor a la fecha actual
      if (fechaInicio.isBefore(fechaActual)) {
        this.$q.notify({
          message: "La fecha de inicio no puede ser menor a la fecha actual",
          color: "negative",
        });
        return;
      }

      // Validar que la fecha de inicio no sea mayor a la fecha de finalización
      if (fechaInicio.isAfter(fechaFin)) {
        this.$q.notify({
          message: "La fecha de inicio no puede ser mayor a la fecha de finalización",
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
      const paciente = this.users.filter((paciente) => paciente.persona.cedula_identidad === parseInt(dni))
      if (paciente.length !== 0) {
        this.dataUser = paciente[0];
        this.modalDetailUser = true;
        this.modals.searchUser = false;
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
