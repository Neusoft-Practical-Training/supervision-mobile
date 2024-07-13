<script setup lang="ts">
import { onMounted, ref } from "vue";
import TaskCardComponent from "@/components/card/TaskCardComponent.vue";
import { TaskCompletedState } from "@/common/enums";
import { getConfirmHistory } from "@/api";
import { useUserStore } from "@/stores";
import type { AqiAssignment } from "@/api/entities/assign";
import router from "@/router";

// 测试数据
import { aqiAssignments } from "@/common/testData";
const confirmList = ref<AqiAssignment[]>(aqiAssignments)

const user = useUserStore().user!

export type ConfirmHistoryFilterCriteria = {
  keywords: string,
  taskType: TaskCompletedState,
  startDate?: string,
  endDate?: string,
}

const confirmHistoryFilterCriteria = ref<ConfirmHistoryFilterCriteria>({
  keywords : '',
  taskType: TaskCompletedState.Completed,
  startDate: undefined,
  endDate: undefined,
})

const options = [
  { text: '已完成任务', value: TaskCompletedState.Completed },
  { text: '跨域任务', value: TaskCompletedState.CrossDomainRequestCompleted }
];

const handleCardClicked = (task: AqiAssignment) => {
  router.push(`/confirmDetail/${ task.as_id }`)
}

const showCalendar = ref<boolean>(false)
const date = ref<string>('')

const formatDate = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (values: Date[]) => {
  const [start, end] = values;
  confirmHistoryFilterCriteria.value.startDate = start.toDateString()
  confirmHistoryFilterCriteria.value.endDate = end.toDateString()
  console.log(confirmHistoryFilterCriteria.value)
  showCalendar.value = false;
  date.value = `${formatDate(start)} - ${formatDate(end)}`;
};

const onSearch = async () => {
  confirmList.value = await getConfirmHistory({gm_id: user.user_id!, confirmHistoryFilterCriteria: confirmHistoryFilterCriteria.value})
}

onMounted(() => {
  onSearch()
})

</script>

<template>
  <van-search
    v-model="confirmHistoryFilterCriteria.keywords"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="() => confirmHistoryFilterCriteria.keywords = ''"
  />
  <van-dropdown-menu>
    <van-dropdown-item v-model="confirmHistoryFilterCriteria.taskType" :options="options" />
    <van-dropdown-item title="选择日期">
      <van-cell title="选择日期区间" :value="date" @click="showCalendar = true" />
      <van-calendar v-model:show="showCalendar" type="range" @confirm="onConfirm" />
    </van-dropdown-item>
  </van-dropdown-menu>
  <div v-for="task in confirmList" :key="task.aa_id" class="task-list-item">
    <TaskCardComponent
      :task="task"
      @onClick="handleCardClicked"
    />
  </div>
</template>

<style scoped>
.task-list-item {
  margin-top: 8px;
  margin-bottom: 16px;
}
</style>