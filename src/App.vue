<script setup></script>

<template>
  <div class="navigation">
    <!-- Router Link is a navigation view (like Link in React) -->
    <router-link to="/">Home</router-link>
    <router-link to="/market">Market</router-link>
    <router-link to="/compare">Compare</router-link>
    <router-link to="/watchlist">Watchlist</router-link>
  </div>
  <!-- This is the page content appear based on the route -->
  <router-view />
</template>
