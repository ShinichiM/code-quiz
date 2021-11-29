// Erase or delete contents of the current page and then call function to create the new page again.
var startQuizButton = document.getElementById("start-quiz");
var questionContainer = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var xy = document.getElementById('intro-header');
var viewHighscore = xy.querySelector("h4");


var currentQuestion;
var numPoints = 0;
var time;

var answerResponse = document.createElement("div");
answerResponse.setAttribute("id", "user-response");
var buttonContainer = document.createElement("div");

buttonContainer.setAttribute("class", "container");
questionContainer.appendChild(buttonContainer);

var users = [];
var timer = 75;

var quizQuestions = [
    {question: "Commonly used data types DO NOT include",
    answers: [
        {text: "Strings", correct: false},
        {text: "Booleans", correct: false},
        {text: "Arrays", correct: false},
        {text: "Alerts", correct: true}
    ]},
    {question: "The condition in an if/else statement is enclosed with ____",
    answers: [
        {text: "quotes", correct: false},
        {text: "curley brackets", correct: true},
        {text: "parenthesis", correct: false},
        {text: "square brackets", correct: false}
    ]},
    {question: "What is a common looping method in Javascript?",
    answers: [
        {text: "for", correct: true},
        {text: "insert", correct: false},
        {text: "looper", correct: false},
        {text: "within", correct: false}
    ]},
    {question: "Arrays in JavaScript are used to store ____",
    answers: [
        {text: "Arrays", correct: false},
        {text: "Objects", correct: false},
        {text: "Strings", correct: false},
        {text: "All of the above", correct: true}
    ]}
];


// Countdown function for quiz timer
var countdown = function() {
    var divEl = document.getElementById("timer");
    time = setInterval(function(){
        if (timer >= 0){
            divEl.innerText = "Time: " + timer; 
            timer--;
        } else {
            clearInterval(time);
        }
    }, 1000);          
};

// Stop countdown set interval and return the current time
var stopCountdown = function() {
    clearInterval(time);
    var divEl = document.getElementById("timer");
    divEl.innerText = "Time: " + timer;
    return timer;
}
// Removes the elements on the start page
var removeStartPage = function() {
    // Get the p and button elements on start page
    var p1E1 = document.getElementById("test2");
    var buttonEl = document.getElementById("start-quiz");

    // Remove start page button and p elements.
    p1E1.remove();
    buttonEl.remove();
};

// Clear the previous question's answers from page
var clearQuestion = function() {
    // select all elements with id of button (All answers)
    buttons = document.querySelectorAll("#button");

    // Loop through each button and remove them89
    for (var button of buttons) {
        button.remove();
    }
};

// display Highscores -- quizFinishDiv, finishText
var highscore = function() {
    // Hide quiz header from highscore page
    document.getElementById("intro-header").style.display = 'none';

    // set h1 element to High Scores
    questionEl.innerText = "High Scores";

    // sort users by highest score 
    users.sort((a,b) => a.score < b.score ? 1 : -1);
    
    // Loop through the users array and only print the top 5 users according to score
    for (var i=0; i<users.length; i++) {
        if (i === 5) {
            break;
        }
        var test = document.createElement("p");
        test.setAttribute("id","highscores");
        test.setAttribute("class", "high-score");
        test.innerText = (i+1) + ". " + users[i].initials + " - " + users[i].score;
        questionContainer.appendChild(test);
    }
    
    // create div element to store the high score page buttons (Go back and clear scores)
    var divEl = document.createElement("div");
    divEl.setAttribute("class", "left-flex");
    var button1El = document.createElement("button");
    var button2El = document.createElement("button");

    // Set classes for buttons to match quiz buttons
    button1El.setAttribute("class", "submit-button");
    button1El.innerText = "Go Back";
    button2El.setAttribute("class", "submit-button");
    button2El.innerText = "Clear Highscores";
    
    // add the buttons to the div element
    divEl.appendChild(button1El);
    divEl.appendChild(button2El);

    // append the div element to the question container (main container for quiz componenets)
    questionContainer.appendChild(divEl);

    // Event listener for 'go back' button, refreshes the web page.
    button1El.addEventListener("click", function(){
        // page refresh
        location.reload();
        return false;
    });

    // Event listener for clear highscore button
    button2El.addEventListener("click", function(){
        // get all highscore elements and store in variable
        var highscoreArr = questionContainer.querySelectorAll("#highscores");

        // loop through each highscore element in the highscoreArr and remove the corresponding HTML from page
        for (var i=0; i<highscoreArr.length; i++) {
            highscoreArr[i].remove();
        }
        // remove all stored scores and initials from local storage
        localStorage.removeItem("score");
    });

};

