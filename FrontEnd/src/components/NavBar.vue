<template>
  <v-app-bar app color="primary" dark class="custom-navbar max-md:h-96">
    <v-toolbar-title class="text-h5">MyApp</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn>
      <RouterLink to="/" class="text-white no-underline">Home</RouterLink>
    </v-btn>
    <v-btn>
      <RouterLink to="/about" class="text-white no-underline">About</RouterLink>
    </v-btn>
    <v-btn>
      <RouterLink to="/contact" class="text-white no-underline"
        >Contact</RouterLink
      >
    </v-btn>
    <v-btn>
      <RouterLink to="/product" class="text-white no-underline"
        >Products</RouterLink
      >
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
.text-white {
  color: white !important;
}

.no-underline {
  text-decoration: none !important;
}

.custom-navbar {
  min-height: 250 px;
  max-height: 450 px;
  overflow: hidden;
}
</style>
