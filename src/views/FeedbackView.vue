<script setup lang="ts">
import { ref } from "vue";
import { areaList } from "@vant/area-data";
import MapComponent from "@/components/map/MapComponent.vue";
import { useAqiStore, useUserStore } from "@/stores";
import type { UserDTO } from "@/api/entities/user";
import type { Aqi } from "@/api/entities/aqi";
import type { Grids } from "@/api/entities/region";
import type { AqiFeedback } from "@/api/entities/feedback";
import { AqiFeedbackState } from "@/common/enums";
import { feedback } from "@/api";
import { showFailToast, showNotify, showSuccessToast } from "vant";
import type { Result } from "@/api/entities/result";

// 测试数据
// import { user, aqi } from "@/common/testData";

const user: UserDTO = useUserStore().user!
const aqi: Aqi[] = useAqiStore().aqi!

const region = ref<string>();
const showArea = ref<boolean>();
const address = ref<string>('');
const message = ref<string>();
const checked = ref();

const grid = ref<Grids>(new class implements Grids {
  city_id: string = user.city_id!;
  city_name: string = '';
  grid_id: string = '';
  grid_name: string = '';
  province_id: string = '';
  province_name: string = '';
});

const onSubmit = async () => {
  try {
    const feedbackData = new class implements AqiFeedback {
      address: string = address.value!;
      explain: string = message.value!;
      grid_id: string = grid.value?.grid_id!;
      pre_aqi_id: number = checked.value;
      state: AqiFeedbackState = AqiFeedbackState.Unassigned;
      supervisor_id: number = user.user_id!;
    };
    const result: AqiFeedback | null = await feedback(feedbackData);
    if (result) {
      showSuccessToast('成功提交，感谢您的参与！')
      window.location.reload();
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

type CascaderOption = {
  text: string;
  value: string;
  children?: CascaderOption[];
};

const onConfirm = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showArea.value = false;
  grid!.value!.province_id = selectedOptions[0].value;
  grid!.value!.city_id = selectedOptions[1].value;
  grid!.value!.grid_id = selectedOptions[2].value;
  grid!.value!.province_name = selectedOptions[0].text;
  grid!.value!.city_name = selectedOptions[1].text;
  grid!.value!.grid_name = selectedOptions[2].text;
  region.value = selectedOptions.map((item) => item.text).join("/");
};
</script>

<template>
  <MapComponent :city="grid.city_id.substring(0, 3)" :address="grid.grid_name + address" />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        name="checkboxGroup"
        label="预期空气质量"
        :rules="[{ required: true, message: '请选择预期空气质量' }]"
      >
        <template #input>
          <div class="aqi-selector">
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
      <van-field v-model="region"
                 readonly
                 name="area"
                 label="地区选择"
                 placeholder="点击选择省市区"
                 @click="showArea = true"
                 :rules="[{ required: true, message: '请选择区域' }]"
      />
      <van-popup v-model:show="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
      <van-field
        v-model="address"
        rows="1"
        autosize
        label="详细地址"
        type="textarea"
        placeholder="请输入详细地址"
        :rules="[{ required: true, message: '请输入详细地址' }]"
      />
      <van-field
        v-model="message"
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

.van-radio-group {
  flex: 1;
}

.van-cell {
  flex-direction: column;
}
</style>