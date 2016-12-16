var getConfig = require('hjs-webpack'),
    path = require('path')

var isDev = process.env.NODE_ENV !== 'production'

const webpackConfig = getConfig({
  in: 'src/app.js',
  out: 'public',
  isDev: isDev,
  clearBeforeBuild: true,
  devServer: {
    hot: true,
    contentBase: __dirname
  }
});

webpackConfig.resolve.alias = {
  di : path.resolve(__dirname, '../../index.js'),
  src : path.resolve(__dirname, './src')
}



module.exports = webpackConfig;