import type { Configuration } from 'webpack';
import path from 'path';

import { rules } from './webpack.rules';
import CopyWebpackPlugin from 'copy-webpack-plugin';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/renderer/assets/index.css'),
          to: 'assets/index.css',
        },
        {
          from: path.resolve(__dirname, '../src/renderer/assets/index.js'),
          to: 'assets/index.js',
        },
        {
          from: path.resolve(__dirname, '../src/renderer/assets'),
          to: 'assets/',
          globOptions: {
            ignore: ['**/index.css', '**/index.js'],
          },
          filter: (resourcePath: string) => {
            return resourcePath.endsWith('.png') || resourcePath.endsWith('.jpg');
          },
        },
      ],
    }),
  ],
  externals: {
    fs: 'commonjs2 fs',
    path: 'commonjs2 path',
    os: 'commonjs2 os',
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.mp3'],
    alias: {
      '/assets': path.resolve(__dirname, '../src/renderer/assets'),
    },
    fallback: {
      fs: false,
      path: false,
      os: false,
    },
  },
};
