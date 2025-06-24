<script setup>
import Button from "@/components/Button.vue";
import CryptoCard from "@/components/CryptoCard.vue";
import { useCryptoStore } from "@/stores/useCryptoStore";
import { computed, onMounted, onUnmounted, ref } from "vue";

const store = useCryptoStore();

// Make the data reactive in store by using computed
const marketCryptoData = computed(() => store.marketCryptoData);
const searchResultData = computed(() => store.marketSearchData);
const isSearching = computed(() => store.isSearching);

// Debounce functionality
let searchTimeout = null;

// mount the store data when the page is loaded
onMounted(async () => {
  await store.fetchMarketCrypto();
});

// Clean up timeout when component is unmounted
onUnmounted(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
});

const handleSearch = (event) => {
  const searchQuery = event.target.value;

  // Clear existing timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Set new timeout for debounced search
  searchTimeout = setTimeout(async () => {
    if (!searchQuery.trim()) {
      // If search is empty, clear search results and fetch regular market data
      store.clearSearchResults();
      await store.fetchMarketCrypto();
      return;
    }

    try {
      // Call the store's search function with debounce
      await store.searchMarket(searchQuery);
    } catch (error) {
      console.error("Error searching for cryptocurrency:", error);
    }
  }, 800); // 800ms debounce delay
};
</script>

<template>
  <div class="pt-10 space-y-14">
    <div class="space-y-4 font-[Inter] text-center md:text-start">
      <h1 class="crypto-text-gradient text-4xl">Cryptocurrency Market</h1>
      <p class="text-subtext">
        Real-time prices and market data for the top cryptocurrencies
      </p>
    </div>

    <!-- Search -->
    <div
      class="glass-effect p-6 rounded-lg flex items-center gap-x-4 justify-between flex-col md:flex-row"
    >
      <!-- Search Input -->
      <div
        class="flex items-center rounded-lg w-full md:w-1/2"
        style="border: 1px solid rgba(255, 255, 255, 0.1)"
      >
        <i class="fa-solid fa-magnifying-glass text-subtext p-2"></i>
        <input
          type="text"
          placeholder="Search for a cryptocurrency..."
          class="w-full p-2 focus:outline-none focus:ring-1 rounded-lg focus:ring-green-500 bg-transparent text-white"
          style="border: 1px solid rgba(255, 255, 255, 0.1); border-left: none"
          @input="handleSearch"
        />
      </div>
      <div class="flex justify-between items-center pt-4">
        <Button :label="'Price'" :value="'inactive'" />
        <Button :label="'24h Change'" :value="'inactive'" />
        <Button :label="'Market Cap'" :value="'active'" />
      </div>
    </div>
    <!-- Result / Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6"
    >
      <!-- Loading indicator -->
      <div v-if="isSearching" class="col-span-full text-center py-8">
        <div class="text-white text-lg">Searching...</div>
      </div>

      <!-- Display search results if available -->
      <div
        v-else-if="searchResultData && searchResultData.length > 0"
        v-for="result in searchResultData"
        :key="result.id"
      >
        <CryptoCard
          :crypto="result.name"
          :symbol="result.symbol"
          :price="result.current_price"
          :change="result.market_cap_change_percentage_24h"
          :marketCap="result.market_cap"
          :volume="result.total_volume"
          :image="result.image"
        />
      </div>

      <!-- No search results found -->
      <div
        v-else-if="searchResultData && searchResultData.length === 0"
        class="col-span-full text-center py-8"
      >
        <p class="text-subtext">No cryptocurrencies found for your search.</p>
      </div>

      <!-- Default market data when no search is active -->
      <div v-else v-for="marketData in marketCryptoData" :key="marketData.id">
        <CryptoCard
          :crypto="marketData.name"
          :symbol="marketData.symbol"
          :price="marketData.current_price"
          :change="marketData.market_cap_change_percentage_24h"
          :marketCap="marketData.market_cap"
          :volume="marketData.total_volume"
          :image="marketData.image"
        />
      </div>
    </div>
  </div>
</template>
