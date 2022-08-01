<template>
   <div>
    <aside 
     v-for="item of arr" :key="item"
     draggable="true" 
     @dragover="itemDragover($event)"
     @dragstart="itemDragstart($event,item)"
     @dragend="itemDragend($event,item)"
     @dragenter="itemDragenter($event,item)"
      >
     {{item}}
    </aside>
  </div>
</template>

<script>
import { reactive,toRefs,onMounted} from '@vue/composition-api'
export default {
    name: '',
      setup() {
          const state = reactive({
              arr:[1,2,3,4,5,6,7]
          })
          onMounted(()=>{

          })
          let startItem=null;//放置托拽开始的数据
          let endItem=null;//放置托拽进入的数据
          const itemDragover=(e)=>{ 
             e.preventDefault();
             console.log('over')
             e.dataTransfer.dropEffect = 'move';
          }
           const itemDragstart=(e,item)=>{
           startItem=item;
           }
           const itemDragenter=(e,item)=>{
             event.dataTransfer.effectAllowed = 'move';
             console.log('enter')
             if(startItem==item){
               return
             }
             endItem=item;
             const newsortTabs = [...state.arr];
          const startItemIndex = newsortTabs.indexOf(startItem);
          const itemEnterIndex = newsortTabs.indexOf(endItem);
          newsortTabs.splice(itemEnterIndex, 0, ...newsortTabs.splice(startItemIndex, 1));
            state.arr=newsortTabs;
           }
           const itemDragend=(e,item)=>{
            if( endItem==item){
              return
            }
            console.log(state.arr);
            startItem=null;
            endItem=null;
           }
          return {
              ...toRefs(state),
              itemDragover,
              itemDragstart,
              itemDragend,
              itemDragenter,
          }

      }
  };
</script>
<style scoped lang='scss'>
  aside{
    width: 200px;
    background: palegreen;
    margin-bottom: 20px;
    font-size: 40px;
    cursor: move;
    text-align: center;
  }
</style>