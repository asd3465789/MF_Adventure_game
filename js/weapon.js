class Weapon {
    constructor() {

        this.origin_x = sceneWidth / 2 + 130;
        this.origin_y = sceneHeight / 2 + 30;

        this.shoot_sound = new Howl({ src: ['sounds/shoot1.mp3'], volume: 80 });

        this.hang_sprite = new PIXI.Sprite.fromImage("images/hang.png");
        this.hang_sprite.x = this.origin_x + 70;
        this.hang_sprite.y = this.origin_y + 70;


        this.hang2_sprite = new PIXI.Sprite.fromImage("images/hang2.png");
        this.hang2_sprite.x = this.origin_x
        this.hang2_sprite.y = this.origin_y

        this.hang3_sprite = new PIXI.Sprite.fromImage("images/hang3.png");
        this.hang3_sprite.x = this.origin_x
        this.hang3_sprite.y = this.origin_y


        gameScene.addChild(this.hang_sprite);
        gameScene.addChild(this.hang2_sprite);
        gameScene.addChild(this.hang3_sprite);

    }
}