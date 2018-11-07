const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]_[hash].js' //[name]可以自定义名字，可以默认名字，加上hash
    },
    resolve: {
        extensions: ['.js'], // 导入语句没带文件后缀时，webpack会自动带上后缀去尝试访问文件是否存在
        alias: { // 配置项通过别名来把原来导入路径映射成一个新的导入路径
            '@assets': path.resolve('src/assets'),
            '@utils': path.resolve('src/utils')
        }
    },
    devServer: {  // 通过命令行传参
        // contentBase: path.resolve(__dirname, '../dist'),  使用historyApiFallback，不要配置contentBase
        historyApiFallback: {
            //使用正则匹配命中路由，用来本地mock数据
            rewrites: [{
                from: /^\/api\/.*/,
                to: function(context) {
                    return '/mock' + context.parsedUrl.pathname;
                }
            }]
        },
        inline: true,  // 在构建完变化后的代码时通过代理客户端控制网页刷新
        hot: true   // 热更新
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "es2015", "react"   // es6 语法， react编译
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {loader: "css-loader"},
                        {loader: "sass-loader"}
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]?v=[hash:6]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html' //要打包的html模版路径
        }),
        new ExtractTextPlugin('css/[name]_[hash].css')  // 分离css文件
    ]
};