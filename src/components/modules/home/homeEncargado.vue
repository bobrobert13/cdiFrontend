<template>
  <div class="row justify-center">
    <div class="col-12 self-end">
      <span class="text-bold text-h6  text-accent">Usuarios del CDI</span>
    </div>
    <div class="col-12 self-end bg-white" style="min-height: 85vh; border-radius: 20px">
      <q-scroll-area class="q-mt-md q-mb-md" :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 75vh">
        <div class="row justify-center">
          <div class="col-10" v-if="viewType === 'userList'">
            <!-- <div class="col-12">
            <span class="text-accent text-h6 text-bold"
              >Control de Doctores</span
            >
          </div> -->
            <div class="row justify-center">
              <div class="col self-center text-right">
                <div class="col-4 self-center text-right">
                  <!-- <q-select filled dense v-model="especialidadDoctor" :options="roleUserEspecialidad"
                    label="Buscar por Area" option-label="label" option-value="id">
                    <template v-slot:append>
                      <q-icon v-if="especialidadDoctor !== ''" class="cursor-pointer" name="clear"
                        @click.stop="especialidadDoctor = 'null'" />
                    </template>
</q-select> -->
                </div>
                <!-- <span class="text-bold text-primary" style="cursor: pointer" @click="workerView('searchUser')">Buscar doctor</span> -->
              </div>
              <div v-if="tab === 'doctoresCDI'" class="col self-center text-right">
                <!-- <span class="text-bold text-primary" style="cursor: pointer" @click="workerView('addWorker')">Añadir doctor</span> -->

                <!-- <q-icon v-if="users.length !== 0" style="cursor: pointer" @click="downloadSeveralUsers()"
                  name="mdi-folder-download" class="text-primary q-mr-lg" size="md"></q-icon> -->
                <q-icon style="cursor: pointer" @click="workerView('searchUser')" name="mdi-account-search"
                  class="text-primary q-mr-md" size="md"></q-icon>
                <q-icon style="cursor: pointer" @click="workerView('addWorker')" name="mdi-plus" class="text-primary"
                  size="md"></q-icon>
              </div>
            </div>

            <q-tabs v-model="tab" class="text-teal">
              <q-tab name="doctoresCDI" icon="mdi-account-group" label="Doctores del CDI" />
              <q-tab name="pacientesCDI" icon="mdi-account-multiple" label="Pacientes del CDI" />

            </q-tabs>

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="doctoresCDI">
                <div class="text-h6"><span v-if="users && users.length !== 0">{{ users.length }}</span> Doctores del CDI
                </div>
                Listado de usuarios doctores pertenecientes al CDI
                <div class="row justify-center q-mt-xl" v-if="this.users.length !== 0">
                  <div class="col-12 q-mb-sm" v-for="(user, index) in users" :key="index">
                    <q-list class="rounded-borders bg-secondary" style="border-radius: 15px">
                      <q-item>
                        <q-item-section avatar @click="userDetailC('userDetail', user)" style="cursor: pointer">
                          <q-avatar color="primary" icon="mdi-doctor" text-color="white">
                          </q-avatar>
                        </q-item-section>

                        <q-item-section top @click="userDetailC('userDetail', user)" style="cursor: pointer">
                          <q-item-label class="text-left q-mb-xs" lines="1">
                            <span class="text-weight-medium">Nombre de usuario: <b>{{ user.usuarios.nombre_usuario
                            }}</b></span>
                          </q-item-label>
                          <small class="text-weight-medium">Rol: {{ user.usuarios.rol }}</small>
                          <small class="text-weight-medium">Estatus de usuario: <b>{{ user.usuarios.estado
                          }}</b></small>
                        </q-item-section>
                        <q-item-section side>
                          <div class="text-grey-8 q-gutter-xs">
                            <!-- <q-btn @click="generatePDF(user)" class="gt-xs text-blue" size="12px" flat dense round
                          icon="mdi-file-download-outline" /> -->
                            <q-btn @click="actualizarUsuario({ ...user.usuarios, estado: user.usuarios.estado === 'activo' ? 'inactivo' : 'activo' })" class="gt-xs text-negative" size="12px" flat dense
                              :label="user.usuarios.estado === 'activo' ? 'Inhabilitar' : 'Habilitar'" />
                          </div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </div>
                <div class="row" v-else>
                  <div class="col-12 q-mt-xl">
                    <span class="text-caption">No hay Doctores registrados</span>
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="pacientesCDI">
                <div class="text-h6"><span v-if="usersPacientes && usersPacientes.length !== 0">{{ usersPacientes.length
                    }}</span>
                  Pacientes del CDI</div>
                Listado de pacientes administrados por los doctores del CDI
                <div class="row justify-center q-mt-xl" v-if="usersPacientes && this.usersPacientes.length !== 0">
                  <div class="col-12 q-mb-sm" v-for="(userPaciente, index) in usersPacientes" :key="index">
                    <q-list class="rounded-borders bg-secondary" style="border-radius: 15px">
                      <q-item>
                        <q-item-section avatar style="cursor: pointer">
                          <q-avatar color="primary" icon="mdi-account-circle" text-color="white">
                          </q-avatar>
                        </q-item-section>

                        <q-item-section top style="cursor: pointer">
                          <q-item-label class="text-left q-mb-xs" lines="1">
                            <span class="text-weight-medium">Nombre del aciente: <b>{{ userPaciente.persona.nombre1 }}
                              </b></span>
                          </q-item-label>
                          <small class="text-weight-medium">Correo electrónico: {{ userPaciente.persona.correo.correo
                            }}</small>
                          <small class="text-weight-medium">Número de contacto: {{ userPaciente.persona.telefono.codigo
                            }}{{
                              userPaciente.persona.telefono.numero }}</small>
                          <small class="text-weight-medium">Documento de Identidad: {{
                            userPaciente.persona.cedula_identidad
                            }}</small>
                        </q-item-section>

                        <q-item-section side style="cursor: pointer">
                          <q-item-label class="text-left q-mb-xs" lines="1">
                            <small class="text-weight-medium">Fecha de creación: <b>{{
                                entradaCracion(userPaciente.createdAt) }}
                              </b></small>
                          </q-item-label>

                        </q-item-section>
                        <q-item-section side>
                          <div class="text-grey-8 q-gutter-xs">
                            <!-- <q-btn @click="generatePDF(user)" class="gt-xs text-blue" size="12px" flat dense round
                          icon="mdi-file-download-outline" /> -->
                          </div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </div>
                <div class="row" v-else>
                  <div class="col-12 q-mt-xl">
                    <span class="text-caption">No hay Doctores registrados</span>
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>

          </div>
          <div class="col-10 q-mt-md">
            <div class="row justify-center" v-if="viewType === 'userDetail'">
              <div class="col-12 text-left">
                <q-icon style="cursor: pointer" @click="workerView('userList')" name="mdi-arrow-left"
                  class="text-primary" size="md"></q-icon>
              </div>
              <div class="col-12 text-center q-mb-lg">
                <q-avatar color="primary" icon="mdi-account-circle" text-color="white">
                </q-avatar>
              </div>
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="row text-center justify-center">
                  <div class="col-12 q-mt-xs">
                    <p class="text-subtitle text-medium">Información del doctor</p>

                    <div class="row jusitify-center">
                      <div class="col-6 q-pa-sm">
                        <q-input filled disable color="deep-purple-6" v-model="dataUser.persona.nombre1"
                          label="Nomobre completo" />
                      </div>
                      <div class="col-6 q-pa-sm">
                        <q-input filled disable color="deep-purple-6" v-model="dataUser.numero_carnet"
                          label="Número de carnet" />
                      </div>
                      <div class="col-6 q-pa-sm">
                        <q-input filled disable color="deep-purple-6" v-model="dataUser.anos_experiencia"
                          label="Años de experiencia" />
                      </div>
                      <div class="col-6 q-pa-sm">
                        <q-input filled disable color="deep-purple-6" v-model="dataUser.persona.cedula_identidad"
                          label="Cédula" />
                      </div>
                      <div class="col-6 q-pa-sm">
                        <q-input filled disable color="deep-purple-6" v-model="dataUser.area_de_trabajo"
                          label="Especialidad" />
                      </div>
                      <div class="col-6 q-pa-sm">
                        <q-input filled disable color="deep-purple-6" v-model="dataUser.usuarios.rol" label="Email" />
                      </div>
                    </div>
                  </div>

                  <div class="col-12 q-mt-xl">
                    <p class="text-subtitle text-medium no-padding">Información de credenciales</p>
                    <small>Puedes actualizar la contraseña del usuario del doctor desde esta sección; Asegurate de informar la nueva credencial a tu Doctor</small>
                    <div class="row jusitify-center">
                      <div class="col-6 q-pa-sm">
                          <q-input filled  color="deep-purple-6" v-model="dataUser.usuarios.nombre_usuario" @blur="validateUserCredentialsInputs"
                            label="Nombre de usuario" :rules="[val => val.length >= 3 || 'El nombre de usuario debe tener al menos 3 caracteres']" />
                      </div>

                      <div class="col-6 q-pa-sm">
                        <q-input filled  color="deep-purple-6" v-model="dataUser.usuarios.contrasena"  @blur="validateUserCredentialsInputs"
                         :rules="[val => val.length >= 6 || 'La contraseña debe tener al menos 6 caracteres']"
                          label="Contraseña" />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-mt-md">
                    <q-btn unelevated :disabled="!isValid" :loading="loader" @click="actualizarUsuario(dataUser.usuarios)"
                      class="fullwidth text-white bg-primary" label="Actualizar credenciales" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-center" v-if="viewType === 'searchUser'">
              <div class="col-12">
                <div v-if="buscador === true">
                  <div class="col-12 text-left">
                    <q-icon style="cursor: pointer" @click="workerView('userList')" name="mdi-arrow-left"
                      class="text-primary" size="md"></q-icon>
                  </div>
                  <div class="row justify-center">
                    <div class="col-12 text-bold text-accent text-center text-h6">
                      <span>Buscar usuario del doctor</span>
                    </div>
                    <q-icon name="mdi-account-search" size="200px" class="text-secondary"></q-icon>
                    <div class="col-10 q-mt-md">
                      <q-input outlined filled color="deep-purple-6" v-model="email" label="Nombre de usuario" :rules="[
                        (val) => !!val || 'Este campo es obligatorio',
                        (val) => val.length <= 40 || 'Máximo 40 caracteres',
                      ]" />
                    </div>
                  </div>
                  <div class="row justify-center">
                    <div class="col-4 q-mt-md">
                      <q-btn label="Buscar" class="full-width" color="primary" @click="buscarUsuario(email)" />
                    </div>
                  </div>
                </div>
                <div class="row justify-center" v-else>
                  <div class="col-10 text-left">
                    <span class="text-bold text-accent text-h6" @click="buscador = true">Volver</span>
                  </div>
                  <div class="col-4 q-mt-md">
                    <q-card class="my-card text-white bg-primary" style="border-radius: 20px">
                      <q-card-section>
                        <img style="border-radius: 20px" v-if="user.profileImage !== ''"
                          :src="config.api.url + dataUser.profileImage" width="100%" />
                        <img style="border-radius: 20px" v-if="user.profileImage === ''"
                          src="../../../statics/img/account-circle.png" width="100%" />
                      </q-card-section>
                      <q-card-section>
                        <div class="text-h6">{{ dataUser.name }}</div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-between " v-if="viewType === 'addWorker'">
              <div class="col-12 text-left row items-center q-mt-md q-mb-md">
                <q-icon style="cursor: pointer" @click="workerView('userList')" name="mdi-arrow-left"
                  class="text-primary" size="md"></q-icon>
                <span style="cursor: pointer" class="text-bold text-accent text-h6"
                  @click="workerView('userList')">Nuevo
                  doctor</span>
              </div>
              <div class="col-6">
                <div class="column justify-center">
                  <p class="text-subtitle text-medium">Información general</p>
                  <q-input filled color="deep-purple-6" v-model="fullName" label="Nombre completo" :rules="[
                    (val) => !!val || 'Este campo es obligatorio',
                    (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                    (val) => val.length <= 200 || 'Máximo 200 caracteres',
                    (val) =>
                      /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                      'Solo se permiten caracteres',
                  ]" />
                  <q-select filled class="q-mb-xs" v-model="nacionalidad" :options="nacionalidades" option-label="label"
                    option-value="value" emit-value />
                  <q-input filled color="deep-purple-6" class="q-mb-xs" v-model="dni" type="number" label="Cédula" />


                  <div class="row q-mb-xs">
                    <div class="col-8">
                      <q-select filled label="Estado" v-model="estado" :options="estados" option-label="label"
                        option-value="value" />
                    </div>
                    <div class="col-4">
                      <q-select filled label="Ciudad" v-model="ciudad" :options="ciudades[estado.value]"
                        option-label="label" option-value="value" emit-value />
                    </div>
                  </div>
                  <div class="row q-mb-xs">
                    <div class="col-8">
                      <q-input filled color="deep-purple-6" v-model="calle" label="Calle" />
                    </div>
                    <div class="col-4">
                      <q-input filled color="deep-purple-6" v-model="numero" label="Número de casa" type="number" />
                    </div>
                  </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-mb-xs">
                    <q-input filled color="deep-purple-6" v-model="sector" label="Sector" />
                  </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 q-pb-xs col-sm-12 col-xs-12 ">
                    <q-input filled color="deep-purple-6" v-model="punto_referencia" label="Punto de referencia" />
                  </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                    <q-input filled color="deep-purple-6" v-model="codigo_postal" label="Código postal" />
                  </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-mb-xs">
                    <div class="row">
                      <div class="col-4">
                        <q-select filled v-model="codigo" :options="codigoTel" label="Codigo" option-label="label"
                          option-value="value" emit-value />
                      </div>
                      <div class="col-8">
                        <q-input filled color="deep-purple-6" v-model="telefono" type="number"
                          label="Número de telefono" />
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-mb-xs ">
                    <q-input filled color="deep-purple-6" v-model="email" label="Email" type="email" :rules="[
                      (val) => !!val || 'Este campo es obligatorio',
                      (val) => val.length <= 40 || 'Máximo 40 caracteres',
                      (val) =>
                        /^([a-zA-Z0-9._-]{3,}[@][a-zA-Z0-9.]{3,}[.][a-zA-Z0-9.]{2,5})*$/.test(
                          val
                        ) || 'Formato de correo inválido',
                    ]" />
                  </div>
                </div>
              </div>
              <div class="col-6" style="border-left: 10px solid white;">
                <div class="column justify-center">
                  <p class="text-subtitle text-medium">Información del doctor</p>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                    <q-input filled color="deep-purple-6" class="q-mb-xs" v-model="doctor_numero_carnet"
                      label="Número de carnet" />
                    <q-select filled color="deep-purple-6" class="q-mb-xs" v-model="doctor_horario" label="Horario"
                      :options="[
                        'Lunes a Viernes 8:00 am - 6:00 pm',
                        'Lunes a Viernes 9:00 am - 5:00 pm',
                        'Lunes a Viernes 10:00 am - 4:00 pm',
                        'Sábados 9:00 am - 1:00 pm',
                        'Sábados 10:00 am - 2:00 pm',
                        'Domingos 10:00 am - 2:00 pm',
                        'Lunes, Miércoles y Viernes 8:00 am - 5:00 pm',
                        'Martes y Jueves 10:00 am - 6:00 pm',
                        'Lunes a Viernes 8:00 am - 12:00 pm y 1:00 pm - 5:00 pm'
                      ]" />
                    <q-input filled color="deep-purple-6" type="number" class="q-mb-xs"
                      v-model="doctor_anos_experiencia" label="Años de experiencia" />
                    <q-select filled v-model="roleEspecialidad" :options="roleUserEspecialidad" label="Especialidad"
                      option-label="label" option-value="id" />
                  </div>


                  <p class="text-subtitle q-mt-md text-medium">Credenciales de acceso</p>
                  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">

                    <q-select filled v-model="role" :options="roleUser" class="q-mb-xs" label="Tipo de usuario"
                      option-label="label" option-value="value" emit-value disable />
                    <q-input filled color="deep-purple-6" class="q-mb-xs" v-model="doctor_nombre_usuario"
                      label="Nombre de usuario" />

                    <q-input filled :type="isPwd ? 'password' : 'text'" color="deep-purple-6" v-model="password"
                      label="Password" :rules="[
                        (val) => val.length >= 6 || 'Mínimo 6 caracteres',
                        (val) => val.length <= 20 || 'Máximo 20 caracteres',
                      ]">
                      <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                          @click="isPwd = !isPwd" />
                      </template>
                    </q-input>

                  </div>

                </div>
              </div>
            </div>
            <div v-if="viewType === 'addWorker'" class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 q-mb-xs ">
              <q-btn unelevated :loading="loader" @click="addDoctor()"
                :disable="!valid || fullName === '' || numero === '' || nacionalidad === '' || dni === '' || telefono === '' || email === '' || password === '' || doctor_nombre_usuario === '' || doctor_numero_carnet === '' || doctor_horario === '' || doctor_anos_experiencia === '' || roleEspecialidad === '' || role === '' || codigo_postal === '' || punto_referencia === '' || sector === '' || calle === '' || ciudad === '' || estado === ''"
                class="full-width text-white bg-primary" label="Añadir doctor" />
            </div>
          </div>
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
        </div>
      </q-scroll-area>
    </div>
    <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
        :paginate-elements-by-height="1400" filename="historialDoctorEnc" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="10" pdf-orientation="portrait" pdf-content-width="800px"
        @progress="onProgress($event)" ref="html2Pdf">
        <section slot="pdf-content">
          <!-- <historiaPdf :data="dataUser" /> -->
          <historiaDrPdf :data="pdfData" />
        </section>
      </vue-html2pdf>
    </div>
  </div>
