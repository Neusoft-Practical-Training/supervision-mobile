<script setup lang="ts">
import { ref } from "vue";
import { areaList } from "@vant/area-data";
import MapComponent, { type Mark } from "@/components/map/MapComponent.vue";
import { useUserStore } from "@/stores";
import type { UserDTO } from "@/api/entities/user";
import type { Grids } from "@/api/entities/region";
import type { AqiFeedback } from "@/api/entities/feedback";
import { AqiFeedbackState } from "@/common/enums";
import { feedback } from "@/api";
import { showFailToast, showSuccessToast } from "vant";
import { aqi } from "@/common/aqi";
import { getTextColor } from "@/util";
import { formatDate } from "@/util/format/formatTime";
import { feedbacks } from "@/common/testData";
import router from "@/router";

const user: UserDTO = useUserStore().user!;
const region = ref<string>();
const showArea = ref<boolean>();
const address = ref<string>("");
const marks = ref<Mark[]>([]);
const message = ref<string>();
const checked = ref();

const grid = ref<Grids>(new class implements Grids {
  city_id: string = "";
  city_name: string = "";
  grid_id: string = "";
  grid_name: string = "";
  province_id: string = "";
  province_name: string = "";
});

const onSubmit = async () => {
  const feedbackData: AqiFeedback = new class implements AqiFeedback {
    address: string = address.value!;
    explain: string = message.value!;
    grid_id: string = grid.value?.grid_id!;
    pre_aqi_id: number = checked.value;
    state: AqiFeedbackState = AqiFeedbackState.Unassigned;
    supervisor_id: number = user.user_id!;
  };
  try {
    const result: AqiFeedback | null = await feedback(feedbackData);
    if (result) {
      showSuccessToast("成功提交，感谢您的参与！");
      await router.push("/mine");
    } else {
      showFailToast("提交失败，请稍后再试！");
    }
  } catch (err) {
    console.log("Failed to feedback", err);
    feedbackData.af_date = formatDate(new Date());
    feedbackData.af_time = new Date().toTimeString().split(" ")[0];
    feedbackData.af_id = feedbacks.length;
    feedbacks.push(feedbackData);
    showSuccessToast("成功提交，感谢您的参与！");
    await router.push("/mine");
  }
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

const handleAddressChange = () => {
  marks.value = [{ position: address.value, title: address.value }];
};
</script>

<template>
  <MapComponent
    :city="grid.city_id.substring(0, 3)"
    :address="grid.grid_name + address"
    :marks="marks"
  />
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
        @change="handleAddressChange"
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