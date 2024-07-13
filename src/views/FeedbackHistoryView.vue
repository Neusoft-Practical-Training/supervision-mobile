<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AqiFeedbackState } from "@/common/enums";
import { getFeedbackHistory } from "@/api";
import { useUserStore } from "@/stores";
import type { AqiAssignment } from "@/api/entities/assign";
import router from "@/router";

// 测试数据
import { aqiFeedbacks } from "@/common/testData";
import type { AqiFeedback } from "@/api/entities/feedback";
import FeedbackCardComponent from "@/components/card/FeedbackCardComponent.vue";
const feedbackList = ref<AqiFeedback[]>(aqiFeedbacks)

const user = useUserStore().user!

export type FeedbackHistoryFilterCriteria = {
  keywords: string,
  feedbackType: AqiFeedbackState,
  startDate?: string,
  endDate?: string,
}

const feedbackHistoryFilterCriteria = ref<FeedbackHistoryFilterCriteria>({
  keywords : '',
  feedbackType: AqiFeedbackState.Unassigned,
  startDate: undefined,
  endDate: undefined,
})

const options = [
  { text: '未指派', value: AqiFeedbackState.Unassigned },
  { text: '已指派', value: AqiFeedbackState.Assigned },
  { text: '已完成任务', value: AqiFeedbackState.Completed },
];

const handleCardClicked = (feedback: AqiAssignment) => {
  router.push(`/confirmDetail/${ feedback.af_id }`)
}

const showCalendar = ref<boolean>(false)
const date = ref<string>('')

const formatDate = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (values: Date[]) => {
  const [start, end] = values;
  feedbackHistoryFilterCriteria.value.startDate = start.toDateString()
  feedbackHistoryFilterCriteria.value.endDate = end.toDateString()
  console.log(feedbackHistoryFilterCriteria.value)
  showCalendar.value = false;
  date.value = `${formatDate(start)} - ${formatDate(end)}`;
};

const onSearch = async () => {
  feedbackList.value = await getFeedbackHistory({supervisor_id: user.user_id!, feedbackHistoryFilterCriteria: feedbackHistoryFilterCriteria.value})
}

onMounted(() => {
  onSearch()
})

</script>

<template>
  <van-search
    v-model="feedbackHistoryFilterCriteria.keywords"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="() => feedbackHistoryFilterCriteria.keywords = ''"
  />
  <van-dropdown-menu>
    <van-dropdown-item v-model="feedbackHistoryFilterCriteria.feedbackType" :options="options" />
    <van-dropdown-item title="选择日期">
      <van-cell title="选择日期区间" :value="date" @click="showCalendar = true" />
      <van-calendar v-model:show="showCalendar" type="range" @confirm="onConfirm" />
    </van-dropdown-item>
  </van-dropdown-menu>
  <div v-for="feedback in feedbackList" :key="feedback.af_id" class="feedback-list-item">
    <FeedbackCardComponent
      :feedback="feedback"
      @onClick="handleCardClicked"
    />
  </div>
</template>

<style scoped>
.feedback-list-item {
  margin-top: 8px;
  margin-bottom: 16px;
}
</style>