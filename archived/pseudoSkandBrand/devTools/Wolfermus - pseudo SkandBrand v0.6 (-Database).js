function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

var pseudoSkandBrandActivate = false
var rageMode = false
var sendWordToConsole = false
var randomStopToThink = false
var typoHumanError = false
var fixTypoHumanError = false
var typoHumanErrorFreq = 103

var cps = 500
var reactionTime = 850
var typingSpeed = 200
var prevWord = ""

var togglePseudoSkandBrandProcess = async function() {
  pseudoSkandBrandActivate = !pseudoSkandBrandActivate
  toggleBtnPseudoSkandBrandProcess.innerHTML = `Toggle Script: ${pseudoSkandBrandActivate}`;
  pseudoSkandBrandProcess()
}

var togglePseudoSkandBrandRagemode = async function() {
  rageMode = !rageMode
  toggleBtnPseudoSkandBrandRagemode.innerHTML = `Toggle Rage Mode: ${rageMode}`;
}

var toggleSendWordToConsole = async function() {
  sendWordToConsole = !sendWordToConsole
  toggleBtnSendWordToConsole.innerHTML = `Toggle Send Word To Console: ${sendWordToConsole}`;
}

var toggleRandomStopToThink = async function() {
  randomStopToThink = !randomStopToThink
  toggleBtnRandomStopToThink.innerHTML = `Toggle Random Stop To Think: ${randomStopToThink}`;
}

var toggleTypoHumanError = async function() {
  typoHumanError = !typoHumanError
  toggleBtnTypoHumanError.innerHTML = `Toggle Typo Human Error: ${typoHumanError}`;
}

var toggleTypoHumanErrorFrequency = async function() {
  if(typoHumanErrorFreq == 103) {
    typoHumanErrorFreq = 40
  } else if(typoHumanErrorFreq == 40) {
    typoHumanErrorFreq = 20
  } else if(typoHumanErrorFreq == 20) {
    typoHumanErrorFreq = 12
  } else if(typoHumanErrorFreq == 12) {
    typoHumanErrorFreq = 103
  }
  toggleBtnTypoHumanErrorFrequency.innerHTML = `Toggle Typo Human Error Frequency: ${typoHumanErrorFreq}`;
}

var toggleFixTypoHumanError = async function() {
  fixTypoHumanError = !fixTypoHumanError
  toggleBtnFixTypoHumanError.innerHTML = `Toggle 100% Fix Typo Human Error: ${fixTypoHumanError}`;
}


var toggleBtnPseudoSkandBrandProcess = document.createElement("BUTTON");
toggleBtnPseudoSkandBrandProcess.innerHTML = "Toggle Script: false";
toggleBtnPseudoSkandBrandProcess.onclick = togglePseudoSkandBrandProcess;
document.getElementById("App").appendChild(toggleBtnPseudoSkandBrandProcess);

var toggleBtnPseudoSkandBrandRagemode = document.createElement("BUTTON");
toggleBtnPseudoSkandBrandRagemode.innerHTML = "Toggle Rage Mode: false";
toggleBtnPseudoSkandBrandRagemode.onclick = togglePseudoSkandBrandRagemode;
document.getElementById("App").appendChild(toggleBtnPseudoSkandBrandRagemode);

var toggleBtnSendWordToConsole = document.createElement("BUTTON");
toggleBtnSendWordToConsole.innerHTML = "Toggle Send Word To Console: false";
toggleBtnSendWordToConsole.onclick = toggleSendWordToConsole;
document.getElementById("App").appendChild(toggleBtnSendWordToConsole);

var toggleBtnRandomStopToThink = document.createElement("BUTTON");
toggleBtnRandomStopToThink.innerHTML = "Toggle Random Stop To Think: false";
toggleBtnRandomStopToThink.onclick = toggleRandomStopToThink;
document.getElementById("App").appendChild(toggleBtnRandomStopToThink);

var toggleBtnTypoHumanError = document.createElement("BUTTON");
toggleBtnTypoHumanError.innerHTML = "Toggle Typo Human Error: false";
toggleBtnTypoHumanError.onclick = toggleTypoHumanError;
document.getElementById("App").appendChild(toggleBtnTypoHumanError);

