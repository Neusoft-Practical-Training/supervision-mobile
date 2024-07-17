<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AqiFeedbackState } from "@/common/enums";
import { getConfirmDetailId, getFeedbackHistory } from "@/api";
import { useUserStore } from "@/stores";
import router from "@/router";
import type { AqiFeedback } from "@/api/entities/feedback";
import FeedbackCardComponent from "@/components/card/FeedbackCardComponent.vue";
import { showNotify } from "vant";
import { assignments, feedbacks } from "@/common/testData";
import { formatDate } from "@/util/format/formatTime";

const feedbackList = ref<AqiFeedback[]>();
const user = useUserStore().user!;

export type FeedbackHistoryFilterCriteria = {
  keywords: string,
  feedbackType: AqiFeedbackState,
  startDate?: string,
  endDate?: string,
}

const feedbackHistoryFilterCriteria = ref<FeedbackHistoryFilterCriteria>({
  keywords: "",
  feedbackType: AqiFeedbackState.Unassigned,
  startDate: undefined,
  endDate: undefined
});

const options = [
  { text: "未指派", value: AqiFeedbackState.Unassigned },
  { text: "已指派", value: AqiFeedbackState.Assigned },
  { text: "已完成任务", value: AqiFeedbackState.Completed }
];

const handleCardClicked = async (feedback: AqiFeedback) => {
  if (feedback.state === AqiFeedbackState.Completed) {
    try {
      const as_id = await getConfirmDetailId(feedback.aa_id!);
      await router.push(`/confirmDetail/${as_id}`);
    } catch (err) {
      console.log("Failed to get confirm detail id", err);
      const as_id = assignments.filter((item) => item.aa_id == feedback.aa_id!)[0].as_id!;
      await router.push(`/confirmDetail/${as_id}`);
    }
  } else {
    showNotify("该反馈还没有得到确认，请耐心等待！");
  }
};

const showCalendar = ref<boolean>(false);
const date = ref<string>("");

const onConfirm = (values: Date[]) => {
  const [start, end] = values;
  feedbackHistoryFilterCriteria.value.startDate = formatDate(start);
  feedbackHistoryFilterCriteria.value.endDate = formatDate(end);
  showCalendar.value = false;
  date.value = `${formatDate(start)} - ${formatDate(end)}`;
  onSearch();
};

const onSearch = async () => {
  try {
    feedbackList.value = await getFeedbackHistory({
      supervisor_id: user.user_id!,
      feedbackHistoryFilterCriteria: feedbackHistoryFilterCriteria.value
    });
  } catch (err) {
    console.log("Failed to get feedback history", err);
    query();
  }
};

onMounted(() => {
  onSearch();
});

const query = () => {
  feedbackList.value = feedbacks.filter((item) => {
    // keywords
    if (feedbackHistoryFilterCriteria.value.keywords) {
      if (!item.address.includes(feedbackHistoryFilterCriteria.value.keywords)) {
        return false;
      }
    }
    // startDate
    if (feedbackHistoryFilterCriteria.value.startDate && feedbackHistoryFilterCriteria.value.startDate !== "") {
      if (new Date(feedbackHistoryFilterCriteria.value.startDate) > new Date(item.assign_date!)) {
        return false;
      }
    }
    // endDate
    if (feedbackHistoryFilterCriteria.value.endDate && feedbackHistoryFilterCriteria.value.endDate !== "") {
      if (new Date(feedbackHistoryFilterCriteria.value.endDate) < new Date(item.assign_date!)) {
        return false;
      }
    }
    // taskType
    return feedbackHistoryFilterCriteria.value.feedbackType === item.state;
  });
};

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
    <van-dropdown-item v-model="feedbackHistoryFilterCriteria.feedbackType" :options="options" @change="onSearch" />
    <van-dropdown-item title="选择日期">
      <van-cell title="选择日期区间" :value="date" @click="showCalendar = true" />
      <van-calendar v-model:show="showCalendar" switch-mode="year-month" type="range" @confirm="onConfirm" />
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