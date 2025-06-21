<template>
  <div class="row justify-center">
    <div class="col-12 self-end">
      <span class="text-bold text-h6 text-accent">Control de pacientes</span>
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
      <div class="row justify-center">
        <div class="col-10" v-if="viewType === 'userList'">
          <div class="row justify-center">
            <div class="col self-center text-right">
            </div>
            <div class="col self-center text-right">
              <q-icon
                style="cursor: pointer"
                @click="workerView('searchUser')"
                name="mdi-account-search"
                class="text-primary"
                size="md"
              ></q-icon>
              <q-icon
                style="cursor: pointer"
                @click="workerView('addWorker')"
                name="mdi-plus"
                class="text-primary"
                size="md"
              ></q-icon>
            </div>
          </div>
          <div class="row justify-center q-mt-xl" v-if="this.users.length !== 0">
            <div class="col-12 text-left q-mt-md q-mb-md">
              <span class="text-caption text-bold">Pacientes registrados</span>
            </div>
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
                      <span class="text-weight-medium">Paciente: {{ user.name }}</span>
                    </q-item-label>
                    <q-item-label class="text-left" lines="1">
                      <span class="text-weight-medium">CI: {{ user.dni }}</span>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <span class="text-weight-medium">Edad: {{ user.edad }}</span>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
          <div class="row justify-center" v-else>
            <div class="col-12 text-center q-mt-xl">
              <span class="text-caption">No hay pacientes registrados</span>
            </div>
          </div>
        </div>
        <div class="col-10">
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
          <div class="row justify-center" v-if="viewType === 'addWorker'">
            <div class="col-12 text-left q-mt-md q-mb-md">
              <q-icon
                  style="cursor: pointer"
                  @click="workerView('userList')"
                  name="mdi-arrow-left"
                  class="text-primary"
                  size="md"
                ></q-icon>
                <span style="cursor: pointer" class="text-bold text-accent text-h6" @click="workerView('userList')">Añadir paciente</span
              >
            </div>
            <div class="col-12">

              <div class="row justify-center">
                <div
                  class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs"
                >
                  <q-input
                    filled
                    color="deep-purple-6"
                    v-model="fullName"
                    label="Nombre completo"
                    :rules="[
              (val) => !!val || 'Este campo es obligatorio',
              (val) => val.length >= 3 || 'Mínimo 3 caracteres',
              (val) => val.length <= 200 || 'Máximo 200 caracteres',
              (val) =>
                /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
                'Solo se permiten caracteres',
            ]"
                  />
                </div>
                <div
                  class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs"
                >
                <div class="row">
                    <div class="col-4">
                      <q-select
                        filled
                        v-model="nacionalidad"
                        :options="nacionalidades"
                        option-label="label"
                        option-value="value"
                        emit-value
                      />
                    </div>
                    <div class="col-8">
                      <q-input
                        filled
                        color="deep-purple-6"
                        v-model="dni"
                        type="number"
                        label="Cédula"
                      />
                    </div>
                  </div>
                  <div class="row q-mt-sm">
              <div class="col-8">
                <q-select
                  filled
                  label="Estado"
                  v-model="estado"
                  :options="estados"
                  option-label="label"
                  option-value="value"
                />
              </div>
              <div class="col-4">
                <q-select
                  filled
                  label="Ciudad"
                  v-model="ciudad"
                  :options="ciudades[estado.value]"
                  option-label="label"
                  option-value="value"
                  emit-value
                />
              </div>
            </div>
            <div
            class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs"
          >
          <div class="row q-mt-xs">
              <div class="col-8">
                <q-input
              filled
              color="deep-purple-6"
              v-model="calle"
              label="Calle"
            />
              </div>
              <div class="col-4">
                <q-input
              filled
              color="deep-purple-6"
              v-model="numero"
              label="Número de casa"
              type="number"
            />
              </div>
            </div>
            <div
            class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs"
          >
            <q-input
              filled
              color="deep-purple-6"
              v-model="sector"
              label="Sector"
            />
          </div>
          </div>
                </div>

                <div
                  class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs q-pa-xs"

                >
                  <q-select
                    filled
                    v-model="sexo"
                    :options="sexoPaciente"
                    label="Sexo"
                    option-label="label"
                    option-value="value"
                    emit-value
                  />
                </div>
                <div
                  class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs"
                >
                  <q-input
                    filled
                    color="deep-purple-6"
                    v-model="edad"
                    label="Edad"
                    type="number"
                  />
                </div>
                <div
                  class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs"
                >
                <div class="row">
                  <div class="col-4">
                    <q-select
                      filled
                      v-model="codigo"
                      :options="codigoTel"
                      label="Codigo"
                      option-label="label"
                      option-value="value"
                      emit-value
                    />
                  </div>
                  <div class="col-8">
                    <q-input
                      filled
                      color="deep-purple-6"
                      v-model="telefono"
                      type="number"
                      label="Número de telefono"
                    />
                  </div>
                </div>
                </div>
                <!-- <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs q-pa-xs">
                  <q-input
                    v-model="diagnostico"
                    filled
                    label="Diagnostico"
                    type="textarea"
                  />
                </div> -->
                <div
                  class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 q-pa-xs q-pa-xs"
                >
                  <q-btn
                    unelevated
                    :loading="loader"
                    @click="addPaciente()"
                    :disable="
                !valid  ||
                dni === '' ||
                dni.length > 30 ||
                !sexo ||
                !edad ||
                edad > 100 ||
                edad < 1 ||
                telefono === '' ||
                telefono.length > 12 ||
                !estado ||
                !ciudad ||
                !calle ||
                calle.length > 200 ||
                !numero ||
                numero.length > 16 ||
                !sector ||
                sector.length > 100
              "
                    class="full-width text-white bg-primary"
                    label="Añadir paciente"
                  />
                </div>
              </div>
            </div>
          </div>
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
                <div class="text-caption q-mt-sm q-mb-xs">Nacionalidad: {{nacionalidadUser}}</div>
                <div class="text-caption q-mt-sm q-mb-xs">CI: {{dataUser.dni}}</div>
                <div class="text-caption q-mt-sm q-mb-xs">Edad: {{dataUser.edad}}</div>
                <div class="text-caption q-mt-sm q-mb-xs">Sexo: {{dataUser.sexo}}</div>
                <!-- <div class="text-caption q-mt-sm q-mb-xs">Diagnostico: {{dataUser.diagnostico}}</div> -->
              </q-card-section>
            </q-card-section>
            <q-card-section class="q-pt-xs">
              <div class="row justify-center">
                <div class="col-6">
                  <span class="text-caption text-bold q-mt-sm q-mb-xs">Consultas</span>
                </div>
                <div class="col-6 text-right">
                  <span class="text-caption text-positive text-bold q-mt-sm q-mb-xs" @click="addConsulta()" style="cursor: pointer;">Añadir consulta</span>
                </div>
              </div>
              <q-scroll-area style="height: 200px; max-width: 100%;">
                <div v-for="(consulta, index) in dataUser.consultas" :key="index" class="q-py-xs">

                  <q-list @click="updateConsulModal(consulta)">
                    <q-item style="cursor:pointer;">
                      <q-item-section>
                        <q-item-label caption>Entrada: {{ entradaFecha(consulta.ingreso) }} / Salida: {{ salidaFecha(consulta.salida) }}</q-item-label>
                        <q-item-label lines="2">Diagnostico: {{ consulta.diagnostico }}</q-item-label>
                        <small class=" q-mt-xs">Consulta CDIPA-{{ consulta.id }}</small>
                      </q-item-section>
                    </q-item>
                    <q-separator spaced inset />
                  </q-list>
                </div>
              </q-scroll-area>
            </q-card-section>
            <q-separator />

            <q-card-actions align="center">
              <q-btn flat v-close-popup>
                Cerrar
              </q-btn>
          <q-btn @click="generatePDF()" flat v-close-popup> Descargar historial </q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- ELIMINAR USUARIO -->
        <q-dialog v-model="deleteUserModal">
          <q-card style="background-color: #015958" class="text-white">
            <q-bar>
              <q-space />
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>
              </q-btn>
            </q-bar>

            <q-card-section>
              <div class="text-h6">Confirmar</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              ¿Estás seguro que deseas eliminar este doctor?
            </q-card-section>
            <q-card-actions align="right" class="text-white">
              <q-btn flat label="Confirmar" @click="workerDelete(workerID)" />
              <q-btn flat label="Cancelar" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- FIN ELIMINAR USUARIO -->

        <!-- AGREGAR CONSULTA -->
        <q-dialog v-model="modalAddConsulta">
          <q-card class="my-card" flat bordered style="min-width: 350px">
            <q-card-section>
              Añadir consulta
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-12">
                  <span class="text-bold">Paciente: {{dataUser.name}}</span>
                </div>
                <div class="col-12 q-mt-xs">
                  <q-input
                    v-model="diagnostico"
                    filled
                    label="Diagnostico"
                    type="textarea"
                  />
                </div>
                <div class="col-11 q-pa-xs">
                  <span>Ingreso y salida: </span>
                  <q-input filled v-model="fecha" disable label="Ingrese fecha de entrada y salida"></q-input>
                </div>
                <div class="col-1 self-center q-pa-xs q-pt-md">
                  <q-btn icon="event" round color="primary">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="ingresoSalida" range>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </div>
              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions align="center">
              <q-btn flat
              :disable="
                this.diagnostico === '' ||
               this.diagnostico > 499 === ''||
               this.ingreso === ''
               || this.salida === ''"
               @click="añadirConsul()">
                Añadir
              </q-btn>
              <q-btn flat v-close-popup>
                Cerrar
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- FIN AGREGAR CONSULTA -->

        <!-- ACTUALIZAR CONSULTA -->
        <q-dialog persistent v-model="modalUpdateConsulta">
          <q-card class="my-card" flat bordered style="min-width: 350px">
            <q-card-section>
              Actualizar consulta
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-12">
                  <span class="text-bold">Paciente: {{dataUser.name}}</span>
                </div>
                <div class="col-12 q-mt-xs">
                  <q-input
                    :disable="this.canEdit === false"
                    v-model="diagnostico"
                    filled
                    label="Diagnostico"
                    type="textarea"
                  />
                </div>
                <div class="col-11 q-pa-xs">
                  <span>Ingreso y salida: </span>
                  <q-input filled v-model="fecha" disable label="Ingrese fecha de entrada y salida"></q-input>
                </div>
                <div class="col-1 self-center q-pa-xs q-pt-md">
                  <q-btn icon="event" round color="primary" :disable="this.canEdit === false">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="ingresoSalida" range>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </div>
              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions align="center">
              <q-btn flat :disable="this.diagnostico === '' || this.ingreso === '' || this.salida === '' || this.canEdit === false" @click="updateConsulta()">
                Actualizar
              </q-btn>
              <q-btn flat v-close-popup @click="clearData()">
                Cerrar
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- FIN ACTUALIZAR CONSULTA -->
      </div>
      </q-scroll-area>
    </div>

    <div>
      <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="historialDoctorEnc"
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


  </div>
