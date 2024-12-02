let canvas;
let world;
let keyboard = new Keyboard();


function init(){
    createLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    addTouchEvents();
    console.log('My Character is', world.character)
}

function startGame() {
    init();
    document.getElementById('startScreen').classList.add('d-none');
}

function restartGame() {
    world.resetGame();
    document.getElementById('lostGame').classList.remove('position-absolute');
    document.getElementById('lostGame').style.display = '';
    document.getElementById('winScreen').style.display = '';
    document.getElementById('winScreen').classList.remove('position-absolute');
    document.getElementById('restartButtonWin').classList.add('d-none');
    document.getElementById('restartButtonLost').classList.add('d-none');

}

function openDirections() {
    
}


window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    } 
    
});

function addTouchEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });

    document.getElementById('btnRestart').addEventListener('touchend', (e) => {
        e.preventDefault();
        restartGame()
    });
    
}



// function checkOrientation() {
//     const isNarrowScreen = window.innerWidth <= 1368;

//     if (isNarrowScreen) {
//         // Überwacht die Orientierung nur, wenn der Bildschirm schmaler als 1368px ist
//         window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
//             const portrait = e.matches;

//             if (portrait) {
//                 // Aufforderung, den Bildschirm zu drehen
//                 alert("Bitte drehe dein Gerät in den Landscape-Modus für das beste Spielerlebnis.");
//                 // Optional: Zeige eine benutzerdefinierte Nachricht oder UI-Element an
//                 document.getElementById("rotateMessage").style.display = "block";
//             } else {
//                 // Entferne die Nachricht, wenn der User in Landscape wechselt
//                 document.getElementById("rotateMessage").style.display = "none";
//             }
//         });
//     }
// }

// // Beim Laden der Seite und bei Größenänderungen überprüfen
// checkOrientation();
// window.addEventListener("resize", checkOrientation);
