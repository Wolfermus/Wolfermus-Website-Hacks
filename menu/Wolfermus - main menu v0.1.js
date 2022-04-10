const mainMenuURL = "https://github.com/Wolfermus/Wolfermus-Website-Hacks/blob/main/menu/"

let mainWlfContainer = document.createElement("div");
mainWlfContainer.classList.add("main-wlf-container");
document.appendChild(mainWlfContainer);

let mainWlfAutoDetectBox = null;

(async function(){
	mainWlfContainer.innerHTML = await (await fetch(`${mainMenuURL}ui/ui.html`)).text();
	
	mainWlfAutoDetectBox = await document.getElementById("main-wlf-autodetect");
	
	
})();