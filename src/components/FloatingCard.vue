<script setup>
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  percentage: {
    type: String,
    default: 0,
  },
});
</script>

<template>
  <div
    class="border border-white rounded-lg glass-effect hover:border hover:border-gray-700 transition-all duration-300 p-6 space-y-4 floating-card"
  >
    <div class="flex justify-between items-center">
      <i :class="icon" class="text-2xl text-green-500"></i>
      <p class="text-white font-bold mt-2">{{ percentage }}</p>
    </div>
    <div class="text-start">
      <p class="font-[Inter] font-bold text-2xl">{{ value }}</p>
      <p class="text-subtext text-sm font-[Inter]">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.floating-card {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
