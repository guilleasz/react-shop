const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    ignore: '/node_modules/',
  },
};

module.exports = {
  entry:'./src/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: { presets: [ 'env', 'stage-0', 'react'] },
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-modules-flow-types-loader',
          cssLoader,
        ],
      }, {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-modules-flow-types-loader',
          cssLoader,
          'stylus-loader',
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: {
      index: 'index.html',
    },
  },
};
