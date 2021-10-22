class guiV1{

  pagesOpen={
    "settings":false,
    "inventory":true,
  }

  settings = {
    "renderDistance":1,
    "scale":1.5
  }

  constructor(){

  }

  rendermaster(){
    fill(0,175);
    rect(width/16,height/16,width-width/8,height-height/8);
  }
  
  box(x,y,w,h){
    if(
    mouseX>x&&mouseX<x+w  &&
    mouseY>y&&mouseY<y+h){
      return true;
    }else{
      return false;
    }
  }

  renderinventory(){
    fill(255,255);
    textSize(20);
    text("inventory",width/16+20,height/16+20);
    textSize(15);
    text('press "e" to open and close',width/16+10,height/16+35);
    var i=0;
    for(var n in inventory){
      fill(100,255);
      var placeAtX=Math.floor(i%(((width-width/8)-(width-width/8)%50)/50));
      var placeAtY=Math.floor(i/(((width-width/8)-(width-width/8)%50)/50));

      if(this.box(placeAtX*50+width/16+15,height/16+50+placeAtY*70,45,45)){
        fill(150,255);
      }
      rect(width/16+15+placeAtX*50,height/16+50+placeAtY*70,45,45);

      if(inventory[n].image!=undefined){
        image(images[inventory[n].image],placeAtX*50+width/16+15+7.5,height/16+50+placeAtY*70+7.5,30,30)
      }

      i+=1;

    }
  }

  rendersettings(){
    fill(255,255);
    textSize(20);
    text("settings",width/16+20,height/16+20);
  }

}