<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="background">
    <Navbar />
    <!-- This is the page content appear based on the route -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8 pt-28">
      <router-view />
    </div>
  </div>
</template>
