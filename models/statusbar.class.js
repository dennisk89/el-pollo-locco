class StatusbarHealth extends DrawableObject {
    IMAGES_HEALTHSTATUS = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
    
    percentage = 100;
   
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTHSTATUS);
        
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
        
        
        
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTHSTATUS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}

class StatusbarBottle extends DrawableObject {
    IMAGES_BOTTLESTATUS = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    
    percentage = 0;
    
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLESTATUS);
        
        this.x = 20;
        this.y = 40;
        this.width = 200;
        this.height = 50;
        this.setPercentageBottle(0);
        
        
        
    }

    setPercentageBottle(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLESTATUS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    resolveImageIndex() {
        if (this.percentage == 5) {
            return 5;
        } else if (this.percentage == 4) {
            return 4;
        } else if (this.percentage == 3) {
            return 3;
        } else if (this.percentage == 2) {
            return 2;
        } else if (this.percentage == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}


class StatusbarCoin extends DrawableObject {
    IMAGES_COINSTATUS = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];
    
    percentage = 0;
    
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINSTATUS);
        
        this.x = 20;
        this.y = 80;
        this.width = 200;
        this.height = 50;
        this.setPercentageCoin(0);
        
        
        
    }

    setPercentageCoin(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINSTATUS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    resolveImageIndex() {
        if (this.percentage == 5) {
            return 5;
        } else if (this.percentage == 4) {
            return 4;
        } else if (this.percentage == 3) {
            return 3;
        } else if (this.percentage == 2) {
            return 2;
        } else if (this.percentage == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}


class StatusbarEndBoss extends DrawableObject {
    IMAGES_ENDBOSSBAR = [
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];
    
    percentage = 0;
    
    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSSBAR);
        
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentageCoin(5);
        
        
        
    }

    setPercentageCoin(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    resolveImageIndex() {
        if (this.percentage == 5) {
            return 5;
        } else if (this.percentage == 4) {
            return 4;
        } else if (this.percentage == 3) {
            return 3;
        } else if (this.percentage == 2) {
            return 2;
        } else if (this.percentage == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}