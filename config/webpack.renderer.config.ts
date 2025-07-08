import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  externals: {
    fs: 'commonjs2 fs',
    path: 'commonjs2 path',
    os: 'commonjs2 os',
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.mp3'],
    fallback: {
      fs: false,
      path: false,
      os: false,
    },
  },
};
