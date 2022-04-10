# Wolfermus Wordle Hack


Copy and paste:
```
let branch = "main";
(async function(){
	let autoUpdate = await (await fetch(`https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/${branch}/wordle/Wolfermus%20-%20wordle%20wordlecup.io%20autoupdate.js`)).text();
	await eval(autoUpdate);
})();
```
Into your browser console by pressing `CTRL+SHIFT+J`


## Development Purposes

Copy and paste:
```
var interact = {};
var allWords = {};
var commonWords = {};
var inValidWords = [];

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

var sortedDuplicatedLetters = [];
var commonSortedDuplicatedLetters = [];
var commonLeastDuplicatedLetters = null;
var leastDuplicatedLetters = null;
var combinedLeastDuplicatedLetters = null;

var response = null;
var responseArray = null;

var inputWord = null;
var outputBox = null;

let branch = "dev";
(async function(interact, allWords, commonWords, inValidWords, debugMode, autoMode, wordlecupActive, gameStatus, bypassGameStatus, currentRow, oldRow, rowLength, gameData, alertBox, sortedDuplicatedLetters, commonSortedDuplicatedLetters, commonLeastDuplicatedLetters, leastDuplicatedLetters, combinedLeastDuplicatedLetters, response, responseArray, inputWord, outputBox){
    
	let autoUpdate = await (await fetch(`https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/${branch}/wordle/Wolfermus%20-%20wordle%20wordlecup.io%20autoupdate.js`)).text();
	await eval(autoUpdate);
})(interact, allWords, commonWords, inValidWords, debugMode, autoMode, wordlecupActive, gameStatus, bypassGameStatus, currentRow, oldRow, rowLength, gameData, alertBox, sortedDuplicatedLetters, commonSortedDuplicatedLetters, commonLeastDuplicatedLetters, leastDuplicatedLetters, combinedLeastDuplicatedLetters, response, responseArray, inputWord, outputBox);
```
Into your browser console by pressing `CTRL+SHIFT+J`
