const fs = require("fs");
let wordList;

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

fs.readFile("./wordleWordleCupAllWords.txt", 'utf8', async function read(err, data) {
    if (err) {
        throw err;
    }
    wordList = data.split("\n");
	
	var confirmedWords = [];
	
	for(wordPos in wordList) {
		wordPos = parseInt((wordPos));
		let word = wordList[wordPos];
		word = word.replace("\r", "")
		word = word.replace(/\s/g, "");
		
		await confirmedWords.push(word);
	}

	
	if(confirmedWords.length > 0) {
		await sleep(1000)
		await confirmedWords.sort((a, b) => a.length - b.length);
		await console.log(confirmedWords)
		await fs.writeFile("./sortedWordleWordleCupAllWords.txt", confirmedWords.join("\n"), err => {
			if(err) throw err;
			console.log("Done!");
		});
	}
});