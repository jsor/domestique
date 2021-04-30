import {ready} from '../../index.js';

describe('ready()', () => {
    it('invokes callback when DOM is ready', done => {
        ready(() => {
            done();
        });
    });
});
