var userClickedPattern = []
var gamePattern = []
var level = 0;
var gameStarted = false;
$(() => {

    attachStartListener();

})

function attachStartListener() {
    $(document).keypress(function (e) {
        e.preventDefault()
        gameStarted = true;

        $(".btn").click(function (e) {
            e.preventDefault();
            userClickedPattern.push(this.id);
            playSound(this.id);
            flash($(this));
            console.log(checkAnswer())
            if (checkAnswer() === false) {
                stopGame()
            }
            if (checkAnswer() === true && userClickedPattern.length === gamePattern.length) {
                nextSequence();
            }
        });

        nextSequence()
        $(document).off();
    });



}

function stopGame() {
    playSound("wrong");
    restart();
}

function clearclickedPattern() {
    userClickedPattern = [];
}

function restart() {
    gameStarted = false;
    clearclickedPattern();
    gamePattern = [];
    level = 0;
    $("h1").html("Press A Key to Start");
    attachStartListener();

}

function checkAnswer() {
    return userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1];
}

function nextSequence() {
    clearclickedPattern();
    level = level + 1;
    $("h1").html(`Level ${level}`);
    var color = randomChosenColour(randomNumber());
    gamePattern.push(color.attr("id"));
    setTimeout(() => { flash(color); }, 200);
    playSound(color.attr("id"));
}

function playSound(sound) {
    if (sound === "error") {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play()
    }
    var audio = new Audio(`sounds/${sound}.mp3`);
    audio.play()
}

function flash(object) {
    object.fadeOut(100).fadeIn(100);
}

function randomNumber() {
    var number = Math.floor(Math.random() * Math.floor(4))

    return number
}

function randomChosenColour(number) {
    var color;
    switch (number) {
        case 0:
            color = $("#green");
            break;

        case 1:
            color = $("#red");
            break;

        case 2:
            color = $("#yellow");
            break;

        case 3:
            color = $("#blue")
            break;

        default:
            console.log(number)
            break;
    }
    return color;
}
