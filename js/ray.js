class Ray{
	constructor(angle){
		this.points = [];
		this.angle = angle;
		this.angleSin = Math.sin(angle * (PI/180));
		this.angleCos = Math.cos(angle * (PI/180));
		this.slope = this.angleSin/this.angleCos; //斜率
		this.right = this.angleCos > 0;
		this.up = this.angleSin > 0;
		this.offset=0;
		this.texture_ID=0;
		this.distance=0;
	}
}
