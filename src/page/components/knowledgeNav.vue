<template>
  <div class="knowledge-nav">
   我是左边的导航
  </div>
</template>

<script>
import { reactive,toRefs} from '@vue/composition-api'
export default {
    name: 'knowledgeNav',
      setup() {
          const state = reactive({

          })
          return {
              ...toRefs(state),
          }

      }
  };
</script>
<style scoped lang='scss'>
</style>