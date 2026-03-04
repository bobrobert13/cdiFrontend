<template>
	<q-page
		padding
	>
		<div
			class="column"
		>
			<div
				class="row items-center justify-between q-mb-md"
			>
				<h4
					class="q-my-sm text-primary"
				>
					Respaldos
					del
					Sistema
				</h4>
				<q-btn
					color="primary"
					icon="mdi-database-plus"
					label="Crear Respaldo"
					:loading="
						creando
					"
					@click="
						crearRespaldo
					"
				/>
			</div>

			<p
				class="text-grey-7"
			>
				Administra
				los
				respaldos
				de
				la
				base
				de
				datos.
				Puedes
				crear
				nuevos
				respaldos,
				restaurar
				respaldos
				anteriores
				o
				eliminar
				los
				que
				ya
				no
				necesites.
			</p>

			<q-table
				flat
				bordered
				dense
				:data="
					respaldos
				"
				:columns="
					columns
				"
				row-key="filename"
				:loading="
					loading
				"
				:filter="
					filter
				"
				rows-per-page-label="Registros por página"
				no-data-label="No hay respaldos disponibles"
				class="text-primary"
			>
				<template
					v-slot:top-right
				>
					<q-input
						dense
						color="primary"
						filled
						v-model="
							filter
						"
						placeholder="Buscar respaldo"
					>
						<template
							v-slot:append
						>
							<q-icon
								name="search"
							/>
						</template>
					</q-input>
				</template>

				<template
					v-slot:body="props"
				>
					<tr>
						<td
							class="text-left"
						>
							<q-icon
								name="mdi-file-document"
								class="q-mr-sm"
								color="primary"
							/>
							{{
								props
									.row
									.filename
							}}
						</td>
						<td
							class="text-center"
						>
							{{
								props
									.row
									.size
							}}
						</td>
						<td
							class="text-center"
						>
							{{
								formatDate(
									props
										.row
										.createdAt
								)
							}}
						</td>
						<td
							class="text-center"
						>
							<q-btn
								flat
								dense
								round
								icon="mdi-backup-restore"
								color="positive"
								@click="
									confirmarRestaurar(
										props.row
									)
								"
							>
								<q-tooltip
									>Restaurar
									este
									respaldo</q-tooltip
								>
							</q-btn>
							<q-btn
								flat
								dense
								round
								icon="mdi-delete"
								color="negative"
								@click="
									confirmarEliminar(
										props.row
									)
								"
							>
								<q-tooltip
									>Eliminar
									respaldo</q-tooltip
								>
							</q-btn>
						</td>
					</tr>
				</template>
			</q-table>
		</div>

		<!-- DIALOG CONFIRMAR RESTAURAR -->
		<q-dialog
			v-model="
				dialogRestaurar
			"
			persistent
		>
			<q-card
				class="text-white bg-primary"
				style="
					min-width: 350px;
				"
			>
				<q-card-section>
					<div
						class="text-h6"
					>
						<q-icon
							name="mdi-alert"
							class="q-mr-sm"
						/>
						Confirmar
						Restauración
					</div>
				</q-card-section>
				<q-card-section>
					<p>
						¿Estás
						seguro
						que
						deseas
						restaurar
						el
						respaldo
						<strong
							>{{
								respaldoSeleccionado
									? respaldoSeleccionado.filename
									: ""
							}}</strong
						>?
					</p>
					<p
						class="text-caption"
					>
						<q-icon
							name="mdi-alert-circle"
						/>
						Esta
						acción
						reemplazará
						toda
						la
						base
						de
						datos
						actual
						con
						los
						datos
						del
						respaldo
						seleccionado.
						Este
						proceso
						no
						se
						puede
						deshacer.
					</p>
				</q-card-section>
				<q-card-actions
					align="right"
				>
					<q-btn
						flat
						label="Cancelar"
						color="white"
						v-close-popup
					/>
					<q-btn
						flat
						label="Restaurar"
						color="white"
						:loading="
							restaurando
						"
						@click="
							restaurarRespaldo
						"
					/>
				</q-card-actions>
			</q-card>
		</q-dialog>

		<!-- DIALOG CONFIRMAR ELIMINAR -->
		<q-dialog
			v-model="
				dialogEliminar
			"
			persistent
		>
			<q-card
				class="text-white bg-negative"
				style="
					min-width: 350px;
				"
			>
				<q-card-section>
					<div
						class="text-h6"
					>
						<q-icon
							name="mdi-delete-alert"
							class="q-mr-sm"
						/>
						Confirmar
						Eliminación
					</div>
				</q-card-section>
				<q-card-section>
					<p>
						¿Estás
						seguro
						que
						deseas
						eliminar
						el
						respaldo
						<strong
							>{{
								respaldoSeleccionado
									? respaldoSeleccionado.filename
									: ""
							}}</strong
						>?
					</p>
					<p
						class="text-caption"
					>
						<q-icon
							name="mdi-alert-circle"
						/>
						Esta
						acción
						eliminará
						permanentemente
						el
						archivo
						de
						respaldo.
						Este
						proceso
						no
						se
						puede
						deshacer.
					</p>
				</q-card-section>
				<q-card-actions
					align="right"
				>
					<q-btn
						flat
						label="Cancelar"
						color="white"
						v-close-popup
					/>
					<q-btn
						flat
						label="Eliminar"
						color="white"
						:loading="
							eliminando
						"
						@click="
							eliminarRespaldo
						"
					/>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</q-page>
