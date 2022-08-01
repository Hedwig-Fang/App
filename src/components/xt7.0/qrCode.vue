<template>
  <div class="code-box">
   <div  class="qrCodeUrl" ref="qrCodeUrl" :style="qrCodeStyle"></div>
  
  </div>
</template>

<script>
import { reactive,toRefs,onMounted,ref,computed} from '@vue/composition-api'
import QRCode  from 'qrcodejs2';
//http://192.168.0.11:8888/HWCollaborationTeamUser/login?goback=aHR0cDovLzE5Mi4xNjguMC4xMTo4ODg4L0hXWFRTaGFyZS94dHZ1ZS9pbmRleF94dC5odG1sIy9tb2RlbFNoYXJlP3NoYXJlSWQ9NWRlNGIxNzA3ODk2NDhjZThiMTFmMmE2ZDgzODQ3MWQmdGVhbUlkPUhXVDE1MDY1NSZzaGFyZVR5cGU9MCZvbmx5TG9naW5TZWxmPXRydWU=
export default {
    name: 'QRCode',
    props:{
      width:{
        default:80,
       type:Number,
      },
      height:{
       default:80,
       type:Number,
      },
      url:{
        default:'',
        type:String,
      }
    },
      setup(props,ctx) {
          const state = reactive({
          })
          const qrCodeUrl=ref(null)
         const  creatQrCode=()=> {//生成二维码的方法

          const qrcode = new QRCode(qrCodeUrl.value, {
         text: 'http://www.hwbim.com/',
         width: props.width,
         height: props.height,
        colorDark: '#000000',
        colorLight: '#ffffff',
         correctLevel: QRCode.CorrectLevel.H
       })
      }
        const qrCodeStyle=computed(()=>`width:${props.width}px;height:${props.height}px`);
          onMounted(()=>{
            creatQrCode()
          })
          return {
              ...toRefs(state),
              qrCodeUrl,
              qrCodeStyle,
          }

      }
    
  }
</script>
<style scoped lang='scss'>
 .code-box{
   cursor: pointer;
 }

</style>

