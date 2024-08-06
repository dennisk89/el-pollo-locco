class Coin extends MovableObject {
    IMAGES_MOVING = [
        'img_pollo_locco/img/8_coin/coin_1.png',
        'img_pollo_locco/img/8_coin/coin_2.png'
    ]
    width = 150;
    constructor(){
        super().loadImage('img_pollo_locco/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_MOVING)
        this.x = 400 + Math.random() * 1800;
        this.y = 60 + Math.random() * 60;
        this.animate();
    }

    /**
     * Starts the animation for the coin, changing images every 400 milliseconds
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_MOVING);
        }, 400);
    }
}