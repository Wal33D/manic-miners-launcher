import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

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
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.mp3'],
    fallback: {
      fs: false,
      path: false,
      os: false,
    },
  },
};
