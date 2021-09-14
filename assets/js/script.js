document.addEventListener("DOMContentLoaded", () =>{
    const startBtn = document.getElementById("startBtn");
    const quizContainer = document.getElementById("question-section");
    const displayScore = document.getElementById("result-section");
    const buttonContainer = document.getElementById("button-section");
    const questions = [];
    /**
     * When user press the start button
     * the function will generate the welcome msg with username,
     * remove the input tag and start button,
     * then begin a new quiz
    */
    startBtn.addEventListener("click", handleWelcome);
    function handleWelcome (){
        let username = document.getElementById("username");
        let welcomeMsg = document.getElementById("wel-msg");
        welcomeMsg.innerHTML = `Nice to meet you, ${username.value}<br> now try answer all the questions!`;
        document.getElementById("username").remove();
        document.getElementById("startBtn").remove();
        startQuiz();
    }
    /**
     * When new quiz begin, generate a new question array
     * create a new question and answer tag with first question,
     * if the question is last question, then show the sbumit button,
     * if user press the button, new question will replace the current content
    */
    function startQuiz(){
        //sort the questions and use index 0-4 for a new quiz
        questions.sort(()=> Math.random() - 0.5);
        //create a new tag and append to question section
        let firstQuestion = document.createElement("div");
        let buttons = document.createElement("button");
        firstQuestion.setAttribute("id", "question");
        buttons.innerHTML = "NEXT";
        //append all the text to question section
        quizContainer.appendChild(firstQuestion);
        //append all the button to button section
        buttonContainer.appendChild(buttons);
        //call showQuestion to display a new question
        showQuestion(0);
    }
    /**
     * take a integer and the question array as argument,
     * and replace the new question and answer to the current contents
    */
    function showQuestion(current){
        //set the new current question value
        
    }
    /**
     * Check the answer and return the Final score
     */
    function checkAnswer(){

    }
    /**
     * When press the next question button
     * showQuestion() will be call
     * and current
    */
   function nextQuestion(){

   }
});