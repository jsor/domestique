import { ready } from '../../index';

describe('ready()', () => {
    it('invokes callback when DOM is ready', () => {
        return new Promise(function(resolve) {
            ready(resolve);
        });
    });
});
