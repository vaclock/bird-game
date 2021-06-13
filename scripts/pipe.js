class Pipe extends Rectangle {
    constructor(height, top, speed, dom) {
        super(52, height, gameWidth, top, speed, 0, dom);
    }

    onmove() {
        if (this.left <= -this.width) {
            //当看不到柱子之后，移除dom
            this.dom.remove();
        }
    }
}
// height [80, 370]
function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
class PipePair {
    constructor(speed) {
        this.gap = 150;
        this.speed = speed;
        this.minHeight = 80;
        this.maxHeight = 250;

        const upDom = document.createElement('div');
        upDom.className = 'pipe up';
        this.upHeight = getRandom(this.minHeight, this.maxHeight);
        this.upTop = 0;
        this.upPipe = new Pipe(this.upHeight, this.upTop, this.speed, upDom);

        const downDom = document.createElement('div');
        downDom.className = 'pipe down';
        this.downHeight = landTop - this.gap - this.upHeight;    //下面的柱子的高度由上面的柱子和间隙决定
        this.downTop = landTop - this.downHeight;
        this.downPipe = new Pipe(this.downHeight, this.downTop, this.speed, downDom);

        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }

    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration)
    }
}


class PipepairProduce {
    constructor(speed) {
        this.speed = speed;
        this.timer = null;
        this.pipes = [];
        this.duration = 1800;
        this.destoryPipe = 0;
    }

    startProduce() {
        this.timer = setInterval(() => {
            this.pipes.push(new PipePair(this.speed));
        }, this.duration)
    }

    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }

    move(duration) {
        for(let i = 0; i < this.pipes.length; ++i) {
            if(this.pipes[i].upPipe.left < -this.pipes[i].upPipe.width) {
                this.pipes.splice(i, 1);
                this.destoryPipe++;
                i--;
            }
        }
        this.pipes.forEach((pair) => {
            pair.move(duration);
        })
    }
}

