<template>
<canvas ref="canvas" :width="width" :height="height"></canvas>
</template>

<script>
export default {
  name: 'MyAvatar',
  props: {
    width: {
      default: 24,
      type: Number
    },
    height: {
      default: 24,
      type: Number
    },
    userName: String,
    headUrl: String,
  },
  created() {
  },
  mounted() {
    this.startCanvas()
  },
  methods: {
    getPixelRatio(context) {
      const backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
    },
    startCanvas() {
      const canvas = this.$refs['canvas'];
      const ctx = canvas.getContext('2d');
      const dpr = this.getPixelRatio(ctx);
      canvas.style.width = this.width + 'px';
      canvas.style.height = this.height + 'px';
      canvas.width = this.width * dpr;
      canvas.height = this.height * dpr;
      this.headUrl == '' ? this.showUserName(canvas, ctx, dpr) : this.showImg(canvas, ctx, dpr)
    },
    showUserName(canvas, ctx, dpr) {
      const name = this.userName ? this.userName.split('')[this.userName.split('').length - 1] : '';
      const colorS = [
        '#FF582D',
        '#FFAC30',
        '#0DC468',
        '#0AC7C7',
        '#34BEFC',
        '#7395F9',
        '#FB6297',
        '#FFA6A8',
        '#FF5D61',
        '#FF8A23',
        '#FDD718',
        '#C1DC0D',
        '#88CF5F',
        '#3FC817',
        '#89BBE2',
        '#239CF9',
        '#BF83F2',
        '#DCACF7',
        '#FF97D9',
        '#DEBFA1',
      ];
      const nameChart = name.charCodeAt();
      ctx.scale(dpr, dpr);
      ctx.fillStyle = colorS[nameChart % colorS.length];
      ctx.arc(this.width / 2, this.width / 2, this.width / 2, 0, 360 / (Math.PI / 180));
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = `${this.width / 2}px Microsoft Yahei`;
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(name, this.width / 2, (this.width / 2) + 1);
    },
    showImg(canvas, ctx, dpr) {
      const img = new Image();
      img.src = this.headUrl //"http://img.tfile.hwbim.com/HeadPortrait/HW650763636.jpg"
      const sizes = this.width / 2
      img.onload = function () {
        console.log(sizes)
        ctx.save();
        ctx.arc(sizes, sizes, sizes, 0, 360 / (Math.PI / 180));
        ctx.clip();
        ctx.drawImage(img, 0, 0, sizes * 2, sizes * 2);
        ctx.restore();
      }
    }
  },
}
</script>
