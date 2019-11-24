"use strict";
const app = new PIXI.Application(960,640);

app.stage = new PIXI.display.Stage();

app.stage.group.enableSort = true;

document.body.appendChild(app.view);

const sceneWidth = app.view.width;
const sceneHeight = app.view.height;
const resolution = 500;

let startScene;
let gameScene;
let gameGroup;
let gameOverScene;

let startSceneMusic;
let gameSceneMusic;
let enemySounds = [];
let timeSinceEnemySound;
let ambientSounds = [];

let player;
let enemy;
let map;
let cam;
let playing;
let radar;

let title;
let startLabel;
let controls;
let instructions;
let gameOverText;
let deathCountText
let playAgainLabel;

PIXI.loader.add("images/ground.png");
PIXI.loader.add("images/grim_reaper.png");
PIXI.loader.add("wall_texture","images/wall_tile.png");
PIXI.loader.add("wall_texture2","images/wall_tile2.png");
PIXI.loader.add("images/key_1.png");
PIXI.loader.add("images/key_2.png");
PIXI.loader.add("images/key_3.png");
PIXI.loader.add("images/key_4.png");

PIXI.loader.on("progress",e=>{console.log(`progress=${e.progress}`)});
PIXI.loader.load(Setup);

function Setup(){

	// #1 - Create the `start` scene
	startScene = new PIXI.Container();
	startScene.visible = false;
	app.stage.addChild(startScene);


	gameGroup = new PIXI.display.Group(0,true);
	app.stage.addChild(new PIXI.display.Layer(gameGroup));

	gameScene = new PIXI.Container();
	app.stage.addChild(gameScene);

	gameOverScene = new PIXI.Container();
	gameOverScene.visible = false;
	app.stage.addChild(gameOverScene);


	LoadLabels();

	startSceneMusic = new Howl({src: ['sounds/forest.ogg'], loop: true, volume: 0});
	gameSceneMusic = new Howl({src: ['sounds/MyVeryOwnDeadShip.ogg'], loop: true, volume: 0});

	timeSinceEnemySound = 0;
	enemySounds.push(new Howl({src: ['sounds/fantasy-sound-library/Dragon_Growl_00.wav'], volume: 0.5}));
	enemySounds.push(new Howl({src: ['sounds/fantasy-sound-library/Dragon_Growl_01.wav'], volume: 0.5}));

	Menu();

	app.ticker.add(GameLoop);

}

function LoadLabels(){
	title = new PIXI.Text("MF Adventure");
	title.style = new PIXI.TextStyle({
    	fill: "#aaaaaa",
    	fontFamily: "Impact",
    	fontSize: 96,
    	fontVariant: "small-caps"
	});
	title.anchor.x = 0.5;
	title.anchor.y = 0.5;
	title.x = sceneWidth/2;
	title.y = 200;
	startScene.addChild(title);

	controls = new PIXI.Text("移動: W A S D \n轉向: 🡠 🡢");
	controls.style = new PIXI.TextStyle({
    	fill: "#555555",
    	fontFamily: "Impact",
    	fontSize: 24,
    	fontVariant: "small-caps"
	});
	controls.anchor.x = 0.5;
	controls.anchor.y = 0.5;
	controls.x = sceneWidth/2;
	controls.y = 350;
	startScene.addChild(controls);

	startLabel = new PIXI.Text("按下 enter 開始遊戲");
	startLabel.style = new PIXI.TextStyle({
    	fill: "#555555",
    	fontFamily: "Impact",
    	fontSize: 24,
    	fontVariant: "small-caps"
	});
	startLabel.anchor.x = 0.5;
	startLabel.anchor.y = 0.5;
	startLabel.x = sceneWidth/2;
	startLabel.y = 600;
	startScene.addChild(startLabel);

	gameOverText = new PIXI.Text("");
	gameOverText.style = new PIXI.TextStyle({
    	fill: "#aaaaaa",
    	fontFamily: "Impact",
    	fontSize: 96,
    	fontVariant: "small-caps"
	});
	gameOverText.anchor.x = 0.5;
	gameOverText.anchor.y = 0.5;
	gameOverText.x = sceneWidth/2;
	gameOverText.y = 200;
	gameOverScene.addChild(gameOverText);

	deathCountText = new PIXI.Text("");
	deathCountText.style = new PIXI.TextStyle({
    	fill: "#555555",
    	fontFamily: "Impact",
    	fontSize: 48,
    	fontVariant: "small-caps"
	});
	deathCountText.anchor.x = 0.5;
	deathCountText.anchor.y = 0.5;
	deathCountText.x = sceneWidth/2;
	deathCountText.y = 350;
	gameOverScene.addChild(deathCountText);

	playAgainLabel = new PIXI.Text("按下 enter 重新開始");
	playAgainLabel.style = new PIXI.TextStyle({
    	fill: "#555555",
    	fontFamily: "Impact",
    	fontSize: 24,
    	fontVariant: "small-caps"
	});
	playAgainLabel.anchor.x = 0.5;
	playAgainLabel.anchor.y = 0.5;
	playAgainLabel.x = sceneWidth/2;
	playAgainLabel.y = 600;
	gameOverScene.addChild(playAgainLabel);
}

function Menu(){
	playing = false;
	startScene.visible = true;
	gameScene.visible = false;
	gameOverScene.visible = false;

/*
	startSceneMusic.fade(0,1,1000, startMusicController); // fade in menu music
	gameSceneMusic.fade(1,0,1000, gameMusicController); // fade out game music (this is for restarting)
	*/
}

function GameOver(win){
	// #1 - set scene
	playing = false;
	startScene.visible = false;
	gameScene.visible = false;
	gameOverScene.visible = true;

	if(win){
		gameOverText.text = "you win!";
	}else{
		gameOverText.text = "你死ㄌ";
	}
}

function StartGame(){

	playing = true;
	startScene.visible = false;
	gameScene.visible = true;
	gameOverScene.visible = false;

	for (let i = gameScene.children.length -1; i >=0; i--){  //清空場景
		gameScene.removeChild(gameScene.children[i]);
	}

/*
	gameSceneMusic.fade(0,1,1000, gameMusicController); 
	timeSinceEnemySound = 0;
*/

	player = new Player(12,12,-90,75);
	enemy = new Enemy(1 + (Math.floor(Math.random() * 2) * 22), 1 + (Math.floor(Math.random() * 2) * 22));
	map = new Map(25);
	cam = new Camera(map, enemy, gameScene, gameGroup, sceneWidth, sceneHeight, resolution,player);
    radar=new Radar();
}

function GameLoop(){
	
	if (!playing) {
		if (keys[keyboard.ENTER]){
			StartGame();
		}
		return;
	}

	player.Update(map, cam);
	cam.Update(player);
	enemy.Update(player);
    radar.Update();
	map.Update();

	app.stage.updateStage();

	if(map.items.ghosts.length <= 0)
		GameOver(true);

	if (enemy.distFromPlayer < 1){     //死亡
		UpdateDeaths();
		GameOver(false);
	}

}


function UpdateDeaths(){//紀錄死亡次數
	/*
	let numDeaths = 1;
	const stored = localStorage.getItem("aja7073-game-deaths");

	if (stored){
		numDeaths = Number(stored) + 1;
	}

	localStorage.setItem("aja7073-game-deaths", numDeaths);

	deathCountText.text = "you have died: " + numDeaths + " times";
	*/
}