
class guiV2{

  settings = {
    "renderDistance":2,
    "scale":1.5
  }

  iwin_open=false;
  iwindows = ["Inventory","Session","Settings","Character-Select","Texture-Select","Debug"];
  iniw = 0;

  freeze_keys=false;
  inputoverride=false;
  constructor(){

  }

  b(x,y,w,h){
    if(mouseX>x&&mouseY>y&&mouseX<x+w&&mouseY<y+h){
      return true;
    }else{
      return false;
    }
  }
  coming_soon_iwin(){
    textSize(15);
    fill(0,255);
    text("Sorry, this page is either under developement or bugged.\nIf you think this page is broken please contact the dev team at: (put dev team contact links here)",15,50);
  }
  inventory_iwin(){
    let sc=(width+height)/2;
    fill(200,255);
    rect(width/2-(sc/15*10)/2,+height-sc/15*9-45,sc/15*9,sc/15*8);
    fill(255,255);
    rect(width/2-(sc/15*10)/2,sc/15*8+height-sc/15*9-45,sc/15*9,sc/15);
    fill(0);
    textSize(25);
    text("Hotbar",width/2-(sc/15*10)/2,sc/15*9+height-sc/15*9-55);
    text("Bag",width/2-(sc/15*10)/2,sc/15*8+height-sc/15*9-55);
    for(let i=0;i<72;i++){
      fill(0,200);
      if(this.b(i%8*sc/15+width/2-(sc/15*8)/2,floor(i/8)*sc/15+height-sc/15*9-45,sc/16,sc/16,25)){
        fill(25,200);
        rect(i%8*sc/15+width/2-(sc/15*8)/2,floor(i/8)*sc/15+height-sc/15*9-45,sc/16,sc/16,25);
        if(inventory[i]&&images[inventory[i].image]){
          image(images[inventory[i].image],i%8*sc/15+width/2-(sc/15*8)/2,+height-sc/15*9-45+floor(i/8)*sc/15-sc/64,sc/16,sc/16);
        }
        if(inputs.clickL){
          inventory[73]=inventory[i];
          inventory[i]=inventory[74];
          inventory[74]=inventory[73];
        }
      }else{
        rect(i%8*sc/15+width/2-(sc/15*8)/2,floor(i/8)*sc/15+height-sc/15*9-45,sc/16,sc/16,25);
        if(inventory[i]&&images[inventory[i].image]){
          image(images[inventory[i].image],i%8*sc/15+width/2-(sc/15*8)/2,+height-sc/15*9-45+floor(i/8)*sc/15,sc/16,sc/16);
        }
      }
      if(inventory[i]&&inventory[i].amount>1){
        textSize(sc/64);
        fill(0,255);
        rect(i%8*sc/15+width/2-(sc/15*8)/2,+height-sc/15*9-45+floor(i/8)*sc/15,textWidth(inventory[i].amount),sc/64);
        fill(255);
        text(inventory[i].amount,i%8*sc/15+width/2-(sc/15*8)/2,+height-sc/15*9-45+floor(i/8)*sc/15+sc/64)
      }
      if(inventory[i]&&inventory[i].amount<=0){
        inventory[i]=undefined;
      }
    }
    if(inventory[73]&&images[inventory[73].image]){
      image(images[inventory[73].image],mouseX+15,mouseY+15,sc/16,sc/16);
    }
    if(inventory[73]&&inventory[73].amount<=0){
      inventory[73]=undefined;
    }
  }

  
  ss={
    gameroom:"Room1",
    name:"Player"+Math.round(Math.random()*1000),
    eg:false,
    en:false,
  }

