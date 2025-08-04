<script setup lang="ts">
import { ref, watchEffect } from "vue"
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { BarChart } from "echarts/charts"
import { TooltipComponent, LegendComponent, GridComponent, TitleComponent } from "echarts/components"
import VChart from "vue-echarts"

use([CanvasRenderer, BarChart, TooltipComponent, LegendComponent, GridComponent, TitleComponent])

interface SeriesItem {
  name: string
  data: number[]
  color: string
}

const props = defineProps<{
  title: string
  categories: string[]
  series: SeriesItem[]
}>()

const chartOption = ref({})

watchEffect(() => {
  chartOption.value = {
    title: {
      text: props.title,
      left: "left",
      top: 10,
      textStyle: {
        fontSize: 18,
        fontWeight: "bold"
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" }
    },
    legend: {
      top: 0,
      right: 20,
      itemWidth: 12,
      itemHeight: 12
    },
    grid: {
      top: 60,
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: props.categories
    },
    yAxis: {
      type: "value"
    },
    series: props.series.map(s => ({
      name: s.name,
      type: "bar",
      data: s.data,
      itemStyle: { color: s.color },
      barWidth: 20
    }))
  }
})
</script>

<template>
  <client-only>
    <div class="w-full max-w-full bg-white rounded-lg shadow p-4">
      <div class="w-full h-[300px] sm:h-[400px]">
        <VChart :option="chartOption" autoresize />
      </div>
    </div>
  </client-only>
</template>
