const {createProxyMiddleware} = require('http-proxy-middleware');

console.log('what is NONE_ENV:' + process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    module.exports = function (app) {
        app.use(
            "/api",
            createProxyMiddleware({
                target: "http://backend:5000/",
                changeOrigin: true
            })
        );
        app.use(
            "/auth",
            createProxyMiddleware({
                target: "http://backend:5000/",
                changeOrigin: true
            })
        );
    };
} else if(process.env.NODE_ENV === 'development'){
    module.exports = function (app) {
        app.use(
            "/api",
            createProxyMiddleware({
                target: "http://localhost:5000/",
                changeOrigin: true
            })
        );
        app.use(
            "/auth",
            createProxyMiddleware({
                target: "http://localhost:5000/",
                changeOrigin: true
            })
        );
    };
}


