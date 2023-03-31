<template>
  <div class="loginBox">
    <div class="container">
      <div class="panda">
        <div class="ear left"></div>
        <div class="ear right"></div>
        <div class="face">
          <div class="eye-shadow left"></div>
          <div class="eye-white left">
            <div
              class="eye-ball"
              :style="{ left: XY.left + 'px', top: XY.top + 'px' }"
            ></div>
          </div>
          <div class="eye-shadow right"></div>
          <div class="eye-white right">
            <div
              class="eye-ball"
              :style="{ left: XY.left + 'px', top: XY.top + 'px' }"
            ></div>
          </div>
          <div class="nose"></div>
          <div class="mouth"></div>
        </div>
        <div class="body"></div>
        <div class="foot left">
          <div class="sole"></div>
        </div>
        <div class="foot right">
          <div class="sole"></div>
        </div>
      </div>
      <div :class="['login-box', ups]">
        <div class="hand left"></div>
        <div class="hand right"></div>
        <h1>用户登录</h1>
        <div class="ipt-box">
          <input type="text" required />
          <label>用户名</label>
        </div>
        <div class="ipt-box">
          <input
            type="password"
            @focus="ups = 'up'"
            @focusout="ups = ''"
            required
          />
          <label>密码</label>
        </div>
        <el-button type="primary" @click="Login" v-loading="btnLoading"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>
<script setup>

import {
  ref,
  reactive,
  onMounted,
  nextTick,
  onUnmounted,
  getCurrentInstance
} from 'vue'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const router = useRouter()
let ups = ref('');
let XY = reactive({
  left: 5,
  top: 5
});

let btnLoading = false

onMounted(() => {
  nextTick(() => {
    mouseUpLisenter();
  });
});

function mouseUpLisenter () {
  document.addEventListener('mousemove', setXY);
};

function setXY (e) {
  let dw = document.documentElement.clientWidth / 10;
  let dh = document.documentElement.clientHeight / 18;
  let x = e.pageX / dw;
  let y = e.pageY / dh;
  XY.left = x
  XY.top = y
};

function Login () {
  btnLoading = true
  setTimeout(() => {
    btnLoading = false
    proxy.$openNot('success', '提示', '登录成功')
    router.push('/homePage')
  }, 1000);
};

onUnmounted(() => {
  document.removeEventListener('mousemove', setXY);
});

</script>
<style scoped lang="less">
@import './assets/style/login.css';
</style>