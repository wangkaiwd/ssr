// 添加路径模块
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
// 导出配置信息的对象
module.exports = {
    // 设置导入的文件路径
    entry: {
        app: './src/index.js',
        // 需要分离的js文件名
        vendor: ["vue"]
    },
    // 设置文件的导出路径
    output: {
        path: path.join(__dirname + '/dist'),
        filename: 'bundle.js'
    },
    // 添加加载器,全部加载器都放在这个module集合中
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/, // 忽略,不处理 node_modules中的js文件
            },
            // 配置解析.vue文件的加载器
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            // 配置解析.css文件的加载器
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // 处理图片的加载器
            {
                // 处理图片和字体图标
                test: /\.(png|jpg|gif|jpeg|woff|eot|ttf|svg|otf|woff2)$/,
                use: 'url-loader?limit=2500'
            }
            // {
            //   test: /\.js$/,
            //   loader: 'babel-loader',
            //   include: [resolve('src'), resolve('test')]
            // }
        ]
    },

    // webpack-dev-server的一些配置信息
    devtool: 'eval',
    devServer: {
        contentBase: __dirname + '/src', // 当前服务器监听的路径
        hot: true,  // 热更新
        port: 8080,  // 定义端口号
        host: 'localhost',
        open: true    // 是否自动打开浏览器
    },

    // webpack中的插件添加
    plugins: [
        // 自动生成html文件
        new HtmlWebpackPlugin({
            template: './index.html',
            htmlWebpackPlugin: {
                "files": {
                    "css": ["app.css"],
                    "js": ["bundle.js", "vendor.js"]
                }
            }
        }),

        // 提供公共代码
        // 从bundle.js中提取css插件
        new ExtractTextPlugin("app.css"),
        // 把入口节点的公共代码提取出来，生成一个common.js
        // 入口节点的组件引入了vue，里面的代码有许多是vue的，并不是我们自己写的，要提取出来
        // vender.js是公共的vue的代码，bundle.js是我们自己的代码
        new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.js"})
    ]

}