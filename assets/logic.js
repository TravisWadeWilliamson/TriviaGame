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

    // On button click shows the body of the game and turns the  the start button into the timer
    $('.btn').on('click', function () {
        $('container').show();
        timer();
    })

    //Here we are grabbing our trivia questions from the API - this was hard and I got a lot of help from my tutor with this.
    function getQuestions() {

        //calling out to the API getting our trivia Qs.
        $.ajax({
            url:
                "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple",
            method: "GET"

            //waits for the ajax respons then starts compiling the info after ajax delivers
        }).then(function (response) {
            console.log(response);

            //creates a place to hold our options info
            var options =

                //digs further into the array of objects for the 4 loop to run through
                response.results;

            //creates an array to hold the 
            var questions = [];

            //4 loop loops through and pulls out the answers which in this API contained correct and incorrect answers in one object
            options.forEach(function (option) {
                var answers = option.incorrect_answers

                //this pushes the correct answer to our correct answer variable below
                answers.push(option.correct_answer)

                //hold the questions, incorrect answers and correct answers as key value pairs in an object
                var question = {
                    question: option.question,
                    correctAnswer: option.correct_answer,
                    answers: answers
                }
                // Pushes the Qs and As into the var questions array
                questions.push(question);
            })
            //Runs the function created below to push all the Qs and As to the html AFTER everything is compiled
            upDateHtml(questions);
        });
    }
    //created a function which updates the HTML with the data from the API.
    function upDateHtml(questions) {

        //this 4 loops runs through the questions array and appends them to the div with class game-Q-A
        for (i = 0; i < questions.length; i++) {
            $('.game-Q-A').append(`<h3> ${questions[i].question} </h3>`);

            //this 4 loop runs through the all fo the possible answers and appends them to same above div. It also assigns the answers for each question the index value of the question for use in the logic to follow
            for (j = 0; j < questions[i].answers.length; j++) {
                $('.game-Q-A').append(`<input type = 'radio' name= 'question-${i}' value = ${questions[i].answers[j]}> ${questions[i].answers[j]}`);
            }
        }
    }

    getQuestions();


    var gameTime = 5;
    var intervalId;

    function timer() {
        // DONE: Use setInterval to start the count here and set the clock to running.
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        gameTime--;
        $(".btn").text(`Time: ${gameTime}`);
        //  Once number hits zero...
        if (gameTime === 0) {
            //  ...run the stop function.
            stop();
            $(".btn").text(`Time Over`);
        }
    }

    function stop() {

        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
    }
});



