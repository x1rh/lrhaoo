const {createProxyMiddleware} = require('http-proxy-middleware');

console.log(process.env.NODE_ENV);


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



