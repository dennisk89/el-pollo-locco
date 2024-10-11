class ThrowableObject extends MovableObject {
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

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

    throwBottle_sound = new Audio('audio/throwBottle.mp3');
    isHit = false;

    constructor(x, y, otherDirection, character) {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.initialX = x; // Speichere die Startposition
        this.initialY = y;
        this.height = 80;
        this.width = 60;
        this.character = character;
        this.otherDirection = otherDirection; // Nutze die Blickrichtung des Charakters
        this.updateLastMoveTime();
        this.loadImages(this.IMAGES_BOTTLEROTATION);
        this.loadImages(this.IMAGES_BOTTLESPLASH);
        this.throw(x, y);
        this.animate();
    }


    //ANCHOR - Other Direction is not defined
    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        this.throwBottle_sound.play();
        if (this.character) {
            this.character.onThrow();
        }

        if (!this.otherDirection) {
            this.x = this.initialX + 100; // Setze die Startposition um 100 Pixel nach links versetzt
        } 
    
        this.moveInterval = setInterval(() => {
            if (!this.splashPlayed) { // Nur bewegen, wenn Splash nicht abgespielt wurde
                if (this.otherDirection) {
                    this.x -= 15;
                } else {
                    this.x += 15;
                }
            }
        }, 50);
    }

    animate() {
        this.animationInterval = setInterval(() => {
            if (!this.isHit) {
                // Spiele die Bottle-Rotation nur ab, wenn kein Treffer erfolgt ist
                this.playAnimation(this.IMAGES_BOTTLEROTATION);
            }
            if (this.checkBottleGroundHit() || this.checkBottleHitEndboss()) {
                clearInterval(this.animationInterval);
                clearInterval(this.applyGravity);
               this.bottleSplash(); // Flasche trifft, Splash abspielen
            }
        }, 80);
    } 


    checkBottleHitEndboss() {
        if (this.isColliding(this.character.world.endboss) && !this.splashPlayed) { 
            clearInterval(this.moveInterval); // Bewege die Flasche nicht mehr
            this.splashPlayed = true;
            return true;
        }
        return false;
    }

    checkBottleGroundHit() {
        if (this.y >= 350 && !this.splashPlayed) {  // Überprüfe, ob die Flasche den Boden berührt
            clearInterval(this.moveInterval); // Bewege die Flasche nicht mehr
            this.splashPlayed = true;
            return true;
        }
        return false;
    }

    bottleSplash() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLESPLASH); // Splash-Animation abspielen
            setTimeout(() => {
                this.splashPlayed = true; // Animation abgeschlossen
    
                // Finde den Index des aktuellen Objekts im Array
                let index = this.character.world.throwableObject.indexOf(this);
    
                // Entferne das Objekt mit splice(), falls es im Array gefunden wurde
                if (index > -1) {
                    this.character.world.throwableObject.splice(index, 1);
                }
    
            }, 200); // Animation dauert 500ms
        }, 30);
    }
}