</template>
<script>
import config from "../../../config";
import moment from 'moment';
import VueHtml2pdf from "vue-html2pdf";
import historiaPdf from "../admin/hitoriaPdf.vue"
import {
  MIS_PACIENTES_QUERY,
  ADDPACIENTE_MUTATION,
  USER_DELETE,
  BUSCAR_PACIENTE_QUERY,
  ADDCONSULTA_MUTATION,
  UPDATE_CONSULTA_MUTATION
} from "../../../graphql/user";
export default {
  name: "homeDoctor",
  components: {
    historiaPdf,
    VueHtml2pdf
  },
  data() {
    return {
      canEdit: false,
      ingreso: "",
      salida: "",
      ingresoSalida: { from: '', to: '' },
      fecha: "",
      idConsulta: "",
      modalAddConsulta: false,
      modalUpdateConsulta: false,
      modalDetailUser: false,
      config: config,
      previewImgs: "",
      imghightlight: "",
      highlight: [],
      highlightPreview: "",
      image: [],
      imagePreview: [],
      tab: "users",
      role: "Paciente",
      dni: "",
      telefono: "",
      sexo: "Masculino",
      diagnostico: "",
      edad: 0,
      estado: "",
      direccion: {
        UserId: this.$store.state.user.id,
        CiudadId: 1,
      },
      calle: "",
        numero: "",
        sector: "",
      estado: { label: 'Anzoátegui', value: 2 },
      ciudad:"",
      roleEspecialidad: "Enfermeria",
      deleteUserModal: false,
      credAdd: false,
      isPwd: true,
      fullName: "",
      addCreditSide: false,
      deleteUserModal: false,
      userModal: false,
      loader: false,
      email: "",
      loaderUser: false,
      workerID: "",
      userAdd: false,
      maximizedToggle: true,
      userName: "",
      password: "",
      userId: "",
      dataUser: "",
      user: "",
      valid: false,
      buscador: true,
      roleUser: [
        { label: "Paciente", value: "Paciente" }
      ],
      codigo: 414,
      codigoTel: [
        { label: "0414", value: 414 },
        { label: "0424", value: 424 },
        { label: "0412", value: 412 },
        { label: "0416", value: 416 },
        { label: "0426", value: 426 }
      ],
      estados: [
      { label: 'Amazonas', value: 1 },
      { label: 'Anzoátegui', value: 2 },
      { label: 'Apure', value: 3 },
      { label: 'Aragua', value: 4 },
      { label: 'Barinas', value: 5 },
      { label: 'Bolívar', value: 6 },
      { label: 'Carabobo', value: 7 },
      { label: 'Cojedes', value: 8 },
      { label: 'Delta Amacuro', value: 9 },
      { label: 'Falcón', value: 10 },
      { label: 'Guárico', value: 11 },
      { label: 'Lara', value: 12 },
      { label: 'Mérida', value: 13 },
      { label: 'Miranda', value: 14 },
      { label: 'Monagas', value: 15 },
      { label: 'Nueva Esparta', value: 16 },
      { label: 'Portuguesa', value: 17 },
      { label: 'Sucre', value: 18 },
      { label: 'Táchira', value: 19 },
      { label: 'Trujillo', value: 20 },
      { label: 'Vargas', value: 21 },
      { label: 'Yaracuy', value: 22 },
      { label: 'Zulia', value: 23 },
      { label: 'Distrito Capital', value: 24 },
      { label: 'Dependencias Federales', value: 25 }
      ],
      ciudades: {
        1: ['Puerto Ayacucho', 'San Fernando de Atabapo', 'Maroa'],
        2: ['Barcelona', "Puerto La Cruz", "Lechería", "El Tigre", "San José de Guanipa"],
        3: ['San Fernando de Apure', 'Guasdualito', 'Biruaca'],
        4: ['Maracay', 'Cagua', 'La Victoria'],
        5: ['Barinas', 'Ciudad Bolivia', 'Socopó'],
        6: ['Ciudad Bolívar', 'Puerto Ordaz', 'Upata'],
        7: ['Valencia', 'Naguanagua', 'Guacara'],
        8: ['San Carlos', 'Tinaquillo', 'El Baúl'],
        9: ['Tucupita', 'Pedernales', 'Curiapo'],
        10: ['Coro', 'Punto Fijo', 'Chichiriviche'],
        11: ['San Juan de los Morros', 'Calabozo', 'Zaraza'],
        12: ['Barquisimeto', 'Cabudare', 'Carora'],
        13: ['Mérida', 'El Vigía', 'Tovar'],
        14: ['Los Teques', 'Guarenas', 'Ocumare del Tuy'],
        15: ['Maturín', 'Punta de Mata', 'Caripito'],
        16: ['Porlamar', 'La Asunción', 'Juan Griego'],
        17: ['Guanare', 'Acarigua', 'Araure'],
        18: ['Cumaná', 'Carúpano', 'Güiria'],
        19: ['San Cristóbal', 'Rubio', 'La Fría'],
        20: ['Trujillo', 'Valera', 'Boconó'],
        21: ['La Guaira', 'Maiquetía', 'Caraballeda'],
        22: ['San Felipe', 'Chivacoa', 'Yaritagua'],
        23: ['Maracaibo', 'Cabimas', 'Ciudad Ojeda'],
        24: ['Caracas', 'El Hatillo', 'Sucre'],
        25: ['Isla de Aves', 'Isla la Sola', 'Isla de Patos']
      },
      sexoPaciente: [
      { label: "Masculino", value: "Masculino" },
      { label: "Femenino", value: "Femenino" }
      ],
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#015958",
        width: "5px",
        opacity: 0.75,
      },
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#015958",
        width: "9px",
        opacity: 0.2,
      },
      users: {},
      viewType: "userList",
      nacionalidad: "V",
      nacionalidadUser: "",
      nacionalidades: [
      { label: "V", value: "V" },
      { label: "E", value: "E" }
      ],
    };
  },
  created() {
    this.AllPacientes();
  },
  watch: {
    ingresoSalida(newValue){
      console.log(newValue)
      if(!newValue.to){
        this.fecha = "Desde: " + newValue
        this.ingreso = newValue
        this.salida = newValue
      } else {
        this.fecha = "Desde: " + newValue.from + "| Hasta: " + newValue.to
        this.ingreso = newValue.from
        this.salida = newValue.to
      }
    },
    estado(newVal) {
    this.ciudad = ""
    },
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
    fullName(newValue) {
    if (
        newValue === '' ||
        newValue.length < 3 || newValue.length > 200 ||
        !/^([a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+)$/.test(newValue)
    ) {
        this.valid = false;
    } else {
        this.valid = true;
    }
},
  },
  methods: {
    generatePDF() {
      this.$refs.html2Pdf.generatePdf();
    },
    checkDate(date){
      var currentDate = new Date();
      console.log("current date: " + date)
      const CINCO_MIN=5*60*1000;
      // const UNA_HORA=60 *60 * 1000;
      // const VENTICUATRO_HORAS=1 * 24 * 60 * 60 * 1000;
      if ((currentDate - new Date(date)) > CINCO_MIN) {
        console.log("no puede editar porque han pasado las 24 horas: ", date)
        this.canEdit = false;
      } else {
        console.log("puede editar porque no han pasado las 24 horas: ", date)
        this.canEdit = true;
      }
    },
    salidaFecha (salida) {
      return moment(salida).format('DD-MM-YYYY')
    },
    entradaFecha (entrada){
      return moment(entrada).format('DD-MM-YYYY')
    },
    workerView(typeView){
      this.viewType = typeView
    },
    userDetail(user){
      this.modalDetailUser = true;
      this.dataUser = user;
      if(this.dataUser.nacionalidad === 'V') {
        this.nacionalidadUser = "Venezolano/a"
      } else if(this.dataUser.nacionalidad === 'J') {
        this.nacionalidadUser = "Jurídico"
      } else {
        this.nacionalidadUser = "Extranjero/a"
      }
    },
    readFileAsync(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
      });
    },
    AllPacientes() {
      this.$apollo
        .query({
          query: MIS_PACIENTES_QUERY,
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.loaderUser = false;
          console.log(response.data.MisPacientes);
          this.users = Object.assign([], response.data.MisPacientes);
        })
        .catch((err) => {
          this.loaderUser = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    addPaciente() {
      this.loader = true;
      let telConcat = '0' + this.codigo + this.telefono
      this.$apollo
        .mutate({
          mutation: ADDPACIENTE_MUTATION,
          variables: {
            data: {
              name: this.fullName,
              fatherID: this.$store.state.user.id,
              role: this.role,
              dni: this.dni,
              nacionalidad: this.nacionalidad,
              sexo: this.sexo,
              edad: this.edad,
              telefono: this.telefono.toString(),
              codigoArea: this.codigo.toString(),
              direccion: {
                calle: this.calle,
                numero: this.numero,
                sector: this.sector
              },
              ciudad: {
                nombre: this.ciudad,
                EstadoId: this.estado.value
              },
              diagnostico: this.diagnostico
            },
          },
        })
        .then((response) => {
          this.loader = false;
          this.fullName = "";
          this.calle = "";
          this.numero = "";
          this.sector = "";
          this.estado = { label: 'Anzoátegui', value: 2 }
          this.ciudad = ""
          this.email = "";
          this.dni = "";
          this.telefono = "";
          this.direccion = "";
          this.password = "";
          this.highlight = "";
          this.viewType = "userList"
          this.AllPacientes();
          this.$q.notify({
            message: "Paciente añadido",
            color: "positive",
          });
          this.$emit("updateUsers", {
            users: true,
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
    addConsulta(){
     this.modalAddConsulta = true
    },
    // AllConsultas(){
    //   this.$apollo
    //     .query({
    //       query: MIS_CONSULTAS_QUERY,
    //       fetchPolicy: "network-only",
    //     })
    //     .then((response) => {
    //       this.loaderUser = false;
    //       console.log(response.data.MisConsultas);
    //       this.consultas = Object.assign([], response.data.MisConsultas);
    //     })
    //     .catch((err) => {
    //       this.loaderUser = false;
    //       this.$q.notify({
    //         message: err.message.split("GraphQL error:"),
    //         color: "negative",
    //       });
    //     });
    // },
    añadirConsul(){
      this.$apollo
        .mutate({
          mutation: ADDCONSULTA_MUTATION,
          variables: {
            id: this.dataUser.id,
            data: {
              diagnostico: this.diagnostico,
              salida: this.salida,
              ingreso: this.ingreso,
            },
          },
        })
        .then((response) => {
          this.loader = false;
          this.salida = "";
          this.ingreso = "";
          this.diagnostico = "";
          this.modalAddConsulta = false;
          this.modalDetailUser = false;
          this.ingresoSalida = {};
          this.fecha = "";
          this.AllPacientes()
          this.$q.notify({
            message: "diagnostico añadido",
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
    clearData(){
      this.salida = "";
      this.ingreso = "";
      this.diagnostico = "";
      this.ingresoSalida = {};
      this.fecha = "";
    },
    updateConsulModal(data){
      console.log("actualizar consulta:", data)
      this.diagnostico = data.diagnostico
      this.idConsulta = data.id
      this.ingreso = moment(data.ingreso).format('DD-MM-YYYY')
      this.salida = moment(data.salida).format('DD-MM-YYYY')
      this.fecha = "Desde: " + moment(data.ingreso).format('DD-MM-YYYY') + "| Hasta: " + moment(data.salida).format('DD-MM-YYYY')
      this.ingresoSalida = { from: moment(data.ingreso).format('DD-MM-YYYY'), to: moment(data.salida).format('DD-MM-YYYY') },
      this.checkDate(data.createdAt)
      this.modalUpdateConsulta = true;
    },
    updateConsulta(){
      this.loader = true;
      const data = {
        id: this.idConsulta,
        diagnostico: this.diagnostico,
        ingreso: this.ingreso,
        salida: this.salida,
      };
      return this.$apollo
        .mutate({
          mutation: UPDATE_CONSULTA_MUTATION,
          variables: {
            id: this.dataUser.id,
            data,
          },
        })
        .then((response) => {
          this.loader = false;
          this.salida = "";
          this.ingreso = "";
          this.diagnostico = "";
          this.modalUpdateConsulta = false;
          this.modalDetailUser = false;
          this.ingresoSalida = {};
          this.fecha = "";
          this.AllPacientes()
          this.$q.notify({
            message: "Consulta actualizada",
            color: "positive",
          });
        })
        .catch((err) => {
          this.loader = false;
          console.log("error: ", err);
        });
    },
    deleteWorker(workerID) {
      console.log(workerID)
      this.workerID = workerID;
      this.deleteUserModal = true;
    },
    workerDelete(workerID) {
      console.log(workerID);
      this.$apollo
        .mutate({
          mutation: USER_DELETE,
          variables: {
            id: workerID,
          },
        })
        .then((response) => {
          this.$q.notify({
            message: "Doctor eliminado",
            color: "positive",
          });
          this.deleteUserModal = false;
          this.$emit("updateUsers", {
            users: true,
          });
          this.viewType = "userList";
          this.AllDoctores();
        })
        .catch((err) => {
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
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
