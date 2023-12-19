var colors = ['blue', 'red', 'purple', 'green', 'yellow', 'orange', 'cyan']; //colors
var found = [false, false, false, false]; //found boolen
var answer = []; //answer
var guess = []; //guess amounts
var remainingTries = 10; // Set the maximum number of tries

init(); //app.js
function init() {
    // Set the answer row to gray until guessed correctly
    for (var i = 0; i < 4; i++) {
        var cell = document.querySelector('#answer_col' + i);
        var color = Math.floor(Math.random() * 7);

        cell.classList.add('unknown');
        answer.push(color);
    }

    createGuessRow(1); //creates random guess row
}

function createGuessRow(rowNumber) {
    // Add row
    document.querySelector('#wrapper').insertAdjacentHTML(
        'beforeend',
        `<div id="row` + rowNumber + `">
            <div class="pin" id="row` + rowNumber + `_col0">&nbsp;</div>
            <div class="pin" id="row` + rowNumber + `_col1">&nbsp;</div>
            <div class="pin" id="row` + rowNumber + `_col2">&nbsp;</div>
            <div class="pin" id="row` + rowNumber + `_col3">&nbsp;</div>
            <div class="guess" id="row` + rowNumber + `_guess">Check Answer!</div>
        </div>`
    );
    // Populates guess
    for (var i = 0; i < 4; i++) {
        if (found[i]) {
            var cell = document.querySelector('#row' + rowNumber + '_col' + i);
            cell.setAttribute('style', 'background-color: ' + colors[answer[i]]);
            guess[i] = answer[i];
        } else guess[i] = -1;
    }

    // Setup actions for the user
    var colorSelect = function () {
        var col = parseInt(this.id.split('_col')[1]);
        var newColor = (guess[col] + 1) % 7;
        this.setAttribute('style', 'background-color: ' + colors[newColor]);
        guess[col] = newColor;
    };
    document.querySelector('#row' + rowNumber + '_guess').addEventListener('click', function () {
        // Disable current guess row
        this.style.display = 'none';
        document.querySelector('#row' + rowNumber + '_col0').removeEventListener('click', colorSelect);
        document.querySelector('#row' + rowNumber + '_col1').removeEventListener('click', colorSelect);
        document.querySelector('#row' + rowNumber + '_col2').removeEventListener('click', colorSelect);
        document.querySelector('#row' + rowNumber + '_col3').removeEventListener('click', colorSelect);

        // Determine if we found any matches
        for (var i = 0; i < 4; i++) {
            if (guess[i] == answer[i]) {
                found[i] = true;

                var cell = document.querySelector('#answer_col' + i);
                cell.classList.remove('unknown');
                cell.setAttribute('style', 'background-color: ' + colors[guess[i]]);
            }
        }

        // Create a new guess row if needed
        var unfound = 0;
        for (var i = 0; i < 4; i++) {
            if (!found[i]) unfound++;
        }

        remainingTries--; //goes -1 tries
        //Ten Tries
        if (unfound > 0 && remainingTries > 0) {
            createGuessRow(rowNumber + 1);
        } else {
            alert('Game Over. Must hit ReStart to start a new game!')
            alert('Game Over! Answer was: ' + answer.map(color => colors[color]).join(', '));
            resetGame();
        }
    });
    //Listens if the row has been clicked on browser
    document.querySelector('#row' + rowNumber + '_col0').addEventListener('click', colorSelect);
    document.querySelector('#row' + rowNumber + '_col1').addEventListener('click', colorSelect);
    document.querySelector('#row' + rowNumber + '_col2').addEventListener('click', colorSelect);
    document.querySelector('#row' + rowNumber + '_col3').addEventListener('click', colorSelect);
}
// Add this function for resetting the game
function resetGame() {
    // Clear the board and reset variables
    answer = [];
    guess = [];
    found = [false, false, false, false];
    remainingTries = 10;

    // Remove all existing rows
    var rows = document.querySelectorAll('#wrapper > div');
    rows.forEach(function (row) {
        row.remove();
    });
    // Initialize a new game
    init();
}
// Reset Game button
document.getElementById('resetButton').addEventListener('click', function () {
    resetGame();
});
// Help button
document.getElementById('helpButton').addEventListener('click', function () {
    alert("Welcome to Mastermind!\n\nTry to guess the correct combination of colors in 10 tries! Click on the pins to change colors:\nBlue,white,red,purple,green,yellow & orange(order).\nClick 'Check Answer!' to submit your guess.\nGrey colored pins will indicate correct positions. \nGood luck!");
});
json([remainingTries]); //WINRATE.JSON

