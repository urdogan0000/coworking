<template>
  <v-app>
    <Navbar />
    <div class="main-content container">
      <router-view />
    </div>
  </v-app>
</template>

<script setup>
import Navbar from "./components/NavBar.vue";
</script>

<style>
.main-content {
  padding-top: 64px; /* Adjust this value based on the height of your navbar */
}
</style>
