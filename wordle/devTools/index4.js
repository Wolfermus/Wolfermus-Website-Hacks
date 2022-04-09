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
	
	
	var newWords = [];
	
	await fs.readFile("./allCommonWords.txt", 'utf8', async function read(err, data2) {
		allCommonWords = data2.split("\n");
		
		
		
		for(wordPos in allCommonWords) {
			wordPos = parseInt((wordPos));
			let word = allCommonWords[wordPos];
			word = word.replace("\r", "");
			word = word.replace(/\s/g, "");
			word = word.toLowerCase()
			
			if(!confirmedWords.includes(word) && word.length >=4 && word.length <= 8) {
				console.log(word);
				await newWords.push(word);
			}
		}
		
		console.log(newWords);
	
		if(newWords.length > 0) {
			
			let combinedWordList = await confirmedWords.concat(newWords);
			
			await sleep(1000)
			await console.log(combinedWordList)
			await fs.writeFile("./updatedWordleWordleCupAllWords.txt", combinedWordList.join("\n"), err => {
				if(err) throw err;
				console.log("Done!");
			});
		}
	});
});