/**
 * 判断两个矩形是否相撞
 * @param {*} rect1 
 * @param {*} rect2 
 */
function isHit(rect1, rect2) {
    // 两个矩形横向中心点的距离小于二者宽度之和一半 / 两个矩形纵向中心点的距离小于高度之和一半
    const rect1Style = rect1.getBoundingClientRect();
    const rect1X = rect1Style.left + rect1.clientWidth / 2;
    const rect1Y = rect1Style.top + rect1.clientHeight / 2;

    const rect2Style = rect2.getBoundingClientRect();
    const rect2X = rect2Style.left + rect2.clientWidth / 2;
    const rect2Y = rect2Style.top + rect2Style.height / 2;

    const disx = Math.abs(Math.round(rect1X - rect2X));
    const disy = Math.abs(Math.round(rect1Y - rect2Y));
    if (disx <= (rect1.offsetWidth + rect2.offsetWidth) / 2 && disy <= (rect2.offsetHeight + rect1.offsetHeight) / 2) {
        return true;
    }

    return false;
}


class Game {
    constructor() {
        this.sky = new Sky(50);
        this.land = new Land(100);
        this.bird = new Bird();
        this.pipePair = new PipepairProduce(100);
        this.startTimer = null;
        this.gameover = false;
        this.score = 0;
    }

    /**
     * 游戏开始
     * @param {*} duration  毫秒
     */
    start(duration) {
        if (this.startTimer) {
            return;
        }
        if (this.gameover) {
            window.location.reload();
        }

        const tick = duration / 1000;
        this.pipePair.startProduce();
        this.bird.startSwiper();

        this.startTimer = setInterval(() => {
            // 判断小鸟是否与大地相撞
            if (this.isGameover()) {
                this.gameover = true;

                this.stop();
                console.log('游戏结束')
            }
            this.sky.move(tick);
            this.land.move(tick);
            this.bird.move(tick);
            this.pipePair.move(tick);

            // 在这里进行每对柱子和小鸟的碰撞检测
            for (let i = 0; i < this.pipePair.pipes.length; ++i) {
                if (isHit(this.bird.dom, this.pipePair.pipes[i].upPipe.dom) || isHit(this.bird.dom, this.pipePair.pipes[i].downPipe.dom)) {
                    this.gameover = true;
                    this.stop();
                    console.log('游戏结束')
                }
            }

        }, duration)
    }


    // 暂停游戏
    stop() {
        this.pipePair.stopProduce();
        this.bird.stopSwiper();
        clearInterval(this.startTimer);
        this.startTimer = null;
        this.calcScore();
    }

    //计算分数并显示
    calcScore() {
        var end = document.getElementsByClassName('end')[0];
        end.style.display = 'flex';
        this.score = this.pipePair.destoryPipe;
        if (this.pipePair.pipes.length !== 0 && this.pipePair.pipes[0].downPipe.left < this.bird.left) {
            this.score += 1;
        }
        document.getElementsByClassName('score')[0].innerText = this.score;
    }

    // 判断游戏是否结束,小鸟碰到柱子或者大地，返回boolean
    isGameover() {
        if (this.bird.top >= landTop - this.bird.height) {
            return true;
        }
        return false;
    }

    // 为游戏添加键盘事件
    regEvent() {
        window.onkeydown = (e) => {
            if (e.code === 'Enter') {
                if (this.startTimer) {
                    this.stop();
                } else {
                    this.start(16);
                }
            } else if (e.code === 'Space') {
                this.bird.jump();
            }
        }
    }
}

const game = new Game();
// game.start(16);
game.regEvent();