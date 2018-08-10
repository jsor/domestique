const tests = require.context('./', true, /test\.js$/);
tests.keys().forEach(tests);
