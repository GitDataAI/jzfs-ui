import react from '@vitejs/plugin-react-swc';
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default ({ command }) => {
  const baseConfig = {
    test: {
      environment: 'happy-dom',
    },
    plugins: [
      replace({
          preventAssignment: true,
          include: ['src/**/*.jsx', 'src/**/*.js'],
          values: {
            __buildVersion: process.env.VERSION || 'dev',
          }
      }),
      react()
    ],
    publicDir: './pub',
  };

  // in development
  if (command === 'serve' || command === 'test') {
    return {
      ...baseConfig,
      server: {
        port: 3000,
        proxy: {
          '/api': {
            target: 'http://47.109.99.244:8000',
            changeOrigin: true,
            secure: false
          },
          '/oidc/login': {
            target: 'http://47.109.99.244:8000',
            changeOrigin: false,
            secure: false
          },
          '/logout': {
            target: 'http://47.109.99.244:8000',
            changeOrigin: false,
            secure: false
          }
        }
      },
      build: {
        sourcemap: 'inline',
      },
    };
  } 
  // while building
  return baseConfig;
};
