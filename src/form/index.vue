
<script>
import formData from './data.json'
import registerConfig from './index';
import editorComponent from './editorComponent.vue'
export default {
  components:{
    editorComponent
  },
  data(){
    return {
      msg:123,
      formData,
      
    }
  },
  created() {
    this.startDraginfo={}
          window.form=this
  },
  methods: {
    downLoad(){
      const str=JSON.stringify(this.formData)
      console.info(str)
       const href=URL.createObjectURL(new Blob([str],{type:'application/json'}));
       const a=document.createElement('a');
       a.href=href;
       a.download='test.json';
       a.click();
    },
    dragStart(e,component){
      this.currentComponents=component;
      this.$refs['editBox'].addEventListener('dragenter',this.dragenter);
      this.$refs['editBox'].addEventListener('dragover',this.dragover)
      this.$refs['editBox'].addEventListener('dragleave',this.dragleave)
      this.$refs['editBox'].addEventListener('drop',this.drop)
    },
    dragenter(e){
     e.dataTransfer.dropEffect='move'
    },
    dragover(e){
    e.preventDefault();
    
    },
    dragleave(e){
      e.dataTransfer.dropEffect='node'
    },
    clearFocus(){
     this.formData.components.forEach(res=>{
      res.focus=false;
     })
    },
    drop(e){
     const comInfo={
       label: this.currentComponents.label,
      type:this.currentComponents.key,
      top:e.offsetY,
      left:e.offsetX,
      alignCenter:true,
     }
     console.info(e.target)
     console.info(comInfo)
      this.formData.components.push(comInfo)
       this.currentComponents=null;
    },
    mousemove(e){
      const {left,top}=this.$refs['editBox'].getBoundingClientRect()
       const {clientX,clientY}=e;
       //const {left:oldLeft,top:oldTop}=component;
      //  const {height,width}=this.currentBlockComponents
       this.currentBlockComponents.left=clientX-left-this.offsetX;
       this.currentBlockComponents.top=clientY-top-this.offsetY;
      // console.info(clientX,clientY,left,top)
    },
    mouseup(e){
     document.removeEventListener('mousemove',this.mousemove);
     document.removeEventListener('mouseup',this.mouseup)
    },
    blockOnMouseDown(e,component){

       e.preventDefault();
       e.stopPropagation();
      const {offsetX,offsetY}=e;
      this.offsetX=offsetX;
      this.offsetY=offsetY;
       if(e.shiftKey){
       component.focus=!component.focus;
       }else{
       if(!component.focus){
        this.clearFocus();
         component.focus=true;
       }else{
        component.focus=false;
       }
       }
       this.currentBlockComponents=component;
       document.addEventListener('mousemove',this.mousemove);
         document.addEventListener('mouseup',this.mouseup)
    }
  },
  render(h){
    return(<div class="form">
            <aside class="left">
             {registerConfig.componentsList.map(res=>(
              <div class="left-item" draggable={true}
              onDragstart={(e)=>this.dragStart(e,res)}
              >
              {res.prview(h)}
             </div>))}
            </aside>
            <main class="editBox" ref="editBox">

             {this.formData.components.map(res=>(
              <editorComponent 
              blockOnMouseDown={this.blockOnMouseDown}
              info={res} 
              renderCom={registerConfig.componentsMap[res.type]} 
               
             />)
             )}
            </main>
           <aside class="right">

           </aside>
           </div>)
  }
}
</script>


<style lang="scss" scoped>
.form{
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
    grid-template-columns: 300px auto 500px;
    grid-gap: 0 16px;
    .left{
    background: darkcyan;
     padding: 20px 0;
    }
    .editBox{
    background: beige;
    }
    
    .right{
     background: blanchedalmond
    }
}
.left-item{
  cursor: move;
  user-select: none;
  width: 200px;
  margin:  auto;
  position: relative;
  padding: 20px;
   display: flex;
   justify-content: center;
   align-items: center;
  border: 1px dotted #ccc; 
  margin-bottom: 20px;
  *{
    cursor: move;
  }
}
.left-item::after{
   content:'';
   position: absolute;
   left: 0;
   top: 0;
   bottom: 0;
   right: 0;
}
.editBox{
  position: relative;
}
</style>