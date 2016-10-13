let webpack = require('webpack'),
    path = require("path"),
    commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js'),
    jqueryPlugin = new webpack.ProvidePlugin({$:"jquery",jQuery:"jquery","window.jQuery":"jquery"}),
    hotPlugin = new webpack.HotModuleReplacementPlugin();

// 热模式 webpack-dev-server --hot --quiet
module.exports = {
    //插件项
    plugins: [
        // commonsPlugin,
        jqueryPlugin,
        hotPlugin
    ],
    //页面入口文件配置web[
    entry: {
        index : ['webpack/hot/dev-server','./src/js/page/index.js']
    },
    devServer: {
        hot: true

    },
    //入口文件输出配置
    /**
     * @param publicPath js路径,path 路径配置,filename --hot 模式下需要 bundle.js
     */
    output: {
        publicPath: "http://127.0.0.1:8080/dist/js/page",
        path: path.resolve(__dirname, "dist/js/page"),
        filename: "bundle.js",
        // filename : "[name].js"
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.js$/,exclude:/(node_modules|bower_components|jquery.easyui.min.js)/,loader : 'babel',query : {presets:["es2015"]}},
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.html$/,loader: 'html' },
            { test: /\.sass$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
        ]
    },
    //其它解决方案配置
    resolve: {
        root: '', //绝对路径
        extensions: ['', '.js', '.json', '.css','sass'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js',
        }
    }
};

// 编译模式  webpack --display-error-detail
/*
module.exports = {
    //插件项
    plugins: [
        commonsPlugin,
        jqueryPlugin,
        hotPlugin
    ],
    //页面入口文件配置web[
    entry: {
        index : ['./src/js/page/index.js']
    },
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname, "dist/js/page"),
        filename : "[name].js"
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
        root: '~/WebStormSpace/angular_webpack/', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};*/
