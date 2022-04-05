const fs = require("fs");
var allWords = {};

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

var response = null;

(async function(){
	await fs.readFile("./allWords4Letters.txt", 'utf8', async function read(err, response) {
		allWords[4] = await response.toString().split("\n");
	});
	
	await fs.readFile("./allWords5Letters.txt", 'utf8', async function read(err, response) {
		allWords[5] = await response.toString().split("\n");
	});
	
	await fs.readFile("./allWords6Letters.txt", 'utf8', async function read(err, response) {
		allWords[6] = await response.toString().split("\n");
	});
	
	await fs.readFile("./allWords7Letters.txt", 'utf8', async function read(err, response) {
		allWords[7] = await response.toString().split("\n");
	});
	
	await fs.readFile("./allWords8Letters.txt", 'utf8', async function read(err, response) {
		allWords[8] = await response.toString().split("\n");
	});
	
	var wordList = ["blag", "phoh", "hyen", "cokey", "adoam", "pleno", "pense", "romer", "tabac", "quila", "legger", "durals", "kemper", "awhato", "tirasse", "lumines", "pronest", "ciselure", "brazenry", "emmewing", "chromels", "recuring", "oomycete", "lithites", "pucelles", "spuggies", "bepester", "retraict", "treeware", "ockerdom", "tutrixes", "wappered", "parsings", "tzatziki", "paramese", "pityroid", "infotech", "bongrace", "vicaress", "duchesse", "conseils", "crumbily", "altezzas", "bizcacha", "locksmen", "redistil", "lorrells", "cootches", "cottowns", "knowbots", "reperepe", "kneidels", "mesaraic"]

	//for(let wordPos in dataArrayRaw) {
	//	wordPos = parseInt(wordPos);
	//	word = dataArrayRaw[wordPos];
	//	
	//	await word.replace("\r", "");
	//	await dataArray.push(word);
	//}
	await sleep(1000)

	for(let allWordsPos in allWords) {
		allWordsPos = parseInt(allWordsPos);
		someWords = allWords[allWordsPos];
		
		let tempAllWords = [];
		
		
		for(let someWordPos in someWords) {
			someWordPos = parseInt(someWordPos);
			someWord = someWords[someWordPos];
			
			if(!wordList.includes(someWord)) {
				await tempAllWords.push(someWord)
			}
		}
		
		await sleep(1000)
		console.log(tempAllWords)
		await fs.writeFile(`./words${allWordsPos}Formatted.txt`, tempAllWords.join("\n"), err => {
			if(err) throw err;
			console.log(`"words${allWordsPos}Formatted.txt" Done!`);
		});
	}
})();