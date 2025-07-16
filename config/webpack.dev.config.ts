import type { Configuration } from 'webpack-dev-server';

export const devServerConfig: Configuration = {
  proxy: [
    {
      context: ['/api'],
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
    },
  ],
  historyApiFallback: true,
  hot: true,
};
