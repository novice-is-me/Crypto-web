import { defineStore } from "pinia";
import axios from "axios";

export const useCryptoStore = defineStore("crypto", {
  // state data of the store
  state: () => ({
    allCryptoData: [],
    highestCryptoData: [],
    lowestCryptoData: [],
  }),
  // getters are the computed properties of the store
  getters: {
    // If from env we have to import here
    baseUrl: () => import.meta.env.VITE_CRYPTO_BASE_URL,
    apiKey: () => import.meta.env.VITE_CRYPTO_KEY,
  }, // actions are methods that can be called to modify the state
  actions: {
    async fetchCryptoData() {
      try {
        const res = await axios.get(
          `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`
        );

        console.log("Response from API:", res);
        this.allCryptoData = res.data; // Not .data.data
        console.log("All Crypto Data:", this.allCryptoData);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    },
  },
});
