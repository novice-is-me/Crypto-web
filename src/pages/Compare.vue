<script setup>
import CryptoCard from "@/components/CryptoCard.vue";
import { useCryptoStore } from "@/stores/useCryptoStore";
import { computed, onMounted, ref, watch } from "vue";
import { AutoComplete } from "primevue";

const store = useCryptoStore();

const topCrypto = computed(() => store.allCryptoData);
const isLoadingInitial = computed(() => store.isLoadingInitial);
const suggestions = computed(() => store.suggestionMarketData);
const searchQuery = ref("");
const selectedCryptos = ref([]); // Array to store selected cryptocurrencies
let searchTimeout = null;
const selectedCryptoLength = computed(() => selectedCryptos.value.length);

onMounted(async () => {
  await store.fetchCryptoData();
});

// Watch for changes in searchQuery v-model with debounce
watch(searchQuery, (newValue) => {
  // Clear existing timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Set new timeout for debounced search
  searchTimeout = setTimeout(() => {
    // Simulate fetching suggestions based on search query
    suggestions.value = store.getCryptoSuggestions(newValue);
    // selectedCryptos.value.push(newValue);
  }, 800);
});

const onCryptoSelect = (e) => {
  const selected = e.value;
  const limitreached = selectedCryptos.value.length >= 4;

  // Avoid duplicate selections
  if (
    !selectedCryptos.value.find((c) => c.id === selected.id) &&
    !limitreached
  ) {
    selectedCryptos.value.push(selected);
  }

  // Clear the input after selecting
  searchQuery.value = "";
};

const clearSelectedCryptos = () => {
  selectedCryptos.value = [];
};
</script>

<template>
  <div class="pt-10 space-y-10">
    <div class="space-y-4 font-[Inter] text-center md:text-start">
      <h1 class="crypto-text-gradient text-4xl">Compare Cryptocurrencies</h1>
      <p class="text-subtext">
        Side-by-side comparison of cryptocurrency performance and metrics
      </p>
    </div>

    <!-- Search -->
    <div
      class="glass-effect p-6 rounded-lg items-center font-[Inter] space-y-4 w-full"
    >
      <div class="flex justify-between items-center flex-wrap">
        <p class="font-bold text-lg">Add Cryptocurrency</p>
        <p class="text-subtext text-sm">
          {{ selectedCryptoLength }}/4 selected
        </p>
      </div>
      <!-- Search Input -->
      <div
        class="flex items-center rounded-lg w-full"
        style="border: 1px solid rgba(255, 255, 255, 0.1)"
      >
        <i
          class="fa-solid fa-magnifying-glass text-subtext pl-4 !hidden md:!inline-block"
        ></i>
        <AutoComplete
          v-model="searchQuery"
          :suggestions="suggestions"
          optionLabel="name"
          class="w-full autocomplete-full-width p-2"
          inputClass="w-full p-2 !text-subtext"
          style="border-left: none"
          placeholder="Search to add cryptocurrencies..."
          @item-select="onCryptoSelect"
        />
      </div>
    </div>

    <!-- Chosen Data -->
    <div class="flex justify-between items-center">
      <p class="font-[Inter] text-4xl font-bold">Selected Cryptocurrencies</p>
      <p
        class="glass-effect rounded-lg p-4 hover:cursor-pointer"
        @click="clearSelectedCryptos"
      >
        Clear
      </p>
    </div>
    <div
      v-if="selectedCryptos.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div v-for="crypto in selectedCryptos" :key="crypto">
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
    <div v-if="!selectedCryptos.length">
      <div class="text-center text-subtext text-xl">
        <p>No cryptocurrencies selected for comparison.</p>
      </div>
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

<style scoped>
.autocomplete-full-width {
  width: 100% !important;
}

.autocomplete-full-width .p-autocomplete-input {
  width: 100% !important;
}

.autocomplete-full-width .p-inputtext {
  width: 100% !important;
  border: none !important;
}

::v-deep(.p-autocomplete) {
  position: relative;
}

::v-deep(.p-autocomplete-loader) {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

::v-deep(.p-inputtext:focus) {
  box-shadow: none !important;
  border-color: transparent !important;
  outline: none !important;
}

::v-deep(.p-autocomplete-input) {
  border: none !important;
}
</style>
