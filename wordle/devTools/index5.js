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
		
		confirmedWords.push(word);
	}
	
	
	var commonWords = [];
	
	await fs.readFile("./allCommonWords.txt", 'utf8', async function read(err, data2) {
		allCommonWords = data2.split("\n");
		
		
		
		for(wordPos in allCommonWords) {
			wordPos = parseInt((wordPos));
			let word = allCommonWords[wordPos];
			word = word.replace("\r", "");
			word = word.replace(/\s/g, "");
			word = word.toLowerCase()
			
			if(confirmedWords.includes(word)) {
				console.log(word);
				await commonWords.push(word);
			}
		}
	
		if(commonWords.length > 0) {
			await sleep(1000)
			await commonWords.sort((a, b) => a.length - b.length);
			await console.log(commonWords)
			await fs.writeFile("./wordleWordleCupCommonWords.txt", commonWords.join("\n"), err => {
				if(err) throw err;
				console.log("Done!");
			});
		}
	});
});