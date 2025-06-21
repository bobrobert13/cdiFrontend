<template>
  <div class="row justify-center">
    <div class="col-12 self-end">
      <span class="text-bold text-h6 text-accent">Control de doctores</span>
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
          <!-- <div class="col-12">
            <span class="text-accent text-h6 text-bold"
              >Control de Doctores</span
            >
          </div> -->
          <div class="row justify-center">
            <div class="col self-center text-right">
              <div class="col-4 self-center text-right">
                <q-select
                  filled
                  dense
                  v-model="especialidadDoctor"
                  :options="roleUserEspecialidad"
                  label="Buscar por Area"
                  option-label="label"
                   option-value="id"
                  >
                  <template v-slot:append>
                      <q-icon
                      v-if="especialidadDoctor !== ''"
                      class="cursor-pointer"
                      name="clear"
                      @click.stop="especialidadDoctor = 'null'"
                      />
                  </template>
                </q-select>
              </div>
              <!-- <span class="text-bold text-primary" style="cursor: pointer" @click="workerView('searchUser')">Buscar doctor</span> -->
            </div>
            <div class="col self-center text-right">
              <!-- <span class="text-bold text-primary" style="cursor: pointer" @click="workerView('addWorker')">Añadir doctor</span> -->

              <q-icon
                v-if="users.length !== 0"
                style="cursor: pointer"
                @click="downloadSeveralUsers()"
                name="mdi-folder-download"
                class="text-primary q-mr-lg"
                size="md"

              ></q-icon>
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
            <div class="col-12 q-mb-sm" v-for="(user, index) in users" :key="index">
              <q-list
                class="rounded-borders bg-secondary"
                style="border-radius: 15px"
              >
                <q-item>
                  <q-item-section
                    avatar
                    @click="userDetailC('userDetail',user)"
                    style="cursor: pointer"
                  >
                    <q-avatar color="primary" text-color="white">
                      <img
                        v-if="user.profileImage !== ''"
                        :src="config.api.url + user.profileImage"
                      />
                      <img
                        v-if="user.profileImage === ''"
                        src="../../../statics/img/account-circle.png"
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section
                    top
                    @click="userDetailC('userDetail',user)"
                    style="cursor: pointer"
                  >
                    <q-item-label class="text-left" lines="1">
                      <span class="text-weight-medium">{{ user.name }}</span>
                    </q-item-label>
                    <q-item-label class="text-left" lines="1">
                      <span class="text-weight-medium">{{ user.email }}</span>
                    </q-item-label>
                    <!-- <q-item-label class="text-left" lines="1">
                      <span class="text-weight-medium">{{ user.role }}</span>
                    </q-item-label> -->
                  </q-item-section>
                  <q-item-section side>
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn
                        @click="generatePDF(user)"
                        class="gt-xs text-blue"
                        size="12px"
                        flat
                        dense
                        round
                        icon="mdi-file-download-outline"
                      />
                      <q-btn
                        @click="deleteWorker(user.id)"
                        class="gt-xs text-negative"
                        size="12px"
                        flat
                        dense
                        round
                        icon="delete"
                      />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col-12 q-mt-xl">
              <span class="text-caption">No hay Doctores registrados</span>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="row justify-center" v-if="viewType === 'userDetail'">
          <div class="col-12 text-left">
            <q-icon
                style="cursor: pointer"
                @click="workerView('userList')"
                name="mdi-arrow-left"
                class="text-primary"
                size="md"
              ></q-icon>
          </div>
          <div class="col-12 text-center">
            <q-avatar
              rounded
              size="200px"
              style="border-radius: 20px !important"
            >
              <img
                v-if="dataUser.profileImage === ''"
                src="../../../statics/img/account-circle.png"
              />
              <img v-else :src="config.api.url + dataUser.profileImage" />
            </q-avatar>
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="row text-center justify-center">
              <div class="col-12">
                <div class="row jusitify-center">
                  <div class="col-6 q-pa-sm">
                    <q-input
                      filled
                      disable
                      color="deep-purple-6"
                      v-model="dataUser.name"
                      label="Nombre completo"
                    />
                  </div>
                  <div class="col-6 q-pa-sm">
                    <q-input
                      filled
                      disable
                      color="deep-purple-6"
                      v-model="dataUser.email"
                      label="Email"
                    />
                  </div>
                  <div class="col-6 q-pa-sm">
                    <q-input
                      filled
                      disable
                      color="deep-purple-6"
                      v-model="dataUser.roleEspecialidad"
                      label="Especialidad"
                    />
                  </div>
                  <div class="col-6 q-pa-sm">
                    <q-input
                      filled
                      disable
                      color="deep-purple-6"
                      v-model="dataUser.nacionalidad"
                      label="Nacionalidad"
                    />
                  </div>
                  <div class="col-6 q-pa-sm">
                    <q-input
                      filled
                      disable
                      color="deep-purple-6"
                      v-model="dataUser.dni"
                      label="Cédula"
                    />
                  </div>
                  <div class="col-6 q-pa-sm">
                    <q-input
                      filled
                      disable
                      color="deep-purple-6"
                      v-model="dataUser.telefono"
                      label="Telefono"
                    />
                  </div>
                  <div class="col-12 q-pa-sm">
                    <q-input
                      filled
                      disable
                      color="deep-purple-6"
                      v-model="dataUser.direccion.calle"
                      label="Calle"
                    />
                  </div>
                  <div class="col-12 q-pa-sm">
                    <q-input
                      filled
                      disable
                      color="deep-purple-6"
                      v-model="dataUser.direccion.sector"
                      label="Sector"
                    />
                  </div>
                  <div class="col-12 q-pa-sm">
                    <q-input
                      filled
                      disable
                      color="deep-purple-6"
                      v-model="dataUser.direccion.numero"
                      label="Casa°"
                    />
                  </div>
                </div>
              </div>
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-btn
                  unelevated
                  :loading="loader"
                  @click="deleteWorker(dataUser.id)"
                  class="fullwidth text-white bg-primary"
                  :label="'Eliminar ' + dataUser.role"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-center" v-if="viewType === 'searchUser'">
          <div class="col-12">
            <div v-if="buscador === true">
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
                    <span>Buscar doctor</span>
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
                      color="deep-purple-6"
                      v-model="email"
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
                  </div>
                </div>
                <div class="row justify-center">
                  <div class="col-4 q-mt-md">
                    <q-btn
                      label="Buscar"
                      class="full-width"
                      color="primary"

                      @click="buscarUsuario(email)"
                    />
                  </div>
                </div>
            </div>
            <div class="row justify-center" v-else>
              <div class="col-10 text-left">
                <span
                  class="text-bold text-accent text-h6"
                  @click="buscador = true"
                  >Volver</span
                >
              </div>
              <div class="col-4 q-mt-md">
                <q-card
                  class="my-card text-white bg-primary"
                  style="border-radius: 20px"
                >
                  <q-card-section>
                    <img
                      style="border-radius: 20px"
                      v-if="user.profileImage !== ''"
                      :src="config.api.url + dataUser.profileImage"
                      width="100%"
                    />
                    <img
                      style="border-radius: 20px"
                      v-if="user.profileImage === ''"
                      src="../../../statics/img/account-circle.png"
                      width="100%"
                    />
                  </q-card-section>
                  <q-card-section>
                    <div class="text-h6">{{ dataUser.name }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-center" v-if="viewType === 'addWorker'">
          <div class="col-12 text-left">
            <q-icon
                style="cursor: pointer"
                @click="workerView('userList')"
                name="mdi-arrow-left"
                class="text-primary"
                size="md"
              ></q-icon>
              <span class="text-bold text-accent text-h6" style="cursor: pointer"
                @click="workerView('userList')">Añadir Doctor</span
            >
          </div>
          <div class="col-12">
            <div class="row justify-center">
              <div class="col-12 text-center q-mt-md">
                <q-slide-transition v-if="imghightlight">
                  <img
                    v-show="imghightlight"
                    class="rounded-borders q-px-sm"
                    :src="imghightlight"
                    style="max-width: 200px; height: 180px"
                    contain
                  />
                </q-slide-transition>
              </div>
              <q-file
                v-model="highlight"
                label="Selecciona la imagen destacada"
                accept=".jpg, .png, .svg"
                clearable
                filled
                class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs"
              />
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
              <div
                class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs q-pa-xs"
              >
                <q-input
                  filled
                  color="deep-purple-6"
                  v-model="email"
                  label="Email"
                  type="email"
                  :rules="[
                    (val) => !!val || 'Este campo es obligatorio',
                    (val) => val.length <= 40 || 'Máximo 40 caracteres',
                    (val) =>
                      /^([a-zA-Z0-9._-]{3,}[@][a-zA-Z0-9.]{3,}[.][a-zA-Z0-9.]{2,5})*$/.test(
                        val
                      ) || 'Formato de correo inválido',
                  ]"
                />
              </div>
              <div
                class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs q-pa-xs"
              >
                <q-input
                  filled
                  :type="isPwd ? 'password' : 'text'"
                  color="deep-purple-6"
                  v-model="password"
                  label="Password"
                  :rules="[
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
              </div>
              <div
                class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs q-pa-xs"
                style="margin-top: -20px"
              >
                <q-select
                  filled
                  v-model="role"
                  :options="roleUser"
                  label="Tipo de usuario"
                  option-label="label"
                  option-value="value"
                  emit-value
                  disable
                />
              </div>
              <div
                class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-xs q-pa-xs"
                style=""
              >
                <q-select
                  filled
                  v-model="roleEspecialidad"
                  :options="roleUserEspecialidad"
                  label="Especialidad"
              option-label="label"
              option-value="id"
                />
              </div>
              <div
                class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 q-pa-xs q-pa-xs"
              >
                <q-btn
                  unelevated
                  :loading="loader"
                  @click="addDoctor()"
                  :disable="!valid || fullName === '' || nacionalidad === '' || dni === '' || telefono === ''  || email === '' || password === '' || password2 === ''"
                  class="full-width text-white bg-primary"
                  label="Añadir doctor"
                  v-on:keyup.enter="addDoctor()"
                />
              </div>
            </div>
          </div>
        </div>
        </div>
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
        <!-- <historiaPdf :data="dataUser" /> -->
        <historiaDrPdf :data="pdfData" />
      </section>
      </vue-html2pdf>
    </div>
  </div>
