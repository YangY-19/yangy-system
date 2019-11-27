const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
        if (debug) { // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
        } else { // 生产环境配置
        }
        // Object.assign(config, { // 开发生产共同配置
        //     resolve: {
        //         alias: {
        //             '@': path.resolve(__dirname, './src'),
        //             '@c': path.resolve(__dirname, './src/components'),
        //             'vue$': 'vue/dist/vue.esm.js'
        //         }
        //     }
        // })
    },
    chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
        if (debug) {
            // 本地开发配置
        } else {
            // 生产开发配置
        }
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: { // 第三方插件配置
    },
    pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    // css: {
    //     loaderOptions: {
    //       sass: {
    //         data: `
    //           @import "@/assets/styles/_variable.scss";
    //         `
    //       }
    //     }
    //   },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8081,
        https: false,
        hotOnly: false,
        proxy: { // 配置跨域
            '/SystemService': {
                target: 'http://192.168.1.37:5000/',
                changOrigin: true,
                //相当于遇见/api才做代理，但真实的请求中没有/api，所以在pathRewrite中把’/api’去掉, 这样既有了标识, 又能在请求接口中把/api去掉
            },
            '/GetToken': {
                target: 'http://192.168.1.37:5000/',
                changOrigin: true,
            }
        },
        before: app => { }
    }
}
// context: ['/GetToken', '/SystemService'],
//             target: 'http://192.168.1.37:5000/',
//             ws: true,
//             changOrigin: true, 