class SmallChicken extends MovableObject{
    height = 60
    width = 60
    y = 380
    speed = 0.4

    offset = {      //Offset zur genauen Kollisionsprüfung (Offset wird von der ursprünglichen Bildgröße abgezogen!)
        top: 1,
        left: 1,
        right: 1,
        bottom: 1
    };
    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]
    constructor (){
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING)
        this.speed = 0.4 + Math.random() * 0.6;
        this.x = 200 + Math.random() * 2200;
        this.animate()
        this.moveLeft();
    }


    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
    },100);
    }
    
    
    }