<script setup>
import CryptoCard from "@/components/CryptoCard.vue";
import FloatingCard from "@/components/FloatingCard.vue";
import { useCryptoStore } from "@/stores/useCryptoStore";

const store = useCryptoStore();

const topCrypto = store.allCryptoData;

// Fetch data when the component is mounted
console.log(topCrypto);
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
        <!-- <CryptoCard
          crypto="Cardano"
          symbol="ADA"
          price="$100.00"
          change="-0.3%"
          marketCap="$10B"
          volume="$500M"
          icon="fa-brands fa-ethereum"
        /> -->
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
