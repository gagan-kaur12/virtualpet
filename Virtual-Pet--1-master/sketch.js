//Create variables here
var dog, happydog, database, foodS,foodStock;
var dogImg, happydogImg;
function preload()
{
	//load images here
dogImg = loadImage("images/dogImg.png");
happydogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
  
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happydogImg);
}
if(keyWentDown(DOWN_ARROW)){
  wStock(foodS);
  dog.addImage(dogImg);
}
  drawSprites();
  //add styles here

fill(255,255,254);
stroke("black");
text("Food remaining: "+foodS,170,200);
textSize(13);
text("Note: Press UP_ARROW to feed the dog",170,20);

}

function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x= x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
 function wStock(x){
   database.ref('/').set({
     Food: 20
   })
 }
