<template>
  <div class="row justify-center">
    <div class="col-8">
      <div class="row justify-end" style="min-height: 100vh; position: relative" :style="this.$q.screen.lt.md ? 'margin-right: -35%' : 'margin-right: -20%'
        ">
        <div class="col-xl-5 col-lg-4 col-md-5 col-sm-8 col-xs-11 self-center text-center">
          <q-img src="../../../assets/MEDRECLOGO.png" style="width: 50%;"></q-img>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-8 col-xs-11 self-center text-center xs-hide sm-hide">
        </div>
        <div class="col-xl-5 col-lg-4 col-md-5 col-sm-8 col-xs-11 bg-white q-pa-xl self-center text-center"
          style="border-radius: 10px">
          <div class="q-mb-xl">
            <span class="text-h4 text-accent text-bold">Login</span>
          </div>
          <q-input filled v-model="email" color="amber-8" type="text" label="Usuario" :rules="[
            (val) => !!val || 'Este campo es obligatorio',
          ]" />
          <br />
          <q-input v-model="password" filled color="amber-8" :type="isPwd ? 'password' : 'text'" label="Contraseña"
            :rules="passwordRules">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-btn unelevated size="lg" :loading="loader" @click="login()"
            class="full-width text-white text-bold bg-primary" label="entrar" :disable="valid === true"
            v-on:keyup.enter="login()" />
          <br />
          <br />
          <span @click="checkUserModal = true" class=" text-weight-light cursor-pointer">Recuperar contraseña</span>
          <div class="row justify-center">
            <!-- <div class="col-12">
              <p class="text-grey-6" style="cursor: pointer">
                <q-btn
                  class="full-width"
                  label="Registrarse"
                  flat
                  to="/Registro"
                  no-caps
                ></q-btn>
              </p>
            </div> -->
            <!-- <div class="col-12" style="margin-top: -15px">
              <p class="text-grey-6" style="cursor: pointer">
                <q-btn
                  class="full-width"
                  label="Recuperar contraseña"
                  flat
                  to="/Recuperar"
                  no-caps
                ></q-btn>
              </p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="col-4 bg-primary"></div>
    <q-dialog v-model="checkUserModal">
      <q-card class=" q-pa-md">
        <q-card-section class="row justify-center items-center">
          <span class="q-ml-sm q-my-sm">Comprobaremos su existencia en el sistema para proceder a recuperar su
            contraseña.</span>
        </q-card-section>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs">
          <div class="row ">
            <div class="col-12 q-mb-xs">
              <q-input filled v-model="userRecovery" color="amber-8" type="text" label="Nombre de usuario" :rules="[
                (val) => !!val || 'Este campo es obligatorio',
                (val) => val.length <= 40 || 'Máximo 40 caracteres',
              ]" />
            </div>
            <q-btn @click="getSeguridad()" color="primary"
              :disable="!userRecovery || userRecovery.length < 6 || userRecovery == ''" class=" q-my-md"
              label="Continuar" />
          </div>
        </div>
      </q-card>
    </q-dialog>




    <q-dialog v-model="recuperarContrasenaModal">
      <q-card class=" q-pa-md">
        <q-card-section class="row justify-center items-center">
          <span class="q-ml-sm q-my-sm">Debe responder correctamentes sus preguntas de seguridad ó PIN para reestablecer
            su
            contraseña y acceder al sistema nuevamente.</span>
        </q-card-section>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs">
          <div class="row ">
            <div class="col-12 q-mb-xs">
              <q-input filled color="deep-purple-6" v-model="pregunta1" label="Responde la primera pregunta" type="text"
                disable />
            </div>
            <div class="col-12 q-mb-xs">
              <q-input filled color="deep-purple-6" v-model="respuesta1" label="Respuesta" type="text" />
            </div>

            <div class="col-12 q-mb-xs">
              <q-input filled color="deep-purple-6" v-model="passwordRecovery" label="Escribe la nueva contraseña"
                type="password" :rules="[
                  (val) => val.length >= 6 || 'Mínimo 6 caracteres',
                  (val) => val.length <= 20 || 'Máximo 20 caracteres',
                ]" />
            </div>

            <q-btn color="primary" :disable="respuesta1 == '' || passwordRecovery == '' || passwordRecovery.length < 6"
              class=" q-my-md" label="Comprobar por preguntas de recuperación" @click="comprobarPreguntas()" />
          </div>
        </div>

        <div v-if="tienePin" class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs">
          <div class="row ">
            <div class="col-12 q-mb-xs">
              <q-input filled color="deep-purple-6" v-model="pin" label="PIN de seguridad" type="text" />
            </div>

            <div class="col-12 q-mb-xs">
              <q-input filled color="deep-purple-6" v-model="passwordRecovery" label="Escribe la nueva contraseña"
                type="password" :rules="[
                  (val) => val.length >= 6 || 'Mínimo 6 caracteres',
                  (val) => val.length <= 20 || 'Máximo 20 caracteres',
                ]" />
            </div>

            <q-btn color="primary"
              :disable="pin === '' || pin.length < 4 || passwordRecovery === '' || passwordRecovery.length < 6"
              class=" q-my-md" label="Comprobar por PIN de recuperación" @click="comprobarPin()" />
          </div>
        </div>
      </q-card>
    </q-dialog>




    <q-dialog v-model="passwordModal" persistent>
      <q-card class=" q-pa-md">
        <q-card-section class="row justify-center items-center">
          <span class="q-ml-sm q-my-sm">Reestablece tu contraseña</span>
        </q-card-section>
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs">
          <div class="row ">
            <div class="col-12 q-mb-xs">
              <q-input filled color="deep-purple-6" v-model="passwordRecovery" label="Escribe la nueva contraseña"
                type="password" :rules="[
                  (val) => val.length >= 6 || 'Mínimo 6 caracteres',
                  (val) => val.length <= 20 || 'Máximo 20 caracteres',
                ]" />
            </div>
            <div class="col-12 q-mb-xs">
              <q-input filled color="deep-purple-6" v-model="passwordRecoveryRep" label="Confirmar nueva contraseña"
                type="password" :rules="[
                  (val) => !!val || 'Este campo es obligatorio',
                  (val) => val.length >= 6 || 'Mínimo 6 caracteres',
                  (val) => val.length <= 20 || 'Máximo 20 caracteres',
                  (val) => val === passwordRecovery || 'Las contraseñas no coinciden',
                ]" />
            </div>
            <q-btn color="primary" :disable="passwordRecovery === '' ||
              passwordRecoveryRep === ''" class=" q-my-md" label="Reestablecer" @click="setPassword()" />
          </div>
        </div>
      </q-card>
    </q-dialog>


  </div>

