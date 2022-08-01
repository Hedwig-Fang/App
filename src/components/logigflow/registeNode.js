
import { getPanelConfig, typeEnum, nodeStyle } from './config'
import { RectNode, RectNodeModel, h } from "@logicflow/core";

const getPanelNode = (type) => {
  const node = getPanelConfig().find(res => res.type == type);
  return node
}
const setNode = (node, data, lf) => {
  Object.assign(node, data)
  lf.register(node)
}
const renderIcon = (d, node, x, y, width, height) => {
  return h('svg', {
    viewBox: "0 0 1024 1024",
    x: x - width / 2 + 7,
    y: y - height / 2 + (height / 4),
    width: node.iconStyle.size,
    height: node.iconStyle.size,
  }, [h('path', {
    d,
    fill: node.iconStyle.color
  })

  ])
}
const renderText = (node, x, y, width, height) => {
  return h('text', {
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    x: x + 10,
    y,
    value: node.label,
    fontSize: node.style.size,
    stroke: node.style.color,
    overflowMode: "default",
    lineHeight: "1.2"
  }, node.label)
}
const getcustomSubmitNode = (lf) => {//自定义提交节点
  const node = getPanelNode(typeEnum.submit);
  class submitModel extends RectNodeModel {//

  };
  class submitView extends RectNode {
    getShape() {
      const { model, graphModel } = this.props;
      const { x, y, } = model;
      const { iconStyle, style: { width, height } } = nodeStyle;

      return h("g", {
      }, [
        h('g', {
          strokeWidth: 1,
          stroke: 'red',
          strokeDasharray: 3,
        }, [
          h("rect", {
            x: x - width / 2,
            y: y - height / 2,
            fill: '#ffffff',
            // rx: radius,
            // ry: radius,
            width,
            height
          }, [
          ]),
          renderIcon('M976 672c-6.496 0-12.688 1.328-18.352 3.664v-0.016l-0.208 0.08-0.208 0.08L512 860.048 66.784 675.824a1.12 1.12 0 0 0-0.208-0.08l-0.208-0.08-0.016 0.016a48 48 0 0 0-36.704 88.656v0.016l463.584 191.824a1.12 1.12 0 0 0 0.208 0.08l0.208 0.08 0.016-0.016a47.6 47.6 0 0 0 36.688 0.016l0.016 0.016 0.208-0.08a1.12 1.12 0 0 1 0.208-0.08l463.568-191.824v-0.016A48 48 0 0 0 976 672zM29.664 348.336v0.016l463.584 191.824 0.208 0.08 0.208 0.08 0.016-0.016a47.456 47.456 0 0 0 36.672 0.016l0.016 0.016 0.208-0.08a1.12 1.12 0 0 1 0.208-0.08l463.568-191.824v-0.016A48.048 48.048 0 0 0 1024 304a48 48 0 0 0-29.648-44.336v-0.016L530.784 67.824a1.12 1.12 0 0 0-0.208-0.08l-0.208-0.08-0.016 0.016a47.744 47.744 0 0 0-36.688-0.016l-0.016-0.016-0.208 0.08a1.12 1.12 0 0 1-0.208 0.08L29.648 259.648v0.016A48 48 0 0 0 0 304a48 48 0 0 0 29.664 44.336zM976 464c-6.496 0-12.688 1.328-18.352 3.664v-0.016l-0.208 0.096a1.12 1.12 0 0 1-0.208 0.08L512 652.048 66.784 467.824a1.12 1.12 0 0 0-0.208-0.08l-0.208-0.096-0.016 0.016a48 48 0 0 0-36.704 88.672v0.016l463.584 191.824 0.208 0.08 0.208 0.08 0.016-0.016a47.6 47.6 0 0 0 36.688 0.016l0.016 0.016 0.208-0.08a1.12 1.12 0 0 1 0.208-0.08l463.568-191.824v-0.016A48 48 0 0 0 976 464z',
            node, x, y, width, height
          ),
        ]),
        h('g', {}, [renderText(node, x, y, width, height)])
      ],

      );
    }

  };
  setNode(node, {
    type: node.type,
    view: submitView,
    model: submitModel
  }, lf)
}
const getcustomApprovalNode = (lf) => {
  const node = getPanelNode(typeEnum.approval);
  class submitModel extends RectNodeModel {//

  };
  class submitView extends RectNode {
    getShape() {
      const { model, graphModel } = this.props;
      const { x, y, } = model;
      const { iconStyle, style: { width, height } } = nodeStyle;

      return h("g", {
      }, [
        h('g', {
          strokeWidth: 1,
          stroke: 'red',
          strokeDasharray: 3,
        }, [
          h("rect", {
            x: x - width / 2,
            y: y - height / 2,
            fill: '#ffffff',
            // rx: radius,
            // ry: radius,
            width,
            height
          }, [
          ]),
          renderIcon('M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zM257.7 752c2 0 4-0.2 6-0.5L431.9 722c2-0.4 3.9-1.3 5.3-2.8l423.9-423.9c3.9-3.9 3.9-10.2 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2c-1.9 11.1 1.5 21.9 9.4 29.8 6.6 6.4 14.9 9.9 23.8 9.9z',
            node, x, y, width, height
          ),
        ]),
        h('g', {}, [renderText(node, x, y, width, height)])
      ],

      );
    }

  };
  setNode(node, {
    type: node.type,
    view: submitView,
    model: submitModel
  }, lf)
}
const getcustomCopyGiveNode = (lf) => {
  const node = getPanelNode(typeEnum.copyGive);
  class submitModel extends RectNodeModel {//

  };
  class submitView extends RectNode {
    getShape() {
      const { model, graphModel } = this.props;
      const { x, y, } = model;
      const { iconStyle, style: { width, height } } = nodeStyle;

      return h("g", {
      }, [
        h('g', {
          strokeWidth: 1,
          stroke: 'red',
          strokeDasharray: 3,
        }, [
          h("rect", {
            x: x - width / 2,
            y: y - height / 2,
            fill: '#ffffff',
            // rx: radius,
            // ry: radius,
            width,
            height
          }, [
          ]),
          renderIcon('M946.5 505L534.6 93.4c-12.5-12.5-32.7-12.5-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-0.1-90.5z',
            node, x, y, width, height
          ),
        ]),
        h('g', {}, [renderText(node, x, y, width, height)])
      ],

      );
    }

  };
  setNode(node, {
    type: node.type,
    view: submitView,
    model: submitModel
  }, lf)
}

