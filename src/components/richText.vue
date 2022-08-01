<template>
<div class="boxs">
  <div id="toolbar-container"></div>
  <!-- 编辑器容器 -->
  <div id="editor"></div>

</div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
//中文包
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn';

// import UploadImageAdapter from '/jslibs/UploadImageAdapter';
import {
  Menu
} from 'ant-design-vue'
export default {
  name: 'Richtext',
  components: {},
  props: {
    isEdit: Boolean,
    value: String,
  },
  mounted() {
    this.initCKEditor()
  },
  methods: {
    initCKEditor() {
      CKEditor.create(document.querySelector('#editor'), {

        language: 'zh-cn',
        ckfinder: {
          uploadUrl: '/admin/Upload/uploadUrl'
          //后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
        }
      }).then(editor => {
        const toolbarContainer = document.querySelector('#toolbar-container');
        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        this.editor = editor //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
        const dom = document.querySelector('#editor');
        dom.addEventListener('keyup', (e) => {
          if (e.keyCode == 50) {
            editor.setData(editor.getData() + '<a>66666</a>')
          }
        })
        editor.model.document.on('change:data', () => {
          console.log(editor.getData());

        })
      }).catch(error => {
        console.error(error);
      });
    }

  },
}
</script>

<style lang="scss" scoped>
.boxs {
  width: 500px;
  height: 500px;
}
</style>
