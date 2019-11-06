document.body.insertAdjacentHTML("afterbegin", 
`<header>
    <h1>Virtual keyboard</h1>
</header>
<main>
    <div class="main">
        <div class="field">
            <form name="field-text" method="post">
                <textarea name="text" id="textarea"></textarea>
            </form>
            <div class="board" id="board">
            </div>
        </div>
    </div>
</main>`);
let textArea = document.getElementById('textarea');
let board = document.getElementById('board');
let h1 = document.querySelector('h1');

const keyRows = [
    ['Backquote', 'ё', 'Ё','`','~', '46px', true],
    ['Digit1','1','!','1','!', '46px', true],
    ['Digit2','2','"','2','@', '46px', true],
    ['Digit3','3','№','3','#', '46px', true],
    ['Digit4','4',';','4','$', '46px', true],
    ['Digit5','5','%','5','%', '46px', true],
    ['Digit6','6',':','6','^', '46px', true],
    ['Digit7','7','?','7','&', '46px', true],
    ['Digit8','8','*','8','*', '46px', true],
    ['Digit9','9','(','9','(', '46px', true],
    ['Digit0','0',')','0',')', '46px', true],
    ['Minus','-','_','-','_', '46px', true],
    ['Equal','=','+','=','+', '46px', true],
    ['Backspace','Backspace','Backspace','Backspace','Backspace', '116px', false],
    ['Tab', 'Tab', 'Tab','Tab','Tab', '81px', false],
    ['KeyQ','й','Й','q','Q', '46px', true],
    ['KeyW','ц','Ц','w','W', '46px', true],
    ['KeyE','у','У','e','E', '46px', true],
    ['KeyR','к','К','r','R', '46px', true],
    ['KeyT','е','Е','t','T', '46px', true],
    ['KeyY','н','Н','y','Y', '46px', true],
    ['KeyU','г','Г','u','U', '46px', true],
    ['KeyI','ш','Ш','i','I', '46px', true],
    ['KeyO','щ','Щ','o','O', '46px', true],
    ['KeyP','з','З','p','P', '46px', true],
    ['BracketLeft','х','Х','[','{', '46px', true],
    ['BracketRight','ъ','Ъ',']','}', '46px', true],
    ['Backslash', '\\','/','\\','|', '81px', true],
    ['CapsLock', 'Caps Lock', 'Caps Lock','Caps Lock','Caps Lock', '116px', false],
    ['KeyA','ф','Ф','a','A', '46px', true],
    ['KeyS','ы','Ы','s','S', '46px', true],
    ['KeyD','в','В','d','D', '46px', true],
    ['KeyF','а','А','f','F', '46px', true],
    ['KeyG','п','П','g','G', '46px', true],
    ['KeyH','р','Р','h','H', '46px', true],
    ['KeyJ','о','О','j','J', '46px', true],
    ['KeyK','л','Л','k','K', '46px', true],
    ['KeyL','д','Д','l','L', '46px', true],
    ['Semicolon','ж','Ж',';',':', '46px', true],
    ['Quote','э','Э','\'','"', '46px', true],
    ['Enter','Enter','Enter','Enter','Enter', '116px', false],
    ['ShiftLeft', '&#8657;Shift', '&#8657;Shift','&#8657;Shift','&#8657;Shift', '116px', false],
    ['KeyZ','я','Я','z','Z', '46px', true],
    ['KeyX','ч','Ч','x','X', '46px', true],
    ['KeyC','с','С','c','C', '46px', true],
    ['KeyV','м','М','v','V', '46px', true],
    ['KeyB','и','И','b','B', '46px', true],
    ['KeyN','т','Т','n','N', '46px', true],
    ['KeyM','ь','Ь','m','M', '46px', true],
    ['Comma','б','Б',',','<', '46px', true],
    ['Period','ю','Ю','.','>', '46px', true],
    ['Slash','.',',','/','?', '46px', true],
    ['ArrowUp','&#9650;','&#9650;','&#9650;','&#9650;', '46px', false],
    ['ShiftRight','&#8657;Shift','&#8657;Shift','&#8657;Shift','&#8657;Shift', '116px', false],
    ['ControlLeft', 'Ctrl', 'Ctrl','Ctrl','Ctrl', '46px', false],
    ['MetaLeft','Win','Win','Win','Win', '46px', false],
    ['AltLeft','Alt','Alt','Alt','Alt', '46px', false],
    ['Space','','','','', '466px', false],
    ['AltRight','Alt','Alt','Alt','Alt', '46px', false],
    ['ArrowLeft','&#9668;','&#9668;','&#9668;','&#9668;', '46px', false],
    ['ArrowDown','&#9660;','&#9660;','&#9660;','&#9660;', '46px', false],
    ['ArrowRight','&#9658;','&#9658;','&#9658;','&#9658;', '46px', false],
    ['ControlRight','Ctrl', 'Ctrl','Ctrl','Ctrl', '46px', false]
];

for (let i=0; i<keyRows.length; i++) {
    board.insertAdjacentHTML("afterbegin", `<div class="key"></div>`);
}

let currentKey = document.querySelectorAll(".key");

