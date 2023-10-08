<template>
  <div>
    <header-slot> </header-slot>
    <b-row>
      <b-col xl="2" lg="2" md="2" sm="12"  cols="12">
          <b-nav card-header pills class="m-2" align="center">
            <b-nav-item 
              :to="{ name: 'reporte-prediccion' }"
              exact
              exact-active-class="active"
              :link-classes="['px-3', 'mt-1']"
              >Predecir</b-nav-item
            >
            <!-- <b-nav-item
              :to="{ name: 'reporte-reservas' }"
              exact
              exact-active-class="active"
              :link-classes="['px-3','mt-1']"
              >Reservas</b-nav-item
            >
            <b-nav-item
              :to="{ name: 'reporte-clientes' }"
              exact
              exact-active-class="active"
              :link-classes="['px-3','mt-1']"
              >Clientes</b-nav-item
            > -->
          </b-nav> 
      </b-col>
      <b-col  xl="10" lg="10" md="10" sm="12"  cols="12">
        <router-view></router-view>
      </b-col>
    </b-row>

  </div>
</template>

<script>
export default {

};
</script>