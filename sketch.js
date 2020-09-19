var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var BananaGroup, obstacleGroup, gameover, gameOverImg, restartImg;
var score;
var play = 1,
  end = 0;
var gamestate = play;
var runningTime = 0;
var restart;



function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage ("restart.png");
}



function setup() {
  createCanvas(600, 400);



  var runningTime = 0;
  gameover = createSprite(300, 200, 20, 20);
  gameover.addImage(gameOverImg);
  gameover.visible = false; 
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 1200, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);
  
   restart = createSprite(300,250);
  restart.addImage(restartImg);
  restart.scale = 0.5;
   restart.visible = false;

  BananaGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;


}


function draw() {

  background("lightblue");
  fill("black");
  textSize(20);
  text("Score: " + score, 500, 50);

  text("running Time: " + runningTime, 100, 50);
  
  if (gamestate == play) {
    spawnBanana();
    spawnObstacles();
    runningTime = frameCount;

    
     restart.addImage(restartImg);
  restart.scale = 0.5;
 
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    } //console.log(monkey.y);
    if (keyDown("space") && monkey.y > 314.2) {

      monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    if (frameCount > 101)
      if (monkey.isTouching(banana)) {
        banana.lifetime = 0;
        score = score + 1;

      }
    if (obstaclesGroup.isTouching(monkey)) {
      ground.velocityX = 0;
      
      monkey.velocityY = 0;
      
      obstaclesGroup.setVelocityEach(0);
      
      BananaGroup.setVelocityEach(0);
      
      BananaGroup.setLifetimeEach(0);
      
      obstaclesGroup.setLifetimeEach(0);
      
      BananaGroup.setLifetimeEach(0);
      
      monkey.lifetime = 0;
      
      gamestate = end;
    }


  }

  if (gamestate == end) {

    gameover.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    
    monkey.velocityY = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    
    BananaGroup.setVelocityXEach(0); 
    
    obstaclesGroup.setLifetimeEach(0);
                                   
    BananaGroup.setLifetimeEach(0);
    
    if(mousePressedOver(restart)) {
      reset();
    }
    }
  


  
  
  monkey.collide(ground);
  drawSprites();
}




function spawnBanana() {
  //write code here to spawn the Food
  if (frameCount % 100 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(170, 230);
    banana.velocityX = -5;

    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    banana.addImage(bananaImage);
    banana.scale = 0.095;
    
    BananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 280 === 0) {
    obstacle = createSprite(800, 320, 10, 40);
    obstacle.velocityX = -6;

    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;
    
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  
  gameover.visible = false;
  restart.visible = false; 
  
  BananaGroup.destroyEach();
  obstaclesGroup.destroyEach();
  
  monkey.changeAnimation("moving",monkey_running);
  
  score = 0; 
  runningTime = 0;
  
  gameState = play;
}