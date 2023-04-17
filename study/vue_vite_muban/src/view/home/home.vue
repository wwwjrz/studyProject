<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="collapse">
        <div class="logo">
          <img src="../../assets/vue.svg" alt="" />
          <span v-if="!isCollapse">项目</span>
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <template #title><span>Group One</span></template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><span>item four</span></template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="switchMenu">
            <el-icon v-if="!isCollapse" @click="isCollapse = !isCollapse"
              ><Fold
            /></el-icon>
            <el-icon v-else @click="isCollapse = !isCollapse"
              ><Expand
            /></el-icon>
            <bread />
          </div>
          <div class="userAtcor">
            <el-dropdown>
              <div>
                <img src="../../assets/image/user/headSculpture.jpg" alt="" />
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item icon="Tools">修改主题</el-dropdown-item>
                  <el-dropdown-item icon="Tools"> 修改语言 </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <Transition>
          <router-view></router-view>
          </Transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import bread from '../../components/Breadcrumb/index.vue'
const isCollapse = ref(true)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
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
</style>