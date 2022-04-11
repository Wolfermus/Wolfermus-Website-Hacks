# Wolfermus-Website-Hacks

This Repo contains website hacks that i have created and wanted to share

## Website Hacks

- [pseudoSkandBrand](pseudoSkandBrand)
- [wordle](wordle)

## Auto Updated Menu Hack

### Auto Inject Script
#### Step 1: Install a user script manager
Known compatibles: 
- Opera/Opera GX: [Tampermonkey](https://addons.opera.com/en-gb/extensions/details/tampermonkey-beta/) or [Violentmonkey](https://violentmonkey.github.io/get-it/) (Follow **Note** About **Opera users**)
- Firefox: [Tampermonkey](https://addons.mozilla.org/en-GB/firefox/addon/tampermonkey/) or [Violentmonkey](https://addons.mozilla.org/en-GB/firefox/addon/violentmonkey/)
- Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)

Unknown compatibles: 
- Firefox: [Greasemonkey](https://addons.mozilla.org/en-GB/firefox/addon/greasemonkey/)
- Safari: [Tampermonkey](https://www.tampermonkey.net/?browser=safari) or [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)
- Microsoft Edge: [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- Maxthon: [Violentmonkey](https://extension.maxthon.com/detail/index.php?view_id=1680)

#### Step 2: Install the user script
[Wolfermus Menu Hack Insta Auto Update](menu/Wolfermus%20-%20main%20menu%20autoupdate%20insta.user.js)


### Manually Inject Script

Copy and paste:
```
let branch = "main";
(async function(){
	let autoUpdate = await (await fetch(`https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/${branch}/menu/Wolfermus%20-%20main%20menu%20autoupdate.js`)).text();
	await eval(autoUpdate);
})();
```
Into your browser console by pressing `CTRL+SHIFT+J`
