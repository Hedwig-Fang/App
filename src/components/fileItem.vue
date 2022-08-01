<template>
<div class="file-item">
  <img :src="require('../assets/rvt_48.png')" />
  <article>
    <p>链接文件1.dwg</p>
    <aside>
      <span>15.3M</span>
      <span class="btn">
        <Button type="link">下载</Button>
        <Button type="link">删除</Button>
      </span>
    </aside>
  </article>
</div>
</template>

<script>
import {
  Button
} from 'ant-design-vue'
export default {
  name: 'Fileitem',
  components: {
    Button,
  }
}
</script>

<style lang="scss" scoped>
.file-item {
  width: 240px;
  height: 60px;
  background: white;
  padding: 10px;
  display: flex;

  &:hover {
    background: #F5F7FC;
  }

  img {
    width: 40px;
    height: 40px;
  }

  .btn {
    display: flex;

    .ant-btn-link {
      height: auto;
    }

  }

  p {
    margin: 0;
    color: #373D44;
    font-size: 14px;
    line-height: 20px;
  }

  aside {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  span {
    color: #87909D;
    font-size: 12px;
    line-height: 17px;
  }

}
</style>