const getcustomEndNode = (lf) => {
  const node = getPanelNode(typeEnum.end);
  class submitModel extends RectNodeModel {//

  };
  class submitView extends RectNode {
    getShape() {
      const { model, graphModel } = this.props;
      const { x, y, } = model;
      const { iconStyle, style: { width, height } } = nodeStyle;

      return h("g", {
      }, [
        h('g', {
          strokeWidth: 1,
          stroke: 'red',
          strokeDasharray: 3,
        }, [
          h("rect", {
            x: x - width / 2,
            y: y - height / 2,
            fill: '#ffffff',
            // rx: radius,
            // ry: radius,
            width,
            height
          }, [
          ]),
          renderIcon('M112 880c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V460H112v420zM880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v176h800V216c0-17.7-14.3-32-32-32z',
            node, x, y, width, height
          ),
        ]),
        h('g', {}, [renderText(node, x, y, width, height)])
      ],

      );
    }

  };
  setNode(node, {
    type: node.type,
    view: submitView,
    model: submitModel
  }, lf)
}
const registeNode = (lf) => {
  getcustomSubmitNode(lf);//自定提交节点
  getcustomApprovalNode(lf); // 自定义审批节点
  getcustomCopyGiveNode(lf);        //自定义抄送节点

  getcustomEndNode(lf);  //自定义结束节点
}

export default registeNode