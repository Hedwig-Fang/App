import { MyIcon } from '../../assets/myIcon.js'
import './index.scss';
import { getPanelConfig } from './config'

const NodePanel = {
  name: 'NodePanel',
  props: {
    lf: {
      default: () => ({}),
      type: Object
    }
  },
  methods: {
    dragNode(item) {
      this.lf.dnd.startDrag({
        type: item.type,
        text: '', //item.label
      })
      console.info(item)
    }
  },
  render() {
    const panelConfig = getPanelConfig();

    return (
      <div class="node-panel">
        {panelConfig.map(item => (
          <div class="panel-item"
            style={{ display: item.show ? 'flex' : 'none', width: `${item.style.width}px`, height: `${item.style.height}px`, color: item.style.color }}
            onMousedown={() => this.dragNode(item)}
          >
            <MyIcon type={item.icon} class="icon-panel"
              style={{ color: item.iconStyle.color, fontSize: item.iconStyle.size + 'px' }}
            />
            <span>{item.label}</span>
          </div>
        ))}

      </div>

    );
  }
}

export default NodePanel

