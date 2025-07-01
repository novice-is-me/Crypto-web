<script setup>
import CryptoCard from "@/components/CryptoCard.vue";
import { useCryptoStore } from "@/stores/useCryptoStore";
import { AutoComplete } from "primevue";
import { computed, onMounted, ref, watch } from "vue";

const store = useCryptoStore();

const isAddModalOpen = ref(false);
const selectedCrypto = ref([]);
const searchQuery = ref("");
const suggestions = computed(() => store.suggestionMarketData);
let searchTimeout = null;
// Load from the localstorage
const storedCryptos = localStorage.getItem("mainSelectedCrypto");
const mainSelectedCrypto = ref(storedCryptos ? JSON.parse(storedCryptos) : []);

// onMounted(async () => {
//   await store.fetchCryptoData();
// });

const toggleAddModal = () => {
  isAddModalOpen.value = !isAddModalOpen.value;
};

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
  const limitreached = selectedCrypto.value.length >= 4;

  // Avoid duplicate selections
  if (
    !selectedCrypto.value.find((c) => c.id === selected.id) &&
    !limitreached
  ) {
    selectedCrypto.value.push(selected);
  }

  // Clear the input after selecting
  searchQuery.value = "";
};

const addToWatchlist = (crypto) => {
  if (!mainSelectedCrypto.value.find((c) => c.id === crypto.id)) {
    const updated = [...mainSelectedCrypto.value, crypto];
    localStorage.setItem("mainSelectedCrypto", JSON.stringify(updated));
    mainSelectedCrypto.value = updated;
  }

  selectedCrypto.value = selectedCrypto.value.filter((c) => c.id !== crypto.id);
  isAddModalOpen.value = false;
};

const clearWatchlist = () => {
  if (confirm("Are you sure you want to clear your watchlist?")) {
    mainSelectedCrypto.value = [];
    localStorage.removeItem("mainSelectedCrypto");
  }
};

// We will watch the mainSelectedCrypto, get their ids, and then used it to identify the count of loss and gain
const gainCount = computed(() => {
  return mainSelectedCrypto.value.filter(
    (crypto) => crypto.market_cap_change_percentage_24h > 0
  ).length;
});

const lossCount = computed(() => {
  return mainSelectedCrypto.value.filter(
    (crypto) => crypto.market_cap_change_percentage_24h < 0
  ).length;
});
</script>

<template>
  <!-- Main Content -->
  <div class="pt-10 space-y-10" :class="{ 'blur-sm': isAddModalOpen }">
    <div
      class="space-y-4 font-[Inter] text-center md:text-start flex justify-center flex-wrap items-center md:justify-between"
    >
      <div>
        <h1 class="crypto-text-gradient text-4xl">Your Watchlist</h1>
        <p class="text-subtext">Keep track of your favorite cryptocurrencies</p>
      </div>
      <div class="flex items-center gap-x-4">
        <div class="flex items-center gap-x-2 logo hover:cursor-pointer">
          <i class="fa-solid fa-plus"></i>
          <p @click="toggleAddModal">Add to Watchlist</p>
        </div>

        <div v-if="mainSelectedCrypto.length > 0" class="text-center">
          <p
            class="text-subtext glass-effect p-2 rounded-lg hover:cursor-pointer"
            @click="clearWatchlist"
          >
            Clear Watchlist
          </p>
        </div>
      </div>
    </div>

    <!-- Tracker Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        class="glass-effect p-6 rounded-lg items-center font-[Inter] flex gap-x-4"
      >
        <i class="fa-solid fa-eye text-green-500 text-2xl"></i>
        <div>
          <p>{{ mainSelectedCrypto.length ?? 0 }}</p>
          <p>Cryptocurrencies</p>
        </div>
      </div>
      <div
        class="glass-effect p-6 rounded-lg items-center font-[Inter] flex gap-x-4"
      >
        <i class="fa-solid fa-arrow-up"></i>
        <div>
          <p>{{ gainCount }}</p>
          <p>Gaining</p>
        </div>
      </div>
      <div
        class="glass-effect p-6 rounded-lg items-center font-[Inter] flex gap-x-4"
      >
        <i class="fa-solid fa-arrow-down"></i>
        <div>
          <p>{{ lossCount }}</p>
          <p>Losing</p>
        </div>
      </div>
    </div>

    <!-- Coin Section -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div v-for="crypto in mainSelectedCrypto" :key="crypto.id">
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

  <!-- Modal for adding watchlist -->
  <div class="relative" v-if="isAddModalOpen">
    <div
      class="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
    >
      <div
        class="bg-black p-6 rounded-lg shadow-lg w-full max-w-[70%] border border-white/10 max-h-[70vh] md:max-h-full flex flex-col md:overflow-x-hidden"
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

        <!-- Result / Data -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pt-4">
          <div v-for="crypto in selectedCrypto" :key="crypto.id">
            <CryptoCard
              :crypto="crypto.name"
              :symbol="crypto.symbol"
              :price="crypto.current_price"
              :change="crypto.market_cap_change_percentage_24h"
              :marketCap="crypto.market_cap"
              :volume="crypto.total_volume"
              :image="crypto.image"
              @click="addToWatchlist(crypto)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
