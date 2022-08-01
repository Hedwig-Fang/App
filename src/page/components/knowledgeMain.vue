<template>
  <div class="knowledge-nav">
   我是主要内容
  </div>
</template>

<script>
import { reactive,toRefs} from '@vue/composition-api'
export default {
    name: 'knowledgeMain',
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