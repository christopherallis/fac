const path = require("path");

// vue.config.js
module.exports = {
    outputDir: path.resolve(__dirname, "src","views","dist"),
    publicPath: "/dashboard/static/",
    indexPath: "index.html",

    configureWebpack: {
      // No need for splitting
      optimization: {
        splitChunks: false
      }
    }
  }