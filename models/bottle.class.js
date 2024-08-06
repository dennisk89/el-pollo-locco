class Bottle extends MovableObject {
    IMAGES_MOVING = [
        'img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
    height = 100;
    width = 100;
    constructor(){
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_MOVING)
        this.x = 400 + Math.random() * 2200;
        this.y = 350
        this.animate();
    }

    /**
     * Starts the animation for the coin, changing images every 300 milliseconds
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_MOVING);
        }, 300);
    }
}