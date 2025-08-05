<script setup lang="ts">
import { Plus } from "lucide-vue-next"
import { vDraggable } from "vue-draggable-plus"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'vue-router'
import Textarea from "../ui/textarea/Textarea.vue"

defineOptions({
    directives: { draggable: vDraggable }
})

export type StatusDock = "Planning" | "Execution" | "Completed"

interface Dock {
    title: string
    description: string
    no: string
    account_code: string
    currency: string
    responsible_rank: string
    company: string
    budget: string
    planned_start_date: string
    planned_end_date: string
    actual_start_date: string
    actual_end_date: string
    image: string
    status: StatusDock
}

export interface Props {
    category: string
    docks: Dock[]
}

const items = ref<Props[]>([])

onMounted(async () => {
    items.value = await $fetch<Props[]>('/api/drydocks')
})
const router = useRouter()

function goToDetail(dockNo: string) {
    router.push(`/dock/${encodeURIComponent(dockNo)}`)
}

async function addEmptyDock(categoryIndex: number) {
    const res = await fetch('/api/drydocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryIndex })
    })
    const result = await res.json()
    if (result.success) {
        items.value[categoryIndex].docks.push(result.data)
    }
}

async function updateDock(categoryIndex: number, dockIndex: number, updates: Partial<Dock>) {
    const res = await fetch('/api/drydocks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryIndex, dockIndex, updates })
    })
    const result = await res.json()
    if (result.success) {
        Object.assign(items.value[categoryIndex].docks[dockIndex], updates)
    }
}
</script>


<template>
    <div class="flex gap-4 overflow-x-auto">
        <Card v-for="(category, i) in items" :key="category.category" class="w-64 flex-shrink-0">
            <CardHeader class="flex flex-row justify-between items-center">
                <CardTitle class="uppercase text-xs font-base">
                    {{ category.category }}
                </CardTitle>
                <Plus class="w-4 h-4 text-gray-500 cursor-pointer" @click="addEmptyDock(i)" />
            </CardHeader>

            <CardContent>
                <div v-draggable="[category.docks, { group: { name: 'drydock', pull: true, put: true }, animation: 150 }]"
                    class="space-y-2 min-h-[50px]">
                    <div v-for="(dock, j) in category.docks" :key="dock.no || `${i}-${j}`"
                        class="flex gap-3 p-2 border rounded-lg hover:bg-gray-50 cursor-move">
                        <template v-if="!dock.title && !dock.description">
                            <div class="flex flex-col gap-2">
                                <Input v-model="dock.title" type="text" placeholder="Title..."
                                    @keyup.enter="updateDock(i, j, { title: dock.title })" />
                                <Textarea placeholder="Description..." v-model="dock.description"
                                    @keyup.enter="updateDock(i, j, { description: dock.description })" />
                            </div>
                        </template>

                        <template v-else>
                            <img :src="dock.image" alt="dock image"
                                class="w-10 h-10 rounded-md object-cover hover:cursor-pointer"
                                @click="goToDetail(dock.no)" />
                            <div>
                                <p class="text-sm font-semibold">{{ dock.title }}</p>
                                <p class="text-xs text-gray-500">{{ dock.no }}</p>
                            </div>
                        </template>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
