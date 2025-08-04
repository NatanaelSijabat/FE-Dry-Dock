<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const route = useRoute()
const router = useRouter()
const dockNo = decodeURIComponent(route.params.no as string)

const { data: drydocks } = await useFetch('/api/drydocks')

const dockDetail = computed(() => {
    if (!drydocks.value) return null
    for (const category of drydocks.value) {
        const found = category.docks.find((d: any) => d.no === dockNo)
        if (found) {
            return { ...found, category: category.category }
        }
    }
    return null
})

</script>

<template>
    <div class="p-8 space-y-6 w-full">
        <div class="flex items-center gap-4 mb-6">
            <button @click="router.back()" class="p-2 rounded-md hover:bg-gray-100 transition">
                <ChevronLeft class="w-5 h-5 text-gray-700 hover:cursor-pointer" />
            </button>
            <Breadcrumb>
                <BreadcrumbList class="flex items-center gap-1 text-sm text-gray-600">
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">
                            Dashboard
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    /
                    <BreadcrumbItem class="text-gray-500 font-bold">{{ dockNo }} </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <Tabs default-value="general" class="w-full">
            <TabsList class="flex flex-wrap gap-2">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="sourcing">Sourcing</TabsTrigger>
                <TabsTrigger value="execution">Execution</TabsTrigger>
                <TabsTrigger value="reporting">Reporting</TabsTrigger>
                <TabsTrigger value="costs">Costs</TabsTrigger>
                <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
            </TabsList>
        </Tabs>

        <div class="bg-blue-500 p-4 rounded-lg flex justify-between items-center">
            <div class="flex gap-4 items-center">
                <img :src="dockDetail?.image" class="w-20 h-20 rounded-lg object-cover" />
                <div class="text-white">
                    <p class="uppercase text-xs">{{ dockDetail?.category }}</p>
                    <h1 class="text-2xl font-bold">{{ dockDetail?.title }}</h1>
                    <p class="text-sm">{{ dockDetail?.description }}</p>
                </div>
            </div>
            <Button variant="secondary" class="bg-white text-blue-500 hover:bg-gray-100">
                Start Dry Dock
            </Button>
        </div>

        <div class="grid grid-cols-3 gap-4 text-sm">
            <div>
                <p class="text-gray-500">Dry Dock No</p>
                <p>{{ dockDetail?.title }}</p>
            </div>
            <div>
                <p class="text-gray-500">Description</p>
                <p>{{ dockDetail?.description }}</p>
            </div>
            <div>
                <p class="text-gray-500">Company</p>
                <p>{{ dockDetail?.company }}</p>
            </div>
            <div>
                <p class="text-gray-500">Account Code</p>
                <p>{{ dockDetail?.account_code }}</p>
            </div>
            <div>
                <p class="text-gray-500">Responsible Rank</p>
                <p>Roshan Ahluwalia / CE</p>
            </div>
            <div>
                <p class="text-gray-500">Budget</p>
                <p>{{ dockDetail?.budget }}</p>
            </div>
            <div>
                <p class="text-gray-500">Planned Start Date</p>
                <p>{{ dockDetail?.planned_start_date }}</p>
            </div>
            <div>
                <p class="text-gray-500">Planned End Date</p>
                <p>{{ dockDetail?.planned_end_date }}</p>
            </div>
            <div>
                <p class="text-gray-500">Actual Start Date</p>
                <p>{{ dockDetail?.actual_start_date }}</p>
            </div>
            <div>
                <p class="text-gray-500">Actual End Date</p>
                <p>{{ dockDetail?.actual_end_date }}</p>
            </div>
        </div>
    </div>
</template>
