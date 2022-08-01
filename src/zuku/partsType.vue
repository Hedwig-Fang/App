<template>
  <div class="svg-box">
   <svg>
     <circle  cx="10" cy="10" r="10" :style="{fill:bgColor, stroke:'none', strokeWidth:0}"/>
     <text  x="10" y="11" class="text" style="font-size: 9px; fill: white;">
      {{text}}
    </text>
   </svg>
   
  </div>
</template>

<script>
import { reactive,toRefs} from '@vue/composition-api'
export default {
    name: '',
    props:{
     bgColor:{
       default:'#060606',
       type:String
     },
     text:{
       default:'R',
       type:String
     }
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
.svg-box{
 width: 20px;
 height: 20px;
}
.text{
      text-anchor: middle;
    dominant-baseline: middle;
}
</style>