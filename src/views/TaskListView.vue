<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { AqiAssignment } from "@/api/entities/assign";
import { useUserStore } from "@/stores";
import { TaskCompletedState } from "@/common/enums";
import { getTasks } from "@/api";
import type { UserDTO } from "@/api/entities/user";
import TaskCardComponent from "@/components/card/TaskCardComponent.vue"
import router from "@/router";

// 测试数据
import { aqiAssignments } from "@/common/testData";
const taskList = ref<AqiAssignment[]>(aqiAssignments)

// const taskList = ref<AqiAssignment[]>([])
const user: UserDTO = useUserStore().user!;

const taskFilterCriteria = ref<TaskFilterCriteria>({
  taskType: TaskCompletedState.Uncompleted,
  timeOrder: false,
  distanceOrder: false,
  keywords: '',
})

const options = [
  { text: '未完成任务', value: TaskCompletedState.Uncompleted },
  { text: '跨域任务', value: TaskCompletedState.CrossDomainRequestAccepted }
];

export type TaskFilterCriteria = {
  taskType: TaskCompletedState,
  timeOrder: boolean,
  distanceOrder: boolean,
  keywords: string,
}

const onSearch = async () => {
   taskList.value = await getTasks({gm_id: user.user_id!, taskFilterCriteria: taskFilterCriteria.value})
}

const handleCardClicked = (task: AqiAssignment) => {
  router.push(`/confirm/${ task.aa_id }`)
}

onMounted(() => {
  onSearch()
})

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
    <van-dropdown-item v-model="taskFilterCriteria.taskType" :options="options" />
    <van-dropdown-item title="排序">
      <van-cell center title="时间排序">
        <template #right-icon>
          <van-switch v-model="taskFilterCriteria.timeOrder" />
        </template>
      </van-cell>
      <van-cell center title="距离排序">
        <template #right-icon>
          <van-switch v-model="taskFilterCriteria.distanceOrder" />
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