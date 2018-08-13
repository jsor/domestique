import { ready } from '../../index';

describe('ready()', () => {
    it('invokes callback when DOM is ready', (done) => {
        ready(() => {
            done();
        });
    });
});