for (let i=0; i < currentKey.length; i++) {
    currentKey[i].classList.add(keyRows[i][0]);
    currentKey[i].style.width = keyRows[i][5];
    currentKey[i].innerHTML = keyRows[i][1];
    if (!keyRows[i][6]) {
        currentKey[i].classList.add("func-key");
    }
}

let currentNumber = 1;

if (localStorage.getItem("class-lang")) {
    let fromLocalStorageLang = localStorage.getItem("class-lang");
    h1.classList.add(fromLocalStorageLang);
    switchLang(h1);
    switchKey();
}

function switchLang(a) {
    if (a.classList.contains("lang-en")) {
        currentNumber += 1;
    } else {
        currentNumber -= 1;
    }
}

function switchCapsLock(a) {
    if (a.classList.contains("caps-lock")) {
        currentNumber += 10;
    } else {
        currentNumber -= 10;
    }
}

function switchShift(a) {
    if (a.classList.contains("uppercase")) {
        currentNumber += 100;
        if (currentNumber > 123) {
            currentNumber -= 100;
        }
    } else {
        currentNumber -= 100;
    }
}

function switchKey() {
    switch(currentNumber) {
        case 1 :
        case 111 :
            for (let i=0; i < currentKey.length; i++) {
                currentKey[i].innerHTML = keyRows[i][1];
            }
        break;

        case 11 :
        case 101 :
            for (let i=0; i < currentKey.length; i++) {
                currentKey[i].innerHTML = keyRows[i][2];
            }
        break;

        case 2 :
        case 112 :
            for (let i=0; i < currentKey.length; i++) {
                currentKey[i].innerHTML = keyRows[i][3];
            }
        break;

        case 12 :
        case 102 :
            for (let i=0; i < currentKey.length; i++) {
                currentKey[i].innerHTML = keyRows[i][4];
            }
        break;
    }
}

function switchSymbol(b) {
    if (b[6] === true) {
        switch(currentNumber) {
            case 1 :
            case 111 :
                textArea.value += b[1];
            break;

            case 11 :
            case 101 :
                    textArea.value += b[2];
            break;

            case 2 :
            case 112 :
                    textArea.value += b[3];
            break;

            case 12 :
            case 102 :
                    textArea.value += b[4];
            break;
        }
    }
}

function selectedKeyDown(key) {
    if (key.classList.contains("key")) {
        key.classList.add("press");
    }
}

function selectedKeyUp(key) {
    if (key.classList.contains("key")) {
        key.classList.remove("press");
    }
}

let keyPressed = {};

document.addEventListener("keydown", function(event) {
    h1.focus();
    textArea.selectionStart = textArea.value.length;
    keyPressed[event.code] = true; 
    let currentPress = document.getElementsByClassName(event.code);
    if (currentPress.length > 0) {
        if (event.code === "CapsLock") {
            event.preventDefault();
            currentPress[0].classList.toggle("caps-lock");
            switchCapsLock(currentPress[0]);
            switchKey();
            currentPress[0].classList.toggle("press");
        } else if (event.code === "Tab") {
            event.preventDefault();
            textArea.value += "  ";
            currentPress[0].classList.add("press");
        } else {
            selectedKeyDown(currentPress[0]);
            for (let i=0; i < keyRows.length; i++) {
                if (keyRows[i][0] === event.code) {
                    if (keyRows[i][6] === false) {
                        textArea.focus();
                        textArea.selectionStart = textArea.value.length;
                    } else {
                        event.preventDefault();
                        switchSymbol(keyRows[i]);
                    }
                }
            }
        }
    }

    if (keyPressed["AltLeft"] && event.code === "ControlLeft") {
        h1.classList.toggle("lang-en");
        if (h1.classList.contains("lang-en")) {
            localStorage.setItem("class-lang", "lang-en");
        } else {
            localStorage.removeItem("class-lang");
        }
        switchLang(h1);
        switchKey();
    }

    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        currentPress[0].classList.add("uppercase");
        switchShift(currentPress[0]);
        switchKey();
    } 
});

document.addEventListener("keyup", function(event) {
    delete keyPressed[event.code];
    let currentPress = document.getElementsByClassName(event.code);
    
    if (event.code === "CapsLock") {
        event.preventDefault();
        return;
    } else {
        if (currentPress.length > 0) {
            selectedKeyUp(currentPress[0]);
        }   
    }

    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        event.preventDefault();
        currentPress[0].classList.remove("uppercase");
        switchShift(currentPress[0]);
        switchKey();
    }
});

board.addEventListener("mousedown", function(event) {
    let currentPress = event.target;
    selectedKeyDown(currentPress);
    // if (currentPress.classList.contains("key")) {
    // currentPress.classList.add("press");
    // }
});

board.addEventListener("mouseup", function(event) {
    let currentPress = event.target;
    selectedKeyUp(currentPress);
    // if (currentPress.classList.contains("key")) {
    // currentPress.classList.remove("press");
    // }
});

board.addEventListener("click", function(event) {
    textArea.selectionStart = textArea.value.length;
    for (let i=0; i < keyRows.length; i++) {
        if (keyRows[i][0] === event.target.classList[1]) {
            let currentKeyRow = keyRows[i];
            switchSymbol(currentKeyRow);
        };
    }
});






