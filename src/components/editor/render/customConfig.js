import { h } from 'vue';
//render如果组件比较复杂可以封装成组件
const customConfig = {
  'viewport': {
    render: (props) =>
      <el-form-item label="添加视口">
        <div>自定义视口</div>
      </el-form-item>

  },
  'tag': {
    render: (props) => <el-form-item label="添加标签">
      <div>自定义便签</div>
    </el-form-item>
  },
  'editor': {
    render: (props) => <el-form-item label="添加富文本">
      <div>自定义富文本</div>
    </el-form-item>
  },

}
export {
  customConfig
}