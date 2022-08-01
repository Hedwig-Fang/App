<template>
  <div>
   <Input ref="input"/>
   <div style="padding-top:30px">
      <Button type="primary" @click="createPad">
      新建word文档
    </Button>
   </div>
  </div>
</template>

<script>
import { reactive,toRefs,ref} from '@vue/composition-api';
import API from '../../api/index';
import {Button,Input} from 'ant-design-vue'
export default {
    name: 'Word',
      components:{
        Button,
        Input
      },
      setup() {
          const state = reactive({
          })
          const input=ref(null);
          const createPad=async()=>{
            const name=input.value.stateValue;
            if(name==''){
              console.log('数据为空')
              return
            }
             const paid= await API.ceatePad(name);

             const url= await API.editPad(paid);
             const  a=document.createElement('a');
             a.target="_blank";
             a.href=url;
             a.click();
             //新建事项
             //打开事项
          }
          return {
              ...toRefs(state),
              input,
              createPad,
          }

      }
  };
</script>
<style scoped lang='scss'>
</style>