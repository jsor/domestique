const path = require('path');

module.exports = {
    mode: 'production',
    optimization: {
        minimize: false
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            babelrc: false,
                            presets: [
                                [
                                    'env',
                                    {
                                        modules: false,
                                        targets: {
                                            browsers: [
                                                'last 2 versions'
                                            ]
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'istanbul-instrumenter-loader',
                    options: {esModules: true}
                },
                include: path.resolve('src/')
            }
        ]
    }
};
