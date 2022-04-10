const mainMenuURL = "https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/main/menu/"


var mainWlfActive = true;

var mainWlfAutoDetectBox = null;
var mainWlfUlBox = null;
var mainWlfCloseBox = null;

var mainWlfContainer = document.createElement("div");
mainWlfContainer.classList.add("main-wlf-container");
document.body.appendChild(mainWlfContainer);

(async function(){
	if(!mainWlfActive) return;
	mainWlfContainer.innerHTML = await (await fetch(`${mainMenuURL}ui/ui.html`)).text();
	
	let wlfStyleBox = await document.getElementById("wlf-style");
	wlfStyleBox.innerHTML = await (await fetch(`${mainMenuURL}css/main.css`)).text();
	
	mainWlfAutoDetectBox = await document.getElementById("main-wlf-autodetect");
	mainWlfUlBox = await document.querySelector(".main-wlf-ul");
	mainWlfCloseBox = await document.getElementById("main-wlf-close");
	
	await mainWlfCloseBox.addEventListener("click", function() {
		mainWlfActive = false;
		mainWlfContainer.remove();
		return;
	});
	if(!mainWlfActive) return;

	
	
	if(window.location.href == "https://wordlecup.io/") {
		mainWlfAutoDetectBox.innerHTML = "Please select a branch to load";
		mainWlfUlBox.style.display = "block";
		mainWlfUlBox.style.visibility = "visible";
	} else {
		mainWlfAutoDetectBox.innerHTML = "This Website Is Not Supported";
	}
	
})();