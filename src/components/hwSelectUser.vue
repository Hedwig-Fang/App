<template>
<div>
  <aside v-for="item of [1,2,3]" :key="item" @click="show(item)">{{item}}</aside>
</div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    show: Function,
  }
}
</script>

<style lang="scss" scoped>
div {
  color: red;
  position: absolute;
  z-index: 100;
}

aside {
  cursor: pointer;
}
</style>
