<script setup>
import {
  formatPrice,
  formatMarketCapChange24hr,
  formatMarketCap,
  format24hVolume,
} from "@/utils/formatter";

const props = defineProps({
  crypto: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  change: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isHovered: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div
    :class="[
      'border border-white rounded-lg glass-effect hover:border hover:border-gray-700 transition-all duration-300 p-6 space-y-4  flex flex-col justify-between',
      isHovered ? 'hover:scale-105 h-[250px]' : '',
    ]"
  >
    <div class="flex justify-between">
      <div class="flex items-center gap-x-4">
        <div
          class="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-crypto-blue/20 flex items-center justify-center text-xl font-bold"
        >
          <img :src="image" alt="" />
        </div>
        <div>
          <p class="font-[Inter] text-xl font-semibold">{{ crypto }}</p>
          <p class="text-subtext text-sm">{{ symbol }}</p>
        </div>
      </div>
      <div>
        <p v-html="formatMarketCapChange24hr(change)"></p>
      </div>
    </div>
    <p class="font-[Inter] font-bold text-xl">{{ formatPrice(price) }}</p>
    <div class="flex justify-between gap-x-2">
      <div class="flex-1 min-w-0">
        <p class="text-subtext text-sm">Market Cap</p>
        <p class="text-sm font-medium break-words">
          {{ formatMarketCap(marketCap) }}
        </p>
      </div>
      <div class="flex-1 min-w-0 text-right">
        <p class="text-subtext text-sm">Volume 24h</p>
        <p class="text-sm font-medium break-words">
          {{ format24hVolume(volume) }}
        </p>
      </div>
    </div>
  </div>
</template>
