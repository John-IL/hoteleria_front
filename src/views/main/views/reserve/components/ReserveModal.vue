<template>
  <div>
    <b-modal :title="title" v-model="showModal" modal-class="modal-primary" hide-footer @hidden="close" size="lg" loading
      no-close-on-backdrop no-close-on-esc>
      <validation-observer ref="checkForm" #default="{ invalid }">
        <b-row>
          <b-col cols="6" class="mt-1">
            <b-form-group>
              <div class="d-flex justify-content-between text-white">
                <label for="user-document-type">Cliente</label>
              </div>
              <validation-provider #default="{ errors }" name="client" vid="client" rules="chat-compose-required">
                <v-select small :class="{ 'border-danger rounded': errors[0] }" v-model="selectedClient"
                  :options="clients" :reduce="(val) => val.id" label="name" class="w-100" hint="Seleccione un rol"
                  :disabled="disableAll"></v-select>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="6" class="mt-1">
            <b-form-group>
              <div class="d-flex justify-content-between text-white">
                <label for="user-document-type">Método de Pago</label>
              </div>
              <validation-provider #default="{ errors }" name="payment_method" vid="payment_method"
                rules="chat-compose-required">
                <v-select small :class="{ 'border-danger rounded': errors[0] }" v-model="selectedPaymentMethod"
                  :options="payment_methods" :reduce="(val) => val.id" label="name" class="w-100"
                  hint="Seleccione un metodo de pago" :disabled="disableAll"></v-select>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="12" class="mt-1">
            <div class="d-flex justify-content-end">
              <b-button variant="outline-success" @click="showModalRoom = true" :disabled="disablePlusButton">
                <feather-icon icon="PlusIcon" size="15" class="mr-1" />
                <span>Habitación</span>
              </b-button>
            </div>
          </b-col>

          <b-col cols="12" class="mt-1">
            <div>
              <b-table-simple small responsive class="text-center">
                <b-thead>
                  <b-tr>
                    <b-th colspan="2" class="bg-primary text-light">HABITACION</b-th>
                    <b-th colspan="4" class="bg-info text-light">RESERVA</b-th>
                    <b-th colspan="2" class="bg-warning">PROMOCION</b-th>
                    <b-th colspan="1" rowspan="2" class="bg-success pt-2"> IMPORTE</b-th>
                    <b-th colspan="1" rowspan="2" class="bg-secondary pt-2 text-light">OPCIONES</b-th>
                  </b-tr>
                  <b-tr>
                    <b-th class="text-primary">NUMERO</b-th>
                    <b-th class="text-primary">PRECIO</b-th>
                    <b-th class="text-info">INICIO</b-th>
                    <b-th class="text-info">FIN</b-th>
                    <b-th class="text-info">DIAS</b-th>
                    <b-th class="text-info">MONTO</b-th>
                    <b-th class="text-warning">CODIGO</b-th>
                    <b-th class="text-warning">DESCUENTO</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(reserve, index) in reserves">
                    <b-th>{{ reserve.number }}</b-th>
                    <b-th class="text-success"> S/ {{ reserve.price | currency }}</b-th>
                    <b-td>{{ reserve.start_date | myGlobal}}</b-td>
                    <b-td>{{ reserve.end_date | myGlobal }}</b-td>
                    <b-td>{{ reserve.reserves_day }}</b-td>
                    <b-td class="text-success">S/ {{ reserve.sub_total | currency }}</b-td>
                    <b-td> <b-badge variant="warning" v-b-tooltip.hover :title="reserve.promotion"> {{ reserve.code }} </b-badge> </b-td>
                    <b-td class="text-danger"> - S/ {{ reserve.discount | currency }}</b-td>
                    <b-td class="text-success">S/ {{ reserve.total | currency }} </b-td>
                    <b-td class="text-danger">
                      <feather-icon icon="Trash2Icon" class="cursor-pointer" @click="deleteRoom(index)"></feather-icon>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tfoot>
                  <b-tr>
                    <b-td colspan="8" class="text-right">
                      Total:
                    </b-td>
                    <b-td class="text-success">
                      <b>S/ {{ totalPayment | currency }}</b>
                    </b-td>
                  </b-tr>
                </b-tfoot>
              </b-table-simple>
            </div>

          </b-col>

          <b-col cols="6" class="mt-1"> </b-col>

          <b-col cols="12" class="mt-2">
            <div class="d-flex justify-content-end">
              <b-button type="submit" class="mx-1" variant="light" :disabled="disableAll" @click="close">
                Cancelar
              </b-button>
              <b-button v-if="!loading" type="submit" @click="registerReserve" variant="primary"
                :disabled="invalid || disableAll">
                Registrar
              </b-button>
              <b-button v-else variant="primary" disabled>
                <b-spinner small />
                Cargando...
              </b-button>
            </div>
          </b-col>
        </b-row>
      </validation-observer>
      <add-room-modal v-if="showModalRoom" @closeModal="showModalRoom = false" @addRoon="refreshReserve"></add-room-modal>
    </b-modal>
  </div>
