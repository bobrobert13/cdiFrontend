<template>
  <div class="row justify-center">
    <div class="col-12 self-end">
      <span class="text-bold text-h6 text-accent">Panel de administrador</span>
    </div>
    <div
      class="col-12 self-end bg-white"
      style="min-height: 85vh; border-radius: 20px"
    >
      <q-scroll-area
        class="q-mt-md q-mb-md"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 75vh"
      >
        <div class="row q-ma-md justify-center" v-if="controlLista === true">
          <div class="col-9">
            <div class="row justify-center full-width no-wrap">
              <div
                class="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-xs-10 text-white q-pa-md"
              >
                <div
                  @click="userControl()"
                  class="row bg-primary"
                  style="min-height: 150px; border-radius: 20px; cursor: pointer"
                >
                  <div class="col-12 text-center self-center">
                    <q-icon
                      class="q-mb-xs"
                      name="mdi-human-male"
                      size="xl"
                    ></q-icon>
                    <br />
                    <span class="text-center">Control de pacientes</span>
                  </div>
                </div>
              </div>
              <div
                class="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-xs-10 text-white q-pa-md"
              >
                <div
                  @click="adminControl()"
                  class="row bg-primary"
                  style="min-height: 150px; border-radius: 20px; cursor: pointer"
                >
                  <div class="col-12 text-center self-center">
                    <q-icon
                      class="q-mb-xs"
                      name="mdi-face-agent"
                      size="xl"
                    ></q-icon>
                    <br />
                    <span class="text-center">Control de CDIs</span>
                  </div>
                </div>
              </div>
              <div
                class="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-xs-10 text-white q-pa-md"
              >
                <div
                  @click="doctorControl()"
                  class="row bg-primary"
                  style="min-height: 150px; border-radius: 20px; cursor: pointer"
                >
                  <div class="col-12 text-center self-center">
                    <q-icon
                      class="q-mb-xs"
                      name="mdi-doctor"
                      size="xl"
                    ></q-icon>
                    <br />
                    <span class="text-center">Control de doctores(a)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-ma-md justify-center" v-if="usersView === true">
          <div class="col-10 q-mb-xl text-right">
            <span
              class="text-bold text-h6 text-accent"
              style="cursor: pointer"
              @click="(usersView = false), (controlLista = true)"
              >Volver</span
            >
          </div>
          <div class="col-10 q-mb-xl text-center">
            <users></users>
          </div>
        </div>
        <div class="row q-ma-md justify-center" v-if="adminsView === true">
          <div class="col-10 q-mb-xl text-right">
            <span
              class="text-bold text-h6 text-accent"
              style="cursor: pointer"
              @click="(adminsView = false), (controlLista = true)"
              >Volver</span
            >
          </div>
          <div class="col-10 q-mb-xl text-center">
            <admins></admins>
          </div>
        </div>
        <div class="row q-ma-md justify-center" v-if="doctoresView === true">
          <div class="col-10 q-mb-xl text-right">
            <span
              class="text-bold text-h6 text-accent"
              style="cursor: pointer"
              @click="(doctoresView = false), (controlLista = true)"
              >Volver</span
            >
          </div>
          <div class="col-10 q-mb-xl text-center">
            <doctores></doctores>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>
<script>
import users from "../admin/users";
import admins from "../admin/admins";
import doctores from "../admin/doctores";
export default {
  name: "homeAdmin",
  components: {
    users,
    admins,
    doctores
  },
  data() {
    return {
      controlLista: true,
      usersView: false,
      adminsView: false,
      doctoresView: false,
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
    };
  },
  watch: {},
  methods: {
    userControl() {
      this.usersView = true;
      this.controlLista = false;
    },
    adminControl() {
      this.adminsView = true;
      this.controlLista = false;
    },
    doctorControl() {
      this.doctoresView = true;
      this.controlLista = false;
    },
  },
};
</script>
