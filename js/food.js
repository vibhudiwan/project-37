class Food {
    constructor(){
    this.foodStock=20;
    this.lastFed;
    this.image=loadImage('images/milk.png');
    
    }

   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

  
   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }

    bedroom(){
      background(bedroom,550,500);
    }

    garden(){
      background(garden,550,500);
    }

    washroom(){
      background(washroom,550,500);
    }

    
    display(){
        background(46,139,87);

        fill(255,255,254);
        textSize(15);
        
        var x=70,y=100; 
        imageMode(CENTER);
        if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=70;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }

}