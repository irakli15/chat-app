var path = require('path');

module.exports = {
    entry: ['./src/main/js/index.js', "regenerator-runtime/runtime.js"],
    devtool: 'source-map',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        // filename: './src/main/resources/static/built/bundle.js'
        filename: './target/classes/static/built/bundle.js'
    },

    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                                ["@babel/plugin-transform-runtime"]
                            ]
                    }
                }]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ],
    }
};