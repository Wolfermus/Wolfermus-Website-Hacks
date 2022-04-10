# Wolfermus-Website-Hacks

This Repo contains website hacks that i have created and wanted to share

## Website Hacks

- [pseudoSkandBrand](pseudoSkandBrand)
- [wordle](wordle)

## Auto Updated Menu Hack

Copy and paste:
```
(async function(){
	let autoUpdate = await (await fetch(`https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/main/menu/Wolfermus%20-%20main%20menu%20autoupdate.js`)).text();
	await eval(autoUpdate);
})();
```
Into your browser console by pressing `CTRL+SHIFT+J`
