<template>
  <div class="group-waper">
    <section class="item-box">
     <aside :class="['iconBox',isActive==0?'currentCollection':'']"
     @click="changeGroup(0)"
     >
    <MyIcon type="icon-12" class="waper-icon"/>
      </aside>
        <aside 
        v-for="item of projectGroupArr"
        :key="item.id"
        :class="['item',item.id==isActive?'currentItem':'']"
        @click="changeGroup(item.id)"
        >
          <span class="text">{{item.gruopName}}</span>
          <span class="num">{{item.id}}</span>
      </aside>
    </section>
    <div class="edit">
    <Button type="link" @click="editGroup">管理</Button>
    </div>
  </div>
</template>

<script>
import { reactive,toRefs} from '@vue/composition-api';
import {MyIcon} from '../../assets/myIcon';
import {Button} from 'ant-design-vue'
export default {
    name: 'ProjectGroup',
    components:{
      MyIcon,
      Button
    },
    props:{
     projectGroupArr:{
       type:Array,
       default:()=>[]
     },
     isActive:{
       type:Number,
       default:0//表示选中收藏 1表示全部
     }
    },
      setup(props,ctx) {
          const state = reactive({

          })
          //切换分组
          const changeGroup=(id)=>{
             ctx.emit('changeGroup',id)
          }
           const editGroup=()=>{
             console.log('管理分组')
           }
          return {
              ...toRefs(state),
              changeGroup,
              editGroup
          }

      }
  };
</script>
<style scoped lang='scss'>
  .iconBox{
    cursor: pointer;
    width: 60px;
    height: 32px;
    border-radius: 16px;
    margin-right: 16px;
    margin-bottom: 16px;
    padding: 6px 20px;
     background: #EEF0F6;
    .waper-icon{
      font-size: 20px;
    }
  
  }
  .currentCollection{
    background: rgba(250, 150, 0, 0.1);
    .waper-icon{
      color: #FA9600;
    }
  }
  .group-waper{
    display: flex;
    justify-content: space-between;
  }
  .ant-btn-link{
    padding: 0;
  }
  .item-box{
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 20px );
  }
  .item{
    cursor: pointer;
    position: relative;
    width: 60px;
    height: 32px;
    border-radius: 16px;
     background: #EEF0F6;
     text-align: center;
      margin-right: 16px;
    margin-bottom: 16px;
     line-height: 32px;
     .num{
       position: absolute;
       top: -6px;
       right: -6px;
       display: block;
       width: 20px;
       height: 20px;
       border-radius: 50%;
       background: #808695;
       line-height: 20px;
       color: white;
     }
     .text{
      font-size: 14px;
      color: #808695;
    }
  }
  .currentItem{
    .text{
      font-size: 14px;
      color: #2D4FCC;
    }
    .num{
      background: #2D4FCC;
    }
  }
</style>