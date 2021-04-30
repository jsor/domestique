import optionsArgument from './options-argument.js';

export default function ready(listener) {
    const state = document.readyState;

    if (state === 'complete' || state === 'interactive') {
        setTimeout(listener, 0);
        return;
    }

    document.addEventListener(
        'DOMContentLoaded',
        () => {
            listener();
        },
        optionsArgument(
            {
                capture: true,
                once: true,
                passive: true
            }
        )
    );
}
