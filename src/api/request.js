import Axios from "axios";
import API from "./index";
export const APIBaseURL = "/HWEBMPlus";

//export const APIBaseURL = "http://192.168.10.150:9997/";

// 一些请求的基本配置

const service = Axios.create({
  baseURL: APIBaseURL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
  },
});
// 输出方法
// 请求拦截

/**
 * request拦截器
 */
service.interceptors.request.use(
  (config) => {
    if (config.method === "get") {
      config.params = {
        _: new Date() / 1000,
        ...config.params,
      };
    }
    return config;
  },
  (error) => Promise.reject(error.response)
);
/**
 * http响应拦截器
 */
service.interceptors.response.use(
  (data) => data,
  (error) => {
    if (error.response) {
      switch (+error.response.status) {
        case 400:
          if (error.response.data.faultStr) {
            window.$vm.Message.warn(error.response.data.faultStr);
          } else {
            window.$vm.Message.warn("参数错误！");
          }
          break;
        case 401:

          // top.location.href = error.response.data.go2URL;// 登录超时时需跳转到登录页面，或者退出应用 todo 跳登录页
          //globalThis.location.href = `${APIBaseURL}/main`; // 临时固定调整后面对接了登录在重新改成正常的 赵浩东 2020年6月4日11:34:22
          // window.$vm.$router.push('/login');
          break;
        case 403:
          // error.response.data.faultName === 'BeKicked'; => 登录页 todo
          if (error.response.data.faultName === "BeKicked") {
            window.$vm.Message.warn("账号已被登录");
            API.getTeamUserUrl().then((ress) => {
              API.logout((err, data) => {
                window.location.href = error.response.data.go2URL;
              }, ress);
            });
          } else if (error.response.data.faultName === "NoPermission") {
            if (error.response.data.go2URL != "") {
              window.$vm.Message.warn("操作无权限，请联系项目管理员。");
              window.location.href = error.response.data.go2URL;
            }
          } else if (error.response.data.faultName === "NoAuthorization") {
            window.$vm.Message.warn(error.response.data.faultStr);
            if (error.response.data.go2URL != "") {
              window.location.href = error.response.data.go2URL;
            }
          } else {
            window.location.href = error.response.data.go2URL;
            // window.$vm.$router.push('/dashboard'); */
            // alert(error.response.data.message);
          }
          // error.response.data.faultName === 'NoPermission'; => home页
          break;
        default:
          window.$vm.Message.warn("服务器错误");
      }
    }
    return Promise.reject(error.response);
  }
);
/**
 * 暴露给api
 * @param url
 * @param data
 * @param method
 * @param useParams  额外参数，强制用URLSearchParams对象的形式传数据
 * @returns {Promise<any>}
 */
export default function request(
  url,
  data = {},
  method = "post",
  useParams = false,
  header = ""
) {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      method,
    };
    if (header) {
      options.headers = header;
    }
    if (method.toLowerCase() === "get") {
      options.params = data;
    } else if (useParams) {
      const params = new URLSearchParams();
      // for (const key in data) {
      //   if (data.hasOwnProperty(key)) params.append(key, data[key]);
      // }
      Object.keys(data).forEach((key) => {
        params.append(key, data[key]);
      });
      options.data = params;
    } else {
      options.data = data;
    }
    service(options)
      .then((res) => {
        resolve(res.data);
        let t = null;
        if (t) {
          clearTimeout(t);
        }
        if (store.state.isLoading) {
          store.dispatch("onLoading", false);
          t = setTimeout(() => {
            store.dispatch("onLoading", false);
          }, 300);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
