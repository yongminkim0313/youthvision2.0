const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave:false,
  devServer:{
    allowedHosts: "all",
    proxy:{
      '/api' : {
        target : 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite:{ '^/api':''}
      }
    }
  }
})
