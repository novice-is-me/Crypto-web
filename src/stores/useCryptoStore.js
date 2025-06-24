import { defineStore } from "pinia";
import axios from "axios";

export const useCryptoStore = defineStore("crypto", {
  // state data of the store
  state: () => ({
    allCryptoData: [],
    fullData: [],
    highestCryptoData: [],
    lowestCryptoData: [],
    seeMoreCryptoData: [],
    marketCryptoData: [],
    marketSearchData: null, // null when no search, array when search is active
    currentPage: 1,
    isLoadingMore: false,
    isLoadingInitial: false, // Loading state for initial data fetch
    isSearching: false, // Loading state for search
    reachLimit: false, // Flag to indicate if the limit has been reached
  }),
  // getters are the computed properties of the store
  getters: {
    baseUrl: () => import.meta.env.VITE_CRYPTO_BASE_URL,
    apiKey: () => import.meta.env.VITE_CRYPTO_KEY,
  },
  // actions are methods that can be called to modify the state
  actions: {
    // async fetchAllData() {
    //   this.isLoadingInitial = true;
    //   try {
    //     const perPage = 250;
    //     let page = 1;
    //     let allData = [];

    //     console.log("Starting to fetch all crypto data...");

    //     while (true) {
    //       const res = await axios.get(
    //         `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}`
    //       );

    //       console.log(`Fetched page ${page}`, res.data);

    //       if (res.data.length === 0) break;

    //       allData = [...allData, ...res.data];
    //       page++;
    //     }

    //     this.fullData = allData;
    //     console.log("All fetched crypto data:", this.fullData);
    //   } catch (error) {
    //     console.error("Error fetching all crypto data:", error);
    //   } finally {
    //     this.isLoadingInitial = false;
    //   }
    // },
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
    async searchMarket(term) {
      this.isSearching = true;
      try {
        // First, search for crypto IDs
        const searchRes = await axios.get(
          `${this.baseUrl}/search?query=${term}`
        );

        if (!searchRes.data.coins || searchRes.data.coins.length === 0) {
          this.marketSearchData = [];
          return;
        }

        // Get the top 20 search results
        const searchResultIds = searchRes.data.coins
          .slice(0, 20)
          .map((coin) => coin.id);

        // Fetch full market data for these coins
        const idsString = searchResultIds.join(",");
        const marketRes = await axios.get(
          `${this.baseUrl}/coins/markets?vs_currency=usd&ids=${idsString}&order=market_cap_desc&per_page=20&page=1`
        );

        this.marketSearchData = marketRes.data;
        console.log("Search results with full data:", this.marketSearchData);
      } catch (error) {
        console.error("Error searching crypto data:", error);
        this.marketSearchData = [];
      } finally {
        this.isSearching = false;
      }
    },

    clearSearchResults() {
      this.marketSearchData = null;
    },

    resetPagination() {
      this.seeMoreCryptoData = [];
    },
  },
});