var toggleBtnTypoHumanErrorFrequency = document.createElement("BUTTON");
toggleBtnTypoHumanErrorFrequency.innerHTML = "Toggle Typo Human Error Frequency: 103";
toggleBtnTypoHumanErrorFrequency.onclick = toggleTypoHumanErrorFrequency;
document.getElementById("App").appendChild(toggleBtnTypoHumanErrorFrequency);

var toggleBtnFixTypoHumanError = document.createElement("BUTTON");
toggleBtnFixTypoHumanError.innerHTML = "Toggle 100% Fix Typo Human Error: false";
toggleBtnFixTypoHumanError.onclick = toggleFixTypoHumanError;
document.getElementById("App").appendChild(toggleBtnFixTypoHumanError);


var pseudoSkandBrandProcess = async function() {
  if(!pseudoSkandBrandActivate) return;
  if(document.getElementById("WordInput").parentElement.className !== "Hidden") {
    if(!pseudoSkandBrandActivate) return;
    let promptedWord = document.getElementById("StatusContainer").getElementsByClassName("Prompt")[0].innerHTML.toString().toLowerCase()
    let inputWords = database[promptedWord]

    if(!rageMode) cps = 1000;

    if(inputWords) {
      if(inputWords[0]) {
        let fullstring = inputWords[Math.floor(Math.random() * inputWords.length)];
        if(fullstring == prevWord) {
          inputWords.splice(inputWords.indexOf(prevWord), 1);
          fullstring = inputWords[Math.floor(Math.random() * inputWords.length)];
        }
        if(sendWordToConsole) console.log(fullstring);
        let inputstring = "";
        if(rageMode) {
          cps = 1
          await room.socket.emit("setWord", {
              word: fullstring,
              validate: true,
          });
          document.getElementById("WordInput").value = await "";
        } else {
          await sleep(reactionTime + (Math.floor(Math.random() * 100)));
          var i;
          for (i = 0; i < fullstring.length; i++) {

            if(randomStopToThink) {
              let randomIf = Math.floor(Math.random() * 5);
              if(randomIf == 2 && i >= 2 && i <= 4) await sleep(650);
            }

            await sleep(typingSpeed);

            if(typoHumanError) {
              let randomIf2 = Math.floor(Math.random() * typoHumanErrorFreq);
              let randomIf3 = Math.floor(Math.random() * 2);
              let randomIf3Toggle = false
              let temp1;

              if(fixTypoHumanError) randomIf3 = 1;

              if(randomIf2 == 1) {
                randomIf3Toggle = true
                temp1 = inputstring;
                inputstring += "e";
              } else if(randomIf2 == 4) {
                randomIf3Toggle = true
                temp1 = inputstring;
                inputstring += "g";
              } else if(randomIf2 == 8) {
                randomIf3Toggle = true
                temp1 = inputstring;
                inputstring += "o";
              } else { inputstring += fullstring[i]; }

              document.getElementById("WordInput").value = inputstring;
              room.socket.emit("setWord", {
                word: inputstring,
                validate: false,
              });

              if(randomIf3Toggle && randomIf3 == 1) {
                await sleep(500);
                inputstring = temp1
                document.getElementById("WordInput").value = temp1
                room.socket.emit("setWord", {
                  word: inputstring,
                  validate: false,
                });
                await sleep(250);
                inputstring += fullstring[i];
                document.getElementById("WordInput").value = inputstring;
                room.socket.emit("setWord", {
                  word: inputstring,
                  validate: false,
                });
              }
            } else {
              inputstring += fullstring[i];
              document.getElementById("WordInput").value = inputstring;
              room.socket.emit("setWord", {
                word: inputstring,
                validate: false,
              });
            }
          }
          await sleep(1)
          let wordInput = await document.getElementById("WordInput");
          await room.socket.emit("setWord", {
              word: wordInput.value,
              validate: true,
          });
          wordInput.value = await "";
        }
      }
    }
  }
  if(!pseudoSkandBrandActivate) return;
  setTimeout(pseudoSkandBrandProcess, cps)
}
if(pseudoSkandBrandActivate) pseudoSkandBrandProcess();
