//Create a trivia game
//need to create an object that contains questions with answers
//need to be able to click on each answer (on click)
//link to trivia api
// game will have true false OR multiple choice
//Game has a timer: we'll go for 30sec
//game ends when time runs out


function game(){


function getQuestions() {

$.ajax({
    url:
        "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple",
    method: "GET"
}).done(function (response) {
    console.log(response);
    
    var options = response.results;
    var questions = [];
    options.forEach(function (option) {
        var answers = option.incorrect_answers
        answers.push(option.correct_answer)
        var question = {
            question: option.question,
            correctAnswer: option.correct_answer,
            answers: answers
        }
        questions.push(question);
    })
    
    upDateHtml(questions);
});
}

function upDateHtml(questions){
    for (i = 0; i < questions.length; i++) {
        $('.game-Q-A').append(`<h1> ${questions[i].question} </h1>`);
        for (j = 0; j < questions[i].answers.length; j++) {
            $('.game-Q-A').append(`<input type = 'radio' name= 'question-${i}' value = ${questions[i].answers[j]}> ${questions[i].answers[j]}`);
        }
    }
} 

getQuestions();

var number = 4;
var intervalId;

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    number--;
    $("#timer").html("<h2>" + number + "</h2>");
    //  Once number hits zero...
    if (number === 0) {

        //  ...run the stop function.
        stop();

        //  Alert the user that time is up.
        alert("Time Up!");
    }
}
run();
}

game();

