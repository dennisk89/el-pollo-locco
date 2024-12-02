class Character extends MovableObject {
    height = 350
    width = 150
    lastMove;
    lastHit;
    y = 10
    speed = 10
    startImage = 'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png';

    offset = {      //Offset zur genauen Kollisionsprüfung (Offset wird von der ursprünglichen Bildgröße abgezogen!)
        top: 140,
        left: 40,
        right: 40,
        bottom: 20
    };

    IMAGES_WALKING = [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_STANDING = [
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_SLEEPING = [
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    walking_sound = new Audio('audio/walking.mp3')
    jump_sound = new Audio('audio/jump.mp3')
    

    constructor() {
        super().loadImage(this.startImage);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.animate();
        this.applyGravity();
        this.lastMove = new Date().getTime();
        this.updateLastMoveTime();
        this.lastHit = 0;
    }

    onThrow() {
        this.lastMove = new Date().getTime();
    }


    playJumpAnimationOnce() {
        if (!this.isJumping) {
            this.isJumping = true; // Setze den Sprungstatus
            this.currentImage = 0; // Setze das Bild zurück, um die Animation von vorne zu starten

            let interval = setInterval(() => {
                this.playAnimation(this.IMAGES_JUMPING); // Nutze die bestehende playAnimation Methode

                if (this.currentImage >= this.IMAGES_JUMPING.length) {
                    clearInterval(interval); // Stoppe die Animation, wenn alle Bilder durchlaufen sind
                    this.isJumping = false; // Setze den Sprungstatus zurück
                }
            }, 110); // Passe die Dauer an, wie schnell die Bilder wechseln sollen
        }
    }

    updateLastHitTime() {
        this.lastHit = new Date().getTime();
    }

    timeSinceLastMove() {
        return new Date().getTime() - this.lastMove; // Zeit seit der letzten Bewegung in Millisekunden
    }

    registerHit() {
        let currentTime = new Date().getTime();
        this.lastHit = currentTime;     // Aktualisiere den letzten Trefferzeitpunkt
        this.lastMove = currentTime;    // Setze auch den letzten Bewegungszeitpunkt zurück
    }

    startHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
    }

    // Funktion zur Steuerung der Walking-Animation
    startWalkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            let moved = false;

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
                moved = true;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
                moved = true;
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jump_sound.play();
                this.playJumpAnimationOnce();
                this.isJumpAnimationPlayed = true;
                moved = true;
            }

            if (moved) {
                this.updateLastMoveTime();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        // Haupt-Update-Intervall
        setInterval(() => {
            let timeSinceLastMove = new Date().getTime() - this.lastMove;
            let timeSinceLastHit = new Date().getTime() - this.lastHit;

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    document.getElementById('lostGame').classList.add('position-absolute');
                    document.getElementById('restartButtonLost').classList.remove('d-none');
                    document.getElementById('lostGame').style.display = 'flex';
                    this.clearAllIntervals();
                }, 800);
            } else if (this.isHurt()) {
                this.startHurtAnimation(); // Startet ein eigenes Intervall für Hurt
            } else if (timeSinceLastMove > 5000 && timeSinceLastHit > 5000) {
                this.playAnimation(this.IMAGES_SLEEPING);
            } else if (timeSinceLastMove > 100) {
                this.playAnimation(this.IMAGES_STANDING);
            } else if (!this.isAboveGround()) {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.startWalkingAnimation(); // Startet ein eigenes Intervall für Walking
                }
            }
        }, 150);



    }


}
