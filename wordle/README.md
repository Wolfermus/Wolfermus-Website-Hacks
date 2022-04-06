# Wolfermus Wordle Hack


Copy and paste:
```
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
	eval(autoUpdate);
})();
```
Into your browser console by pressing `CTRL+SHIFT+J`