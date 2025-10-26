<style>
.q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini {
  width: 75px !important;
}

.sidenav {
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  overflow-x: hidden;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }

  .sidenav a {
    font-size: 18px;
  }
}

.q-tab-panel {
  padding: 0px !important;
}

.menu-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>
<template>
  <div id="q-app">
    <q-layout view="hHh Lpr lff" container style="min-height: 100vh">
      <q-drawer v-if="
        $store.state.user.isAuthenticated &&
        $route.name !== 'login' &&
        $route.name !== 'registro' &&
        $route.name !== 'recuperar' &&
        $route.name !== 'pedido'
      " v-model="drawer" show-if-above :mini="true" :width="70" class="sm-hide xs-hide" content-class="bg-primary">
        <q-scroll-area class="fit">
          <q-list padding>


            <q-item clickable v-ripple class="q-mb-md q-mt-lg">
              <q-item-section avatar>
                <router-link to="/home">
                  <q-avatar color="white" style="cursor: pointer" icon="mdi-account-circle" text-color="primary">
                  </q-avatar>
                </router-link>
              </q-item-section>
            </q-item>

            <q-item v-if="this.$store.state.user.role !== 'doctor'" clickable v-ripple class="q-mb-xl">
              <q-item-section avatar>
                <router-link to="/estadisticas">
                  <q-avatar color="white" style="cursor: pointer" icon="mdi-google-analytics" text-color="primary">
                  </q-avatar>
                </router-link>
              </q-item-section>
            </q-item>


            <q-item clickable v-ripple class="q-mb-md">
              <q-item-section avatar>
                <q-avatar color="white" style="cursor: pointer" icon="mdi-cog" text-color="primary" @click="myInfo()">
                </q-avatar>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple style="position: fixed; bottom: 0; margin-left: 16.5px">
              <q-item-section avatar>
                <q-avatar v-on:click="confirm = true" color="white" size="lg" style="cursor: pointer" icon="mdi-logout"
                  text-color="primary">
                </q-avatar>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <div class="menu-bottom md-hide lg-hide xl-hide bg-white text-primary" elevated v-if="$store.state.token">
        <q-separator />
        <q-tabs>
          <q-route-tab to="" exact>
            <q-avatar size="md" color="primary" style="cursor: pointer" @click="myInfo()">
              <img v-if="this.user.profileImage !== ''" :src="config.api.url + this.user.profileImage" />
              <img v-if="this.user.profileImage === ''" src="./statics/img/account-circle.png" />
            </q-avatar>
          </q-route-tab>
          <q-route-tab icon="mdi-badge-account" to="/home" exact />
          <q-route-tab icon="mdi-logout" v-on:click="confirm = true" to="" exact />
        </q-tabs>
      </div>

      <!-- CONTENIDO -->
      <q-page-container class="bg-secondary">
        <q-page :style="this.$q.screen.lt.sm
          ? 'margin-left: 0px; border-radius: 0px 0px 0px 0px'
          : $store.state.user.isAuthenticated
            ? 'margin-left: 15px; border-radius: 30px 0px 0px 30px'
            : ''
          ">
          <Index></Index>
        </q-page>
      </q-page-container>
      <!-- FIN CONTENIDO -->
    </q-layout>

    <!-- INFO DIALOG -->
    <q-dialog v-model="myInfoD">
      <q-card style="width: 500px">
        <q-card-section>
          <div v-if="this.$store.state.user.role === 'cdi'" class="text-h6 text-grey-8">Cuenta CDI</div>
          <div v-if="this.$store.state.user.role === 'doctor'" class="text-h6 text-grey-8">Cuenta doctor</div>
          <div v-if="this.$store.state.user.role === 'admin'" class="text-h6 text-grey-8">Cuenta Administrador</div>
        </q-card-section>
        <q-separator />


        <!-- INFORMACION DE CDI -->
        <q-card-section v-if="this.$store.state.user.role === 'cdi'" class="scroll text-center">
          <p>Información general de la cuenta</p>
          <q-scroll-area v-if="userCDIProfile" :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 60vh">
            <div class="row justify-center">
              <div class="col-12">
                <div class="row">
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input disable filled color="deep-purple-6" v-model="userCDIProfile.nombre"
                      label="Nombre de CDI" />
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input filled disable color="deep-purple-6" v-model="userCDIProfile.numero_cdi"
                      label="Número del CDI" />
                  </div>

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input filled disable color="deep-purple-6" v-model="userCDIProfile.encargado"
                      label="Encargado" />
                  </div>

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input filled disable color="deep-purple-6" v-model="userCDIProfile.cuadrante"
                      label="Cuadrante" />
                  </div>
                </div>

              </div>

            </div>

            <div class="row q-mt-lg justify-center">
              <div class="col-12">
                <div class="row">
                  <div  class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input disable filled color="deep-purple-6" :value="this.$store.state.user.nombre_usuario"
                      @blur="validateCDICredentialsInputs" label="Nombre de usuario"
                      :rules="[val => val.length >= 3 || 'El nombre de usuario debe tener al menos 3 caracteres']" />
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input filled color="deep-purple-6" v-model="cdi_contrasena" @blur="validateCDICredentialsInputs"
                      label="Contraseña"
                      :rules="[val => val.length >= 6 || 'La contraseña debe tener al menos 6 caracteres']" />
                  </div>
                </div>

              </div>
              <div class="col-xl-8 column col-lg-8 col-md-8 col-sm-12 col-xs-12" v-if="this.user.role !== 'admin'">
                <q-btn unelevated :loading="loader" @click="actualizarUsuario(userCDIProfile.usuarios)"
                  class="fullwidth text-white q-mt-xs bg-primary" label="Modificar credenciales"
                  :disable="!isValidCredencialesCDI" />

              </div>
            </div>
          </q-scroll-area>
        </q-card-section>


        <!-- INFORMACION DE DOCTOR -->
        <q-card-section v-if="this.$store.state.user.role === 'doctor'" class="scroll text-center">
          <p>Información básica de la cuenta</p>
          <q-scroll-area v-if="userDoctorProfile.persona" :thumb-style="thumbStyle" :bar-style="barStyle"
            style="height: 60vh">
            <div class="row justify-center">
              <div class="col-12">
                <div class="row">
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input filled color="deep-purple-6" disable v-model="userDoctorProfile.persona.nombre1"
                      label="Nombre de doctor" />
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input filled color="deep-purple-6" disable v-model="userDoctorProfile.persona.cedula_identidad"
                      label="Documento de identidad" />
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input filled color="deep-purple-6" disable v-model="userDoctorProfile.numero_carnet"
                      label="Número de carnet" />
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input filled color="deep-purple-6" disable v-model="userDoctorProfile.area_de_trabajo"
                      label="Especialidad" />
                  </div>
                </div>
              </div>

            </div>

            <div v-if="userDoctorProfile.usuarios" class="row q-mt-lg justify-center">
              <p>Credenciales de acceso:</p>
              <div class="col-12">
                <div class="row">
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input disable filled color="deep-purple-6" v-model="userDoctorProfile.usuarios.nombre_usuario"
                      @blur="validateDoctorCredentialsInputs" label="Nombre de usuario"
                      :rules="[val => val.length >= 3 || 'El nombre de usuario debe tener al menos 3 caracteres']" />
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input filled color="deep-purple-6" v-model="doctor_contrasena"
                      @blur="validateDoctorCredentialsInputs" label="Contraseña"
                      :rules="[val => val.length >= 6 || 'La contraseña debe tener al menos 6 caracteres']" />
                  </div>
                </div>

              </div>
              <div class="col-xl-8 column col-lg-8 col-md-8 col-sm-12 col-xs-12"
                v-if="this.$store.state.user.role === 'doctor'">
                <q-btn unelevated :loading="loader" @click="actualizarUsuario(userDoctorProfile.usuarios)"
                  class="fullwidth text-white q-mt-xs bg-primary" label="Modificar credenciales"
                  :disable="!isValidCredencialesDoctor" />
              </div>
            </div>
          </q-scroll-area>
        </q-card-section>


        <!-- INFORMACION DE ADMIN -->
        <q-card-section v-if="this.$store.state.user.role === 'admin'" class="scroll text-center">
          <q-scroll-area v-if="userAdminProfile" :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 60vh">

            <div class="row q-mt-lg justify-center">
              <p>Credenciales de acceso</p>
              <div class="col-12">
                <div class="row">
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input disable filled color="deep-purple-6" v-model="userAdminProfile.nombre_usuario"
                      @blur="validateUserCredentialsInputs" label="Nombre de usuario"
                      :rules="[val => val.length >= 3 || 'El nombre de usuario debe tener al menos 3 caracteres']" />
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm">
                    <q-input filled color="deep-purple-6" v-model="admin_contrasena"
                      @blur="validateUserCredentialsInputs" label="Contraseña"
                      :rules="[val => val.length >= 6 || 'La contraseña debe tener al menos 6 caracteres']" />
                  </div>
                </div>

              </div>
              <div class="col-xl-8 column col-lg-8 col-md-8 col-sm-12 col-xs-12"
                v-if="this.$store.state.user.role === 'admin'">
                <q-btn unelevated :loading="loader" @click="actualizarUsuario(userAdminProfile)"
                  class="fullwidth text-white q-mt-xs bg-primary" label="Modificar credenciales"
                  :disable="!isValidCredencialesAdmin" />
              </div>
            </div>

          </q-scroll-area>
        </q-card-section>

        <div class="row justify-center">

          <q-btn color="primary" class="  q-mb-sm" label="Establecer preguntas de seguridad"
            @click="seguridadModal = true" />

          <q-btn color="primary" class="  q-mb-sm" label="Establecer seguridad de PIN" @click="pinModal = true" />


        </div>






        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- FIN INFO DIALOG -->

    <!-- CERRAR SESION DIALOG -->
    <q-dialog v-model="confirm" persistent>
      <q-card class="text-white bg-primary">
        <q-card-section>
          <div class="text-h6">confirmar</div>
        </q-card-section>
        <q-card-section class="row items-center text-center">
          <span class="q-ml-sm text-white">¿Estas seguro que deseas salir?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="white" v-close-popup />
          <q-btn v-close-popup flat label="Cerrar sesion" color="white" v-on:click="destroy()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- FIN CERRAR SESION DIALOG -->

    <!-- AGREGAR CORREO DIALOG -->
    <q-dialog v-model="addCorreoM" persistent>
      <q-card class="text-accent bg-white">
        <q-card-section>
          <div class="text-h6">Agregar correo</div>
        </q-card-section>
        <q-card-section class="row items-center text-center">
          <div class="row">
            <div class="col-12">
              <q-input filled v-model="nameA" label="Nombre" :rules="[
                (val) => !!val || 'Este campo es obligatorio',
                (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                (val) => val.length <= 40 || 'Máximo 40 caracteres',
                (val) =>
                  /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                  'Solo se permiten caracteres',
              ]" />
            </div>
            <div class="col-12">
              <q-input filled v-model="emailA" label="Correo" :rules="[
                (val) => !!val || 'Este campo es obligatorio',
                (val) => val.length <= 40 || 'Máximo 40 caracteres',
                (val) =>
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(
                    emailA
                  ) || 'Formato de correo inválido',
              ]" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="accent" v-close-popup />
          <q-btn v-close-popup flat label="Agregar" color="primary"
            :disable="emailA === '' || nameA === '' || valid === false" v-on:click="createCorreo()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- FIN AGREGAR CORREO DIALOG -->


    <!-- PREGUNTAS DE SEGURIDAD DIALOG -->

    <q-dialog v-model="seguridadModal">
      <q-card class=" q-pa-md">
        <span class=" text-center q-my-sm text-bold">Es conveniente activar las preguntas de seguridad para recuperar tu
          contraseña en casos de olvido o extravíos.</span>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs">
          <div class="row q-mt-xs">
            <div class="col-12 q-mb-xs">
              <q-input filled color="deep-purple-6" v-model="pregunta1" label="Establece la pregunta" type="text" />
            </div>
            <div class="col-12 q-mb-xs">
              <q-input filled color="deep-purple-6" v-model="respuesta1" label="Respuesta" type="password" />
            </div>


            <q-btn :disable="pregunta1 === '' || respuesta1 === '' || pregunta1.length < 3 || respuesta1.length < 3"
              color="primary" class=" q-my-md" label="Actualizar seguridad" @click="guardarPreguntasSeguridad()" />
          </div>
        </div>
      </q-card>
    </q-dialog>


    <q-dialog v-model="pinModal">
      <q-card class=" q-pa-md">
        <span class=" text-center q-my-sm text-bold">Es conveniente activar el <b>PIN</b> de seguridad como otra opción
          para recuperar tu
          contraseña en casos de olvido o extravíos.</span>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs">
          <div class="row q-mt-xs">
            <div class="col-12 q-mb-xs">
              <q-input filled color="deep-purple-6" v-model="pin"
                label="Establece el PIN de seguridad (min 4 dígitos - max 6 dígitos)" type="password" />
            </div>

            <q-btn :disable="pin == '' || pin.length < 4 || pin.length > 6" color="primary" class=" q-my-md"
              label="Actualizar seguridad " @click="guardarPinSeguridad()" />

          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { removeToken } from "./utils/auth";
