// 检查node和npm版本
require('./check-versions')()
process.env.NODE_ENV = 'production'

var ora = require('ora')
// The UNIX command rm -rf for node. unix命令强制删除
var rm = require('rimraf')
var path = require('path')
// 控制台输出彩色文字插件
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

// loading动画
var spinner = ora('building for production...')
spinner.start()
// 首先删除输出目录下的文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    // 输出各文件编译状态
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
