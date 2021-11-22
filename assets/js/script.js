// Erase or delete contents of the current page and then call function to create the new page again.
var startQuizButton = document.getElementById("start-quiz");
var questionContainer = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var currentQuestion;
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
    // Get the p and button elements on page
    var p1E1 = document.getElementById("test2");
    var buttonEl = document.getElementById("start-quiz");

    // Remove start page button and p elements.
    p1E1.remove();
    buttonEl.remove();
}

var clearQuestion = function() {
    buttons = document.querySelectorAll("#button");
    for (var button of buttons) {
        button.remove();
    }
};

var selectAnswer = function(event) {
    var userChoice = event.target;
    var isCorrect = userChoice.dataset.correct;
    
    if (isCorrect === "true") {
        alert("Correct");
    } else {
        alert("false");
    }
    
    currentQuestion++;
    clearQuestion();
    displayNextQuestion();
};

var displayQuestion = function(questionObj) {
    questionEl.innerText = questionObj.question;

    // console.log(questionObj.answers.length);
    for (var i=0; i<questionObj.answers.length; i++) {
        // create a button for each answer in a question.
        var button = document.createElement("button");
        button.setAttribute("id", "button");
        button.innerText = questionObj.answers[i].text;
        questionContainer.appendChild(button); 

        // if the answer is correct, give button attribute of correct = true, else give attribute correct=false;
        if (questionObj.answers[i].correct) {
            button.setAttribute("data-correct", questionObj.answers[i].correct);
        } else {
            button.setAttribute("data-correct", questionObj.answers[i].correct);
        }

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
