
const typeEnum = {
  submit: 'submit',//提交
  approval: 'approval',//审批
  copyGive: 'copyGive',//提交
  end: 'end',//审批
}
const nodeStyle = {
  iconStyle: {
    color: '#808695',
    size: 14
  },
  style: {
    width: 87,
    height: 30,
    size: 12,
    color: '#808695',
  },
}

function getPanelConfig() {
  return [
    {
      type: typeEnum.submit,
      label: '提交节点',
      icon: 'icon-layers',
      show: false,
      property: {//业务属性
      },
      ...nodeStyle
    },
    {
      type: typeEnum.approval,
      label: '审批节点',
      icon: 'icon-edit-fill',
      show: true,
      property: {//业务属性


      },
      ...nodeStyle
    },
    {
      type: typeEnum.copyGive,
      label: '抄送节点',
      icon: 'icon-home-fill',
      show: true,
      property: {//业务属性


      },
      ...nodeStyle
    },
    {
      type: typeEnum.end,
      label: '流程结束',
      icon: 'icon-calendar-fill',
      show: false,
      property: {//业务属性


      },
      ...nodeStyle,
      nodeStyle
    },
  ]
}
export {
  getPanelConfig,
  typeEnum,
  nodeStyle
}