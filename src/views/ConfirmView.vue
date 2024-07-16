<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import MapComponent from "@/components/map/MapComponent.vue";
import { confirm, getTask } from "@/api";
import { showFailToast, showSuccessToast } from "vant";
import type { AqiStatistics } from "@/api/entities/confirm";
import type { AqiAssignment } from "@/api/entities/assign";
import router from "@/router";
import {
  type AreaInfo,
  determineCOPollutionLevel,
  determineSO2PollutionLevel,
  determineSPMPollutionLevel, findAreaById,
  formatAddress, getTextColor
} from "@/util";
import type { UserDTO } from "@/api/entities/user";
import { useUserStore } from "@/stores";
import { aqi } from "@/common/aqi";
import { assignments, confirms } from "@/common/testData";
import { formatDate } from "@/util/format/formatTime";
import { TaskCompletedState } from "@/common/enums";

const user: UserDTO = useUserStore().user!;

const coValue = ref<number>(0);
const so2Value = ref<number>(0);
const spmValue = ref<number>(0);

const coLevel = computed(() => determineCOPollutionLevel(coValue.value));
const so2Level = computed(() => determineSO2PollutionLevel(so2Value.value));
const spmLevel = computed(() => determineSPMPollutionLevel(spmValue.value));

const checked = ref<number>();
const remark = ref<string>();
const task = ref<AqiAssignment>();
const taskGrid = ref<AreaInfo>();

onBeforeMount(async () => {
  const taskId = router.currentRoute.value.params.taskId as string;
  try {
    task.value = await getTask(parseInt(taskId));
  } catch (err) {
    console.log("Failed to get task detail", err);
    task.value = assignments.filter((item) => item.aa_id === parseInt(taskId))[0];
  }
  taskGrid.value = findAreaById(task.value.grid_id);
});

const onSubmit = async () => {
  const confirmData: AqiStatistics = new class implements AqiStatistics {
    aa_id: number = task.value!.aa_id;
    address: string = task.value!.address;
    confirm_aqi_id: number = checked.value!;
    gm_id: number = user.user_id!;
    grid_id: string = task.value!.grid_id;
    remarks: string | undefined = remark.value;
    co_level: number = coLevel.value!;
    co_value: number = coValue.value!;
    so2_level: number = so2Level.value!;
    so2_value: number = so2Value.value!;
    spm_level: number = spmLevel.value!;
    spm_value: number = spmValue.value!;
  };
  try {
    const result: AqiStatistics | null = await confirm(confirmData);
    if (result) {
      showSuccessToast("成功提交，感谢您的参与！");
      await router.push("/task");
    } else {
      showFailToast("提交失败，请稍后再试！");
    }
  } catch (err) {
    console.log("Failed to confirm", err);
    confirmData.confirm_date = formatDate(new Date());
    confirmData.confirm_time = new Date().toTimeString().split(" ")[0];
    confirmData.as_id = confirms.length;
    task.value!.completed = task.value!.completed === TaskCompletedState.Uncompleted ? TaskCompletedState.Completed : TaskCompletedState.CrossDomainRequestCompleted;
    confirms.push(confirmData);
    showSuccessToast("成功提交，感谢您的参与！");
    await router.push("/task");
  }
};

</script>

<template>
  <MapComponent
    :city="task!.grid_id.substring(0, 3)"
    :address="taskGrid!.grid[task!.grid_id] + task!.address"
    :marks="[{position: task!.address, title: task!.address}]"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-cell title="地址" :value="formatAddress(taskGrid!) + '/' + task!.address" />
      <van-field class="aqi-selector"
                 name="checkboxGroup"
                 label="空气质量"
                 :rules="[{ required: true, message: '请选择预期空气质量' }]"
      >
        <template #input>
          <div class="aqi-selector-options">
            <van-radio-group v-model="checked">
              <van-radio
                v-for="aqiItem in aqi"
                :key="aqiItem.aqi_id"
                :name="aqiItem.aqi_id"
                :style="{
                backgroundColor: aqiItem.color,
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '8px',
                textAlign: 'center'
              }"
              >
                <span :style="{color: getTextColor(aqiItem.color)}">{{ aqiItem.aqi_explain }}</span>
              </van-radio>
            </van-radio-group>
          </div>
        </template>
      </van-field>
      <van-field
        v-model="coValue"
        label="CO浓度 (mg/m³)"
        type="number"
        placeholder="请输入CO浓度"
        :rules="[{ required: true, message: '请输入CO浓度' }]"
      />
      <van-cell title="CO等级" :value="coLevel" />
      <van-field
        v-model="so2Value"
        label="SO₂浓度 (µg/m³)"
        type="number"
        placeholder="请输入SO₂浓度"
        :rules="[{ required: true, message: '请输入SO₂浓度' }]"
      />
      <van-cell title="SO₂等级" :value="so2Level" />
      <van-field
        v-model="spmValue"
        label="SPM浓度 (µg/m³)"
        type="number"
        placeholder="请输入SPM浓度"
        :rules="[{ required: true, message: '请输入SPM浓度' }]"
      />
      <van-cell title="SPM等级" :value="spmLevel" />
      <van-field
        v-model="remark"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>
.aqi-selector {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.aqi-selector-options {
  flex: 1;
}
</style>