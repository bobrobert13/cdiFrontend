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
      <q-drawer
        v-if="
          $store.state.user.isAuthenticated &&
          $route.name !== 'login' &&
          $route.name !== 'registro' &&
          $route.name !== 'recuperar' &&
          $route.name !== 'pedido'
        "
        v-model="drawer"
        show-if-above
        :mini="true"
        :width="70"
        class="sm-hide xs-hide"
        content-class="bg-white"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple class="q-mb-xl">
              <q-item-section avatar>
                <q-avatar
                  color="primary"
                  style="cursor: pointer"
                  @click="myInfo()"
                >
                  <img
                    v-if="this.user.profileImage !== ''"
                    :src="config.api.url + this.user.profileImage"
                  />
                  <img
                    v-if="this.user.profileImage === ''"
                    src="./statics/img/account-circle.png"
                  />
                </q-avatar>
              </q-item-section>
            </q-item>

            <q-item
              :class="$route.name === 'home' ? 'bg-primary q-ma-sm' : ''"
              :style="$route.name === 'home' ? 'border-radius: 10px' : ''"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-btn
                  flat
                  to="/home"
                  icon="mdi-badge-account"
                  :color="$route.name === 'home' ? 'white' : 'accent'"
                >
                </q-btn>
              </q-item-section>
              <q-tooltip> Incio </q-tooltip>
            </q-item>

            <!-- <q-item
              v-if="this.$store.state.user.role !== 'operador' && this.$store.state.user.role !== 'admin'"
              :class="
                $route.name === 'transacciones' ? 'bg-primary q-ma-sm' : ''
              "
              :style="
                $route.name === 'transacciones' ? 'border-radius: 10px' : ''
              "
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-btn
                  flat
                  to="/transacciones"
                  icon="mdi-reorder-horizontal"
                  :color="$route.name === 'transacciones' ? 'white' : 'accent'"
                >
                </q-btn>
              </q-item-section>
              <q-tooltip> Transacciones </q-tooltip>
            </q-item>

            <q-item
              v-if="this.$store.state.user.role === 'operador' && this.$store.state.user.role !== 'admin'"
              :class="
                $route.name === 'transaccionesOperador'
                  ? 'bg-primary q-ma-sm'
                  : ''
              "
              :style="
                $route.name === 'transaccionesOperador'
                  ? 'border-radius: 10px'
                  : ''
              "
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-btn
                  flat
                  to="/transaccionesOperador"
                  icon="mdi-reorder-horizontal"
                  :color="
                    $route.name === 'transaccionesOperador' ? 'white' : 'accent'
                  "
                >
                </q-btn>
              </q-item-section>
              <q-tooltip> Transacciones </q-tooltip>
            </q-item>

            <q-item
              v-if="this.$store.state.user.role === 'user'"
              :class="$route.name === 'calculadora' ? 'bg-primary q-ma-sm' : ''"
              :style="
                $route.name === 'calculadora' ? 'border-radius: 10px' : ''
              "
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-btn
                  flat
                  to="/calculadora"
                  icon="mdi-calculator"
                  :color="$route.name === 'calculadora' ? 'white' : 'accent'"
                >
                </q-btn>
              </q-item-section>
              <q-tooltip> Calculadora </q-tooltip>
            </q-item>

            <q-item
              v-if="this.$store.state.user.role === 'user'"
              :class="$route.name === 'credits' ? 'bg-primary q-ma-sm' : ''"
              :style="$route.name === 'credits' ? 'border-radius: 10px' : ''"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-btn
                  flat
                  to="/credits"
                  icon="mdi-credit-card"
                  :color="$route.name === 'credits' ? 'white' : 'accent'"
                >
                </q-btn>
              </q-item-section>
              <q-tooltip> Creditos </q-tooltip>
            </q-item>

            <q-item
              v-if="this.$store.state.user.role !== 'operador' && this.$store.state.user.role !== 'admin'"
              :class="$route.name === 'bancos' ? 'bg-primary q-ma-sm' : ''"
              :style="$route.name === 'bancos' ? 'border-radius: 10px' : ''"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-btn
                  flat
                  to="/bancos"
                  icon="mdi-bank"
                  :color="$route.name === 'bancos' ? 'white' : 'accent'"
                >
                </q-btn>
              </q-item-section>
              <q-tooltip> Gestión de bancos </q-tooltip>
            </q-item>

            <q-item
              v-if="this.$store.state.user.role !== 'operador' && this.$store.state.user.role !== 'admin'"
              :class="$route.name === 'bankAccount' ? 'bg-primary q-ma-sm' : ''"
              :style="
                $route.name === 'bankAccount' ? 'border-radius: 10px' : ''
              "
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-btn
                  flat
                  to="/bankAccount"
                  icon="mdi-bank-plus"
                  :color="$route.name === 'bankAccount' ? 'white' : 'accent'"
                >
                </q-btn>
              </q-item-section>
              <q-tooltip> Cuentas bancarias </q-tooltip>
            </q-item> -->

            <q-item
              clickable
              v-ripple
              style="position: fixed; bottom: 0; margin-left: 7.5px"
            >
              <q-item-section avatar>
                <q-btn
                  flat
                  icon="mdi-logout"
                  color="accent"
                  v-on:click="confirm = true"
                ></q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <div
        class="menu-bottom md-hide lg-hide xl-hide bg-white text-primary"
        elevated
        v-if="$store.state.user.isAuthenticated"
      >
        <q-separator />
        <q-tabs>
          <q-route-tab to="" exact>
            <q-avatar
              size="md"
              color="primary"
              style="cursor: pointer"
              @click="myInfo()"
            >
              <img
                v-if="this.user.profileImage !== ''"
                :src="config.api.url + this.user.profileImage"
              />
              <img
                v-if="this.user.profileImage === ''"
                src="./statics/img/account-circle.png"
              />
            </q-avatar>
          </q-route-tab>
          <q-route-tab icon="mdi-badge-account" to="/home" exact />
          <!-- <q-route-tab
            v-if="this.$store.state.user.role !== 'operador'"
            icon="mdi-reorder-horizontal"
            to="/transacciones"
            exact
          />
          <q-route-tab
            icon="mdi-reorder-horizontal"
            to="/transaccionesOperador"
            exact
            v-if="this.$store.state.user.role === 'operador'"
          />
          <q-route-tab
            icon="mdi-calculator"
            to="/calculadora"
            exact
            v-if="this.$store.state.user.role === 'user'"
          />
          <q-route-tab
            icon="mdi-credit-card"
            to="/credits"
            exact
            v-if="this.$store.state.user.role === 'user'"
          />
          <q-route-tab
            icon="mdi-bank"
            to="/bancos"
            exact
            v-if="this.$store.state.user.role !== 'operador'"
          />
          <q-route-tab
            icon="mdi-bank-plus"
            to="/bankAccount"
            exact
            v-if="this.$store.state.user.role !== 'operador'"
          /> -->
          <q-route-tab
            icon="mdi-logout"
            v-on:click="confirm = true"
            to=""
            exact
          />
        </q-tabs>
      </div>

      <!-- CONTENIDO -->
      <q-page-container class="bg-secondary">
        <q-page
          :style="
            this.$q.screen.lt.sm
              ? 'margin-left: 0px; border-radius: 0px 0px 0px 0px'
              : $store.state.user.isAuthenticated
              ? 'margin-left: 15px; border-radius: 30px 0px 0px 30px'
              : ''
          "
        >
          <Index></Index>
        </q-page>
      </q-page-container>
      <!-- FIN CONTENIDO -->
    </q-layout>

    <!-- INFO DIALOG -->
    <q-dialog v-model="myInfoD" persistent>
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">Datos personales</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll text-center">
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="height: 60vh"
          >
            <div class="row justify-center">
              <upload
                :info="this.user"
                @removeFile="removeFile($event)"
                @setImage="setImage"
              ></upload>
              <div class="col-12">
                <div class="row">
                  <div
                    class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm"
                  >
                    <q-input
                      filled
                      color="deep-purple-6"
                      v-model="name"
                      label="Nombre completo"
                    />
                  </div>
                  <div
                    class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-sm"
                  >
                    <q-input
                      filled
                      disable
                      color="deep-purple-6"
                      v-model="email"
                      label="Correo"
                    />
                  </div>
                </div>
                <q-btn color="primary" class=" q-mt-md" label="Establecer preguntas de seguridad" @click="seguridadModal = true" />
              </div>
              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12" v-if="this.user.role !== 'admin'">
                <q-btn
                  unelevated
                  :loading="loader"
                  @click="modificarDatos()"
                  class="fullwidth text-white q-mt-xs bg-primary"
                  label="Modificar datos"
                  v-on:keyup.enter="modificarDatos()"
                />
              </div>
            </div>
          </q-scroll-area>
        </q-card-section>
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
          <span class="q-ml-sm text-white"
            >¿Estas seguro que deseas salir?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="white" v-close-popup />
          <q-btn
            v-close-popup
            flat
            label="Cerrar sesion"
            color="white"
            v-on:click="destroy()"
          />
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
              <q-input
                filled
                v-model="nameA"
                label="Nombre"
                :rules="[
                  (val) => !!val || 'Este campo es obligatorio',
                  (val) => val.length >= 3 || 'Mínimo 3 caracteres',
                  (val) => val.length <= 40 || 'Máximo 40 caracteres',
                  (val) =>
                    /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                    'Solo se permiten caracteres',
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                v-model="emailA"
                label="Correo"
                :rules="[
                  (val) => !!val || 'Este campo es obligatorio',
                  (val) => val.length <= 40 || 'Máximo 40 caracteres',
                  (val) =>
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(
                      emailA
                    ) || 'Formato de correo inválido',
                ]"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="accent" v-close-popup />
          <q-btn
            v-close-popup
            flat
            label="Agregar"
            color="primary"
            :disable="emailA === '' || nameA === '' || valid === false"
            v-on:click="createCorreo()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- FIN AGREGAR CORREO DIALOG -->


    <!-- PREGUNTAS DE SEGURIDAD DIALOG -->

    <q-dialog v-model="seguridadModal">
      <q-card class=" q-pa-md">
      <span class=" text-center q-my-sm text-bold">Es conveniente activar las preguntas de seguridad para recuperar tu contraseña en casos de olvido o extravíos.</span>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs">
            <div class="row q-mt-xs">
              <div class="col-12 q-mb-xs">
                <q-input
                  filled
                  color="deep-purple-6"
                  v-model="pregunta1"
                  label="Establece la primera pregunta"
                  type="text"
                />
              </div>
              <div class="col-12 q-mb-xs">
                <q-input
                  filled
                  color="deep-purple-6"
                  v-model="respuesta1"
                  label="Respuesta"
                  type="password"
                />
              </div>
              <div class="col-12 q-mb-xs">
                <q-input
                  filled
                  color="deep-purple-6"
                  v-model="pregunta2"
                  label="Establece la segunda pregunta"
                  type="text"
                />
              </div>
              <div class="col-12 q-mb-xs">
                <q-input
                  filled
                  color="deep-purple-6"
                  v-model="respuesta2"
                  label="Respuesta"
                  type="password"
                />
              </div>
              <div class="col-12 q-mb-xs">
                <q-input
                  filled
                  color="deep-purple-6"
                  v-model="pregunta3"
                  label="Establece la tercera pregunta"
                  type="text"
                />
              </div>
              <div class="col-12 q-mb-xs">
                <q-input
                  filled
                  color="deep-purple-6"
                  v-model="respuesta3"
                  label="Respuesta"
                  type="password"
                />
              </div>
              <q-btn v-if="!updateSeguridad"
                :disable="pregunta1 == '' || pregunta2 == '' || pregunta3 == '' || respuesta1 == '' || respuesta2 == '' || respuesta3 == ''"
               color="primary" class=" q-my-md" label="Guardar preguntas de seguridad" @click="guardarSeguridad" />
              <q-btn
              :disable="pregunta1 == '' || pregunta2 == '' || pregunta3 == '' || respuesta1 == '' || respuesta2 == '' || respuesta3 == ''"
               v-else color="primary" class=" q-my-md" label="Modificar" @click="editarSeguridad" />
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
} from "./graphql/user";
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
      email: "",
      name: "",
      user: {},
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
    // this.infoUser();
    console.log("uusuario", this.$store.state.user);
    // this.myCorreos();
    // moment.updateLocale("es", {
    //   relativeTime: {
    //     future: "en %s",
    //     past: "%s",
    //     s: "unos segundos",
    //     ss: "%d segundos",
    //     m: "un minuto",
    //     mm: "%d minutos",
    //     h: "una hora",
    //     hh: "%d horas",
    //     d: "un día",
    //     dd: "%d días",
    //     M: "un mes",
    //     MM: "%d meses",
    //     y: "un año",
    //     yy: "%d años",
    //   },
    // });
  },
  watch: {
    myInfoD(newVal){
      if(newVal){
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
    guardarSeguridad(){
      this.$apollo
        .mutate({
          mutation: CREAR_SEGURIDAD,
          variables: {
            data: {
              pregunta1: this.pregunta1,
              respuesta1: this.respuesta1,
              pregunta2: this.pregunta2,
              respuesta2: this.respuesta2,
              pregunta3: this.pregunta3,
              respuesta3: this.respuesta3,
              UserId: this.$store.state.user.id
            }
          },
        })
        .then((response) => {
          console.log("modificacion", response);
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
            message: "Seguridad añadida correctamente",
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
    editarSeguridad(){
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
          console.log("modificacion", response);
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
          query: GET_SEGURIDAD,
          fetchPolicy: "network-only",
          variables: {
            UserId: this.$store.state.user.id
          }
        })
        .then((response) => {
          console.log(response.data);
          if(response.data){
          this.updateSeguridad = true;
          const seguridad = response.data.getSeguridad;
          this.pregunta1 = seguridad.pregunta1;
          this.pregunta2 = seguridad.pregunta2;
          this.pregunta3 = seguridad.pregunta3;
          // this.respuesta1 = seguridad.respuesta1;
          // this.respuesta2 = seguridad.respuesta2;
          // this.respuesta3 = seguridad.respuesta3;
          }
        })
        .catch((err) => {
          this.updateSeguridad = false;
          if (this.$isDev) console.log("hubo un error: ", err);
        });
    },
    infoUser() {
      this.$apollo
        .query({
          query: DATOS_PERSONALES_QUERY,
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.response = true;
          console.log("infoUser", response.data.oneUser)
          this.user = Object.assign({}, response.data.oneUser);
          // let timeNow = moment();
          // let createdAt = moment(this.user.createdAt).add(15, "days").toDate();
          // let difference = Math.floor((createdAt - timeNow) / 1000);
          // this.totalTime = difference;
          // var openingDate = moment(createdAt);
          // var fromNow = openingDate.fromNow();
          // if (this.totalTime < 0) {
          //   this.expireDate = "(Cuenta expirada)";
          // } else {
          //   this.expireDate = "y se vence " + fromNow;
          // }
        })
        .catch((err) => {
          console.log("errpr looc", err);
          if (this.$isDev) console.log("hubo un error: ", err);
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
        profileImage:
          this.profileImage.length === 0 ? undefined : this.profileImage,
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
