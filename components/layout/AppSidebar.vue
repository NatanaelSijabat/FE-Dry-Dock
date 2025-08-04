<script setup lang="ts">
import { Calendar, CircleGauge, Inbox, Search, Settings } from "lucide-vue-next"
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"


const items = [
    { title: "Dashboard", url: "/", icon: CircleGauge },
    { title: "Specification Groups", url: "/specification-groups", icon: Inbox },
    { title: "Work Order Master", url: "#", icon: Calendar },
    { title: "Checklists", url: "#", icon: Search },
    { title: "Dry Docks", url: "#", icon: Settings },
]

const { state } = useSidebar()
</script>

<template>
    <Sidebar collapsible="icon" class="bg-[#29A1FF] z-100 border-[#29A1FF]">
        <SidebarHeader class="bg-[#29A1FF] text-white">
            <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-2 overflow-hidden">
                    <img src="/assets/images/logo.webp" alt="Logo" width="30" height="40" class="rounded-lg shrink-0" />
                    <span v-if="state === 'expanded'" class="text-lg font-semibold ">
                        Dry Dock
                    </span>
                </div>
                <SidebarTrigger />
            </div>
        </SidebarHeader>

        <SidebarContent class="bg-[#29A1FF] text-white">
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem v-for="item in items" :key="item.title">
                        <SidebarMenuButton asChild>
                            <a :href="item.url" class="flex items-center gap-3">
                                <component :is="item.icon" class="w-5 h-5 shrink-0" />
                                <span>{{ item.title }}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarContent>

    </Sidebar>

</template>
