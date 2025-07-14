<template>
	<div class="row justify-center">
		<div class="col-12" v-if="viewType === 'userList'">
			<div class="col-12">
				<span class="text-accent text-h6 text-bold">Listado de usuarios CDIs</span>
			</div>
			<div class="row justify-center">
				<div class="col self-center text-right"></div>
				<div class="col self-center text-right">
					<q-icon style="cursor: pointer" @click="workerView('searchUser')" name="mdi-account-search"
						class="text-primary" size="md"></q-icon>
					<q-icon style="cursor: pointer" @click="workerView('addWorker')" name="mdi-plus"
						class="text-primary" size="md"></q-icon>
					<q-icon @click="cdisInformationsPDF()" style="cursor: pointer" name="mdi-printer-pos"
						class="text-primary q-ml-sm" size="md"></q-icon>
				</div>
			</div>
			<div class="row justify-center q-mt-xl" v-if="this.users.length !== 0">
				<div class="col-12 q-mb-sm" v-for="(user, index) in users" @click="cdiDetails(user)" :key="index">
					<q-list class="rounded-borders bg-secondary" style="border-radius: 15px">
						<q-item>
							<q-item-section avatar style="cursor: pointer">
								<q-avatar color="primary" icon="mdi-hospital-building" text-color="white">
								</q-avatar>
							</q-item-section>

							<q-item-section top style="cursor: pointer">
								<q-item-label class="text-left" lines="1">
									<span class="text-weight-medium">Nombre de CDI: {{ user.nombre }}</span>
								</q-item-label>
								<q-item-label class="text-left" lines="1">
									<span class="text-weight-medium">Número de CDI: {{ user.numero_cdi }}</span>
								</q-item-label>
								<q-item-label class="text-left" lines="1">
									<span class="text-weight-medium">Encargado: {{ user.encargado }}</span>
								</q-item-label>
								<q-item-label class="text-left" lines="1">
									<span class="text-weight-medium">Cuadrante: {{ user.cuadrante }}</span>
								</q-item-label>
								<!-- <q-item-label class="text-left" lines="1">
                  <span class="text-weight-medium">{{ user.role }}</span>
                </q-item-label> -->
							</q-item-section>
							<q-item-section side>
								<div class="text-grey-8 q-gutter-xs">

									<div class="text-grey-8 q-gutter-xs">
									<button @click="generatePDF(user)" type="button" lines="2"
										class=" q-ml-xl q-mr-md cursor-pointer text-primary self-center text-bold"
										style="cursor: pointer">
										<q-icon name="mdi-printer-pos" /> Descargar información
									</button>
						  
										<q-btn
											@click="actualizarUsuario({ ...user, estado: user.estado === 'activo' ? 'inactivo' : 'activo' })"
											class="gt-xs text-negative" size="12px" flat dense
											:label="user.estado === 'activo' ? 'Inhabilitar' : 'Habilitar'" />
									</div>
								</div>
							</q-item-section>
						</q-item>
					</q-list>
				</div>
			</div>
			<div class="row" v-else>
				<div class="col-12 q-mt-xl">
					<span class="text-caption">No hay encargados registrados</span>
				</div>
			</div>
		</div>
		<div class="row justify-center" v-if="viewType === 'searchUser'">
			<div class="col-12">
				<div>
					<div class="col-12 text-left">
						<q-icon style="cursor: pointer" @click="workerView('userList')" name="mdi-arrow-left"
							class="text-primary" size="md"></q-icon>
					</div>
					<div class="row justify-center">
						<div class="col-12 text-bold text-accent text-center text-h6">
							<span>Buscar CDI</span>
						</div>
						<q-icon name="mdi-account-search" size="200px" class="text-secondary"></q-icon>
						<div class="col-10 q-mt-md">
							<q-input outlined filled type="text" color="deep-purple-6" v-model="cdi_number"
								label="Número de CDI" />
						</div>
					</div>
					<div class="row justify-center">
						<div class="col-4 q-mt-md">
							<q-btn label="Buscar" class="full-width" color="primary" :disable="cdi_number === ''"
								@click="buscarUsuario(cdi_number)" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row justify-center" v-if="viewType === 'addWorker'">
			<div class="col-12 text-left row items-center text-left q-mb-lg">
				<q-icon style="cursor: pointer" @click="workerView('userList')" name="mdi-arrow-left"
					class="text-primary" size="md"></q-icon>
				<span class="text-bold text-accent text-h6 q-ml-sm" style="cursor: pointer"
					@click="workerView('userList')">Nuevo
					CDI</span>
			</div>
			<div class="col-12 row">
				<div class="col-6">
					<div class="column justify-center">
						<p class="text-subtitle text-medium">Información de CDI</p>
						<q-input filled color="deep-purple-6" v-model="cdi_nombre" label="Nombre de CDI" :rules="[
							(val) => !!val || 'Este campo es obligatorio',
							(val) => val.length >= 3 || 'Mínimo 3 caracteres',
							(val) => val.length <= 200 || 'Máximo 200 caracteres',
							(val) =>
								/^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
								'Solo se permiten caracteres',
						]" />
						<q-input filled color="deep-purple-6" class="q-mb-xs" v-model="cdi_numero" type="text"
							label="Número de CDI" :rules="[
								(val) => !!val || 'Este campo es obligatorio',
								(val) => val.length <= 10 || 'Máximo 10 dígitos'
							]" />
						<q-input filled color="deep-purple-6" class="q-mb-xs" v-model="cdi_encargado" type="text"
							label="Nombre de encargado" :rules="[
								(val) => !!val || 'Este campo es obligatorio',
								(val) => val.length >= 3 || 'Mínimo 3 caracteres',
								(val) => val.length <= 200 || 'Máximo 200 caracteres',
								(val) =>
									/^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
									'Solo se permiten caracteres',
							]" />
						<q-input filled color="deep-purple-6" class="q-mb-xs" v-model="cdi_cuadrante" type="text"
							label="Cuadrante" :rules="[
								(val) => !!val || 'Este campo es obligatorio',
								(val) => val.length >= 3 || 'Mínimo 3 caracteres',
								(val) => val.length <= 200 || 'Máximo 20 caracteres',
							]" />
					</div>
				</div>
				<div class="col-6" style="border-left: 10px solid white;">
					<div class="column justify-center">
						<p class="text-subtitle  text-medium">Credenciales de acceso</p>
						<div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
							<q-input filled color="deep-purple-6" class="q-mb-xs" v-model="cdi_nombre_usuario"
								label="Nombre de usuario" :rules="[
									(val) => val.length >= 5 || 'Mínimo 5 caracteres',
									(val) => val.length <= 20 || 'Máximo 20 caracteres',
									(val) => /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(val) || 'Solo se permiten letras (sin números ni caracteres especiales)',
								]" />
							<q-input filled :type="isPwd ? 'password' : 'text'" color="deep-purple-6"
								v-model="cdi_contrasena" label="Password" :rules="passwordRules">
								<template v-slot:append>
									<q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
										@click="isPwd = !isPwd" />
								</template>
							</q-input>

						</div>

					</div>
				</div>
			</div>
			<div v-if="viewType === 'addWorker'" class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 q-mt-md ">
				<q-btn unelevated :loading="loader" @click="addEncargado()" :disable="!valid"
					class="full-width text-white bg-primary" label="Añadir CDI" />
			</div>


		</div>


		<div class="row justify-center" v-if="viewType === 'userDetail'">
			<div class="col-12 text-left">
				<q-icon style="cursor: pointer" @click="workerView('userList')" name="mdi-arrow-left"
					class="text-primary" size="md"></q-icon>
			</div>
			<div class="col-12 text-center q-mb-lg">
				<q-avatar color="primary" icon="mdi-account-circle" text-color="white">
				</q-avatar>
			</div>
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div class="row text-center justify-center">
					<div class="col-12 q-mt-xs">
						<p class="text-subtitle text-medium">Información del CDI</p>

						<div class="row jusitify-center">
							<div class="col-6 q-pa-sm">
								<q-input filled @blur="validarNombre" color="deep-purple-6" v-model="dataUser.nombre"
									label="Nombre de CDI" :rules="[
										(val) => !!val || 'Este campo es obligatorio',
										(val) => val.length >= 3 || 'Mínimo 3 caracteres',
										(val) => val.length <= 200 || 'Máximo 200 caracteres',
										(val) =>
											/^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
											'Solo se permiten caracteres',
									]" />
							</div>
							<div class="col-6 q-pa-sm">
								<q-input filled color="deep-purple-6" @blur="validarNumeroCDI"
									v-model="dataUser.numero_cdi" label="Número de CDI" :rules="[
										(val) => !!val || 'Este campo es obligatorio',
										(val) => val.length <= 10 || 'Máximo 10 dígitos',
									]" />
							</div>
							<div class="col-6 q-pa-sm">
								<q-input filled color="deep-purple-6" @blur="validarEncargado"
									v-model="dataUser.encargado" label="Encargado" :rules="[
										(val) => !!val || 'Este campo es obligatorio',
										(val) =>
											/^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
											'Solo se permiten letras y números (no símbolos)',
									]" />
							</div>
							<div class="col-6 q-pa-sm">
								<q-input filled color="deep-purple-6" @blur="validarCuadrante"
									v-model="dataUser.cuadrante" label="Cuadrante" :rules="[
										(val) => !!val || 'Este campo es obligatorio',
										(val) => val.length >= 3 || 'Mínimo 3 caracteres',
										(val) => val.length <= 20 || 'Máximo 20 caracteres',
									]" />
							</div>


							<q-btn unelevated :disable="!isValidInfoCDI" :loading="loader"
								@click="actualizarCDI(dataUser)" class="full-width mx-auto text-white bg-primary"
								label="Actualizar información" />
						</div>
					</div>

					<div class="col-12 q-mt-xl">
						<p class="text-subtitle text-medium no-padding">Información de credenciales</p>
						<small>Puedes actualizar la contraseña del usuario del doctor desde esta sección; Asegurate de
							informar la
							nueva credencial a tu Doctor</small>
						<div class="row jusitify-center">
							<div class="col-6 q-pa-sm">
								<q-input filled color="deep-purple-6" v-model="dataUser.usuarios.nombre_usuario"
									@blur="validateUserCredentialsInputs" label="Nombre de usuario" :rules="[
										(val) => val.length >= 5 || 'Mínimo 5 caracteres',
										(val) => val.length <= 20 || 'Máximo 20 caracteres',
										(val) => /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(val) || 'Solo se permiten letras (sin números ni caracteres especiales)',
									]" />
							</div>

							<div class="col-6 q-pa-sm">
								<q-input filled color="deep-purple-6" v-model="dataUser.usuarios.contrasena"
									@blur="validateUserCredentialsInputs" :rules="passwordRules" label="Contraseña" />
							</div>

						</div>
					</div>
					<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-mt-md">
						<q-btn unelevated :disabled="!isValid" :loading="loader"
							@click="actualizarCDI(dataUser)" class="fullwidth text-white bg-primary"
							label="Actualizar credenciales" />
					</div>
				</div>
			</div>
		</div>


		<q-dialog v-model="modalDetailUser">
			<q-card class="my-card" flat bordered style="min-width: 460px">
				<q-card-section>
					<q-card-section class="col-5 flex flex-center">
						<div class="text-overline">Detalle del CDI</div>
					</q-card-section>
					<q-card-section class="col-5 flex flex-center">
						<q-avatar color="primary" text-color="white" icon="mdi-account-circle">
						</q-avatar>
					</q-card-section>
					<q-card-section class="q-pt-xs">
						<div class="text-caption text-bold q-mt-sm q-mb-xs">
							CDI: {{ dataUser.nombre }} | {{ dataUser.numero_cdi }}
						</div>
						<div class="text-caption q-mt-sm q-mb-xs">
							Encargado: {{ dataUser.encargado }}
						</div>
						<div class="text-caption q-mt-sm q-mb-xs">
							Cuadrante: {{ dataUser.cuadrante }}
						</div>
					</q-card-section>
				</q-card-section>
				<q-separator />
                <div class="row q-pa-sm q-ml-md q-mt-md">
                  <div class="">
                    <span class="text-caption text-bold q-mt-sm q-mb-xs">Doctores en el CDI</span>
                  </div>
                </div>
				<q-card-section class="q-pt-xs">
                <q-item-section v-if="!dataUser.doctores || !dataUser.doctores.length">
                  <q-item-section class="row q-pa-sm justify-center">
                    El CDI aún no tiene doctores asignados
                  </q-item-section>
                </q-item-section>
                <q-scroll-area v-else style="height: 250px; max-width: 100%;">
                  <div v-for="(doctores, index) in dataUser.doctores" :key="index" class="q-py-xs">
                    <q-list>
                      <q-item style="cursor:pointer;">
                        <q-item-section>
                          <q-item-label>Nombre del doctor: <b>{{ doctores.persona.nombre1 }}</b></q-item-label>
                          <q-item-label>Especialidad: <b>{{ doctores.area_de_trabajo }}</b></q-item-label>
                          <q-item-label>Horario: <b>{{ doctores.horario }}</b></q-item-label>
                          <q-item-label>Años de experiencia: <b>{{ doctores.anos_experiencia }}</b></q-item-label>
                          <q-item-label>Número de carnet: <b>{{ doctores.numero_carnet }}</b></q-item-label>
                        </q-item-section>

                      </q-item>
                      <q-separator spaced inset />
                    </q-list>
                  </div>
                </q-scroll-area>
              </q-card-section>


			                  <div class="row q-pa-sm q-mt-md">
                  <div class="">
                    <span class="text-caption text-bold q-mt-sm q-ml-md q-mb-xs">Pacientes en el CDI</span>
                  </div>
                </div>
				<q-card-section class="q-pt-xs">
                <q-item-section v-if="!dataUser.pacientes || !dataUser.pacientes.length">
                  <q-item-section class="row q-pa-sm justify-center">
                    El CDI aún no tiene pacientes asignados
                  </q-item-section>
                </q-item-section>
                <q-scroll-area v-else style="height: 250px; max-width: 100%;">
                  <div v-for="(paciente, index) in dataUser.pacientes" :key="index" class="q-py-xs">
                    <q-list>
                      <q-item style="cursor:pointer;">
                        <q-item-section>
                          <q-item-label>Nombre del paciente: <b>{{ paciente.persona.nombre1 }}</b></q-item-label>
                          <q-item-label>Documento de identidad: <b>{{ paciente.persona.cedula_identidad }}</b></q-item-label>
                          <q-item-label>Nacionalidad: <b>{{ paciente.persona.nacionalidad }}</b></q-item-label>
                          <q-item-label>Fecha de registro: <b>{{ paciente.createdAt || 'No especificado' }}</b></q-item-label>
                          <q-item-label>Teléfono: <b>{{ paciente.persona.telefono.numero || 'No especificado' }}</b></q-item-label>
						  <q-item-label>Correo: <b>{{ paciente.persona.correo.correo || 'No especificado' }}</b></q-item-label>
                        </q-item-section>

                      </q-item>
                      <q-separator spaced inset />
                    </q-list>
                  </div>
                </q-scroll-area>
              </q-card-section>



				<q-card-actions align="center">
					<q-btn flat v-close-popup> Cerrar </q-btn>
					<!-- <q-btn @click="generatePDF(user)" flat v-close-popup> Descargar historial </q-btn> -->
				</q-card-actions>
			</q-card>
		</q-dialog>
		<!-- ELIMINAR ENCARGADO -->
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
					¿Estás seguro que deseas eliminar este encargado?
				</q-card-section>
				<q-card-actions align="right" class="text-white">
					<q-btn flat label="Confirmar" @click="workerDelete(workerID)" />
					<q-btn flat label="Cancelar" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>

		<!-- FIN ELIMINAR ENCARGADO -->

		<div>
			<vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
				:paginate-elements-by-height="1400" filename="informacion_de_cdis" :pdf-quality="2"
				:manual-pagination="false" pdf-format="a4" :pdf-margin="10" pdf-orientation="portrait"
				pdf-content-width="800px" @progress="onProgress($event)" ref="html2Pdf">
				<section slot="pdf-content">
					<historialEncVue :data="users" />
				</section>
			</vue-html2pdf>
		</div>

				<div>
			<vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
				:paginate-elements-by-height="1400" filename="informacion_de_cdi" :pdf-quality="2"
				:manual-pagination="false" pdf-format="a4" :pdf-margin="10" pdf-orientation="portrait"
				pdf-content-width="800px" @progress="onProgress($event)" ref="cdihtml2Pdf">
				<section slot="pdf-content">
					<historialCDIVue :data="dataUser" />
				</section>
			</vue-html2pdf>
		</div>
	</div>
