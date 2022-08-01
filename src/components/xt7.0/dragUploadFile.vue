<template>
  <div  :class="['box-file', isActive?'box-active':'']" ref="fileBox">
  123
  </div>
</template>

<script>
import { ref,onMounted} from '@vue/composition-api';
import useUplod from './hook/dragUploadFile'
export default {
    name: '',
      setup() {
        const {isActive,upload} =useUplod();
        const fileBox=ref(null);
          onMounted(()=>{
            upload(fileBox);//上传文件
          })
          return {
              isActive,
              fileBox
          }
      }
  };
</script>
<style scoped lang='scss'>
  .box-file{
    width: 200px;
    height: 300px;
  }
  .box-active{
      border: 2px dotted red;
    opacity: .5;
  }
</style>