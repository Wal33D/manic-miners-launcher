import HtmlWebpackPlugin from 'html-webpack-plugin';
import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { ProvidePlugin } from 'webpack';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
];
