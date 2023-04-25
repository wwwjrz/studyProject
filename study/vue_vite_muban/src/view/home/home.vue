<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="collapse">
        <el-menu
          :router="true"
          class="el-menu-vertical"
          :collapse="isCollapse"
          :default-active="menuDefault"
          mode="vertical"
        >
          <div class="logo" slot="title">
            <img src="../../assets/vue.svg" alt="" />
            <span v-if="!isCollapse" style="white-space: nowrap"
              >{{ $t('menus.project') }}
            </span>
          </div>
          <myMenus :data="navList"></myMenus>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="switchMenu">
            <el-icon v-if="!isCollapse" @click="isCollapse = !isCollapse">
              <Fold />
            </el-icon>
            <el-icon v-else @click="isCollapse = !isCollapse">
              <Expand />
            </el-icon>
            <bread :dataList="breadList" />
          </div>
          <div class="userAtcor">
            <el-dropdown>
              <div>
                <img src="../../assets/image/user/headSculpture.jpg" alt="" />
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item icon="Tools" @click="editColor"
                    >修改主题</el-dropdown-item
                  >
                  <el-dropdown-item icon="Tools" @click="drawer = true">
                    修改语言
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view v-slot="{ Component, route }">
            <Transition
              mode="out-in"
              leave-active-class="animate__animated animate__backOutDown"
              enter-active-class="animate__animated animate__backInDown"
            >
              <component :is="Component" :key="route.path" />
            </Transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <el-radio-group v-model="radio1" size="large" @change="radioSelect">
        <el-radio-button label="zh-cn">{{
          $t('menus.Chinese')
        }}</el-radio-button>
        <el-radio-button label="en">{{ $t('menus.English') }}</el-radio-button>
        <el-radio-button label="ja">{{ $t('menus.JapanL') }}</el-radio-button>
      </el-radio-group>
      <el-button type="primary" class="sureLangu" @click="sureLangu"
        >确定</el-button
      >
    </el-drawer>
  </div>
</template>
<script setup>
import { ref, reactive, watch, computed, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import bread from '../../components/Breadcrumb/index.vue'
import myMenus from '../../components/myMenu/abc.vue'

//基础数据
const { locale } = useI18n()
const { proxy } = getCurrentInstance()
const isCollapse = ref(false)
const router = useRouter()
let breadList = ref([])
let menuDefault = ref('')
let drawer = ref(false)
const radio1 = ref(proxy.$lanGuage)
let radios = ref('')

//方法

const editColor = () => {
  let Length = document.documentElement.classList.length
  if (Length < 1) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const radioSelect = (e) => {
  radios.value = e
}

const sureLangu = () => {
  locale.value = radios.value
  localStorage.setItem('lanGuage', radios.value)
  proxy.$openNot('success', '提示', '切换成功')
  drawer.value = false
}

//计算属性
menuDefault = computed(() => {
  return router.currentRoute.value.path
})

//监听
watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    breadList.value = router.currentRoute.value.matched
  },
  { immediate: true }
)

//静态数据
let navList = reactive([
  { id: 0, name: '首页', path: '/index', icon: 'House', children: [] },
  {
    id: 1,
    name: 'element',
    path: '/element',
    icon: 'ElementPlus',
    children: [
      {
        id: '1-1',
        name: '骨架屏',
        path: '/element/skeleton',
        icon: 'Operation',
        children: [],
      },
    ],
  },
  {
    id: 2,
    name: '高德地图',
    path: '/AMAP',
    icon: 'Promotion',
    children: [
      {
        id: '2-1',
        name: '基础功能',
        path: '/AMAP/trajectory',
        icon: 'Position',
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: '案例',
    path: '/case',
    icon: 'Menu',
    children: [
      {
        id: '3-1',
        name: '歌词',
        path: '/case/lyric',
        icon: 'Headset',
        children: [],
      },
    ],
  },
])
</script>
<style lang="less" scoped>
.el-container {
  height: 100vh;
}

.el-menu--collapse {
  height: calc(100% - 70px);
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 240px;
  height: calc(100% - 70px);
}

.switchMenu {
  display: flex;
  align-items: center;
  gap: 30px;

  i {
    font-size: 26px;
    cursor: pointer;
  }
}

.el-aside {
  border-right: solid 1px var(--el-menu-border-color);
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px var(--el-menu-border-color);
}

.el-menu {
  border-right: none;
}

.el-menu::-webkit-scrollbar {
  display: none;
}

.logo {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 70px;
}

.userAtcor {
  img {
    height: 40px;
    border-radius: 4px;
    cursor: pointer;
  }
}
.sureLangu {
  position: fixed;
  bottom: 30px;
  right: 20px;
}
</style>
