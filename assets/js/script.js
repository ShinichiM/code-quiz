// Erase or delete contents of the current page and then call function to create the new page again.

var startQuizEl = document.getElementById("start-quiz");
var timer = 60;
var quizQuestions = [
    {question: "Commonly used data types DO NOT include",
    choice: ["Strings","Booleans","Arrays", "Alerts"],
    answer: "Alerts"},
    {question: "How many apples does the grocery store have",
    choice: ["What are apples", "17", "No", "Why fruits"],
    answer: "No"}
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

var rightAnswer = function() {

    return (10);
};

var wrongAnswer = function() {

    return (-20);
};

var answerChosen = function(event) {
    var button = event.target;
    button.dataset.clicked = "true";
};

var 

var displayQuestion = function(questionObj, h1Element, divElement) {
    h1Element.innerText = questionObj.question; 

    var choices = questionObj.choice;

    for (var i=0; i<choices.length; i++) {
        var holdEl = document.createElement("button");
        holdEl.setAttribute("id", "button");
        holdEl.setAttribute("data-clicked", "false");
        holdEl.innerText = choices[i];
        divElement.appendChild(holdEl);
    }
    
    var selected = document.querySelectorAll("#button");

    for (var entry of selected.entries()) {
        console.log(entry[1].dataset.clicked);
    }

    // console.log(selected.values);
    // add event listener to view if user chose option;
    var answer = divElement.addEventListener("click",answerChosen);
};

var startQuestions = function() {
    setInterval(countdown, 1000);
    var divEl = document.getElementById("questions");
    var h1El = divEl.querySelector("#test1");
    // p1E1 can only exist here and not in createMultiple choice... Why?
    var p1E1 = document.getElementById("test2");
    var buttonEl = divEl.querySelector("#start-quiz");

    p1E1.remove();
    buttonEl.remove();

    for (var i=0; i < quizQuestions.length; i++) {
        displayQuestion(quizQuestions[i], h1El, divEl);
        // createMultipleChoice(quizQuestions[i], divEl);
        // while ()
    }
};

 // How can we control displaying questions to user? Other than looping..
 // Do we have to set a timeout? 
startQuizEl.addEventListener("click", startQuestions);

// will need to addEventListener() to button click.


// loop through object containing question, choices, and answers.
// for each question, wait until user clicks on an answer
// then tell them if they are correct or wrong
// if wrong deduct time.

// Set a callback function for each new question page.. 
// ex:      
// secondFunction() {
//     firstFunction(function() {

//     });
// };