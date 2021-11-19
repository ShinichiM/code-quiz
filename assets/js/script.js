var quizContainerEl = document.getElementById("quiz-container");
var timer = 60;

var test = function(event) {
    var target = event.target;
    console.log("testing");
    console.log(target);
}

var testfunction = function() {
    var divEl = document.getElementById("timer");
    if (timer > 0) {
        divEl.value = timer;
        console.log(timer); 
        timer--;
    } else {
        return false;
    }
};

// var setTimer = setInterval(testfunction, 1000);

// setTimer;

var setQuestions = function() {
    var divEl = document.getElementById("questions");
    console.log(divEl);
    var h1El = divEl.querySelector("#test1");
    console.log(h1El);
    var pEl = divEl.querySelector("#test2");

    h1El.innerText = "Question 1";
    pEl.innerText = "Multiple Choice below";
}
quizContainerEl.addEventListener("click", setQuestions);