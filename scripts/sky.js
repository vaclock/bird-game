const skyDom = document.getElementsByClassName('sky')[0];
const skyStyle = getComputedStyle(skyDom);
const skyWidth = parseInt(skyStyle.width);
const skyHeight = parseInt(skyStyle.height);

class Sky extends Rectangle {
    constructor(speed) {
        super(skyWidth, skyHeight, 0, 0, speed, 0, skyDom);
    }
    onmove() {
        if (this.left <= -gameWidth) {
            this.left = 0;
        }
    }
}
