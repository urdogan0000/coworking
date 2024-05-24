<template>
  <v-app class="d-flex flex-column min-vh-100">
    <NavBar />
    <div class="main-content flex-grow-1 d-flex flex-column">
      <router-view />
    </div>
    <Footer />
  </v-app>
</template>

<script setup>
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";
</script>

<style>
.main-content {
  padding-top: 64px; /* Adjust this value based on the height of your navbar */
}
</style>
