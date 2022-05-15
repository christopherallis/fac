const path = require("path");

// vue.config.js
module.exports = {
    outputDir: path.resolve(__dirname, "src","views","dist"),
    publicPath: "/app/static/",
    indexPath: "index.html",

    pages: {
      'ticket': {
        entry: './src/views/vue/tickets/main.js',
        chunks: ['chunk-vendors','chunk-common','ticket']
      },
      'dashboard': {
        entry: './src/views/vue/dashboard/main.js',
        title: 'Dashboard',
        chunks: ['chunk-vendors','chunk-common','dashboard']
      },
      
    },
    configureWebpack: {
      // No need for splitting
      optimization: {
        //splitChunks: false
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, "src", "views", "vue")
        },
      },
    },
  }