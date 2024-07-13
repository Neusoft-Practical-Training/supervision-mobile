<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useRoute } from 'vue-router'
import TabbarComponent from "@/components/tabbar/TabbarComponent.vue"
import type { ConfigProviderTheme } from "vant";

const route = useRoute()
const theme = ref<ConfigProviderTheme>('light')
// 这里history.go(-2)使用-2是因为如果使用history.go(-1)需要点按两次返回才能返回上一页，感觉是route的bug
const onClickLeft = () => route.meta.showLeftArrow ? history.go(-1) : undefined

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

const leftText = computed(() => route.meta.showLeftArrow ? '返回' : '')
</script>

<template>
  <van-config-provider :theme='theme'/>
  <div class="container-layout">
    <van-nav-bar
      v-if="route.meta.showTopBar"
      :title="route.meta.title"
      :left-text="leftText"
      @click-left="onClickLeft"
      :left-arrow="route.meta.showLeftArrow"
      fixed
    />

    <main :style="mainStyle">
      <router-view></router-view>
    </main>

    <TabbarComponent v-if="route.meta.showTabBar"></TabbarComponent>
  </div>
</template>

<style scoped></style>
