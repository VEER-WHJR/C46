var bgImg;
var veer, veerImg, veerImg2;
var gorgon, gorgonImg;
var minotaur, minotaurImg;
var cyclops, cyclopsImg, cyclopsGroup;
var soldier, soldierImg, soldierGroup;
var hps = 4;
var hpv = 10;
var hpc = 30;

function preload(){
bgImg = loadImage("images/bg.jpg");
veerImg = loadImage("images/veer.png");
veerImg2 = loadImage("images/kratosAttacking.jpg");
soldierImg = loadImage("images/draugr.png");
cyclopsImg = loadImage("images/cyclops.png");
gorgonImg = loadImage("images/gorgon.png");
minotaurImg = loadImage("images/minotaur.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  veer = createSprite(200,600,20,20);
  veer.addImage("normal",veerImg);
  veer.addImage("attacking",veerImg2);
  veer.scale = 0.2;
  gorgon = createSprite(1000,600,20,50);
  gorgon.addImage("g",gorgonImg);
  gorgon.scale = 0.5;
  minotaur = createSprite(1200,600,50,50);
  minotaur.addImage("m",minotaurImg);
  cyclopsGroup = new Group();
  soldierGroup = new Group(); 
}

function draw() {
  background(bgImg);  
  if(keyIsDown(LEFT_ARROW)){
    veer.changeImage("attacking");
  }

  if(keyWentUp(LEFT_ARROW)){
    veer.changeImage("normal");
  }
  spawnSoldiers();
  spawnCyclops();
    
  if(veer.isTouching(soldierGroup)){
    soldierGroup.setVelocityXEach(0);
    damage();
  }else{soldierGroup.setVelocityXEach(-3);}

  if(veer.isTouching(cyclopsGroup)){
    cyclopsGroup.setVelocityXEach(0);
    damage();
  }else{cyclopsGroup.setVelocityXEach(-3);}

  if(veer.collide(soldierGroup) && keyDown(LEFT_ARROW)){
    hps = hps - 0.2
  }

  if(veer.collide(cyclopsGroup) && keyDown(LEFT_ARROW)){
    hpc = hpc - 0.2
  }
  
  veer.x = mouseX;
  if(hpv < 0){
    text("Game Over",windowWidth/2,windowHeight/2);
  }
  console.log(hpv);
  if(hps < 0){
    soldierGroup.setLifetimeEach(0);
    hps=4;
    hpv = 10;
  }

  if(hpc < 0){
    cyclopsGroup.setLifetimeEach(0);
    hpc=30;
    hpv = 15;
  }
  drawSprites();
}

function spawnSoldiers(){
  if(frameCount%200 === 0){
    soldier = createSprite(windowWidth+200,600,20,20);
    soldier.addImage("s",soldierImg);
    soldier.scale = 0.3;
    soldier.velocityX = -3;
    soldierGroup.add(soldier);
  }
}

function damage(){
  var x = Math.round(random(1,50))
  if(x === 3){
    hpv--;
  }
}

function spawnCyclops(){
  if(frameCount%1500 === 0){
    cyclops = createSprite(windowWidth+200,600,50,70);
    cyclops.addImage("c",cyclopsImg);
    cyclops.scale = 1.7;
    cyclops.velocityX = -1;
    cyclopsGroup.add(cyclops);
  }
}