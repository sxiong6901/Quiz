// Gathering HTML elements for manipulation
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startBtn = document.getElementById("startbtn");
var mainEl = document.getElementById("main");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var replay = document.getElementById("restart")


var quizQuestions = [{
    question: "Which is greater than 4?",
    choiceA: "5",
    choiceB: "-5",
    choiceC: "-1/2",
    choiceD: "-12",
    correctAnswer: "a"},
  {
    question: "Which number is the smallest?",
    choiceA: "-1",
    choiceB: "-1/2",
    choiceC: "0",
    choiceD: "3",
    correctAnswer: "a"},
{
    question: "Combine terms: 12a + 26b -4b – 16a.",
    choiceA: "4a + 22b",
    choiceB: "-28a + 30b",
    choiceC: "-4a + 22b",
    choiceD: "28a + 30b",
    correctAnswer: "c"},
   {
    question: "Simplify: (4 – 5) – (13 – 18 + 2)",
    choiceA: " -1",
    choiceB: "-2",
    choiceC: "1",
    choiceD: "2",
    correctAnswer: "d"},
    {
    question: "What is |-26|?",
    choiceA: "-26",
    choiceB: "26",
    choiceC: "Infinity",
    choiceD: "Undefined",
    correctAnswer: "b"},  
    ];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){
    gameoverDiv.style.display = "none";

    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;

};

startBtn.addEventListener("click",startQuiz);

function startQuiz(){
    gameoverDiv.style.display = "none";
    mainEl.style.display = "none";
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Timer: " + timeLeft;
        
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
          alert ("Your time is up!")

        }
      }, 1000);
    quizBody.style.display = "block";
}


function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}


submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Please Enter your Name");
        return false;
    }else{
        var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : ((score/quizQuestions.length) * 100 + "%") 
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedScores.push(currentHighscore);
        localStorage.setItem("savedScores", JSON.stringify(savedScores));
        generateHighscores();

    }
    
});

function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedScores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function showHighscore(){
    mainEl.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}


function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        currentQuestionIndex++;
        generateQuizQuestion();

    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        currentQuestionIndex++;
        generateQuizQuestion();
        timeLeft -=10; 

    }else{
        showScore();
    }
}




