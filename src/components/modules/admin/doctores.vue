<template>
 <div class="row justify-center">
  <div class="col-12" v-if="viewType === 'userList'">
   <div class="col-12">
    <span class="text-accent text-h6 text-bold">Control de Doctores</span>
   </div>
   <div class="row justify-center">
    <div class="col-4 self-center text-right">
    </div>
    <div class="col self-center text-right">
     <!-- <span class="text-bold text-primary" style="cursor: pointer" @click="workerView('addWorker')">Añadir doctor</span> -->
     <q-icon style="cursor: pointer" @click="workerView('searchUser')" name="mdi-account-search" class="text-primary"
      size="md"></q-icon>
     <q-icon style="cursor: pointer" @click="workerView('addWorker')" name="mdi-plus" class="text-primary"
      size="md"></q-icon>
    </div>
   </div>


   <q-tabs v-model="tabDrEstado" class="text-teal">
				<q-tab :name="'dr_activos'" :icon="'mdi-account-group'" :label="`Activos (${drActivos})`" />
				<q-tab name="dr_inactivos" icon="mdi-account-off" :label="`Inactivos (${drInactivos})`" />
			</q-tabs>

      <q-tab-panels v-model="tabDrEstado" animated>
        <q-tab-panel name="dr_activos">
   <div class="row justify-center q-mt-xl" v-if="this.users.length !== 0">
    <div class="col-12 q-mb-sm" v-for="(user, index) in users" :key="index">
     <q-list v-if="user.usuarios.estado === 'activo'" class="rounded-borders bg-secondary" style="border-radius: 15px">
      <q-item>
       <q-item-section avatar @click="userDetail(user)" style="cursor: pointer">
        <q-avatar color="primary" icon="mdi-doctor" text-color="white">
        </q-avatar>
       </q-item-section>

       <q-item-section v-if="user.persona" top @click="userDetail(user)" style="cursor: pointer">
        <q-item-label class="text-left q-mb-xs" lines="1">
         <span class="text-weight-medium">Nombre de doctor: <b>{{
          user.persona.nombre1
         }}</b></span>
        </q-item-label>
        <small class="text-weight-medium text-left">usuario: {{ user.usuarios.nombre_usuario
        }}</small>
        <small class="text-weight-medium text-left">Rol: {{ user.usuarios.rol }}</small>
        <small class="text-weight-medium text-left">Documento de identidad: {{
         user.persona.cedula_identidad
        }}</small>
        <small v-if="user.persona.telefono" class="text-weight-medium text-left">Número de teléfono: {{
         user.persona.telefono.numero
        }}</small>
        <small class="text-weight-medium text-left">Estatus de usuario: <b>{{
         user.usuarios.estado
        }}</b></small>
        <q-separator spaced />
        <div v-if="user.usuarios.cdi" class="text-left column">
         <small class="text-weight-medium text-left">Corresponde al CDI: {{
          user.usuarios.cdi.nombre }}</small>
         <small class="text-weight-medium text-left">Código de CDI: {{
          user.usuarios.cdi.numero_cdi }}</small>
         <small class="text-weight-medium text-left">Estatus del CDI: <b>{{
          user.usuarios.estado }}</b></small>
        </div>
       </q-item-section>
       <q-item-section side>
        <div class="text-grey-8 q-gutter-xs">
         <button @click="generatePDF(user)" type="button" lines="2"
          class=" q-ml-xl q-mr-md cursor-pointer text-primary self-center text-bold" style="cursor: pointer">
          <q-icon name="mdi-printer-pos" /> Descargar información
         </button>
         <q-btn
          @click="actualizarUsuario({ ...user.usuarios, estado: user.usuarios.estado === 'activo' ? 'inactivo' : 'activo' })"
          class="gt-xs text-negative" size="12px" flat dense
          :label="user.usuarios.estado === 'activo' ? 'Inhabilitar' : 'Habilitar'" />
        </div>
       </q-item-section>
      </q-item>
     </q-list>
    </div>
   </div>
   <div class="row" v-else>
    <div class="col-12 q-mt-xl">
     <span class="text-caption">No hay doctores activos registrados</span>
    </div>
   </div>
        </q-tab-panel>
        <q-tab-panel name="dr_inactivos">
   <div class="row justify-center q-mt-xl" v-if="this.users.length !== 0">
    <div class="col-12 q-mb-sm" v-for="(user, index) in users" :key="index">
     <q-list v-if="user.usuarios.estado === 'inactivo'" class="rounded-borders bg-secondary" style="border-radius: 15px">
      <q-item>
       <q-item-section avatar @click="userDetail(user)" style="cursor: pointer">
        <q-avatar color="primary" icon="mdi-doctor" text-color="white">
        </q-avatar>
       </q-item-section>

       <q-item-section v-if="user.persona" top @click="userDetail(user)" style="cursor: pointer">
        <q-item-label class="text-left q-mb-xs" lines="1">
         <span class="text-weight-medium">Nombre de doctor: <b>{{
          user.persona.nombre1
         }}</b></span>
        </q-item-label>
        <small class="text-weight-medium text-left">usuario: {{ user.usuarios.nombre_usuario
        }}</small>
        <small class="text-weight-medium text-left">Rol: {{ user.usuarios.rol }}</small>
        <small class="text-weight-medium text-left">Documento de identidad: {{
         user.persona.cedula_identidad
        }}</small>
        <small v-if="user.persona.telefono" class="text-weight-medium text-left">Número de teléfono: {{
         user.persona.telefono.numero
        }}</small>
        <small class="text-weight-medium text-left">Estatus de usuario: <b>{{
         user.usuarios.estado
        }}</b></small>
        <q-separator spaced />
        <div v-if="user.usuarios.cdi" class="text-left column">
         <small class="text-weight-medium text-left">Corresponde al CDI: {{
          user.usuarios.cdi.nombre }}</small>
         <small class="text-weight-medium text-left">Código de CDI: {{
          user.usuarios.cdi.numero_cdi }}</small>
         <small class="text-weight-medium text-left">Estatus del CDI: <b>{{
          user.usuarios.estado }}</b></small>
        </div>
       </q-item-section>
       <q-item-section side>
        <div class="text-grey-8 q-gutter-xs">
         <button @click="generatePDF(user)" type="button" lines="2"
          class=" q-ml-xl q-mr-md cursor-pointer text-primary self-center text-bold" style="cursor: pointer">
          <q-icon name="mdi-printer-pos" /> Descargar información
         </button>
         <q-btn
          @click="actualizarUsuario({ ...user.usuarios, estado: user.usuarios.estado === 'activo' ? 'inactivo' : 'activo' })"
          class="gt-xs text-negative" size="12px" flat dense
          :label="user.usuarios.estado === 'activo' ? 'Inhabilitar' : 'Habilitar'" />
        </div>
       </q-item-section>
      </q-item>
     </q-list>
    </div>
   </div>
   <div class="row" v-else>
    <div class="col-12 q-mt-xl">
     <span class="text-caption">No hay doctores inactivos registrados</span>
    </div>
   </div>
        </q-tab-panel>
      </q-tab-panels>


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
       <span>Buscar doctor</span>
      </div>
      <q-icon name="mdi-account-search" size="200px" class="text-secondary"></q-icon>
      <div class="col-10 q-mt-md">
       <q-input outlined filled type="number" color="deep-purple-6" v-model="dni" label="Cédula" />
      </div>
     </div>
     <div class="row justify-center">
      <div class="col-4 q-mt-md">
       <q-btn label="Buscar" class="full-width" color="primary" :disable="dni === ''" @click="buscarUsuario(dni)" />
      </div>
     </div>
    </div>
   </div>
  </div>
  <div class="row justify-between" v-if="viewType === 'addWorker'">
   <div class=" col-12 text-left row items-center text-left q-mb-lg">
    <q-icon style="cursor: pointer" @click="workerView('userList')" name="mdi-arrow-left" class="text-primar q-mr-sxs"
     size="md"></q-icon>
    <span class="text-bold text-accent text-h6" style="cursor: pointer" @click="workerView('userList')">Nuevo
     Doctor</span>
   </div>
   <div class="col-6">
    <div class="column justify-center">
     <p class="text-subtitle text-medium">Información general</p>

     <q-input filled color="deep-purple-6" v-model="fullName" label="Nombre completo" :rules="[
      (val) => val.length >= 3 || 'Mínimo 3 caracteres',
      (val) => val.length <= 200 || 'Máximo 200 caracteres',
      (val) =>
       /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
       'Solo se permiten caracteres',
     ]" />
     <q-select filled class="q-mb-xs" v-model="nacionalidad" :options="nacionalidades" option-label="label"
      option-value="value" emit-value />

     <q-input filled color="deep-purple-6" class="q-mb-xs" v-model="dni" type="number" label="Cédula" :rules="[
      val => /^\d+$/.test(val) || 'Solo se permiten números',
      val => val.length <= 8 || 'Máximo 8 caracteres'
     ]" />


     <div class="row q-mb-xs">
      <div class="col-8">
       <q-select filled label="Estado" v-model="estado" :options="estados" option-label="label" option-value="value" />
      </div>
      <div class="col-4">
       <q-select filled label="Ciudad" v-model="ciudad" :options="ciudades[estado.value]" option-label="label"
        option-value="value" emit-value />
      </div>
     </div>
     <div class="row q-mb-xs">
      <div class="col-8">
       <q-input filled color="deep-purple-6" v-model="calle" label="Calle" />
      </div>
      <div class="col-4">
       <q-input filled color="deep-purple-6" v-model="numero" label="Número de casa" type="number" />
      </div>
     </div>
     <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-mb-xs">
      <q-input filled color="deep-purple-6" v-model="sector" label="Sector" />
     </div>
     <div class="col-xl-8 col-lg-8 col-md-8  col-sm-12 col-xs-12 q-pb-xs ">
      <q-input filled color="deep-purple-6" v-model="punto_referencia" label="Punto de referencia" />
     </div>
     <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-mb-xs">
      <q-input filled color="deep-purple-6" v-model="codigo_postal" :rules="[
       val => /^\d+$/.test(val) || 'Solo se permiten números',
       val => val.length <= 8 || 'Máximo 8 caracteres'
      ]" label="Código postal" />
     </div>
     <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-mb-xs">
      <div class="row">
       <div class="col-4">
        <q-select filled v-model="codigo" :options="codigoTel" label="Codigo" option-label="label" option-value="value"
         emit-value />
       </div>
       <div class="col-8">
        <q-input filled color="deep-purple-6" :rules="[
         val => /^\d+$/.test(val) || 'Solo se permiten números',
         val => val.length <= 12 || 'Máximo 12 caracteres'
        ]" v-model="telefono" type="number" label="Número de telefono" />
       </div>
      </div>
     </div>
     <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-mb-xs ">
      <q-input filled color="deep-purple-6" v-model="email" label="Email" type="email" :rules="[
       (val) => !!val || 'Este campo es obligatorio',
       (val) => val.length >= 3 || 'Mínimo 3 caracteres',
       (val) => val.length <= 200 || 'Máximo 200 caracteres',
       (val) => /.+@.+\..+/.test(val) || 'Formato de correo electrónico inválido'
      ]" />
     </div>
    </div>
   </div>
   <div class="col-6" style="border-left: 10px solid white;">
    <div class="column justify-center">
     <p class="text-subtitle text-medium">Información del doctor</p>
     <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
      <q-input filled color="deep-purple-6" class="q-mb-xs" v-model="doctor_numero_carnet" label="Número de carnet" />
      <q-select filled color="deep-purple-6" class="q-mb-xs" v-model="doctor_horario" label="Horario" :options="[
       'Lunes a Viernes 8:00 am - 6:00 pm',
       'Lunes a Viernes 9:00 am - 5:00 pm',
       'Lunes a Viernes 10:00 am - 4:00 pm',
       'Sábados 9:00 am - 1:00 pm',
       'Sábados 10:00 am - 2:00 pm',
       'Domingos 10:00 am - 2:00 pm',
       'Lunes, Miércoles y Viernes 8:00 am - 5:00 pm',
       'Martes y Jueves 10:00 am - 6:00 pm',
       'Lunes a Viernes 8:00 am - 12:00 pm y 1:00 pm - 5:00 pm'
      ]" />
      <q-input filled color="deep-purple-6" type="number" class="q-mb-xs" v-model="doctor_anos_experiencia"
       label="Años de experiencia" />
      <q-select filled v-model="roleEspecialidad" :options="roleUserEspecialidad" label="Especialidad"
       option-label="label" option-value="id" />
     </div>


     <p class="text-subtitle q-mt-md text-medium">Credenciales de acceso</p>
     <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">

      <q-select filled v-model="role" :options="roleUser" class="q-mb-xs" label="Tipo de usuario" option-label="label"
       option-value="value" emit-value disable />
      <q-input filled color="deep-purple-6" class="q-mb-xs" v-model="doctor_nombre_usuario" label="Nombre de usuario"
       :rules="[
        (val) => val.length >= 5 || 'Mínimo 5 caracteres',
        (val) => val.length <= 20 || 'Máximo 20 caracteres',
        (val) => /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(val) || 'Solo se permiten letras (sin números ni caracteres especiales)',
       ]" />

      <q-select filled color="deep-purple-6" class="q-mb-xs" v-model="cdiSeleccionado" label="Asignar al CDI"
       :options="cdisList" />

      <q-input filled :type="isPwd ? 'password' : 'text'" color="deep-purple-6" v-model="password" label="Password"
       :rules="passwordRules">

       <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
       </template>
      </q-input>

     </div>

    </div>
   </div>
  </div>
  <div v-if="viewType === 'addWorker'" class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 q-mb-xs ">
   <q-btn unelevated :loading="loader" @click="addDoctor()" :disable="!valid ||
    !cdiSeleccionado ||
    !cdiSeleccionado.value ||
    numero === '' ||
    nacionalidad === '' ||
    dni === '' ||
    telefono === '' ||
    email === '' ||
    password === '' ||
    doctor_nombre_usuario === '' ||
    doctor_numero_carnet === '' ||
    doctor_horario === '' ||
    doctor_anos_experiencia === '' ||
    roleEspecialidad === '' ||
    role === '' ||
    codigo_postal === '' ||
    punto_referencia === '' ||
    sector === '' ||
    calle === '' ||
    ciudad === '' ||
    estado === '' ||
    nacionalidad === ''" class="full-width text-white bg-primary" label="Añadir doctor" />
  </div>


  <!-- DETALLES DEL USUARIO SELECCIONADO -->
  <q-dialog v-model="modalDetailUser">
   <q-card class="my-card"  flat bordered style="min-width: 350px">
    <q-card-section v-if="dataUser">
     <q-card-section class="col-5 flex flex-center">
      <div class="text-overline">Detalle del doctor</div>
     </q-card-section>
     <q-card-section class="col-5 flex flex-center">
      <q-avatar color="primary" icon="mdi-doctor" text-color="white">
      </q-avatar>
     </q-card-section>
     <q-card-section class="q-pt-xs">
      <div class="text-caption text-bold q-mt-sm q-mb-xs">Doctor: {{ dataUser.persona.nombre1 }} | {{
       dataUser.area_de_trabajo
      }}
      </div>
      <div class="text-caption q-mt-sm q-mb-xs">CI: {{ dataUser.persona.cedula_identidad }}</div>
      <div class="text-caption q-mt-sm q-mb-xs">Número de carnet: {{ dataUser.numero_carnet }}</div>
      <div v-if="dataUser.persona.telefono" class="text-caption q-mt-sm q-mb-xs">Número de teléfono: {{ dataUser.persona.telefono.codigo }}{{ dataUser.persona.telefono.numero }}</div>
      <div v-else class="text-caption q-mt-sm q-mb-xs">Número de teléfono: No registrado</div>

      <div class="text-caption q-mt-sm q-mb-xs">Área de trabajo: {{ dataUser.area_de_trabajo }}</div>
      <div class="text-caption q-mt-sm q-mb-xs">Años de experiencia: {{ dataUser.anos_experiencia }}
      </div>
      <div class="text-caption q-mt-sm q-mb-xs">Horario: {{ dataUser.horario }}</div>
      <!-- <div class="text-caption q-mt-sm q-mb-xs">Télefono: {{ dataUser.persona.telefono.codigo }}{{ dataUser.persona.telefono.numero }}</div> -->
     </q-card-section>

   <q-card-section v-if="dataUser.pacientes && dataUser.pacientes.length > 0" class="q-pt-xs">
         <q-card-section class="col-5 flex flex-center">
      <div class="text-overline">Pacientes ({{ dataUser.pacientes.length }})</div>
     </q-card-section>

     <!-- Lista de pacientes  -->
     <div v-for="(paciente, index) in dataUser.pacientes" :key="index" class="q-mb-md q-pa-md" style="border: 1px solid #e0e0e0; border-radius: 8px;">
      <div class="text-caption text-bold q-mt-sm q-mb-xs">Nombre de paciente: {{ paciente.persona ? paciente.persona.nombre1 : 'N/A' }}</div>
      <div class="text-caption q-mt-sm q-mb-xs">Documento de identidad: {{ paciente.persona ? paciente.persona.cedula_identidad : 'N/A' }}</div>
      <div class="text-caption q-mt-sm q-mb-xs">Nacionalidad: {{ paciente.persona ? paciente.persona.nacionalidad : 'N/A' }}</div>
      <div class="text-caption q-mt-sm q-mb-xs">Sexo: {{ paciente.persona ? paciente.persona.sexo : 'N/A' }}</div>
      <div class="text-caption q-mt-sm q-mb-xs">Teléfono: {{ paciente.persona && paciente.persona.telefono ? paciente.persona.telefono.numero : 'N/A' }}</div>
      <div class="text-caption q-mt-sm q-mb-xs">Correo electrónico: {{ paciente.persona.correo.correo || 'N/A' }}</div>
     </div>

     <!-- Mensaje cuando no hay pacientes -->
     <div v-if="  !dataUser.pacientes || dataUser.pacientes.length === 0" class="text-center q-pa-md">
      <div class="text-caption text-grey">No hay pacientes registrados</div>
     </div>
     </q-card-section>


    </q-card-section>
    <q-separator />

    <q-card-actions align="center">
     <q-btn flat v-close-popup>
      Cerrar
     </q-btn>
     <!-- <q-btn @click="generatePDF(user)" flat v-close-popup> Descargar historial </q-btn> -->
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

  <div>
   <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
    :paginate-elements-by-height="1400" filename="informacionDeDoctor" :pdf-quality="2" :manual-pagination="false"
    pdf-format="a4" :pdf-margin="10" pdf-orientation="portrait" pdf-content-width="800px" @progress="onProgress($event)"
    ref="html2Pdf">
    <section slot="pdf-content">
     <HistoriaDrPdf :data="dataUser" />
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
 ADD_DOCTOR_USER_MUTATION
} from "../../../graphql/user";
import VueHtml2pdf from "vue-html2pdf";
import HistoriaDrPdf from "./historiaDrPdf.vue";
import { ADMIN_DOCTORES_QUERY, ADMIN_ALL_CDIS_QUERY, UPDATE_USUARIO_MUTATION } from "../../../graphql/user";
export default {
 name: "doctores",
 components: { HistoriaDrPdf, VueHtml2pdf },
 data() {
  return {
   passwordRules: [
    (val) => val.length >= 8 || 'Mínimo 8 caracteres',
    (val) => val.length <= 20 || 'Máximo 20 caracteres',
    (val) => /[0-9]/.test(val) || 'Debes incluir al menos 1 número',
    (val) => /[!@#$%^&*(),.?" :{}|<>]/.test(val) || 'Debes incluir al menos 1 carácter especial',
    (val) => /[A-Z]/.test(val) || 'Debes incluir al menos 1 letra mayúscula',
   ],


   // DATOS DE DOCTOR:
   doctor_numero_carnet: '',
   doctor_horario: '',
   doctor_anos_experiencia: '',
   doctor_nombre_usuario: '',
   punto_referencia: '',
   codigo_postal: '',

   doctor_contrasena: '',
   isValid: false,

   // DATOS DE USUARIO:
   deshabilitarUsuario: false,

   // LISTA DE CDIS

   cdisList: [],
   cdiSeleccionado: null,



   config: config,
   previewImgs: "",
   imghightlight: "",
   highlight: [],
   highlightPreview: "",
   modalDetailUser: false,
   image: [],
   imagePreview: [],
   tab: "users",
   tabDrEstado: "dr_activos",
   drActivos: 0,
   drInactivos: 0,
   role: "Doctor",
   dni: "",
   telefono: "",
   telefono: "",
   direccion: {
    UserId: this.$store.state.user.id,
    CiudadId: 1,
   },
   calle: "",
   numero: "",
   sector: "",
   detailSector: "",
   detailCalle: "",
   estado: { label: 'Anzoátegui', value: 2 },
   ciudad: "",
   especialidadDoctor: "",
   roleEspecialidad: { label: "Enfermería", value: "Enfermeria", id: 1 },
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
   password2: "",
   userId: "",
   dataUser: "",
   user: "",
   valid: false,
   buscador: true,
   roleUserEspecialidad: [
    { label: "Enfermería", value: "Enfermeria", id: 1 },
    { label: "Oftalmología", value: "Oftalmologia", id: 2 },
    { label: "Rayos x", value: "Rayosx", id: 3 },
    { label: "Hospitalización", value: "Hospitalizacion", id: 4 },
    { label: "Emergencias", value: "Emergencias", id: 5 },
    { label: "Laboratorio", value: "Laboratorio", id: 6 },
    { label: "Farmacia", value: "Farmacia", id: 7 },
    { label: "Terapias intensivas", value: "TerapiasIntensivas", id: 8 },
    { label: "Recepción", value: "Recepcion", id: 9 }
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
   roleUser: [
    { label: "Doctor", value: "Doctor" }
   ],
   codigo: 414,
   nacionalidad: "V",
   filter: {
    roleEspecialidad: ""
   },
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
   nacionalidadUser: ""
  };
 },
 created() {
  this.AllDoctores();
  this.AllEncargados();
 },
 watch: {
  estado(newVal) {
   this.ciudad = ""
  },
  dni(newValue) {
   this.validarDNI(newValue);
  },
  doctor_ocupacion(newValue) {
   this.validarCampoOcupacion(newValue);
  },
  doctor_anos_experiencia(newValue) {
   this.validarCampoAnosExperiencia(newValue);
  },
  doctor_nombre_usuario(newValue) {
   this.validarCampoNombreUsuario(newValue);
  },
  password(newValue) {
   this.validarCampoContrasena(newValue);
  },
  telefono(newValue) {
   this.validarCampoTelefono(newValue);
  },
  email(newValue) {
   if (newValue !== "" && /^([a-zA-Z0-9._-]{3,}[@][a-zA-Z0-9.]{3,}[.][a-zA-Z0-9.]{3,3})*$/.test(newValue)) {
    return this.valid = true;
   } else {
    this.valid = false;
   }
  },
  // async highlight(newValue) {
  //   this.imghightlight = "";
  //   let image = await this.readFileAsync(newValue);
  //   this.imghightlight = image;
  // },
  // estado(newVal) {
  // this.ciudad = ""
  // },
  // email(newValue) {
  //   if (newValue !== "" && /^([a-zA-Z0-9._-]{3,}[@][a-zA-Z0-9.]{3,}[.][a-zA-Z0-9.]{3,3})*$/.test(newValue)) {
  //     return this.valid = true;
  //   } else {
  //     return this.valid = false;
  //   }
  // },
  // roleEspecialidad(newVal){
  //   console.log("valorrrr", newVal);
  // },
  // password(newValue) {
  //   if (newValue !== "" && newValue.length < 6 && newValue === this.password2) {
  //     return this.valid = true;
  //   } else {
  //     return this.valid = false;
  //   }
  // },
  // password2(newValue) {
  //   if (newValue === this.password) {
  //     return this.valid = true;
  //   } else {
  //     return this.valid = false;
  //   }
  // },
  // especialidadDoctor(newValue, oldValue){
  //   console.log(newValue)
  //   if(newValue){
  //       this.filter.roleEspecialidad = newValue.id
  //       this.AllDoctores()
  //       if(newValue === 'null'){
  //         this.filter.roleEspecialidad = ''
  //         this.AllDoctores()
  //         this.especialidadDoctor = ''
  //       }
  //     }
  // },
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
  workerView(typeView) {
   this.viewType = typeView
  },
  generatePDF(user) {
   this.dataUser = user;
   console.log("datauser: ", this.dataUser);

   this.$refs.html2Pdf.generatePdf();
  },
  userDetail(user) {
   this.modalDetailUser = true;
   this.dataUser = user;
   this.detailSector = user.persona.direccion.sector;
   this.detailCalle = user.persona.direccion.calle;
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
  validarCampoNombreUsuario(value) {
   let isValid = true;
   if (!value) isValid = false;
   else if (value.length < 5) {
    isValid = false;
   }
   else if (value.length > 20) {
    isValid = false;
   }
   else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(value)) {
    isValid = false;
   }
   else {
    isValid = true;
   }
   this.valid = isValid;
  },

  validarCampoContrasena(value) {
   let isValid = true;
   if (!value || value === '' || value === null) {
    isValid = false;
   }
   else if (value.length < 8) {
    isValid = false;
   }
   else if (value.length > 20) {
    isValid = false;
   }
   else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?" :{}|<>])(?=.*[A-Z]).{8,20}$/.test(value)) {
    isValid = false;
   } else {
    isValid = true;
   }
   this.valid = isValid;
  },

  validarCampoOcupacion(value) {
   let isValid = true;
   if (!value) {
    isValid = false;
   } else if (value.length < 3) {
    isValid = false;
   } else if (value.length > 200) {
    isValid = false;
   } else if (!/^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,200})*$/.test(value)) {
    isValid = false;
   } else {
    isValid = true;
   }
   this.valid = isValid;
  },

  validarCampoAnosExperiencia(value) {
   let isValid = true;
   if (!/^\d+$/.test(value)) {
    isValid = false;
   }
   else if (value <= 0) isValid = false;
   else if (value.length > 3) {
    isValid = false;
   } else {
    isValid = true;
   }
   this.valid = isValid;
  },

  validarDNI(value) {
   let isValid = true;
   if (!/^\d+$/.test(value)) {
    isValid = false;
   }
   else if (value <= 0) {
    isValid = false;
   }
   else if (value.length > 8) {
    isValid = false;
   } else {
    isValid = true;
   }
   this.valid = isValid;
  },

  validarCampoTelefono(value) {
   let isValid = true;
   if (!/^\d+$/.test(value)) {
    isValid = false;
   }
   else if (value <= 0) isValid = false;
   else if (value.length > 12) {
    isValid = false;
   } else {
    isValid = true;
   }
   this.valid = isValid;
  },

  AllEncargados() {
   this.$apollo
    .query({
     query: ADMIN_ALL_CDIS_QUERY,
     fetchPolicy: "network-only",
    })
    .then((response) => {
     this.loaderUser = false;
     const cdis = response.data.todosCdis || [];
     if (cdis.length === 0) {
      this.cdiSeleccionado = { label: "No hay CDIS", value: null };
      this.cdisList = [];
     } else {
      this.cdisList = cdis.map(cdi => ({
       label: cdi.nombre,
       value: cdi.id_cdi,
      }));
      this.cdiSeleccionado = this.cdisList[0];
     }
    })
    .catch((err) => {
     this.loaderUser = false;
     this.$q.notify({
      message: err.message.split("GraphQL error:"),
      color: "negative",
     });
    });
  },
  AllDoctores() {
   this.$apollo
    .query({
     query: ADMIN_DOCTORES_QUERY,
     fetchPolicy: "network-only",
    })
    .then((response) => {
     this.loaderUser = false;
     this.users = Object.assign([], response.data.doctores);
      this.drActivos = this.users.filter((user) => user.usuarios.estado === 'activo').length;
      this.drInactivos = this.users.filter((user) => user.usuarios.estado === 'inactivo').length;
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
   if (this.nacionalidad === 'V') this.nacionalidad = 'Venezolano/a';
   else if (this.nacionalidad === 'J') this.nacionalidad = 'Jurídico';
   else this.nacionalidad = 'Extranjero/a';
   this.$apollo
    .mutate({
     mutation: ADD_DOCTOR_USER_MUTATION,
     variables: {
      input: {
       doctorInput: {
        anos_experiencia: parseInt(this.doctor_anos_experiencia),
        numero_carnet: this.doctor_numero_carnet,
        area_de_trabajo: this.roleEspecialidad.value,
        horario: this.doctor_horario,
        fk_cdi_id: this.cdiSeleccionado.value,
       },
       personaInput: {
        fk_cdi_id: this.cdiSeleccionado.value,
        nombre1: this.fullName,
        cedula_identidad: parseInt(this.dni),
        nacionalidad: this.nacionalidad,
        ocupacion: this.doctor_ocupacion,
        telefonoInput: {
         codigo: this.codigo,
         numero: this.telefono
        },
        correoInput: {
         correo: this.email || ''
        },
        direccionInput: {
         codigo_postal: this.codigo_postal,
         punto_referencia: this.punto_referencia,
         parroquia: this.ciudad,
         numero_casa: this.numero,
         calle: this.calle,
         sector: this.sector
        }
       },
       usuarioInput: {
        nombre_usuario: this.doctor_nombre_usuario,
        rol: 'doctor',
        contrasena: this.password,
        estado: 'activo',
        fk_cdi_id: this.cdiSeleccionado.value,
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
     this.doctor_numero_carnet = "";
     this.doctor_horario = "";
     this.doctor_anos_experiencia = "";
     this.roleEspecialidad = "";
     this.role = "";
     this.codigo = "";
     this.codigo_postal = "";
     this.punto_referencia = "";
     this.doctor_nombre_usuario = "";
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

  actualizarUsuario(usuario) {
   this.loader = true;
   this.$apollo
    .mutate({
     mutation: UPDATE_USUARIO_MUTATION,
     variables: {
      id_usuario: usuario.id_usuario,
      input: {
       estado: usuario.estado,
      },
     },
    })
    .then((response) => {
     this.loader = false;
     this.viewType = "userList"
     this.AllDoctores();
     this.$q.notify({
      message: "Usuario del doctor actualizado",
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
   const usuario = this.users.filter((usuario) => usuario.persona.cedula_identidad === dni)
   if (usuario.length !== 0) {
    this.dataUser = usuario[0];
    this.modalDetailUser = true;
   } else {
    this.$q.notify({
     message: "Este doctor no existe",
     color: "negative",
    });
   };
   this.dni = "";
  },

 },
};
</script>