</template>
<script>
import config from "../../../config";
import {
  ADDUSER_MUTATION,
  USER_DELETE,
  BUSCAR_USER_QUERY,
} from "../../../graphql/user";
import VueHtml2pdf from "vue-html2pdf";
import historiaDrPdf from "../admin/historiaDrPdf.vue";
import { ADMIN_DOCTORES_QUERY } from "../../../graphql/admin";
export default {
  name: "homeEncargado",
  components: {historiaDrPdf, VueHtml2pdf},
  data() {
    return {
      config: config,
      previewImgs: "",
      imghightlight: "",
      highlight: [],
      highlightPreview: "",
      image: [],
      imagePreview: [],
      tab: "users",
      role: "Doctor",
      dni: 0,
      telefono: 0,
      ciudad:"",
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
      roleEspecialidad: { label: "Enfermería", value: "Enfermeria", id: 1},
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
      pdfData: "",
      userName: "",
      password: "",
      password2: "",
      userId: "",
      dataUser: "",
      user: "",
      valid: false,
      buscador: true,
      roleUser: [
        { label: "Doctor", value: "Doctor" }
      ],
      codigo: 414,
      codigoTel: [
        { label: "0414", value: 414 },
        { label: "0424", value: 424 },
        { label: "0412", value: 412 },
        { label: "0416", value: 416 },
        { label: "0426", value: 426 }
      ],
      nacionalidades: [
      { label: "V", value: "V" },
      { label: "E", value: "E" }
      ],
      nacionalidad: "V",
      especialidadDoctor: "",
      roleUserEspecialidad: [
        { label: "Enfermería", value: "Enfermeria", id: 1},
        { label: "Oftalmología", value: "Oftalmologia", id: 2},
        { label: "Rayos x", value: "Rayosx", id: 3},
        { label: "Hospitalización", value: "Hospitalizacion", id: 4},
        { label: "Emergencias", value: "Emergencias", id: 5},
        { label: "Laboratorio", value: "Laboratorio", id: 6},
        { label: "Farmacia", value: "Farmacia", id: 7},
        { label: "Terapias intensivas", value: "TerapiasIntensivas", id: 8},
        { label: "Recepción", value: "Recepcion", id: 9}
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
      filter: {
        roleEspecialidad: ""
      },
      users: {},
      viewType: "userList"
    };
  },
  created() {
    this.AllDoctores();
  },
  watch: {
    async highlight(newValue) {
      this.imghightlight = "";
      let image = await this.readFileAsync(newValue);
      this.imghightlight = image;
    },
    estado(newVal) {
    this.ciudad = ""
    },
    email(newValue) {
      if (newValue !== "" && /^([a-zA-Z0-9._-]{3,}[@][a-zA-Z0-9.]{3,}[.][a-zA-Z0-9.]{3,3})*$/.test(newValue)) {
        return this.valid = true;
      } else {
        return this.valid = false;
      }
    },
    password(newValue) {
      if (newValue !== "" && newValue.length < 6 && newValue === this.password2) {
        return this.valid = true;
      } else {
        return this.valid = false;
      }
    },
    password2(newValue) {
      if (newValue === this.password) {
        return this.valid = true;
      } else {
        return this.valid = false;
      }
    },
    especialidadDoctor(newValue, oldValue){
      console.log(newValue)
      if(newValue){
        console.log("especialidad", newValue);
        this.filter.roleEspecialidad = newValue.id
          this.AllDoctores()
          if(newValue === 'null'){
            this.filter.roleEspecialidad = ''
            this.AllDoctores()
            this.especialidadDoctor = ''
          }
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
    console.log("¿Es válido?", this.valid);
},
  },
  methods: {
        generatePDF(user) {
          console.log("funcion?? ");
          this.pdfData = user;
      console.log("usuerios_pdf", this.pdfData);
      this.$refs.html2Pdf.generatePdf();
    },
    downloadSeveralUsers(){
      this.pdfData = this.users;
      console.log("usuerios_pdf", this.pdfData);
      this.$refs.html2Pdf.generatePdf();
    },
    workerView(typeView){
      this.viewType = typeView
    },
    userDetailC(viewType, user) {
      this.dataUser = user;
      this.workerView(viewType)
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
    AllDoctores() {
      this.$apollo
        .query({
          query: ADMIN_DOCTORES_QUERY,
          fetchPolicy: "network-only",
          variables:{
            data: this.filter
          }
        })
        .then((response) => {
          this.loaderUser = false;
          console.log(response.data.allDoctores);
          this.users = Object.assign([], response.data.allDoctores);
        })
        .catch((err) => {
          this.loaderUser = false;
          this.$q.notify({
            message: err.message.split("GraphQL error:"),
            color: "negative",
          });
        });
    },
    addDoctor() {
      this.loader = true;
      let telConcat = '0' + this.codigo + this.telefono
      this.$apollo
        .mutate({
          mutation: ADDUSER_MUTATION,
          variables: {
            data: {
              profileImage: this.highlight,
              name: this.fullName,
              email: this.email,
              password: this.password,
              role: this.role,
              AreaId: this.roleEspecialidad.id,
              nacionalidad: this.nacionalidad,
              dni: this.dni,
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
              }
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
          this.password = "";
          this.dni = "";
          this.telefono = "";
          this.direccion = "";
          this.highlight = "";
          this.viewType = "userList"
          this.AllDoctores();
          this.$q.notify({
            message: "Doctor añadido",
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
    buscarUsuario(email) {
      this.loaderOrders = true;
      let data = {
        email: email,
        role: "Doctor"
      };
      this.$apollo
        .query({
          query: BUSCAR_USER_QUERY,
          variables: {
            data: data,
          },
          fetchPolicy: "network-only",
        })
        .then((response) => {
          this.loaderOrders = false;
          this.email = "";
          if (response.data.BuscarUser.length !== 0) {
            this.dataUser = response.data.BuscarUser[0];
            this.buscador = false;
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
  },
};
</script>
