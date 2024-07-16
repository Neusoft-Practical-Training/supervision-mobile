<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "@/stores";
import { GridMemberState, Role } from "@/common/enums";
import { type AreaInfo, findAreaById, formatAddress } from "@/util";
import { GmTips, type Tip } from "@/common/tips";
import type { ShareSheetOption } from "vant/lib/share-sheet/ShareSheet";
import router from "@/router";
import type { UserDTO } from "@/api/entities/user";

const isSupervisor = ref<boolean>();
const gm_state = ref<Tip>();
const user: UserDTO = useUserStore().user!;
const my_grid = ref<AreaInfo>();
const showShare = ref<boolean>(false)

const showOptions = [
  { name: '微信', icon: 'wechat' },
  { name: '微博', icon: 'weibo' },
  { name: '复制链接', icon: 'link' },
  { name: '分享海报', icon: 'poster' },
  { name: '二维码', icon: 'qrcode' },
];

const onSelect = (option: ShareSheetOption) => {
  console.log(option.name)
  showShare.value = false;
}

const logout = () => {
  useUserStore().logout()
  router.push('/login')
}

const updateInfo = () => {
  router.push('/updateUserInfo')
}

onBeforeMount(() => {
  if (user.role == Role.Supervisor) {
    isSupervisor.value = true;
  } else {
    isSupervisor.value = false;
    my_grid.value = findAreaById(user.grid_id!)
    switch (user.state) {
      case GridMemberState.Idle:
        gm_state.value = GmTips[GridMemberState.Idle];
        break;
      case GridMemberState.Working:
        gm_state.value = GmTips[GridMemberState.Working];
        break;
      case GridMemberState.TemporaryTransfer:
        gm_state.value = GmTips[GridMemberState.TemporaryTransfer];
        break;
      case GridMemberState.InVacation:
        gm_state.value = GmTips[GridMemberState.InVacation];
        break;
      case GridMemberState.AwaitingReview:
        gm_state.value = GmTips[GridMemberState.AwaitingReview];
        break;
      default:
        gm_state.value = GmTips[GridMemberState.Other];
        break;
    }
  }
})

</script>

<template>
  <div class="user-card">
    <div class="avatar">
      <van-image
        src="/base-avatar.jpeg"
        round
        width="5rem"
        height="5rem"
        fit="cover"
        position="center"
      />
    </div>
    <div class="user-info">
      <p id="name">{{user.name}}</p>
      <p id="phone_num">{{user.tel}}</p>
      <div class="gm_state" v-if="!isSupervisor!">
        <van-tag type="primary" :color="gm_state!.color">{{gm_state!.text}}</van-tag>
        <span id="task_num">待完成：{{user.task_num}}个</span>
      </div>
    </div>
    <div class="more" @click="updateInfo">
      <van-icon name="arrow" size="25"/>
    </div>
  </div>
  <div class="info">
    <van-cell-group class="base-info" v-if="isSupervisor">
      <van-cell title="历史反馈" icon="todo-list-o" is-link arrow-direction="right" to="/feedbackHistory"/>
<!--      <van-cell title="未解决反馈" icon="clock-o" is-link arrow-direction="right" />-->
    </van-cell-group>
    <van-cell-group class="base-info" v-if="!isSupervisor">
      <van-cell title="我的网格" :value="formatAddress(my_grid!)" icon="location-o" />
      <van-cell title="申请休假" icon="records-o" is-link arrow-direction="right" to="/leaveRequest" />
      <van-cell title="确认历史" icon="todo-list-o" is-link arrow-direction="right" to="/confirmHistory" />
    </van-cell-group>
    <van-cell-group class="fun">
      <van-cell title="更新缓存" icon="replay" is-link arrow-direction="right" />
      <van-cell title="问题反馈" icon="service-o" is-link arrow-direction="right" />
      <van-cell title="分享" icon="share-o" is-link arrow-direction="right" @click="() => showShare = true"/>
      <van-share-sheet
        v-model:show="showShare"
        title="立即分享给好友"
        :options="showOptions"
        @select="onSelect"
      />
    </van-cell-group>
    <van-cell-group class="logout">
      <van-cell title="退出登录" is-link arrow-direction="right" @click="logout"/>
    </van-cell-group>
  </div>
</template>

<style scoped>
.container {
  margin-top: 46px;
}

.user-card {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  background-color: var(--van-white);
}

/* 深色主题下的背景颜色 */
@media (prefers-color-scheme: dark) {
  .user-card {
    background-color: var(--van-black);
  }
}

.avatar {
  margin: 5px;
  flex: 1;
}

.user-info {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  flex: 2;
  justify-content: center;
}

#name {
  font-size: x-large;
}

.gm_state {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.more {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: right;
  flex-wrap: wrap;
  align-content: center;
}

.info .van-cell-group {
  margin-bottom: 10px;
}

</style>