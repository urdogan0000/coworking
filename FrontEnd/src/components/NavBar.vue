<template>
  <nav class="bg-gray-800">
    <div class="flex space-x-5 justify-center">
      <RouterLink
        to="/"
        class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >Home</RouterLink
      >
      <RouterLink
        to="/about"
        class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >About</RouterLink
      >
      <RouterLink
        to="/contact"
        class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >Contact</RouterLink
      >
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
