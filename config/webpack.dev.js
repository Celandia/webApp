const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ThemeColorReplacer = require('webpack-theme-color-replacer'); // 实现皮肤自定义

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.jsx'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]_[hash].js' //[name]可以自定义名字，可以默认名字，加上hash
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'], // 导入语句没带文件后缀时，webpack会自动带上后缀去尝试访问文件是否存在
        alias: { // 配置项通过别名来把原来导入路径映射成一个新的导入路径
            '@assets': path.resolve('src/assets'),
            '@utils': path.resolve('src/utils'),
            '@containers': path.resolve('src/containers')
        }
    },
    devServer: { // 通过命令行传参
        // contentBase: path.resolve(__dirname, '../dist'),  使用historyApiFallback，不要配置contentBase
        historyApiFallback: {
            //使用正则匹配命中路由，用来本地mock数据
            rewrites: [{
                from: /^\/api\/.*/,
                to: function (context) {
                    return '/mock' + context.parsedUrl.pathname;
                }
            }]
        },
        inline: true, // 在构建完变化后的代码时通过代理客户端控制网页刷新
        hot: true // 热更新
    },
    module: {
        rules: [{
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "es2015", "react" // es6 语法， react编译
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
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
            template: './src/index.html', //要打包的html模版路径
            favicon: path.resolve(__dirname, '../src/assets/img/favicon.png')
        }),
        new ExtractTextPlugin('css/[name]_[hash].css'), // 分离css文件
        // ThemeColorReplacer实现自定义主题
        // 生成仅包含颜色的替换样式（主题色等）theme-colors.css
        new ThemeColorReplacer({
            fileName: 'css/theme.css',  // 定义输出的样式文件路径名称
            matchColors: [
                ...ThemeColorReplacer.getElementUISeries('#1890ff')  // 参数：传入主色调
            ]
        })
    ]
};