</template>

<script>
import moment from "moment";
import {
	LISTAR_RESPALDOS_QUERY,
	CREAR_RESPALDO_MUTATION,
	RESTAURAR_RESPALDO_MUTATION,
	ELIMINAR_RESPALDO_MUTATION,
} from "../../../graphql/backup";

export default {
	name: "Respaldos",
	data() {
		return {
			respaldos:
				[],
			loading: false,
			creando: false,
			restaurando: false,
			eliminando: false,
			filter:
				"",
			dialogRestaurar: false,
			dialogEliminar: false,
			respaldoSeleccionado:
				null,
			columns:
				[
					{
						name: "filename",
						label:
							"Nombre del Respaldo",
						align:
							"left",
						field:
							"filename",
						sortable: true,
					},
					{
						name: "size",
						label:
							"Tamaño",
						align:
							"center",
						field:
							"size",
						sortable: false,
					},
					{
						name: "createdAt",
						label:
							"Fecha de Creación",
						align:
							"center",
						field:
							"createdAt",
						sortable: true,
					},
					{
						name: "acciones",
						label:
							"Acciones",
						align:
							"center",
						field:
							"acciones",
						sortable: false,
					},
				],
		};
	},
	created() {
		this.listarRespaldos();
	},
	methods:
		{
			formatDate(
				date
			) {
				return moment(
					date
				).format(
					"DD/MM/YYYY HH:mm:ss"
				);
			},
			listarRespaldos() {
				this.loading = true;
				this.$apollo
					.query(
						{
							query:
								LISTAR_RESPALDOS_QUERY,
							fetchPolicy:
								"network-only",
						}
					)
					.then(
						(
							response
						) => {
							this.respaldos =
								response.data.listarRespaldos;
							this.loading = false;
						}
					)
					.catch(
						(
							err
						) => {
							this.loading = false;
							this.$q.notify(
								{
									message:
										"Error al listar respaldos: " +
										err.message,
									color:
										"negative",
								}
							);
						}
					);
			},
			crearRespaldo() {
				this.creando = true;
				this.$apollo
					.mutate(
						{
							mutation:
								CREAR_RESPALDO_MUTATION,
						}
					)
					.then(
						(
							response
						) => {
							this.creando = false;
							this.$q.notify(
								{
									message: `Respaldo creado: ${response.data.crearRespaldo.filename}`,
									color:
										"positive",
									icon: "mdi-check-circle",
								}
							);
							this.listarRespaldos();
						}
					)
					.catch(
						(
							err
						) => {
							this.creando = false;
							this.$q.notify(
								{
									message:
										"Error al crear respaldo: " +
										err.message,
									color:
										"negative",
								}
							);
						}
					);
			},
			confirmarRestaurar(
				respaldo
			) {
				this.respaldoSeleccionado =
					respaldo;
				this.dialogRestaurar = true;
			},
			restaurarRespaldo() {
				this.restaurando = true;
				this.$apollo
					.mutate(
						{
							mutation:
								RESTAURAR_RESPALDO_MUTATION,
							variables:
								{
									filename:
										this
											.respaldoSeleccionado
											.filename,
								},
						}
					)
					.then(
						() => {
							this.restaurando = false;
							this.dialogRestaurar = false;
							this.$q.notify(
								{
									message: `Respaldo restaurado exitosamente: ${this.respaldoSeleccionado.filename}`,
									color:
										"positive",
									icon: "mdi-check-circle",
								}
							);
							this.respaldoSeleccionado =
								null;
						}
					)
					.catch(
						(
							err
						) => {
							this.restaurando = false;
							this.$q.notify(
								{
									message:
										"Error al restaurar: " +
										err.message,
									color:
										"negative",
								}
							);
						}
					);
			},
			confirmarEliminar(
				respaldo
			) {
				this.respaldoSeleccionado =
					respaldo;
				this.dialogEliminar = true;
			},
			eliminarRespaldo() {
				this.eliminando = true;
				this.$apollo
					.mutate(
						{
							mutation:
								ELIMINAR_RESPALDO_MUTATION,
							variables:
								{
									filename:
										this
											.respaldoSeleccionado
											.filename,
								},
						}
					)
					.then(
						() => {
							this.eliminando = false;
							this.dialogEliminar = false;
							this.$q.notify(
								{
									message: `Respaldo eliminado: ${this.respaldoSeleccionado.filename}`,
									color:
										"positive",
									icon: "mdi-check-circle",
								}
							);
							this.respaldoSeleccionado =
								null;
							this.listarRespaldos();
						}
					)
					.catch(
						(
							err
						) => {
							this.eliminando = false;
							this.$q.notify(
								{
									message:
										"Error al eliminar: " +
										err.message,
									color:
										"negative",
								}
							);
						}
					);
			},
		},
};
</script>
