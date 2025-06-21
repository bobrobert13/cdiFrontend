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
            <span class="text-h4 text-accent text-bold">Registro</span>
          </div>
          <q-input
            :disable="loader"
            filled
            color="amber-8"
            clearable
            v-model="fullName"
            type="text"
            label="Nombre completo"
            :rules="[
              (val) => !!val || 'Este campo es obligatorio',
              (val) => val.length >= 3 || 'Mínimo 3 caracteres',
              (val) => val.length <= 40 || 'Máximo 40 caracteres',
              (val) =>
                /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                'Solo se permiten caracteres',
            ]"
          />
          <q-input
            :disable="loader"
            filled
            color="amber-8"
            clearable
            v-model="email"
            type="email"
            label="Correo"
            :rules="[
              (val) => !!val || 'Este campo es obligatorio',
              (val) => val.length <= 40 || 'Máximo 40 caracteres',
              (val) =>
                /^([a-zA-Z0-9._-]{3,}[@][a-zA-Z0-9.]{3,}[.][a-zA-Z0-9.]{2,5})*$/.test(
                  val
                ) || 'Formato de correo inválido',
            ]"
          />
          <q-input
            filled
            :disable="loader"
            color="amber-8"
            clearable
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            label="Contraseña"
            :rules="[
              (val) => !!val || 'Este campo es obligatorio',
              (val) => val.length >= 6 || 'Mínimo 6 caracteres',
              (val) => val.length <= 20 || 'Máximo 20 caracteres',
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
          <q-input
            square
            :disable="loader"
            filled
            color="amber-8"
            clearable
            v-model="password2"
            :type="isPwd ? 'password' : 'text'"
            label="Repite la contraseña"
            :rules="[
              (val) => !!val || 'Este campo es obligatorio',
              (val) => val.length >= 6 || 'Mínimo 6 caracteres',
              (val) => val.length <= 20 || 'Máximo 20 caracteres',
              (val) => val === password || 'Las contraseñas no coinciden',
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
          <q-btn
            unelevated
            size="lg"
            :loading="loader"
            @click="register()"
            class="full-width text-white text-bold bg-primary"
            label="Registrar"
          />
          <br />
          <br />
          <div class="row justify-center">
            <div class="col">
              <p class="text-grey-6" style="cursor: pointer">
                <q-btn
                  class="full-width"
                  label="Ya poseo una cuenta"
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
import { REGISTRAR_MUTATION } from "../../../graphql/seguridad";
export default {
  name: "registro",
  data() {
    return {
      isPwd: true,
      fullName: "",
      email: "",
      password: "",
      password2: "",
      messaje: "",
      valid: true,
      loader: false,
    };
  },
  watch: {
    password(newValue) {
      if (newValue === this.password2) {
        this.messaje = "";
        return (this.valid = false);
      } else {
        this.messaje = "La contraseña no coincide";
        return (this.valid = true);
      }
    },
    password2(newValue) {
      if (newValue === this.password) {
        this.messaje = "";
        return (this.valid = false);
      } else {
        this.messaje = "La contraseña no coincide";
        return (this.valid = true);
      }
    },
    email(newValue) {
      if (
        newValue === "" &&
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
        newValue === "" &&
        newValue.length >= 3 &&
        newValue.length <= 40 &&
        /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(newValue)
      ) {
        return (this.valid = false);
      } else {
        return (this.valid = true);
      }
    },
  },
  methods: {
    register() {
      this.loader = true;
      this.$apollo
        .mutate({
          mutation: REGISTRAR_MUTATION,
          variables: {
            data: {
              name: this.fullName,
              email: this.email,
              password: this.password,
            },
          },
        })
        .then((response) => {
          this.response = true;
          this.loader = false;
          this.register = false;
          this.$router.push({ name: "login" });
          this.$q.notify({
            message: "Registro exitoso",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          console.log("hubo un error en registrar: ", err);
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
  },
};
</script>
