<template>
  <el-container>
    <el-aside width="collapse">
      <el-menu
        :router="true"
        mode="vertical"
        :collapse="isCollapse"
        class="el-menu-vertical"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span slot="title">vue</span>
          </template>
          <el-menu-item index="/injectComponent">inject/provide注入</el-menu-item>
          <el-menu-item index="/customModel">自定义v-model</el-menu-item>
        </el-submenu>
        
      </el-menu>
    </el-aside>
    <el-main>
      <div class="anniu">
        <i
          class="el-icon-s-unfold"
          v-if="isCollapse"
          @click="isCollapse = !isCollapse"
        ></i>
        <i class="el-icon-s-fold" v-else @click="isCollapse = !isCollapse"></i>
      </div>
      <div class="int_container">
        <router-view />
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
    }
  },
}
</script>
<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.anniu {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 28px;
  cursor: pointer;
}
::v-deep .el-submenu__title {
  text-align: left;
}
.el-menu {
  height: 100%;
  text-align: center;
}
.el-container {
  height: calc(100vh - 16px);
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  .int_container {
    padding: 20px;
  }
}
</style>
