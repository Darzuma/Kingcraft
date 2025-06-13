import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({command, mode}) => {

  // const env = loadEnv(mode, process.cwd(), '')
  // http://localhost:5173/
  return {
    plugins: [
      vue({

      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.html', '.js', '.json', '.vue', '.scss']
    },
    define: {
      __ENV:{
        // 给 axios 用的
        baseURL: {
          serve:'http://localhost:6010',
          build:'https://gateway.bmwistrek.com'
        }[command],
        clientId:{
          serve:"AbMHs0nu25KCD3AwkdncMWHPokwp1u8Jo-ic5x4eraYTzOanvmEy_URg9YSwywnLg_JNtuzT_B9BB6vk",
          // build:"AbMHs0nu25KCD3AwkdncMWHPokwp1u8Jo-ic5x4eraYTzOanvmEy_URg9YSwywnLg_JNtuzT_B9BB6vk",
          build:"AcUgy3zJMciuMimL3DDemWLdXcEJ8lIiz4ZOJ8pd3S3Em-jwcBVrPi_LHo-BdQtem5shL-wqW3J6Y6L7"
        }[command],
      }
    },
    // 前端服务器
    server: {
      open: '/',
      port: '5175'
    }
  }
})
