<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from '@/components/ui/breadcrumb'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { StatusDock } from '~/components/shared/CardReusable.vue'
import DonutChart from "~/components/shared/DonutChart.vue"
import BarChart from "~/components/shared/BarChart.vue"


const route = useRoute()
const router = useRouter()
const dockNo = decodeURIComponent(route.params.no as string)

const { data: drydocks } = await useFetch('/api/drydocks')

const rawDock = computed(() => {
    if (!drydocks.value) return null
    for (const category of drydocks.value) {
        const found = category.docks.find((d: any) => d.no === dockNo)
        if (found) {
            return { ...found, category: category.category }
        }
    }
    return null
})

const section1 = computed(() => [
    { label: 'Dry Dock No', value: rawDock.value?.title },
    { label: 'Description', value: rawDock.value?.description },
    { label: 'Company', value: rawDock.value?.company },
    { label: 'Account Code', value: rawDock.value?.account_code },
    { label: 'Responsible Rank', value: rawDock.value?.responsible_rank },
    { label: 'Budget', value: rawDock.value?.budget },
    { label: 'Currency', value: rawDock.value?.currency }
])

const section2 = computed(() => [
    { label: 'Planned Start Date', value: rawDock.value?.planned_start_date },
    { label: 'Planned End Date', value: rawDock.value?.planned_end_date },
    { label: 'Actual Start Date', value: rawDock.value?.actual_start_date },
    { label: 'Actual End Date', value: rawDock.value?.actual_end_date }
])

const statuses: StatusDock[] = ["Planning", "Execution", "Completed"]

const dockDetail = ref<any>(null)

watchEffect(() => {
    if (drydocks.value) {
        for (const category of drydocks.value) {
            const found = category.docks.find((d: any) => d.no === dockNo)
            if (found) {
                dockDetail.value = { ...found, category: category.category }
                break
            }
        }
    }
})

const updateStatus = (newStatus: StatusDock) => {
    if (!dockDetail.value) return
    dockDetail.value.status = newStatus
}

const chartData = [
    { value: 64, name: "Open", color: "#29A1FF" },
    { value: 50, name: "In Progress", color: "#4CAF50" },
    { value: 68, name: "On Hold", color: "#E91E63" },
    { value: 40, name: "Complete", color: "#03A9F4" },
    { value: 132, name: "Others", color: "#B07A2D" }
]

const yardStayData = [
    { value: 80806, name: "In Dock", color: "#29A1FF" },
    { value: 80808, name: "Repair", color: "#4CAF50" },
]

const categories = ["General", "Equipment for Crew", "Hull", "Machiney Main Components", "Ship Common Systems", "Fasting"]
const series = [
  { name: "Total Budget", data: [50, 40, 80, 20, 60, 0], color: "#29A1FF" },
  { name: "Total Estimates", data: [400, 250, 800, 300, 500, 0], color: "#4CAF50" },
  { name: "Total Costs", data: [300, 260, 600, 250, 450, 0], color: "#E91E63" }
]



definePageMeta({
    layout: 'default'
})
</script>

