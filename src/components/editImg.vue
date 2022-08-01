<template>
<div>
  <section class="box" ref="box">
    <canvas ref="canvas" width="400" height="400"></canvas>
  </section>
  <aside>
    <input v-model="color" type="color" name="color" id="color">
    <button @click="jiantou">箭头</button>
    <button @click="wenziClick">文字</button>
    <button @click="huabiClick">画笔</button>
    <button @click="Back">撤回</button>
    <button @click="clear">清除</button>
    <button @click="addImg">保存</button>
  </aside>
  <button @click="getbase">获取base64</button>
</div>
</template>

<script>
function cutImageBase64(base64, w, callback) {
  var newImage = new Image();
  var quality = 0.6; //压缩系数0-1之间
  newImage.src = base64;
  newImage.setAttribute("crossOrigin", 'Anonymous'); //url为外域时需要
  var imgWidth, imgHeight;
  newImage.onload = function () {
    imgWidth = this.width;
    imgHeight = this.height;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    if (Math.max(imgWidth, imgHeight) > w) {
      if (imgWidth > imgHeight) {
        canvas.width = w;
        canvas.height = w * imgHeight / imgWidth;
      } else {
        canvas.height = w;
        canvas.width = w * imgWidth / imgHeight;
      }
    } else {
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      quality = 0.6;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
    var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
    // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
    while (base64.length / 1024 > 150) {
      quality -= 0.01;
      base64 = canvas.toDataURL("image/jpeg", quality);
    }
    // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
    while (base64.length / 1024 < 50) {
      quality += 0.001;
      base64 = canvas.toDataURL("image/jpeg", quality);
    }
    callback(base64); //必须通过回调函数返回，否则无法及时拿到该值
  }
}
import imgSrc from '../assets/timg.jpg'
export default {
  name: 'Editimg',
  data() {
    return {
      color: '#000',
      type: null,
      flag: false,
      canvasHistory: [],
    }
  },
  mounted() {
    this.canvas = this.$refs['canvas'];
    this.ctx = this.canvas.getContext('2d');
    this.box = this.$refs['box'];
    this.drawImg(imgSrc);
    this.canvas.addEventListener('mousedown', this.canvasMousedown.bind(this))
    this.canvas.addEventListener('mouseup', this.canvasMouseup.bind(this));
    this.canvas.addEventListener('mousemove', this.canvasMousemove.bind(this));
  },
  methods: {
    drawArrow(ctx, fromX, fromY, toX, toY, theta, headlen, width, color) {
      theta = typeof (theta) != 'undefined' ? theta : 30;
      headlen = typeof (theta) != 'undefined' ? headlen : 10;
      width = typeof (width) != 'undefined' ? width : 1;
      color = typeof (color) != 'color' ? color : '#000';

      // 计算各角度和对应的P2,P3坐标
      var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
      ctx.save();
      ctx.beginPath();
      var arrowX = fromX - topX,
        arrowY = fromY - topY;
      ctx.moveTo(arrowX, arrowY);
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      arrowX = toX + topX;
      arrowY = toY + topY;
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(toX, toY);
      arrowX = toX + botX;
      arrowY = toY + botY;
      ctx.lineTo(arrowX, arrowY);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
      ctx.restore();
    },
    jiantou() {
      this.type = 'jiantou'
    },
    //canvas的鼠标按下的事件
    canvasMousedown(e) {
      this.flag = true;
      const x = e.pageX;
      const y = e.pageY;
      this.x = x;
      this.y = y;
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.color
      this.ctx.moveTo(x, y)
      if (this.type == 'huabi') {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color
        this.ctx.moveTo(x, y)
      } else if (this.type == 'text') {
        this.drawText(x, y)
      } else {

      }
    },
    //处理文字
    drawText(x, y) {
      const input = document.createElement('input');
      input.type = 'text';
      input.focus();
      const styleText = `width:100px;position:absolute;left:${x}px;top:${y}px;background: none;border: 1px solid red;outline: none
        ;color:${this.color};
        `
      input.setAttribute('style', styleText);
      this.box.appendChild(input);
      input.classList.add('input')
      // input.focus();
      const {
        ctx,
        color
      } = this;
      input.onblur = () => {
        input.remove();
        ctx.fillStyle = color;
        ctx.font = "16px Microsoft Yahei";
        // ctx.textAlign = 'center';
        // ctx.textBaseline = 'middle';
        ctx.fillText(input.value, x, y + 18);
        this.canvasHistory.push(this.canvas.toDataURL());

      }
    },
    //鼠标的移动事件
    canvasMousemove(e) {
      if (this.flag) {
        switch (this.type) {
          case 'huabi':
            this.drawLine(e);
            break;
          case 'jiantou':
            break;

          default:
            break;
        }
      } else {}
    },
    drawJian(e) {
      this.drawArrow(this.ctx, this.x, this.y, e.pageX, e.pageY, 30, 30, 5, this.color)

    },
    // 鼠标的抬起事件
    canvasMouseup(e) {
      this.flag = false;
      if (this.type == 'jiantou') {
        this.drawJian(e)
      }
      this.canvasHistory.push(this.canvas.toDataURL());
    },
    setweizhi(x, y) {
      const obj = document.querySelectorAll('.box')[0].getBoundingClientRect();
      return {
        x: x - obj.x,
        y: y - obj.y
      }
    },
    //画线
    drawLine(e) {
      const x = this.setweizhi(e.pageX, e.pageY).x;
      const y = this.setweizhi(e.pageX, e.pageY).y;
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    },
    //显示图片
    drawImg(imgSrc) {
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0, 400, 400);
      }
    },
    huabiClick() {
      //this.canvasHistory = [];
      this.flag = false;
      this.type = 'huabi'
    },
    wenziClick() {
      this.flag = false;
      this.type = 'text'
    },
    //撤回line
    backLine() {
      this.canvasHistory.pop();
      if (this.canvasHistory.length == 0) {
        this.drawImg(imgSrc);
      }
      this.drawImg(this.canvasHistory[this.canvasHistory.length - 1]);
    },
    //
    clear() {
      this.drawImg(imgSrc);
      this.type = null
    },
    //撤回
    Back() {
      this.backLine();
      // switch (this.type) {
      //   case 'huabi':
      //     break;
      //   default:
      //     break;
      // }
    },
    addImg() {
      //保存图片
      fetch('http://tn.video.study.hwbim.com/xt_attachment/5662/timg.jpg?Expires=1603874479&OSSAccessKeyId=STS.NTKMdWrmpJu8ypyXSE5fRTfBr&Signature=6XMwEeFc22KU417WaGNVolJ5vxY%3D&security-token=CAISqgJ1q6Ft5B2yfSjIr5f%2BBt7jn7JR%2FbfTe1bIvFMQOel%2Bu6PpkDz2IHpOeXJvCekXv%2FszlWtW6%2FwZlq9hS5MdHRWcsx%2FhdCoRo22beIPkl5GfDdVm4cTX8wHxZjf%2F2MjNGaWbKPrWZvaqbX3diyZ32sGUXD6%2BXlujQ%2BXr75l8dYY4UxWfZzhLD8sUXCwAzvUXLnzML%2F2gHwf3i27LdipStxF7lHl05NbkoJSV4QGMi0bhmK1H5dbxJZ6rcMA9bcY4Q8uC1fBqf6HB1SNW918Xqvksy7BF%2FDiBvMmSISEIukTdbbKOrYU0dl8oNvZhIcMe8qigz88fk%2FfIioH6xyxKOexoSCnFTOiiupCeQr7yaYZgJOekZyWWjI3VbYOboQMoOSpCJOz%2BlHv98JgaGoABm6zTaqQQ4v6mmPccFn8TNYwTZgSrcgDp8n04YveNcHbGQhj2Z5qi13LTocpapszaQfNOqheHte0aMimiRjQioyLSscYQd%2F8cuvmLIpfXLxuh%2FAVRhffPrN%2BnuWKFPhPscDfByvVSJaTfTpWnGATm1urF5dGhfTY4yUSwciZLwCQ%3D').then(res => res.blob().then(blob => {
        const a = document.createElement('a'); //this.canvas.toDataURL()
        const href = URL.createObjectURL(blob)
        a.href = href
        // a.download = 'test.png';
        a.click();
        URL.revokeObjectURL(href)
      }))
    },
    getbase() {
      // console.log(this.canvas.toDataURL())
      function Imgbas(base) {
        console.log(base)
      }
      cutImageBase64(this.canvas.toDataURL(), 500, Imgbas)
    }
  },
}
</script>

<style lang="scss" scoped>
div {
  width: 400px;
  height: 500px;
}

.box {
  position: relative;
}

aside {
  height: 100px;
  background: papayawhip;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
