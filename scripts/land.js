const landDom = document.getElementsByClassName('land')[0];
const landStyle = window.getComputedStyle(landDom);
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landTop = parseFloat(landStyle.top);

class Land extends Rectangle{
    constructor(speed) {
        super(landWidth, landHeight, 0, landTop, speed, 0, landDom);
    }

    onmove() {
        if(this.left <= - gameWidth) {
            this.left = 0;
        }
    }
}

