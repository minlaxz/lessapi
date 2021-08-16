const path = require('path')
const webpack = require('webpack')

// const mode = process.env.NODE_ENV || 'production'

module.exports = {
    output: {
        filename: `worker.js`,
        path: path.join(__dirname, 'dist'),
    },
    // mode,
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [],
    },
    module: {
        rules: [
            {
                // test: /\.js?$/,
                loader: "babel-loader",
                // exclude: /node_modules/,
                // options: {
                //     transpileOnly: true,
                // },
            },
        ],
    },
}
