var dog,sadDog,happyDog,database;
var foodS,foodStock;
var feed,addFood;
var foodObj;
var milkObj,mImage,foodn;
var name1,feedTime,gameState="Hungry",readState;
var lastFed,currentTime,Iname,name2,vmilk;
var deaddog,bedroom,garden,injection,livingroom,runningright,runningleft,washroom,lazyDog,foodI,foodAvailable;

function preload(){
sadDog     =   loadImage("images/dogImg.png");
happyDog  =    loadImage("images/dogImg1.png");
mImage     =   loadImage("images/milk.png");
deaddog    =   loadImage("images/deadDog.png");
bedroom =      loadImage("images/Bed Room.png");
garden =       loadImage("images/Garden.png");
injection =    loadImage("images/Injection.png");
livingroom =   loadImage("images/Living Room.png");
lazyDog =      loadImage("images/Lazy.png");
runningright = loadImage("images/running.png");
runningleft =  loadImage("images/runningLeft.png");
washroom =     loadImage("images/Wash Room.png");
foodI     =    loadImage("images/Food Stock.png");
}

function setup() {
  
  database=firebase.database();
  foodStock=database.ref('food')
  foodStock.on("value",readStock);
  createCanvas(500,500);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feedTime=database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  });

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  Iname = database.ref('Name');
  Iname.on("value",function(data){
    name2=data.val();
  });
    
          
  dog=createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodAvailable = createSprite(400,120,10,10);
  foodAvailable.addImage(foodI);
  foodAvailable.scale=0.1;
  
  feed=createButton("Feed the dog");
  feed.position(600,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);

  name1 = createInput("ROCKY");
  name1.position(550,510);
  
  }

function draw() {
  currentTime = hour();

  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
 }else if(currentTime==(lastFed+2)){
  update("Sleeping");
    foodObj.bedroom();
 }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
    foodObj.washroom();
 }else{
  update("Hungry")
  foodObj.display();
 }

 if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
    text("I'am not hungry",200,200);
  }
  if (gameState==="Playing"){
    textSize(25);
    stroke("yellow");
    strokeWeight(3);
    //text("Let's Play",200,50);
    name1.hide();
    background();
    }else if(gameState==="Sleeping"){
      textSize(25);
      stroke("red");
      strokeWeight(3);
      text("Good Night",200,50);
      background();
    }else if (gameState==="Bathing"){
      textSize(25);
      stroke("red");
      strokeWeight(3);
      text("Hmmmm",200,50);
      background();
    }
  

  background(46,139,87);
  foodObj.display();
  textSize(20);
  stroke("pink");
  strokeWeight(2);
  text(":" +   foodS ,450,120);
  text("Name your dog :" ,20,475)
  stroke("blue");
  strokeWeight(2);
  textSize(18); 
  console.log(gameState);
   
  


  if (lastFed>=12){
    text("LAST FED :" + lastFed + "th Hour",20,50);
  }
  else if (lastFed===0){
    text("LAST FED : 12AM ",20,50);
  } 
  else{
    text("LAST FED :" + feedTime + "th Hour",20,50);
  }

  if(foodS<=0){
    foodS=0;
  }

  
    //console.log(currentTime);
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  if(foodS>0){
   dog.addImage(happyDog);
   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime :hour(),
      //lastFed : hour(),
    
  })
}
}

//function to add food in stock
function addFoods(){
  dog.addImage(sadDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()+1);
  foodS++;
  database.ref('/').update({
    Food:foodS
      })
}

//function to update gameStatesin database
function update(state){
  database.ref('/').update({
    gameState:state
  });
}
