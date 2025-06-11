<script setup>
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
    type: String,
    required: true,
  },
  change: {
    type: String,
    required: true,
  },
  marketCap: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="border border-white rounded-lg glass-effect hover:border hover:border-gray-700 transition-all duration-300 p-6 space-y-4 hover:scale-105"
  >
    <div class="flex justify-between">
      <div class="flex items-center gap-x-4">
        <div
          class="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-crypto-blue/20 flex items-center justify-center text-xl font-bold"
        >
          <i :class="icon" />
        </div>
        <div>
          <p class="font-[Inter] text-xl font-semibold">{{ crypto }}</p>
          <p class="text-subtext text-sm">{{ symbol }}</p>
        </div>
      </div>
      <div>
        <p>{{ change }}</p>
      </div>
    </div>
    <p class="font-[Inter] font-bold text-xl">{{ price }}</p>
    <div class="flex justify-between">
      <div>
        <p class="text-subtext text-sm">Market Cap</p>
        <p>{{ marketCap }}</p>
      </div>
      <div>
        <p class="text-subtext text-sm">Volume 24h</p>
        <p>{{ volume }}</p>
      </div>
    </div>
  </div>
</template>
