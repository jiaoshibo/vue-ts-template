module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir:'public',
  productionSourceMap:false,
  chainWebpack:config=>{
    config.plugin('html').tap(args=>{
      args[0].title='vue-ts-template';
      return args;
    })
  },
  devServer:{
    host:'0.0.0.0',
    port:'8080',
    open:false,
    proxy:{
      '/api':{
        target: 'https://api.github.com',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
}