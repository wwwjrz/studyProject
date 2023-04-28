<!-- 子组件 -->
<template>
  <div>
    <GrandchildComponent />
  </div>
</template>

<script>
import GrandchildComponent from './GrandchildComponent.vue'

export default {
  inject: ['message'],
  components: {
    GrandchildComponent,
  },
}
</script>
