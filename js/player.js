class Player {
    constructor(x = 0, y = 0, direction = 0, POV = 90) {
        this.position = new Vector2(x, y);
        this.direction = direction;
        this.POV = POV;
        this.moveSpeed = .025;
        this.rotSpeed = 2;
        this.collisionRadius = .25;
        this.walking_sound = new Howl({ src: ['sounds/walking_on_a_floor.mp3'], volume: 10 });

        this.weapon = new Weapon();
        this.weapon.hang_sprite.alpha = 0;
        this.weapon.hang2_sprite.alpha = 1;
        this.weapon.hang3_sprite.alpha = 0;
        this.bullets = [];
        this.container = new PIXI.Container();
        gameScene.addChild(this.container);
        this.weapon_timer = 0;

        this.brain = new PIXI.Sprite.fromImage("images/blue_brain.png");
        this.brain.x = 10;
        this.brain.y = 10;
        gameScene.addChild(this.brain);



        this.bullet_count = 20;
        var text_style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 32,
            fontWeight: 800,
            fill: ['#00FFFF'], // gradient
        });

        this.bullet_count_text = new PIXI.Text("", text_style);
        this.bullet_count_text.x = 120;
        this.bullet_count_text.y = 25;
        this.bullet_count_text.style.lineHeight = 80;
        this.bullet_count_text.zOrder = -5;
        this.bullet_count_text.text = this.bullet_count;
        gameScene.addChild(this.bullet_count_text);

        /*

                 this.heart = new PIXI.Sprite.fromImage("images/heart.png");
                this.heart.x = 45;
                this.heart.y = 95;
                gameScene.addChild(this.heart);

                this.HP = 100;
                var text_style = new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 32,
                    fontWeight: 800,
                    fill: ['#ce0000'], // gradient
                });

                this.HP_text = new PIXI.Text("", text_style);
                this.HP_text.x = 120;
                this.HP_text.y = 125;
                this.HP_text.style.lineHeight = 80;
                this.HP_text.zOrder = -5;
                this.HP_text.text = this.HP;
                gameScene.addChild(this.HP_text);

        */

    }
}

Player.prototype.relatively_xy = function(x, y) {
    var direction = this.direction / 180 * 3.14;
    var sin = Math.sin(direction);
    var cos = Math.cos(direction);
    return new Vector2(-sin * x + cos * y, cos * x + sin * y)
}

Player.prototype.Update = function(map, camera) {
    this.Rotate();
    this.Move(map, camera);
    this.attack(map);
};

Player.prototype.Rotate = function() {
    if (keys[keyboard.LEFT]) {
        this.direction -= this.rotSpeed;
    } else if (keys[keyboard.RIGHT]) {
        this.direction += this.rotSpeed;
    }

    if (this.direction > 180) {
        this.direction -= 360;
    }
    if (this.direction < -180) {
        this.direction += 360;
    }
};

Player.prototype.attack = function(map) {
    this.weapon_timer++;

    this.bullet_count_text.text = this.bullet_count;
    if (keys[keyboard.SPACE] && this.weapon_timer > 15 && this.bullet_count > 0) {
        this.bullet_count--;
        this.weapon.hang2_sprite.alpha = 0;
        this.weapon.hang3_sprite.alpha = 1;
        this.weapon.hang_sprite.alpha = 0;
        this.weapon_timer = 0;
        this.weapon.shoot_sound.play()
        this.bullets.push(new Bullet(this.relatively_xy(0.02, 0).x + this.position.x, this.relatively_xy(0.03, 0).y + this.position.y, this.direction, this.container));
    }

    if (this.weapon_timer > 15) {
        this.weapon.hang_sprite.alpha = 0;
        this.weapon.hang2_sprite.alpha = 1;
        this.weapon.hang3_sprite.alpha = 0;

    }

    if (this.weapon_timer > 1 && this.weapon_timer < 5) {
        this.weapon.hang_sprite.alpha = 1;
        this.weapon.hang2_sprite.alpha = 0;
        this.weapon.hang3_sprite.alpha = 0;
    }

    if (this.weapon_timer > 120 && this.bullet_count < 20) {

        this.bullet_count_text.text = this.bullet_count;
        this.bullet_count++;
        this.weapon_timer = 15;
    }

    if (this.bullets[0]) {
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].Update();

            if (map.get(this.bullets[i].position.x, this.bullets[i].position.y) > 0 ||
                pos_to_pos_distance(this.bullets[i].position, this.position) > 8
            ) {

                this.container.removeChildAt(i);
                this.bullets.shift();
            }

        }
    }


}


Player.prototype.Move = function(map, camera) {
    let dx = 0;
    let dy = 0;
    let distance = 0;
    if (keys[keyboard.W]) {
        dx += Math.cos(this.direction * (PI / 180)) * this.moveSpeed;
        dy += Math.sin(this.direction * (PI / 180)) * this.moveSpeed;
    }
    if (keys[keyboard.S]) {
        dx -= Math.cos(this.direction * (PI / 180)) * this.moveSpeed;
        dy -= Math.sin(this.direction * (PI / 180)) * this.moveSpeed;
    }
    if (keys[keyboard.A]) {
        dx -= Math.cos((this.direction + 90) * (PI / 180)) * this.moveSpeed;
        dy -= Math.sin((this.direction + 90) * (PI / 180)) * this.moveSpeed;
    }
    if (keys[keyboard.D]) {
        dx += Math.cos((this.direction + 90) * (PI / 180)) * this.moveSpeed;
        dy += Math.sin((this.direction + 90) * (PI / 180)) * this.moveSpeed;
    }

    let xCollisionRadius = (dx > 0) ? this.collisionRadius : -1 * this.collisionRadius;
    let yCollisionRadius = (dy > 0) ? this.collisionRadius : -1 * this.collisionRadius;
    if (map.wallGrid[Math.floor(this.position.x + dx + xCollisionRadius)][Math.floor(this.position.y)] > 0) {
        dx = 0;
    }
    if (map.wallGrid[Math.floor(this.position.x)][Math.floor(this.position.y + dy + yCollisionRadius)] > 0) {
        dy = 0;
    }
    this.position.x += dx;
    this.position.y += dy;

    if (map.wallGrid[Math.floor(this.position.x)][Math.floor(this.position.y)] < 0) {
        map.wallGrid[Math.floor(this.position.x)][Math.floor(this.position.y)] = 0;
    }
    distance = Math.sqrt(this.position.x * this.position.x + this.position.y * this.position.y);
    this.weapon.hang2_sprite.x = this.weapon.origin_x + Math.abs(distance % 1 - 0.5) * 50;
    this.weapon.hang2_sprite.y = this.weapon.origin_y + Math.abs(distance % 1 - 0.5) * 50;


    if (dx + dy != 0 && !this.walking_sound.playing())
        this.walking_sound.play();
    else if (dx + dy == 0)
        this.walking_sound.stop();

};