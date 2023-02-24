<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed">
      <div class="logo">
        <img src="@/assets/logo.png" alt="">
        <span v-if="!collapsed">后台管理系统</span>
      </div>
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <file-outlined />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="a_head">
          <div>
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          </div>
          <div class="userInfo">
            <img class="img" src="@/assets/image/user/headSculpture.jpg" alt="">
          </div>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="page-content" :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        @Jiang 所有
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
    };
  },
});
</script>
<style lang="less" scoped>
.page-content {
  height: calc(100vh - 160px);
}

.ant-layout-footer {
  padding: 10px 50px !important;
}


.logo {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px;
  gap: 5px;

  span {
    color: #fff;
    white-space: nowrap;
    letter-spacing: 0.5px;
  }

  img {
    height: 32px;
  }
}

.a_head {
  display: flex;
  justify-content: space-between;
  padding-right: 16px;

  .userInfo {
    display: flex;
    align-items: center;

    img {
      height: 50px;
      border-radius: 5px;
      display: block;
    }
  }
}


.site-layout .site-layout-background {
  background: #fff;
}

.trigger {
  font-size: 18px !important;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

// [data-theme='dark'] .site-layout .site-layout-background {
//   background: #141414;



//   .logo {
//     height: 32px;
//     background: rgba(255, 255, 255, 0.3);
//     margin: 16px;
//   }

//   .site-layout .site-layout-background {
//     background: #fff;
//   }
// }
</style>