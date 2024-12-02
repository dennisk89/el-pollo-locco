class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55
    energy = 100
    attacking = false
    alertOrAttackToggle = true

    offset = {      //Offset zur genauen Kollisionsprüfung (Offset wird von der ursprünglichen Bildgröße abgezogen!)
        top: 100,
        left: 30,
        right: 100,
        bottom: 10
    };
    IMAGES_WALKING = [
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

  

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2600;
        this.animate();
    }

    playHurtAnimationOnce() {
        if (!this.hurt) {
            this.hurt = true; 
            this.currentImage = 0; 

            let interval = setInterval(() => {
                this.playAnimation(this.IMAGES_HURT); 

                if (this.currentImage >= this.IMAGES_HURT.length) {
                    clearInterval(interval);
                    this.hurt = false;
                }
            }, 210); 
            this.animate();
        }
    }

    playAttackAnimationOnce() {
        if (!this.attacking) {
            this.attacking = true;
            this.currentImage = 0;
            
            let interval = setInterval(() => {
                this.playAnimation(this.IMAGES_ATTACK);
                
                if (this.currentImage >= this.IMAGES_ATTACK.length) {
                    clearInterval(interval);
                    this.attacking = false;
                }
            }, 150);
        }
    }

    playAlertAnimationOnce() {
        if (!this.attacking) { // Sicherstellen, dass der Boss nicht gleichzeitig angreift
            this.attacking = true;
            this.currentImage = 0;
            
            let interval = setInterval(() => {
                this.playAnimation(this.IMAGES_ALERT);
                
                if (this.currentImage >= this.IMAGES_ALERT.length) {
                    clearInterval(interval);
                    this.attacking = false;
                }
            }, 150);
        }
    }

    playDeadAnimationOnce() {
        
            this.currentImage = 0;
            
            setInterval(() => {
                this.playAnimation(this.IMAGES_DEAD);
                
                if (this.currentImage >= this.IMAGES_DEAD.length) {
                    
                }
            }, 150);
        
    }


    animate() {
        this.animation = setInterval(() => {
            if (this.energy <= 0) {  // Prüfen, ob der Endboss tot ist
                this.playDeadAnimationOnce();
                setTimeout(() => {
                    document.getElementById('winScreen').classList.add('position-absolute');
                    document.getElementById('restartButtonWin').classList.remove('d-none');
                    document.getElementById('winScreen').style.display = 'flex';
                    this.clearAllIntervals();
                }, 500);
                    
                
            } else if (this.isHurt()) {  // Prüfen, ob der Endboss verletzt ist
                this.playHurtAnimationOnce();
                clearInterval(this.animation)
            } else {  // Normales Laufen
                this.playAnimation(this.IMAGES_WALKING);
                this.speed = 2;
                this.moveLeft();
            }
        }, 300);
        setInterval(() => {
            if (!this.attacking && !this.hurt && this.energy > 0) {
                if (this.alertOrAttackToggle) {
                    this.playAttackAnimationOnce();
                } else {
                    this.playAlertAnimationOnce();
                }
                this.alertOrAttackToggle = !this.alertOrAttackToggle; // Umschalten zwischen Alert und Attack
            }
        }, 3000);
    }
}