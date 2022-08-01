<template>
<div class="file">
  <div class="file-box" ref="box-file">
    <p class="file-title">图标 附件 上传 </p>
    <section class="file-cont">
      <FileItem />
    </section>
  </div>
</div>
</template>

<script>
import API from '../api/index';
import FileItem from './fileItem'
export default {
  name: 'Draguplodfile',
  components: {
    FileItem
  },
  mounted() {
    this.box = this.$refs['box-file'];
    this.initEvent()
  },
  methods: {
    initEvent() {
      this.box.addEventListener('dragenter', this.dragenter.bind(this));
      this.box.addEventListener('dragleave', this.dragleave.bind(this));
      document.addEventListener('drop', function (e) {
        e.preventDefault()
      }, false)
      document.addEventListener('dragover', function (e) {
        e.preventDefault()
      }, false);
      this.box.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      this.box.addEventListener('drop', this.drop.bind(this));
    },
    dragenter() {
      //this.box.innerHTML = '松开鼠标' //鼠标放进去
    },
    dragleave() {
      //this.box.innerHTML = '请将文件拖至此区域';
      //鼠标移开
    },
    drop(e) {
      console.log(e.dataTransfer.files);
      //松开鼠标
    }
  },
}
</script>

<style lang="scss" scoped>
.file-box {
  width: 200px;
  height: auto;
  cursor: pointer;
}

.file-cont {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

}
</style>
