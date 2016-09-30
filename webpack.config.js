let webpack = require('webpack'),
    commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js'),
    jqueryPlugin = new webpack.ProvidePlugin({$:"jquery",jQuery:"jquery","window.jQuery":"jquery"}),
    hotPlugin = new webpack.HotModuleReplacementPlugin();

module.exports = {
    //插件项
    plugins: [
        commonsPlugin,
        jqueryPlugin,
        hotPlugin
    ],
    //页面入口文件配置web[
    entry: {
        index : ['webpack/hot/dev-server','./src/js/page/index.js']
    },
    //入口文件输出配置
    output: {
        path: 'dist/js/page',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.js$/,exclude:/(node_modules|bower_components)/,loader : 'babel',query : {presets:["es2015"]}},
            { test: /\.css$/, loader: 'style-loadenr!css-loader' },
            { test: /\.sass$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
        ]
    },
    //其它解决方案配置
    resolve: {
        root: 'D:/WebStormSpace/angular_scm/', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};
