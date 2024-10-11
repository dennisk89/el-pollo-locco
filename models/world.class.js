class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusbarHealth();
    statusBarBottle = new StatusbarBottle();
    statusBarCoin = new StatusbarCoin();
    throwableObject = [];
    isPaused = false;
    statusBarEndboss;
    






    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.canThrow = true;
        this.setupThrowObjectInterval();
        this.lastThrownBottle = null;
    }


    collectCoins_Sound = new Audio('audio/collectCoins.mp3')
    collectBottle_Sound = new Audio('audio/collectBottle.mp3')


    setWorld() {
        this.character.world = this;
    }


    setupThrowObjectInterval() {
        setInterval(() => {
            if (this.keyboard.D && this.canThrow) {
                this.checkThrowObjects();
                this.canThrow = false;
            } else if (!this.keyboard.D) {
                this.canThrow = true;
            }
        }, 50); // Kürzeres Intervall, um auf schnelle Tastendrücke zu reagieren
    }


    run() {
        setInterval(() => {
            if (!this.isPaused) { // Nur ausführen, wenn nicht pausiert
                this.checkCollisions();
                this.collectCoins();
                this.collectBottles();
                this.checkBottleHit();
                this.checkEnemyHitOnTop();
                this.startEndboss()
            }
        }, 50); // Standardmäßiger Intervall von 50ms
    }


    pauseRunFor(duration) {
        this.isPaused = true;
        setTimeout(() => {
            this.isPaused = false;
        }, duration);
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y + 100, this.character.otherDirection, this.character);
            this.throwableObject.push(bottle);
            this.lastThrownBottle = bottle;
            this.character.bottles--;
            this.statusBarBottle.setPercentageBottle(this.character.bottles);
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            // Prüfen, ob der Charakter mit dem Gegner kollidiert
            if (this.character.isColliding(enemy)) {
                // Prüfen, ob der Charakter den Gegner von oben trifft
                if (!this.character.chickenHitOnTop(enemy)) {
                    // Nur Schaden zufügen, wenn nicht von oben getroffen
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }


    checkEnemyHitOnTop() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.chickenHitOnTop(enemy)){
                console.log('Jumped on Enemy!', enemy);
                this.character.jump();
                enemy.hit();
                setTimeout(() => {
                    this.level.enemies.splice(index, 1);   
                }, 500);
                
            }
        })
    }


    checkBottleHit() {
        if (this.lastThrownBottle && this.endboss) {  // Prüfen, ob die Bottle und der Endboss existieren
            if (this.lastThrownBottle.isColliding(this.endboss)) {  // Kollision zwischen Bottle und Endboss prüfen
                console.log('Bottle HIT detected', this.endboss);
                this.endboss.hit();  // Den Endboss treffen
                this.statusbarEndboss.setPercentageEndboss(this.endboss.energy);  // Statusbar aktualisieren
            }
        }
    }


    collectCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin) && this.character.coins < 5) {
                this.character.coins += 1;
                this.collectCoins_Sound.play();
                this.level.coins.splice(index, 1);
                this.statusBarCoin.setPercentageCoin(this.character.coins)
            }
        })
    }


    collectBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.character.bottles < 5) {
                this.character.bottles += 1;
                this.collectBottle_Sound.play();
                this.level.bottles.splice(index, 1);
                this.statusBarBottle.setPercentageBottle(this.character.bottles);
            }
        })
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        if (this.statusbarEndboss) {
            this.addToMap(this.statusbarEndboss);
        }
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        //draw wird immer wieder aufgerufen

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    startEndboss(){
        if(this.character.x > 1900 && !this.endboss && !this.statusbarEndboss){
            this.endboss = new Endboss(); // Erstelle ein neues Endboss-Objekt
            this.level.enemies.push(this.endboss);
            this.statusbarEndboss = new StatusbarEndBoss;
            this.addToMap(this.statusbarEndboss);
        }
    }

    
}


