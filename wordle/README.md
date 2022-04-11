# Wolfermus Wordle Hack

## Auto Updated Wordle Hack


### You Can Either: Auto Inject Script
<details><summary></summary>
<p>

#### Step 1: Install a user script manager
<details><summary>Desktop</summary>
<p>

##### Known compatibles: 
- Opera/Opera GX: [Tampermonkey](https://addons.opera.com/en-gb/extensions/details/tampermonkey-beta/) or [Violentmonkey](https://violentmonkey.github.io/get-it/) (Follow **Note** About **Opera users**)
- Firefox: [Tampermonkey](https://addons.mozilla.org/en-GB/firefox/addon/tampermonkey/) or [Violentmonkey](https://addons.mozilla.org/en-GB/firefox/addon/violentmonkey/)
- Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
- AdGuard: [Comes Installed With A User Script Manager](https://adguard.com/en/adguard-windows/overview.html) (Yes you need the **for windows** not the extension)

##### Unknown compatibles: 
- Firefox: [Greasemonkey](https://addons.mozilla.org/en-GB/firefox/addon/greasemonkey/)
- Safari: [Tampermonkey](https://www.tampermonkey.net/?browser=safari) or [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)
- Microsoft Edge: [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- Maxthon: [Violentmonkey](https://extension.maxthon.com/detail/index.php?view_id=1680)
	
</p>
</details>
	
<details><summary>Android</summary>
<p>

##### Known compatibles: 
- Kiwi: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
- XBrowser: [Comes Installed With A User Script Manager](https://play.google.com/store/apps/details?id=com.xbrowser.play)

##### Unknown compatibles: 
- AdGuard: [Comes Installed With A User Script Manager](https://adguard.com/en/adguard-android/overview.html) (Altho to use the User Script Manager you need the pro version of the app which either you can pay for or get a limited time trial)
- Firefox: [Greasemonkey](https://addons.mozilla.org/en-GB/firefox/addon/greasemonkey/), [Tampermonkey](https://addons.mozilla.org/en-GB/firefox/addon/tampermonkey/) or [Violentmonkey](https://addons.mozilla.org/en-GB/firefox/addon/violentmonkey/)
	
</p>
</details>
	
<details><summary>iOS</summary>
<p>

##### Known compatibles: 

##### Unknown compatibles: 
- Safari: [Tampermonkey](https://www.tampermonkey.net/?browser=safari) or [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)
- AdGuard: [Comes Installed With A User Script Manager](https://adguard.com/en/adguard-ios/overview.html) (Altho to use the User Script Manager you need the pro version of the app which either you can pay for or get a limited time trial)
- Firefox: [Greasemonkey](https://addons.mozilla.org/en-GB/firefox/addon/greasemonkey/), [Tampermonkey](https://addons.mozilla.org/en-GB/firefox/addon/tampermonkey/) or [Violentmonkey](https://addons.mozilla.org/en-GB/firefox/addon/violentmonkey/)
	
</p>
</details>
	
<br>
	
#### Step 2: Goto the user script	
[Wolfermus Menu Hack Insta Auto Update](Wolfermus%20-%20wordle%20wordlecup.io%20autoupdate.js)

<br>
	
#### Step 3: Install the user script
Click the button **Raw** located top right of where th code is located.
<details><summary>Show Image</summary>
<p>

![image](https://user-images.githubusercontent.com/32810568/162675012-3a1b51a4-5403-449f-aa6d-f4700f241541.png)

</p>
</details>
	
<br>
	
#### Step 4: Click install user script
(If you are using **XBrowser Android App** you need to **copy the link** of the page then press the **button** at the **bottom middle** of the app,
then press the **gear** on the bottom left, click **browser scripts**, click **new script**, click **import script from url**, paste url into the box then press **OK**.)
	
(If you are using the **AdGuard Windows App** you need to **copy the link** of the page you can do this by **right clicking** the **Raw** button in the last step and pressing **Copy Link Address** or by **copying the url** from the url box, then goto the **AdGuard Windows App**, goto **Settings**, then goto **Extensions**, make sure its enabled,
then click **Add Extension**, paste the url link into the box, then click **Install**)
<details><summary>Show Images</summary>
<p>

![image](https://user-images.githubusercontent.com/32810568/162675426-0863863f-8a87-4af3-a4c5-f07defedf203.png)
![image](https://user-images.githubusercontent.com/32810568/162675605-89500e66-b90d-47fa-be30-2d1b796289ee.png)

</p>
</details>
	
</p>
</details>

### Or You Can: Manually Inject Script

Copy and paste:
```
let branch = "main";
(async function(){
	let autoUpdate = await (await fetch(`https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/${branch}/wordle/Wolfermus%20-%20wordle%20wordlecup.io%20autoupdate.js`)).text();
	await eval(autoUpdate);
})();
```
Into your browser console by pressing `CTRL+SHIFT+J`


## Development Purposes

Copy and paste:
```
var interact = {};
var allWords = {};
var commonWords = {};
var inValidWords = [];

var debugMode = false;
var autoMode = false;

var wordlecupActive = true;
var gameStatus = 0;
var bypassGameStatus = false;
var currentRow = 0;
var oldRow = 0
var rowLength = null;
var gameData = {
    lettersCorrect: {},
    lettersElsewhere: {},
    lettersAbsent: [],
    words: []
}

var alertBox = null;

var sortedDuplicatedLetters = [];
var commonSortedDuplicatedLetters = [];
var commonLeastDuplicatedLetters = null;
var leastDuplicatedLetters = null;
var combinedLeastDuplicatedLetters = null;

var response = null;
var responseArray = null;

var inputWord = null;
var outputBox = null;

let branch = "dev";
(async function(interact, allWords, commonWords, inValidWords, debugMode, autoMode, wordlecupActive, gameStatus, bypassGameStatus, currentRow, oldRow, rowLength, gameData, alertBox, sortedDuplicatedLetters, commonSortedDuplicatedLetters, commonLeastDuplicatedLetters, leastDuplicatedLetters, combinedLeastDuplicatedLetters, response, responseArray, inputWord, outputBox){
    
	let autoUpdate = await (await fetch(`https://raw.githubusercontent.com/Wolfermus/Wolfermus-Website-Hacks/${branch}/wordle/Wolfermus%20-%20wordle%20wordlecup.io%20autoupdate.js`)).text();
	await eval(autoUpdate);
})(interact, allWords, commonWords, inValidWords, debugMode, autoMode, wordlecupActive, gameStatus, bypassGameStatus, currentRow, oldRow, rowLength, gameData, alertBox, sortedDuplicatedLetters, commonSortedDuplicatedLetters, commonLeastDuplicatedLetters, leastDuplicatedLetters, combinedLeastDuplicatedLetters, response, responseArray, inputWord, outputBox);
```
Into your browser console by pressing `CTRL+SHIFT+J`
