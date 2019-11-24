class Bullet {
    constructor(x, y, angle, container) {
        
        this.container = container;
        this.position = new Vector2(x, y);
        this.angle = angle / 180 * 3.14;
        this.speed = 0.1;
        this.sprite = new PIXI.Sprite.fromImage('images/bullet.png');

        this.origin_width = 20;
        this.origin_height = 40;
        this.sprite.alpha = 1;
        this.distFromPlayer = 1;
        this.sprite.parentGroup = gameGroup;
        this.container.addChild(this.sprite);

    }
}

Bullet.prototype.Update = function() {
    this.position.x += Math.cos(this.angle) * this.speed;
    this.position.y += Math.sin(this.angle) * this.speed;

}

