//add event listener to let the script run after the html loaded
document.addEventListener("DOMContentLoaded", function() {
    //questions will be use
    const questions = [
        {
            question:"What is the Human starting zone?",
            answers: {
                A:"Elwynn Forest",
                B:"Dun Morough",
                C:"Kul Tiras",
                D:"Gilneas"
            },
            correctAnswer:"A"
        },
        {
            question:"Name the Horde race",
            answers: {
                A:"Draenei",
                B:"Human",
                C:"Worgen",
                D:"Nightborne"
            },
            correctAnswer:"D"
        },
        {
            question:"What 2 Classes are available for EVERY race?",
            answers: {
                A:"Priest & Mage",
                B:"Shaman & Warlock",
                C:"Hunter & Warrior",
                D:"Paladin & Death Knight"
            },
            correctAnswer:"C"
        },
        {
            question:"What is the Orc starting zone?",
            answers: {
                A:"Elwynn Forest",
                B:"Darkshore",
                C:"Durotar",
                D:"Western Plaguelands"
            },
            correctAnswer:"C"
        },
        {
            question:"How many continents are on Azeroth?",
            answers: {
                A:"Seven",
                B:"Six",
                C:"One Dozen",
                D:"Two"
            },
            correctAnswer:"A"
        },
        {
            question:"Name the Alliance race",
            answers: {
                A:"Tauren",
                B:"Gnome",
                C:"Orc",
                D:"Blood Elf"
            },
            correctAnswer:"B"
        },
        {
            question:"Which expansion was released most recently?",
            answers: {
                A:"Wrath of the Lich King",
                B:"Legion",
                C:"Battle for Azeroth",
                D:"Shadowlands"
            },
            correctAnswer:"D"
        },
        {
            question:"What category of Armor do Druids wear?",
            answers: {
                A:"Cloth",
                B:"Mail",
                C:"Leather",
                D:"Plate"
            },
            correctAnswer:"C"
        },
        {
            question:"Which of these Alliance capitols was recently conquered by the Horde?",
            answers: {
                A:"Stormwind",
                B:"Darnassus",
                C:"Ironforge",
                D:"Exodar"
            },
            correctAnswer:"B"
        },
        {
            question:"Who is the current King of Stormwind City?",
            answers: {
                A:"Jaina Proudmoore",
                B:"Anduin Wrynn",
                C:"Varian Wrynn",
                D:"Some hobo from Westfall"
            },
            correctAnswer:"B"
        },
        {
            question:"Which class can summon Demons to fight?",
            answers: {
                A:"Paladin",
                B:"Priest",
                C:"Mage",
                D:"Warlock"
            },
            correctAnswer:"D"
        },
        {
            question:"Select the class that DO NOT use shadow magic",
            answers: {
                A:"Priest",
                B:"Death Knight",
                C:"Paladin",
                D:"Warlock"
            },
            correctAnswer:"C"
        },
        {
            question:"What level do you start establishing a garrison on Draenor before 9.0 expansion?",
            answers: {
                A:"Level 20",
                B:"Level 90",
                C:"Level 120",
                D:"Level 10"
            },
            correctAnswer:"B"
        },
        {
            question:"The Darkmoon Faire move to it's own island and currency in which WoW expansion?",
            answers: {
                A:"Legion",
                B:"Catacalysm",
                C:"Shadowlands",
                D:"Battle for Azeroth"
            },
            correctAnswer:"B"
        },
        {
            question:"Entering The Dark Portal will take you to which area other than Azeroth?",
            answers: {
                A:"Outland",
                B:"Draenor",
                C:"Pandaria",
                D:"Northrend"
            },
            correctAnswer:"A"
        },
        {
            question:"At what level do Panderens declare their allegiance to the Horde or Alliance?",
            answers: {
                A:"Pandarens can be ONLY Horde",
                B:"Pandarens declare their allegiance at Level 10",
                C:"Pandarens declare their allegiance at Level 100",
                D:"Pandarens can be ONLY Alliance"
            },
            correctAnswer:"B"
        },
        {
            question:"What is the optimal armor for Warriors?",
            answers: {
                A:"Plate",
                B:"Leather",
                C:"Mail",
                D:"Cloth"
            },
            correctAnswer:"C"
        },
        {
            question:"When IS the Darkmoon faire?",
            answers: {
                A:"Every weekend",
                B:"Every weekday",
                C:"Once every year",
                D:"The first weekend of every month"
            },
            correctAnswer:"D"
        }
    ];
    //define selectors
    const startBtn = document.getElementById("startBtn");
    const quizContainer = document.getElementById("question-section");
    const resultContainer = document.getElementById("result-section");
    const welcomeContainer = document.getElementById("welcome-section");
    
    //add event listener to start button and a keydown to start the game
    startBtn.addEventListener("click", handleWelcome);
    document.addEventListener("keydown", enterKey);
    //keydown event
    //enter for start a new game
    function enterKey (event){
        if(event.key === "Enter"){
            handleWelcome();
        }
    }
    //enter for restart
    function retryKey (event){
        if(event.key === "Enter"){
            tryAgain();
        }
    }
    //press a,b,c,d(uppper or lower case) to press answer
    function answerKey (event){
        switch(event.key){
            case 'a':
            case 'A':
                nextQuestion('A');
                break;
            case 'b':
            case 'B':
                nextQuestion('B');
                break;
            case 'c':
            case 'C':
                nextQuestion('C');
                break;
            case 'd':
            case 'D':
                nextQuestion('D');
                break;
            default:
                return;
        }
    }
    /**
     * When user press the start button or press enter
     * the function will generate the welcome msg with username,
     * remove the input tag and start button,
     * then display the welcome msg and begin a new quiz
    */
    function handleWelcome (){
        let username = document.getElementById("username");
        if(username.value === ""){
            alert("Please enter your name!");
            return;
        }
        if(username.value.length >= 10){
            alert("Please enter a shorter name.");
            return;
        }
        let helloUser = document.createElement("div");
        helloUser.id = "hello-user";
        helloUser.innerHTML = `Nice to meet you, ${username.value}. Now try answer all the questions!`;
        document.getElementById("username").remove();
        document.getElementById("wel-msg").remove();
        document.getElementById("startBtn").remove();
        document.removeEventListener("keydown", enterKey);
        welcomeContainer.appendChild(helloUser);
        startQuiz();
    }
    /**
     * When new quiz begin, sort the question array to randomize the question order
     * then create the question and answer tag to store the new question
     * when elements append, then call the showQuestion function
    */
    function startQuiz(){
        //sort the questions and use index 0-4 for a new quiz
        questions.sort(()=> Math.random() - 0.5);
        //create two new tag for question section and button section
        let questionDisplay = document.createElement("div");
        let answersDisplay = document.createElement("div");
        questionDisplay.id =  "question";
        answersDisplay.id = "answers";
        //new tag with result section
        resultContainer.innerHTML = `<p>Your score: <span id="score">0</span></p>
        <p>Question <span id="currentQuestion">1</span> of <span id="totalQuest">5</span></p>`;
        //append all the text to question section
        quizContainer.appendChild(questionDisplay);
        quizContainer.appendChild(answersDisplay);
        //add a keydown event to input ansers
        document.addEventListener("keydown", answerKey);
        //call showQuestion to display a new question
        showQuestion(1);
    }
    /**
     * Take a integer of current question as argument,
     * and replace the new question and answer to the current contents
    */
    function showQuestion(current){
        let questionOutput = document.getElementById("question");
        let answersOutput = document.getElementById("answers");
        let currentAnswers = [];
        //set the new current question value
        questionOutput.innerHTML = `<p id="current-question">${questions[current - 1].question}<p/>`;
        //use while loop to clear old answers and their listeners
        while(answersOutput.firstChild){
            answersOutput.removeChild(answersOutput.firstChild);
        }
        //use for loop to generate answers html
        for(let option in questions[current - 1].answers){
            currentAnswers.push(
                `<button class="answer" id="${option}">
                  ${questions[current - 1].answers[option]}
                </button>`
              );
        }
        //set the new answers value
        answersOutput.innerHTML = currentAnswers.join("");
        //use another for loop add event listener (use for/in will loop one more time)
        let ansBtn = document.getElementsByClassName("answer");
        for(let i=0; i<ansBtn.length; i++){
            ansBtn[i].addEventListener("click", () => {nextQuestion(ansBtn[i].id);});
        }
    }
    /**
     * Check the answer and return the Final score
     */
    function checkAnswer(current, select){
        let score = parseInt(document.getElementById("score").innerHTML);
        //check the answer correct or not and return a new score, other ans will return false
        if(select === questions[current - 1].correctAnswer){
            score++;
            document.getElementById("score").innerHTML = score;
            return true;
        } else if(select !== questions[current - 1].correctAnswer){
            document.getElementById("score").innerHTML = score;
            return true;
        } else {
            return false;
        }
    }
    /**
     * Check the result valid or not
     * If valid then check if the current question is last question or not
     * if it is then call the submitQuiz function
     * if not the last question then call showQuestion function to display next question
    */
   function nextQuestion(select){
       let current = parseInt(document.getElementById("currentQuestion").innerHTML);
       let total = parseInt(document.getElementById("totalQuest").innerHTML);
       let result  = checkAnswer(current, select);
       if(result === false){
           return;
       } else {
        if(current === total){
            submitQuiz();
            return;
        }
        current++;
        document.getElementById("currentQuestion").innerHTML = current;
        showQuestion(current);
       }
   }
   /**
    * Check the finalScore display on the page and take it as variable
    * Then remove all the text on page and replace with the result message
    * and the retry button
   */
   function submitQuiz(){
       //define the current score as final score
       let finalScore = parseInt(document.getElementById("score").innerHTML);
       let resultMsg = "";
       //remove the answerKey listener
       document.removeEventListener("keydown", answerKey);
       //clear the question and result section
       while(quizContainer.firstChild){
           quizContainer.removeChild(quizContainer.firstChild);
       }
       while(resultContainer.firstChild){
           resultContainer.removeChild(resultContainer.firstChild);
       }
        while(welcomeContainer.firstChild){
            welcomeContainer.removeChild(welcomeContainer.firstChild);
        }
       //a switch to display different message depend on the score
       switch(finalScore){
           case 0:
               resultMsg = "You got all the wrong answers. Maybe it is some special talent?";
               break;
           case 1:
               resultMsg = "You only got one correct, <br>Seems that you're not interested in WoW.<br>";
               break;
           case 2:
               resultMsg = "You got two question correct! <br>Not bad at all!<br>";
               break;
           case 3:
               resultMsg = "You got three question correct! <br>Great!<br>";
               break;
           case 4:
               resultMsg = "You got it all right but one! <br>Brilliant!<br>";
               break;
           case 5:
               resultMsg = "Congratulations, <br>you got it all!<br>";
               break;
           default:
               resultMsg = "Something worng!";
       }
       //display the final result and a retry button
       resultContainer.innerHTML = `<div id="end-result">Your final score is ${finalScore}<br><br>` + resultMsg + "<br>Try again?<br><button id='retry'>RETRY</button></div>";
       document.getElementById("retry").addEventListener('click', tryAgain);
       document.addEventListener("keydown", retryKey);
   }
   /**
    * remove all the result elements and write back some html make the page as the beginning of the game
   */
   function tryAgain(){
       //clear all result contents
        while(resultContainer.firstChild){
            resultContainer.removeChild(resultContainer.firstChild);
        }
       //remove the retry key listener
       document.removeEventListener("keydown", retryKey);
       //display the welcome message and input column
       welcomeContainer.innerHTML = 
       `<h2 id="wel-msg" class="welcome"><label for="username">Enter your name and begin!</label></h2>
       <input type="text" name="username" id="username" class="welcome" placeholder="Enter your name here">
       <button id="startBtn" class="welcome">START</button>`;
       document.getElementById("startBtn").addEventListener("click", handleWelcome);
       document.addEventListener("keydown", enterKey);
   }
});