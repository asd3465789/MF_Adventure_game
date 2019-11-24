class Radar {
    constructor() {
        this.player = player;
        this.map = map;
        this.enemy = enemy;

        this.sprite = new PIXI.Sprite.fromImage("images/Radar.png");
        this.sprite.x = 760;
        this.sprite.y = 22;

        this.ghost_box = new PIXI.Sprite.fromImage("images/ghost_box.png");
        this.ghost_box.x = 875;
        this.ghost_box.y = 140;

        this.ghost_count = 20;
        var text_style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 22,
            fontWeight: 800,
            fill: ['#00bb00'], // gradient
        });

        this.ghost_count_text = new PIXI.Text("", text_style);
        this.ghost_count_text.x = 915;
        this.ghost_count_text.y = 223;
        this.ghost_count_text.style.lineHeight = 80;
        this.ghost_count_text.zOrder = -5;
        this.ghost_count_text.anchor.set(0.5, 0.5);
        this.ghost_count_text.text = this.ghost_count;

        
        this.graphics = new PIXI.Graphics();
        this.graphics.alpha = 0.9;
        gameScene.addChild(this.sprite);
        gameScene.addChild(this.graphics);

        gameScene.addChild(this.ghost_box);
        gameScene.addChild(this.ghost_count_text);

        if (this.map.items.ghosts.length > 0) {
            for (let i = 0; i < this.map.items.ghosts.length; i++) {
                this.DrawMiniMap_object(this.map.items.ghosts[i], 0x00FFFF, 0.35, true);
            }
        }

    }
}

Radar.prototype.Update = function() {

    this.graphics.clear();

    if (this.map.items.ghosts.length > 0) {
        this.ghost_count_text.text=this.map.items.ghosts.length;
        for (let i = 0; i < this.map.items.ghosts.length; i++) {
            this.DrawMiniMap_object(this.map.items.ghosts[i], 0x00FFFF, 0.35, true);
        }
    }

     if (this.map.items.medicines.length > 0) {
        for (let i = 0; i < this.map.items.medicines.length; i++) {
            this.DrawMiniMap_object(this.map.items.medicines[i], 0x0000e3, 0.35, true);
        }
    }

    this.DrawMiniMap(map);
    this.DrawMiniMap_object(this.player, 0xf75000, 0.4, 1);
    this.DrawMiniMap_object(this.enemy, 0xFF0000,0.8);
}



Radar.prototype.DrawMiniMap = function(map) {

    for (x = 0; x < map.size; x++) {
        for (y = 0; y < map.size; y++) {
            if (map.wallGrid[Math.floor(x)][Math.floor(y)] > 0)
                this.MiniMap(180, map.size, x, y, 0x00bb00, this.graphics);
        }
    }
};

Radar.prototype.DrawMiniMap_object = function(object, color, scale = 1, iscircle = false) {

    var o_x = object.position.x - 0.7,
        o_y = object.position.y - 0.7;


    this.MiniMap(180, map.size, o_x, o_y, color, this.graphics, scale, iscircle);

}


Radar.prototype.MiniMap = function(size, map_size, x, y, color, graphics, scale = 1, iscircle = false) {
    var position = new Vector2(x, y);

    if (pos_to_pos_distance(position, player.position) >8 ) {
        return;
    }
    x -= player.position.x;
    y -= player.position.y;
    var w_h = size / map_size;
    var object_w_h = size / map_size * scale;
    var pos_x = 850;
    var pos_y = 100;


    if (iscircle) {

        graphics.beginFill(color, 1);
        graphics.drawCircle(pos_x + x * w_h + object_w_h * 2, pos_y + y * w_h + object_w_h * 2, object_w_h);
        graphics.endFill();

    } else {
        graphics.beginFill(color);
        graphics.drawRect(pos_x + x * w_h, pos_y + y * w_h, object_w_h, object_w_h); //x,y,w,h
        graphics.endFill();
    }


}