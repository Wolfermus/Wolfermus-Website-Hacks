const fs = require("fs");
let wordList;

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

var num = 8;

fs.readFile(`./words${num}letters.txt`, 'utf8', async function read(err, data) {
    if (err) {
        throw err;
    }
    wordList = data.split("\n");
	
	fs.readFile("./wordsAll.txt", 'utf8', async function read(err2, data2) {
		if (err2) {
			throw err2;
		}
		wordList2 = data2.split("\n");

		//console.log(wordList)
		

		await wordList2.forEach(async word => {
			sleep(1)
			if(word.length === num) {
				if(!wordList.includes(word)) {
					wordList.push(word)
				}
			}
		});
		await sleep(1000)
		await console.log(wordList)
		await fs.writeFile(`./allWords${num}Letters.txt`, wordList.join("\n"), err => {
			if(err) throw err;
			console.log("Done!");
		});
	});
});