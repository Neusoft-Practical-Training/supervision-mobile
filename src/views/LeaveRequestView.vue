<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { formatDate } from "@/util/format/formatTime";
import type { LeaveRequestDTO } from "@/api/entities/leaveRequest";
import { LeaveRequestState } from "@/common/enums";
import { useUserStore } from "@/stores";
import { getLeaveRequest, leaveRequest } from "@/api";
import { showFailToast, showSuccessToast } from "vant";
import { leaveRequests } from "@/common/testData";

const user = useUserStore().user!;
const showCalendar = ref<boolean>(false);
const showVacationSteps = ref<boolean>(false);
const date = ref<string>("");
const vacationRequest = ref<LeaveRequestDTO>(
  {
    avatarURL: user.avatar,
    user_id: user.user_id,
    name: user.name,
    gender: user.gender,
    grid_id: user.grid_id,
    tel: user.tel,
    start_time: undefined,
    end_time: undefined,
    leave_days: 5,
    reason: undefined,
    state: LeaveRequestState.Pending
  }
);
const images: string[] = [
  "/public/example-img1.png",
  "/public/example-img2.png"
];

const onConfirm = (values: Date[]) => {
  const [start, end] = values;
  vacationRequest.value.start_time = formatDate(start);
  vacationRequest.value.end_time = formatDate(end);
  vacationRequest.value.leave_days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  showCalendar.value = false;
  date.value = `${formatDate(start)} - ${formatDate(end)}`;
};

const onSubmit = async () => {
  try {
    const result = await leaveRequest(vacationRequest.value);
    if (result.state !== undefined) {
      showSuccessToast("成功提交，请耐心等待审核！");
      vacationRequest.value = result;
      showVacationSteps.value = true;
    } else {
      showFailToast("提交失败，请稍后再试！");
    }
  } catch (err) {
    console.log("Failed to submit leave request", err);
    vacationRequest.value.request_id = leaveRequests.length;
    vacationRequest.value.create_time = formatDate(new Date());
    leaveRequests.push(vacationRequest.value);
    showVacationSteps.value = true;
  }
};

onBeforeMount(async () => {
  try {
    const result = await getLeaveRequest(user.user_id!);
    if (result) {
      vacationRequest.value = result;
      showVacationSteps.value = true;
    }
  } catch (err) {
    console.log("Failed to get leave request", err);
    const result = leaveRequests.filter((item) => item.user_id === user.user_id)[0];
    if (result) {
      vacationRequest.value = result;
      showVacationSteps.value = true;
    }
  }
});
</script>

<template>
  <div class="image-swipe">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <van-image :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="vacation-steps" v-if="showVacationSteps">
    <van-steps direction="vertical" :active="0">
      <van-step>
        <h3>{{ vacationRequest.start_time }} 至 {{ vacationRequest.end_time }} 共计 {{ vacationRequest.leave_days }}
          天的假期申请已提交，等待审核</h3>
        <p>{{ vacationRequest.create_time }}</p>
      </van-step>
      <van-step v-if="vacationRequest.state! === LeaveRequestState.Approved">
        <h3>休假申请已被接受，请尽情享受假期</h3>
        <p>{{ vacationRequest.update_time }}</p>
      </van-step>
      <van-step v-if="vacationRequest.state! === LeaveRequestState.Rejected">
        <h3>休假申请已被驳回，还请继续努力</h3>
        <p>{{ vacationRequest.update_time }}</p>
      </van-step>
    </van-steps>
  </div>
  <div class="vacation-request" v-if="!showVacationSteps">
    <van-form @submit="onSubmit" class="form">
      <van-cell-group inset>
        <van-field
          v-model="date"
          is-link
          readonly
          name="calendar"
          label="日历"
          placeholder="点击选择日期"
          @click="showCalendar = true"
          :rules="[{ required: true, message: '选择请假日期范围' }]"
        />
        <van-calendar v-model:show="showCalendar" type="range" @confirm="onConfirm" />
        <van-field
          v-model="vacationRequest.reason"
          rows="2"
          autosize
          label="请假事由"
          type="textarea"
          maxlength="50"
          placeholder="请输入请假事由"
          show-word-limit
          :rules="[{ required: true, message: '请填写请假事由' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<style scoped>
.vacation-steps {
  margin-top: 10px;
}

.vacation-request {
  margin-top: 10px;
}
</style>