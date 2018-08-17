import {onTransitionEnd, ready} from '../..';
import {parseTransition} from '../../src/event/on-transition-end';
import createFixture from '../fixture';

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
        const el = fixture.append('<div></div>');

        el.style.width = '10px';

        el.style.transitionProperty = 'all';
        el.style.transitionDuration = '.15s';

        onTransitionEnd(el, () => done());

        ready(() => {
            el.style.width = '1000px';
        });
    });

    it('adds a listener with duration in ms', done => {
        const el = fixture.append('<div></div>');

        el.style.width = '10px';

        el.style.transitionProperty = 'all';
        el.style.transitionDuration = '150ms';

        onTransitionEnd(el, () => done());

        ready(() => {
            el.style.width = '1000px';
        });
    });

    it('adds a listener with mixed transition', done => {
        const el = fixture.append('<div></div>');

        el.style.width = '10px';

        el.style.transitionProperty = 'height';
        el.style.transitionDuration = '.2ms, .4ms';
        el.style.transitionDelay = '.2ms';

        onTransitionEnd(el, () => done());

        ready(() => {
            el.style.width = '1000px';
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
            const el = fixture.append('<div></div>');

            el.style.transitionDuration = '2s';

            assert.equal(parseTransition(el)[1], 2000);
        });

        it('parses transition in seconds as integer', () => {
            const el = fixture.append('<div></div>');

            el.style.transitionProperty = 'all';
            el.style.transitionDuration = '2s';
            el.style.transitionDelay = '1s';

            assert.equal(parseTransition(el)[1], 3000);
        });

        it('parses transition in seconds as float', () => {
            const el = fixture.append('<div></div>');

            el.style.transitionProperty = 'all';
            el.style.transitionDuration = '.2s';
            el.style.transitionDelay = '.1s';

            assert.equal(parseTransition(el)[1], 300);
        });

        it('parses transition in milliseconds as integer', () => {
            const el = fixture.append('<div></div>');

            el.style.transitionProperty = 'all';
            el.style.transitionDuration = '2000ms';
            el.style.transitionDelay = '1000ms';

            assert.equal(parseTransition(el)[1], 3000);
        });

        it('parses transition in milliseconds as float', () => {
            const el = fixture.append('<div></div>');

            el.style.transitionProperty = 'all';
            el.style.transitionDuration = '2000.5ms';
            el.style.transitionDelay = '1000.5ms';

            assert.closeTo(parseTransition(el)[1], 3001, 1);
        });

        it('parses multiple transition in seconds as integer', () => {
            const el = fixture.append('<div></div>');

            el.style.transitionProperty = 'width, height';
            el.style.transitionDuration = '4s, 2s';
            el.style.transitionDelay = '2s, 1s';

            assert.equal(parseTransition(el)[1], 6000);
        });

        it('parses multiple transition in seconds as float', () => {
            const el = fixture.append('<div></div>');

            el.style.transitionProperty = 'width, height';
            el.style.transitionDuration = '.2s, .4s';
            el.style.transitionDelay = '.1s, .2s';

            assert.equal(parseTransition(el)[1], 600);
        });

        it('parses multiple transition in milliseconds as integer', () => {
            const el = fixture.append('<div></div>');

            el.style.transitionProperty = 'width, height';
            el.style.transitionDuration = '2000ms, 4000ms';
            el.style.transitionDelay = '1000ms, 2000ms';

            assert.equal(parseTransition(el)[1], 6000);
        });

        it('parses multiple transition in milliseconds as float', () => {
            const el = fixture.append('<div></div>');

            el.style.transitionProperty = 'width, height';
            el.style.transitionDuration = '2000.5ms, 4000.5ms';
            el.style.transitionDelay = '1000.5ms, 2000.5ms';

            assert.closeTo(parseTransition(el)[1], 6001, 1); // IE 10 floor()'s
        });

        it('parses multiple transition with mixed duration', () => {
            const el = fixture.append('<div></div>');

            el.style.transitionProperty = 'height';
            el.style.transitionDuration = '2000.5ms, 4000.5ms';
            el.style.transitionDelay = '2000.5ms';

            assert.closeTo(parseTransition(el)[1], 6001, 1); // IE 10 floor()'s
        });

        it('parses multiple transition with mixed properties', () => {
            const el = fixture.append('<div></div>');

            el.style.transitionProperty = 'height, width';
            el.style.transitionDuration = '2000.5ms';
            el.style.transitionDelay = '2000.5ms';

            assert.closeTo(parseTransition(el)[1], 4001, 1); // IE 10 floor()'s
        });

        it('parses multiple transition with mixed delay', () => {
            const el = fixture.append('<div></div>');

            el.style.transitionProperty = 'height';
            el.style.transitionDuration = '2000.5ms';
            el.style.transitionDelay = '2000.5ms, 4000.5ms';

            assert.closeTo(parseTransition(el)[1], 6001, 1); // IE 10 floor()'s
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
