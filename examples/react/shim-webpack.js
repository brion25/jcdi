var shimWebpackRequire = require('shim-webpack-require-for-node-tests')
var webpack = require('./webpack.config.js')

shimWebpackRequire(webpack);