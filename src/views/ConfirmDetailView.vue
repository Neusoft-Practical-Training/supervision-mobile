<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import MapComponent from "@/components/map/MapComponent.vue";
import { getConfirmDetail } from "@/api";
import router from "@/router";
import {
  type AreaInfo,
  findAreaById,
  formatAddress
} from "@/util";

// 测试数据
import { aqi, aqiStatistics } from "@/common/testData";
import type { AqiStatistics } from "@/api/entities/confirm";

// const user: UserDTO = useUserStore().user!
// const aqi: Aqi[] = useAqiStore().aqi!

const confirmGrid = ref<AreaInfo>();
const confirmDetail = ref<AqiStatistics>();

onBeforeMount(async () => {
  // const confirmId = router.currentRoute.value.params.confirmId as string
  // confirmDetail.value = await getConfirmDetail(parseInt(confirmId))
  confirmDetail.value = aqiStatistics;
  confirmGrid.value = findAreaById(confirmDetail.value.grid_id);
});

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
  <MapComponent :city="confirmDetail!.grid_id.substring(0, 3)"
                :address="confirmGrid!.grid[confirmDetail!.grid_id] + confirmDetail!.address" />

  <van-cell-group inset>
    <van-cell title="地址" :value="formatAddress(confirmGrid!) + '/' + confirmDetail!.address" />
    <van-field class="aqi-selector"
               name="checkboxGroup"
               label="空气质量"
               :rules="[{ required: true, message: '请选择预期空气质量' }]"
    >
      <template #input>
        <div class="aqi-selector-options">
          <van-radio
            disabled
            :key="aqi[confirmDetail!.confirm_aqi_id].aqi_id"
            :name="aqi[confirmDetail!.confirm_aqi_id].aqi_id"
            :style="{
                backgroundColor: aqi[confirmDetail!.confirm_aqi_id].color,
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '8px',
                textAlign: 'center'
              }"
          >
            <span
              :style="{color: getTextColor(aqi[confirmDetail!.confirm_aqi_id].color)}">{{ aqi[confirmDetail!.confirm_aqi_id].aqi_explain
              }}</span>
          </van-radio>
        </div>
      </template>
    </van-field>
    <van-cell title="CO浓度" :value="confirmDetail?.co_value" />
    <van-cell title="CO等级" :value="confirmDetail?.co_level" />
    <van-cell title="SO₂浓度" :value="confirmDetail?.so2_value" />
    <van-cell title="SO₂等级" :value="confirmDetail?.so2_level" />
    <van-cell title="SPM浓度" :value="confirmDetail?.spm_value" />
    <van-cell title="SPM等级" :value="confirmDetail?.spm_level" />
    <van-cell title="备注" class="remark">
      <van-text-ellipsis
        rows="3"
        :content="confirmDetail?.remarks"
        expand-text="展开"
        collapse-text="收起"
      />
    </van-cell>
  </van-cell-group>


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

.remark {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
</style>