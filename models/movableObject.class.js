class MovableObject extends DrawableObject {
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    offsetY = 0;
    energy = 100;
    lastHit = 0;
    bottles = 0;
    coins = 0;


    applyGravity() {
        this.applyGravity = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return true;
        } else {
            return this.y < 100;
        }
    }



    // Bessere Formel zur Kollisionsberechnung (Genauer)
    isColliding(obj) {

        return (this.x + this.width - this.offset.right) >= (obj.x + obj.offset.left) &&   //Pepe rechts von Chicken
            (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) &&    //Pepe links von Chicken
            (this.y + this.height - this.offset.bottom) >= (obj.y + obj.offset.top) &&   //Pepe unterhalb von Chicken
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom)
        // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    }


   
    chickenHitOnTop(obj) {
        // Überprüfen, ob der Charakter überhaupt eine Kollision hat
        if (this.isColliding(obj)) {
            // Prüfen, ob der Charakter von oben auf den Gegner springt
            this.isDead();
            return (this.y + this.height - this.offset.bottom) <= (obj.y + obj.offset.top + 25) 
                  
        }
        return false;
    }


    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    endbossHit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 300;
        return timepassed < 1;
    }


    isDead() {
        return this.energy == 0;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    moveRight() {
        this.x += this.speed;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    jump() {
        this.currentImage = 0;
        this.speedY = 30;
        if(this.world) {
            this.world.pauseRunFor(100);
        }
    }

    updateLastMoveTime() {
        this.lastMove = new Date().getTime(); // Aktualisiere den letzten Bewegungszeitpunkt
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
      }
}