const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const entryPoint = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
};

const output = {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
};

const resolveEstensions = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
};

const typescriptConfig = {
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {},
                    },
                ],
            },
        ],
    },
};

const htmlPlugin = {
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
    ],
};

module.exports = merge(
    entryPoint,
    output,
    resolveEstensions,
    typescriptConfig,
    htmlPlugin,
);
