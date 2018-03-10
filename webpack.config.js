const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const SOURCE_PATH = path.resolve(__dirname, 'src');
const CONFIG_PATH = path.resolve(__dirname, 'config');
const ASSETS_PATH = path.resolve(__dirname, 'assets');
const BUILD_PATH = path.resolve(__dirname, 'build');
const NODE_MODULES_PATH = path.resolve(__dirname, 'node_modules');

const entryPoint = {
    entry: path.resolve(SOURCE_PATH, 'index.ts'),
};

const output = {
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js',
    },
};

const resolveEstensions = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
};

const aliases = {
    resolve: {
        modules: [SOURCE_PATH, 'node_modules'],
        alias: {
            config: CONFIG_PATH,
            three: path.resolve(NODE_MODULES_PATH, 'three', 'src'),
        },
    },
};

const typescriptLoader = {
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                include: [SOURCE_PATH, CONFIG_PATH],
            },
        ],
    },
};

const shaderLoader = {
    module: {
        rules: [
            {
                test: /\.glsl$/,
                loader: 'shader-loader',
                include: [NODE_MODULES_PATH],
            },
        ],
    },
};

const htmlPlugin = {
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(ASSETS_PATH, 'index.html'),
        }),
    ],
};

module.exports = merge(
    entryPoint,
    output,
    resolveEstensions,
    aliases,
    typescriptLoader,
    shaderLoader,
    htmlPlugin,
);
