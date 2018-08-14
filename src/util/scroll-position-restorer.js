import parents from '../element/parents';

export default function scrollPositionRestorer(element) {
    const positions = parents(element).map(element => {
        return {
            element,
            top: element.scrollTop,
            left: element.scrollLeft
        };
    });

    return () => {
        positions.forEach(({element, top, left}) => {
            element.scrollTop = top;
            element.scrollLeft = left;
        });
    };
}
