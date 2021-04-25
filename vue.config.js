module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir:'public',
  devServer:{
    host:'0.0.0.0',
    port:'8080',
    open:true,
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