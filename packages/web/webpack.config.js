const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    addPlugins,
    createConfig,
    defineConstants,
    entryPoint,
    env,
    setOutput,
    sourceMaps,
} = require('@webpack-blocks/webpack');

function typescript() {
    return (_, { merge }) => merge({
        resolve: {
            extensions: ['.ts', '.tsx'],
        },
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
    });
}

module.exports = createConfig([
    entryPoint('./src/index.ts'),
    setOutput('./build/bundle.js'),
    typescript(),
    addPlugins([
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/index.html',
        }),
    ]),
    defineConstants({
        'process.env.NODE_ENV': process.env.NODE_ENV || 'development',
    }),
    env('development', [
        sourceMaps('cheap-module-eval-source-map'),
    ]),
]);
