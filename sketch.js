var survivalTime=0;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var PLAY = 1;
var END =0;
var gameState = PLAY;
var bGroundImage,bGround;
var monkeyC
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  bGroundImage = loadImage("jungle.jpg");
  monkeyC = loadAnimation("sprite_6.png");
}



function setup() {
  createCanvas(400,400);
  bGround=createSprite(200,200);
  bGround.addImage("bGround",bGroundImage);
  bGround.x=bGround.width/2;
  bGround.velocityX=-4;
  
  monkey = createSprite(80,315,1,1)
  monkey.addAnimation("monkeyRunning",monkey_running);
  monkey.addAnimation("monkeyC",monkeyC);
  monkey.scale=0.1;
  
  ground = createSprite(400,370,900,10);
  //ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
    
}


function draw() {
  background("black");
  if(gameState === PLAY){
    camera.position.x  = monkey.x;
    //camera.position.y  = displayHeight/1;
  
  if(bGround.x<0){
    bGround.x=bGround.width/2;
  }
  if(keyDown("space") && monkey.y>314){
    monkey.velocityY=-13;
  }
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score+1;
    monkey.scale = 0.15;
    
    
    
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  monkey.velocityY=monkey.velocityY +0.8;
  monkey.collide(ground);
  food();
  obstacleSpawn();
  console.log(monkey.y); 
  drawSprites();
  }
  if(gameState === END){
    monkey.velocityY = 0;
    bGround.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.changeAnimation("monkeyC",monkeyC);
    monkey.scale = 0.1;
    drawSprites();
    stroke("white");
    textSize(30);
    fill("white");
    text("GAME OVER", 130,200)
  }
  stroke("white");
  textSize(20);
  fill("white");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 100,50);
  text("score: " + score, 100,100);
  
}

function food() {
  if(frameCount % 80 === 0){
    var food = createSprite(300,200,20,20);
    food.addImage("Food",bananaImage);
    food.y = Math.round(random(200,280));
    food.velocityX = -4;
    food.lifeTime = 200;
    food.scale = 0.1;
    FoodGroup.add(food);
  }
}

function obstacleSpawn(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(300,335,20,20);
    obstacle.addImage("obstacles",obstaceImage);
    obstacle.scale = 0.16;
    obstacle.velocityX = -4;
    obstacleGroup.add(obstacle);
    }
}





