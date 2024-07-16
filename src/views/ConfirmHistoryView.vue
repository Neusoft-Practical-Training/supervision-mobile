<script setup lang="ts">
import { onMounted, ref } from "vue";
import TaskCardComponent from "@/components/card/TaskCardComponent.vue";
import { TaskCompletedState } from "@/common/enums";
import { getConfirmHistory } from "@/api";
import { useUserStore } from "@/stores";
import type { AqiAssignment } from "@/api/entities/assign";
import router from "@/router";
import { assignments } from "@/common/testData";
import { formatDate } from "@/util/format/formatTime";

const confirmList = ref<AqiAssignment[]>([]);
const user = useUserStore().user!;

export type ConfirmHistoryFilterCriteria = {
  keywords: string,
  taskType: TaskCompletedState,
  startDate?: string,
  endDate?: string,
}

const confirmHistoryFilterCriteria = ref<ConfirmHistoryFilterCriteria>({
  keywords: "",
  taskType: TaskCompletedState.Completed,
  startDate: undefined,
  endDate: undefined
});

const options = [
  { text: "已完成任务", value: TaskCompletedState.Completed },
  { text: "跨域任务", value: TaskCompletedState.CrossDomainRequestCompleted }
];

const handleCardClicked = (task: AqiAssignment) => {
  router.push(`/confirmDetail/${task.as_id}`);
};

const showCalendar = ref<boolean>(false);
const date = ref<string>("");

const onConfirm = (values: Date[]) => {
  const [start, end] = values;
  confirmHistoryFilterCriteria.value.startDate = formatDate(start);
  confirmHistoryFilterCriteria.value.endDate = formatDate(end);
  showCalendar.value = false;
  date.value = `${formatDate(start)} - ${formatDate(end)}`;
  onSearch();
};

const onSearch = async () => {
  try {
    confirmList.value = await getConfirmHistory({
      gm_id: user.user_id!,
      confirmHistoryFilterCriteria: confirmHistoryFilterCriteria.value
    });
  } catch (err) {
    console.log("Failed to get confirm history", err);
    query();
  }
};

onMounted(() => {
  onSearch();
});

const query = () => {
  confirmList.value = assignments.filter((item) => {
    if (item.completed !== TaskCompletedState.Completed && item.completed !== TaskCompletedState.CrossDomainRequestCompleted) {
      return false;
    }
    // keywords
    if (confirmHistoryFilterCriteria.value.keywords) {
      if (!item.address.includes(confirmHistoryFilterCriteria.value.keywords)) {
        return false;
      }
    }
    // startDate
    if (confirmHistoryFilterCriteria.value.startDate && confirmHistoryFilterCriteria.value.startDate !== "") {
      if (new Date(confirmHistoryFilterCriteria.value.startDate) > new Date(item.assign_date!)) {
        return false;
      }
    }
    // endDate
    if (confirmHistoryFilterCriteria.value.endDate && confirmHistoryFilterCriteria.value.endDate !== "") {
      if (new Date(confirmHistoryFilterCriteria.value.endDate) < new Date(item.assign_date!)) {
        return false;
      }
    }
    // taskType
    return confirmHistoryFilterCriteria.value.taskType === item.completed;
  });
};

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
    <van-dropdown-item v-model="confirmHistoryFilterCriteria.taskType" :options="options" @change="onSearch" />
    <van-dropdown-item title="选择日期" @change="onSearch">
      <van-cell title="选择日期区间" :value="date" @click="showCalendar = true" />
      <van-calendar v-model:show="showCalendar" switch-mode="year-month" type="range" @confirm="onConfirm" />
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