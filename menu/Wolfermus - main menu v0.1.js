/* const wlfUi = `https://greasyfork.org/scripts/443151-wolfermus-website-hacks-main-menu-ui-html/code/Wolfermus%20Website%20Hacks:%20Main%20Menu%20uihtml.user.css`;
const wlfCss = `https://greasyfork.org/scripts/443150-wolfermus-website-hacks-main-menu-main-css/code/Wolfermus%20Website%20Hacks:%20Main%20Menu%20maincss.user.css`;
const wlfGameUrls = {
	"wordle": {
		"wordlecup.io": {
			"main": `https://greasyfork.org/scripts/443156-wolfermus-website-hacks-main-auto-updated-wordle-wordcup-hack/code/Wolfermus%20Website%20Hacks:%20Main%20Auto%20Updated%20Wordle%20Wordcup%20Hack.user.js`,
			"testing": `https://greasyfork.org/scripts/443158-wolfermus-website-hacks-testing-auto-updated-wordle-wordcup-hack/code/Wolfermus%20Website%20Hacks:%20Testing%20Auto%20Updated%20Wordle%20Wordcup%20Hack.user.js`,
			"dev": `https://greasyfork.org/scripts/443159-wolfermus-website-hacks-development-auto-updated-wordle-wordcup-hack/code/Wolfermus%20Website%20Hacks:%20Development%20Auto%20Updated%20Wordle%20Wordcup%20Hack.user.js`
		}
	}
} */


const mainMenuURL = "https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/main/menu/";
const wwhURL = "https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/";
const wlfUi = `${mainMenuURL}ui/ui.html`;
const wlfCss = `${mainMenuURL}css/main.css`;
const wlfGameUrls = {
	"wordle": {
		"wordlecup.io": {
			"main": `${wwhURL}main/wordle/Wolfermus%20-%20wordle%20wordlecup.io%20autoupdate.js`,
			"testing": `${wwhURL}testings/wordle/Wolfermus%20-%20wordle%20wordlecup.io%20autoupdate.js`,
			"dev": `${wwhURL}dev/wordle/Wolfermus%20-%20wordle%20wordlecup.io%20autoupdate.js`
		}
	}
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms);
    });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



var mainWlfActive = true;

var mainWlfAutoDetectBox = null;
var mainWlfUlBox = null;
var mainWlfCloseBox = null;

var mainBranchBox = null;
var testingBranchBox = null;
var devBranchBox = null;

var wlfGame = null;
var wlfUrl = null;


var mainWlfContainer = document.createElement("div");
mainWlfContainer.classList.add("main-wlf-container");
document.body.appendChild(mainWlfContainer);

(async function(){
	if(!mainWlfActive) return;
	mainWlfContainer.innerHTML = await (await fetch(wlfUi)).text();
	
	let mainWlfStyleBox = await document.getElementById("main-wlf-style");
	mainWlfStyleBox.innerHTML = await (await fetch(wlfCss)).text();
	
	mainWlfAutoDetectBox = await document.getElementById("main-wlf-autodetect");
	mainWlfUlBox = await document.querySelector(".main-wlf-ul");
	mainWlfCloseBox = await document.getElementById("main-wlf-close");
	
	mainBranchBox = await document.getElementById("main-branch");
	testingBranchBox = await document.getElementById("testing-branch");
	devBranchBox = await document.getElementById("dev-branch");
	
	
	await mainWlfCloseBox.addEventListener("click", function() {
		mainWlfActive = false;
		mainWlfContainer.remove();
		return;
	});
	if(!mainWlfActive) return;

	
	
	if(window.location.href == "https://wordlecup.io/") {
		mainWlfAutoDetectBox.innerHTML = "Detecting Website.....";
		
		wlfGame = "wordle";
		wlfUrl = "wordlecup.io";
	} else {
		mainWlfAutoDetectBox.innerHTML = "This Website Is Not Supported";
		return;
	}
	
	while(wlfGame == null && !mainWlfActive) {
		await sleep(100);
	}
	if(!mainWlfActive) return;


	wlfGameUrls[wlfGame][wlfUrl]["main"]
	await mainBranchBox.addEventListener("click", async function() {
		let autoUpdate = await (await fetch(wlfGameUrls[wlfGame][wlfUrl]["main"])).text();
		await eval(autoUpdate);
		
		mainWlfActive = false;
		await mainWlfContainer.remove();
		return;
	});
	
	await testingBranchBox.addEventListener("click", async function() {
		let autoUpdate = await (await fetch(wlfGameUrls[wlfGame][wlfUrl]["testing"])).text();
		await eval(autoUpdate);
		
		mainWlfActive = false;
		await mainWlfContainer.remove();
		return;
	});
	
	await devBranchBox.addEventListener("click", async function() {
		let autoUpdate = await (await fetch(wlfGameUrls[wlfGame][wlfUrl]["dev"])).text();
		await eval(autoUpdate);
		
		mainWlfActive = false;
		await mainWlfContainer.remove();
		return;
	});
	
	
	
	mainWlfAutoDetectBox.innerHTML = `${capitalizeFirstLetter(wlfGame)}: Please select a branch to load`;
	mainWlfUlBox.style.display = "block";
	mainWlfUlBox.style.visibility = "visible";
	
})();