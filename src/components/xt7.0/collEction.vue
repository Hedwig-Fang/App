<template>
  <div>
   <MyIcon :type="item.isCollEction?'icon-Group44':'icon-12'" class="icon-coll" @click="changeCollection"/>
  </div>
</template>

<script>
  //标识有没有选中星星
import { reactive,toRefs} from '@vue/composition-api'
import {MyIcon} from '../../assets/myIcon';
export default {
    name: 'CollEction',
    components:{
       MyIcon
    },
     props:{
      item:{
        type:Object,
        default:()=>({
          isCollEction:false
        })
      }
     },
      setup(props,ctx) {
          const state = reactive({

          })
          const changeCollection=()=>{

            ctx.emit( 'changeCollection', props.item)
          }
          return {
              ...toRefs(state),
              changeCollection
          }

      }
  };
</script>
<style scoped lang='scss'>
  .icon-coll{
    color: #FA9600;
    font-size: 18px;
    cursor: pointer;
  }
</style>