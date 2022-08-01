export const throttle = (func, wait = 1000) => {
         let timeout;
         return function(event) {
           clearTimeout(timeout);
           timeout = setTimeout(() => {
             func.call(this, event);
           }, wait);
         };
       };

       export const  debounce=(fn,time,triggleNow)=>{
     let t=null;
    var debounced= function(){
        const _self=this;
        const args=arguments;
        if(t){
            clearTimeout(t);
            
        }
        if(triggleNow){
            const exec=!t;
            t=setTimeout(()=>{t=null},time)
            if(exec){
                fn.apply(_self,args);
            }
        }
        else{
            t=setTimeout(()=>{
                fn.apply(_self,args)
            },time)
        }
    }
    debounced.reomve=function(){
        clearTimeout(t);
        t=null
    }
    return debounced
 }
 //封装下载二维码的方法
export const downloadQrCode=(blob,fileName,fileSuffix)=>{
  const a = document.createElement("a");
              const href = URL.createObjectURL(blob);
              a.href = href;
              a.download = `${fileName}.${fileSuffix}`;
              a.click();
              URL.revokeObjectURL(href);
}

export const  base64ToBlob =({b64data = '', contentType = '', sliceSize = 512} = {},fileName,fileSuffix)=> {
  return new Promise((resolve, reject) => {
    // 使用 atob() 方法将数据解码
    let byteCharacters = atob(b64data.split(',')[1]);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = [];
      for (let i = 0; i < slice.length; i++) {
          byteNumbers.push(slice.charCodeAt(i));
      }
      // 8 位无符号整数值的类型化数组。内容将初始化为 0。
      // 如果无法分配请求数目的字节，则将引发异常。
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    let result = new Blob(byteArrays, {
      type: contentType
    })
    result = Object.assign(result,{
      // 这里一定要处理一下 URL.createObjectURL
      preview: URL.createObjectURL(result),
      name: `${fileName}.${fileSuffix}`
    });
    resolve(result)
  })
 }
// 格式化时间年月日时分
export const chnagetimeSecond = (time) => {
  if (time !== 0) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return (
      `${year}-${month}-${day} ${hours}:${minute}`
    );
  }
  return '';
};
export const ChangeBytes = (bytes) => {
  if (bytes !== '' && bytes) {
    if (bytes === 0) return '';
    const k = 1024;
    const sizes = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + sizes[i];
  }
  return '';
};


export const myIconFile = (value) => {
  const enclosuretype = [
    {
      doctype: 'ifc',
      name: 'icon-doc-ifc',
    },
    {
      doctype: 'doc',
      name: 'icon-doc-docx',
    },
    {
      doctype: 'docx',
      name: 'icon-doc-docx',
    },
    {
      doctype: 'dwg',
      name: 'icon-doc-dwg',
    },
    {
      doctype: 'mp3',
      name: 'icon-doc-mp3',
    },
    {
      doctype: 'mp4',
      name: 'icon-doc-mp4',
    },
    {
      doctype: 'rfa',
      name: 'icon-doc-rfa',
    },
    {
      doctype: 'pdf',
      name: 'icon-doc-pdf',
    },
    {
      doctype: 'jpg',
      name: 'icon-doc-jpg',
    },
    {
      doctype: 'bmp',
      name: 'icon-doc-jpg',
    },
    {
      doctype: 'jpeg',
      name: 'icon-doc-jpg',
    },
    {
      doctype: 'png',
      name: 'icon-doc-jpg',
    },
    {
      doctype: 'gif',
      name: 'icon-doc-jpg',
    },
    {
      doctype: 'ppt',
      name: 'icon-doc-pptx',
    },
    {
      doctype: 'pptx',
      name: 'icon-doc-pptx',
    },
    {
      doctype: 'rte',
      name: 'icon-doc-rte',
    },
    {
      doctype: 'xls',
      name: 'icon-doc-xsls',
    },
    {
      doctype: 'xlsx',
      name: 'icon-doc-xsls',
    },
    {
      doctype: 'txt',
      name: 'icon-doc-txt',
    },
    {
      doctype: 'rvt',
      name: 'icon-doc-rvt',
    },
    {
      doctype: 'rar',
      name: 'icon-doc-zip',
    },
    {
      doctype: 'zip',
      name: 'icon-doc-zip',
    },
  ];
  if (!(value.resourcesType === 'file')) {
    return 'icon-morenwenjianjia';
  }
  const postFix = value.resourcesSuffix.toLowerCase();
  return enclosuretype.find((value) => value.doctype === postFix)
    ? enclosuretype.find((value) => value.doctype === postFix).name
    : 'icon-doc-unknow';
};