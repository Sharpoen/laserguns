var inputs={
  undefined:false,
  "up":false,
  "down":false,
  "left":false,
  "right":false,
  "clickL":false,
  "clickR":false
}
var inputLinks=[]
inputLinks[38]="up";inputLinks[87]="up";
inputLinks[40]="down";inputLinks[83]="down";
inputLinks[37]="left";inputLinks[65]="left";
inputLinks[39]="right";inputLinks[68]="right";

window.addEventListener("mousedown", function(){
    if(event.buttons==1){
      // window.alert("left mouse");
      inputs["clickL"]=true;
    }
    if(event.buttons==2){
      // alert("right mouse");
      inputs["clickR"]=true;
    }
});

window.onkeydown = function(){
    inputs[inputLinks[event.keyCode]]=true;
}
window.onkeyup = function(){
    inputs[inputLinks[event.keyCode]]=false;
}
