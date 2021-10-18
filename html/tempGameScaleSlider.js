var slider;

window.addEventListener('load',function(){

  slider = document.getElementById("myRange");

  slider.oninput = function() {
    gamescreen.setScale(this.value);
    gameinput.setScale(this.value);
  }

});

// Update the current slider value (each time you drag the slider handle)
// slider.onchange
