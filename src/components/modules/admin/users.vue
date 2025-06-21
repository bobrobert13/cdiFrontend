<template>
  <div class="row justify-center">
    <div class="col-12" v-if="viewType === 'userList'">
      <span class="text-accent text-h6 text-bold"
        >Control de pacientes</span
      >
      <div class="row justify-center">
        <div class="col-12 self-center text-right">
          <q-icon
            style="cursor: pointer"
            @click="workerView('searchUser')"
            name="mdi-account-search"
            class="text-primary"
            size="md"
          ></q-icon>
          <span class="text-bold text-primary" style="cursor: pointer" @click="workerView('searchUser')">Buscar paciente</span>
        </div>
      </div>
      <div class="row justify-center q-mt-xl" v-if="this.users.length !== 0">
        <div class="col-12 q-mb-sm" v-for="(user, index) in users" :key="index">
          <q-list
            class="rounded-borders bg-secondary"
            style="border-radius: 15px"
          >
            <q-item>
              <q-item-section
                top
                @click="userDetail(user)"
                style="cursor: pointer"
              >
                <q-item-label class="text-left" lines="1">
                  <span class="text-weight-medium">{{ user.name }}</span>
                </q-item-label>
                <q-item-label class="text-left" lines="1">
                  <span class="text-weight-medium">CI: {{ user.dni }}</span>
                </q-item-label>
              </q-item-section>
              <!-- <q-item-section side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    @click="generatePDF(user)"
                    class="gt-xs text-positive"
                    size="12px"
                    flat
                    dense
                    round
                    icon="mdi-briefcase-download"
                  />
                </div>
              </q-item-section> -->
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-12 q-mt-xl">
          <span class="text-caption">No hay pacientes registrados</span>
        </div>
      </div>
    </div>
    <div class="row justify-center" v-if="viewType === 'searchUser'">
      <div class="col-12">
        <div>
            <div class="col-12 text-left">
              <q-icon
                  style="cursor: pointer"
                  @click="workerView('userList')"
                  name="mdi-arrow-left"
                  class="text-primary"
                  size="md"
                ></q-icon>
            </div>
            <div class="row justify-center">
              <div class="col-12 text-bold text-accent text-center text-h6">
                <span>Buscar paciente</span>
              </div>
              <q-icon
                name="mdi-account-search"
                size="200px"
                class="text-secondary"
              ></q-icon>
              <div class="col-10 q-mt-md">
                <q-input
                  outlined
                  filled
                  type="number"
                  color="deep-purple-6"
                  v-model="dni"
                  label="Cédula"
                />
              </div>
            </div>
            <div class="row justify-center">
              <div class="col-4 q-mt-md">
                <q-btn
                  label="Buscar"
                  class="full-width"
                  color="primary"
                  :disable="dni === ''"
                  @click="buscarUsuario(dni)"
                />
              </div>
            </div>
        </div>
      </div>
    </div>
    <div>
      <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="historialMedico"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      :pdf-margin="10"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      @progress="onProgress($event)"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <historiaPdf :data="dataUser" />
      </section>
      </vue-html2pdf>
    </div>
    <q-dialog v-model="modalDetailUser">
      <q-card class="my-card" flat bordered style="min-width: 350px">
        <q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <div class="text-overline">Historia clinica</div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-avatar>
              <q-icon size="xl" name="mdi-doctor"></q-icon>
            </q-avatar>
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div class="text-caption text-bold q-mt-sm q-mb-xs">Paciente: {{dataUser.name}}</div>
            <div class="text-caption q-mt-sm q-mb-xs">CI: {{dataUser.dni}}</div>
            <div class="text-caption q-mt-sm q-mb-xs">Télefono: {{dataUser.telefono}}</div>
            <div class="text-caption q-mt-sm q-mb-xs">Calle: {{detailCalle}}</div>
            <div class="text-caption q-mt-sm q-mb-xs">Sector: {{detailSector}}</div>
            <div class="text-caption q-mt-sm q-mb-xs">Edad: {{dataUser.edad}}</div>
            <div class="text-caption q-mt-sm q-mb-xs">Sexo: {{dataUser.sexo}}</div>
            <div class="text-caption q-mt-sm q-mb-xs">Agregado por el doctor: {{this.doctor}}</div>
            <div class="text-caption q-mt-sm q-mb-xs">Consultas: </div>
            <q-scroll-area style="height: 150px; max-width: 100%;">
                <div v-for="(consulta, index) in dataUser.consultas" :key="index" class="q-py-xs">
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Entrada: {{ entradaFecha(consulta.ingreso) }} / Salida: {{ salidaFecha(consulta.salida) }}</q-item-label>
                        <q-item-label lines="2">Diagnostico: {{ consulta.diagnostico }}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-separator spaced inset />
                  </q-list>
                </div>
              </q-scroll-area>
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center">
          <q-btn flat v-close-popup>
            Cerrar
          </q-btn>
          <q-btn flat :disable="!dataUser.consultas"  v-close-popup color="primary" @click="generatePDF(user)">
            Descargar historia
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { ADMIN_PACIENTES_QUERY } from "../../../graphql/admin";
import {
  BUSCAR_PACIENTE_QUERY,
  BUSCAR_DOCTOR_QUERY
} from "../../../graphql/user";
import config from "../../../config";
import VueHtml2pdf from "vue-html2pdf";
import historiaPdf from "./hitoriaPdf.vue";
import moment from 'moment'
export default {
  name: "users",
  components: {
    VueHtml2pdf,
    historiaPdf
  },
  data() {
    return {
      loaderPdf: false,
      users: {},
      dataUser: [],
      config: config,
      dni: "",
      modalDetailUser: false,
      viewType: "userList",
      buscador: true,
      email: "",
      valid: true,
      doctor: "",
      detailSector: "",
      detailCalle: "",
    };
  },
  created() {
    this.AllUsers();
  },
  watch: {
    async highlight(newValue) {
      this.imghightlight = "";
      let image = await this.readFileAsync(newValue);
      this.imghightlight = image;
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
  },
  methods: {
    salidaFecha (salida) {
      return moment(salida).format('DD-MM-YYYY')
    },
    entradaFecha (entrada){
      return moment(entrada).format('DD-MM-YYYY')
    },
    onProgress(event) {
      console.log(`Processed: ${event} / 100`);
      this.loaderPdf = true;
    },
    hasGenerated() {
      alert("PDF generated successfully!");
      this.loaderPdf = false;
    },
    generatePDF() {
      this.$refs.html2Pdf.generatePdf();
    },
    workerView(typeView){
      this.viewType = typeView
    },
    AllUsers() {
      this.$apollo
        .query({
          query: ADMIN_PACIENTES_QUERY,
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.loaderUser = false;
          console.log("all paciene", response.data.allPacientes);
          this.users = Object.assign([], response.data.allPacientes);
        })
        .catch((err) => {
          this.loaderUser = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    userDetail(user){
      this.modalDetailUser = true;
      this.dataUser = user;
      this.detailSector = user.direccion.sector;
      this.detailCalle = user.direccion.calle;
      this.buscarDoctor(user.fatherID)
      if(this.dataUser.nacionalidad === 'V') {
        this.nacionalidadUser = "Venezolano/a"
      } else if(this.dataUser.nacionalidad === 'J') {
        this.nacionalidadUser = "Jurídico"
      } else {
        this.nacionalidadUser = "Extranjero/a"
      }
    },
    downloadPdf(user){

    },
    buscarDoctor(id) {
      console.log(id)
      this.loaderOrders = true;
      let data = {
        id: id,
        role: "Doctor"
      };
      this.$apollo
        .query({
          query: BUSCAR_DOCTOR_QUERY,
          variables: {
            data: data,
          },
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.loaderOrders = false;
          if (response.data.BuscarDoctor.length !== 0) {
            this.doctor = response.data.BuscarDoctor[0].name;
          } else {
            this.$q.notify({
              message: "Este doctor no existe",
              color: "negative",
            });
          }
        })
        .catch((err) => {
          this.loaderOrders = false;
          this.$q.notify({
            message: err.message.split("GraphQL error === true:"),
            color: "negative",
          });
        });
    },
    buscarUsuario(dni) {
      this.loaderOrders = true;
      let data = {
        dni: dni,
        role: "Paciente"
      };
      this.$apollo
        .query({
          query: BUSCAR_PACIENTE_QUERY,
          variables: {
            data: data,
          },
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.loaderOrders = false;
          this.dni = "";
          if (response.data.BuscarPaciente.length !== 0) {
            this.dataUser = response.data.BuscarPaciente[0];
            this.modalDetailUser = true;
          } else {
            this.$q.notify({
              message: "Este paciente no existe",
              color: "negative",
            });
          }
        })
        .catch((err) => {
          this.loaderOrders = false;
          this.$q.notify({
            message: err.message.split("GraphQL error === true:"),
            color: "negative",
          });
        });
    },
  },
};
</script>