</template>
<script>
import config from "../../../config";
import {
  ADDUSER_MUTATION,
  USER_DELETE,
  BUSCAR_USER_QUERY,
  ADD_DOCTOR_USER_MUTATION,
  CDI_DOCTORES_QUERY,
  CDI_PACIENTES_QUERY,
  UPDATE_USUARIO_MUTATION,
} from "../../../graphql/user";
import VueHtml2pdf from "vue-html2pdf";
import historiaDrPdf from "../admin/historiaDrPdf.vue";
import { ADMIN_DOCTORES_QUERY } from "../../../graphql/admin";
import moment from "moment";
export default {
  name: "homeEncargado",
  components: { historiaDrPdf, VueHtml2pdf },
  data() {
    return {
      config: config,
      previewImgs: "",
      imghightlight: "",
      highlight: [],
      highlightPreview: "",
      image: [],
      imagePreview: [],
      tab: "users",
      role: "Doctor",
      dni: 0,
      telefono: 0,
      ciudad: "",
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
      roleEspecialidad: { label: "Enfermería", value: "Enfermeria", id: 1 },
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
      pdfData: "",
      userName: "",
      password: "",
      password2: "",
      userId: "",
      dataUser: "",
      user: "",
      valid: false,
      buscador: true,
      tab: 'doctoresCDI',
      usersPacientes: [],

      // DATOS DE DOCTOR:
      doctor_numero_carnet: '',
      doctor_horario: '',
      doctor_anos_experiencia: '',
      doctor_nombre_usuario: '',
      punto_referencia: '',
      codigo_postal: '',

      doctor_contrasena: '',
      isValid: false,

      // DATOS DE USUARIO:
      deshabilitarUsuario: false,


      roleUser: [
        { label: "Doctor", value: "doctor" }
      ],
      codigo: 414,
      codigoTel: [
        { label: "0414", value: 414 },
        { label: "0424", value: 424 },
        { label: "0412", value: 412 },
        { label: "0416", value: 416 },
        { label: "0426", value: 426 }
      ],
      nacionalidades: [
        { label: "V", value: "V" },
        { label: "E", value: "E" }
      ],
      nacionalidad: "V",
      especialidadDoctor: "",
      roleUserEspecialidad: [
        { label: "Enfermería", value: "Enfermeria", id: 1 },
        { label: "Oftalmología", value: "Oftalmologia", id: 2 },
        { label: "Rayos x", value: "Rayosx", id: 3 },
        { label: "Hospitalización", value: "Hospitalizacion", id: 4 },
        { label: "Emergencias", value: "Emergencias", id: 5 },
        { label: "Laboratorio", value: "Laboratorio", id: 6 },
        { label: "Farmacia", value: "Farmacia", id: 7 },
        { label: "Terapias intensivas", value: "TerapiasIntensivas", id: 8 },
        { label: "Recepción", value: "Recepcion", id: 9 }
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
      filter: {
        roleEspecialidad: ""
      },
      users: {},
      viewType: "userList"
    };
  },
  created() {
    this.AllDoctores();
    this.AllPacientes();
  },
  watch: {
    async highlight(newValue) {
      this.imghightlight = "";
      let image = await this.readFileAsync(newValue);
      this.imghightlight = image;
    },
    estado(newVal) {
      this.ciudad = ""
    },
    email(newValue) {
      if (newValue !== "" && /^([a-zA-Z0-9._-]{3,}[@][a-zA-Z0-9.]{3,}[.][a-zA-Z0-9.]{3,3})*$/.test(newValue)) {
        return this.valid = true;
      } else {
        return this.valid = false;
      }
    },
    password(newValue) {
      if (newValue !== "" && newValue.length < 6 && newValue === this.password2) {
        return this.valid = true;
      } else {
        return this.valid = false;
      }
    },
    password2(newValue) {
      if (newValue === this.password) {
        return this.valid = true;
      } else {
        return this.valid = false;
      }
    },
    especialidadDoctor(newValue, oldValue) {
      console.log(newValue)
      if (newValue) {
        console.log("especialidad", newValue);
        this.filter.roleEspecialidad = newValue.id
        this.AllDoctores()
        if (newValue === 'null') {
          this.filter.roleEspecialidad = ''
          this.AllDoctores()
          this.especialidadDoctor = ''
        }
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
      console.log("¿Es válido?", this.valid);
    },
  },
  methods: {
    entradaCracion(createdAt) {
      return moment(createdAt).format('DD-MM-YYYY')
    },
    generatePDF(user) {
      console.log("funcion?? ");
      this.pdfData = user;
      console.log("usuerios_pdf", this.pdfData);
      this.$refs.html2Pdf.generatePdf();
    },
    downloadSeveralUsers() {
      this.pdfData = this.users;
      console.log("usuerios_pdf", this.pdfData);
      this.$refs.html2Pdf.generatePdf();
    },
    workerView(typeView) {
      this.viewType = typeView
    },
    userDetailC(viewType, user) {
      this.dataUser = user;
      this.workerView(viewType)
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
    buscarUsuario(usuario_busqueda) {
      const usuario = this.users.find(user => user.usuarios.nombre_usuario === usuario_busqueda);
      if (usuario) {
        this.dataUser = usuario;
        this.workerView('userDetail');
      } else {
        this.$q.notify({
          message: 'Usuario no encontrado',
          color: 'negative'
        });
      }
      usuario_busqueda = '';
    },
    buscarPorEspecialidad(e) {
      this.especialidadDoctor = e;
      this.AllDoctores();
    },
    AllDoctores() {
      this.$apollo
        .query({
          query: CDI_DOCTORES_QUERY,
          fetchPolicy: "network-only",
          variables: {
            id_cdi: this.$store.state.user.cdi_id
          }
        })
        .then((response) => {
          this.loaderUser = false;
          console.log(response.data.doctoresCDI);
          this.users = Object.assign([], response.data.doctoresCDI);
        })
        .catch((err) => {
          this.loaderUser = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },

    AllPacientes() {
      this.$apollo
        .query({
          query: CDI_PACIENTES_QUERY,
          fetchPolicy: "network-only",
          variables: {
            id_cdi: this.$store.state.user.cdi_id
          }
        })
        .then((response) => {
          this.loaderUser = false;
          console.log(response.data.pacientesCDI);
          this.usersPacientes = Object.assign([], response.data.pacientesCDI);
          console.log('pacientes CDI:', this.usersPacientes);
        })
        .catch((err) => {
          this.loaderUser = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    addDoctor() {
      this.loader = true;
      let telConcat = '0' + this.codigo + this.telefono
      console.log('datos doctor:', {
        anos_experiencia: parseInt(this.doctor_anos_experiencia),
        numero_carnet: this.doctor_numero_carnet,
        area_de_trabajo: this.roleEspecialidad.value,
        horario: this.doctor_horario,
        fk_cdi_id: this.$store.state.user.cdi_id,
      });

      this.$apollo
        .mutate({
          mutation: ADD_DOCTOR_USER_MUTATION,
          variables: {
            input: {
              doctorInput: {
                anos_experiencia: parseInt(this.doctor_anos_experiencia),
                numero_carnet: this.doctor_numero_carnet,
                area_de_trabajo: this.roleEspecialidad.value,
                horario: this.doctor_horario,
                fk_cdi_id: this.$store.state.user.cdi_id,
              },
              personaInput: {
                nombre1: this.fullName,
                cedula_identidad: this.dni,
                telefonoInput: {
                  codigo: this.codigo.toString(),
                  numero: this.telefono.toString()
                },
                correoInput: {
                  correo: this.email || ''
                },
                direccionInput: {
                  codigo_postal: this.codigo_postal,
                  punto_referencia: this.punto_referencia,
                  parroquia: this.ciudad,
                  numero_casa: this.numero,
                  calle: this.calle,
                  sector: this.sector
                }
              },
              usuarioInput: {
                nombre_usuario: this.doctor_nombre_usuario,
                rol: 'doctor',
                contrasena: this.password,
                estado: 'activo',
                fk_cdi_id: this.$store.state.user.cdi_id,
              }
            },
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
          this.password = "";
          this.dni = "";
          this.telefono = "";
          this.direccion = "";
          this.highlight = "";
          this.viewType = "userList"
          this.AllDoctores();
          this.$q.notify({
            message: "Doctor añadido",
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
    actualizarUsuario(usuario) {
      this.loader = true;
      this.$apollo
        .mutate({
          mutation: UPDATE_USUARIO_MUTATION,
          variables: {
            id_usuario: usuario.id_usuario,
            input: {
              estado: usuario.estado,
              rol: usuario.rol,
              contrasena: usuario.contrasena,
              nombre_usuario: usuario.nombre_usuario,
            },
          },
        })
        .then((response) => {
          this.loader = false;
          this.viewType = "userList"
          this.dataUser.usuarios.contrasena = '';

          this.AllDoctores();
          this.$q.notify({
            message: "Usuario del doctor actualizado",
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
    validateUserCredentialsInputs() {
      // Verifica la validez de cada campo
      const passwordValid = this.dataUser.usuarios.contrasena.length >= 6;
      const nameValid = this.dataUser.usuarios.nombre_usuario.length >= 3;
      // Actualiza isValid según la validez de los inputs
      this.isValid = passwordValid && nameValid;
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
  },
};
</script>
