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
    wordList = data.split("\n");

    //console.log(wordList)

    fs.readFile("./my_exported_file.txt", 'utf8', async function read(err2, data2) {
        if (err2) {
            throw err2;
        }
        subStrings = data2.split(" ");


        var confirmedWords = {};
        var i;
        var i2;
        // for (i = 0; i < subStrings.length; i++) {
        //     for (i2 = 0; i2 < wordList.length; i2++) {
        //         if(wordList[i2].includes(subStrings[i])) {
        //             await confirmedWords[subStrings[i]].push(wordList[i2]);
        //             await console.log(confirmedWords)
        //         }
        //     } 
        // } 
        await subStrings.forEach(async subString => {
            sleep(1)
            confirmedWords[subString.toLowerCase()] = await [];
        });
        await console.log(confirmedWords)
        await sleep(100)
        await subStrings.forEach(async subString => {
            sleep(1)
            await wordList.forEach(async word => {
                sleep(1)
                if(word.includes(subString.toLowerCase())) {
                    await confirmedWords[subString.toLowerCase()].push(word);
                    //await console.log(confirmedWords)
                }
            });
        });
        await sleep(1000)
        await console.log(confirmedWords)
        await fs.writeFile("./wordthatcontain.json", JSON.stringify(confirmedWords, null, 4), err => {
            if(err) throw err;
            console.log("Done!");
        });
    });
});