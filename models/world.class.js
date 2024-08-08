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
    
    
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
           this.checkCollisions(); 
           this.checkThrowObjects();
           this.collectCoins(); 
           this.collectBottles();
        }, 200);
    }


    checkThrowObjects() {
        if(this.keyboard.D) {
            console.log('Taste D wurde gedrückt')
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
        }
    }


    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                console.log('Colission Detected', enemy);
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy)
                console.log('Energy :' , this.character.energy)
            }
        })
    }


    collectCoins(){
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                console.log('Colission Detected', coin);
                if (this.character.coins < 5) {
                    this.character.coins += 1;
                    this.level.coins.splice(index, 1);
                }
                this.statusBarCoin.setPercentageCoin(this.character.coins)
                console.log('Energy :' , this.character.energy)
            }
        })
    }


    collectBottles(){
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                console.log('Colission Detected', bottle);
                if (this.character.bottles < 5) {   
                    this.character.bottles += 1;
                    this.level.bottles.splice(index, 1);
                }
                this.statusBarBottle.setPercentageBottle(this.character.bottles);
                console.log('Bottles:', this.character.bottles);
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
        this.addObjectsToMap(this.level.bottles) ;
        this.addObjectsToMap(this.throwableObject);
        
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
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
}


