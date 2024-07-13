import { defineStore } from "pinia";
import { ref } from 'vue'
import type { Aqi } from "@/api/entities/aqi";

export const useAqiStore = defineStore(
  'aqi',
  () => {
    const aqi = ref<Aqi[]>()
    const setAqi = (a: Aqi[]) => aqi.value = a
    return { aqi, setAqi }
  },
  {
    // 持久化配置
    persist: true
  }
)