
import request from "./request.js";

const API = {
  getRecoverArr() {
    return request('/getModelRecovery', {}, 'get')
  },
  //删除模型
  deleModel(id) {
    return request('/getModelRecovery', {}, 'get')
  },
  //恢复模型
  withdRaw(id) {
    return request('/getModelRecovery', {}, 'get')
  },
  //获取项目的分组列表
  getProjectGroupArr(teamId) {
    return request('/getProjectGroupArr', {}, 'get')
  },
  //创建文档
  ceatePad(padName) {
    return request(`/pad/createPad/${padName}`, {}, 'get')
  },
  editPad(padId) {
    return request(`/pad/getPadInfo/${padId}`, {}, 'get');
  },

  //创建excel
  ceateExcel(name) {
    return request(`/index/create/${name}`, {}, 'get')
  },
  uploadExcelData(excelName, data) {
    return request(`index/import/${excelName}"`, data, 'post');
  },
  dowloadExcelFile(excelName, exceldata) {
    return request(`/excel/downfile`, exceldata, 'post')
  },

  //获取部门员工
  getDepartment() {

    return request('/employee/getDepartment?_=1652408264&departmentId=0', {}, 'get')
  }
};
export default API;
