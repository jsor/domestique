const tests = require.context('./', true, /test\.js$/);
tests.keys().forEach(testKeys => tests(testKeys));
