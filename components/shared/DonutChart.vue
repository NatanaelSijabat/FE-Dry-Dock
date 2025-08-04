<script setup lang="ts">
import { ref, watch } from "vue"
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { PieChart } from "echarts/charts"
import { TooltipComponent, TitleComponent } from "echarts/components"
import VChart from "vue-echarts"

use([CanvasRenderer, PieChart, TooltipComponent, TitleComponent])

interface ChartItem {
  value: number
  name: string
  color: string
}

const props = defineProps<{
  title: string
  data: ChartItem[]
}>()

const chartOption = ref({})

watch(
  () => props.data,
  (newData) => {
    chartOption.value = {
      title: {
        text: props.title,
        left: "left",
        top: 10,
        textStyle: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#000"
        }
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)"
      },
      series: [
        {
          name: props.title,
          type: "pie",
          radius: ["50%", "75%"],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          data: newData.map(d => ({
            value: d.value,
            name: d.name,
            itemStyle: { color: d.color }
          }))
        }
      ]
    }
  },
  { immediate: true }
)
</script>

<template>
  <client-only>
    <div class="w-full bg-white rounded-lg shadow p-4">
      <div class="w-full aspect-[4/3]">
        <VChart :option="chartOption" autoresize />
      </div>

      <div class="flex flex-wrap justify-center gap-4 mt-4">
        <div v-for="item in props.data" :key="item.name" class="flex items-center gap-2 text-xs">
          <span class="w-3 h-3 rounded-xs" :style="{ backgroundColor: item.color }"></span>
          <span class="text-gray-600">{{ item.name }} {{ item.value }}</span>
        </div>
      </div>
    </div>
  </client-only>
</template>
