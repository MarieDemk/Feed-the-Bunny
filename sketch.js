const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var backgroundImg, fruitImg, bunnyImg;
var blink,eat,sad;
var air, eating_sound, rope_cut, sad_sound, backgroundSound;


let engine;
let world;

function preload() {
  backgroundImg = loadImage("background.png");
  fruitImg = loadImage("melon.png");
  bunnyImg = loadImage("Rabbit-01.png");
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  air = loadSound("air.wav");
  eating_sound = loadSound("eating_sound.mp3");
  rope_cut = loadSound("rope_cut.mp3");
  sad_sound = loadSound("sad.wav");
  backgroundSound = loadSound("sound1.mp3");


  blink.playing = true;
  // makes the animation only play once
  eat.looping = false;
  sad.looping = false;
}
function setup() 
{
  var checkDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (checkDevice) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW+80,canH);
  }
  else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW,canH);
  }
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

  textSize(50)
  var options = {
    restitution: 1
  }
//resititution :1
  fruit = Bodies.circle(250,300, 20, options);
  ground = new Ground(canW/2,canH,canW,20);
  rope1 = new Rope(8,{x:30,y:40});
  rope2 = new Rope(7,{x:345,y:50});
  rope3 = new Rope(3,{x:375,y:210});

  Composite.add(rope1.body,fruit);
  link = new Link(rope1,fruit);
  link2 = new Link(rope2,fruit);
  link3 = new Link(rope3,fruit);

  // making the animation go slower 
  blink.frameDelay = 20;
  
  bunny = createSprite(450,canH-80,10,20);
  bunny.addAnimation("blink",blink);
  bunny.addAnimation("eat",eat);
  bunny.addAnimation("sad",sad);
  bunny.changeAnimation("blink");
  bunny.scale = 0.2;

  button = createImg("cut_button.png");
  button.size(35,35);
  button.position(330,40);
  button.mouseClicked(drop2);

  button = createImg("cut_button.png");
  button.size(35,35);
  button.position(20,30);
  button.mouseClicked(drop);

  button = createImg("cut_button.png");
  button.size(35,35);
  button.position(360,200);
  button.mouseClicked(drop3);

  balloonButton = createImg("balloon.png");
  balloonButton.position(30, 270);
  balloonButton.size(130,90);
  balloonButton.mouseClicked(force);

  muteButton = createImg("mute.png");
  muteButton.position(canW-100,canH-650);
  muteButton.size(35,35);
  muteButton.mouseClicked(stopSound);

  backgroundSound.play();
  backgroundSound.setVolume(0.05);
}

function draw() 
{
  background(51);
  image(backgroundImg, width/2,height/2, canW,canH);
  Engine.update(engine);
  ground.display();
  ellipseMode(RADIUS);
  fill("blue");
  if (fruit != null) {
  image(fruitImg, fruit.position.x,fruit.position.y,60,60);
  }

  
  rope1.show();
  rope2.show();
  rope3.show();

  if (collision(fruit,bunny,100) == true) {
    eating_sound.play();
    bunny.changeAnimation("eat");
  }
  if (fruit != null && fruit.position.y > 640) {
    World.remove(world,fruit);
    fruit = null;
    backgroundSound.stop();
    sad_sound.play();
    bunny.changeAnimation("sad");
    
  }
  drawSprites();
}

function drop() {
  rope_cut.play();
  rope_cut.setVolume(0.5);
  rope1.break();
  link.detach();
  link = null;
}
function drop2() {
  rope_cut.play();
  rope_cut.setVolume(0.5);
  rope2.break();
  link2.detach();
  link2 = null;
}
function drop3() {
  rope_cut.play();
  rope_cut.setVolume(0.5);
  rope3.break();
  link3.detach();
  link3 = null;
}

function collision(body,sprite,x) {
  if (body != null) {
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if (d <= x) {
      World.remove(world,fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
  
}
function force(){
  Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
}
function stopSound() {
  if (backgroundSound.isPlaying()) {
    backgroundSound.stop();
  }
  else {
    backgroundSound.play();
  }
}