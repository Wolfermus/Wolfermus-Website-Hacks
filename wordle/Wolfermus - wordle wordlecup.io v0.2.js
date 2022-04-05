function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

var interact = {};
var allWords = {};

var wordlecupActive = true;
var gameStatus = 0;
var currentRow = 0;
var rowLength = null;
var gameData = {
	lettersCorrect: {},
	lettersElsewhere: {},
	lettersAbsent: [],
	words: []
}


var alertBox = document.createElement("p");
alertBox.innerHTML = "Script Activating...";
document.getElementById("root").prepend(alertBox);

var response = null;
var allWords5Letters = null;

(async function(){
	response = await (await fetch('https://raw.githubusercontent.com/feb199/Lots-Of-Words/main/allWords4Letters.txt')).text();
	allWords[4] = await response.toString().split("\n");
	
	response = await (await fetch('https://raw.githubusercontent.com/feb199/Lots-Of-Words/main/allWords5Letters.txt')).text();
	allWords[5] = await response.toString().split("\n");
	
	response = await (await fetch('https://raw.githubusercontent.com/feb199/Lots-Of-Words/main/allWords6Letters.txt')).text();
	allWords[6] = await response.toString().split("\n");
	
	response = await (await fetch('https://raw.githubusercontent.com/feb199/Lots-Of-Words/main/allWords7Letters.txt')).text();
	allWords[7] = await response.toString().split("\n");
	
	response = await (await fetch('https://raw.githubusercontent.com/feb199/Lots-Of-Words/main/allWords8Letters.txt')).text();
	allWords[8] = await response.toString().split("\n");
})();

var inputWord = null;

