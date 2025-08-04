<script setup lang="ts">
import { Plus } from "lucide-vue-next"
import { vDraggable } from "vue-draggable-plus"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'vue-router'
import Textarea from "../ui/textarea/Textarea.vue"

defineOptions({
    directives: { draggable: vDraggable }
})

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
}

export interface Props {
    category: string
    docks: Dock[]
}

const props = defineProps<{ items: Props[] }>()
const router = useRouter()

function goToDetail(dockNo: string) {
    router.push(`/dock/${encodeURIComponent(dockNo)}`)
}

function isDockEmpty(dock: Dock) {
    return Object.values(dock).every(v => v === "" || v === null || v === undefined)
}

function addEmptyDock(categoryIndex: number) {
    props.items[categoryIndex].docks.push({
        title: "",
        description: "",
        no: "",
        account_code: "",
        currency: "",
        responsible_rank: "",
        company: "",
        budget: "",
        planned_start_date: "",
        planned_end_date: "",
        actual_start_date: "",
        actual_end_date: "",
        image: ""
    })
}

</script>

<template>
    <div class="flex gap-4 overflow-x-auto p-4">
        <Card v-for="(category, i) in items" :key="category.category" class="w-64 flex-shrink-0">
            <CardHeader class="flex flex-row justify-between items-center pb-2">
                <CardTitle class="uppercase text-sm font-bold">
                    {{ category.category }}
                </CardTitle>
                <Plus class="w-4 h-4 text-gray-500 cursor-pointer" @click="addEmptyDock(i)" />
            </CardHeader>

            <CardContent>
                <div v-draggable="[
                    category.docks,
                    { group: { name: 'drydock', pull: true, put: true }, animation: 150 }
                ]" class="space-y-2 min-h-[50px]">
                    <div v-for="dock in category.docks" :key="dock.no || Math.random()"
                        class="flex gap-3 p-2 border rounded-lg hover:bg-gray-50 cursor-move">
                        <template v-if="isDockEmpty(dock)">
                            <div class="flex flex-col gap-2">
                                <Input type="text" placeholder="Title..." v-model="dock.title" />
                                <Textarea type="text" placeholder="Description..." v-model="dock.description" />
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
