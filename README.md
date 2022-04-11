# Wolfermus-Website-Hacks

This Repo contains website hacks that i have created and wanted to share

## Website Hacks

- [wordle](wordle)

## Auto Updated Menu Hack

### You Can Either: Auto Inject Script
<details><summary></summary>
<p>

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

#### Step 2: Goto the user script
[Wolfermus Menu Hack Insta Auto Update](menu/Wolfermus%20-%20main%20menu%20autoupdate%20insta.user.js)

#### Step 3: Install the user script
Click the button **Raw** located top right of where th code is located.
![image](https://user-images.githubusercontent.com/32810568/162675012-3a1b51a4-5403-449f-aa6d-f4700f241541.png)

#### Step 4: Click install user script
![image](https://user-images.githubusercontent.com/32810568/162675426-0863863f-8a87-4af3-a4c5-f07defedf203.png)
![image](https://user-images.githubusercontent.com/32810568/162675605-89500e66-b90d-47fa-be30-2d1b796289ee.png)
</p>
</details>

### Or You Can: Manually Inject Script

Copy and paste:
```
let branch = "main";
(async function(){
	let autoUpdate = await (await fetch(`https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/${branch}/menu/Wolfermus%20-%20main%20menu%20autoupdate.js`)).text();
	await eval(autoUpdate);
})();
```
Into your browser console by pressing `CTRL+SHIFT+J`
