<script setup lang="ts">
import { useSidebar } from "@/components/ui/sidebar"
import CardReusable, { type Props } from '@/components/shared/CardReusable.vue'
import { Search } from "lucide-vue-next"
import { ref, computed } from "vue"

const { state } = useSidebar()
const { data: drydocks } = await useFetch<Props[]>('/api/drydocks')


const searchQuery = ref("")

const filteredDrydocks = computed(() => {
  if (!drydocks.value) return []

  return drydocks.value
    .map(categoryItem => ({
      ...categoryItem,
      docks: categoryItem.docks.filter(dock => {
        const query = searchQuery.value.toLowerCase()
        return (
          dock.title?.toLowerCase().includes(query) ||
          dock.description?.toLowerCase().includes(query) ||
          dock.company?.toLowerCase().includes(query) ||
          dock.account_code?.toLowerCase().includes(query) ||
          dock.no?.toLowerCase().includes(query) ||
          categoryItem.category?.toLowerCase().includes(query)
        )
      })
    }))
})

</script>

<template>
  <header class="fixed top-0 left-0 right-0 h-16 bg-[#29A1FF] flex items-center px-8 shadow-md"
    :class="state === 'collapsed' ? 'pl-28' : 'ml-64'">
    <h1 class="text-2xl font-bold text-white">Dashboard</h1>
  </header>

  <div class="pt-16">
    <main class="transition-all duration-300 px-8 mt-4" :class="state === 'collapsed' ? 'ml-8' : 'ml-0'">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-xl font-medium mb-4">Quotes Pending Approval</h2>
        <div class="relative w-full max-w-sm items-center">
          <Input id="search" type="text" placeholder="Search" class="pl-10 bg-[#EAEAEA] w-64" v-model="searchQuery" autocomplete="off" />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
      </div>
      <div>
        <CardReusable :items="filteredDrydocks || []" />
      </div>
    </main>
  </div>
</template>
