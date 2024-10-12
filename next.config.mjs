// next.config.mjs
import MiniCssExtractPlugin from "mini-css-extract-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // サーバサイドでない場合にプラグインを追加
    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash].css",
          chunkFilename: "static/css/[id].[contenthash].css",
        }),
      );
    }

    // カスタム Webpack の設定が必要であれば、ここで他の設定を追加
    return config;
  },
};

export default nextConfig;
