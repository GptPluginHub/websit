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
    }
})