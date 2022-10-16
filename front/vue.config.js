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
        target : 'http://localhost:8000',
        changeOrigin: true,
        // pathRewrite:{ '^/api':''}
      }
    }
  },
  outputDir: '../back/public'
})
