import { Button, Input } from 'ant-design-vue';

const config = [
  {
    key: 'text',
    label: "我是文本",
    prview: (h) => '我是文本',
    render: (h) => '我是文本'
  },
  {
    key: 'button',
    label: "我是按钮",
    prview: (h) => <Button>按钮</Button>,
    render: (h) => <Button>按钮</Button>
  },
  {
    key: 'input',
    label: "我是文本框",
    prview: (h) => <Input>文本框</Input>,
    render: (h) => <Input>文本框</Input>
  },

]
function editorConfig() {

  const componentsList = [];
  const componentsMap = {};
  return {
    register: (component) => {
      componentsList.push(component);
      Reflect.set(componentsMap, component.key, component);
    },
    componentsList,
    componentsMap
  }
}
const registerConfig = editorConfig();
config.forEach(component => {
  registerConfig.register(component);
})
export default registerConfig;