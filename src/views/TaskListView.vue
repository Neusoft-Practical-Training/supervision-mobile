<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { AqiAssignment } from "@/api/entities/assign";
import { useUserStore } from "@/stores";
import { TaskCompletedState } from "@/common/enums";
import { getTasks } from "@/api";
import type { UserDTO } from "@/api/entities/user";
import TaskCardComponent from "@/components/card/TaskCardComponent.vue";
import router from "@/router";
import { assignments } from "@/common/testData";

const taskList = ref<AqiAssignment[]>([]);
const user: UserDTO = useUserStore().user!;

const taskFilterCriteria = ref<TaskFilterCriteria>({
  taskType: TaskCompletedState.Uncompleted,
  timeOrder: false,
  distanceOrder: false,
  keywords: ""
});

const options = [
  { text: "未完成任务", value: TaskCompletedState.Uncompleted },
  { text: "跨域任务", value: TaskCompletedState.CrossDomainRequestAccepted }
];

export type TaskFilterCriteria = {
  taskType: TaskCompletedState,
  timeOrder: boolean,
  distanceOrder: boolean,
  keywords: string,
}

const onSearch = async () => {
  try {
    taskList.value = await getTasks({ gm_id: user.user_id!, taskFilterCriteria: taskFilterCriteria.value });
  } catch (err) {
    console.log("Failed to get tasks", err);
    query();
  }
};

const handleCardClicked = (task: AqiAssignment) => {
  router.push(`/confirm/${task.aa_id}`);
};

onMounted(() => {
  onSearch();
});

const query = () => {
  taskList.value = assignments.filter((item) => {
    if (item.completed !== TaskCompletedState.Uncompleted && item.completed !== TaskCompletedState.CrossDomainRequestAccepted) {
      return false;
    }
    // keywords
    if (taskFilterCriteria.value.keywords) {
      if (!item.address.includes(taskFilterCriteria.value.keywords)) {
        return false;
      }
    }
    // taskType
    return taskFilterCriteria.value.taskType === item.completed;
  });
  if (taskFilterCriteria.value.timeOrder) taskList.value.sort(
    (taskA: AqiAssignment, taskB: AqiAssignment) =>
      new Date(taskA.assign_date!).getTime() - new Date(taskB.assign_date!).getTime());
};

</script>

<template>
  <van-search
    v-model="taskFilterCriteria.keywords"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="() => taskFilterCriteria.keywords = ''"
  />
  <van-dropdown-menu>
    <van-dropdown-item v-model="taskFilterCriteria.taskType" :options="options" @change="onSearch" />
    <van-dropdown-item title="排序">
      <van-cell center title="时间排序">
        <template #right-icon>
          <van-switch v-model="taskFilterCriteria.timeOrder" @change="onSearch" />
        </template>
      </van-cell>
      <van-cell center title="距离排序">
        <template #right-icon>
          <van-switch v-model="taskFilterCriteria.distanceOrder" @change="onSearch" />
        </template>
      </van-cell>
    </van-dropdown-item>
  </van-dropdown-menu>
  <div v-for="task in taskList" :key="task.aa_id" class="task-list-item">
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