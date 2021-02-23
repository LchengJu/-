// 暴露出去
module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      // 跨域:不同源  客户端请求服务端
      // 代理什么： /public 以 /public开头的接口地址统统代理
      '/public': {
        // 这里最好有一个 /target ： 就是真实接口的基地址 target会拼接/public
        target: 'http://127.0.0.1/heimamm', // 后台接口域名 http://127.0.0.1/heimamm/public
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {}
      }
    }
  }
}
