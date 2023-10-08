<template>
    <b-modal title="Agregar Habitacion" v-model="modalShow" @hidden="closeModal" hide-footer size="lg">
        <b-container>
            <validation-observer #default="{ invalid }">
                <b-row>
                    <b-col cols="4" class="mt-1">
                        <b-form-group>
                            <div class="d-flex justify-content-between text-white">
                                <label for="user-document-type">Desde: </label>
                            </div>
                            <validation-provider #default="{ errors }" name="payment_method" vid="payment_method"
                                rules="chat-compose-required">
                                <b-form-input v-model="start_date" type="date"
                                    :class="{ 'border-danger rounded': errors[0] }"></b-form-input>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="mt-1">
                        <b-form-group>
                            <div class="d-flex justify-content-between text-white">
                                <label for="user-document-type">Hasta: </label>
                            </div>
                            <validation-provider #default="{ errors }" name="payment_method" vid="payment_method"
                                rules="chat-compose-required">
                                <b-form-input v-model="end_date" type="date"
                                    :class="{ 'border-danger rounded': errors[0] }"></b-form-input>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-button variant="info" style="margin-top: 2.4rem;" @click="searchRooms" :disabled="invalid">
                            <feather-icon icon="SearchIcon" size="15" class="mr-1" />
                            Habitaciones Disponibles
                        </b-button>
                    </b-col>
                    <b-col cols="12">
                        <b-row class="mt-2">
                            <b-col xl="4" lg="4" md="6" sm="6" cols="12" v-for="(room, index) in availableRooms">
                                <b-card>
                                    <h5 class="text-center">Habitacion N° {{ room.number }}
                                        <feather-icon :id="'info-'+index" icon="InfoIcon" class="ml-1 text-primary"></feather-icon>
                                    </h5>
                                    <b-row class="text-right">
                                        <b-col cols="6">Precio/Dia :</b-col>
                                        <b-col cols="6">S/ {{ room.price | currency }}</b-col>
                                        <b-col cols="6">Dias: </b-col>
                                        <b-col cols="6">{{ room.reserves_day }}</b-col>
                                        <b-col cols="6">SubTotal :</b-col>
                                        <b-col cols="6">S/ {{ room.sub_total | currency }}</b-col>
                                        <b-col cols="6">Descuento :</b-col>
                                        <b-col cols="6" class="text-danger">- S/ {{ room.discount | currency }}</b-col>
                                        <b-col cols="6" class="border border-bottom-0 border-left-0 border-right-0 font-weight-bolder">Total : </b-col>
                                        <b-col cols="6" class="font-bolder border border-bottom-0 border-left-0 border-right-0 font-weight-bolder">S/ {{ room.total | currency }}</b-col>
                                    </b-row>
                                    <div class="d-flex justify-content-center mt-1">
                                        <b-button size="sm" href="#" variant="primary"
                                            @click="addRoom(room)">Seleccionar</b-button>
                                    </div>
                                </b-card>
                                <b-tooltip :target="'info-'+index" placement="bottom">
                                   <div>
                                        <div>✓ {{ room.guest_number }} {{ room.guest_number == "1" ? 'Huésped' : 'Huéspedes' }}</div>
                                        <div v-if="room.has_jacuzzi">✓ Jacuzzi</div>
                                        <div v-if="room.has_hot_water">✓ Agua caliente</div>
                                        <div v-if="room.has_balcony">✓ Valcon</div>
                                        <div v-if="room.has_wifi">✓ WI-FI</div>
                                   </div>
                                </b-tooltip>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </validation-observer>
        </b-container>
    </b-modal>
</template>

<script>
import RoomService from "@/views/main/views/room/services/room.service.js";
export default {
    name: "AddRoomModal",
    data() {
        return {
            modalShow: true,
            start_date: null,
            end_date: null,
            availableRooms: [],
        };
    },
    methods: {
        closeModal() {
            this.$emit("closeModal");
        },

        async searchRooms() {
            const params = {
                start_date: this.start_date,
                end_date: this.end_date
            }
            const { data } = await RoomService.getAvailableRooms(params);
            this.availableRooms = data;
        },

        addRoom(room) {
            this.$emit('addRoon', room)
        }
    },
}
</script>

<style></style>