const mainURL = "https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/main/"

let mainWlfContainer = document.createElement("div");
mainWlfContainer.classList.add("main-wlf-container");
document.appendChild(mainWlfContainer);

(async function(){
	wlfContainer.innerHTML = await (await fetch(`${mainWordleURL}ui/ui.html`)).text();
	
	outputBox = await document.getElementsByClassName("wlf-Output")[0];
	
	
})();