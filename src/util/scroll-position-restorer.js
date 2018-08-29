import parents from '../element/parents';

export default function scrollPositionRestorer(element) {
    const positions = parents(element).map(parent => {
        return [parent, parent.scrollTop, parent.scrollLeft];
    });

    return () => {
        positions.forEach(cache => {
            cache[0].scrollTop = cache[1];
            cache[0].scrollLeft = cache[2];
        });
    };
}
