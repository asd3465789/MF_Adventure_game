class All_item {
    constructor() {

        this.ghost_container = new PIXI.Container();
        this.ghosts = [];
        gameScene.addChild(this.ghost_container);

        this.medicines_container = new PIXI.Container();
        this.medicines = [];
        gameScene.addChild(this.medicines_container);

    }
}

All_item.prototype.addghost = function(x, y) {
    this.ghosts.push(new Ghost(x, y, this.ghost_container));
}

All_item.prototype.addmedicine = function(x, y) {
    this.medicines.push(new Medicine(x, y, this.medicines_container));
    console.log(123);
}

All_item.prototype.Update = function() {

    if (this.ghosts[0]) {
        for (let i = 0; i < this.ghosts.length; i++) {
            if (pos_to_pos_distance(this.ghosts[i].position, player.position) < 0.3) {

                this.ghosts[i].pick_sound.play();
                this.ghost_container.removeChildAt(i);
                this.ghosts.splice(i, 1);

            }

        }
    }

    if (this.medicines[0]) {
        for (let i = 0; i < this.medicines.length; i++) {
            if (pos_to_pos_distance(this.medicines[i].position, player.position) < 0.3) {

                this.medicines[i].pick_sound.play();
                this.medicines_container.removeChildAt(i);
                this.medicines.splice(i, 1);

                player.bullet_count=20;

            }

        }
    }



}

class Medicine {
    constructor(x, y, container) {

        this.container = container;
        this.position = new Vector2(x, y);
        this.sprite = new PIXI.Sprite.fromImage('images/medicine.png');

        this.pick_sound = new Howl({ src: ['sounds/powerup10.mp3'], volume: 1 });
        this.origin_width = 100;
        this.origin_height = 150;
        this.sprite.alpha = 1;
        this.distFromPlayer = 0;
        this.sprite.parentGroup = gameGroup;
        this.container.addChild(this.sprite);

    }
}

class Ghost {
    constructor(x, y, container) {

        this.container = container;
        this.position = new Vector2(x, y);
        this.sprite = new PIXI.Sprite.fromImage('images/ghost.png');

        this.pick_sound = new Howl({ src: ['sounds/poka02.mp3'], volume: 10 });
        this.origin_width = 150;
        this.origin_height = 300;
        this.sprite.alpha = 1;
        this.distFromPlayer = 0;
        this.sprite.parentGroup = gameGroup;
        this.container.addChild(this.sprite);



    }
}