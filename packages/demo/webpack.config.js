const path = require('path');

module.exports = {
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
  //         name: 'vendor',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },
  resolve: {
    symlinks: true,
    mainFields: ['browser', 'main'],
    modules: [path.resolve(__dirname, '../../node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
};
