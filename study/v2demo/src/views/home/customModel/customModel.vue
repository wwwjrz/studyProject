<template>
  <div>
    <inputs v-model="msg"></inputs>
  </div>
</template>
<script>
import inputs from './input.vue';
export default {
  components:{inputs},
  data(){
    return{
      msg:''
    }
  }
}
</script>
