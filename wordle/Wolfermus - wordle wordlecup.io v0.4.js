const mainWordleURL = "https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/main/wordle/";
const mainWordleWordBankURL = "https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/main/wordle/wordBank/";

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

if(typeof interact === 'undefined') {
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
}


// document.getElementsByClassName("App-container")[0].style.height = "86vh";
document.getElementsByClassName("App-container")[0].style.backgroundImage = "url(https://i.imgur.com/9Q9u9Qc.png)";


if(debugMode) {
	alertBox = document.createElement("p");
	alertBox.innerHTML = "Script Activating...";
	document.getElementById("root").appendChild(alertBox);
};

/* let inputBox = document.createElement("p");
document.getElementById("root").appendChild(inputBox); */

let wlfContainer = document.createElement("div");
wlfContainer.classList.add("wlfContainer");
document.getElementById("root").appendChild(wlfContainer);

(async function(){
	await sleep(100);
	wlfContainer.innerHTML = await (await fetch(`${mainWordleURL}ui/ui.html`)).text();
	
	let wordleWlfStyleBox = await document.getElementById("wordle-wlf-style");
	wordleWlfStyleBox.innerHTML = await (await fetch(`${mainWordleURL}css/main.css`)).text();
	
	outputBox = await document.getElementsByClassName("wlf-Output")[0];
	
	document.getElementById("autoOutput").innerHTML = "Auto Mode [Disabled]";
	document.getElementById("debugOutput").innerHTML = "Debug Mode [Disabled]";
	document.getElementById("autoOutput").addEventListener("click", function() {
		if(autoMode != null) {
			if(autoMode) {
				autoMode = false;
				document.getElementById("autoOutput").innerHTML = "Auto Mode [Disabled]";
			} else {
				autoMode = true;
				document.getElementById("autoOutput").innerHTML = "Auto Mode [Enabled]";
			}
		}
	});
	document.getElementById("debugOutput").addEventListener("click", function() {
		if(debugMode != null) {
			if(debugMode) {
				debugMode = false;
				document.getElementById("debugOutput").innerHTML = "Debug Mode [Disabled]";
			} else {
				debugMode = true;
				document.getElementById("debugOutput").innerHTML = "Debug Mode [Enabled]";
			}
		}
	});
	
	
	response = await (await fetch(`${mainWordleWordBankURL}wordleWordleCupAllWords.txt`)).text();
	responseArray = await response.toString().split("\n");
	allWords[4] = await responseArray.filter(word => word.length == 4);
	allWords[5] = await responseArray.filter(word => word.length == 5);
	allWords[6] = await responseArray.filter(word => word.length == 6);
	allWords[7] = await responseArray.filter(word => word.length == 7);
	allWords[8] = await responseArray.filter(word => word.length == 8);
	
	response = await (await fetch(`${mainWordleWordBankURL}wordleWordleCupCommonWords.txt`)).text();
	responseArray = await response.toString().split("\n");
	commonWords[4] = await responseArray.filter(word => word.length == 4);
	commonWords[5] = await responseArray.filter(word => word.length == 5);
	commonWords[6] = await responseArray.filter(word => word.length == 6);
	commonWords[7] = await responseArray.filter(word => word.length == 7);
	commonWords[8] = await responseArray.filter(word => word.length == 8);
})();

