const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};


// module.exports = {
//   // Entry accepts a path or an object of entries. We'll be using the
//   // latter form given it's convenient with more complex configurations.
//   entry: {
//     app: PATHS.app
//   },
//   output: {
//     path: PATHS.build,
//     filename: 'bundle.js'
//   }
// };

const common = {
  entry:{
    app: PATHS.app
  },
  output:{
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module:{
    loaders:[
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      }
    ]
  }
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {});
}
