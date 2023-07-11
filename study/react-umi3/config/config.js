import { defineConfig } from 'umi';
import routes from './routes';
import theme from './theme';

export default defineConfig({
  // node_modules目录下依赖文件的编译方式
  nodeModulesTransform: {
    type: 'none', // all 慢，兼容性好，none快，兼容性一般
  },
  //路由
  routes: routes,
  //快速编译
  fastRefresh: {}, //快速刷新，可以保持组件状态，同时编辑提供及时反馈
  devServer: {
    port: 8081, // .env里面权限更高一些
    // https:true,//启用https安全访问，于对应协议服务器通讯
  },
  title: 'UMI3', //配置标题
  // favicon:'',//线上地址
  // favicon: '/favicon.icon', //本地地址，图片放到Public文件夹
  //启用按需加载
  dynamicImport: {
    loading: '@/components/loading', //按需加载时指定的loading
  },
  mountElementId: 'app', //指定 react app 渲染到的 HTML 元素 id。
  theme,
});