<template>
    <div class="space-y-6 border-b-2 pb-6 w-full max-w-full overflow-x-hidden">
        <div class="flex items-center p-4 gap-4">
            <button @click="router.back()" class="p-2 rounded-md hover:bg-gray-100 transition">
                <ChevronLeft class="w-5 h-5 text-gray-700 hover:cursor-pointer" />
            </button>
            <Breadcrumb>
                <BreadcrumbList class="flex flex-wrap items-center text-sm text-gray-600">
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    /
                    <BreadcrumbItem class="text-gray-500 font-bold">{{ dockNo }} </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div class="flex flex-wrap justify-end gap-2 px-4 sm:px-6">
            <Button variant="outline">General</Button>
            <Button variant="outline">Specifications</Button>
            <Button variant="outline">Tasks</Button>
            <Button variant="outline">Sourcing</Button>
            <Button variant="outline">Execution</Button>
            <Button variant="outline">Reporting</Button>
            <Button variant="outline">Costs</Button>
            <Button variant="outline">Purchase Orders</Button>
        </div>
        <div class="bg-[#29A1FF] p-4 flex flex-col sm:flex-row justify-between items-center w-full gap-4">
            <div class="flex flex-col sm:flex-row gap-4 items-center sm:pl-6 text-center sm:text-left">
                <img :src="rawDock?.image" class="w-24 h-24 rounded-lg object-cover" />
                <div class="text-white">
                    <p class="uppercase text-xs font-bold">{{ rawDock?.category }}</p>
                    <h1 class="text-2xl">{{ rawDock?.no }}</h1>
                    <p>{{ rawDock?.description }}</p>
                </div>
            </div>
            <Button variant="secondary" class="bg-white text-blue-500 hover:bg-gray-100 w-full sm:w-auto">
                Start Dry Dock
            </Button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm w-full px-4 md:px-10 my-10">
            <div v-for="(item, index) in section1" :key="index">
                <p class="text-gray-500">{{ item.label }}</p>
                <p :class="{ 'font-medium': item.label === 'Dry Dock No' }">
                    {{ item.value }}
                </p>
            </div>
        </div>
        <div class="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm w-full px-4 md:px-10">
            <div v-for="(item, index) in section2" :key="index">
                <p class="text-gray-500">{{ item.label }}</p>
                <p>{{ item.value }}</p>
            </div>
        </div>
    </div>

    <div class="px-4 md:px-10 mt-6">
        <Card>
            <CardHeader>
                <CardTitle class="text-xs">Shipyard</CardTitle>
            </CardHeader>
            <CardContent>
                <div class="flex flex-col md:flex-row md:items-start gap-4 w-full">
                    <div class="flex flex-col gap-4 w-full md:w-1/2">
                        <Select class="w-full">
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Select Shipyard" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="-">-</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button class="uppercase w-full md:w-1/3">
                            Select Shipyard
                        </Button>
                    </div>
                    <div class="text-sm font-medium bg-[#FCF7E8] w-full md:w-1/2 md:row-span- p-2 rounded">
                        <span class="text-[#EDBF6F]">No Shipyard Selected</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>

    <div class="px-4 md:px-10 mt-6">
        <Card>
            <CardContent>
                <div class="flex flex-col gap-6 md:flex-row md:gap-10 w-full">
                    <div class="flex flex-col gap-2 w-full md:w-1/2">
                        <h1 class="text-xs font-semibold">Priority</h1>
                        <Select class="w-full">
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Select Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="-">-</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="flex flex-col gap-2 w-full md:w-1/2">
                        <h1 class="text-xs font-semibold">Status</h1>
                        <div class="flex flex-wrap gap-2">
                            <Badge v-for="s in statuses" :key="s" variant="outline"
                                class="px-4 py-2 rounded-full cursor-pointer"
                                :class="dockDetail?.status === s ? 'border-primary text-primary' : ''"
                                @click="updateStatus(s)">
                                {{ s }}
                            </Badge>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    </div>

    <div class="px-4 md:px-10 mt-5">
        <h1 class="text-2xl font-semibold">Cost Summary</h1>
        <div class="grid grid-cols-4 my-3 gap-2">
            <div class="border rounded-xl px-8 py-3 bg-white/90 flex flex-col">
                <span class="font-base">Budget</span>
                <span class="font-semibold">200,000$</span>
            </div>
            <div class="border rounded-xl px-8 py-3 bg-white/90 flex flex-col">
                <span class="font-base">Yard Estimates</span>
                <span class="font-semibold">200,000$</span>
            </div>
            <div class="border rounded-xl px-8 py-3 bg-white/90 flex flex-col">
                <span class="font-base">Owner Estimates</span>
                <span class="font-semibold">200,000$</span>
            </div>
            <div class="border rounded-xl px-8 py-3 bg-white/90 flex flex-col">
                <span class="font-base">Total Estimates</span>
                <span class="font-semibold">200,000$</span>
            </div>
            <div class="border rounded-xl px-8 py-3 bg-white/90 flex flex-col">
                <span class="font-base">Actual Yard Costs</span>
                <span class="font-semibold">400$</span>
            </div>
            <div class="border rounded-xl px-8 py-3 bg-white/90 flex flex-col">
                <span class="font-base">Actual Owner Costs</span>
                <span class="font-semibold">400$</span>
            </div>
            <div class="border rounded-xl px-8 py-3 bg-white/90 flex flex-col">
                <span class="font-base">Total Costs</span>
                <span class="font-semibold">400$</span>
            </div>
            <div class="border rounded-xl px-8 py-3 bg-white/90 flex flex-col">
                <span class="font-base">Variance</span>
                <span class="font-semibold">400$</span>
            </div>
        </div>
    </div>

    <div class="px-4 md:px-10 mt-5">
        <div class="w-full mt-4 flex flex-col md:flex-row gap-4">
            <div class="flex-1">
                <DonutChart title="Status" :data="chartData" />
            </div>
            <div class="flex-1">
                <DonutChart title="Yard Stay" :data="yardStayData" />
            </div>
        </div>
    </div>

    <div class="px-4 md:px-10 mt-5">
        <BarChart title="Comparison" :categories="categories" :series="series" />
    </div>
    <div class="h-screen"></div>

</template>
