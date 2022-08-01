<script>
export default {
  props:{
    info:{
      default:()=>({}),
      type:Object,
    },
    renderCom:{
        default:()=>{},
      type:Object,
    },
    blockOnMouseDown:{
        default:()=>({}),
      type:Function,
    }
  },
  computed:{
   customStyle(){
     const style=`left:${this.info.left}px;top:${this.info.top}px`;
    return style
   }
  },
  mounted() {
    const {offsetWidth,offsetHeight}=this.$refs['edit-item'];
   if(this.info.alignCenter){
    this.info.left=this.info.left-offsetWidth/2;
    this.info.top=this.info.top-offsetHeight/2;
    this.info.alignCenter=false;
   }
    this.info.width=offsetWidth;
    this.info.height=offsetWidth
   this.$set(this.info,'focus',false);
  
  },
  methods: {
  },
  render(h) {
    return (
    <div  onMousedown={(e)=>this.blockOnMouseDown(e,this.info)} class={{'edit-item':true,'edit-item-focus':this.info.focus}} style={this.customStyle} ref="edit-item">
     {this.renderCom.render(h)}
    </div>)
  },
}
</script>
<style lang="scss" scoped>
.edit-item{
  position: absolute;
  cursor: move;
}
.edit-item:after{
  content:'';
   position: absolute;
   left: 0;
   top: 0;
   bottom: 0;
   right: 0;
  
}
.edit-item-focus:after{
  border: 1px dashed red;
}
</style>
