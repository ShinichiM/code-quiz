Students would like to gauge their progress in any course. The best way we can do this is via a time quiz!

We created a quiz for student's to gauge their understanding of JavaScript as well as their peers.

You can find the deployed application here: https://shinichim.github.io/code-quiz/

Users are welcomed via a start quiz start page, where we can choose to start the quiz or view high scores!

<img width="959" alt="image" src="https://user-images.githubusercontent.com/62361626/143791637-ab19d8e5-4246-4cd5-a303-50c34ef213b7.png">

This application starts with set time that decrements on every wrong answer. The timer is decremented by 10 seconds for each wrong answer.

Questions will be prompted to the user through multiple choice selection shown below.

<img width="958" alt="image" src="https://user-images.githubusercontent.com/62361626/143791721-ee2e2cda-99c8-45d6-ab4b-0fbae1cbd188.png">

At the end of the quiz you can store/save your score with your initials and will save the user intiials and score to local storage.

<img width="959" alt="image" src="https://user-images.githubusercontent.com/62361626/143791758-40d88f04-d76a-42fa-9344-3993a9ba5713.png">

Afterwards, we will load any stored data in local storage and display them to the user according to their score numbers. Score numbers are determined by how many seconds the user has left upon completion.

<img width="958" alt="image" src="https://user-images.githubusercontent.com/62361626/143791800-a0f2782a-21c4-4765-9d1d-8d85e4dfb15d.png">

If the user would like to retry, we can select the 'Go Back' button which will refresh the browser and redirect to the start quiz page. 

If the user would like to clear high scores, we will remove any stored data in local storage and remove scores from the high score page.
