<template>
  <div class="row justify-center">
    <div class="col-12" v-if="viewType === 'userList'">
      <span class="text-accent text-h6 text-bold">Todos los pacientes</span>
      <div class="row justify-center">
        <div class="col-12 self-center text-right">
          <q-icon style="cursor: pointer" @click="workerView('searchUser')" name="mdi-account-search"
            class="text-primary" size="md"></q-icon>
          <span class="text-bold text-primary" style="cursor: pointer" @click="workerView('searchUser')">Buscar
            paciente</span>
        </div>
      </div>
      <div class="row justify-center q-mt-xl" v-if="this.users.length !== 0">
        <div class="col-12 q-mb-sm" v-for="(user, index) in users" :key="index">
          <q-list class="rounded-borders bg-secondary" style="border-radius: 15px">
            <q-item>
              <q-item-section top @click="userDetail(user)" style="cursor: pointer">
                <q-item-label class="text-left q-mb-xs" lines="1">
                  <span class="text-weight-medium">Nombre de paciente: {{ user.persona.nombre1 }}</span>
                </q-item-label>
                <q-item-label class="text-left q-mb-xs" lines="1">
                  <span class="text-weight-medium">Documento de identidad: {{ user.persona.cedula_identidad
                  }}</span>
                </q-item-label>
                <q-item-label class="text-left" lines="1">
                  <span class="text-weight-medium">Edad del paciente: {{ user.persona.edad }} años</span>
                </q-item-label>
                <q-separator spaced color="blue-grey" />
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
            <q-icon style="cursor: pointer" @click="workerView('userList')" name="mdi-arrow-left" class="text-primary"
              size="md"></q-icon>
          </div>
          <div class="row justify-center">
            <div class="col-12 text-bold text-accent text-center text-h6">
              <span>Buscar paciente</span>
            </div>
            <q-icon name="mdi-account-search" size="200px" class="text-secondary"></q-icon>
            <div class="col-10 q-mt-md">
              <q-input outlined filled type="number" color="deep-purple-6" v-model="dni" label="Cédula" />
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-4 q-mt-md">
              <q-btn label="Buscar" class="full-width" color="primary" :disable="dni === ''"
                @click="buscarUsuario(dni)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
        :paginate-elements-by-height="1400" filename="historialMedico" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="10" pdf-orientation="portrait" pdf-content-width="800px"
        @progress="onProgress($event)" ref="html2Pdf">
        <section slot="pdf-content">
          <historiaPdf :data="dataUser" />
        </section>
      </vue-html2pdf>
    </div>
    <q-dialog v-model="modalDetailUser">
      <q-card class="my-card" flat bordered style="min-width: 480px">
        <q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <div class="text-overline">Historia clinica</div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-avatar>
              <q-icon size="xl" name="mdi-doctor"></q-icon>
            </q-avatar>
          </q-card-section>

          <q-card-section v-if="dataUser.persona" class="q-pt-xs q-pb-none no-margin">
                  <p class="text-subtitle text-bold text-grey-9">Detalles del paciente</p>
                  <div class="text-caption text-bold q-mt-sm q-mb-xs">Paciente: {{ dataUser.persona.nombre1 }}</div>
                  <div class="text-caption q-mt-sm q-mb-xs">Documento de identidad:
                    {{ dataUser.persona.cedula_identidad }}</div>
                  <div class="text-caption q-mt-sm q-mb-xs">Edad del paciente: {{ dataUser.persona.edad }}</div>
                  <div class="text-caption q-mt-sm q-mb-xs">Ocupación: {{ dataUser.persona.ocupacion }}</div>
                  <div class="text-caption q-mt-sm q-mb-xs">Sexo: {{ dataUser.persona.sexo }}</div>
                  <div class="text-caption q-mt-sm q-mb-xs">Estado civil: {{ dataUser.persona.estado_civil }}</div>
                  <div class="text-caption q-mt-sm q-mb-xs">Número de teléfono: {{ dataUser.persona.telefono.codigo }}{{ dataUser.persona.telefono.numero }}</div>
                  <div class="text-caption q-mt-sm q-mb-xs">Dirección: {{ dataUser.persona.direccion.sector }} - {{ dataUser.persona.direccion.calle }}  - {{ dataUser.persona.direccion.parroquia }} - {{ dataUser.persona.direccion.municipio }} - {{ dataUser.persona.direccion.codigo_postal }}</div>
                  <div class="text-caption q-mt-sm q-mb-xs">Correo electrónico: {{ dataUser.persona.correo.correo }}</div>
               
                </q-card-section>

                <q-card-section class="q-pt-md">
                <div class="row items-center q-px-sm justify-center">
                  <div class="col-6">
                    <span class="text-caption text-bold q-mt-sm q-mb-xs">Consultas relacionadas</span>
                  </div>
                  <div class="col-6 text-right">
                    <span class="text-caption text-positive text-bold q-mt-sm q-mb-xs"
                      style="cursor: pointer;"></span>
                  </div>
                </div>
                <q-item-section v-if="!dataUser.consultas || !dataUser.consultas.length">
                  <q-item-section class="row q-pa-sm justify-center">
                    El paciente aún no tiene consultas asignadas
                  </q-item-section>
                </q-item-section>
                <q-scroll-area v-else style="height: 250px; max-width: 100%;">
                  <div v-for="(consulta, index) in dataUser.consultas" :key="index" class="q-py-xs">
                    <q-list >
                      <q-item style="cursor:pointer;">
                        <q-item-section>
                          <q-item-label caption>Paciente debe asistir el: <b>{{ entradaFecha(consulta.fecha_consulta) }}</b></q-item-label>
                          <span class="q-my-sm"> <q-icon name="mdi-information" color="primary" /> Estado actual: <b>{{
                            consulta.estado_consulta }}</b></span>
                          <q-item-label>Tipo de consulta: <b>{{ consulta.tipo_consulta }}</b></q-item-label>
                          <q-item-label><b>Motivo:</b> {{ consulta.motivo_consulta }}</q-item-label>
                          <q-item-label><b>Síntomas:</b> {{ consulta.sintomas }}</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-separator spaced inset />
                    </q-list>
                  </div>
                </q-scroll-area>
              </q-card-section>
              <q-separator />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat v-close-popup>
            Cerrar
          </q-btn>
          <!-- <q-btn flat :disable="!dataUser.consultas" v-close-popup color="primary" @click="generatePDF(user)">
            Descargar historia
          </q-btn> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { ADMIN_PACIENTES_QUERY } from "../../../graphql/user";
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
    salidaFecha(salida) {
      return moment(salida).format('DD-MM-YYYY')
    },
    entradaFecha(entrada) {
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
    workerView(typeView) {
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
          // console.log("all paciene", response.data.pacientes);
          this.users = Object.assign([], response.data.pacientes);
        })
        .catch((err) => {
          this.loaderUser = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    userDetail(user) {
      this.modalDetailUser = true;
      this.dataUser = user;
      this.detailSector = user.direccion.sector;
      this.detailCalle = user.direccion.calle;
      this.buscarDoctor(user.fatherID)
      if (this.dataUser.nacionalidad === 'V') {
        this.nacionalidadUser = "Venezolano/a"
      } else if (this.dataUser.nacionalidad === 'J') {
        this.nacionalidadUser = "Jurídico"
      } else {
        this.nacionalidadUser = "Extranjero/a"
      }
    },
    downloadPdf(user) {

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
      const paciente = this.users.filter((paciente) => paciente.persona.cedula_identidad === dni)
      if (paciente.length !== 0) {
        this.dataUser = paciente[0];
        this.modalDetailUser = true;
      } else {
        this.$q.notify({
          message: "Este paciente no existe",
          color: "negative",
        });
      };
      this.dni = "";
    },
  },
};
</script>