var wordlecupProcess = async function() {
	if(!wordlecupActive) return;
	if(!bypassGameStatus) {
		await wordlecupCheckStatus()
	}
	
	await wordlecupCheckRow()
	
	while(oldRow == currentRow && currentRow != 0) {
		await sleep(250);
		await wordlecupCheckRow()
		await wordlecupCheckStatus()
	}
	
	if(gameStatus == 1 || bypassGameStatus) {
		bypassGameStatus = false;
		if(Object.keys(interact).length <= 0 && document.getElementsByClassName("Game-keyboard-button").length > 0) await wordlecupSetupInteraction();
		if(Object.keys(interact).length > 0 && document.getElementsByClassName("Game-keyboard-button").length > 0) {		
			if(currentRow == 0) {
				rowLength = await document.getElementsByClassName("Row")[currentRow].children.length;
				
				inputWord = await allWords[rowLength][Math.floor(Math.random() * allWords[rowLength].length)];
				await wordlecupInputText(inputWord);
			} else {
				if(!autoMode && !debugMode) outputBox.innerHTML = "Generating Words...";
				
				if(Object.keys(gameData.lettersCorrect).length > 0) {
					for(let letterPos in gameData.lettersCorrect) {
						letterPos = parseInt(letterPos);
						if(gameData.words.length <= 0) {
							for(let wordPos in allWords[rowLength]) {
								wordPos = parseInt(wordPos);
								let word = allWords[rowLength][wordPos]
								
								if(word[letterPos] == gameData.lettersCorrect[letterPos] && !gameData.words.includes(word)) {
									await gameData.words.push(word);
								}
							}
						} else {
							let tempCopy = [...gameData.words];
							
							for(let wordPos in tempCopy) {
								wordPos = parseInt(wordPos);
								let word = tempCopy[wordPos]
								
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
				
				if(debugMode) {
					let alertBox7 = document.createElement("p");
					alertBox7.innerHTML = `gameStatus 6: ${gameStatus}`;
					document.getElementById("root").prepend(alertBox7);
				}
				
				if(Object.keys(gameData.lettersElsewhere).length > 0) {
					for(let elsewhereLetter in gameData.lettersElsewhere) {
						let tempCopy = [...gameData.words];
						
						for(let wordPos in tempCopy) {
							wordPos = parseInt(wordPos);
							let word = tempCopy[wordPos];
							let containsLetterInPos = [];
							let containsLetter = [];
							let numContainsLetter = 0;
							
							
							for(let letterPos in word) {
								letterPos = parseInt(letterPos);
							
								if(!gameData.lettersCorrect[letterPos] && word[letterPos] == elsewhereLetter) {
									
									if(gameData.lettersElsewhere[elsewhereLetter].pos.includes(letterPos)) {
										await containsLetterInPos.push(elsewhereLetter);
									} else {
										numContainsLetter++
										await containsLetter.push(elsewhereLetter);
									}
								}
							}
							
							if(containsLetterInPos.length > 0 || numContainsLetter < gameData.lettersElsewhere[elsewhereLetter].num) {
								await gameData.words.splice(gameData.words.indexOf(word), 1)
							}
							if(gameData.lettersElsewhere[elsewhereLetter].max && numContainsLetter > gameData.lettersElsewhere[elsewhereLetter].num) {
								await gameData.words.splice(gameData.words.indexOf(word), 1)
							}
						}
					}
				}
				
				if(gameData.lettersAbsent.length > 0) {
					for(let lettersAbsentLetterPos in gameData.lettersAbsent) {
						lettersAbsentLetterPos = parseInt(lettersAbsentLetterPos);
						lettersAbsentLetter = gameData.lettersAbsent[lettersAbsentLetterPos];
						let tempCopy = [...gameData.words];
						
						for(let wordPos in tempCopy) {
							wordPos = parseInt(wordPos);
							let word = tempCopy[wordPos];
							
							for(let letterPos in word) {
								letterPos = parseInt(letterPos);
								if(!gameData.lettersCorrect[letterPos]) {
									if(word[letterPos] == lettersAbsentLetter) {
										await gameData.words.splice(gameData.words.indexOf(word), 1)
									}
								}
							}
						}
					}
				}
				
				sortedDuplicatedLetters = [];
				commonSortedDuplicatedLetters = [];
				
				for(let wordPos in gameData.words) {
					wordPos = parseInt(wordPos);
					let word = gameData.words[wordPos];
					let numDuplicatedLetters = 0;
					let lettersUsed = {};
					
					for(let letterPos in word) {
						letterPos = parseInt(letterPos);
						if(!Object.keys(gameData.lettersCorrect).includes(letterPos)) {
							if(lettersUsed[word[letterPos]]) {
								lettersUsed[word[letterPos]]++
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
					
					await sortedDuplicatedLetters.push({
						word,
						numDuplicatedLetters
					});
					
					if(commonWords[rowLength].includes(word)) {
						await commonSortedDuplicatedLetters.push({
							word,
							numDuplicatedLetters
						});
					}
				}
				
				await sortedDuplicatedLetters.sort(function (a, b) {
					return a.numDuplicatedLetters - b.numDuplicatedLetters;
				});
				
				await commonSortedDuplicatedLetters.sort(function (a, b) {
					return a.numDuplicatedLetters - b.numDuplicatedLetters;
				});
				
				
				if(sortedDuplicatedLetters.length > 0) {
					leastDuplicatedLetters = await sortedDuplicatedLetters.filter(wordObject => wordObject.numDuplicatedLetters == 0);
					if(leastDuplicatedLetters.length <= 0) {
						leastDuplicatedLetters = await sortedDuplicatedLetters.filter(wordObject => wordObject.numDuplicatedLetters == 1);
						if(leastDuplicatedLetters.length <= 0) {
							leastDuplicatedLetters = sortedDuplicatedLetters.filter(wordObject => wordObject.numDuplicatedLetters == 2);
							if(leastDuplicatedLetters.length <= 0) {
								leastDuplicatedLetters = [sortedDuplicatedLetters[0]];
							}
						}
					}
				} else {
					leastDuplicatedLetters = [];
				}
				
				if(commonSortedDuplicatedLetters.length > 0) {
					commonLeastDuplicatedLetters = await commonSortedDuplicatedLetters.filter(wordObject => wordObject.numDuplicatedLetters == 0);
					if(commonLeastDuplicatedLetters.length <= 0) {
						commonLeastDuplicatedLetters = await commonSortedDuplicatedLetters.filter(wordObject => wordObject.numDuplicatedLetters == 1);
						if(commonLeastDuplicatedLetters.length <= 0) {
							commonLeastDuplicatedLetters = commonSortedDuplicatedLetters.filter(wordObject => wordObject.numDuplicatedLetters == 2);
							if(commonLeastDuplicatedLetters.length <= 0) {
								commonLeastDuplicatedLetters = [commonSortedDuplicatedLetters[0]];
							}
						}
					}
				} else {
					commonLeastDuplicatedLetters = [];
				}
				
 				// let string = "";
				
				/* for(let wordObject in sortedDuplicatedLetters) {
					string += `[${sortedDuplicatedLetters[wordObject].numDuplicatedLetters.toString()}] ${sortedDuplicatedLetters[wordObject].word.toString()}, `;
					//string += `[${leastDuplicatedLetters[wordObject].numDuplicatedLetters.toString()}] ${leastDuplicatedLetters[wordObject].word.toString()}, `;
				} */
				
				/* let leastDuplicatedLettersBox = document.createElement("p");
				leastDuplicatedLettersBox.innerHTML = string;
				document.getElementById("root").prepend(leastDuplicatedLettersBox); */
				
				/* let leastDuplicatedLettersBox = document.createElement("p");
				leastDuplicatedLettersBox.innerHTML = leastDuplicatedLetters[Math.floor(Math.random() * leastDuplicatedLetters.length)].word;
				document.getElementById("root").prepend(leastDuplicatedLettersBox); */
				if(autoMode) {
					if(commonLeastDuplicatedLetters.length > 0) {
						inputWord = commonLeastDuplicatedLetters[Math.floor(Math.random() * commonLeastDuplicatedLetters.length)].word;
							
						outputBox.innerHTML = inputWord;
							
						await wordlecupInputText(inputWord);
						
						await wordlecupCheckStatus();
						
						gameStatus = 5;
					} else {
						if(leastDuplicatedLetters.length > 0) {
							inputWord = leastDuplicatedLetters[Math.floor(Math.random() * leastDuplicatedLetters.length)].word;
							
							outputBox.innerHTML = inputWord;
								
							await wordlecupInputText(inputWord);
							
							await wordlecupCheckStatus();
							
							gameStatus = 5;
						} else {
							let errorBox = document.createElement("p");
							errorBox.innerHTML = "Critical Error: Cannot Find A Word";
							document.getElementById("root").prepend(errorBox);
						}
					}
				} else {
					if(leastDuplicatedLetters.length > 0) {
						combinedLeastDuplicatedLetters = await commonLeastDuplicatedLetters.concat(leastDuplicatedLetters);
						if(debugMode) {
							outputBox.innerHTML = JSON.stringify(combinedLeastDuplicatedLetters);
						} else {
							let fewLeastDuplicatedLetters = await combinedLeastDuplicatedLetters.slice(0, 9);
							
							/* for(let wordObject in fewLeastDuplicatedLetters) {
								outputBox.innerHTML += `${fewLeastDuplicatedLetters[wordObject].word}, `;
							} */
							outputBox.innerHTML = "";
							await fewLeastDuplicatedLetters.forEach(wordObject => outputBox.innerHTML += `${wordObject.word}, `);
							
							await wordlecupCheckStatus();
						}
						gameStatus = 5;
					} else {
						let errorBox = document.createElement("p");
						errorBox.innerHTML = "Critical Error: Cannot Find A Word";
						document.getElementById("root").prepend(errorBox);
					}
				}
			}
		}
		oldRow = currentRow
		await wordlecupCheckStatus()
	} else if(gameStatus == 2) {
		if(debugMode) {
			let gameStatus2Box = document.createElement("p");
			gameStatus2Box.innerHTML = "gameStatus 2: Running rn";
			document.getElementById("root").prepend(gameStatus2Box);
		}
		
		if(document.getElementsByClassName("Row").length > 0) {
			let row = await document.getElementsByClassName("Row")[oldRow].children;
			let letterElsewhere = {}
			
			for (let i = 0; i < row.length; i++) {
				let rowLetter = row[i]
				let rowClassList = rowLetter.classList;
				
				if(rowClassList.contains("letter-correct")) {
					gameData.lettersCorrect[i] = rowLetter.textContent;
					if(gameData.lettersElsewhere[rowLetter.textContent]) {
						if(gameData.lettersElsewhere[rowLetter.textContent].num > 1) {
							gameData.lettersElsewhere[rowLetter.textContent].num--
							await gameData.lettersElsewhere[rowLetter.textContent].pos.splice(gameData.lettersElsewhere[rowLetter.textContent].pos.indexOf(i), 1);
						} else {
							delete gameData.lettersElsewhere[rowLetter.textContent]
						}
					}
				} else if(rowClassList.contains("letter-elsewhere")) {
					if(!letterElsewhere[rowLetter.textContent]) letterElsewhere[rowLetter.textContent] = {
						"pos": [],
						"max": false
					}
					if(gameData.lettersAbsent.includes(rowLetter.textContent)) {
						await gameData.lettersAbsent.splice(gameData.lettersAbsent.indexOf(rowLetter.textContent), 1);
						
						letterElsewhere[rowLetter.textContent].max = true;
					}
						
					await letterElsewhere[rowLetter.textContent].pos.push(i);
						
				} else if(rowClassList.contains("letter-absent")) {
					if(!gameData.lettersAbsent.includes(rowLetter.textContent)) {
						if(!letterElsewhere[rowLetter.textContent]) {
							gameData.lettersAbsent.push(rowLetter.textContent);
						} else {
							letterElsewhere[rowLetter.textContent].max = true;
						}
					}
				}
			}
			
			if(Object.keys(letterElsewhere).length > 0) {
				for(let letter in letterElsewhere) {
					if(debugMode) {
						let alertBoxletter = document.createElement("p");
						alertBoxletter.innerHTML = `currentRow 0: ${letter}`;
						document.getElementById("root").prepend(alertBoxletter);
					}
			
					if(gameData.lettersElsewhere[letter]) {
						if(letterElsewhere[letter].pos.length != gameData.lettersElsewhere[letter].num) {
							gameData.lettersElsewhere[letter].num = letterElsewhere[letter].pos.length;
						}
						if(letterElsewhere[letter].max) {
							gameData.lettersElsewhere[letter].max = true;
						}
						gameData.lettersElsewhere[letter].pos.push(...letterElsewhere[letter].pos);
					} else {
						gameData.lettersElsewhere[letter] = {
							num: letterElsewhere[letter].pos.length,
							pos: letterElsewhere[letter].pos,
							max: letterElsewhere[letter].max
						}
					}
				}
			} else {
				gameData.lettersElsewhere = {}
			}
			
			if(debugMode) {
				let alertBox2 = document.createElement("p");
				alertBox2.innerHTML = `currentRow 1: ${currentRow}`;
				document.getElementById("root").prepend(alertBox2);
				
				let alertBox3 = document.createElement("p");
				alertBox3.innerHTML = `gameStatus 2: ${gameStatus}`;
				document.getElementById("root").prepend(alertBox3);
			}
			
			await wordlecupCheckStatus()
			
			if(debugMode) {
				let alertBox4 = document.createElement("p");
				alertBox4.innerHTML = `gameStatus 3: ${gameStatus}`;
				document.getElementById("root").prepend(alertBox4);
			}
			
			if(gameStatus == 2) {
				if(debugMode) {
					let alertBox5 = document.createElement("p");
					alertBox5.innerHTML = `4`;
					document.getElementById("root").prepend(alertBox5);
				}
			
				bypassGameStatus = true
				
				if(debugMode) {
					let alertBox6 = document.createElement("p");
					alertBox6.innerHTML = `gameStatus 5: ${gameStatus}`;
					document.getElementById("root").prepend(alertBox6);
				}
			}
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
	
	await wordlecupCheckStatus();
}

var wordlecupCheckRow = async function() {
	if(!wordlecupActive) return;
	
	if(document.querySelectorAll('[role="alert"]')[0]) {
		for(let i = 0; i < document.getElementsByClassName("Row").length; i++) {
			let row = document.getElementsByClassName("Row")[i];
			
			if(!row.classList.contains("Row-locked-in")) {
				currentRow = i;
				break;
			}
		}
	}
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
		if(debugMode) {
			let alertBoxReset = document.createElement("p");
			alertBoxReset.innerHTML = `resetting: ${gameStatus}`;
			document.getElementById("root").prepend(alertBoxReset);
		}
		
		gameStatus = 0;
		
		currentRow = 0;
		rowLength = null;
		gameData = {
			lettersCorrect: {},
			lettersElsewhere: {},
			lettersAbsent: [],
			words: []
		}
		await sleep(500)
		gameData = {
			lettersCorrect: {},
			lettersElsewhere: {},
			lettersAbsent: [],
			words: []
		}
	} else if(alertElement.textContent.includes("Not a valid word")) {
		gameStatus = 4;
		
		let errorBox = document.createElement("p");
		errorBox.innerHTML = "Critical Error: Invalid Word";
		document.getElementById("root").prepend(errorBox);
		
		await inValidWords.push(inputWord);
		
		if(autoMode) {
			await sortedDuplicatedLetters.splice(sortedDuplicatedLetters.indexOf(inputWord), 1)
			await commonSortedDuplicatedLetters.splice(commonSortedDuplicatedLetters.indexOf(inputWord), 1)
			await allWords[rowLength].splice(allWords[rowLength].indexOf(inputWord), 1)
			await commonWords[rowLength].splice(commonWords[rowLength].indexOf(inputWord), 1)
			
			for (let i = 0; i < rowLength; i++) {
				await interact["backspace"].click();
			}
			
			if(sortedDuplicatedLetters.length > 0) {
				leastDuplicatedLetters = await sortedDuplicatedLetters.filter(wordObject => wordObject.numDuplicatedLetters == 0);
				if(leastDuplicatedLetters.length <= 0) {
					leastDuplicatedLetters = await sortedDuplicatedLetters.filter(wordObject => wordObject.numDuplicatedLetters == 1);
					if(leastDuplicatedLetters.length <= 0) {
						leastDuplicatedLetters = sortedDuplicatedLetters.filter(wordObject => wordObject.numDuplicatedLetters == 2);
						if(leastDuplicatedLetters.length <= 0) {
							leastDuplicatedLetters = [sortedDuplicatedLetters[0]];
						}
					}
				}
			} else {
				leastDuplicatedLetters = [];
			}
			
			if(commonSortedDuplicatedLetters.length > 0) {
				commonLeastDuplicatedLetters = await commonSortedDuplicatedLetters.filter(wordObject => wordObject.numDuplicatedLetters == 0);
				if(commonLeastDuplicatedLetters.length <= 0) {
					commonLeastDuplicatedLetters = await commonSortedDuplicatedLetters.filter(wordObject => wordObject.numDuplicatedLetters == 1);
					if(commonLeastDuplicatedLetters.length <= 0) {
						commonLeastDuplicatedLetters = commonSortedDuplicatedLetters.filter(wordObject => wordObject.numDuplicatedLetters == 2);
						if(commonLeastDuplicatedLetters.length <= 0) {
							commonLeastDuplicatedLetters = [commonSortedDuplicatedLetters[0]];
						}
					}
				}
			} else {
				commonLeastDuplicatedLetters = [];
			}
			
			if(commonLeastDuplicatedLetters.length > 0) {
				inputWord = commonLeastDuplicatedLetters[Math.floor(Math.random() * commonLeastDuplicatedLetters.length)].word;
					
				outputBox.innerHTML = inputWord;
					
				await wordlecupInputText(inputWord);
				
				await wordlecupCheckStatus();
				
				gameStatus = 5;
			} else {
				if(leastDuplicatedLetters.length > 0) {
					inputWord = leastDuplicatedLetters[Math.floor(Math.random() * leastDuplicatedLetters.length)].word;
					
					outputBox.innerHTML = inputWord;
						
					await wordlecupInputText(inputWord);
					
					await wordlecupCheckStatus();
					
					gameStatus = 5;
				} else {
					let errorBox = document.createElement("p");
					errorBox.innerHTML = "Critical Error: Cannot Find A Word";
					document.getElementById("root").prepend(errorBox);
				}
			}
		}
	} else {
		gameStatus = 2;
		
		if(debugMode) {
			let alertBox6 = document.createElement("p");
			alertBox6.innerHTML = `gameStatus changing: ${gameStatus}`;
			document.getElementById("root").prepend(alertBox6);
		}
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
};

(async function(){
	if(wordlecupActive) {
		await sleep(250);
		while(outputBox == null) {
			await sleep(250);
		}
		wordlecupProcess();
		
		outputBox.innerHTML = "Script Activated";
	}
})();