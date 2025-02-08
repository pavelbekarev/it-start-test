import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.resolve(__dirname, "./build");
const publicDir = path.resolve(__dirname, "./public");
const appDir = path.resolve(__dirname, "./src/app");

/**
 *
 */
export default async (env, { mode }) => {
  const isDev = mode === "development";
  return {
    mode,
    entry: path.join(appDir, "index.tsx"),
    output: {
      path: buildDir,
      filename: "js/[name].js",
      clean: true,
    },
    devServer: {
      static: {
        directory: publicDir,
      },
      port: 8888,
      open: true,
      historyApiFallback: true,
      hot: true,
      watchFiles: [
        "src/**/*.js",
        "src/**/*.scss",
        "src/**/*.html",
        "src/**/*.json",
      ],
    },
    module: {
      rules: [
        {
          test: /\.(jpg|png|svg|jpeg|gif)$/,
          type: "asset/resource",
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                sourceMap: isDev,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDev,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(publicDir, "index.html"), // Убедитесь, что шаблон существует
      }),
      new MiniCssExtractPlugin({
        filename: "styles/[name][hash].css",
        ignoreOrder: true,
      }),
      new webpack.DefinePlugin({
        "process.env.API_URL": JSON.stringify(env.API_URL),
      }),
    ],
    resolve: {
      alias: {
        "#shared": path.resolve(__dirname, "src/shared"),
        "#entities": path.resolve(__dirname, "src/entities"),
        "#features": path.resolve(__dirname, "src/features"),
        "#pages": path.resolve(__dirname, "src/pages"),
        "#widgets": path.resolve(__dirname, "src/widgets"),
        "#app": path.resolve(__dirname, "src/app"),
        "#fonts": path.resolve(__dirname, "public/fonts"),
        "#assets": path.resolve(__dirname, "public/assets"),
      },
      extensions: [".js", ".ts", ".tsx", ".scss", ".css"],
    },
    optimization: {
      minimize: !isDev,
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
    devtool: isDev ? "source-map" : false,
  };
};
