const  _ = require("underscore");
module.exports = {
    //可以通过vue.config.js修改webpack的默认配置
    //vue-cli默认隐藏所有webpack的配置
    devServer:{
        open:true,
        host:'localhost',
        port:8081,
        proxy: {
            '/api': {
                // 此处的写法，目的是为了 将 /api 替换成 target中的网址
                target: 'http://123.57.239.79:3180',
                // target:'http://172.17.237.22:3180',
                // target: 'http://localhost:8080/',
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