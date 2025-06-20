<script setup>
import CryptoCard from "@/components/CryptoCard.vue";
import FloatingCard from "@/components/FloatingCard.vue";
import { useCryptoStore } from "@/stores/useCryptoStore";
import { onMounted, computed } from "vue";

const store = useCryptoStore();

// Make topCrypto reactive by using computed
const topCrypto = computed(() => store.allCryptoData);

onMounted(async () => {
  // Actually fetch the data when component mounts
  await store.fetchCryptoData();
});

console.log("topCrypto:", topCrypto.value);
</script>

<template>
  <div class="pt-10 space-y-14">
    <!-- Mesaage -->
    <div class="space-y-2 text-center">
      <h1 class="crypto-text-gradient text-4xl md:text-6xl">
        Welcome to the Future
      </h1>
      <p class="text-subtext font-[Inter] text-xs md:text-lg">
        Track, analyze, and manage your cryptocurrency portfolio with real-time
        data and advanced insights.
      </p>

      <!-- Floating Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-10"
      >
        <FloatingCard
          value="$1.73T"
          description="Total Market Cap"
          icon="fa-solid fa-dollar-sign"
          percentage="+2.5%"
        />
        <FloatingCard
          value="$82.5B"
          description="24h Trading Volume"
          icon="fa-solid fa-signal"
          percentage="+2.5%"
        />
        <FloatingCard
          value="51.2%"
          description="Bitcoin Dominance"
          icon="fa solid fa-arrow-trend-up"
          percentage="+2.5%"
        />
        <FloatingCard
          value="2,847"
          description="Active Cryptocurrencies"
          icon="fa solid fa-arrow-trend-up"
          percentage="+2.5%"
        />
      </div>
    </div>

    <div class="">
      <p class="font-[Inter] text-4xl font-bold">Top Cryptocurrencies</p>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6"
      >
        <div v-for="crypto in topCrypto" :key="crypto.symbol">
          {{ console.log(crypto) }}
          <CryptoCard
            :crypto="crypto.name"
            :symbol="crypto.symbol"
            :price="crypto.current_price"
            :change="crypto.market_cap_change_percentage_24h"
            :marketCap="crypto.market_cap"
            :volume="crypto.total_volume"
            :image="crypto.image"
          />
        </div>
      </div>
    </div>
    <div class="text-center glass-effect p-6 rounded-lg">
      <div class="space-y-4">
        <p class="font-[Inter] text-2xl font-bold">Ready to Start Trading?</p>
        <p class="text-subtext font-[Inter] text-sm md:text-lg">
          Explore our comprehensive market data and start building your
          portfolio today.
        </p>
      </div>
      <div class="grid grid-cols-1 md:flex justify-center gap-4 pt-6">
        <router-link to="/market" class="logo pulse-glow hover:cursor-pointer">
          Explore Markets
        </router-link>
        <button
          class="border border-gray-500 py-2 px-4 rounded-md hover:bg-gray-700 transition-all duration-300 hover:cursor-pointer"
        >
          Learn More
        </button>
      </div>
    </div>
  </div>
</template>
