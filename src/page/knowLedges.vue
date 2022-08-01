<template>
  <div class="knowledge">
    <div class="knowledge-left">
     <KnowledgeNav/>
    </div>
     <div class="knowledge-right">
      <KnowledgeMain/>
     </div>
  </div>
</template>

<script>
import { reactive,toRefs} from '@vue/composition-api';
import KnowledgeNav from './components/knowledgeNav.vue';
import KnowledgeMain from './components/knowledgeMain.vue'
export default {
    name: 'Nnowledge',
    components:{
      KnowledgeNav,
      KnowledgeMain
    },
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
  .knowledge{
    display: flex;
    height: 100%;

  }
  .knowledge-left{
    width: 200px;
    height: 100%;
  }
  .knowledge-right{
    flex: 1;
    height: 100%;
    overflow: auto;
  }
</style>