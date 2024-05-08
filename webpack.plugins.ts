import type { Configuration } from 'webpack';
import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// Import the required plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

// ForkTsCheckerWebpackPlugin is already being used for TypeScript checking
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins: Configuration['plugins'] = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html', // Adjust path as necessary
  }),
];
