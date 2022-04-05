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
					if(gameData.words.length <= 0) {
						const promises = [];
						for(let letterPos in gameData.lettersCorrect) {
							await promises.push(new Promise(async resolve => {
								if(gameData.words.length <= 0) {
									const promises2 = [];
									for(let word in allWords[rowLength]) {
										await promises2.push(new Promise(async resolve2 => {
											let addBox = document.createElement("p");
											addBox.innerHTML = `addBox: ${allWords[rowLength][word]}`;
											document.getElementById("root").prepend(addBox);
											if(allWords[rowLength][word][letterPos] == gameData.lettersCorrect[letterPos]) {
												await gameData.words.push(allWords[rowLength][word]);
												await resolve2();
											} else {
												await resolve2();
											}
										}));
									}
									await Promise.all(promises2).then(async () => {
										await resolve();
									});
								} else {
									const promises2 = [];
									for(let word in gameData.words) {
										await promises2.push(new Promise(async resolve2 => {
											let removeBox = document.createElement("p");
											removeBox.innerHTML = `removeBox: ${allWords[rowLength][word]}`;
											document.getElementById("root").prepend(removeBox);
											if(allWords[rowLength][word][letterPos] != gameData.lettersCorrect[letterPos]) {
												await gameData.words.splice(gameData.words.indexOf(allWords[rowLength][word]), 1)
												await resolve2();
											} else {
												await resolve2();
											}
										}));
									}
									await Promise.all(promises2).then(async () => {
										await resolve();
									});
								}
							}));
						}
						while(promises.length <= 0) {
							await sleep(100);
						}
						await Promise.all(promises).then(() => {
							wordlecupActive = false
						});
					}
				}
			}
		}
	} else if(gameStatus == 2) {
		
		let row = await document.getElementsByClassName("Row")[currentRow].children;
		
		for (let i = 0; i < row.length; i++) {
			let rowLetter = row[i]
            let rowClassList = rowLetter.classList;
			
			if(rowClassList.contains("letter-correct")) {
				gameData.lettersCorrect[i] = rowLetter.textContent;
			} else if(rowClassList.contains("letter-elsewhere")) {
				if(!gameData.lettersElsewhere[rowLetter.textContent]) gameData.lettersElsewhere[rowLetter.textContent] = []
				gameData.lettersElsewhere[rowLetter.textContent].push(i);
			} else if(rowClassList.contains("letter-absent")) {
				gameData.lettersAbsent.push(rowLetter.textContent);
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