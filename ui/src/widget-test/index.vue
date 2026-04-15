<template>
  <main class="widget-test">
    <h1>Widget Integration Test Bed</h1>
    <p>Sandbox for evaluating external widget integration patterns in A1.</p>
    <EditTFWidget />
    <NextChatWidget />
  </main>
</template>

<script setup lang="ts">
import EditTFWidget from "./EditTFWidget.vue";
import NextChatWidget from "./NextChatWidget.vue";
</script>

<style scoped>
.widget-test {
  display: grid;
  gap: 16px;
  padding: 16px;
}
</style>
