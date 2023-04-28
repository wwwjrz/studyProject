<template>
  <div>
    <ChildComponent />
    <el-button type="primary" @click="message = '123'">修改</el-button>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue'

export default {
  provide() {
    return {
      message: this.message,
    }
    // message: 'Hello from ParentComponent',
  },
  components: {
    ChildComponent,
  },
  data() {
    return {
      message: 'Hello from ParentComponent',
    }
  },
}
</script>
