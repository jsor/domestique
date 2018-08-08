let size = null;

export default function scrollbarWidth() {
    if (size !== null) {
        return size;
    }

    const scrollDiv = document.createElement('div');

    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    scrollDiv.style.width = '50px';
    scrollDiv.style.height = '50px';
    scrollDiv.style.overflow = 'scroll';

    document.body.appendChild(scrollDiv);

    size = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;

    document.body.removeChild(scrollDiv);

    return size;
}
