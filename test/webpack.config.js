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
                test: /\.js$|\.jsx$/,
                use: {
                    loader: 'istanbul-instrumenter-loader',
                    options: {esModules: true}
                },
                enforce: 'post',
                include: path.resolve('src/')
            }
        ]
    }
};
