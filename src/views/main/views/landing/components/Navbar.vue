<template>
  <div class="m-auto">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">
        <b-img
        :src="require('@/assets/images/logo/short_logo.png')"
          fluid
          alt="Logo"
          class="logo"
          width="50"
        >
        </b-img>
        <span class="ml-2">Hospedaje Tony </span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#rooms">Habitaciones</b-nav-item>
        </b-navbar-nav>
        <!-- <b-navbar-nav>
          <b-nav-item href="#promotions">Promociones</b-nav-item>
        </b-navbar-nav> -->
        <b-navbar-nav>
          <b-nav-item href="#contactus">Contáctanos</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-link :to="{ name: 'auth-login' }">Iniciar Sesión</b-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>