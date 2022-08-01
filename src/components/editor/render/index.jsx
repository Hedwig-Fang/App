import { SchemaField } from '@lljj/vue-json-schema-form';
import { customConfig } from './customConfig.js'
const renderIndex = {
  name: 'RenderIndex',
  props: {
    attrs: {
      default: () => ({}),
      type: Object
    }
  },
  render() {
    const attrs = this.attrs;
    const type = attrs.schema.type;
    const customRender = Reflect.get(customConfig, type);

    return (
      customRender ? customRender.render() : <SchemaField attrs={attrs} />
    );
  }
}

export default renderIndex

