—— mock //mock 文件所在目录，基于 express
—— src //源码目录
|—— payouts/index.js //全局布局
|—— pages //页面目录，里面的文件即路由
|—— models //数据流
|—— wrappers //权限管理
|—— app.js //运行时配置文件
|—— global.css //约定的全局样式文件，自动引入,也可以用 less
|—— global.js //k 可以在这里加入 polyfill
—— editorconfig //编辑器做一些高亮支持
—— gitignore //上传到仓库时，排除掉不需要上传的文件
—— umirc.ts //umi 配置，同 config/config.js，二选一
—— dist // 默认的 build 输出目录
—— public //变通的数据资源目录和一些无需打包的资源
—— .env //环境变量
