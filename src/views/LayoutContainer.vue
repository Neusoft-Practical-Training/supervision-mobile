<script setup lang="ts">
import { useBarStore } from '@/stores'
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useRoute } from 'vue-router'
import TabbarComponent from "@/components/tabbar/TabbarComponent.vue"
import type { ConfigProviderTheme } from "vant";

const theme = ref<ConfigProviderTheme>('light')
const route = useRoute()
const barStore = useBarStore()
const onClickLeft = () => history.back()

// 定义一个函数来更新主题
const updateTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  theme.value = prefersDark ? 'dark' : 'light';
};

// 在组件挂载时调用 updateTheme 并监听媒体查询的变化
onMounted(() => {
  updateTheme();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
});

// 在组件卸载前移除监听器
onBeforeUnmount(() => {
  window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateTheme);
});

const mainStyle = computed(() => {
  const s: string[] = []
  if (route.meta.showTopBar) {
    s.push('margin-top: 46px')
  }
  if (route.meta.showTabBar) {
    s.push('margin-bottom: 50px')
  }
  return s
})

const showTabBar = computed(() => {
  if (barStore.isShowTabBar !== undefined) {
    return barStore.isShowTabBar
  }
  return route.meta.showTabBar
})

const showTopBar = computed(() => {
  if (barStore.isShowTopBar !== undefined) {
    return barStore.isShowTopBar
  }
  return route.meta.showTopBar
})
</script>

<template>
  <van-config-provider :theme='theme'/>
  <div class="container-layout">
    <van-nav-bar
      v-if="showTopBar"
      :title="route.meta.title"
      left-text="返回"
      @click-left="onClickLeft"
      left-arrow
      fixed
    >
    </van-nav-bar>

    <main :style="mainStyle">
      <router-view></router-view>
    </main>

    <TabbarComponent v-if="showTabBar"></TabbarComponent>
  </div>
</template>

<style scoped></style>
