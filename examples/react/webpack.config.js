var getConfig = require('hjs-webpack')
var isDev = process.env.NODE_ENV !== 'production'

module.exports = getConfig({
  in: 'src/app.js',
  out: 'public',
  isDev: isDev,
  clearBeforeBuild: true,
  devServer: {
    hot: true,
    contentBase: __dirname
  }
});