<script setup lang="ts">
import { Role } from '@/common/enums'
import { useUserStore } from "@/stores";
import { computed } from 'vue'

interface TabbarItem {
  to: string
  icon: string
  name: string
}

const userStore = useUserStore()
const user = userStore.user

const items = {
  feedback: {
    name: '反馈',
    icon: 'newspaper',
    to: '/feedback'
  },
  task: {
    name: '任务',
    icon: 'column',
    to: '/task'
  },
  my: {
    name: '我的',
    icon: 'home-o',
    to: '/my'
  }
}

const tabbarItems = computed<TabbarItem[]>(() => {
  switch (user?.role) {
    case Role.GridMember:
      // 网格员
      return [items.task, items.my]
    default:
      // 公众监督员
      return [items.feedback, items.my]
  }
})
</script>

<template>
  <van-tabbar route>
    <van-tabbar-item
      v-for="(item, index) in tabbarItems"
      :key="index"
      :to="item.to"
      :icon="item.icon"
    >{{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
