var monkeyRunning,bananaImage,stoneImage,jungleImage;
var stoneGroup,bananaGroup;
var monkey, banana,stone;
var bg;

var PLAY=1;
var END=0;
var gameState=PLAY;

var gameOver,gameOverImage;
var restart,restartImage;

var score;

function preload(){
  monkeyRunning=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage=loadImage("Banana.png");
  
  stoneImage=loadImage("Stone.png");
  
  jungleImage=loadImage("Jungle.jpg");
  
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 500);
  
  
  
  bg= createSprite(300,250,60,20);
  bg.addAnimation("jungle", jungleImage);
  bg.x=bg.width/2;
  bg.scale = 2;
  
  monkey=createSprite(75,490,20,50);
  monkey.addAnimation("running",monkeyRunning);
  monkey.scale=0.20; 
 //monkey.debug = true;
  
  
 stoneGroup=new Group();
 bananaGroup=new Group();
 
  invisibleGround=createSprite(300,490,600,10);
  invisibleGround.visible=false;
  
   gameOver= createSprite(300,70);
  gameOver.addImage("gameover",gameOverImage);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  restart= createSprite(300,100);
  restart.addImage("restart",restartImage);
  restart.scale=0.5;
  restart.visible=false;
  
  score =0;
}

function draw() {
  background(220)
  
  
  if(gameState===PLAY){
    
    score = score + Math.round(getFrameRate()/60);
    
    bg.velocityX=-5;
    
    if(keyDown("space")){
      monkey.velocityY = -15;
    } 
    
    monkey.velocityY= monkey.velocityY + 0.8;
    
    if(bg.x<0){
    bg.x= bg.width/2;
  }
     
    spawnBananas();
  spawnStones();
    
    if(stoneGroup.isTouching(monkey)){
      gameState=END;
    } 
    if(bananaGroup.isTouching(monkey)){
   bananaGroup.destroyEach();   
  }
  }
  
  else if(gameState===END){
    bg.velocityX=0;
    
    monkey.velocityY=0;
    
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    gameOver.visible=true;
    restart.visible=true;
  }
  
   if(mousePressedOver(restart)) {
    reset();      
  }
  monkey.collide(invisibleGround);
  

  
  drawSprites();
  
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
}

function spawnBananas(){
  if(frameCount%100===0){
  banana=createSprite(10,10,60,20);
  banana.y = Math.round(random(80,120));
  banana.addImage("food",bananaImage);
  banana.scale=0.10;
    banana.y=random(80,120);
    banana.x=400;
    banana.velocityX=-6;
   banana.lifetime=200;
    //banana.debug=true;
    bananaGroup.add(banana);
    
   
  }
}

function spawnStones(){
  if(frameCount%100===0){
  stone=createSprite(50,40,150,300);
  stone.addImage("obstacles",stoneImage);
  stone.scale=0.35;
    stone.y=430;
    stone.x=400;
    stone.velocityX=-6;
    stone.lifetime=200;
    stone.setCollider("circle",0,0,175);
    //stone.debug=true;
    
    stoneGroup.add(stone);
  
  
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  
  monkey.changeAnimation("running",monkeyRunning);
  
  score = 0;
  
}