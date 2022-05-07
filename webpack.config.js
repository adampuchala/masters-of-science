const path = require('path');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/typescript/main.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/'),
    publicPath: ''
  },
  plugins: [
      new WasmPackPlugin({
          crateDirectory: path.resolve(__dirname, './src/rust'),
          extraArgs: '--no-typescript',
      })
  ],
  experiments: {
      syncWebAssembly: true
  }
};
