class Enemy {
    constructor(x, y) {
        this.position = new Vector2(x, y);
        this.position.x = x + .5;
        this.position.y = y + .5;
        this.origin_pos= new Vector2(this.position.x, this.position.y);

        this.collisionRadius = .35;
        this.speed = .35;   
        this.sprite = new PIXI.Sprite.fromImage('images/grim_reaper.png');
     
        this.origin_width = this.sprite.width;
        this.origin_height = this.sprite.height;
        
        this.HP=10

        this.sprite.x = sceneWidth / 2;
        this.sprite.y = sceneHeight / 2;
        this.sprite.width = 10;
        this.sprite.height = 10;
        this.sprite.alpha = 1;
        gameScene.addChild(this.sprite);
        this.sprite.parentGroup = gameGroup;
        this.distFromPlayer = 1;
        this.damage_timer = 0;
    }
}

Enemy.prototype.Update = function(player) {
    this.move();
    this.damage_timer++;
    for (let i = 0; i < player.bullets.length; i++) {
        if (pos_to_pos_distance(player.bullets[i].position, this.position) < this.collisionRadius) {
            this.damage();            
        }

        if(this.HP<=0){
            this.HP=10;
            this.position.x=this.origin_pos.x;
            this.position.y=this.origin_pos.y;

        }


    }
};

Enemy.prototype.move = function() {

    var p_x = player.position.x;
    var p_y = player.position.y;
    var dx;
    var dy;
    if (this.position.x - p_x > this.collisionRadius) dx = -.01;
    else if (this.position.x - p_x < -this.collisionRadius) dx = .01;
    else dx = 0;

    if (this.position.y - p_y > this.collisionRadius) dy = -.01;
    else if (this.position.y - p_y < -this.collisionRadius) dy = .01;
    else dy = 0;
/*
    let xCollisionRadius = (dx > 0) ? this.collisionRadius : -1 * this.collisionRadius;
    let yCollisionRadius = (dy > 0) ? this.collisionRadius : -1 * this.collisionRadius;

    if (map.wallGrid[Math.floor(this.position.x + dx + xCollisionRadius)][Math.floor(this.position.y)] > 0) {
        dx = 0;
    }
    if (map.wallGrid[Math.floor(this.position.x)][Math.floor(this.position.y + dy + yCollisionRadius)] > 0) {
        dy = 0;
    }
*/
    this.position.x += dx;
    this.position.y += dy;

}

Enemy.prototype.damage = function() {
    if (this.damage_timer > 20) {
        this.damage_timer = 0;
        this.HP--;
        console.log("oh fuck");
    }
}
