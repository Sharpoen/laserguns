class guiV1{

  hotbarItems={
    0:{
        item:"hand",
        image:"items-hand"
      },
    1:{
        item:"sand",
        image:"nblocks-sand"
      },
    2:{
        item:"shovel",
        image:"items-protoshovel"
      },
  };


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

  render_master(){
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

  render_inventory(){
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
        if(inputs["clickL"]){
          holdingItem=n;
        }
        fill(150,255);
      }
      rect(width/16+15+placeAtX*50,height/16+50+placeAtY*70,45,45);

      if(inventory[n].image!=undefined){
        image(images[inventory[n].image],placeAtX*50+width/16+15+7.5,height/16+50+placeAtY*70+7.5,30,30)
      }

      i+=1;

    }
  }

  render_settings(){
    fill(255,255);
    textSize(20);
    text("settings",width/16+20,height/16+20);
  }

  render_hotbar(){
    fill(0,175);
    rect(width/16,height-height/8,width/16*14,height/8);

    var hotBarButtonScale=(height/8)*.9;

    for(let i=0;i<9;i++){
      
      fill(100,255);

      if(this.box(width/16+hotBarButtonScale/10+i*hotBarButtonScale,height-height/8+hotBarButtonScale/10,hotBarButtonScale/10*9,hotBarButtonScale/10*9)){
        fill(150,255);
        if(inputs["clickL"]&&this.hotbarItems[i]!=undefined){
          holdingItem=this.hotbarItems[i].item;
        }

      }

      if(this.hotbarItems[i]!=undefined&&holdingItem==this.hotbarItems[i].item){
        fill(150,200,200);
      }

      rect(width/16+hotBarButtonScale/10+i*hotBarButtonScale,height-height/8+hotBarButtonScale/10,hotBarButtonScale/10*9,hotBarButtonScale/10*9);
      if(this.hotbarItems[i]!=undefined){
        image(images[this.hotbarItems[i].image],width/16+hotBarButtonScale/10+i*hotBarButtonScale+hotBarButtonScale/15*9/4,height-height/8+hotBarButtonScale/10+hotBarButtonScale/15*9/4,hotBarButtonScale/15*9,hotBarButtonScale/15*9);
      }
    }

  }

}