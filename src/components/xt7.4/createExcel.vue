<template>
 <div style="width: 600px;">
   <Input ref="input"/>
   <div style="padding-top:30px">
      <Button type="primary" @click="createExcel">
      新建excel文档
    </Button>
     <Button  class="uplaod">
      导入
      <input type="file" @change="uploadFile" class="file">
    </Button>
   </div>
  </div>
</template>

<script>
import { reactive,toRefs,ref} from '@vue/composition-api';
import API from '../../api/index';
import {Button,Input} from 'ant-design-vue';
import router from '../../router/index';
export default {
    name: 'Create',
    components:{
      Button,
        Input
    },
      setup() {
          const state = reactive({
          })
             const input=ref(null);
          const createExcel=()=>{
            const name=input.value.stateValue;
            API.ceateExcel(name).then(res=>{
              router.push({path:'/excelMain',query:{wbId:res,fileName:name}});
              //
            },err=>{
               router.push({path:'/excelMain',query:{wbId:1111,fileName:name}});
            })
          }
            //处理上传
     function uploadFile(e){
   //倒入数据
       const file=e.target.files[0];
       LuckyExcel.transformExcelToLucky(file,(exportJson, luckysheetfile)=>{
         console.log(exportJson.sheets,exportJson.info.name)
         const name=exportJson.info.name.substring(0,exportJson.info.name.lastIndexOf('.'));
         const data=JSON.stringify(exportJson.sheets);
         API.uploadExcelData(name,data).then(res=>{
            router.push({path:'/excelMain',query:{wbId:res,fileName:name}});
         },err=>{
       
         })

       })
     }
          return {
              ...toRefs(state),
              createExcel,
              input,
              uploadFile
          }

      }
  };
</script>
<style scoped lang='scss'>
.uplaod{
    position: relative;
    .file{
      position: absolute;
      opacity: 0;
      display: block;
      width: 63px;
      height: 32px;
      left: 0;
      top: 0;
      font-size: 0;
      cursor: pointer;
    }
  }

</style>