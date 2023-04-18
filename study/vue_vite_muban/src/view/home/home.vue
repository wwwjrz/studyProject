<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="collapse">
        
        <el-menu
          :router="true"
          default-active="2"
          class="el-menu-vertical"
          :collapse="isCollapse"
        >
        <div class="logo" slot="title">
          <img src="../../assets/vue.svg" alt="" />
          <span v-if="!isCollapse" style="white-space:nowrap">项目</span>
        </div>
          <myMenus :data="navList"></myMenus>
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
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import bread from '../../components/Breadcrumb/index.vue'
import myMenus from '../../components/myMenu/abc.vue'
const isCollapse = ref(true)
let navList = reactive([
  { id: 1, name: "项目管理", path: "/projectManagement", icon: "Plus", children: [{ id: '1-1', name: '用户', path: '/', icon: "Plus", children: [] }, { id: '1-2', name: '权限', path: '/', icon: "Plus", children: [] }] },
  { id: 2, name: "用户管理", path: "/administratorManagement", icon: "UserFilled", children: [] },
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
</style>