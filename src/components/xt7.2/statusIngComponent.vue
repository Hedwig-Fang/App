<template>
  <div class="Dowload-box">
    <section class="item">
      <article class="left">
        <div class="fileIcon-box">
          <MyIcon
            :type="myIconFile({resourcesSuffix:'txt',resourcesType:'file'})"
            class="fileIcon"
          />
        </div>
        <div class="fileName">
          <aside class="fileName-text">一季度研发规范.txt</aside>
          <aside class="time">0B/56.96MB</aside>
        </div>
      </article>
      <article class="right">
        <span class="time">00:00:59</span>
        <div>
          <aside class="progess">
            <svg width="200" height="10" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="200" height="10" style="fill:rgba(45, 79, 204, 0.05)" />
              <rect
                x="0"
                y="0"
                width="100"
                height="10"
                :style="{fill:actived=='Dowload'?'#2D4FCC':'#3FC817'}"
              />
            </svg>
          </aside>
          <span class="time">8.0M/S</span>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import { MyIcon } from "../../assets/myIcon";
import { myIconFile } from "../../assets/common";
export default {
  name: "Dowload",
  components: {
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
  methods: {
    myIconFile
  },
  created() {
    console.log(this.actived);
  }
};
</script>

<style scoped lang='scss'>
.Dowload-box {
  height: 100%;
  overflow: overlay;
  .item {
    display: flex;
    align-items: center;
    padding: 20px 20px;
    justify-content: space-between;
    .right {
      width: 290px;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .left {
      width: calc(100% - 330px);
      display: flex;
      height: 40px;
      align-items: center;
    }
  }
}
.time {
  color: #b0b8c4;
  line-height: 17px;
}
.progess {
  height: 10px;
  svg {
    display: block;
  }
}
.fileIcon {
  font-size: 40px;
}
.fileIcon-box {
  margin-right: 12px;
}
.fileName-text {
  font-size: 14px;
  color: #373d44;
  line-height: 20px;
  width: 369px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>