let supportedOptions;

export default function optionsSupport() {
    if (supportedOptions) {
        return supportedOptions;
    }

    supportedOptions = {
        capture: false,
        once: false,
        passive: false
    };

    const options = {
        get capture() {
            supportedOptions.capture = true;
            return false;
        },
        get once() {
            supportedOptions.once = true;
            return false;
        },
        get passive() {
            supportedOptions.passive = true;
            return false;
        }
    };

    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);

    return supportedOptions;
}
