import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

export const mainConfig: Configuration = {
  entry: './src/index.ts',
  module: {
    rules, // Updated rules that now include html-loader
  },
  plugins, // Updated plugins array that includes HtmlWebpackPlugin
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
