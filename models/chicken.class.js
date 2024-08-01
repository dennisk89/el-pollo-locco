class Chicken extends MovableObject{
    height = 100
    width = 100
    y = 340 
    speed = 0.15
    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ] ;

constructor (){
    super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
    this.loadImages(this.IMAGES_WALKING)
    this.speed = 0.15 + Math.random() * 0.25;
    this.x = 200 + Math.random() * 1500;
    this.animate();
    this.moveLeft()
   }

   animate(){
    setInterval(() => {
        this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING)
},200);
}

}


