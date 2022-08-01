<template>
  <div>
   <HwItem
    v-for="(item,index) of list"
    :key="index"
    :name="index"
   />
  </div>
</template>
<script>
  import HwItem from './item.vue'
export default {
  name:'Mains',
  components:{
    HwItem
  },
  data() {
    return {
      list:[],
    }
  },
  created() {
    this.list=Array.from({length:4000});
  },
  mounted() {
  },
  beforeDestroy() {
  },
  destroyed() {
    console.log(this)
  },
}
</script>