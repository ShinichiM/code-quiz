// Erase or delete contents of the current page and then call function to create the new page again.
var startQuizButton = document.getElementById("start-quiz");
var questionContainer = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var currentQuestion;

var answerResponse = document.createElement("div");
questionContainer.appendChild(answerResponse);
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
    ]}
];


var countdown = function() {
    var divEl = document.getElementById("timer");
    if (timer >= 0) {
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


// listen for user interaction with an answer button: when they (select an answer)
var selectAnswer = function(event) {
    answerResponse.setAttribute("class", "right-answer");
    // store element that user clicks
    var userChoice = event.target;

    // Get the question correct object attribute
    var isCorrect = userChoice.dataset.correct;
    
    // If correct, alert user correct. If not, remove 10 sec from timer and alert user wrong
    if (isCorrect === "true") {
        answerResponse.innerText = "Correct!";
    } else {
        timer = timer - 10;
        answerResponse.innerText = "Wrong!";
    }
    
    // Increment question counter to select next question object.
    currentQuestion++;

    // clear current question from screen.
    clearQuestion();

    // display the next question
    displayNextQuestion();
};

var displayQuestion = function(questionObj) {
    questionEl.innerText = questionObj.question;

    // Loop through each answer in the question and create a button whose text value is the answer
    for (var i=0; i<questionObj.answers.length; i++) {
        // create a button for each answer in a question.
        var button = document.createElement("button");
        button.setAttribute("id", "button");
        button.setAttribute("class", "answers");
        button.innerText = questionObj.answers[i].text;
        button.setAttribute("data-correct", questionObj.answers[i].correct)
        questionContainer.appendChild(button); 

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