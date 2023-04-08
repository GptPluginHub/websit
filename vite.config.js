import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    base: './',
    plugins: [vue()],
    build: {
        // assetsDir: 'assets', // 将 assetsDir 更改为你想要的名称
    },
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    server: {
        proxy: {
          // 将本地 /api/* 开头的请求代理到远程服务器 http://localhost:3000/api/*
        //   "/apis": {
        //     target: "http://a60.ronfu.top",
        //     changeOrigin: true,
        //     rewrite: path => path.replace(/^\/apis/, "/apis")
        //   }
        }
      }
})