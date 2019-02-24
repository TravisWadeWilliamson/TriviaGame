//Create a trivia game
//need to create an object that contains questions with answers
//need to be able to click on each answer (on click)
//link to trivia api
// game will have true false OR multiple choice
//Game has a timer: we'll go for 30sec
//game ends when time runs out


$(document).ready(function () {

    // Hides body of game at open
    $('container').hide();

    // On button click shows the body of the game and hides the start button
    $('.btn').on('click', function () {
        $('container').show();
        timer();
    })
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
                    question: option.question, //options[0]
                    correctAnswer: option.correct_answer,
                    answers: answers
                }
                questions.push(question);
            })

            upDateHtml(questions);
        });
    }

    function upDateHtml(questions) {
        for (i = 0; i < questions.length; i++) {
            $('.game-Q-A').append(`<h3> ${questions[i].question} </h3>`);
            for (j = 0; j < questions[i].answers.length; j++) {
                $('.game-Q-A').append(`<input type = 'radio' name= 'question-${i}' value = ${questions[i].answers[j]}> ${questions[i].answers[j]}`);
            }
        }
    }

    getQuestions();


    var clockRunning = false;
    var gameTime = 5;
    var intervalId;

    function timer() {
        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(count, 1000);
            clockRunning = true;
        }
    }

    function decrement() {
        gameTime--;
        $(".btn").text(`${gameTime}`);
        //  Once number hits zero...
        if (gameTime === 0) {
            clockRunning = false;
            //  ...run the stop function.
            // stop();
        }
    }

});



