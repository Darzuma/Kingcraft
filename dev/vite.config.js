import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({command, mode}) => {
  // command 即 package.json 中的脚本名, mode 自动(development/production)
  if (command === 'dev') {

  } else if (command === 'build') {

  }
  let config = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
      extensions: ['.html', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss']
    },
    // define: { // 自定义全局变量
    //     process: {
    //       baseURL: {
    //         development: 'http://localhost:3001',
    //         production: 'http://xx.xx.xx.xx:3001'
    //       }[mode],
    //       dev: mode === 'development'
    //   },
    // },
    // build:{
    //   // 如果构建后无法使用，先尝试删除 rollupOptions
    //   rollupOptions:{
    //     input:'./index.html'
    //   },
    //   outDir:'./dist'
    // },
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: '/',
    },
  }
  return defineConfig(config)

}