import Index from "./components/layout/Index";
import cabecera from "./components/layout/cabecera";
import pie from "./components/layout/pie";
import {
  DATOS_PERSONALES_QUERY,
  UPDATE_MUTATION,
  MY_CORREOS_QUERY,
  CREATECORREO_MUTATION,
  DELETE_CORREO_MUTATION,
  CREAR_SEGURIDAD,
  GET_SEGURIDAD,
  ACTUALIZAR_SEGURIDAD,
  INFORMACION_CDI_QUERY,
  UPDATE_USUARIO_MUTATION,
  MIS_PACIENTES_QUERY,
  ADMIN_PROFILE_QUERY,
} from "./graphql/user";
import { ADD_PREGUNTAS_RECUPERACION, ADD_PIN_RECUPERACION, GET_SEGURIDAD_RECUPERACION } from "./graphql/seguridad.js";
import config from "./config";
import moment from "moment";
import upload from "./components/components/upload";
export default {
  name: "App",
  components: {
    Index,
    cabecera,
    pie,
    upload,
  },
  data() {
    return {

      emailA: "",
      nameA: "",
      addCorreoM: false,
      allcorreos: [],
      valid: false,
      loaderCorreos: false,
      config: config,
      myInfoD: false,
      loader: false,
      drawer: false,
      confirm: false,
      profileImage: [],
      updateSeguridad: false,
      pregunta1: "",
      pregunta2: "",
      pregunta3: "",
      respuesta1: "",
      respuesta2: "",
      respuesta3: "",
      pin: "",

      pinModal: false,

      email: "",
      name: "",
      user: {},
      userCDIProfile: {},
      userDoctorProfile: {},
      userAdminProfile: {},

      cdi_contrasena: '',
      doctor_contrasena: '',
      admin_contrasena: '',

      isValidCredencialesCDI: false,
      isValidCredencialesDoctor: false,
      isValidCredencialesAdmin: false,

      seguridadModal: false,
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },
      expireDate: "",
      totalTime: "",
    };
  },
   created() {
    this.infoUser();
  },
  watch: {
    myInfoD(newVal) {
      if (newVal) {
        this.getSeguridad();
      }
    },
    nameA(newValue) {
      if (
        newValue === "" &&
        newValue.length >= 3 &&
        newValue.length <= 40 &&
        /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(newValue)
      ) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    },
    emailA(newValue) {
      if (newValue) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(newValue)) {
          this.valid = true;
        } else {
          this.valid = false;
        }
      }
    },
  },
  computed: {
    createdAtUser() {
      return moment(this.user.createdAt).format("DD-MM-YYYY");
    },
    createdAt() {
      return moment(this.user.createdAt).format("DD-MM-YYYY");
    },
  },
  methods: {
    guardarPreguntasSeguridad() {
      this.$apollo
        .mutate({
          mutation: ADD_PREGUNTAS_RECUPERACION,
          variables: {
            input: {
              pregunta: this.pregunta1,
              respuesta: this.respuesta1,
              nombre_usuario: this.$store.state.user.nombre_usuario
            }
          },
        })
        .then((response) => {
          // console.log("modificacion", response);
          this.emailA = "";
          this.nameA = "";
          this.pregunta1 = "";
          this.respuesta1 = "";
          this.seguridadModal = false;
          this.myInfoD = false;
          this.$q.notify({
            color: "positive",
            textColor: "white",
            icon: "mdi-check",
            message: "Pregunta de seguridad actualizada correctamente",
          });
        })
        .catch((err) => {
          this.loader = false;
          this.emailA = "";
          this.nameA = "";
          console.log("there was an error: ", err);
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    guardarPinSeguridad() {
      this.$apollo
        .mutate({
          mutation: ADD_PIN_RECUPERACION,
          variables: {
            input: {
              pin: this.pin,
              nombre_usuario: this.$store.state.user.nombre_usuario
            }
          },
        })
        .then((response) => {
          // console.log("modificacion", response);
          this.emailA = "";
          this.nameA = "";
          this.pregunta1 = "";
          this.respuesta1 = "";
          this.pinModal = false;
          this.pin = "";
          this.seguridadModal = false;
          this.myInfoD = false;
          this.$q.notify({
            color: "positive",
            textColor: "white",
            icon: "mdi-check",
            message: "Pin de seguridad actualizada correctamente",
          });
        })
        .catch((err) => {
          this.loader = false;
          this.emailA = "";
          this.nameA = "";
          console.log("there was an error: ", err);
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    editarSeguridad() {
      this.$apollo
        .mutate({
          mutation: ACTUALIZAR_SEGURIDAD,
          variables: {
            data: {
              pregunta1: this.pregunta1,
              respuesta1: this.respuesta1,
              pregunta2: this.pregunta2,
              respuesta2: this.respuesta2,
              pregunta3: this.pregunta3,
              respuesta3: this.respuesta3,
              UserId: this.user.id,
            }
          },
        })
        .then((response) => {
          // console.log("modificacion", response);
          // this.myCorreos();
          this.emailA = "";
          this.nameA = "";
          this.pregunta1 = "";
          this.respuesta1 = "";
          this.pregunta2 = "";
          this.respuesta2 = "";
          this.pregunta3 = "";
          this.respuesta3 = "";
          this.seguridadModal = false;
          this.myInfoD = false;
          this.$q.notify({
            color: "positive",
            textColor: "white",
            icon: "mdi-check",
            message: "Seguridad actualizada correctamente",
          });
        })
        .catch((err) => {
          this.loader = false;
          this.emailA = "";
          this.nameA = "";
          console.log("there was an error: ", err);
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    getSeguridad() {
      this.$apollo
        .query({
          query: GET_SEGURIDAD_RECUPERACION,
          fetchPolicy: "network-only",
          variables: {
            nombre_usuario: this.$store.state.user.nombre_usuario
          }
        })
        .then((response) => {
          // console.log("seguridad?? ", response.data.metodosRecuperacion);
          if (response.data) {
            const seguridad = response.data.metodosRecuperacion;
            this.pregunta1 = seguridad.preguntas[0].pregunta || '';
          }
        })
        .catch((err) => {
          this.updateSeguridad = false;
          if (this.$isDev) console.log("hubo un error: ", err);
        });
    },
    async infoUser() {
      if (this.$store.state.user.role === 'cdi') {
        await this.obtenerInformacionCDI();
      } else if (this.$store.state.user.role === 'doctor') {
        await this.obtenerInformacionDoctor();
      } else if (this.$store.state.user.role === 'admin') {
        await this.obtenerInformacionAdmin();
      }
    },
    obtenerInformacionCDI() {
      this.$apollo
        .query({
          query: INFORMACION_CDI_QUERY,
          fetchPolicy: "network-only",
          variables: {
            id_cdi: this.$store.state.user.cdi_id
          }
        })
        .then((response) => {
          this.response = true;
          this.userCDIProfile = Object.assign({}, response.data.cdi);
        })
        .catch((err) => {
          console.log("errpr looc", err);
          if (this.$isDev) console.log("hubo un error: ", err);
        });
    },
    obtenerInformacionDoctor() {
      this.$apollo
        .query({
          query: MIS_PACIENTES_QUERY,
          fetchPolicy: "network-only",
          variables: {
            id_doctor: this.$store.state.user.doctor_id
          }
        })
        .then((response) => {
          this.response = true;
          this.userDoctorProfile = Object.assign({}, response.data.doctorPacientes);
        })
        .catch((err) => {
          console.log("errpr looc", err);
          if (this.$isDev) console.log("hubo un error: ", err);
        });
    },
    obtenerInformacionAdmin() {
      this.$apollo
        .query({
          query: ADMIN_PROFILE_QUERY,
          fetchPolicy: "network-only",
          variables: {
            id_usuario: this.$store.state.user.id
          }
        })
        .then((response) => {
          this.response = true;
          this.userAdminProfile = Object.assign({}, response.data.usuario);
        })
        .catch((err) => {
          console.log("errpr looc", err);
          if (this.$isDev) console.log("hubo un error: ", err);
        });
    },
    validateCDICredentialsInputs() {
      const passwordValid = this.cdi_contrasena.length >= 6;
      const nameValid = this.userCDIProfile.usuarios.nombre_usuario.length >= 3;
      this.isValidCredencialesCDI = passwordValid && nameValid;
    },
    validateDoctorCredentialsInputs() {
      const passwordValid = this.doctor_contrasena.length >= 6;
      const nameValid = this.userDoctorProfile.usuarios.nombre_usuario.length >= 3;
      this.isValidCredencialesDoctor = passwordValid && nameValid;
    },
    validateUserCredentialsInputs() {
      const passwordValid = this.admin_contrasena.length >= 6;
      const nameValid = this.userAdminProfile.nombre_usuario.length >= 3;
      this.isValidCredencialesAdmin = passwordValid && nameValid;
    },
    actualizarUsuario(usuario) {
      this.loader = true;
      this.$apollo
        .mutate({
          mutation: UPDATE_USUARIO_MUTATION,
          variables: {
            id_usuario: this.$store.state.user.user_id,
            input: {
              contrasena: this.$store.state.user.role === 'cdi' ? this.cdi_contrasena : this.doctor_contrasena || this.admin_contrasena,
              nombre_usuario: this.$store.state.user.nombre_usuario,
            },
          },
        })
        .then((response) => {
          this.loader = false;
          this.viewType = "userList"
          this.cdi_contrasena = "";
          this.doctor_contrasena = "";
          this.admin_contrasena = "";
          this.infoUser();
          this.$q.notify({
            message: "Usuario actualizado",
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
    myInfo() {
      this.myInfoD = true;
      this.name = this.user.name;
      this.email = this.user.email;
    },
    setImage(file) {
      this.file = file[0];
      this.profileImage = file[0];
    },
    removeFile(event) {
      this.file = event.file;
    },
    modificarDatos() {
      this.loader = true;
      const data = {
        name: this.name,
        email: this.email,
      };
      return this.$apollo
        .mutate({
          mutation: UPDATE_MUTATION,
          variables: {
            id: this.$store.state.user.id,
            data,
          },
        })
        .then((response) => {
          this.loader = false;
          this.infoUser();
          this.myInfoD = false;
          this.$q.notify({
            message: "Datos actualizados",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          console.log("error: ", err);
        });
    },
    myCorreos() {
      this.loaderCorreos = true;
      this.$apollo
        .query({
          query: MY_CORREOS_QUERY,
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.loaderCorreos = false;
          this.allcorreos = Object.assign([], response.data.MyCorreos);
        })
        .catch((err) => {
          this.loaderCorreos = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    addCorreoModal() {
      this.addCorreoM = true;
    },
    createCorreo() {
      this.loader = true;
      let data = {
        email: this.emailA,
        name: this.nameA,
        userId: this.user.id,
      };
      this.$apollo
        .mutate({
          mutation: CREATECORREO_MUTATION,
          variables: {
            data,
          },
        })
        .then((response) => {
          this.loader = false;
          this.myCorreos();
          this.emailA = "";
          this.nameA = "";
          this.$q.notify({
            color: "positive",
            textColor: "white",
            icon: "mdi-check",
            message: "Tu correo fue agregado",
          });
        })
        .catch((err) => {
          this.loader = false;
          this.emailA = "";
          this.nameA = "";
          console.log("there was an error: ", err);
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    deleteCorreo(correoID) {
      this.$apollo
        .mutate({
          mutation: DELETE_CORREO_MUTATION,
          variables: {
            correoID: correoID,
          },
        })
        .then((response) => {
          this.myCorreos();
          this.$q.notify({
            message: "Correo borrado con éxito",
            color: "positive",
          });
        })
        .catch((err) => {
          console.log("error delete correo: ", err);
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    destroy() {
      removeToken();
      this.$store.commit("logout");
      this.$router.push({ name: "login" });
    },
  },
};
</script>
