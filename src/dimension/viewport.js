export default function viewport() {
    const win = window;
    const docElem = document.documentElement;

    const widthDocEl = docElem.clientWidth;
    const widthWin = win.innerWidth;
    const heightDocEl = docElem.clientHeight;
    const heightWin = win.innerHeight;

    return {
        width: widthDocEl < widthWin ? widthWin : widthDocEl,
        height: heightDocEl < heightWin ? heightWin : heightDocEl
    };
}
