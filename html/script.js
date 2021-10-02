window.addEventListener("load", function () {
  document.getElementById("debugFieldset").style.display="none";//hides debug window
});

var legendAnimFrame=0;

setInterval(function(){

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

  // document.getElementById("chatDiv").innerHTML=chat;

  document.getElementById("debugSet").innerHTML="pls : "+plsMoniterString+"<br>linkPls : "+linkMoniterString+"<br>lastJoin : "+lastJoin+"<br>Debug Set - My school turned off console! D:";
},100);


setInterval(function(){

  if(inputs["up"]){
    y-=speed;
    cy=floor(y/240);
  }
  if(inputs["down"]){
    y+=speed;
    cy=floor(y/240);
  }
  if(inputs["left"]){
    x-=speed;
    cx=floor(x/240);
  }
  if(inputs["right"]){
    x+=speed;
    cx=floor(x/240);
  }
  
  Send();
},50);


document.onkeydown = function(event){
    if(event.which==13){
      SubmitChat();
    }
}