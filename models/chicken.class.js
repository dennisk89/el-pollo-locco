class Chicken extends MovableObject {
    height = 100
    width = 100
    energy = 1
    y = 360
    speed = 0.15

    offset = {      //Offset zur genauen Kollisionsprüfung (Offset wird von der ursprünglichen Bildgröße abgezogen!)
        top: 20,
        left: 10,
        right: 10,
        bottom: 20
    };
    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.25;
        this.x = 200 + Math.random() * 1500;
        this.animate();
        this.moveLeft()
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
            if (this.isDead()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_DEAD);

            }
        }, 1000 / 60);
        setInterval(() => {
            if(this.isDead()){
            this.playAnimation(this.IMAGES_DEAD);
            
            } else {
                this.playAnimation(this.IMAGES_WALKING)
            }
    },100);
    }

}


