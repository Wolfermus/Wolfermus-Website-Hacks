const fs = require("fs");
let wordList;

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

fs.readFile("./words.txt", 'utf8', async function read(err, data) {
    if (err) {
        throw err;
    }
    wordList = data.split(" ");
	

	//console.log(wordList)
	
	var confirmedWords = [];

	await wordList.forEach(async word => {
		sleep(1)
		confirmedWords.push(word.replace(/[^A-Za-z]/g,''));
	});
	await sleep(1000)
	await console.log(confirmedWords)
	await fs.writeFile("./wordsFormatted.txt", confirmedWords.join("\n"), err => {
		if(err) throw err;
		console.log("Done!");
	});
});