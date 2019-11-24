class Map {
    constructor(size) {
        this.size = size;
        this.wallGrid = []; 
        this.items = new All_item();
        this.Setup();
    }
}

Map.prototype.Update=function(){
    this.items.Update();
}

Map.prototype.Setup = function() {

    this.wallGrid = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],

        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 1,-1, 0, 0, 0,-1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],

        [1, 0, 1, 0, 1, 0, 1, 0, 1,-1, 0, 0, 0, 0, 0,-1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 0, -1, 1, 0, 1, 0, 1, 0, 0, 0, 1],

        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, -1, 0, 0, 0, -1, 2, 0, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 2, 2, 2, 0, 1, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [1, 0, 2, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [1, 0, 2, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2],
        [1, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],

        [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0, 2],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2],
        [1, 0, 0, 0, 1, 0, 1, 0, 2, 1, 1, 0, 1, 0, 1, 1, 1, 0, 2, 0, 2, 2, 2, 0, 2],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ]
    /*
    for (let x = 0; x < this.size; x++){
    	let row = [];
    	for (let y = 0; y < this.size; y++) {
    		if(x == 0 || x == this.size-1 || y == 0 || y == this.size-1 || Math.random() < .15){
    			row.push(1);
    		}else{
    			row.push(0);
    		}
    	}
    	this.wallGrid.push(row);
    }
    */
                  
    for(let x=0;x<this.size;x++){
        for(let y=0;y<this.size;y++){
            switch(this.wallGrid[x][y]){
                case 0: 
                if( Math.random() < .2)
                  this.items.addghost(x+.5,y+.5);
                break ;
                case -1: 
                  this.items.addmedicine(x+.5,y+.5);
                break ;
            }
        
         }
    }
};

Map.prototype.get=function(x,y){
return this.wallGrid[Math.floor(x)][Math.floor(y)];
}

Map.prototype.RayCast = function(ray,range) {
    let newPoint;
    do {
        newPoint = new Vector2(0, 0);

        let DistToX = 0;
        let DistToY = 0;


        if (ray.right) {
            DistToX = 1 - (ray.points[ray.points.length - 1].x % 1); 
        } else {
            if (ray.points[ray.points.length - 1].x % 1 == 0) {
                DistToX = -1;
            } else {
                DistToX = -(ray.points[ray.points.length - 1].x % 1); 
            }

        }

        if (ray.up) {
            DistToY = 1 - (ray.points[ray.points.length - 1].y % 1); 
        } else {
            if (ray.points[ray.points.length - 1].y % 1 == 0) {
                DistToY = -1;
            } else {
                DistToY = -(ray.points[ray.points.length - 1].y % 1);
            }

        }

        if (Math.abs(DistToY) > Math.abs(DistToX * ray.slope)) {                         //判斷最接近的為x網格或y網格
            newPoint.x = Math.round(ray.points[ray.points.length - 1].x + DistToX);
            newPoint.y = ray.points[ray.points.length - 1].y + (DistToX * ray.slope);
        } else {
            newPoint.x = ray.points[ray.points.length - 1].x + (DistToY / ray.slope);
            newPoint.y = Math.round(ray.points[ray.points.length - 1].y + DistToY);
        }
        ray.distance=Math.sqrt(newPoint.x*newPoint.x+newPoint.y*newPoint.y);
        // add point to ray
        ray.points.push(newPoint);

    } while (!this.Inspect(ray)) // 不斷偵測直到打到牆壁
  
};

Map.prototype.Inspect = function(ray) {
    let point = ray.points[ray.points.length - 1];  //每次讀取設線中最後一個點

    if (point.x > this.size + 1 || point.y > this.size + 1 || point.x < 0 || point.y < 0) {
        return true;
    }

    if (point.x % 1 == 0) { //確認是不是在x軸上
         ray.offset=point.y%1;
        if (ray.right) {

           ray.texture_ID=this.wallGrid[Math.floor(point.x)][Math.floor(point.y)] ;
            return (this.wallGrid[Math.floor(point.x)][Math.floor(point.y)] > 0);
        } else {
            ray.offset=point.y%1;
             ray.texture_ID=this.wallGrid[Math.floor(point.x) - 1][Math.floor(point.y)] ;
            return (this.wallGrid[Math.floor(point.x) - 1][Math.floor(point.y)] > 0);
        }
    } else { 

            ray.offset=point.x%1;
        if (ray.up) {
             ray.texture_ID=this.wallGrid[Math.floor(point.x)][Math.floor(point.y)];
            return (this.wallGrid[Math.floor(point.x)][Math.floor(point.y)] > 0);
        } else {
             ray.texture_ID=this.wallGrid[Math.floor(point.x)][Math.floor(point.y) - 1];
            return (this.wallGrid[Math.floor(point.x)][Math.floor(point.y) - 1] > 0);
        }
    }
};