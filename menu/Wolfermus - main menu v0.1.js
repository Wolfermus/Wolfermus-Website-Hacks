const mainMenuURL = "https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/main/menu/"


var mainWlfActive = true;

var mainWlfAutoDetectBox = null;
var mainWlfCloseBox = null;

var mainWlfContainer = document.createElement("div");
mainWlfContainer.classList.add("main-wlf-container");
document.body.appendChild(mainWlfContainer);

(async function(){
	if(!mainWlfActive) return;
	mainWlfContainer.innerHTML = await (await fetch(`${mainMenuURL}ui/ui.html`)).text();
	
	mainWlfAutoDetectBox = await document.getElementById("main-wlf-autodetect");
	mainWlfCloseBox = await document.getElementById("main-wlf-close");
	
	await mainWlfCloseBox.addEventListener("click", function() {
		mainWlfActive = false;
		mainWlfContainer.remove();
		return;
	});
	if(!mainWlfActive) return;
	
	mainWlfAutoDetectBox.innerHTML = window.location.href;
	
	if(window.location.href == "https://wordlecup.io") {
		
	}
	
})();