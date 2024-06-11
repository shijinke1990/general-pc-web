import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import ViteRestart from 'vite-plugin-restart';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      svgr(),
      visualizer({
        emitFile: false,
        file: 'states.html',
        open: true,
      }),
      // 对低版本浏览器做兼容
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      ViteRestart({
        restart: ['.env', 'vite.config.js', 'jsconfig.json'],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@views': path.resolve(__dirname, './src/views'),
        '@services': path.resolve(__dirname, './src/services'),
        '@stores': path.resolve(__dirname, './src/stores'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@context': path.resolve(__dirname, './src/context'),
      },
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        [env.VITE_APP_BASE_API]: {
          secure: false,
          target: env.VITE_SERVE,
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      chunkSizeWarningLimit: 1200,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            // 将 React 相关库打包成单独的 chunk 中
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            // 将组件库的代码打包
            library: ['antd', '@ant-design/icons'],
            echarts: ['echarts'],
            axios: ['axios'],
            aliOss: ['ali-oss'],
          },
          chunkFileNames: chunkInfo => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
            const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
            if (
              [
                'axios',
                'echarts',
                '@ant-design/icons',
                'antd',
                'react',
                'react-dom',
                'react-router-dom',
                'aliOss',
              ].includes(chunkInfo.name)
            ) {
              return `js/${fileName}/[name].js`;
            }
            return `js/${fileName}/[name].[hash].js`;
          },
        },
      },
    },
    // esbuild: {
    //   drop: ['console', 'debugger'],
    // },
  };
});
