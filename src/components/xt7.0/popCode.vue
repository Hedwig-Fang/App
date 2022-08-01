<template>
   <div class="pop-box">
  <Popover>
    
     <QRCode  
    :width="20"
    :height="20"
    url="http://123.57.159.18:3002/"
  />
 
   <template slot="content">
     <div class="popcont">
       <div class="pop-inner">
         123
       </div>
    <QRCode  
    :width="64"
    :height="64"
    url="http://123.57.159.18:3002/"
  />
  </div>
   </template>
  </Popover>
  </div>
</template>

<script>
import { reactive,toRefs} from '@vue/composition-api';
import QRCode from './qrCode';
import {Popover} from 'ant-design-vue';
export default {
    name: 'PopCode',
    components:{
      Popover,
     QRCode,
     
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
.pop-box{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.popcont{
  overflow: hidden;
  width: 64px;
  border-radius: 2px;
  height: 64px;
  position: relative;
  cursor: pointer;
  .pop-inner{
    color: white;
    z-index: 10;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
     width: 64px;
    height: 64px;
  }
  &:hover{
    .pop-inner{
           background: rgba(0, 0, 0, 0.5);
    }
    ::v-deep .code-box {
       filter: blur(12px);
       img{
          transform: scale(8,8);
          transform-origin:center center;

        }
    }
  }
}
</style>