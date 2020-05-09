const {createProxyMiddleware} = require('http-proxy-middleware');

if (process.env.MY_ENV_FLAG === 'production') {
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
} else if(process.env.MY_ENV_FLAG === ''){
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


