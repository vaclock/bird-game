const birdDom = document.getElementsByClassName('bird')[0];
const birdStyle = window.getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdLeft = parseFloat(birdStyle.left);
const birdTop = parseFloat(birdStyle.top);


class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 500;
        this.v = 0;
        this.swiperStatus = 1;
    }

    /**
     * 
     * @param {*} duration s
     */
    move(duration) {
        this.v = this.v + this.g * duration;
        // duration s之后下降的距离
        const yDisc = this.v * duration + 1 / 2 * this.g * duration * duration;
        const newTop = this.top + yDisc;
        this.top = newTop; 
        if (this.onmove) {
            this.onmove();
        }
        this.render();
    }

    onmove() {
        if (this.top >= landTop - this.height) {
            this.top = landTop - this.height;
            this.v = 0;
        } else if (this.top <= 0) {
            this.top = 0;
        }
    }

    // 开始煽动翅膀
    startSwiper() {
        // 防止开多个计时器
        if(this.swipertime) {
            return;
        }
        this.swipertime = setInterval(() => {
            this.swiper()
        }, 200)
    }
    // 停止煽动翅膀
    stopSwiper() {
        clearInterval(this.swipertime);
        this.swipertime = null;
    }

    //给小鸟一个向上的初速度 
    jump() {
        this.v = -250;
    }
    swiper() {
        this.swiperStatus = this.swiperStatus + 1;
        if (this.swiperStatus === 4) {
            this.swiperStatus = 1;
        }
        this.dom.className = `bird swiper${this.swiperStatus}`;
    }
}