// Event listener for view highscore
viewHighscore.addEventListener("click", function(){
    loadScores();
    if (timer===75) {
        removeStartPage();
    } else {
        clearQuestion();
        answerResponse.remove();
    }
    highscore();
});

// display the quiz finish page
var finishQuiz = function() {
    // clear countdown interval and get remaining time left as user score
    finishQuiz = true;
    score = stopCountdown();

    var quizFinishDiv = document.createElement("div");
    var quizFinishText = document.createElement("p");
    var quizFinishInput = document.createElement("input");
    var quizFinishLabel = document.createElement("label");
    var quizFinishSubmit = document.createElement("input");
    var highscoreForm = document.createElement("form");


    questionEl.innerText = "All done!"

    highscoreForm.setAttribute("id", "quiz-form");
    quizFinishDiv.setAttribute("class", "left-flex");

    quizFinishInput.setAttribute("type", "text");
    quizFinishInput.setAttribute("id", "high-score");
    quizFinishInput.setAttribute("class", "m-right");

    quizFinishSubmit.setAttribute("type", "submit");
    quizFinishSubmit.setAttribute("class", "submit-button");
    quizFinishSubmit.setAttribute("id", "highscore");
    
    quizFinishLabel.setAttribute("for", "high-score");
    quizFinishLabel.setAttribute("class", "m-right");

    quizFinishText.setAttribute("class", "text-left");
    quizFinishText.innerText = "Your final score is " + score;
    quizFinishLabel.innerText = "Enter Initials: ";


    questionContainer.appendChild(quizFinishText);
    quizFinishDiv.appendChild(quizFinishLabel);
    quizFinishDiv.appendChild(quizFinishInput);
    quizFinishDiv.appendChild(quizFinishSubmit);

    highscoreForm.appendChild(quizFinishDiv);
    
    questionContainer.appendChild(highscoreForm);
    clearQuestion();

    
    var highscoreForm = document.getElementById("highscore");

    highscoreForm.addEventListener("click", function(event){
        event.preventDefault();
        var userInitals = quizFinishInput.value;

        var userObj = { 
            initials: userInitals,
            score: score
        };

        loadScores();
        users.push(userObj);
        localStorage.setItem("score",JSON.stringify(users));

        // remove unneeded elements
        quizFinishText.remove();
        answerResponse.remove();
        quizFinishDiv.remove();
        highscore();
    }); 
}

// listen for user interaction with an answer button: when they (select an answer)
var selectAnswer = function(event) {

    if (currentQuestion === 0) {
        answerResponse.setAttribute("class", "response");
        questionContainer.appendChild(answerResponse);
    }

    // store element that user clicks
    var userChoice = event.target;

    // Get the question correct object attribute
    var isCorrect = userChoice.dataset.correct;
    
    // If correct, alert user correct. If not, remove 10 sec from timer and alert user wrong
    if (isCorrect === "true") {
        answerResponse.innerText = "Correct!";
        numPoints += 10;
    } else {
        timer = timer - 10;
        answerResponse.innerText = "Wrong!";    
    }


    if (currentQuestion + 1 == quizQuestions.length) {
        // call highscore function
        finishQuiz();
    } else {
        // Increment question counter to select next question object.
        currentQuestion++;

        // clear current question from screen.
        clearQuestion();

        // display the next question
        displayNextQuestion();
    }
};

var displayQuestion = function(questionObj) {
    questionEl.setAttribute("class", "container");
    questionEl.innerText = questionObj.question;

    
    // Loop through each answer in the question and create a button whose text value is the answer
    for (var i=0; i<questionObj.answers.length; i++) {
        // create a button for each answer in a question.
        var button = document.createElement("button"); 
        button.setAttribute("id", "button");
        button.setAttribute("class", "answers");
        button.innerText = (i+1) + ". " + questionObj.answers[i].text;
        button.setAttribute("data-correct", questionObj.answers[i].correct);
        buttonContainer.appendChild(button); 

        button.addEventListener("click", selectAnswer);
    }
};

var loadScores = function() {
    var savedScores = localStorage.getItem("score");
    savedScores = JSON.parse(savedScores);

    if (savedScores === null) {
        return true;
    } else {
        for (var i=0; i<savedScores.length; i++) {
            users.push(savedScores[i]);
        }
    }
};

var displayNextQuestion = function () {
    displayQuestion(quizQuestions[currentQuestion]);
};

var startQuiz = function() {
    // Start Countdown
    countdown();

    currentQuestion = 0;
    
    removeStartPage();

    displayQuestion(quizQuestions[currentQuestion]);
};


// Event listener for start quiz button at main page
startQuizButton.addEventListener("click", startQuiz);