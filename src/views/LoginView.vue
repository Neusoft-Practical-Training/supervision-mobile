<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from "@/stores";
import router from "@/router";
import { login } from "@/api";
import { showNotify } from "vant";
import type { Result } from "@/api/entities/result";
import type { UserDTO } from "@/api/entities/user";
import { PASSWORD_PATTERN } from "@/common/constants";

const username = ref<string>('')
const password = ref<string>('')
const userStore = useUserStore()

async function onSubmit() {
  try {
    const user: UserDTO = await login({
      username: username.value,
      password: password.value,
    })
    if (user.status) {
      userStore.setUserDTO(user);
      await router.push('/mine');
    } else {
      window.alert('账号不可用，请联系管理员!')
    }
  } catch (e) {
    showNotify((e as Result<any>).message!);
  }
}

const register = () => {
  router.push('/register')
}
</script>

<template>
  <div class="image">
    <van-image src="/background.jpeg">
      <div class="img-tip">
        <p>Hello!</p>
        <p>欢迎使用东软空气质量公众监督平台</p>
      </div>
    </van-image>
  </div>
  <van-form @submit="onSubmit" class="form">
    <van-cell-group inset>
      <van-field
        v-model.trim="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model.trim="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写用户名' }, { pattern: PASSWORD_PATTERN, message: '请输入正确的密码' }]"
      />
    </van-cell-group>
    <div class="register">
      <a href="#" @click="register">没有账号？注册一个</a>
      <a href="#">找回密码</a>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>
.image {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.img-tip {
  position: absolute;
  top: 5%;
  left: 5%;
  font-size: large;
  color: var(--vt-c-indigo);;
}

.img-tip p:nth-child(1) {
  font-size: xx-large;
}

.form {
  margin: 20px;
}

.register {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
}
.register a {
  font-size: small;
  margin-top: 10px;
  color: var(--vt-c-green);
}
</style>