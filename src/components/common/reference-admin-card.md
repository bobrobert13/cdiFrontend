            <q-list class="rounded-borders q-pa-md bg-white shadow-1 q-mb-md" style="border-radius: 15px">
              <!-- Nombre del paciente encabezado -->
              <div class="row items-center q-my-sm  q-mb-md q-mx-md">
                <q-avatar class=" q-mr-xs" size="30px" font-size="22px" color="teal" text-color="white" icon="mdi-human-male" />
                <q-item-label class="text-left text-subtitle1" lines="1">
                  <span class="text-weight-bold text-primary">Paciente:</span>
                  <span class="text-weight-medium"> {{ user.persona.nombre1 }}</span>
                </q-item-label>
              </div>

              <q-item class="full-width q-pa-none">
                <div class="row full-width q-col-gutter-md">
                  <!-- Información Personal -->
                  <div class="col-12 col-md-4" @click="userDetail(user)" style="cursor: pointer">
                    <q-item-label class="text-left text-weight-bold q-mb-sm text-grey-8" style="font-size: 11px; letter-spacing: 1px">
                      INFORMACIÓN PERSONAL
                    </q-item-label>
                    <div class="column q-gutter-y-xs">
                      <div class="row q-gutter-x-xs">
                        <span class="text-weight-medium text-primary">Cédula:</span>
                        <span>{{ user.persona.edad >= 18 ? user.persona.cedula_identidad : user.documento_identidad_representante }}</span>
                      </div>
                      <div class="row q-gutter-x-xs">
                        <span class="text-weight-medium text-primary">Edad:</span>
                        <span>{{ user.persona.edad }} años</span>
                      </div>
                      <div class="row q-gutter-x-xs">
                        <span class="text-weight-medium text-primary">Ingreso:</span>
                        <span>{{ entradaFecha(user.createdAt) }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Información del Médico -->
                  <div class="col-12 col-md-8" @click="userDetail(user)" style="cursor: pointer">
                    <q-item-label class="text-left text-weight-bold q-mb-sm text-grey-8" style="font-size: 11px; letter-spacing: 1px">
                      REGISTRO MÉDICO
                    </q-item-label>
                    <div v-if="user.doctor" class="column q-gutter-y-xs">
                      <div class="row q-gutter-x-xs">
                        <span class="text-weight-medium text-primary">Médico:</span>
                        <span class="text-weight-bold">{{ user.doctor.persona.nombre1 }}</span>
                      </div>
                      <div class="row q-gutter-x-xs">
                        <span class="text-weight-medium text-primary">Carnet:</span>
                        <span>{{ user.doctor.numero_carnet }}</span>
                      </div>
                      <div class="row q-gutter-x-xs">
                        <span class="text-weight-medium text-primary">Área de trabajo:</span>
                        <span class="">{{ user.doctor.area_de_trabajo }}</span>
                      </div>
                    </div>
                    <div v-else class="text-grey-5 text-caption">No hay médico asignado</div>
                  </div>

                  <!-- Pie de tarjeta: CDI y Botones -->
                  <div class=" full-width column q-mt-sm">
                    <q-separator spaced />
                    <div class="col-xs col-sm row-md row-lg row-xl items-center justify-between q-col-gutter-sm">
                      <div class=" col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div v-if="user.cdi" class="column">
                          <div class="">
                            Registrado en: <span class="text-primary text-weight-bold">{{ user.cdi.nombre }}</span>
                          </div>
                          <div class="text-caption">
                            Encargado: <span class="text-grey-8">{{ user.cdi.encargado }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="q-mt-xs-sm q-mt-sm-sm q-mt-md-none q-mt-lg-none q-mt-xl-none row items-center justify-md-end justify-lg-end justify-xl-end justify-sm-center justify-xs-center q-gutter-x-md">
                        <div @click.stop="userDetail(user)" class="row items-center cursor-pointer text-primary text-weight-bold">
                          <span>Ver detalles</span>
                          <q-icon name="mdi-eye" size="20px" class="q-ml-xs" />
                        </div>
                        <div @click.stop="generatePDF(user)" class="row items-center cursor-pointer text-primary text-weight-bold">
                          <span>Ficha PDF</span>
                          <q-icon name="mdi-printer-pos" size="20px" class="q-ml-xs" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-item>
            </q-list>