</template>
<script>
import config from "../../../config";
import { ADDUSER_MUTATION, USER_DELETE, BUSCAR_USER_QUERY, ADMIN_CDIS_QUERY, ADD_CDI_USER_MUTATION, UPDATE_CDI_STATUS_MUTATION, UPDDATE_CDI_MUTATION } from "../../../graphql/user";
import { ADMIN_ENCARGADO_QUERY } from "../../../graphql/admin";
import VueHtml2pdf from "vue-html2pdf";
import historialEncVue from "./historialEnc.vue";
import historialCDIVue from "./historiaCDIPdf.vue";

export default {
	name: "admins",
	components: { VueHtml2pdf, historialEncVue, historialCDIVue },
	data() {
		return {
			isValid: false,
			isValidInfoCDI: false,
			passwordRules: [
				(val) => val.length >= 8 || 'Mínimo 8 caracteres',
				(val) => val.length <= 20 || 'Máximo 20 caracteres',
				(val) => /[0-9]/.test(val) || 'Debes incluir al menos 1 número',
				(val) => /[!@#$%^&*(),.?" :{}|<>]/.test(val) || 'Debes incluir al menos 1 carácter especial',
				(val) => /[A-Z]/.test(val) || 'Debes incluir al menos 1 letra mayúscula',
			],
			modalDetailUser: false,
			config: config,
			previewImgs: "",
			imghightlight: "",
			highlight: [],
			highlightPreview: "",
			image: [],
			imagePreview: [],
			dni: "",
			cdi_number: "",
			telefono: "",
			direccion: {
				UserId: this.$store.state.user.id,
				CiudadId: 1,
			},
			calle: "",
			numero: "",
			sector: "",
			estado: { label: 'Anzoátegui', value: 2 },
			ciudad: "",
			detailSector: "",
			detailCalle: "",
			tab: "users",
			role: "Encargado",
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
			password2: "",
			userId: "",
			dataUser: "",
			user: "",
			valid: true,

			buscador: true,
			roleEspecialidad: "Encargado",
			roleUser: [{ label: "Encargado", value: "Encargado" }],
			codigo: 414,
			codigoTel: [
				{ label: "0414", value: 414 },
				{ label: "0424", value: 424 },
				{ label: "0412", value: 412 },
				{ label: "0416", value: 416 },
				{ label: "0426", value: 426 },
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
			users: {},
			viewType: "userList",

			// DATOS DE CDI
			cdi_nombre: "",
			cdi_number: "",
			cdi_encargado: "",
			cdi_cuadrante: "",
			cdi_nombre_usuario: "",
			cdi_contrasena: "",
			cdi_numero: "",

			nacionalidad: "V",
			nacionalidadUser: "",
			nacionalidades: [
				{ label: "V", value: "V" },
				{ label: "E", value: "E" },
			],
		};
	},
	created() {
		this.AllEncargados();
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
			if (
				newValue !== "" &&
				/^([a-zA-Z0-9._-]{3,}[@][a-zA-Z0-9.]{3,}[.][a-zA-Z0-9.]{3,3})*$/.test(newValue)
			) {
				return (this.valid = true);
			} else {
				return (this.valid = false);
			}
		},
		password(newValue) {
			if (newValue !== "" && newValue.length < 6 && newValue === this.password2) {
				return (this.valid = true);
			} else {
				return (this.valid = false);
			}
		},
		password2(newValue) {
			if (newValue === this.password) {
				return (this.valid = true);
			} else {
				return (this.valid = false);
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
		cdi_nombre() {
			this.validateFields();
		},
		cdi_numero() {
			this.validateFields();
		},
		cdi_encargado() {
			this.validateFields();
		},
		cdi_cuadrante() {
			this.validateFields();
		},
		cdi_nombre_usuario() {
			this.validateFields();
		},
		cdi_contrasena() {
			this.validateFields();
		},
	},
	methods: {

		validateFields() {
			const rules = {
				cdi_nombre: [
					(val) => !!val || 'Este campo es obligatorio',
					(val) => val.length >= 3 || 'Mínimo 3 caracteres',
					(val) => val.length <= 200 || 'Máximo 200 caracteres',
					(val) =>
						/^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
						'Solo se permiten caracteres',
				],
				cdi_numero: [
					(val) => !!val || 'Este campo es obligatorio',
					(val) => val.length <= 10 || 'Máximo 10 dígitos',
				],
				cdi_encargado: [
					(val) => !!val || 'Este campo es obligatorio',
					(val) => val.length >= 3 || 'Mínimo 3 caracteres',
					(val) => val.length <= 200 || 'Máximo 200 caracteres',
					(val) =>
						/^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) ||
						'Solo se permiten caracteres',
				],
				cdi_cuadrante: [
					(val) => !!val || 'Este campo es obligatorio',
					(val) => val.length >= 3 || 'Mínimo 3 caracteres',
					(val) => val.length <= 20 || 'Máximo 20 caracteres',
				],
				cdi_nombre_usuario: [
					(val) => val.length >= 5 || 'Mínimo 5 caracteres',
					(val) => val.length <= 20 || 'Máximo 20 caracteres',
					(val) =>
						/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(val) ||
						'Solo se permiten letras (sin números ni caracteres especiales)',
				],
				cdi_contrasena: [
					(val) => val.length >= 8 || 'Mínimo 8 caracteres',
					(val) =>
						/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/.test(
							val
						) || 'Debe contener al menos una mayúscula, una minúscula, un número y un carácter especial',
				],
			};

			const isValid =
				rules.cdi_nombre.every((rule) => rule(this.cdi_nombre) === true) &&
				rules.cdi_numero.every((rule) => rule(this.cdi_numero) === true) &&
				rules.cdi_encargado.every((rule) => rule(this.cdi_encargado) === true) &&
				rules.cdi_cuadrante.every((rule) => rule(this.cdi_cuadrante) === true) &&
				rules.cdi_nombre_usuario.every(
					(rule) => rule(this.cdi_nombre_usuario) === true
				) &&
				rules.cdi_contrasena.every((rule) => rule(this.cdi_contrasena) === true);

			this.valid = isValid;
		},


		cdiDetails(user) {
			this.dataUser = user;
			this.workerView("userDetail");
		},

		validateUserCredentialsInputs() {
			if (!this.dataUser || !this.dataUser.usuarios) return false;

			const password = this.dataUser.usuarios.contrasena;
			const username = this.dataUser.usuarios.nombre_usuario;

			const passwordRules = [
				(val) => val.length >= 8 || 'Mínimo 8 caracteres',
				(val) => val.length <= 20 || 'Máximo 20 caracteres',
				(val) => /[0-9]/.test(val) || 'Debe contener al menos un número',
				(val) => /[!@#$%^&*(),.?"{}|<>]/.test(val) || 'Debe contener al menos un carácter especial',
				(val) => /[A-Z]/.test(val) || 'Debe contener al menos una mayúscula'
			];

			const usernameRules = [
				(val) => val.length >= 5 || 'Mínimo 5 caracteres',
				(val) => val.length <= 15 || 'Máximo 15 caracteres',
				(val) => /^[a-zA-Z0-9_]+$/.test(val) || 'Solo se permiten letras, números y guiones bajos'
			];

			const passwordValid = passwordRules.every(rule => rule(password) === true);
			const nameValid = usernameRules.every(rule => rule(username) === true);

			this.isValid = passwordValid && nameValid;
		},

		validarNombre() {
			if (!this.dataUser) return false;
			const val = this.dataUser.nombre;

			const rules = [
				(val) => !!val || 'Este campo es obligatorio',
				(val) => val.length >= 3 || 'Mínimo 3 caracteres',
				(val) => val.length <= 200 || 'Máximo 200 caracteres',
				(val) => /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(val) || 'Solo se permiten letras y espacios'
			];

			this.isValidInfoCDI = rules.every(rule => rule(val) === true);
		},

		validarNumeroCDI() {
			if (!this.dataUser) return false;
			const val = this.dataUser.numero_cdi;

			const rules = [
				(val) => !!val || 'Este campo es obligatorio',
				(val) => val.length <= 10 || 'Máximo 10 dígitos'
			];

			this.isValidInfoCDI = rules.every(rule => rule(val) === true);
		},

		validarEncargado() {
			if (!this.dataUser) return false;
			const val = this.dataUser.encargado;

			const rules = [
				(val) => !!val || 'Este campo es obligatorio',
				(val) => /^([\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,40})*$/.test(val) || 'Solo se permiten letras y números (no símbolos)'
			];

			this.isValidInfoCDI = rules.every(rule => rule(val) === true);
		},

		validarCuadrante() {
			if (!this.dataUser) return false;
			const val = this.dataUser.cuadrante;

			const rules = [
				(val) => !!val || 'Este campo es obligatorio',
				(val) => val.length >= 3 || 'Mínimo 3 caracteres',
				(val) => val.length <= 20 || 'Máximo 20 caracteres'
			];

			this.isValidInfoCDI = rules.every(rule => rule(val) === true);
		},

		workerView(typeView) {
			this.viewType = typeView;
		},
		generatePDF(user) {
			this.dataUser = user;
			console.log("dataUser", this.dataUser	);
			this.$refs.cdihtml2Pdf.generatePdf();
		},
		cdisInformationsPDF() {
			this.$refs.html2Pdf.generatePdf();
		},
		userDetail(user) {
			this.modalDetailUser = true;
			this.dataUser = user;
			this.detailSector = user.direccion.sector;
			this.detailCalle = user.direccion.calle;
			if (this.dataUser.nacionalidad === "V") {
				this.nacionalidadUser = "Venezolano/a";
			} else if (this.dataUser.nacionalidad === "J") {
				this.nacionalidadUser = "Jurídico";
			} else {
				this.nacionalidadUser = "Extranjero/a";
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
		AllEncargados() {
			this.$apollo
				.query({
					query: ADMIN_CDIS_QUERY,
					fetchPolicy: "network-only",
				})
				.then((response) => {
					this.loaderUser = false;
					this.users = Object.assign([], response.data.cdis);
				})
				.catch((err) => {
					this.loaderUser = false;
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
					mutation: UPDATE_CDI_STATUS_MUTATION,
					variables: {
						id_cdi: usuario.id_cdi,
						estado: usuario.estado,
					},
				})
				.then((response) => {
					this.loader = false;
					this.viewType = "userList"
					this.AllEncargados();
					this.$q.notify({
						message: "Estatus de CDI actualizado",
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
		addEncargado() {
			this.loader = true;
			this.$apollo
				.mutate({
					mutation: ADD_CDI_USER_MUTATION,
					variables: {
						input: {
							usuarioInput: {
								nombre_usuario: this.cdi_nombre_usuario,
								contrasena: this.cdi_contrasena,
							},
							numero_cdi: this.cdi_numero,
							nombre: this.cdi_nombre,
							encargado: this.cdi_encargado,
							cuadrante: this.cdi_cuadrante,
						},
					}
				})
				.then((response) => {
					this.loader = false;
					this.cdi_nombre_usuario = '';
					this.cdi_contrasena = '';
					this.cdi_numero = '';
					this.cdi_nombre = '';
					this.cdi_encargado = '';
					this.cdi_cuadrante = '';
					this.viewType = "userList";
					this.AllEncargados();
					this.$q.notify({
						message: "CDI añadido",
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
		actualizarCDI(cdiInfo) {
			this.loader = true;
			this.$apollo
				.mutate({
					mutation: UPDDATE_CDI_MUTATION,
					variables: {
						id_cdi: cdiInfo.id_cdi,
						input: {
							nombre: cdiInfo.nombre,
							numero_cdi: cdiInfo.numero_cdi,
							encargado: cdiInfo.encargado,
							cuadrante: cdiInfo.cuadrante,
							usuarioInput: {
								nombre_usuario: cdiInfo.usuarios.nombre_usuario,
								contrasena: cdiInfo.usuarios.contrasena,
							}
						},
					}
				})
				.then((response) => {
					this.loader = false;
					this.dataUser = "";
					this.viewType = "userList";
					this.cdi_nombre_usuario = '';
					this.cdi_contrasena = '';
					this.cdi_numero = '';
					this.cdi_nombre = '';
					this.cdi_encargado = '';
					this.cdi_cuadrante = '';
					this.AllEncargados();
					this.$q.notify({
						message: "CDI actualizado",
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
			console.log(workerID);
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
						message: "Encargado eliminado",
						color: "positive",
					});
					this.deleteUserModal = false;
					this.$emit("updateUsers", {
						users: true,
					});
					this.viewType = "userList";
					this.AllEncargados();
				})
				.catch((err) => {
					this.$q.notify({
						message: err.message.split("GraphQL error:"),
						color: "negative",
					});
				});
		},
		buscarUsuario(cdi_number) {
			const usuario = this.users.filter((usuario) => usuario.numero_cdi === cdi_number)
			if (usuario.length !== 0) {
				this.dataUser = usuario[0];
				this.modalDetailUser = true;
			} else {
				this.$q.notify({
					message: "El CDI con este número no existe",
					color: "negative",
				});
			};
			this.cdi_number = "";

		},

	}

}
</script>
