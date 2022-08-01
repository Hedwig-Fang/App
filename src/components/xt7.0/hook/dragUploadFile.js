
import {ref,onBeforeUnmount} from '@vue/composition-api'
const useUplod=()=>{
 const isActive=ref(false);
   const upload=(refDom)=>{
    const {value}=refDom
    const box=value;
    const domDragover=(e)=>{
     e.preventDefault()
    };
    const domDrop=(e)=>{
    e.preventDefault()
    };
    const boxDragover=(e)=>{
      e.preventDefault();
    };
    const boxDragenter=(e)=>{
      isActive.value=true;
    };
    const boxDragleave=(e)=>{
      isActive.value=false;
    };
    const boxDrag=(e)=>{
        isActive.value=false;
        const file=e.dataTransfer.files;
        console.log(file[0])
        //拿到文件
    }
    document.addEventListener('dragover',domDragover , false);//去除默认事件
    document.addEventListener('drop', domDrop, false);//去除默认事件
    box.addEventListener('dragover',boxDragover,false);//去除默认事件
    box.addEventListener('dragenter',boxDragenter,false);//进入盒子
    box.addEventListener('dragleave',boxDragleave,false)//离开盒子
    box.addEventListener('drop',boxDrag,false)
    //绑定事件处理函数
    onBeforeUnmount(()=>{
    document.removeEventListener('dragover',domDragover);//去除默认事件
    document.removeEventListener('drop', domDrop);//去除默认事件
    box.removeEventListener('dragover',boxDragover);//去除默认事件
    box.removeEventListener('dragenter',boxDragenter);//进入盒子
    box.removeEventListener('dragleave',boxDragleave)//离开盒子
    box.removeEventListener('drop',boxDrag)
    })
   }
 return {
   isActive,
   upload
 }
}
export default useUplod