var wordlecupProcess = async function() {
	if(!wordlecupActive) return;
	if(gameStatus == 5) {
		gameStatus = 1
	} else {
		await wordlecupCheckStatus()
	}

	alertBox.innerHTML = gameStatus.toString()
	
	if(gameStatus == 1) {
		if(Object.keys(interact).length <= 0 && document.getElementsByClassName("Game-keyboard-button").length > 0) await wordlecupSetupInteraction();
		if(Object.keys(interact).length > 0 && document.getElementsByClassName("Game-keyboard-button").length > 0) {		
			if(currentRow == 0) {
				rowLength = await document.getElementsByClassName("Row")[currentRow].children.length;
				
				inputWord = await allWords[rowLength][Math.floor(Math.random() * allWords[rowLength].length)];
				await wordlecupInputText(inputWord);
			} else {
				if(Object.keys(gameData.lettersCorrect).length > 0) {
					for(let letterPos in gameData.lettersCorrect) {
						if(gameData.words.length <= 0) {
							for(let wordPos in allWords[rowLength]) {
								let word = allWords[rowLength][wordPos]
								
								if(word[letterPos] == gameData.lettersCorrect[letterPos]) {
									await gameData.words.push(word);
								}
							}
						} else {
							for(let wordPos in gameData.words) {
								let word = allWords[rowLength][wordPos]
								
								if(word[letterPos] != gameData.lettersCorrect[letterPos]) {
									await gameData.words.splice(gameData.words.indexOf(word), 1)
								}
							}
						}
					}
				} else {
					if(gameData.words.length <= 0) {
						gameData.words = await [...allWords[rowLength]];
					}
				}
				
				if(Object.keys(gameData.lettersElsewhere).length > 0) {
					for(let elsewhereLetter in gameData.lettersElsewhere) {
						for(let wordPos in gameData.words) {
							let word = gameData.words[wordPos];
							let containsLetter = [];
							
							for(let letterPos in word) {
								if(!Object.keys(gameData.lettersCorrect).includes(letterPos)) {
									if(word[letterPos] == elsewhereLetter) {
										if(gameData.lettersElsewhere[elsewhereLetter].pos.includes(letterPos))) {
											await gameData.words.splice(gameData.words.indexOf(word), 1)
										} else {
											await containsLetter.push(elsewhereLetter);
										}
									}
								}
							}
							
							if(containsLetter.length < gameData.lettersElsewhere[elsewhereLetter].num) {
								await gameData.words.splice(gameData.words.indexOf(word), 1)
							}
						}
					}
				}
				
				if(gameData.lettersAbsent.length > 0) {
					for(let lettersAbsentLetterPos in gameData.lettersAbsent) {
						lettersAbsentLetter = gameData.lettersAbsent[lettersAbsentLetterPos];
						
						for(let wordPos in gameData.words) {
							let word = gameData.words[wordPos];
							
							for(let letterPos in word) {
								if(!Object.keys(gameData.lettersCorrect).includes(letterPos)) {
									if(word[letterPos] == lettersAbsentLetter) {
										await gameData.words.splice(gameData.words.indexOf(word), 1)
									}
								}
							}
						}
					}
				}
				
				var leastDuplicatedLetters = []
				
				for(let wordPos in gameData.words) {
					let word = gameData.words[wordPos];
					let numDuplicatedLetters = 0;
					let lettersUsed = {};
					
					for(let letterPos in word) {
						if(!Object.keys(gameData.lettersCorrect).includes(letterPos)) {
							if(lettersUsed[word[letterPos]]) {
								lettersUsed[word[letterPos]].num++
							} else {
								lettersUsed[word[letterPos]] = 1
							}
						}
					}
					
					if(Object.keys(gameData.lettersElsewhere).length > 0) {
						for(let elsewhereLetter in gameData.lettersElsewhere) {					
							if(lettersUsed[elsewhereLetter]) {
								if(lettersUsed[elsewhereLetter] > gameData.lettersElsewhere[elsewhereLetter].num) {
									lettersUsed[elsewhereLetter] -= gameData.lettersElsewhere[elsewhereLetter].num
								}
							}
						}
					}
					
					for(let letter in lettersUsed) {
						if(lettersUsed[letter] > 1) {
							numDuplicatedLetters += lettersUsed[letter]-1;
						}
					}
					
					await leastDuplicatedLetters.push({
						word,
						numDuplicatedLetters
					});
				}
				
				await leastDuplicatedLetters.sort(function (a, b) {
					return a.numDuplicatedLetters - b.numDuplicatedLetters;
				});
				
				
				let string = "";
				
				for(let wordObject in leastDuplicatedLetters) {
					string += `${leastDuplicatedLetters[wordObject].word.toString()}, `;
				}
				
				let leastDuplicatedLettersBox = document.createElement("p");
				leastDuplicatedLettersBox.innerHTML = string;
				document.getElementById("root").prepend(leastDuplicatedLettersBox);
				
				wordlecupActive = false;
			}
		}
	} else if(gameStatus == 2) {
		
		let row = await document.getElementsByClassName("Row")[currentRow].children;
		
		for (let i = 0; i < row.length; i++) {
			let rowLetter = row[i]
            let rowClassList = rowLetter.classList;
			
			let letterElsewhere = {}
			
			if(rowClassList.contains("letter-correct")) {
				gameData.lettersCorrect[i] = rowLetter.textContent;
			} else if(rowClassList.contains("letter-elsewhere")) {
				if(!letterElsewhere[rowLetter.textContent]) letterElsewhere[rowLetter.textContent] = [];
					
				letterElsewhere[rowLetter.textContent].push(i);
					
			} else if(rowClassList.contains("letter-absent")) {
				if(!gameData.lettersElsewhere[rowLetter.textContent]) {
					gameData.lettersAbsent.push(rowLetter.textContent);
				}
			}
			
			if(Object.keys(letterElsewhere).length > 0) {
				for(let letter in letterElsewhere) {
					if(gameData.lettersElsewhere[letter]) {
						if(letterElsewhere[letter].length == gameData.lettersElsewhere[letter].num) {
							gameData.lettersElsewhere[letter].pos.push(...letterElsewhere[letter]);
							
						} else {
							gameData.lettersElsewhere[letter].num = letterElsewhere[letter].length
							gameData.lettersElsewhere[letter].pos.push(...letterElsewhere[letter]);
							
						}
					} else {
						gameData.lettersElsewhere[letter] = {
							num: letterElsewhere[letter].length,
							pos: letterElsewhere[letter]
						}
					}
				}
			} else {
				gameData.lettersElsewhere = {}
			}
        }
		
		currentRow++
		
		let alertBox2 = document.createElement("p");
		alertBox2.innerHTML = `currentRow 1: ${currentRow}`;
		document.getElementById("root").prepend(alertBox2);
		
		let alertBox3 = document.createElement("p");
		alertBox3.innerHTML = `gameStatus 2: ${gameStatus}`;
		document.getElementById("root").prepend(alertBox3);
		
		await wordlecupCheckStatus()
		
		let alertBox4 = document.createElement("p");
		alertBox4.innerHTML = `gameStatus 3: ${gameStatus}`;
		document.getElementById("root").prepend(alertBox4);
		
		if(gameStatus == 2) {
			let alertBox5 = document.createElement("p");
			alertBox5.innerHTML = `4`;
			document.getElementById("root").prepend(alertBox5);
		
			gameStatus = 5
			
			let alertBox6 = document.createElement("p");
			alertBox6.innerHTML = `gameStatus 5: ${gameStatus}`;
			document.getElementById("root").prepend(alertBox6);
		}
	}
	
	if(!wordlecupActive) return;
	setTimeout(wordlecupProcess, 100);
}