</template>
  
<script>
import ReserveService from "@/views/main/views/reserve/service/reserve.service.js"
import ClientService from "@/views/main/views/client/services/client.service.js"
import RoomService from "@/views/main/views/room/services/room.service.js"
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import AddRoomModal from "@/views/main/views/reserve/components/AddRoomModal.vue"
import { mapGetters } from "vuex";
export default {
  components: { AddRoomModal },
  props: {
    type: {
      type: String,
      default: "client",
    },
  },
  data() {
    return {
      disablePlusButton: false,
      title: "Crear reserva",
      showModal: true,
      showModalRoom: false,
      loading: false,
      disableAll: false,
      disable: {
        type: true,
        first_name: true,
        last_name: true,
      },
      clients: [],
      selectedClient: null,
      selectedPaymentMethod: null,
      payment_methods: [],
      reserves: [],
      totalPayment: 0,
    };
  },


  computed: {
    ...mapGetters({
      currentUser: "auth/dataUser",
    }),
  },

  methods: {
    async getClients() {
      const { data } = await ClientService.listSelect();
      this.clients = data;
    },
    async getRooms() {
      const { data } = await RoomService.listSelect();
      this.rooms = data.map((element) => { return { "id": element.id, "name": element.number } });
    },

    async getMethods() {
      const { data } = await RoomService.methodSelect();
      this.payment_methods = data
    },

    deleteRoom(index) {
        this.reserves.splice(index, 1);
        this.updateTotalPayment();
    },
    close(action = false) {
      this.$emit("close", action);
    },

    async registerReserve() {
      const response = await this.$refs.checkForm.validate();
      if (response) {
        await this.register();
      }
    },
    async register() {
      const params = {
        client: this.selectedClient,
        personal : this.currentUser.id,
        payment_method: this.selectedPaymentMethod,
        detail : this.reserves,
        total: this.totalPayment,
        description: "."
      }
      await this.addPreloader();
      let response = {};
      this.loading = true;
      try {
        response = await ReserveService.register(params);
        if (response.data.code == 200) {
          this.$emit("refreshTable");
          this.close();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Reserva Registrada",
              icon: "ThumbsUpIcon",
              variant: "success",
              text: response.data.message,
            },
          });
        } else {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Error",
              icon: "AlertTriangleIcon",
              variant: "danger",
              text: response.data.message,
            },
          });
        }
      } catch (error) {
        this.loading = false;
        this.disableAll = true;

        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: "Error",
            icon: "AlertTriangleIcon",
            variant: "danger",
            text: error.response?.data?.error,
          },
        });
        // }
      } finally {
        this.loading = false;
        this.disableAll = false;
        await this.removePreloader();
      }
    },

    async refreshReserve(reserve){
      let sameNumber = false;
      this.reserves.forEach((element) => {
        if(element.number == reserve.number ){
            sameNumber = true;
        }
      })

      if(sameNumber){
        const confirm = await this.showConfirmSwal('Habitación Agregada','La habitación ya se encuentra agregada, desea reemplazarlo?');
        if(confirm.value){
          const index = this.reserves.findIndex(item => item.number === reserve.number);
          this.reserves[index] = reserve
        }
      }else{
        this.reserves.push(reserve)
      }

      this.updateTotalPayment();
    },

    updateTotalPayment(){
      this.totalPayment = 0;
      this.reserves.forEach(element => {
          this.totalPayment += element.total
      });
    }
  },

  created() {
    this.getClients();
    this.getRooms();
    this.getMethods();
  }
};
</script>
  
<style></style>