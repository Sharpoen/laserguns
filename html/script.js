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
  
  Send();
},50);


// document.getElementById("chatIn").keydown=function(e){
//     if(e.which === 13){
//         submitChat();
//     }
// }

// document.getElementById("chatIn").addEventListener("keydown", function(){
//     if(event.which==13){
//       // window.alert("left mouse");
//       submitChat();
//     }
// });

document.onkeydown = function(event){
    if(event.which==13){
      SubmitChat();
    }
}