<template>
  <Modal
    :footer="null"
    :closable="false"
    :mask="false"
    :visible="$store.state.isShowGlobFileStatus"
    :width="780"
  >
    <div class="status-box">
      <header class="header">
        <div class="tag">
          <aside
            :class="['active',item.active==actived?'actived':'']"
            v-for="item of tagArr"
            :key="item.active"
          >
            <div @click="changeActive(item)">{{item.text}}(1)</div>
          </aside>
        </div>
        <div class="close">
          <Icon @click="closeModal" type="close" class="close-icon" />
        </div>
      </header>
      <div class="cont">
        <component :actived="actived" :filterGlobFileData="filterGlobFileData" :is="actived"></component>
      </div>
    </div>
  </Modal>
</template>

<script>
import {
  reactive,
  toRefs,
  onBeforeUnmount,
  onMounted
} from "@vue/composition-api";
import { Modal, Icon } from "ant-design-vue";
import { MyIcon } from "../../assets/myIcon";
import statusIngComponent from "./statusIngComponent.vue";
import statusEdComponent from "./statusEdComponent.vue";
import store from "../../store/index";
//下载和上传中用一个组件
export default {
  name: "GlobFileStatus",
  components: {
    Modal,
    MyIcon,
    Icon,
    Dowload: statusIngComponent,
    Uplaod: statusIngComponent,
    UploadEd: statusEdComponent
  },
  setup() {
    const state = reactive({
      actived: "Dowload",
      filterGlobFileData: []
    });
    let tagArr = [
      {
        text: "正在下载",
        active: "Dowload"
      },
      {
        text: "正在上传",
        active: "Uplaod"
      },
      {
        text: "传输完成",
        active: "UploadEd"
      }
    ];
    //修改选中的tag
    const changeActive = item => {
      if (item.active == state.actived) return;
      else state.actived = item.active;
      //downloadEd下载完成  UploadEd//上传完成
    }; //关闭modal
    const closeModal = () => {
      store.commit("changeShowGlobFileStatus", false);
    };
    onMounted(() => {
      console.log(state.actived, 111);
    });
    onBeforeUnmount(() => {
      tagArr = null;
    });
    return {
      ...toRefs(state),
      tagArr,
      changeActive,
      closeModal
    };
  }
};
</script>
<style scoped lang='scss'>
.status-box {
  width: 780px;
  height: 400px;
}
::v-deep .ant-modal-body {
  padding: 0;
}
.header {
  height: 50px;
  background: #2d4fcc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.close-icon {
  color: #ffffff;
  cursor: pointer;
}
.tag {
  display: flex;
  .active {
    font-size: 14px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.5);
    margin-right: 32px;
    position: relative;
    user-select: none;
    transition: all 0.2s;
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
  .actived {
    color: rgba(255, 255, 255, 1);
    font-weight: bold;
  }
}
.actived::after {
  content: "";
  display: block;
  height: 2px;
  background: #ffffff;
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 1px;
  width: 56px;
}
.cont {
  height: calc(100% - 50px);
  overflow: hidden;
}
</style>