var wordlecupInputText = async function(inputWord) {
	if(!wordlecupActive) return;
	for (let letter of inputWord) {
		await interact[letter].click();
	}
	await sleep(50);
	interact["enter"].click();
}

var wordlecupCheckStatus = async function() {
	if(!wordlecupActive) return;
	if(!document.querySelectorAll('[role="alert"]')[0]) {
		gameStatus = 0;
		if(!wordlecupActive) return;
		return setTimeout(wordlecupCheckStatus, 100);
	}
	let alertElement = document.querySelectorAll('[role="alert"]')[0];
	
	if(alertElement.textContent.includes("Make your first guess!")) {
		gameStatus = 1;
	} else if(alertElement.textContent.includes("Please wait for others to finish.") && gameStatus != 0) {
		gameStatus = 0;
		
		currentRow = 0;
		rowLength = null;
		gameData = {
			lettersCorrect: {},
			lettersElsewhere: {},
			lettersAbsent: [],
			words: []
		}
	} else if(alertElement.textContent.includes("Not a valid word")) {
		gameStatus = 4;
	} else {
		gameStatus = 2;
		let alertBox6 = document.createElement("p");
		alertBox6.innerHTML = `gameStatus 6: ${gameStatus}`;
		document.getElementById("root").prepend(alertBox6);
	}
}

var wordlecupSetupInteraction = async function() {
	if(!wordlecupActive) return;
	if(document.getElementsByClassName("Game-keyboard-button").length > 0) {
		interact = {
			"q": document.getElementsByClassName("Game-keyboard-button")[0],
			"w": document.getElementsByClassName("Game-keyboard-button")[1],
			"e": document.getElementsByClassName("Game-keyboard-button")[2],
			"r": document.getElementsByClassName("Game-keyboard-button")[3],
			"t": document.getElementsByClassName("Game-keyboard-button")[4],
			"y": document.getElementsByClassName("Game-keyboard-button")[5],
			"u": document.getElementsByClassName("Game-keyboard-button")[6],
			"i": document.getElementsByClassName("Game-keyboard-button")[7],
			"o": document.getElementsByClassName("Game-keyboard-button")[8],
			"p": document.getElementsByClassName("Game-keyboard-button")[9],
			"a": document.getElementsByClassName("Game-keyboard-button")[10],
			"s": document.getElementsByClassName("Game-keyboard-button")[11],
			"d": document.getElementsByClassName("Game-keyboard-button")[12],
			"f": document.getElementsByClassName("Game-keyboard-button")[13],
			"g": document.getElementsByClassName("Game-keyboard-button")[14],
			"h": document.getElementsByClassName("Game-keyboard-button")[15],
			"j": document.getElementsByClassName("Game-keyboard-button")[16],
			"k": document.getElementsByClassName("Game-keyboard-button")[17],
			"l": document.getElementsByClassName("Game-keyboard-button")[18],
			"backspace": document.getElementsByClassName("Game-keyboard-button")[19],
			"z": document.getElementsByClassName("Game-keyboard-button")[20],
			"x": document.getElementsByClassName("Game-keyboard-button")[21],
			"c": document.getElementsByClassName("Game-keyboard-button")[22],
			"v": document.getElementsByClassName("Game-keyboard-button")[23],
			"b": document.getElementsByClassName("Game-keyboard-button")[24],
			"n": document.getElementsByClassName("Game-keyboard-button")[25],
			"m": document.getElementsByClassName("Game-keyboard-button")[26],
			"enter": document.getElementsByClassName("Game-keyboard-button")[27]	
		}
	} else {
		gameStatus = 0;
	}
}

if(wordlecupActive) {
	await sleep(250);
	wordlecupProcess();
	alertBox.innerHTML = "Script Activated";
}