<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "button",
  },
  value: {
    type: String,
    default: "active",
  },
  status: {
    type: String,
    default: "increase",
  },
});
</script>

<template>
  <div>
    <button
      :type="type"
      :class="[
        `${
          value === 'active'
            ? 'bg-green-500 text-white'
            : 'bg-transparent border border-gray-800 '
        } px-4 py-2 rounded-lg transition duration-300 ease-in-out`,
      ]"
    >
      {{ label }}
    </button>
  </div>
</template>
