class ThrowableObject extends MovableObject {
    IMAGES_BOTTLEROTATION = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLESPLASH = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    throwBottle_sound = new Audio('audio/throwBottle.mp3')

    constructor(x, y, otherDirection) {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.otherDirection = otherDirection; // Nutze die Blickrichtung des Charakters
        
        this.loadImages(this.IMAGES_BOTTLEROTATION);
        this.loadImages(this.IMAGES_BOTTLESPLASH);
        this.throw(x, y);
        this.animate();
    }


    //ANCHOR - Other Direction is not defined
    throw(x, y) {
        console.log('Throwing in direction:', this.otherDirection);
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        this.throwBottle_sound.play();
        
        if (this.otherDirection) {
            this.x -= 100;
        }
    
        setInterval(() => {
            if (this.otherDirection) {
                // Bewegung nach links
                this.x -= 15;
            } else {
                // Bewegung nach rechts
                this.x += 15;
            }
        }, 50);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLEROTATION);
        }, 80);
    } 
}