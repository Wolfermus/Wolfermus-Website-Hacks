const mainMenuURL = "https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/main/menu/";
const wwhURL = "https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/";

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
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
	mainWlfContainer.innerHTML = await (await fetch(`${mainMenuURL}ui/ui.html`)).text();
	
	let mainWlfStyleBox = await document.getElementById("main-wlf-style");
	mainWlfStyleBox.innerHTML = await (await fetch(`${mainMenuURL}css/main.css`)).text();
	
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


	
	await mainBranchBox.addEventListener("click", async function() {
		let autoUpdate = await (await fetch(`${wwhURL}main/${wlfGame}/Wolfermus%20-%20${wlfGame}%20${wlfUrl}%20autoupdate.js`)).text();
		await eval(autoUpdate);
		
		mainWlfActive = false;
		await mainWlfContainer.remove();
		return;
	});
	
	await testingBranchBox.addEventListener("click", async function() {
		let autoUpdate = await (await fetch(`${wwhURL}testing/${wlfGame}/Wolfermus%20-%20${wlfGame}%20${wlfUrl}%20autoupdate.js`)).text();
		await eval(autoUpdate);
		
		mainWlfActive = false;
		await mainWlfContainer.remove();
		return;
	});
	
	await devBranchBox.addEventListener("click", async function() {
		let autoUpdate = await (await fetch(`${wwhURL}dev/${wlfGame}/Wolfermus%20-%20${wlfGame}%20${wlfUrl}%20autoupdate.js`)).text();
		await eval(autoUpdate);
		
		mainWlfActive = false;
		await mainWlfContainer.remove();
		return;
	});
	
	
	
	mainWlfAutoDetectBox.innerHTML = `${capitalizeFirstLetter(wlfGame)}: Please select a branch to load`;
	mainWlfUlBox.style.display = "block";
	mainWlfUlBox.style.visibility = "visible";
	
})();