const sources = require.context('../src/', true, /\.js$/);
sources.keys().forEach(sources);

const tests = require.context('./', true, /test\.js$/);
tests.keys().forEach(tests);
