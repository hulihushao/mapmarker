module.exports = {
    publicPath: './',
    outputDir: "dist",
    devServer: {
        disableHostCheck: true,
        // port: 8009,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://192.168.90.99:8099',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            },
            '/file': {
                target: 'http://127.0.0.1/',
                ws: false,
                changeOrigin: true,
            },
        }
    },
}
