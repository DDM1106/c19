var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.4
  spookySound.loop()
}

function draw() {
  background(0);
  if (gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left")){
      ghost.x = ghost.x - 3
    }
    if(keyDown("right")){
      ghost.x = ghost.x + 3
    }
    if(keyDown("space")){
      ghost.velocityY = -5
    }
    ghost.velocityY = ghost.velocityY + 0.8
    drawSprites()
    spawndoor()
    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    if (invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
      ghost.destroy()
      gameState = "end"
    }
  }
 if (gameState === "end"){
   textSize(25)
   text("GAME OVER",250,300)

 }

}
function spawndoor(){
  if (frameCount%200===0){
 var door = createSprite(Math.round(random(100,400)),0)
  door.addImage(doorImg)
  var climber = createSprite(door.x,50)
  climber.addImage(climberImg)
  climber.velocityY = 1
  climbersGroup.add(climber)
  door.velocityY = 1
  doorsGroup.add(door)
  climber.lifetime = 600
  door.lifetime = 600
  var invisibleBlock = createSprite(door.x,60,climber.width,2)
  invisibleBlock.velocityY = 1
  invisibleBlockGroup.add(invisibleBlock)
  ghost.depth = door.depth + 1
  }
}

