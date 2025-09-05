const questions = [
    {
        question: "which is the largest animal in the world" ,
        answers: [
                {Text : "Shark", correct:false},
                {Text : "Blue Whale", correct:true},
                {Text : "Elephant", correct:false},
                {Text : "Giraffe", correct:false},
        ]
    },
    {
        question: "What is the national animal of India" ,
        answers: [
                {Text : "Peacock", correct:false},
                {Text : "Lion", correct:false},
                {Text : "Tiger", correct:true},
                {Text : "Bear", correct:false},
        ]
    },

     {
        question: "Which is the longest river in India" ,
        answers: [
                {Text : "Brahmaputra", correct:false},
                {Text : "Yamuna", correct:false},
                {Text : "Indus", correct:false},
                {Text : "Ganga", correct:true},
        ]
    },

     {
        question: "How many minutes are there in a full week" ,
        answers: [
                {Text : "10080", correct:true},
                {Text : "7200", correct:false},
                {Text : "12480", correct:false},
                {Text : "14400", correct:false},
        ]
    },

    {
        question: "How many hours are there in a day?" ,
        answers: [
                {Text : "24", correct:true},
                {Text : "48", correct:false},
                {Text : "12", correct:false},
                {Text : "18", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); 
}

function showQuestion(){
    resetState();
   let currentQuestion = questions[currentQuestionIndex];
   let questionNo = currentQuestionIndex + 1;
   questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
   currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer);
   });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerElement.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
     if(currentQuestionIndex<questions.length){
        showQuestion();
     }else{
        showScore();
     }

}

nextButton.addEventListener("click" , () =>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
        // agar current index chhota h to next par nhi jayega. aur agar question khatm ho gya to restart ho jayega.
    }else{
        startQuiz();
    }
})
startQuiz();
