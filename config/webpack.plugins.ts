import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// ForkTsCheckerWebpackPlugin intermittently fails on macOS with
// `write EPIPE` errors. To keep development working on darwin
// systems, the plugin is disabled by default. Set FORCE_TS_CHECK=1
// to re-enable it if needed.

const shouldUsePlugin =
  process.platform !== 'darwin' || process.env.FORCE_TS_CHECK === '1';

export const plugins = shouldUsePlugin
  ? [
      new ForkTsCheckerWebpackPlugin({
        logger: 'webpack-infrastructure',
      }),
    ]
  : [];
