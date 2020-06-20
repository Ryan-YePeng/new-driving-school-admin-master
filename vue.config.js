const resolve = dir => require("path").join(__dirname, dir);
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  filenameHashing: true,
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.symlinks(true); // 修复HMR
    config.resolve.alias.set("@", resolve("src"));
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" })
      .end();
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/index.scss";'
      }
    }
  },
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8087,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://123.57.232.1:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
