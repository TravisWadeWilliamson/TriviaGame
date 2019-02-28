/*Notes to Grader:

Things I didn't get to:
   
    1) I wanted to add some Japanie tunes to the site, but never even got around to researching that.

    2) The API offered 3 levels of difficulty. Ideally, I would have liked to have pulled the more difficult APIs to make the game increasingly harder if the player ranked in the top. If the player couldn't get a better score, the player would have received the next set of questions at the same level.

    3) A bit more styling - the radio buttons need padding/margins and need to be bigger, as does the text for the answers.

Biggest Problems:
    1) User can click more than once on each question - .one() didn't seem to work, nor did any other solution I tried.
    2) correct answers are only tallied up through 8, i.e. 9 and 10 don't register.
    3) When you start again, points continue to be tallied from the first game.
    
*/


//Create a trivia game
//need to create an object that contains questions with answers
//need to be able to click on each answer (on click)
//link to trivia api
// game will have true false OR multiple choice
//Game has a timer: we'll go for 30sec
//game ends when time runs out




// Hides body of game at open
$('container').hide();


// On button click shows the body of the game and turns the  the start button into the timer
function startRestartGame() {
    $('container').show();
    timer();
    getQuestions();
}

//Function to clear the object from the previous API call for the next round
function clearApiInfoDiv() {
    $(".game-Q-A").empty();
}

//Here we are grabbing our trivia questions from the API and pulling them outside of the following function to avoid scoping issues - this was hard and I got a lot of help from my tutor with this.
var questionsArr = [];

function getQuestions() {

    //calling out to the API getting our trivia Qs.
    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple",
        method: "GET"

        //waits for the ajax response then starts compiling the info after ajax delivers
    }).then(function (response) {
        ////console logged the response from the API
        // console.log(response);

        //creates a place to hold our options info
        //digs further into the array of objects for the 4 loop to run through
        var options = response.results;

        // //Console logged var options to make sure I was pulling the info out of the response
        // console.log(options);

        //creates an array to hold the questions included in the API
        var questions = [];

        //4 loop loops through and pushes the correct answers into incorrect answers so we can display all the possible choices for the user
        options.forEach(function (option) {
            var answers = option.incorrect_answers

            //this pushes the correct answer to our correct answer variable below
            answers.push(option.correct_answer)
            //console logged answers to make sure was getting a new array that included the correct answer w/in all the answers
            // console.log(answers);
            //hold the questions, incorrect answers and correct answers as key value pairs in an object
            var question = {
                question: option.question,
                correctAnswer: option.correct_answer,
                answers: answers
            }
            // console.log(question.correctAnswer);
            // Pushes the Qs and As into the var questions array
            questions.push(question);
        })
        //Runs the function created below to push all the Qs and As to the html AFTER everything is compiled
        upDateHtml(questions);
        questionsArr = questions
        // console.log(questions)
    });
}
//created a function which updates the HTML with the data from the API.
function upDateHtml(questions) {

    //this 4 loops runs through the questions array and appends them to the div with class game-Q-A
    for (i = 0; i < questions.length; i++) {
        $('.game-Q-A').append(`<h3> ${questions[i].question} </h3>`);

        //this 4 loop runs through the all fo the possible answers and appends them to same above div. It also assigns the answers for each question the index value of the question for use in the logic to follow
        for (j = 0; j < questions[i].answers.length; j++) {
            $('.game-Q-A').append(`<input type = 'radio' name= 'question-${i}' onclick="myGuess(this)" onclick="this.disabled = true "value='${questions[i].answers[j]}'> ${questions[i].answers[j]}`);
        }
    }
}

var points = 0;
//Creates a function to 
function myGuess(radio, index) {
    const { value, name } = radio;
    var userAnswer = value
    console.log(userAnswer);
    var index = name.split("-")[1]
    var correctAnswer = questionsArr[index].correctAnswer


    //compare userAnswer with correctAnswer and tally points
    if (userAnswer === correctAnswer) {
        console.log('correct');
        points++;
        console.log(points);
    }
}

// create a var for user selection
// $('input[type="button"]').one('click', function(){
//     var userSelection = $(this).val();
//     console.log(this);
// })



//Calls the function to grab our API info
// getQuestions();

$('.btn').on('click', function () {
    startRestartGame();
})

var gameTime = 46;
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
        clearApiInfoDiv();
        $(".btn").text(`Start`);
        gameTime = 46;
        knowledgeAssessment();
    }
}

function knowledgeAssessment() {
    switch (true) {
        case points <= 4:
            $('.knowledgeAssessment').text(`Your score was ${points} out of 10. Off with your topknot...`);
            break;
        case points >= 5 && points <= 7:
            $('.knowledgeAssessment').text(`Your score was ${points} out of 10. Your knowledge of manga and Japanime isn't bad. Consider watching more Japanmie and reading more manga.........`);
            break;
        case points >= 8 && points <= 9:
            $('.knowledgeAssessment').text(`Your score was ${points} out of 10. Your knowledge of manga and Japanime is impressive!`);
            break;
        case points === 10:
            $('.knowledgeAssessment').text(`Your score was ${points} out of 10. You win an all-expense paid, first-class trip to Tokyo! NOT!`);

    }

    // if (points <= 4) {
    //     $('.knowledgeAssessment').text(`Your score was ${points} out of 10. Off with your topknot...`);
    // };
    // if (points >= 5 && points <= 7) {
    //     $('.knowledgeAssessment').text(`Your score was ${points} out of 10. Your knowledge of manga and Japanime isn't bad. Consider watching more Japanmie and reading more manga.........`);
    // };

    // if (points >= 8 && points <= 9) {
    //     $('.knowledgeAssessment').text(`Your score was ${points} out of 10. Your knowledge of manga and Japanime is impressive!`);
    // };

    // if (points === 10) {
    //     $('.knowledgeAssessment').text(`Your score was ${points} out of 10. You win an all-expense paid, first-class trip to Tokyo! NOT!`);
    // };

}

function stop() {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
}





