<script setup></script>

<template>
  <div
    class="w-full p-6 glass-effect fixed top-0 z-50 border-b border-white/10"
  >
    <div
      class="mx-auto max-w-7xl sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <!-- Logo Icon -->
      <div class="flex items-center space-x-2">
        <p class="logo text-2xl pulse-glow">$</p>
        <p class="crypto-text-gradient text-2xl">CryptoVault</p>
      </div>
      <!-- Menu -->
      <div class="flex gap-x-4 menu">
        <router-link to="/"
          ><div class="flex items-center gap-x-2 justify-center">
            <i class="fa-solid fa-house text-subtext"></i>
            <p>Menu</p>
          </div></router-link
        >
        <router-link to="/market"
          ><div class="flex items-center gap-x-2">
            <i class="fa-solid fa-chart-simple text-subtext"></i>
            <p>Market</p>
          </div>
        </router-link>
        <router-link to="/compare" class="flex items-center gap-x-2">
          <div class="flex items-center gap-x-2">
            <i class="fa-solid fa-magnifying-glass text-subtext"></i>
            <p>Compare</p>
          </div>
        </router-link>
        <router-link to="/watchlist" class="flex items-center gap-x-2">
          <div class="flex items-center gap-x-2">
            <i class="fa-solid fa-eye text-subtext"></i>
            <p>Watchlist</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
