window.addEventListener("load", function () {
  document.getElementById("debugFieldset").style.display="none";//hides debug window
});


document.onkeydown = function(event){
    if(event.which==13){
      SubmitChat();
    }
}