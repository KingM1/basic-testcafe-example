const createTestCafe = require('testcafe');
const fs = require('fs');

let testcafe = null;
let stream = '';
let reporterName = 'spec';

createTestCafe('localhost', 1337, 1338)
    .then((tc) => {
        testcafe = tc;
        return tc;
    })
    .then(() => {
        const runner = testcafe.createRunner();

        return runner
            .src('test-spec.js')
            // .browsers('browserstack:chrome')
            .browsers('browserstack:iPhone 11@13')
            .reporter(reporterName)
            .run({
                'assertion-timeout': 30000,
                skipJsErrors: true,
                skipUncaughtErrors: true,
            });
    })
    .then((failedCount) => {
        console.log(`Tests failed: ${failedCount}`);

        return testcafe.close().then(() => {
            if (failedCount > 0) {
                return Promise.reject();
            }
            process.exit(0);
            return Promise.resolve();
        });
    })
    .catch((e) => {
        console.log('Exiting with non-zero status code:', e ? e.message : null);
        console.log(e ? e.stack : null);
        process.exit(1);
    });
