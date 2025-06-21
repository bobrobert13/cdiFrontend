<template>
  <div class="row justify-center">
    <div class="col-xl-11 col-lg-11 col-md-11 col-sm-10 col-xs-12">
      <div class="row justify-center" style="min-height: 100vh">
        <div class="col-9 self-end" v-if="workersView === true">
          <q-icon
            style="cursor: pointer"
            @click="workersView = false"
            name="mdi-keyboard-backspace"
            size="sm"
            class="text-accent"
          ></q-icon
          ><span
            class="text-accent text-subtitle text-bold"
            style="cursor: pointer"
            @click="workersView = false"
            >Volver</span
          >
        </div>
        <div
          class="col-xl-9 col-lg-9 col-md-9 col-sm-11 col-xs-11 self-end"
          v-if="workersView === false"
        >
          <homeAdmin v-if="this.$store.state.user.role === 'admin'"></homeAdmin>
          <homeEncargado v-if="this.$store.state.user.role === 'Encargado'"></homeEncargado>
          <homeDoctor v-if="this.$store.state.user.role === 'Doctor'"></homeDoctor>
        </div>
        <!-- <div
          class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12 self-end"
          v-if="workersView === true"
        >
          <workers
            :viewType="viewType"
            :dataWorker="dataWorker"
            :wallet="myWallet"
            @updateUsers="updateUsers($event)"
          ></workers>
        </div> -->
      </div>
    </div>
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
                  <div class="col-6 q-pa-sm">
                    <q-input
                      filled
                      color="deep-purple-6"
                      v-model="name"
                      label="Nombre completo"
                    />
                  </div>
                  <div class="col-6 q-pa-sm">
                    <q-input
                      filled
                      disable
                      color="deep-purple-6"
                      v-model="email"
                      label="Correo"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12 q-pa-sm" v-if="user.role === 'user'">
                <q-banner class="bg-grey-3 text-left">
                  <span
                    v-if="user.status === 'prueba'"
                    class="text-bold text-accent"
                    >Tipo de cuenta: Plan gratuito (contacta al admin para
                    mejorrar tu plan)</span
                  >
                  <span
                    v-if="user.status === 'activo'"
                    class="text-bold text-accent"
                    >Tipo de cuenta: Pagada</span
                  >
                  <span
                    v-if="user.status === 'deshabilitado'"
                    class="text-bold text-accent"
                    >Tipo de cuenta: Deshabilitada (contacta al admin para
                    mejorrar tu plan)</span
                  >
                  <span
                    v-if="user.status === 'expirado'"
                    class="text-bold text-accent"
                    >Tipo de cuenta: Plan gratuito expirado (contacta al admin
                    para mejorrar tu plan)</span
                  >
                  <br />
                  <span class="text-bold text-accent"
                    >Tu cuenta fue creada el {{ createdAt }} y se vence
                    {{ expireDate }}
                  </span>
                  <template v-slot:action>
                    <q-btn
                      flat
                      color="primary"
                      label="Contactar administrador"
                    />
                  </template>
                </q-banner>
              </div>
              <div class="col-4">
                <q-btn
                  unelevated
                  :loading="loader"
                  @click="modificarDatos()"
                  class="fullwidth text-white bg-primary"
                  label="Modificar datos"
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
  </div>
</template>
<script>
import upload from "../../components/upload";
import homeAdmin from "../home/homeAdmin";
// import homeUser from "../home/homeUser";
// import homeOperador from "../home/homeOperador";
// import homeAfiliado from "../home/homeAfiliado";
import homeDoctor from "../home/homeDoctor";
import homeEncargado from "../home/homeEncargado";
// import workers from "../home/workers";
import config from "../../../config";
// import { USER_WALLET_QUERY } from "../../../graphql/wallet";
import {
  DATOS_PERSONALES_QUERY,
  MY_WORKERS_QUERY,
  UPDATE_MUTATION,
} from "../../../graphql/user";
import moment from "moment";
export default {
  name: "home",
  components: {
    homeAdmin,
    // homeUser,
    // homeOperador,
    homeDoctor,
    homeEncargado,
    // homeAfiliado,
    // workers,
    upload,
  },
  data() {
    return {
      myWallet: [],
      name: "",
      email: "",
      loader: false,
      myInfoD: false,
      user: {},
      dataWorker: {},
      config: config,
      viewType: "",
      workersView: false,
      bancoFilter: "",
      allWorkers: [],
      options: ["no opcion"],
      model: "",
      tab1: "control",
      tab2: "transferencias",
      expireDate: "",
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
      preview: "",
      image: "",
      file: [],
      profileImage: [],
    };
  },
  created() {
    this.infoUser();
    // this.myWorkers();
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
  computed: {
    createdAt() {
      return moment(this.user.createdAt).format("DD-MM-YYYY");
    },
  },
  methods: {
    setImage(file) {
      console.log(file[0]);
      this.file = file[0];
    },
    removeFile(event) {
      console.log(event);
      this.file = event.file;
    },
    myInfo() {
      this.myInfoD = true;
      this.name = this.user.name;
      this.email = this.user.email;
    },
    updateUsers(event) {
      if (event.users === true) this.myWorkers();
    },
    // myWorkers() {
    //   this.$apollo
    //     .query({
    //       query: MY_WORKERS_QUERY,
    //       fetchPolicy: "network-only",
    //     })
    //     .then((response) => {
    //       this.loaderUser = false;
    //       this.allWorkers = Object.assign([], response.data.MyWorkers);
    //     })
    //     .catch((err) => {
    //       this.loaderUser = false;
    //       this.$q.notify({
    //         message: err.message.split("GraphQL error:"),
    //         color: "negative",
    //       });
    //     });
    // },
    // workerView(viewType, worker) {
    //   this.dataWorker = worker;
    //   this.viewType = viewType;
    //   this.workersView = true;
    //   if (worker.role === "afiliado") {
    //     this.WalletCredit(worker);
    //   }
    // },
    // WalletCredit(worker) {
    //   this.loaderBalance = true;
    //   this.$apollo
    //     .query({
    //       query: USER_WALLET_QUERY,
    //       fetchPolicy: "network-only",
    //       variables: {
    //         id: worker.id,
    //       },
    //     })
    //     .then((response) => {
    //       this.loaderBalance = false;
    //       this.myWallet = response.data.MyWallet;
    //       console.log("wallet user:", this.myWallet);
    //     })
    //     .catch((err) => {
    //       this.loaderBalance = false;
    //       this.$q.notify({
    //         message: err.message.split("GraphQL error:"),
    //         color: "negative",
    //       });
    //     });
    // },
    infoUser() {
      this.$apollo
        .query({
          query: DATOS_PERSONALES_QUERY,
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.response = true;
          this.user = Object.assign({}, response.data.oneUser);
          let fecha = moment(this.user.createdAt).add(15, "days").toDate();
          var openingDate = moment(fecha);
          var fromNow = openingDate.fromNow();
          this.expireDate = fromNow;
        })
        .catch((err) => {
          if (this.$isDev) console.log("hubo un error: ", err);
        });
    },
    modificarDatos() {
      this.loader = true;
      const data = {
        profileImage: this.file.length === 0 ? undefined : this.file,
        name: this.name,
        email: this.email,
      };
      return this.$apollo
        .mutate({
          mutation: UPDATE_MUTATION,
          variables: {
            id: this.user.id,
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
  },
};
</script>
