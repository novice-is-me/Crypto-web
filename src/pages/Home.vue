<script setup>
import CryptoCard from "@/components/CryptoCard.vue";
import FloatingCard from "@/components/FloatingCard.vue";
import { useCryptoStore } from "@/stores/useCryptoStore";
import { onMounted, computed, ref, watch } from "vue";

const store = useCryptoStore();

// Make topCrypto reactive by using computed
const topCrypto = computed(() => store.allCryptoData);
const seeMoreData = computed(() => store.seeMoreCryptoData);
const isLoadingMore = computed(() => store.isLoadingMore);
const isReachLimit = computed(() => store.reachLimit); // Check if the limit has been reached
const totalMarketCap = computed(() => store.totalMarketCap);
const activeCryptos = computed(() => store.activeCryptos);
const totalVolume = computed(() => store.totalVolume);
const markets = computed(() => store.markets);

// State to control whether to show more data
const showMoreData = ref(false);
const isLoadingInitial = ref(true); // Local loading state for initial data

onMounted(async () => {
  // Actually fetch the data when component mounts
  isLoadingInitial.value = true;
  try {
    await store.fetchCryptoData();
    await store.fetchTotalMarketCap();
  } finally {
    isLoadingInitial.value = false;
  }
});

const seeMore = async () => {
  if (!showMoreData.value) {
    // First time clicking "See More" - load initial extra data
    await store.loadMoreCrypto();
    showMoreData.value = true;
  } else {
    // Load more data on subsequent clicks
    await store.loadMoreCrypto();
  }
};

console.log("total market value:", totalMarketCap.value);

const formatGlobalDataNumber = (value) => {
  if (value >= 1_000_000_000) {
    return "$" + (value / 1_000_000_000).toFixed(2) + "B";
  } else if (value >= 1_000_000) {
    return "$" + (value / 1_000_000).toFixed(2) + "M";
  } else {
    return "$" + value.toFixed(2);
  }
};
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
          :value="formatGlobalDataNumber(totalMarketCap)"
          description="Total Market Cap"
          icon="fa-solid fa-dollar-sign"
          percentage="+2.5%"
        />
        <FloatingCard
          :value="formatGlobalDataNumber(totalVolume)"
          description="24h Trading Volume"
          icon="fa-solid fa-signal"
          percentage="+2.5%"
        />
        <FloatingCard
          :value="markets"
          description="Active Markets"
          icon="fa solid fa-arrow-trend-up"
          percentage="+2.5%"
        />
        <FloatingCard
          :value="activeCryptos"
          description="Active Cryptocurrencies"
          icon="fa solid fa-arrow-trend-up"
          percentage="+2.5%"
        />
      </div>
    </div>
    <div class="space-y-6">
      <p class="font-[Inter] text-4xl font-bold">Top Cryptocurrencies</p>

      <!-- Loading State for Initial Data -->
      <div v-if="isLoadingInitial" class="text-center py-12">
        <div class="glass-effect p-6 rounded-lg inline-block">
          <div class="flex items-center justify-center gap-3">
            <i class="fa-solid fa-spinner fa-spin"></i>
            <span class="text-lg">Please wait, loading data...</span>
          </div>
        </div>
      </div>

      <!-- Crypto Cards Grid -->
      <div
        v-else
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

        <!-- Additional "See More" Data -->
        <div
          v-if="showMoreData"
          v-for="crypto in seeMoreData"
          :key="`more-${crypto.id}`"
        >
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

      <!-- See More Button (only show when data is loaded) -->
      <div
        v-if="!isLoadingInitial && topCrypto.length > 0"
        class="text-center hover:cursor-pointer"
        @click="seeMore"
      >
        <p
          class="glass-effect p-4 rounded-lg inline-block transition-all duration-300 hover:bg-white/10"
        >
          <span v-if="!isLoadingMore && !isReachLimit">
            {{ showMoreData ? "Load More" : "See More" }}
          </span>
          <span v-if="isReachLimit">
            <i class="fa-solid fa-ban"></i> Too many requests, please try again
            later.
          </span>
          <span
            v-if="isLoadingMore && !isReachLimit"
            class="flex items-center justify-center gap-2"
          >
            <i class="fa-solid fa-spinner fa-spin"></i>
            Loading...
          </span>
        </p>
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
