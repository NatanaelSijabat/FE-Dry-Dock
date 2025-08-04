<script setup lang="ts">
import { useSidebar } from "@/components/ui/sidebar"
import CardReusable, { type Props } from '@/components/shared/CardReusable.vue'
import DonutChart from "~/components/shared/DonutChart.vue"
import BarChart from "~/components/shared/BarChart.vue"
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

const chartData = [
  { value: 3004, name: "Open", color: "#29A1FF" },
  { value: 3002, name: "In Progress", color: "#4CAF50" },
  { value: 3003, name: "On Hold", color: "#E91E63" },
  { value: 2004, name: "Complete", color: "#03A9F4" },
  { value: 789, name: "Others", color: "#B07A2D" }
]

const categories = ["SDSD24", "SDSD10", "SDSD20"]
const series = [
  { name: "Total Budget", data: [50, 40, 80], color: "#29A1FF" },
  { name: "Total Estimates", data: [400, 250, 800], color: "#4CAF50" },
  { name: "Total Costs", data: [300, 260, 600], color: "#E91E63" }
]

</script>

<template>
  <header class="fixed top-0 left-0 right-0 h-16 bg-[#29A1FF] flex items-center px-4 md:px-8 shadow-md z-50"
    :class="state === 'collapsed' ? 'md:pl-28' : 'md:ml-64'">
    <h1 class="text-lg md:text-2xl font-bold text-white">Dashboard</h1>
  </header>

  <div class="pt-16">
    <main class="transition-all duration-300 px-4 md:px-8 mt-4" :class="state === 'collapsed' ? 'md:ml-8' : 'md:ml-0'">

      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <h2 class="text-lg md:text-xl font-medium">Quotes Pending Approval</h2>

        <div class="relative w-full md:w-auto max-w-full md:max-w-sm">
          <Input id="search" type="text" placeholder="Search" class="pl-10 bg-[#EAEAEA] w-full md:w-64"
            v-model="searchQuery" autocomplete="off" />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-5 md:size-6 text-muted-foreground" />
          </span>
        </div>
      </div>

      <div class="grid gap-4 grid-cols-1">
        <CardReusable :items="filteredDrydocks || []" />
      </div>

      <div class="w-full md:w-1/2 mt-4">
         <DonutChart title="Active Dry Docks" :data="chartData" />
      </div>

      <div class="w-full mt-4">
         <BarChart title="Costs" :categories="categories" :series="series" />
      </div>

      <div class="h-screen"></div>
    </main>
  </div>
</template>
