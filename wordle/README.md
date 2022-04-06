# Wolfermus Wordle Hack


Copy and paste:
```
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

function autoModeToggle() {
	if(autoMode != null) {
		if(autoMode) {
			autoMode = false;
			document.getElementById("autoOutput").innerHTML = "Auto Mode [Disabled]";
		} else {
			autoMode = true;
			document.getElementById("autoOutput").innerHTML = "Auto Mode [Enabled]";
		}
	}
}
		
function debugModeToggle() {
	if(debugMode != null) {
		if(debugMode) {
			debugMode = false;
			document.getElementById("debugOutput").innerHTML = "Debug Mode [Disabled]";
		} else {
			debugMode = true;
			document.getElementById("debugOutput").innerHTML = "Debug Mode [Enabled]";
		}
	}
}

var interact = {};
var allWords = {};
var notValidWord = [];

var debugMode = false;
var autoMode = false;

var wordlecupActive = true;
var gameStatus = 0;
var bypassGameStatus = false;
var currentRow = 0;
var oldRow = 0
var rowLength = null;
var gameData = {
	lettersCorrect: {},
	lettersElsewhere: {},
	lettersAbsent: [],
	words: []
}

var alertBox = null;

var leastDuplicatedLetters = null;
var sortedDuplicatedLetters = [];

var response = null;

var inputWord = null;

(async function(){
	let autoUpdate = await (await fetch(`https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/main/wordle/Wolfermus%20-%20wordle%20wordlecup.io%20autoupdate.js`)).text();
	await eval(autoUpdate);
	
	while(document.getElementById("autoOutput") == null || document.getElementById("debugOutput") == null) {
		await sleep(250);
	}
	document.getElementById("autoOutput").onclick = autoModeToggle();
	document.getElementById("debugOutput").onclick = debugModeToggle();
})();
```
Into your browser console by pressing `CTRL+SHIFT+J`