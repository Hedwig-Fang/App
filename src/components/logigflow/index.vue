<template>
  <div class="wapper">
    <Button @click="exportData">导出bpmn</Button>
    <div class="panel">
     <NodePanel :lf="lf" />
    </div>
    <div class="view"></div>
  </div>
</template>

<script>
import LogicFlow from '@logicflow/core'
import "@logicflow/core/dist/style/index.css";
import '@logicflow/extension/lib/style/index.css'
import {BpmnXmlAdapter,BpmnElement } from '@logicflow/extension';
import { reactive,toRefs,onMounted} from '@vue/composition-api';
import registeNode from './registeNode'
import NodePanel from './nodePanel.jsx'
import {Button} from 'ant-design-vue'
import Object from '../editor/viewComponents/Object';
export default {
    name: '',
    components:{
      NodePanel,
      Button
    },
      setup() {
          const state = reactive({
           lf:{}
          })
          const createLf=()=>{
              const config = {
  stopScrollGraph: true,
  stopZoomGraph: true,
  grid: {
    size: 10,
    visible: true,
    type: 'mesh',
    config: {
      color: '#DCDCDC',  // 设置网格的颜色
    }
  },
  keyboard: { enabled: true },
             }
             LogicFlow.use(BpmnElement);
              LogicFlow.use(BpmnXmlAdapter);
            
           state.lf = new LogicFlow({
          ...config,
          container: document.querySelector('.view') 
          });
          window.lf=state.lf;
          //注册自定义节点
          registeNode(state.lf);
          const data={
           nodes: [
           {
           type: 'submit',
          x: 100,
          y: 100,
           // text:'提交节点'
         },
       {
         type: 'end',
         x: 800,
          y: 100,
          // text:'提交节点'
       },
  ]
  
}
          state.lf.render(data)

          }
      const exportData=()=>{
       const xmlData=state.lf.getGraphData();
       console.info( typeof xmlData)
       const blob=new Blob([xmlData]);
       const url=URL.createObjectURL(blob);
       const a=document.createElement('a');
       a.href=url;
       a.download=`test.xml`;
      a.click();
     }
          onMounted(()=>{
            createLf()
          })
          return {
              ...toRefs(state),
              exportData
          }

      }
  };
</script>
<style scoped lang='scss'>
.wapper{
  height: 100%;
}
.panel{
  height: 40px;

}
.view{
  height: calc(100% - 40px);

}
</style>