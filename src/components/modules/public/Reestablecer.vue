<template>
  <div class="row" style="min-height: 75vh">
    <div class="col-12 self-center">
      <div v-if="message || error">
        <div class="row justify-center">
          <div class="col-8">
            <q-banner
              class="text-white text-center"
              style="border-radius: 10px; background-color: #f2b919"
            >
              <div class="q-mx-lg q-my-lg" v-if="message">
                {{ message }}
              </div>
              <div class="q-mx-lg q-my-lg" v-else-if="error">
                {{ error }}
              </div>
              <template v-slot:action>
                <q-btn flat color="white" to="/Login" label="Login" />
              </template>
            </q-banner>
          </div>
        </div>
      </div>
      <div v-else-if="!message">
        <div class="row">
          <q-btn
            dense
            color="primary float-left fixed-top"
            flat
            icon="close"
            v-close-popup
            v-if="isModal"
          >
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
          <div
            class="offset-1 col-xs-10 justify-center q-mt-xl self-center"
            :class="!isModal ? 'q-mx-auto' : ''"
          >
            <div class="row justify-center">
              <div style="margin-top: 10px">
                <div class="login-container">
                  <div>
                    <div class="row items-center justify-center">
                      <form method="POST" @submit.prevent="reset">
                        <div>
                          <q-input
                            outlined
                            color="amber-8"
                            ref="password"
                            v-model="password"
                            :type="isPwd ? 'password' : 'text'"
                            label="Contraseña"
                            :rules="[
                              (val) => !!val || 'Este campo es obligatorio',
                              (val) => val.length >= 6 || 'Mínimo 6 caracteres',
                              (val) =>
                                val.length <= 20 || 'Máximo 20 caracteres',
                            ]"
                          >
                            <template v-slot:append>
                              <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                              />
                            </template>
                          </q-input>
                        </div>
                        <div>
                          <q-input
                            outlined
                            color="amber-8"
                            ref="password2"
                            v-model="password2"
                            :type="isPwd ? 'password' : 'text'"
                            label="Confirmar contraseña"
                            :rules="[
                              (val) => !!val || 'Este campo es obligatorio',
                              (val) => val.length >= 6 || 'Mínimo 6 caracteres',
                              (val) =>
                                val.length <= 20 || 'Máximo de 20 caracteres',
                              (val) =>
                                val === password ||
                                'Las contraseñas no coinciden',
                            ]"
                          >
                            <template v-slot:append>
                              <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                              />
                            </template>
                          </q-input>
                        </div>
                        <div>
                          <q-btn
                            :loading="loader"
                            unelevated
                            style="background-color: #f2b919"
                            size="md"
                            class="full-width text-white"
                            label="Recuperar contraseña"
                            type="submit"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RESET_MUTATION } from "../../../graphql/seguridad";
export default {
  name: "Reestablecer",
  data() {
    return {
      loader: false,
      password: "",
      password2: "",
      isPwd: true,
      response: false,
      token: null,
      message: false,
      error: null,
      isModal: false,
    };
  },
  mounted() {
    this.token = this.$route.query.token || null;
    if (!this.token)
      this.error = "Se requiere un token para procesar la solicitud";
  },
  methods: {
    reset() {
      this.loader = true;
      this.$apollo
        .mutate({
          mutation: RESET_MUTATION,
          variables: {
            token: this.token,
            password: this.password,
          },
        })
        .then((response) => {
          this.loader = false;
          this.message =
            "Tu contraseña ha sido cambiada con éxito, ya puedes iniciar sesión con tu nueva contraseña";
        })
        .catch((err) => {
          this.loader = false;
          this.$store.commit("notification", err.graphQLErrors[0].message);
        });
    },
    show() {
      if (this.token === null || this.message || this.error) return true;
      return false;
    },
  },
};
</script>