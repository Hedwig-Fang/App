<template>
  <div>
    {{name}}
  </div>
</template>
<script>
export default {
  name:'Item',
  props:{
   name:{
      default:0,
    type:Number,
   }
  }

}
</script>