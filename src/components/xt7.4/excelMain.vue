<template>
  <div class="excel-box">
    <div class="button-box">
   
    <Button @click="dowloadExcelFile">
      导出
    </Button>
    </div>
    <div id="excel-cont" class="excel-cont">
    </div>
  </div>
</template>

<script>
import { reactive,toRefs,onMounted,getCurrentInstance} from '@vue/composition-api';
import useCreateExcel from './hook/index.js';
import {Button} from 'ant-design-vue';
export default {
    name: 'ExcelMain',
    components:{
      Button
    },
      setup() {
         const {createExcel,getOptions,uploadFile,dowloadExcelFile} =useCreateExcel();
        const state = reactive({
          })
          onMounted(()=>{
            const{wbId,fileName}=getCurrentInstance().proxy.$route.query;
            const options=getOptions(wbId,fileName);//获取配置
            createExcel(options)//创建表格
          })
          return {
              ...toRefs(state),

              dowloadExcelFile,
          }

      }
  };
</script>
<style scoped lang='scss'>
.excel-box{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
  .excel-cont{
    height:calc(100% - 50px);
  }
  .button-box{
    height: 50px;
  }
    .excel-cont ::v-deep .luckysheet_info_detail_back{
    display: none;
  }
   .excel-cont ::v-deep .luckysheet-share-logo{
    display: none;
  }
</style>