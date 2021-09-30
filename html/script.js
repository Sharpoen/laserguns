window.addEventListener("load", function () {
  document.getElementById("debugFieldset").style.display="none";//hides debug window
});

var legendAnimFrame=0;

setInterval(function(){
  var legendAnimFrames=[
    "|Square Game",
    "Square Game|",
    "quare Game|S",
    "uare Game|Sq",
    "are Game|Squ",
    "re Game|Squa",
    "e Game|Squar",
    " Game|Square",
    "Game|Square ",
    "ame|Square G",
    "me|Square Ga",
    "e|Square Gam",
    ]
  legendAnimFrame+=1;
  if(legendAnimFrame>=12){
    legendAnimFrame=0;
  }

  var plsMoniterString = "[";
  for(let i=0;i<pls.length;i++){
    plsMoniterString+=pls[i]+",";
  }
  plsMoniterString+="],"+pls.length;

  var linkMoniterString = "{";
  for(n in linkPls){
    linkMoniterString+=linkPls[n]+",";
  }
  linkMoniterString+="},"+linkPls.length;

  document.getElementById("Gamelegend").innerHTML=legendAnimFrames[legendAnimFrame];

  document.getElementById("chatDiv").innerHTML=chat;

  document.getElementById("debugSet").innerHTML="pls : "+plsMoniterString+"<br>linkPls : "+linkMoniterString+"<br>lastJoin : "+lastJoin+"<br>Debug Set - My school turned off console! D:";
},100);


setInterval(function(){

  if(inputs["up"]){
    y-=speed;
  }
  if(inputs["down"]){
    y+=speed;
  }
  if(inputs["left"]){
    x-=speed;
  }
  if(inputs["right"]){
    x+=speed;
  }
  
  var keystrokesVisualRenderString="";
  if(inputs["up"]){
    keystrokesVisualRenderString+="|<span class=\"red\">Up</span>|";
  }else{
    keystrokesVisualRenderString+="|Up|";
  }
  if(inputs["down"]){
    keystrokesVisualRenderString+="<span class=\"red\">Down</span>|";
  }else{
    keystrokesVisualRenderString+="Down|";
  }
  if(inputs["left"]){
    keystrokesVisualRenderString+="<span class=\"red\">Left</span>|";
  }else{
    keystrokesVisualRenderString+="Left|";
  }
  if(inputs["right"]){
    keystrokesVisualRenderString+="<span class=\"red\">Right</span>|";
  }else{
    keystrokesVisualRenderString+="Right|";
  }

  document.getElementById("keystrokesVisual").innerHTML=keystrokesVisualRenderString;

  Send();
},50);
