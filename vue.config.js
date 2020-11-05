const  _ = require("underscore");
module.exports = {
    //可以通过vue.config.js修改webpack的默认配置
    //vue-cli默认隐藏所有webpack的配置
    devServer:{
        proxy: {
            '/api': {
                // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                target: 'https://www.baidu.com/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};