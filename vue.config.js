
module.exports = {
  devServer: {
    disableHostCheck: true,
  },

  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        // 修改它的选项...
        return {
          ...options,
          transformAssetUrls: {
            video: ["src", "poster"],
            source: "src",
            img: "src",
            image: ["xlink:href", "href"],
            use: ["xlink:href", "href"],
            "mp-image": ["src"],
            "cover-image": ["src"],
            "mp-audio": ["src", "poster"],
            "mp-video": ["src", "poster", "poster-for-crawler"],
          },
        };
      });

    config.module.rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 0 }))
    config.module
      .rule('wasm')
      .type("javascript/auto")
      .test(/.wasm$/)
      .use('wasm-loader')
      .loader('wasm-loader')

  },
  devServer: {
    proxy: {
      '/HWEBMPlus': {
        target: 'http://192.168.0.206:8171/HWEBMPlus',
        //target: 'http://192.168.10.216:8171/HWCollaborationDashboard',
        pathRewrite: { '^/HWEBMPlus': '' },
        changeOrigin: false, // target是域名的话，需要这个参数，
        secure: false, // 设置支持https协议的代理
        onProxyReq(proxyReq, req, res) {

          //proxyReq.setHeader('cookie', cookie)
        },

      },
    },
    overlay: {
      warnings: false,
      errors: false,
    },
  },
};
