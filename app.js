const keyboard = document.getElementById('qwerty');
let phraseUl = document.querySelector('#phrase ul');
const startButton = document.querySelector('.btn__reset');
const hearts = document.querySelectorAll('#scoreboard img');
let missed = 0;
const phrases = [
    'new york',
    'no school',
    'sun is out',
    'cookie jar',
    'fried chicken'
]



// returns a random phrase from the array
const getRandomPhraseAsArray = arr => {
    const randomPick = Math.floor(Math.random() * arr.length);
    return arr[randomPick];
}

// stores games phrase in variable
let phraseArray = getRandomPhraseAsArray(phrases);

//add letters of string to display
const addPhraseToDisplay = arr => {
    for (let i = 0; i < phraseArray.length; i ++) {
        const li = document.createElement('li');
        const character = phraseArray[i];
        li.textContent = character;
        if (character === ' ') {
            li.className += 'space';
        } else {
            li.className += 'letter';
        }
        phraseUl.appendChild(li);
    }
}

//Check if letter is in the phrase
const checkLetter = button => {
    let li = document.querySelectorAll('.letter');
    let match;
    for (let i = 0; i < li.length; i++) {
        let letter = li[i];
        if (button === letter.textContent) {
            letter.classList.add('show');
            match = letter.textContent;
        }
    }
    return match;
}

// Listen for "start game" button to be pressed
startButton.addEventListener('click', () => {
    const startScreen = document.getElementById('overlay');
    startScreen.style.display = 'none';
    addPhraseToDisplay(phraseArray);
    // resets game to play again
    if (startButton.textContent === 'Play Again') {
        while(phraseUl.firstChild) phraseUl.removeChild(phraseUl.firstChild);
        phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
        //remove chosen keys
        let buttons = keyboard.getElementsByTagName('BUTTON');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('chosen')
        }
        //change heart img
        for (let i = 0; i < hearts.length; i++) {
            hearts[i].src = "images/liveHeart.png";
        }
        // reset counter
        missed = 0;
    }
});

//Check if game has been won or lost
const checkWin = () => {
    const lettersToGuess = document.getElementsByClassName('letter').length;
    let lettersGuessed = document.getElementsByClassName('show').length;
    const overlayTitle = document.querySelector('.title');
    const won = lettersGuessed === lettersToGuess;
    const lost = missed > 4;
    const startScreen = document.getElementById('overlay');
    if (won || lost) {
        if (won) {
            overlayTitle.textContent = '!Congrats you Won!😜👏';
            startScreen.className = 'win';
        }
        if (lost) {
            overlayTitle.textContent = 'Fail😢';
            startScreen.className = 'lose';
        }
        startScreen.style.display = 'flex';
        startButton.textContent = 'Play Again';
    }   
}

// Listen for onscreen keyboard to be clicked
keyboard.addEventListener('click', e => {
    if ( event.target.tagName === 'BUTTON') {
        const button = event.target;
        const notYetChosen = button.className.indexOf('chosen') < 0;
        if (notYetChosen) {
            button.className += 'chosen';
            const letterFound = checkLetter(button.textContent);
            checkWin();
            if (!letterFound && missed < 5) {
                hearts[missed].src = "images/lostHeart.png";
                missed += 1;
            }
        }
    }
});