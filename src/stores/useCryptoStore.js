import { defineStore } from "pinia";
import axios from "axios";

export const useCryptoStore = defineStore("crypto", {
  // state data of the store
  state: () => ({
    allCryptoData: [],
    highestCryptoData: [],
    lowestCryptoData: [],
    seeMoreCryptoData: [],
    marketCryptoData: [],
    currentPage: 1,
    isLoadingMore: false,
    isLoadingInitial: false, // Loading state for initial data fetch
    reachLimit: false, // Flag to indicate if the limit has been reached
  }),
  // getters are the computed properties of the store
  getters: {
    baseUrl: () => import.meta.env.VITE_CRYPTO_BASE_URL,
    apiKey: () => import.meta.env.VITE_CRYPTO_KEY,
  }, // actions are methods that can be called to modify the state
  actions: {
    async fetchCryptoData() {
      this.isLoadingInitial = true;
      try {
        const res = await axios.get(
          `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1`
        );

        console.log("Response from API:", res);
        this.allCryptoData = res.data;
        console.log("All Crypto Data:", this.allCryptoData);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      } finally {
        this.isLoadingInitial = false;
      }
    },
    async loadMoreCrypto() {
      this.isLoadingMore = true;
      try {
        // Calculate the correct starting point
        // We already have 12 items, so we need to start from item 13
        const startingItem = 12 + this.seeMoreCryptoData.length;
        const pageForMoreData = Math.floor(startingItem / 4) + 1;
        const res = await axios.get(
          `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=${pageForMoreData}`
        );

        console.log("More crypto data:", res.data);
        console.log(
          `Loading page ${pageForMoreData} for items starting from ${startingItem}`
        );

        // Add new data to existing seeMoreCryptoData array
        this.seeMoreCryptoData = [...this.seeMoreCryptoData, ...res.data];

        console.log("See More Crypto Data:", this.seeMoreCryptoData);
      } catch (error) {
        console.error("Error loading more crypto data:", error);
        this.reachLimit = true; // Ensure loading state is reset on error
      } finally {
        this.isLoadingMore = false;
      }
    },

    async fetchMarketCrypto() {
      this.isLoadingInitial = true;
      try {
        const res = await axios.get(
          `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=24&page=1`
        );

        console.log("Response from API:", res);
        this.marketCryptoData = res.data;
        console.log("All Crypto Data:", this.marketCryptoData);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      } finally {
        this.isLoadingInitial = false;
      }
    },

    resetPagination() {
      this.seeMoreCryptoData = [];
    },
  },
});