</template>
<script>
import { LOGIN_QUERY, DO_LOGIN_QUERY, GET_SEGURIDAD_RECUPERACION, VALIDAR_RECUPERACION_PREGUNTA, VALIDAR_RECUPERACION_PIN } from "../../../graphql/seguridad";
import { CHECK_USER_SEGURIDAD, COMPROBAR_PREGUNTAS } from '../../../graphql/user'
import { saveToken, saveInfo, removeToken } from "../../../utils/auth";
import store from "../../../store";
import { ACTUALIZAR_CONTRASEÑA } from "src/graphql/user";
export default {
  name: "login",
  data() {
    return {
      isPwd: true,
      passwordRules: [
        (val) => val.length >= 8 || 'Mínimo 8 caracteres',
        (val) => val.length <= 20 || 'Máximo 20 caracteres',
        (val) => /[0-9]/.test(val) || 'Debes incluir al menos 1 número',
        (val) => /[!@#$%^&*(),.?" :{}|<>]/.test(val) || 'Debes incluir al menos 1 carácter especial',
        (val) => /[A-Z]/.test(val) || 'Debes incluir al menos 1 letra mayúscula',
      ],
      loader: false,
      email: "",
      emailRecovery: "",
      passwordRecovery: "",
      passwordRecoveryRep: "",
      password: "",
      valid: true,
      recuperarContrasenaModal: false,
      checkUserModal: false,
      pregunta1: "",
      pregunta2: "",
      pregunta3: "",
      respuesta1: "",
      respuesta2: "",
      respuesta3: "",
      UserId: null,
      passwordModal: false,

      pin: "",

      userRecovery: "",
      tienePin: false,
      pregunta1_id: "",

    };
  },
  watch: {
    email(newValue) {
      if (
        newValue !== "" &&
        this.password !== ""
      ) {
        return (this.valid = false);
      } else {
        return (this.valid = true);
      }
    },
    password(newValue) {
      const errors = this.passwordRules
        .map(rule => rule(newValue))
        .filter(result => result !== true);
        if (errors.length === 0) {
          this.valid = false;
        } else {
          this.valid = true ;
        }
      
    },
  },
  methods: {
    login() {
      this.loader = true;
      this.$apollo
        .mutate({
          mutation: DO_LOGIN_QUERY,
          variables: {
            input: {
              nombre_usuario: this.email,
              contrasena: this.password,
            },
          },
        })
        .then(async (response) => {
          // console.log('response-login', response.data.login);
          this.loader = false;
          if (response.data.login.usuario) {
            await saveToken({ ...response.data.login });
            console.log('allstore:', store.state.user);
            this.$router.push({ name: "home" });
          } else {
            this.email = "";
            this.password = "";
            this.error = "Contraseña o correo no válido";
          }
        })
        .catch((err) => {
          console.log("hubo un error en login: ", err);
          console.log(err.message);
          this.loader = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    checkUser() {
      this.$apollo
        .query({
          query: CHECK_USER_SEGURIDAD,
          fetchPolicy: "network-only",
          variables: {
            email: this.emailRecovery,
          },
        })
        .then((response) => {
          this.loader = false;
          if (response.data.checkUserRecovery) {
            console.log("reponsee...", response.data.checkUserRecovery);
            const preguntas = response.data.checkUserRecovery;
            this.pregunta1 = preguntas.pregunta1
            this.pregunta2 = preguntas.pregunta2
            this.pregunta3 = preguntas.pregunta3
            this.recuperarContrasenaModal = true;
            this.UserId = preguntas.UserId;
            this.checkUserModal = false;
          } else {
            this.$q.notify({
              message: "No tienes seguridad registrada, contacta al administrador para tu cambio de contraseña",
              color: "negative",
            });
          }
        })
        .catch((err) => {
          console.log("hubo un error en login: ", err);
          console.log(err.message);
          this.loader = false;
          this.$q.notify({
            message: 'No tienes seguridad registrada',
            color: "negative",
          });
        });
    },
    comprobarPreguntas() {
      this.$apollo
        .mutate({
          mutation: VALIDAR_RECUPERACION_PREGUNTA,
          variables: {
            input: {
              nombre_usuario: this.userRecovery,
              respuestas: [{
                id_pregunta: this.pregunta1_id,
                respuesta: this.respuesta1
              }],
              nueva_contrasena: this.passwordRecovery
            }
          },
        })
        .then((response) => {
          this.loader = false;
          console.log("recovery", response.data.restaurarClavePorPregunta);
          if (response.data.restaurarClavePorPregunta) {
            this.respuesta1 = ""
            this.recuperarContrasenaModal = false;
            this.$q.notify({
              message: "Se ha reestablecido la contraseña correctamente",
              color: "positive",
            });
          } else {
            this.$q.notify({
              message: "Las respuestas no son correctas, intentalo de nuevo",
              color: "negative",
            });
          }
        })
        .catch((err) => {
          console.log("hubo un error en login: ", err);
          console.log(err.message);
          this.loader = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    comprobarPin() {
      this.$apollo
        .mutate({
          mutation: VALIDAR_RECUPERACION_PIN,
          variables: {
            input: {
              nombre_usuario: this.userRecovery,
              pin: this.pin,
              nueva_contrasena: this.passwordRecovery
            }
          },
        })
        .then((response) => {
          this.loader = false;
          console.log("recovery", response.data.restaurarClavePorPin);
          if (response.data.restaurarClavePorPin) {
            this.pin = "";
            this.recuperarContrasenaModal = false;
            this.$q.notify({
              message: "Se ha reestablecido la contraseña correctamente",
              color: "positive",
            });
          } else {
            this.$q.notify({
              message: "El pin no es correcto, intentalo de nuevo",
              color: "negative",
            });
          }
        })
        .catch((err) => {
          console.log("hubo un error en login: ", err);
          console.log(err.message);
          this.loader = false;
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
            nombre_usuario: this.userRecovery
          }
        })
        .then((response) => {
          // console.log("seguridad?? ", response.data.metodosRecuperacion);
          if (response.data.metodosRecuperacion.tienePin || response.data.metodosRecuperacion.preguntas.length > 0) {
            const seguridad = response.data.metodosRecuperacion;
            this.pregunta1 = seguridad.preguntas[0].pregunta;
            this.tienePin = seguridad.tienePin || false;;
            this.pregunta1_id = seguridad.preguntas[0].id_pregunta;
            this.checkUserModal = false;
            this.recuperarContrasenaModal = true;
          } else {
            this.$q.notify({
              message: "No tienes seguridad registrada, contacta al administrador para tu cambio de contraseña",
              color: "negative",
            });
          }
        })
        .catch((err) => {
          this.updateSeguridad = false;
          this.checkUserModal = false;
          this.userRecovery = "";
          if (this.$isDev) console.log("hubo un error: ", err);
          this.$q.notify({
            message: "No tienes seguridad registrada",
            color: "negative",
          });
        });
    },
    setPassword() {
      this.$apollo
        .mutate({
          mutation: ACTUALIZAR_CONTRASEÑA,
          variables: {
            UserId: this.UserId,
            password: this.passwordRecovery
          },
        })
        .then((response) => {
          this.passwordRecovery = "";
          this.emailRecovery = "";
          this.pregunta1 = "";
          this.pregunta2 = "";
          this.pregunta3 = "";
          this.passwordModal = false;
          this.$q.notify({
            color: "positive",
            textColor: "white",
            icon: "mdi-check",
            message: "Contraseña reestablecida",
          });
        })
        .catch((err) => {
          console.log("there was an error: ", err);
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    destroy() {
      removeToken();
      this.$store.commit("logout");
      this.$router.push({ name: "/" });
    },
  },
};
</script>
