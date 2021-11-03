var rocket, rocketImg
var space, spaceImg;
var ufo, ufoImg, ufoGroup;
var star, starImg, starGroup;

var PLAY = 1;
var END = 0;
var gameState=1;

var score 

var gameOver, gameOverImg
var restart, restartImg



function preload(){

    rocketImg = loadImage("rocket.png");
    spaceImg = loadImage("space.jpg");
    ufoImg = loadImage("ufo1.png");
    starImg = loadImage("Star.png");
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("Restart.png");
    gameOverImg = loadImage("gameOver.png");

   

}

function setup() {
 createCanvas(450,650);
 
var rocket = createSprite(220,600,50,30);
rocket.addImage("player",rocketImg);
rocket.scale = 0.2;

var space = createSprite(220,360,500,900);
space.addImage("moving", spaceImg);
space.velocityY = 5;
space.scale = 1;
space.depth = rocket.depth;
rocket.depth = rocket.depth + 1;

gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);

restart = createSprite(300,140);
restart.addImage(restartImg);

gameOver.scale = 0.5;
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

ufoGroup = new Group();
starGroup = new Group();

score = 0;

}

function draw() {

     if(gameState === PLAY){
    textSize(25);
    background(180);
    
    edges= createEdgeSprites();
    rocket.collide(edges);

    rocket.x = World.mouseX;

    if(space.y > 650 ){
      space.y = space.height/2;
    }

      spawnUfo();
      spawnStar();

      if(starGroup.isTouching(rocket)){

          starGroup.destroyEach();
          score = score + 50
      }

    else if (ufoGroup.isTouching(rocket)){
        gameState = END;

      gameOver.visible = true;
      restart.visible = true;

      space.velocityX = 0;
      ufoGroup.setVelocityYEach(0);
      ufo2Group.setVelocityYEach(0);

      ufoGroup.setLifetimeEach(-1);
      
      if(mousePressedOver(restart)) {
        reset();
      }

    }

  }

drawSprites();

text("Score: "+ score,20,50);
textSize(30);

}

function spawnUfo(){

if(frameCount % 110 === 0){

  var ufo = createSprite(50,40,60,60)
  ufo.addImage(ufoImg);
  ufo.scale = 0.2;
  ufo.velocityY = 4;
  ufo.x =  Math.round(random(50,200));
  ufo.lifetime = 500;
  ufoGroup.add(ufo);

}

}

function spawnStar(){

  if(frameCount % 80 === 0){

  var star = createSprite(200,40,60,60)
  star.addImage(starImg);
  star.scale = 0.2;
  star.velocityY = 4;
  star.x =  Math.round(random(200,470));
  star.lifetime = 500;
  starGroup.add(star);
  }

}

function reset(){

  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  ufoGroup.destroyEach();
  starGroup.destroyEach();
  
  score = 0;
}


