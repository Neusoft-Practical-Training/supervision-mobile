<script setup lang="ts">
import { ref } from "vue";
import { areaList } from "@vant/area-data";
import { type UserDTO } from "@/api/entities/user";
import { Gender, Role } from "@/common/enums";
import { AGE_PATTERN, NAME_PATTERN, PASSWORD_PATTERN, PHONE_NUM_PATTERN } from "@/common/constants";
import type { UploaderAfterRead, UploaderFileListItem } from "vant/lib/uploader/types";
import { register } from "@/api";
import { showNotify } from "vant";
import type { Result } from "@/api/entities/result";
import router from "@/router";

type CascaderOption = {
  text: string;
  value: string;
  children?: CascaderOption[];
};

const user = ref<UserDTO>(new class implements UserDTO {
  age?: number;
  avatar?: string;
  city_id?: string;
  gender: Gender = Gender.Unknown;
  name: string = "";
  province_id?: string;
  grid_id?: string;
  role: Role = Role.Supervisor;
  tel: string = "";
});
const password = ref<string>('');
const avatarUrl = ref<string>('/base-avatar.jpeg')
const showOverlay = ref<boolean>(false)
const active = ref<number>(0);
const checkPassword = ref<string>("");
const showArea = ref<boolean>();
const region = ref();

const confirmPassword = () => checkPassword.value === password.value;
const onConfirm = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showArea.value = false;
  user.value.province_id = selectedOptions[0].value;
  user.value.city_id = selectedOptions[1].value;
  user.value.grid_id = selectedOptions[2].value
  region.value = selectedOptions.map((item) => item.text).join("/");
};

const updateAvatar = (file: UploaderFileListItem) => {
  user.value.avatar = file.content!;
  avatarUrl.value = file.content!;
  showOverlay.value = false;
};

const onSubmit = async () => {
  try {
    console.log(user.value);
    user.value.role = active.value ? Role.Supervisor : Role.GridMember;
    await register({
      user: user.value,
      password: password.value});
    await router.push('/login');
  } catch(e) {
    showNotify((e as Result<any>).message!);
  }
};
</script>

<template>
  <div class="avatar">
    <van-uploader :before-read="() => showOverlay = true" :after-read="updateAvatar as UploaderAfterRead" reupload>
      <van-image
        round
        width="6rem"
        height="6rem"
        fit="cover"
        position="center"
        :src="avatarUrl"
      >
        <p>点击上传</p>
      </van-image>
    </van-uploader>
    <van-overlay :show="showOverlay">
      <van-loading type="spinner" size="100px" text-size="20px" vertical style="top: 30%">加载中...</van-loading>
    </van-overlay>
  </div>
  <van-tabs v-model:active="active">
    <van-tab title="公众监督员" />
    <van-tab title="网格员" />
  </van-tabs>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model.trim="user.tel"
        name="tel"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }, { pattern: PHONE_NUM_PATTERN, message: '请填写正确的手机号' }]"
      />
      <van-field
        v-model.trim="user.name"
        name="name"
        label="姓名"
        placeholder="请输入您的真实姓名"
        :rules="[{ required: true, message: '请填写姓名' }, { pattern: NAME_PATTERN, message: '请填写正确的姓名' }]"
      />
      <van-field
        v-model.trim.number="user.age"
        name="age"
        label="年龄"
        placeholder="年龄"
        :rules="[{ required: true, message: '请填写年龄' }, { pattern: AGE_PATTERN, message: '请填写正确的年龄' }]"
      />
      <van-field name="gender" label="性别">
        <template #input>
          <van-radio-group v-model="user.gender" direction="horizontal">
            <van-radio :name=Gender.Unknown>秘密</van-radio>
            <van-radio :name=Gender.Male>男</van-radio>
            <van-radio :name=Gender.Female>女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!--在这里插入地区选择-->
      <van-field v-if="active"
                 v-model="region"
                 is-link
                 readonly
                 name="area"
                 label="地区选择"
                 placeholder="点击选择省市区"
                 @click="showArea = true"
      />
      <van-popup v-model:show="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
      <van-field
        v-model.trim="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }, { pattern: PASSWORD_PATTERN, message: '请输入正确的密码' }]"
      />
      <van-field
        v-model.trim="checkPassword"
        type="password"
        name="check"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写确认密码' }, { validator: confirmPassword, message: '两次输入的密码不一致' }]"
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
.avatar {
  position: relative;
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.avatar p {
  position: absolute;
  bottom: 10%;
  left: 18%;
  color: var(--van-white);
}
</style>