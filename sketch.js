
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var tree, ground, stone;
var mango1, mango2, mango3, mango4, mango5, mango6, mango7, mango8, mango9, mango10, mango11;
var boyImage;
var launcher;
var gameState = "menu";
var title, play, back;
var titleImg, playImg, backImg;

function preload() {
	boyImage = loadImage("Images/boy.png");
	titleImg = loadImage("Images/Title.jpg");
	playImg = loadImage("Images/playButton.png");
	backImg = loadImage("Images/backFinal.jpg");
}

function setup() {
	createCanvas(1300, 700);


	engine = Engine.create();
	world = engine.world;

	tree1 = new Tree(1000, 400, 500, 550);
	ground = new Ground(750, 700, 1500, 100);
	stone = new Stone(100, 100, 20)
	mango1 = new Mango(1175, 300, 70, 70);
	mango2 = new Mango(1025, 164, 100, 100);
	mango3 = new Mango(954, 242, 70, 70);
	mango4 = new Mango(941, 318, 40, 40);
	mango5 = new Mango(1045, 256, 70, 70);
	mango6 = new Mango(1104, 214, 50, 50);
	mango7 = new Mango(925, 184, 50, 50);
	mango8 = new Mango(847, 300, 70, 70);
	mango9 = new Mango(1080, 334, 70, 70);
	mango10 = new Mango(887, 345, 35, 35);
	mango11 = new Mango(1108, 282, 50, 50);
	launcher = new Launcher(stone.body, { x: 309, y: 513 })

	title = createSprite(width / 2 - 25, 160, 100, 100);
	title.addImage(titleImg);
	play = createSprite(width / 2 - 25, 500, 100, 100)
	play.addImage(playImg);
	back = createSprite(130, 50, 50, 50);
	back.addImage(backImg);


	Engine.run(engine);

}


function draw() {

	if (gameState == "menu") {
		background(rgb(52, 235, 55));
		title.display();
		back.visible = false;
		title.visible = true;
		play.display();
		play.visible = true;
		if (mousePressedOver(play) && play.visible == true) {
			gameState = "game";
			Matter.Body.setPosition(stone.body, { x: 319, y: 543 });

			title.visible = false
			play.visible = false;
		}
	}

	if (gameState == "game") {
		rectMode(CENTER);
		background(240, 246, 255);

		ground.display();
		tree1.display();
		mango1.display();
		mango2.display();
		mango3.display();
		mango4.display();
		mango5.display();
		mango6.display();
		mango7.display();
		mango8.display();
		mango9.display();
		mango10.display();
		mango11.display();
		stone.display();
		back.display();
		back.visible = true;
		if (mousePressedOver(back)) {
			gameState = "menu";
		}
		launcher.display();
		image(boyImage, 400, 575, 300, 300)
		DetectCollision(stone, mango1);
		DetectCollision(stone, mango2);
		DetectCollision(stone, mango3);
		DetectCollision(stone, mango4);
		DetectCollision(stone, mango5);
		DetectCollision(stone, mango6);
		DetectCollision(stone, mango7);
		DetectCollision(stone, mango8);
		DetectCollision(stone, mango9);
		DetectCollision(stone, mango10);
		DetectCollision(stone, mango11);
		fill("pink");
		stroke(0);
		strokeWeight(5);
		textSize(40);
		textFont("algerian")
		text("Press space to play again !!", 500, 50);
	}
}

function mouseDragged() {
	if (gameState == "game") {
		Matter.Body.setPosition(stone.body, { x: mouseX, y: mouseY })
	}
}

function mouseReleased() {
	launcher.fly();
}

function DetectCollision(lstone, lmango) {
	mangoBodyPosition = lmango.body.position;
	stoneBodyPosition = lstone.body.position;

	var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);

	if (distance <= lmango.radius + lstone.radius) {
		Matter.Body.setStatic(lmango.body, false);
	}
}

function keyPressed() {
	if (keyCode === 32) {
		Matter.Body.setPosition(stone.body, { x: 319, y: 543 });
		launcher.attach(stone.body);
	}
}
