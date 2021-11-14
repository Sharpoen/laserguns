class guiV1{

  hotbarItems={
    selected:0,
    invheld:"",
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
    3:{
        item:"dirt",
        image:"nblocks-dirt"
      },
    5:{
        item:"sword",
        image:"items-protosword"
      },
  };

  pagesOpen={
    "settings":false,
    "inventory":true,
    "debug":false,
  }

  settings = {
    "renderDistance":1,
    "scale":1.5
  }

  constructor(){

  }
  
  hotswap(i){
    this.hotbarItems.selected=i;
    if(this.hotbarItems[i]){
      holdingItem=this.hotbarItems[i].item;
    }else{
      holdingItem="do_nothing"
    }
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
    text("[inventory] | settings | debug",width/16+20,height/16+20);

    fill(255);
    if(this.box(width/16+10,height/16+25,25,25)){
      fill(200);
      if(inputs["clickL"]){
        this.pagesOpen.debug=true;
        this.pagesOpen.inventory=false;
      }
    }
    rect(width/16+10,height/16+25,25,25);
    fill(255);
    if(this.box(width/16+45,height/16+25,25,25)){
      fill(200);
      if(inputs["clickL"]){
        this.pagesOpen.settings=true;
        this.pagesOpen.inventory=false;
      }
    }
    rect(width/16+45,height/16+25,25,25);

    let i=0;
    for(let n in inventory){
      fill(100,255);
      var placeAtX=Math.floor(i%(((width-width/8)-(width-width/8)%50)/50));
      var placeAtY=Math.floor(i/(((width-width/8)-(width-width/8)%50)/50));

      if(this.box(placeAtX*50+width/16+15,height/16+50+placeAtY*70,45,45)){
        if(inputs["clickL"]){
          this.hotbarItems.invheld=n;
        }
        fill(150,255);
      }
      rect(width/16+15+placeAtX*50,height/16+50+placeAtY*70,45,45);

      if(inventory[n].image!=undefined){
        image(images[inventory[n].image],placeAtX*50+width/16+15+7.5,height/16+50+placeAtY*70+7.5,30,30)
      }

      i+=1;

    }
    
    let hotBarButtonScale=(height/12);

    for(let i=0;i<9;i++){
      fill(0);
      if(this.box(width/16+hotBarButtonScale/10+i*hotBarButtonScale,height-(height/8),hotBarButtonScale/10*9,hotBarButtonScale/10*9)){
        fill(255);
        if(inputs.clickL){
          if(inventory[this.hotbarItems.invheld]){
            this.hotbarItems[i]={
              item: this.hotbarItems.invheld,
              image: inventory[this.hotbarItems.invheld].image || "blocks-air",
            }
            this.hotbarItems.invheld="do_nothing";
          }
        }
      }
      rect(width/16+hotBarButtonScale/10+i*hotBarButtonScale,height-(height/8),hotBarButtonScale/10*9,hotBarButtonScale/10*9);
      if(this.hotbarItems[i]){
        if(this.hotbarItems[i].image){
          if(this.box(width/16+hotBarButtonScale/10+i*hotBarButtonScale,height-(height/8),hotBarButtonScale/10*9,hotBarButtonScale/10*9)){
            image(images[this.hotbarItems[i].image],width/16+hotBarButtonScale/10+i*hotBarButtonScale,height-(height/8)-hotBarButtonScale/10,hotBarButtonScale/10*9,hotBarButtonScale/10*9)
          }else{
            image(images[this.hotbarItems[i].image],width/16+hotBarButtonScale/10+i*hotBarButtonScale,height-(height/8),hotBarButtonScale/10*9,hotBarButtonScale/10*9)
          }
        }
      }
    }

    if(inventory[this.hotbarItems.invheld]){
      image(images[inventory[this.hotbarItems.invheld].image],mouseX+hotBarButtonScale/10,mouseY+hotBarButtonScale/10,hotBarButtonScale/10*9,hotBarButtonScale/10*9)
    }

  }

  render_settings(){
    fill(255,255);
    textSize(20);
    text("inventory | [settings] | debug",width/16+20,height/16+20);
    fill(255);
    if(this.box(width/16+10,height/16+25,25,25)){
      fill(200);
      if(inputs["clickL"]){
        this.pagesOpen.inventory=true;
        this.pagesOpen.settings=false;
      }
    }
    rect(width/16+10,height/16+25,25,25);
    fill(255);
    if(this.box(width/16+45,height/16+25,25,25)){
      fill(200);
      if(inputs["clickL"]){
        this.pagesOpen.debug=true;
        this.pagesOpen.settings=false;
      }
    }
    rect(width/16+45,height/16+25,25,25);
  }
  render_debug(){
    fill(255,255);
    textSize(20);
    text("inventory | settings | [debug]",width/16+20,height/16+20);
    fill(255);
    if(this.box(width/16+10,height/16+25,25,25)){
      fill(200);
      if(inputs["clickL"]){
        this.pagesOpen.settings=true;
        this.pagesOpen.debug=false;
      }
    }
    rect(width/16+10,height/16+25,25,25);
    fill(255);
    if(this.box(width/16+45,height/16+25,25,25)){
      fill(200);
      if(inputs["clickL"]){
        this.pagesOpen.inventory=true;
        this.pagesOpen.debug=false;
      }
    }
    rect(width/16+45,height/16+25,25,25);

    let i=0;
    for(let n in debug){
      i++;
      if(debug[n]){
        fill(0,255,0);
      }else{
        fill(255,0,0);
      }
      rect(width/16+10,height/16+25+i*30,50,25);
      textSize(20);
      if(this.box(width/16+10,height/16+25+i*30,50,25)){
        fill(255);
        rect(width/16+10,height/16+37+i*30,50,12);
        if(inputs["clickL"]){
          debug[n]=!debug[n];
        }
      }
      fill(255);
      text(n,width/16+75,height/16+45+i*30);
    }
    i++;
    text("info:\nx"+floor(x)+"("+x+")"+"\ny"+floor(y)+"("+y+")",width/16+10,height/16+45+i*30);



  }

  render_hotbar(){
    fill(0,175);
    rect(width/16,height-height/8,width/16*14,height/8);

    let hotBarButtonScale=(height/8)*.9;

    for(let i=0;i<9;i++){
      
      fill(100,255);

      if(this.box(width/16+hotBarButtonScale/10+i*hotBarButtonScale,height-height/8+hotBarButtonScale/10,hotBarButtonScale/10*9,hotBarButtonScale/10*9)){
        fill(150,255);
        console.log(0);
        if(inputs["clickL"]){
          this.hotbarItems.selected=i;
          if(this.hotbarItems[i]){
            holdingItem=this.hotbarItems[i].item;
          }else{
            holdingItem="do_nothing";
          }
        }

      }

      if(i==this.hotbarItems.selected){
        fill(150,200,200);
      }

      rect(width/16+hotBarButtonScale/10+i*hotBarButtonScale,height-height/8+hotBarButtonScale/10,hotBarButtonScale/10*9,hotBarButtonScale/10*9);
      if(this.hotbarItems[i]!=undefined){
        image(images[this.hotbarItems[i].image],width/16+hotBarButtonScale/10+i*hotBarButtonScale+hotBarButtonScale/15*9/4,height-height/8+hotBarButtonScale/10+hotBarButtonScale/15*9/4,hotBarButtonScale/15*9,hotBarButtonScale/15*9);
      }
    }

  }

}