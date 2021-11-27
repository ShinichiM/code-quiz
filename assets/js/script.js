// Erase or delete contents of the current page and then call function to create the new page again.
var startQuizButton = document.getElementById("start-quiz");
var questionContainer = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var currentQuestion;
var numPoints = 0;

var answerResponse = document.createElement("div");
answerResponse.setAttribute("id", "user-response");
var buttonContainer = document.createElement("div");

buttonContainer.setAttribute("class", "container");
questionContainer.appendChild(buttonContainer);

var users = []
var timer = 60;

var quizQuestions = [
    {question: "Commonly used data types DO NOT include",
    answers: [
        {text: "Strings", correct: false},
        {text: "Booleans", correct: false},
        {text: "Arrays", correct: false},
        {text: "Alerts", correct: true}
    ]},
    {question: "How many apples does the grocery store have",
    answers: [
        {text: "20", correct: false},
        {text: "7", correct: false},
        {text: "No", correct: false},
        {text: "Why Apples", correct: true}
    ]},
    {question: "What is a common looping method in Javascript?",
    answers: [
        {text: "for", correct: true},
        {text: "insert", correct: false},
        {text: "looper", correct: false},
        {text: "within", correct: false}
    ]},
    {question: "What is a common looping method in Javascript?",
    answers: [
        {text: "safdkjelwahfdjs;alkdsajkfl;eawfdsjkr", correct: true},
        {text: "insert", correct: false},
        {text: "looper", correct: false},
        {text: "within", correct: false}
    ]}
];


var countdown = function() {
    var divEl = document.getElementById("timer");
    if (timer >= 0){
        divEl.innerText = "Time: " + timer; 
        timer--;
    } else {
        return false;
    }
};

var removeStartPage = function() {
    // Get the p and button elements on start page
    var p1E1 = document.getElementById("test2");
    var buttonEl = document.getElementById("start-quiz");

    // Remove start page button and p elements.
    p1E1.remove();
    buttonEl.remove();
}

// Clear the previous question's answers from page
var clearQuestion = function() {
    // select all elements with id of button (All answers)
    buttons = document.querySelectorAll("#button");

    // Loop through each button and remove them
    for (var button of buttons) {
        button.remove();
    }
};

// display Highscores
var highscore = function(quizFinishDiv, finishText, userInitials) {
    // localStorage.setItem(userInitials, numPoints);
    questionEl.innerText = "High Scores";
    finishText.remove();
    answerResponse.remove();
    quizFinishDiv.remove();
};

// display quiz finish
var finishQuiz = function() {
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
    quizFinishText.innerText = "Your final score is 22";
    quizFinishLabel.innerText = "Enter Initials: ";


    questionContainer.appendChild(quizFinishText);
    quizFinishDiv.appendChild(quizFinishLabel);
    quizFinishDiv.appendChild(quizFinishInput);
    quizFinishDiv.appendChild(quizFinishSubmit);

    highscoreForm.appendChild(quizFinishDiv);
    
    questionContainer.appendChild(highscoreForm);
    clearQuestion();

    // STORE SCORE IN LOCAL STORAGE
    var test = document.querySelector("input[id='high-score'").value;
    
    var highscoreForm = document.getElementById("highscore");

    highscoreForm.addEventListener("click", function(event){
        event.preventDefault();
        userInitals = quizFinishInput.value;

        var userObj = {
            initials: userInitals,
            score: timer
        };
        users.push(userObj);

        // localStorage.setItem("Points")
        console.log(userInitals + " is it working?");
        highscore(quizFinishDiv, quizFinishText, quizFinishInput.value);
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

var displayNextQuestion = function () {
    displayQuestion(quizQuestions[currentQuestion]);
};

var startQuiz = function() {
    // Start Countdown
    setInterval(countdown, 1000);

    currentQuestion = 0;
    
    removeStartPage();
    displayQuestion(quizQuestions[currentQuestion]);
};

startQuizButton.addEventListener("click", startQuiz);

