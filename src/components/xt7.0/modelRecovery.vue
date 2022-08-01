<template>
  <div class="recover-waper">
    <MyIcon type="icon-Group41" class="myicon-recover" @click="showModal"/>
   <Modal
   v-model="isShow"
   title="模型回收站"
   @ok="closeModal"
   :footer="null"
   :width="740"
   dialogClass="recover"
   :afterClose="modalClose"
   >
    <div class="cont">
      <span class="arr-length">共 {{recoverArr.length}} 个文件</span>
      <section style="padding-top:10px">
       <Table
         :columns="arrColumn"
           :data-source="recoverArr"
           :pagination="false"
           :row-key="record => record.modelId"
           :loading="loading"
   >
    <div :slot="arrColumn[0].dataIndex" slot-scope="text,recoed" class="modelName">
      <aside class="imgName">
       <img :src="recoed.img|| DefaultImg" >
       <span class="modelText">{{text}}</span>
      </aside>
      <aside class="btn-name">
          <Popconfirm okType="danger" ok-text="确定" cancel-text="取消" @confirm="deleModel(recoed.id)">
          <template slot="title">
            <aside class="del-title">彻底删除</aside>
            <span>
              删除后文件将不可恢复，确认要删除吗
            </span>
          </template>
        <Button type="link">
         彻底删除
        </Button>
        </Popconfirm>
        <Button type="link" class="relod" @click="withdRaw(recoed.id)">
          恢复
        </Button>
      </aside>
    </div>
    <div :slot="arrColumn[1].dataIndex" slot-scope="text">
     <span>{{ChangeBytes(text)}}</span>
    </div>
    <div :slot="arrColumn[3].dataIndex" slot-scope="text">
       <span class="text">{{chnagetimeSecond(text)}}</span>
    </div>
  
   </Table>
      </section>
       
    </div>
   </Modal>
  </div>
</template>

<script>
import {MyIcon} from '../../assets/myIcon';
import { reactive,toRefs, ref} from '@vue/composition-api';
import {Modal,Table,Button,Popconfirm} from 'ant-design-vue';
import API from '../../api/index';
import DefaultImg from '../../assets/defaultImg.png'
import {chnagetimeSecond,ChangeBytes} from '../../assets/common';
//需要改动的地方
// 1 MyIcon API DefaultImg  chnagetimeSecond,ChangeBytes 的引入路径要改   ChangeBytes在common里面没有
//2 需要修改 API.getRecoverArr的请求地址  还有就是 arrColumn的字段
// 3删除的时候传模型id就该deleModel 传id就不该
// 4 icon的图标需要改
//组件说明
// arrColumn 存放表格的头部 静态不需要响应式
// withdRawArry用来存放是不是需要在模态框关闭的时候刷新模型列表   值为恢复的模型id
// recoverArr//列表的数据
// isShow 是不是显示模态框
//showModal 显示模态框 
// closeModal关闭模态框暂时不用
// getRecoverArr请求api
// deleModel 删除 withdRaw恢复
//modalClose 模态框关闭的回调  判断是不是需要刷新模型列表
export default {
    name: 'ModelRecovery',
    components:{
      MyIcon,
      Modal,
      Popconfirm,
      Table,
      Button
    },
      setup(props,ctx) {
        const arrColumn=[
          {
          title: '名称',
          dataIndex: 'modelName',
          width:266,
          scopedSlots: {
          customRender: 'modelName',
          },
     },
        {
        title: '大小',
        dataIndex: 'modelSize',
         width:100,
         scopedSlots: {
        customRender: 'modelSize',
          },
     },
        {
        title: '删除者',
        dataIndex: 'delePerson',
        width: 77,
         scopedSlots: {
        customRender: 'delePerson',
          },
     },
        {
        title: '删除时间',
        dataIndex: 'deleTime',
        width:160,
         scopedSlots: {
        customRender: 'deleTime',
          },
     },
        {
        title: '有效期',
        dataIndex: 'haveTime',
         width:80,
         scopedSlots: {
        customRender: 'haveTime',
          },
     },
        ];//放置表头的名称
         let withdRawArr=[];//存储恢复的id判断是不是需要刷新模型列表
          const state = reactive({
               recoverArr:[],
              loading: {
              spinning: true,
              },
          });
          const isShow=ref(false)//是不是显示模态框;
          const showModal=()=>{
            //显示modal
            isShow.value=true;
            withdRawArr=[];
            getRecoverArr()
          }

          const closeModal=()=>{
            //关闭modal
            isShow.value=false;
          }
          const getRecoverArr=()=>{//获取数据
              state.loading.spinning=true;
            API.getRecoverArr().then(res=>{
              state.recoverArr=res;
               state.loading.spinning=false
            })
          }
          const deleModel=(id)=>{//删除
            console.log(id)
            const index=state.recoverArr.findIndex(res=>res.id==id);
            state.recoverArr.splice(index,1);
            return
            API.deleModel(id).then(res=>{//删除待对接
               console.log('删除成功')
            })
          }
          //撤回
          const withdRaw=(id)=>{
            const index=state.recoverArr.findIndex(res=>res.id==id);
            state.recoverArr.splice(index,1);
            withdRawArr.push(id)
            return
             API.withdRaw(id).then(res=>{//删除待对接
               console.log('恢复成功')
            })
          };
          //模态框关闭后的回调
          const modalClose=()=>{
            if(withdRawArr.length>0){//如果有恢复的就是更新列表
                ctx.emit('createInit')
            }
          }
          return {
              ...toRefs(state),
              isShow,
              closeModal,
              showModal,
              arrColumn,
              DefaultImg,
              chnagetimeSecond,
              ChangeBytes,
              deleModel,
              withdRaw,
              modalClose
          }

      }
  };
</script>
<style scoped lang='scss'>
  .myicon-recover{
    color: #808695;
    font-size: 24px;
    cursor: pointer;
  }
   ::v-deep .recover{
   .ant-modal-body{
      padding: 0;
   }
   .ant-table-thead > tr > th{
     background: white;
   }
  }
  ::v-deep .ant-table-row{
    height: 65px;
    &:hover{
      .btn-name{
          display: block;
      }
      .imgName{
     width: calc(100% - 98px);
    }
    }
  }
  .cont{
  height: 268px;
  overflow: auto;
  padding: 10px 20px;
  }
  .arr-length{
    font-size: 14px;
    color: #9EA7B4;
    margin-bottom: 10px;
  }
  .modelName{
    display: flex;
    align-items: center;
    width: 234px;
    height: 32px;
    justify-content: space-between;
    aside{
      display: flex;
      align-items: center;
      img{
        width: 20px;
        height: 20px;
        border-radius: 4px;
        object-fit: cover;
      }
      .modelText{
        padding-left: 10px;
        display: block;
        width: calc(100% - 30px);
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .ant-btn-link{
      padding: 0;
    }
    .relod{
      padding-left: 10px;
    }
    .imgName{
     width: 100%;
    }
    .btn-name{
      width:98px;
      display: none;
    }
  }
  .del-title{
    color: #000000;
    font-weight: bold;
    font-size: 16px;
  }
</style>