const path = require('path');

module.exports = function(config) {
    const {env} = process;

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],

        // list of files / patterns to load in the browser
        files: [
            'test/index.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/index.js': ['webpack']
        },

        webpack: {
            mode: 'production',
            optimization: {
                minimize: false
            },
            module: {
                strictExportPresence: true,
                rules: [
                    {
                        test: /\.js$/,
                        use: {
                            loader: 'istanbul-instrumenter-loader',
                            options: {esModules: true}
                        },
                        include: path.resolve(__dirname, 'src/')
                    }
                ]
            }
        },

        coverageIstanbulReporter: {
            reports: ['text', 'html'],
            fixWebpackSourcePaths: true
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'coverage-istanbul'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox'],
            },
        },

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [env.CI === 'true' ? 'ChromeHeadlessNoSandbox' : 'ChromeHeadless', 'FirefoxHeadless'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: env.CI === 'true',

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
};
