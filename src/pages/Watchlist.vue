<script setup>
import CryptoCard from "@/components/CryptoCard.vue";
import { ref } from "vue";

const isAddModalOpen = ref(false);

const toggleAddModal = () => {
  isAddModalOpen.value = !isAddModalOpen.value;
};
</script>

<template>
  <!-- Main Content -->
  <div class="pt-10 space-y-14" :class="{ 'blur-sm': isAddModalOpen }">
    <div
      class="space-y-4 font-[Inter] text-center md:text-start flex justify-center flex-wrap items-center md:justify-between"
    >
      <div>
        <h1 class="crypto-text-gradient text-4xl">Your Watchlist</h1>
        <p class="text-subtext">Keep track of your favorite cryptocurrencies</p>
      </div>
      <div class="flex items-center gap-x-2 logo hover:cursor-pointer">
        <i class="fa-solid fa-plus"></i>
        <p @click="toggleAddModal">Add to Watchlist</p>
      </div>
    </div>

    <!-- Tracker Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        class="glass-effect p-6 rounded-lg items-center font-[Inter] flex gap-x-4"
      >
        <i class="fa-solid fa-eye text-green-500 text-2xl"></i>
        <div>
          <p>3</p>
          <p>Cryptocurrencies</p>
        </div>
      </div>
      <div
        class="glass-effect p-6 rounded-lg items-center font-[Inter] flex gap-x-4"
      >
        <i class="fa-solid fa-arrow-up"></i>
        <div>
          <p>2</p>
          <p>Gaining</p>
        </div>
      </div>
      <div
        class="glass-effect p-6 rounded-lg items-center font-[Inter] flex gap-x-4"
      >
        <i class="fa-solid fa-arrow-down"></i>
        <div>
          <p>1</p>
          <p>Losing</p>
        </div>
      </div>
    </div>
    <!-- Coin Section -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
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
  </div>

  <!-- Modal for adding watchlist -->
  <div class="relative" v-if="isAddModalOpen">
    <div
      class="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
    >
      <div
        class="bg-black p-6 rounded-lg shadow-lg w-full max-w-[70%] border border-white/10 max-h-[70vh] md:max-h-full flex flex-col"
      >
        <div class="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 class="text-xl font-bold">Add to Watchlist</h2>
          <i
            class="fa-solid fa-xmark hover:cursor-pointer"
            @click="toggleAddModal"
          ></i>
        </div>
        <!-- Search Input -->
        <div
          class="flex items-center rounded-lg w-full mb-6 flex-shrink-0"
          style="border: 1px solid rgba(255, 255, 255, 0.1)"
        >
          <i class="fa-solid fa-magnifying-glass text-subtext p-2"></i>
          <input
            type="text"
            placeholder="Search to add cryptocurrencies..."
            class="w-full p-2 focus:outline-none focus:ring-1 rounded-lg focus:ring-green-500 bg-transparent text-white"
            style="
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-left: none;
            "
          />
        </div>

        <!-- Result / Data -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto flex-1"
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
      </div>
    </div>
  </div>
</template>
