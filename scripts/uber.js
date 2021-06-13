const gameDom = document.getElementsByClassName('container')[0];
const gameStyle = getComputedStyle(gameDom);
const gameWidth = parseFloat(gameStyle.width);
const gameHeight = parseFloat(gameStyle.height);

class Rectangle {

    //width, height, left, top, xSpeed, ySpeed, dom 移动速度单位是px / s
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    }
  
    render() {
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }

    /**
     * 每s根据速度移动
     * @param {*} duration 单位是s
     */
    move(duration) {
        const newLeft = this.left - this.xSpeed * duration;
        const newTop = this.top + this.ySpeed * duration;
        this.left = newLeft;
        this.top = newTop;
        if (this.onmove) {
            this.onmove();
        }

        this.render();
    }
}