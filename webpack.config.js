var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: "./components/AppRoot.jsx",
    output: {
        filename: "dist/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./'] }
        })
    ]
}
