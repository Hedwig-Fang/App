import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isShowGlobFileStatus: true,
    uplaodType: {
      DownloadEd: 'DownloadEd',
      UploadEd: 'UploadEd',
    }
  },
  mutations: {
    changeShowGlobFileStatus(state, flag) {
      state.isShowGlobFileStatus = flag;
    }
  }
})

/**

INSERT INTO testData (ID,设计编号,宽度,高度,参照图集,总数,标高,备注,类型,邮件代码,标记)
VALUES (1, '窗244', 32,31, 'hahah', 20000,12,'我是备注','窗户',46511,24 );
CREATE TABLE testData(
 ID INT PRIMARY KEY     NOT NULL,
 设计编号           TEXT    NOT NULL,
 宽度            INT     NOT NULL,
 高度            INT     NOT NULL,
参照图集           TEXT    NOT NULL,
 总数            INT     NOT NULL,
  标高            INT     NOT NULL,
  备注           TEXT    NOT NULL,
  类型           TEXT    NOT NULL,
  邮件代码           INT     NOT NULL,
  标记             INT     NOT NULL
);
 */