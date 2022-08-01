
<template>
  <div class="dow-box">
  <QrCode :url="url"/>
  <span style="padding-top:8px">手机扫码查看</span>
  <Button type="link" @click="downCode">下载二维码</Button>
  </div>
</template>

<script>
  import QrCode from './qrCode'
import {ref} from '@vue/composition-api';
import {Button} from 'ant-design-vue'
 import {downloadQrCode,base64ToBlob } from '../../assets/common.js'
export default {
    name: '',
    components:{
      QrCode,
      Button
    },
      setup() {
         const url=ref('http://123.57.159.18:3002/test.jpg');
        async function downCode  (){
            console.log('下载二维码');
             fetch('http://123.57.159.18:3002/test.jpg').then(res=>res.blob().then(blob=>{
              downloadQrCode(blob,'test','png')
             }))
        //  const blobData=  await base64ToBlob( {b64data: document.querySelector('img').src, contentType: 'image/png'},'test','png');
        //  downloadQrCode(blobData,'test','png')
          }
          return {
              downCode,
              url
          }

      }
  };
</script>
<style scoped lang='scss'>
  .dow-box{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
