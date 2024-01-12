var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

// Generate a random colour sequence
nextSequence = () => {

    userClickedPattern = [];

    level++;

    // Update h1 element to current level
    $("h1").html("Level" + " " + level);

    // Generate a random number and get a random colour from buttonColours 0-3
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).addClass(setClass);
    playSound(randomChosenColour);
    
    // Add the flash class to respective colour then pop out after 100ms
    function setClass() {
        $("#" + randomChosenColour).addClass("flash");
        setTimeout(function() {
            $("#" + randomChosenColour).removeClass("flash");
        }, 200)
    }
}

// Check if key Aa was pressed
$(document).on("keydown", function(event) {
    var keyPressed = event.key;
    if (!gameStarted && (keyPressed === "a" || keyPressed === "A")) {
        
        nextSequence();
        gameStarted = true;
    }
});

// Check what button was clicked
$(".btn").on("click", handler);

function handler() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    // Call checkAnswer to see if the color of userClickedPattern is the same as gamePattern
    checkAnswer(userClickedPattern.length - 1);
}

// Play a sound according the clicked button
playSound = (name) => {
    playingSound = new Audio("./sounds/" + name + ".mp3")
    playingSound.play();
}

// Add background effect to button was clicked, then remove after 100ms
function animatePress(currentColour) {
    var setState = $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        setState.removeClass("pressed");
    }, 100);
}

// Check if the user clicked on the right answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence()}, 1000);
        }
    } else {
        playSound("wrong");

        // Change the body background when user wrong answer
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // Change the h1 element when game-over class was triggered
        $("h1").html("Game Over, Press A to Restart");

        // Call if user wrong the sequence
        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}