<script setup lang="ts">
const surfaceName = "${surface}".replace('Surface', '');
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-cyan-400">🚧 {{ surfaceName }} Surface</h2>
    <div class="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
      <p class="text-gray-400">This surface is under construction</p>
      <p class="text-sm text-gray-500 mt-2">Coming soon in the next update!</p>
    </div>
  </div>
</template>
