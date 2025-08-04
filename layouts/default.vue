<script setup lang="ts">
import AppSidebar from "~/components/layout/AppSidebar.vue"
</script>

<template>
  <div class="flex min-h-screen w-screen overflow-x-hidden">
    <div class="hidden md:block">
      <AppSidebar />
    </div>

    <main class="flex-1 w-full">
      <slot />
    </main>
  </div>
</template>

<style scoped>
:deep(main) {
  width: 100%;
  max-width: 100%;
}
</style>
