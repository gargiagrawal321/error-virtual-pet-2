var database ;
var foodS=20,foodStock;
var dog,dog1,dog2
var position
var feed,add,last 
var foodobject
var Feedtime
var Lastfeed
var name = "Dog1"

function preload(){
  Dog=loadImage("images/dogImg.png");
  HappyDog=loadImage("images/dogImg1.png");
  milkImage=loadImage("image/milk.png")
            
}

function setup(){
  createCanvas(700,650);

  database = firebase.database();
  console.log(database);
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogImg1)
  dog.scale=0.2

  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  Lastfeed=database.ref('fedTime');
  Lastfeed.on("value",readTime)

  var dogo=database.ref("food");
  dogo.on("value",readPosition,showError);
  feed=createButton("Feed"+name)
feed.position(700,115);
feed.mousePressed(FeedDog)
add=createButton("ADD FOOD")
add.position(600,115)
add.mousePressed(AddFood)
}

function readTime(time){
  Feedtime=time.val()
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
if(x<=0){
  x=0;
}
else{
  x=x-1;
}
database.ref("/").update({
  food:x
})
}

var pasttime,delay=15,state="idle";

function draw(){
  background(46,139,87);

  foodobject.display();
  
  drawSprites();
  fill(255,255,254);
  textSize(15);

  text("Last Feed:" +pasttime,600,115);
  drawSprites();
  setToHour()
  if(pt>frameCount-delay){
    Dog.addImage(dogImg1)
  }
  if(pt>frameCount-delay){
    image(milkImage,500+(frameCount-pt),220,100,80);
  }}
  function setToHour(){
    pasttime="Undefined"
    if(Feedtime){
      if(Feddtime>=12)
      pasttime=Feedtime-12+"PM"
    }
    else{
      pasttime=Feedtime-12+"AM"
    }
  }
  function readPosition(data){
    position = data.val();
    foodobject.updateFoodStock(position)
  }
  
  function showError(){
    console.log("Error in writing to the database");
  }
  function writePosition(nazo){
    if(nazo>0){
      nazo=nazo-1
    }
    else{
      nazo=0
    }
    database.ref('/').set({
      'Food': nazo
    })
  
  }
  var pt;
  function FeedDog(){
  
    if(foodS>0){
      pt = frameCount;
  
      dog.addImage(dogImg) 
    foodobject.updateFoodStock(foodobject.getFoodStock()-1)
     database.ref('/').update({
       Food:foodobject.getFoodStock(),
       FeedTime:hour()
     })
    }
    }
    function AddFood(){
      position++
      database.ref('/').update({
        Food:position})
      }
      
  







