<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { type AreaInfo, findAreaById, formatAddress, getTextColor } from "@/util";
import type { AqiFeedback } from "@/api/entities/feedback";
import { FeedbackTips } from "@/common/tips";
import { aqi } from "@/common/aqi";

export default defineComponent({
  name: "FeedbackCardComponent",
  computed: {
    FeedbackTips() {
      return FeedbackTips;
    },
    aqi() {
      return aqi;
    }
  },
  methods: { getTextColor, formatAddress },
  props: {
    feedback: {
      type: Object as PropType<AqiFeedback>,
      required: true
    }
  },
  data() {
    return {
      taskGrid: undefined! as AreaInfo
    };
  },
  beforeMount() {
    this.taskGrid = findAreaById(this.feedback.grid_id);
  }
});
</script>

<template>
  <van-card @click="() => $emit('onClick', feedback)" class="custom-card">
    <template #title>
      <div class="card-title">
        反馈单号：{{ feedback.af_id }}
        <span :style="{ color: FeedbackTips[feedback.state].color }">状态: {{ FeedbackTips[feedback.state].text
          }}</span>
        <span
          :style="{
          backgroundColor: aqi[feedback.pre_aqi_id].color,
          color: getTextColor(aqi[feedback.pre_aqi_id].color) }">
          预期空气质量: {{ aqi[feedback.pre_aqi_id].aqi_explain
          }}</span>
      </div>
    </template>
    <template #desc>
      <div class="card-desc">
        <div>地点: {{ `${formatAddress(taskGrid)}/${feedback.address}` }}</div>
        <div>时间: {{ feedback.af_date }}</div>
        <div v-if="feedback.explain">反馈信息描述:
          {{ feedback.explain.length > 50 ? feedback.explain.substring(0, 50) + "..." : feedback.explain }}
        </div>
        <div v-if="feedback.remarks">备注:
          {{ feedback.remarks.length > 50 ? feedback.remarks.substring(0, 50) + "..." : feedback.remarks }}
        </div>
      </div>
    </template>
    <template #footer>
      <div class="card-footer" v-if="feedback.state">任务单号: {{ feedback.aa_id }}</div>
    </template>
  </van-card>
</template>

<style scoped>
.custom-card {
  transition: background-color 0.3s ease; /* 平滑过渡效果 */
  border-radius: 10px; /* 设置圆角 */
  background-color: var(--van-white);
}

/* 深色主题下的背景颜色 */
@media (prefers-color-scheme: dark) {
  .custom-card {
    background-color: var(--van-black);
  }
}

.custom-card:hover {
  background-color: var(--van-active-color); /* 鼠标悬停时的背景色 */
}

.card-title {
  font-size: 16px; /* 较大的字体大小 */
  font-weight: bold; /* 加粗 */
  color: #333; /* 深色字体 */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.card-desc {
  font-size: 14px; /* 标准的字体大小 */
  color: #666; /* 中等深浅的字体颜色 */
}

.card-footer {
  font-size: 12px; /* 较小的字体大小 */
  color: #999; /* 浅色字体，用于非主要信息 */
}
</style>
