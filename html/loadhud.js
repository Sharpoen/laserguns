function loadhudInfo(){
  document.getElementById("hudSection").innerHTML="[ Info ]<br><br>Update Info:<br>* Added blocks & and improved collisions<br>* Improved UI & added tools like a debug option window<br>Update Plans:<br>* Zombies & Slashings<br>* Friends & Foes<br>* Guns & Goblins<br>[!] SWORDS HAVE BEEN DISABLED DUE TO BUGS [!]<br><br>[ Credits ]<br>* Sharpoen - Main Director<br>* TheBushMaster - Dev";
}
function loadhudPlayers(){
  var playerString="[ Players ]<br>[ Owner ] "+owner+"<br>";
  var plsU=pls;
  
  for(let i=0;i<plsU.length;i++){
    if(owner==plsU[i].name){
      playerString+="* "+plsU[i].name+' <span class="dataText">[ Owner ]</span><br>';
    }else{
      playerString+="* "+plsU[i].name+"<br>";
    }
  }
  document.getElementById("hudSection").innerHTML=playerString;
}


function selectInvItem(item){
  // item[item]=!debug[item];
  // loadhudDebug();
  holdingItem=item;
  loadhudInventory();
}

function loadhudInventory(){
  
  var hudInventoryString;
  
  hudInventoryString='[ Inventory ]<br>Holding[ '+holdingItem+" ] - "+inventory[holdingItem]+"<br>[ Items ]<br>";

  for(n in inventory){
    hudInventoryString+=' <span class="hudbutton" onclick="selectInvItem(\''+n+'\')">['+n+']</span>'+' - '+inventory[n]+"<br>";

  }
  // console.log(hudInventoryString);
  document.getElementById("hudSection").innerHTML=hudInventoryString;
}


function toggleDebugItem(item){
  debug[item]=!debug[item];
  loadhudDebug();
}
function loadhudDebug(){
  
  var hudDebugString;
  
  hudDebugString="[ Debug Menu ]<br>"

  for(n in debug){
    hudDebugString+=' <span class="hudbutton" onclick="toggleDebugItem(\''+n+'\')">['+n+']</span>'+' - '+debug[n]+"<br>";

  }
  // console.log(hudDebugString);
  document.getElementById("hudSection").innerHTML=hudDebugString;
}

function loadhudFriends(){
  var hudFriendsString;
  
  hudFriendsString="[ Friends Menu ]<br>Saving for combat update..."

  document.getElementById("hudSection").innerHTML=hudFriendsString;
}



