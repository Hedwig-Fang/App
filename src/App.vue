<template>
 <div class="box">
  <From v-if="false"/>
  <div class="btn"> 
  <Button>表单设计</Button> 
    <Button>流程设计</Button> 
  </div>
  <div class="main">
     <router-view></router-view>
  </div> 
 </div>
</template>
<script>
import From from './form/index.vue'
import {Button} from 'ant-design-vue'
// import { createFormEditor } from '@bpmn-io/form-js';
    export default {
      components:{
        From,
        Button
      },
        data () {
            return {
            
          
            }
        },
          mounted() {
            this.createForm();
          },
        methods: {
       async createForm(){
//       const schema = {
//   "schemaVersion": 1,
//   "exporter": {
//     "name": "form-js",
//     "version": "0.1.0"
//   },
//   "components": [
  
//   ],
//   "type": "default"
// }
  
// const container = document.querySelector('.box');

//       createFormEditor({
//         container,
//         schema
//       }).then(res=>{
//        window.FormEditor=res;
//       })
        }
        }
    }
</script>
<style lang="scss" scoped>
  .box{
    height: 100vh;
    width: 100vw;
  }
  .btn{
    display: flex;
    height: 40px;
  }
  .main{
     height: calc(100% - 40px);
  }
</style>