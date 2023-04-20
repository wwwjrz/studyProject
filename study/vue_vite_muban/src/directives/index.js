import resize from './numResize';

export default {
	install(app) {
		app.directive('resize', resize);  // margin-top -5px 动画
		// Vue.directive('enlarge', enlarge);  // 变大 动画
	}
}