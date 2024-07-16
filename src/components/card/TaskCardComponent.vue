<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { AqiAssignment } from "@/api/entities/assign";
import { type AreaInfo, findAreaById, formatAddress } from "@/util";
import { TaskTips } from "@/common/tips";
import { TaskCompletedState } from "@/common/enums";

export default defineComponent({
  name: "TaskCardComponent",
  computed: {
    TaskCompletedState() {
      return TaskCompletedState;
    },
    TaskTips() {
      return TaskTips;
    }
  },
  methods: { formatAddress },
  props: {
    task: {
      type: Object as PropType<AqiAssignment>,
      required: true
    }
  },
  data() {
    return {
      taskGrid: undefined! as AreaInfo
    };
  },
  beforeMount() {
    this.taskGrid = findAreaById(this.task.grid_id);
  }
});
</script>

<template>
  <van-card @click="() => $emit('onClick', task)" class="custom-card">
    <template #title>
      <div class="card-title">
        {{ task.admin_id }} 管理员 -> {{ task.gm_id }} 网格员
        <span :style="{ color: TaskTips[task.completed].color }">状态: {{ TaskTips[task.completed].text }}</span>
      </div>
    </template>
    <template #desc>
      <div class="card-desc">
        <div>地点: {{ `${formatAddress(taskGrid)}/${task.address}` }}</div>
        <div>时间: {{ task.assign_date }}</div>
        <div v-if="task.remarks">备注:
          {{ task.remarks.length > 50 ? task.remarks.substring(0, 50) + "..." : task.remarks }}
        </div>
      </div>
    </template>
    <template #footer>
      <div class="card-footer"
           v-if="task.completed === TaskCompletedState.Completed || task.completed === TaskCompletedState.CrossDomainRequestCompleted">
        完成人: {{ task.gm_id }}
      </div>
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
