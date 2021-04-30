import {onTransitionEnd, ready} from '../../index.js';
import {parseTransition} from '../../src/event/on-transition-end.js';
import createFixture from '../fixture.js';

describe('onTransitionEnd()', function () {
    this.timeout(5000);

    let fixture;

    beforeEach(() => {
        fixture = createFixture();
    });

    afterEach(() => {
        fixture.destroy();
        fixture = null;
    });

    it('adds a listener', done => {
        const element = fixture.append('<div></div>');

        element.style.width = '10px';

        element.style.transitionProperty = 'all';
        element.style.transitionDuration = '.15s';

        onTransitionEnd(element, () => done());

        ready(() => {
            element.style.width = '1000px';
        });
    });

    it('adds a listener with duration in ms', done => {
        const element = fixture.append('<div></div>');

        element.style.width = '10px';

        element.style.transitionProperty = 'all';
        element.style.transitionDuration = '150ms';

        onTransitionEnd(element, () => done());

        ready(() => {
            element.style.width = '1000px';
        });
    });

    it('adds a listener with mixed transition', done => {
        const element = fixture.append('<div></div>');

        element.style.width = '10px';

        element.style.transitionProperty = 'height';
        element.style.transitionDuration = '.2ms, .4ms';
        element.style.transitionDelay = '.2ms';

        onTransitionEnd(element, () => done());

        ready(() => {
            element.style.width = '1000px';
        });
    });

    it('works for non-event-targets', () => {
        assert.isFunction(onTransitionEnd(undefined, () => {}));
        assert.isFunction(onTransitionEnd('string', () => {}));
        assert.isFunction(onTransitionEnd(true, () => {}));
        assert.isFunction(onTransitionEnd(null, () => {}));
        assert.isFunction(onTransitionEnd(1, () => {}));
        assert.isFunction(onTransitionEnd(1.2, () => {}));
        assert.isFunction(onTransitionEnd({foo: 'bar'}, () => {}));
        assert.isFunction(onTransitionEnd(['bar'], () => {}));
    });

    describe('getLongestTransition()', () => {
        it('parses transition with only duration set', () => {
            const element = fixture.append('<div></div>');

            element.style.transitionDuration = '2s';

            assert.equal(parseTransition(element)[1], 2000);
        });

        it('parses transition in seconds as integer', () => {
            const element = fixture.append('<div></div>');

            element.style.transitionProperty = 'all';
            element.style.transitionDuration = '2s';
            element.style.transitionDelay = '1s';

            assert.equal(parseTransition(element)[1], 3000);
        });

        it('parses transition in seconds as float', () => {
            const element = fixture.append('<div></div>');

            element.style.transitionProperty = 'all';
            element.style.transitionDuration = '.2s';
            element.style.transitionDelay = '.1s';

            assert.equal(parseTransition(element)[1], 300);
        });

        it('parses transition in milliseconds as integer', () => {
            const element = fixture.append('<div></div>');

            element.style.transitionProperty = 'all';
            element.style.transitionDuration = '2000ms';
            element.style.transitionDelay = '1000ms';

            assert.equal(parseTransition(element)[1], 3000);
        });

        it('parses transition in milliseconds as float', () => {
            const element = fixture.append('<div></div>');

            element.style.transitionProperty = 'all';
            element.style.transitionDuration = '2000.5ms';
            element.style.transitionDelay = '1000.5ms';

            assert.closeTo(parseTransition(element)[1], 3001, 1);
        });

        it('parses multiple transition in seconds as integer', () => {
            const element = fixture.append('<div></div>');

            element.style.transitionProperty = 'width, height';
            element.style.transitionDuration = '4s, 2s';
            element.style.transitionDelay = '2s, 1s';

            assert.equal(parseTransition(element)[1], 6000);
        });

        it('parses multiple transition in seconds as float', () => {
            const element = fixture.append('<div></div>');

            element.style.transitionProperty = 'width, height';
            element.style.transitionDuration = '.2s, .4s';
            element.style.transitionDelay = '.1s, .2s';

            assert.equal(parseTransition(element)[1], 600);
        });

        it('parses multiple transition in milliseconds as integer', () => {
            const element = fixture.append('<div></div>');

            element.style.transitionProperty = 'width, height';
            element.style.transitionDuration = '2000ms, 4000ms';
            element.style.transitionDelay = '1000ms, 2000ms';

            assert.equal(parseTransition(element)[1], 6000);
        });

        it('parses multiple transition in milliseconds as float', () => {
            const element = fixture.append('<div></div>');

            element.style.transitionProperty = 'width, height';
            element.style.transitionDuration = '2000.5ms, 4000.5ms';
            element.style.transitionDelay = '1000.5ms, 2000.5ms';

            assert.closeTo(parseTransition(element)[1], 6001, 1); // IE 10 floor()'s
        });

        it('parses multiple transition with mixed duration', () => {
            const element = fixture.append('<div></div>');

            element.style.transitionProperty = 'height';
            element.style.transitionDuration = '2000.5ms, 4000.5ms';
            element.style.transitionDelay = '2000.5ms';

            assert.closeTo(parseTransition(element)[1], 6001, 1); // IE 10 floor()'s
        });

        it('parses multiple transition with mixed properties', () => {
            const element = fixture.append('<div></div>');

            element.style.transitionProperty = 'height, width';
            element.style.transitionDuration = '2000.5ms';
            element.style.transitionDelay = '2000.5ms';

            assert.closeTo(parseTransition(element)[1], 4001, 1); // IE 10 floor()'s
        });

        it('parses multiple transition with mixed delay', () => {
            const element = fixture.append('<div></div>');

            element.style.transitionProperty = 'height';
            element.style.transitionDuration = '2000.5ms';
            element.style.transitionDelay = '2000.5ms, 4000.5ms';

            assert.closeTo(parseTransition(element)[1], 6001, 1); // IE 10 floor()'s
        });

        it('works for non-elements', () => {
            const fallback = ['', 0];

            assert.deepEqual(parseTransition(undefined), fallback);
            assert.deepEqual(parseTransition('string'), fallback);
            assert.deepEqual(parseTransition(true), fallback);
            assert.deepEqual(parseTransition(null), fallback);
            assert.deepEqual(parseTransition(1), fallback);
            assert.deepEqual(parseTransition(1.2), fallback);
            assert.deepEqual(parseTransition({foo: 'bar'}), fallback);
            assert.deepEqual(parseTransition(['bar']), fallback);

            assert.deepEqual(parseTransition({style: {}}), fallback);
            assert.deepEqual(parseTransition({style: {transitionDuration: 'test'}}), fallback);
            assert.deepEqual(parseTransition({style: {transitionDuration: {}}}), fallback);
        });
    });
});
