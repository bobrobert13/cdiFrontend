<template>
  <div class="row justify-center">
    <div class="col-8">
      <div
        class="row justify-end"
        style="min-height: 100vh; position: relative"
        :style="
          this.$q.screen.lt.md ? 'margin-right: -35%' : 'margin-right: -20%'
        "
      >
        <div
          class="col-xl-5 col-lg-4 col-md-5 col-sm-8 col-xs-11 bg-white q-pa-xl self-center text-center"
          style="border-radius: 10px"
        >
          <div class="q-mb-xl">
            <span class="text-h4 text-accent text-bold">Ingresa tu correo</span>
          </div>
          <q-input
            filled
            v-model="email"
            type="email"
            label="Dirección de correo"
            :loading="loading"
            color="amber-8"
          >
          </q-input>
          <q-btn
            :loading="loading"
            unelevated
            size="lg"
            class="full-width text-accent text-bold bg-primary q-mt-md"
            label="Recuperar"
            type="submit"
            @click="recuperar()"
          />
          <br />
          <br />
          <div class="row justify-center">
            <div class="col">
              <p class="text-grey-6" style="cursor: pointer">
                <q-btn
                  class="full-width"
                  label="Volver"
                  flat
                  to="/"
                  no-caps
                ></q-btn>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4 bg-primary"></div>
  </div>
</template>

<script>
import { RECUPERAR_MUTATION } from "../../../graphql/seguridad";
export default {
  name: "recuperar",
  data() {
    return {
      email: "",
      message: null,
      error: "",
      loading: false,
    };
  },
  watch: {
    email(newValue, oldValue) {
      if (this.message || this.error) {
        this.message = "";
        this.error = "";
      }
    },
  },
  methods: {
    recuperar() {
      this.loading = true;
      this.$apollo
        .mutate({
          mutation: RECUPERAR_MUTATION,
          variables: {
            email: this.email,
          },
        })
        .then((response) => {
          console.log("recuperar cotraseña: ", response);
          this.loading = false;
          this.$q.notify({
            message: "Se ha enviado un enlace a tu cuenta de correo eletrónico",
            color: "positive",
          });
          this.email = "";
          this.message =
            "Se ha enviado un enlace a tu cuenta de correo eletrónico";
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          error = error.graphQLErrors[0].message;
          if (error === "email-not-exist") {
            this.error = "La dirección de correo eletrónico no existe";
            this.$q.notify({
              message: "La dirección de correo eletrónico no existe",
              color: "negative",
            });
            this.loading = false;
          } else {
            this.$q.notify({
              message: "Ha ocurrido un error al procesar la solicitud",
              color: "negative",
            });
          }
        });
    },
  },
};
</script>
