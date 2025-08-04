<script setup lang="ts">
import { useSidebar } from "@/components/ui/sidebar"
import CardReusable, { type Props } from '@/components/shared/CardReusable.vue'

const { state } = useSidebar()
const { data: drydocks } = await useFetch<Props[]>('/api/drydocks')
</script>

<template>
  <header class="fixed top-0 left-0 right-0 h-16 bg-[#29A1FF] flex items-center px-8 shadow-md"
    :class="state === 'collapsed' ? 'pl-28' : 'ml-64'">
    <h1 class="text-2xl font-bold text-white">Dashboard</h1>
  </header>

  <div class="pt-16">
    <main class="transition-all duration-300 px-8 mt-4" :class="state === 'collapsed' ? 'ml-8' : 'ml-0'">
      <h2 class="text-xl font-medium mb-4">Quotes Pending Approval</h2>
      <div>
        <CardReusable :items="drydocks || []" />
      </div>
    </main>
  </div>
</template>
