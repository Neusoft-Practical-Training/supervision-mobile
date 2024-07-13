<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import MapComponent from "@/components/map/MapComponent.vue";
import { confirm, getTask } from "@/api";
import { showFailToast, showNotify, showSuccessToast } from "vant";
import type { Result } from "@/api/entities/result";
import type { AqiStatistics } from "@/api/entities/confirm";
import type { AqiAssignment } from "@/api/entities/assign";
import router from "@/router";
import {
  type AreaInfo,
  determineCOPollutionLevel,
  determineSO2PollutionLevel,
  determineSPMPollutionLevel, findAreaById,
  formatAddress
} from "@/util";

// 测试数据
import { user, aqi, aqiAssignment } from "@/common/testData";

// const user: UserDTO = useUserStore().user!
// const aqi: Aqi[] = useAqiStore().aqi!

const coValue = ref<number>(0);
const so2Value = ref<number>(0);
const spmValue = ref<number>(0);

const coLevel = computed(() => determineCOPollutionLevel(coValue.value));
const so2Level = computed(() => determineSO2PollutionLevel(so2Value.value));
const spmLevel = computed(() => determineSPMPollutionLevel(spmValue.value));

const checked = ref<number>()
const remark = ref<string>()
const task = ref<AqiAssignment>()
const taskGrid = ref<AreaInfo>()

onBeforeMount(async () => {
  // const taskId = router.currentRoute.value.params.taskId as string
  // task.value = await getTask(parseInt(taskId))
  task.value = aqiAssignment
  taskGrid.value = findAreaById(task.value.grid_id)
})

const onSubmit = async () => {
  try {
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
    }
    const result: AqiStatistics | null = await confirm(confirmData);
    if (result) {
      showSuccessToast('成功提交，感谢您的参与！')
      await router.push('/task')
    } else {
      showFailToast('提交失败，请稍后再试！')
    }
  } catch (err) {
    showNotify((err as Result<any>).message!);
  }
}

// 根据背景颜色计算文本颜色，确保对比度足够
const getTextColor = (bgColor: string) => {
  const color = bgColor.substring(1); // remove #
  const rgb = parseInt(color, 16); // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // extract red
  const g = (rgb >> 8) & 0xff; // extract green
  const b = (rgb >> 0) & 0xff; // extract blue
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  return luma > 128 ? "#000" : "#fff"; // black text if background is light, white if dark
};
</script>

<template>
  <MapComponent :city="task!.grid_id.substring(0, 3)" :address="taskGrid!.grid[task!.grid_id] + task!.address" />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-cell title="地址" :value="formatAddress(taskGrid!) + '/' + task!.address"/>
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
      <van-cell title="CO等级" :value="coLevel"/>
      <van-field
        v-model="so2Value"
        label="SO₂浓度 (µg/m³)"
        type="number"
        placeholder="请输入SO₂浓度"
        :rules="[{ required: true, message: '请输入SO₂浓度' }]"
      />
      <van-cell title="SO₂等级" :value="so2Level"/>
      <van-field
        v-model="spmValue"
        label="SPM浓度 (µg/m³)"
        type="number"
        placeholder="请输入SPM浓度"
        :rules="[{ required: true, message: '请输入SPM浓度' }]"
      />
      <van-cell title="SPM等级" :value="spmLevel"/>
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
.aqi-selector{
  display: flex;
  flex: 1;
  flex-direction: column;
}

.aqi-selector-options {
  flex: 1;
}
</style>