
"use strict";

const PI = Math.PI;

class Vector2{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
}
/*
class PickUp{
	constructor(x,y, scene, group){
		this.x = x + .5;
		this.y = y + .5;
		this.sprite = new PIXI.Sprite.fromImage('images/key_1.png');
		this.sprite.x = sceneWidth/2;
		this.sprite.y = sceneHeight/2;
		this.sprite.width = 10;
		this.sprite.height = 10;
		scene.addChild(this.sprite);
		this.sprite.parentGroup = group;
	}
}*/

function ToHex(value){
	let hex;
	value = Math.floor(value);
	if(value < 0){
		hex = "00";
	} else {
		hex = value.toString(16);
		if (hex.length < 2) {
			hex = "0" + hex;
		}	
	}
	return "0x" + hex + hex + hex;
}

function pos_to_pos_distance(pos1,pos2){
	return Math.sqrt((pos1.x-pos2.x)*(pos1.x-pos2.x)+(pos1.y-pos2.y)*(pos1.y-pos2.y));
}