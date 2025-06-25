<script setup>
import CryptoCard from "@/components/CryptoCard.vue";
import { useCryptoStore } from "@/stores/useCryptoStore";
import { computed, onMounted } from "vue";

const store = useCryptoStore();

const topCrypto = computed(() => store.allCryptoData);
const isLoadingInitial = computed(() => store.isLoadingInitial);

onMounted(async () => {
  await store.fetchCryptoData();
});
</script>

<template>
  <div class="pt-10 space-y-14">
    <div class="space-y-4 font-[Inter] text-center md:text-start">
      <h1 class="crypto-text-gradient text-4xl">Compare Cryptocurrencies</h1>
      <p class="text-subtext">
        Side-by-side comparison of cryptocurrency performance and metrics
      </p>
    </div>

    <!-- Search -->
    <div
      class="glass-effect p-6 rounded-lg items-center font-[Inter] space-y-4"
    >
      <div class="flex justify-between items-center flex-wrap">
        <p class="font-bold text-lg">Add Cryptocurrency</p>
        <p class="text-subtext text-sm">2/4 selected</p>
      </div>
      <!-- Search Input -->
      <div
        class="flex items-center rounded-lg w-full"
        style="border: 1px solid rgba(255, 255, 255, 0.1)"
      >
        <i class="fa-solid fa-magnifying-glass text-subtext p-2"></i>
        <input
          type="text"
          placeholder="Search to add cryptocurrencies..."
          class="w-full p-2 focus:outline-none focus:ring-1 rounded-lg focus:ring-green-500 bg-transparent text-white"
          style="border: 1px solid rgba(255, 255, 255, 0.1); border-left: none"
        />
      </div>
    </div>

    <!-- Chosen Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6"
    >
      <CryptoCard
        crypto="Bitcoin"
        symbol="BTC"
        price="$27,000.00"
        change="2.5%"
        marketCap="$500B"
        volume="$25B"
        icon="fa-solid fa-bitcoin-sign"
      />
      <CryptoCard
        crypto="Ethereum"
        symbol="ETH"
        price="$1,800.00"
        change="-1.2%"
        marketCap="$200B"
        volume="$10B"
        icon="fa-brands fa-ethereum"
      />
      <CryptoCard
        crypto="Solana"
        symbol="SOL"
        price="$0.50"
        change="0.5%"
        marketCap="$25B"
        volume="$1B"
        icon="fa-solid fa-circle-notch"
      />
      <CryptoCard
        crypto="Cardano"
        symbol="ADA"
        price="$100.00"
        change="-0.3%"
        marketCap="$10B"
        volume="$500M"
        icon="fa-brands fa-ethereum"
      />
    </div>

    <!-- Top crypto -->
    <div class="space-y-6">
      <p class="font-[Inter] text-4xl font-bold">Top Cryptocurrencies</p>
    </div>

    <!-- Loading State for Initial Data -->
    <div v-if="isLoadingInitial" class="text-center">
      <div class="glass-effect p-6 rounded-lg inline-block">
        <div class="flex items-center justify-center gap-3">
          <i class="fa-solid fa-spinner fa-spin"></i>
          <span class="text-lg">Please wait, loading data...</span>
        </div>
      </div>
    </div>

    <!-- Crypto Cards Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6"
    >
      <!-- Initial Top Crypto Data -->
      <div v-for="crypto in topCrypto" :key="crypto.id">
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
</template>
