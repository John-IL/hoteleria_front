<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      Todos los derechos reservados - ® {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        href="https://www.facebook.com/HospedajeTony.SantaAnita"
        target="_blank"
      >Hospedaje Tony E.I.R.L </b-link>
      <span class="d-none d-sm-inline-block"> </span>
    </span>

    <span class="float-md-right d-none d-md-block">Desarrollado por Alumnos de la UCV
      <feather-icon
        icon="HeartIcon"
        size="21"
        class="text-danger stroke-current"
      />
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
