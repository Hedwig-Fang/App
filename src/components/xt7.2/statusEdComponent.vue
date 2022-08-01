<template>
  <div class="upaldoEd">
    <div class="top">
      <section class="item">
        <article class="left">
          <MyIcon
            :type="myIconFile({resourcesSuffix:'txt',resourcesType:'file'})"
            class="fileIcon"
          />
          <aside class="fileName-text">一季度研发规范.txt</aside>
        </article>
        <article class="right">
          <aside class="size">817.5k</aside>
          <aside :class="['text-box','DownloadEd']">
            <MyIcon type="icon-Frame2" class="icon-status" />
            <span class="text">下载成功</span>
          </aside>
          <aside class="icon">
            <MyIcon type="icon-Frame-1" class="icon-click" @click="editNative" />
            <MyIcon type="icon-Frame-2" class="icon-click ts" @click="openPath" />
            <MyIcon type="icon-Frame-3" class="icon-click" @click="deleNative" />
          </aside>
        </article>
      </section>
    </div>
    <div class="bottom">
      <Button type="link" @click="clearAll">清空记录</Button>
    </div>
  </div>
</template>

<script>
import { Button } from "ant-design-vue";
import { MyIcon } from "../../assets/myIcon";
import { myIconFile } from "../../assets/common";
//downloadEd下载完成  UploadEd//上传完成

export default {
  name: "UploadEd",
  components: {
    Button,
    MyIcon
  },
  props: {
    actived: {
      default: "",
      type: String
    },
    filterGlobFileData: {
      default: [],
      type: Array
    }
  },
  created() {
    //console.log(this.actived);
  },
  methods: {
    clearAll() {
      console.log(123);
    },
    myIconFile,
    editNative() {
      //本地编辑文件
    },
    openPath() {
      //打开文件所在的位置
    },
    deleNative() {
      //删除文件
    }
  }
};
</script>
<style scoped lang='scss'>
.upaldoEd {
  height: 100%;
  overflow: hidden;
}
.bottom {
  height: 50px;
  border-top: 1px solid #e8eaec;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.top {
  height: calc(100% - 50px);
  overflow: overlay;
}
.item {
  padding: 13px 20px;

  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background: rgba(45, 79, 204, 0.05);
  }
}
.right {
  width: 308px;
  height: 25px;
  display: flex;
  align-items: center;
}
.left {
  width: calc(100% - 353px);
  height: 25px;
  display: flex;
  align-items: center;
}
.fileIcon {
  font-size: 25px;
  margin-right: 11px;
}
.fileName-text {
  font-size: 15px;
  color: #373d44;
  line-height: 20px;
  width: calc(100% - 36px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.text-box {
  margin: 0 40px;
}
.size {
  color: #b0b8c4;
  line-height: 17px;
}
.icon-status {
  margin-right: 8px;
}
.DownloadEd {
  color: #2d4fcc;
  .icon-status {
    transform: rotate(180deg);
  }
}
.UploadEd {
  color: #3fc817;
}
.icon-click {
  font-size: 20px;
  color: #808695;
  &:hover {
    color: #4d71f4;
  }
}
.ts {
  margin: 0 20px;
}
.icon {
  display: flex;
}
</style>