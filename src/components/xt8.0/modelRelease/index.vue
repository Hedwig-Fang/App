<template>
  <div class="release-box">
   <section class="release-box-left">

   </section>
    <section class="release-box-right">
     
    </section>
  </div>
</template>

<script>
import { reactive,toRefs} from '@vue/composition-api'
export default {
    name: 'ModelRelease',
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
.release-box{
  height: 100%;
  overflow: hidden;
  .release-box-left{
    height: 100%;
    overflow: overlay;
  }
}
</style>