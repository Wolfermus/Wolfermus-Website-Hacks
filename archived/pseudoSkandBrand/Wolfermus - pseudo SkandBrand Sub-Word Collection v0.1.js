var pseudoSkandBrandCollectionActivate = true;
var collectedPrompts = [];
var savedPrompts = [];

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms);
    })
}


var pseudoSkandBrandSwapCollectionProcess = async function() {
  if(pseudoSkandBrandCollectionActivate) {
    pseudoSkandBrandCollectionActivate = false;
    pseudoSkandBrandSaveCollectionProcess();
  } else {
    pseudoSkandBrandCollectionActivate = true;
    pseudoSkandBrandCollectionProcess();
  }
}


var pseudoSkandBrandSaveCollectionProcess = async function() {
  var data = new Blob([collectedPrompts.join(" ")] , {type: 'text/plain'});

  var url = window.URL.createObjectURL(data);

  var btn = document.createElement("a");
  btn.download="collectedPrompts.txt"
  btn.innerHTML = "CLICK ME";
  btn.href = url;
  document.getElementById('App').appendChild(btn);

  collectedPrompts = [];
}


var pseudoSkandBrandCollectionProcess = async function() {
  document.getElementById("JoinGameButton").click();
  document.getElementById("StartGameButton").click();
  if(!pseudoSkandBrandCollectionActivate) return;
  if(document.getElementById("WordInput").parentElement.className !== "Hidden") {
    if(!pseudoSkandBrandCollectionActivate) return;
    let promptedWord = document.getElementById("StatusContainer").getElementsByClassName("Prompt")[0].innerHTML.toString().toLowerCase();
    if(!collectedPrompts.includes(promptedWord)) {
      collectedPrompts.push(promptedWord);
    }
    document.getElementById("GlennButton").click();
    document.getElementById("GlennButton").click();
  }
  if(!pseudoSkandBrandCollectionActivate) return;
  setTimeout(pseudoSkandBrandCollectionProcess, 1);
}
if(pseudoSkandBrandCollectionActivate) pseudoSkandBrandCollectionProcess();