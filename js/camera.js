class Camera {
    constructor(map, enemy, scene, group, sceneWidth, sceneHeight, resolution, player) {
        this.map = map;
        this.scene = scene;
        this.group = group;
        this.player = player;
        this.resolution = resolution;
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;
        //wallScale = 250;
        this.shadowDistance = 20;
        //  walls =  [this.resolution];
        this.walls_container = new PIXI.Container();
        this.scene.addChild(this.walls_container);

        // this.pickUpPool = this.GetPickUps();
        this.enemy = enemy;

        this.wall_textures = ['images/wall_tile.png', 'images/wall_tile2.png'];
        this.DrawBackground();


    }
}

Camera.prototype.GetWalls = function() {

    let wallWidth = this.sceneWidth / this.resolution;
    let walls = [this.resolution];
    for (let i = 0; i < this.resolution; i++) {
        walls[i] = new PIXI.Sprite.fromImage('images/wall_tile.png');
        walls[i].width = wallWidth;
        walls[i].height = 1;
        this.scene.addChild(walls[i]);
        walls[i].parentGroup = this.group;
    }
    return walls;
};

Camera.prototype.Update = function() {

    this.DrawWalls();

    if (this.player.bullets.length > 0) {

        for (let i = 0; i < this.player.bullets.length; i++) {
            this.DrawObject(this.player.bullets[i]);
        }

    }

    if (this.map.items.ghosts.length > 0) {
        for (let i = 0; i < this.map.items.ghosts.length; i++) {
            this.DrawObject(this.map.items.ghosts[i]);
        }
    }

     if (this.map.items.medicines.length > 0) {
        for (let i = 0; i < this.map.items.medicines.length; i++) {
            this.DrawObject(this.map.items.medicines[i]);
        }
    }

    this.DrawObject(this.enemy);

    
};

Camera.prototype.DrawBackground = function() {

    let backgroundSprite = new PIXI.Sprite.fromImage('images/ground.png');
    backgroundSprite.width = 960;
    backgroundSprite.height = 640;
    backgroundSprite.x = 0;
    backgroundSprite.y = 0;
    backgroundSprite.zOrder = 1000;
    backgroundSprite.parentGroup = this.group;
    this.background = backgroundSprite;
    this.scene.addChild(backgroundSprite);
};

Camera.prototype.DrawWalls = function() {

    let wallWidth = this.sceneWidth / this.resolution;
    let walls = [this.resolution];
    for (let i = this.walls_container.children.length - 1; i >= 0; i--) { //清空場景
        this.walls_container.removeChild(this.walls_container.children[i]);
    }

    for (let i = 0; i < this.resolution; i++) {

        let angle = this.player.direction - (this.player.POV / 2);
        angle = angle + ((i / this.resolution) * this.player.POV); //射線角度

        let ray = new Ray(angle); //新增射線
        ray.points.push(this.player.position);
        this.map.RayCast(ray, 15);

        let lastPoint = ray.points[ray.points.length - 1];
        let distance = (lastPoint.x - this.player.position.x) * (lastPoint.x - this.player.position.x) +
            (lastPoint.y - this.player.position.y) * (lastPoint.y - this.player.position.y);
        distance = Math.sqrt(distance);
        distance *= Math.cos((this.player.direction - ray.angle) * (PI / 180));

        let value = 175 - (distance * this.shadowDistance); //改變圖像深度陰影


        var texture = PIXI.Texture.fromImage(this.wall_textures[ray.texture_ID - 1]);

        walls[i] = new PIXI.Sprite.from(texture);
        var texture2 = new PIXI.Texture(texture, new PIXI.Rectangle(Math.abs(ray.offset) * texture.width - wallWidth<0?0:Math.abs(ray.offset) * texture.width - wallWidth, 0, wallWidth, texture.height));
        walls[i].setTexture(texture2);
        walls[i].width = wallWidth;
        this.walls_container.addChild(walls[i]);
        walls[i].parentGroup = this.group;
        walls[i].x = this.sceneWidth * (i / this.resolution);
        walls[i].tint = ToHex(value);
        walls[i].zOrder = distance; //設定z軸
        walls[i].height = (this.sceneHeight * .9) / distance;
        walls[i].y = (this.sceneHeight * .5) - (walls[i].height / 2);
    }
};



Camera.prototype.DrawObject = function(object) {
    let angle = Math.atan2(object.position.y - this.player.position.y, object.position.x - this.player.position.x) * 180 / PI //換算物體與玩家夾角
    let angleDifference = (this.player.direction - angle + 540) % 360 - 180;

    if (!(angleDifference <= (this.player.POV * .5) + 5 && angleDifference >= (this.player.POV * -.5) - 5)) { //當物體離開視線，直接將它移出畫面
           object.sprite.width=object.origin_width;
        object.sprite.x = -1500;
        return;
    }

    let distance = (object.position.x - this.player.position.x) * (object.position.x - this.player.position.x) + (object.position.y - this.player.position.y) * (object.position.y - this.player.position.y);
    distance = Math.sqrt(distance);

    object.distFromPlayer = distance;
    distance *= Math.cos((this.player.direction - angle) * (PI / 180));

    let value = 175 - ((distance * this.shadowDistance)); //改變圖像深度陰影
    object.sprite.tint = ToHex(value);

    object.sprite.zOrder = distance; //設定z軸
    object.sprite.height = object.origin_height / distance;
    object.sprite.width = object.origin_width / distance;

    object.sprite.x = (this.sceneWidth / 2) - ((this.sceneWidth / 2) * (angleDifference / (this.player.POV * .5))) - object.sprite.width / 2;
    object.sprite.y = (this.sceneHeight * .5) - (object.sprite.height / 2);

};
