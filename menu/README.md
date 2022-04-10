# Wolfermus Menu Hack


Copy and paste:
```
(async function(){
	let autoUpdate = await (await fetch(`https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/dev/menu/Wolfermus%20-%20main%20menu%20autoupdate.js`)).text();
	await eval(autoUpdate);
})();
```
Into your browser console by pressing `CTRL+SHIFT+J`