  session_iwin(){
    textSize(40);
    fill(255,255);
    if(this.b(25,40,textWidth("Gameroom {"+this.ss.gameroom+"}"),40)){
      fill(0,255,255,255);
      if(inputs.clickL){
        this.ss.eg=true;
        this.ss.en=false;
      }
    }
    rect(25,40,textWidth("Gameroom {"+this.ss.gameroom+"}"),40);
    fill(220,255);
    if(this.b(25,90,textWidth("Gamertag {"+this.ss.name+"}"),40)){
      fill(0,220,220,255);
      if(inputs.clickL){
        this.ss.eg=false;
        this.ss.en=true;
      }
    }
    rect(25,90,textWidth("Gamertag {"+this.ss.name+"}"),40);
    fill(255,255);
    if(this.b(25,140,textWidth("[Join Game]"),45)){
      fill(0,220,220,255);
      if(inputs.clickL){
        this.ss.eg=false;
        this.ss.en=false;
        socket.emit("joingame", this.ss.gameroom, this.ss.name);
        name=this.ss.name;
        resetData();
      }
    }
    rect(25,140,textWidth("[Join Game]"),45);
    fill(220,255);
    if(this.b(25,190,textWidth("[unfocus]"),45)){
      fill(0,220,220,255);
      if(inputs.clickL){
        this.ss.eg=false;
        this.ss.en=false;
      }
    }
    rect(25,190,textWidth("[unfocus]"),45);
    
    fill(0);
    if(this.ss.eg){
      text("Gameroom *{"+this.ss.gameroom+"}\nGamertag {"+this.ss.name+"}\n[Join Game]\n[unfocus]",25,75);
    }else if(this.ss.en){
      text("Gameroom {"+this.ss.gameroom+"}\nGamertag *{"+this.ss.name+"}\n[Join Game]\n[unfocus]",25,75);
    }else{
      text("Gameroom {"+this.ss.gameroom+"}\nGamertag {"+this.ss.name+"}\n[Join Game]\n[unfocus]",25,75);
    }
  }
  settings_iwin(){

  }
  grabfunction(name){
    if(name=="Inventory"){
      this.inventory_iwin();
    }else if(name=="Session"){
      this.session_iwin();
    }else if(name=="Settings"){
      this.settings_iwin();
    }else{
      this.coming_soon_iwin();
    }
    
  }
  iwindow(){
    //background
    fill(255,150);
    rect(0,0,width,height);
    //window
    this.grabfunction(this.iwindows[this.iniw]);
    //overlay/default
    let upi=-1;
    for(let i=0;i<this.iwindows.length;i++){
      if(i%2==0){
        fill(200);
      }else{
        fill(255);
      }
      if(this.b(i*width/this.iwindows.length,0,width/this.iwindows.length,35,15)){
        upi=i;
      }
      rect(i*width/this.iwindows.length,0,width/this.iwindows.length,35,15);
      stroke(0,0);
      fill(0,255);
      textSize(25);
      if(this.iniw==i){
        text("["+this.iwindows[i]+"]",i*width/this.iwindows.length+10,25)
      }else{
        text(this.iwindows[i],i*width/this.iwindows.length+10,25)
      }
    }
      if(upi!=-1){
        fill(0,255,255);
        if(inputs.clickL){
          this.iniw=upi;
        }
        if(textWidth("["+this.iwindows[upi]+"]")+10>width/this.iwindows.length){
          rect(upi*width/this.iwindows.length,0,textWidth("["+this.iwindows[upi]+"]")+10,35,15);
        }else{
          rect(upi*width/this.iwindows.length,0,width/this.iwindows.length,35,15);
        }
        stroke(0,0);
        fill(0,255);
        textSize(25);
        if(this.iniw==upi){
          text("["+this.iwindows[upi]+"]",upi*width/this.iwindows.length+10,25);
        }else{
          text(this.iwindows[upi],upi*width/this.iwindows.length+10,25);
        }
      }

  }
  hotbar(){
    let sc=(width+height)/2;
    for(let i=0;i<8;i++){
      fill(255,200);
      if(i%2==0){
        fill(200,200);
      }
      if(this.b(i*sc/15+width/2-(sc/15*8)/2,height-sc/15,sc/16,sc/16)){
        fill(0,200,200,200);
        if(inputs.clickL){
          holdingItem=i;
        }
      }
      if(holdingItem!=i){
        rect(i*sc/15+width/2-(sc/15*8)/2,height-sc/15,sc/16,sc/16,5);
      }else{
        rect(i*sc/15+width/2-(sc/15*8)/2-(sc/15-sc/16),height-sc/15-(sc/15-sc/16),sc/15+(sc/15-sc/16),sc/15+(sc/15-sc/16),5)
      }
      if(inventory[i+64]&&images[inventory[i+64].image]){
        image(images[inventory[i+64].image],i*sc/15+width/2-(sc/15*8)/2,height-sc/15,sc/16,sc/16);
      }
      if(inventory[i+64]&&inventory[i+64].amount>1){
        textSize(sc/64);
        fill(0,255);
        rect(i*sc/15+width/2-(sc/15*8)/2,height-sc/15,textWidth(inventory[i+64].amount),sc/64);
        fill(255);
        text(inventory[i+64].amount,i*sc/15+width/2-(sc/15*8)/2,height-sc/15,sc/64,sc/64);
      }
      if(inventory[i+64]&&inventory[i+64].amount<=0){
        inventory[i+64]=undefined;
      }
    }
  }
  tasks(){
    if(this.iwin_open){
      this.iwindow();
      this.inputoverride=true;
    }else{
      this.hotbar();
      this.inputoverride=false;
    }
  }
  keypressed(k,ke){
    // console.log(k+" was pressed.");
    if(k==69&&!this.ss.en&&!this.ss.eg){
      this.iwin_open=!this.iwin_open;
    }
    if([49,50,51,52,53,54,55,56].includes(k)&&!this.ss.en&&!this.ss.eg){
      holdingItem=k-49;
    }
    if(this.ss.en){

        if(k==8){
          let z=this.ss.name.split("");
          z.splice(z.length-1,1);
          this.ss.name=z.join("");
        }
        if(ke.toString().length==1){
          this.ss.name+=ke.toString();
        }
      
    }
    if(this.ss.eg){

        if(k==8){
          let z=this.ss.gameroom.split("");
          z.splice(z.length-1,1);
          this.ss.gameroom=z.join("");
        }
        if(ke.toString().length==1){
          this.ss.gameroom+=ke.toString();
        }
      
    }
  }

}