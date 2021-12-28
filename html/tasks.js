function render_scene(){
  gamescreen.render_chunks(gameworld.getChunks(chunksToRender),"tiles");

  if(!debug.hitboxes){
    gamescreen.mrp();
    gamescreen.rp(skin,st,wk);
  }

  gamescreen.render_chunks(gameworld.getChunks(chunksToRender),"blocks");

  if(true){
    let x = mouseX-width/2;
    let y = mouseY-height/2;
    if(abs(y)>abs(x)&&y<0){
      st=16;
    }  
    if(abs(x)>abs(y)&&x>=0){
      st=48;
    }
    if(abs(y)>abs(x)&&y>=0){
      st=0;
    }
    if(abs(x)>abs(y)&&x<0){
      st=32;
    }
  }


  if(debug.testDebugItem2){
    gamescreen.track_players();
  }

  if(!debug.hitboxes){
    gamescreen.mrpt();
    gamescreen.rpt(skin,st,wk);
  }

  if(debug.grid){
    gamescreen.render_grid();
    stroke(0,0);
  }

  if(debug.hitboxes){
    fill(255);
    let gamescale=gamescreen.getScale();

    if(true){
      fill(255);
      
      gamescreen.square_on(round(x),round(y));
      fill(0,0,255,100);
      gamescreen.square_on(round(x-0.4),round(y-0.4));
      fill(0,255,0,100);
      gamescreen.square_on(round(x+0.4),round(y-0.4));
      fill(255,0,0,100);
      gamescreen.square_on(round(x-0.4),round(y+0.4));
      fill(255,255,0,100);
      gamescreen.square_on(round(x+0.4),round(y+0.4));
    }
  }
}
function ui_overlay(){
  if(gui.pagesOpen.chat){
    gui.render_chat();
  }else if(gui.pagesOpen.inventory||gui.pagesOpen.settings||gui.pagesOpen.debug||gui.pagesOpen.skins){
    gui.render_master();
    if(gui.pagesOpen["inventory"]){
      gui.render_inventory();
    }else if(gui.pagesOpen["settings"]){
      gui.render_settings();
    }else if(gui.pagesOpen["debug"]){
      gui.render_debug();
    }else if(gui.pagesOpen["skins"]){
      gui.render_skins();
    }

  }else{
    gameinput.use_item(gameworld);

    gui.render_hotbar();
    gui.render_bar(color(0,255,0),health,100,0,0,(width+height)/2/5,(width+height)/2/40);
  }

  if(gui.pagesOpen.connect){
    gui.render_connect();
  }
  fill(150);
  if(gui.box(0,0,15,15)){
    fill(75);
    if(inputs.clickL){
      gui.pagesOpen.connect=!gui.pagesOpen.connect;
    }
  }
  rect(0,0,15,15);

}
function reset_inputs(){
  
}