const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const prerenderedHtml = require("./prerender/index.ts");

module.exports = (env) => {
  const outputDir = env.outputDir || 'dist';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, outputDir),
      filename: 'bundle.js',
    },
    mode: 'development',
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        templateContent: () =>
          `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>My App</title>
              <script defer src="bundle.js"></script>
            </head>
            <body>
              <div id="root">${prerenderedHtml}</div>
            </body>
            </html>`,
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 3000,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
  };
};
