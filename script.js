const questions = [
    {
        question: "Who created Python?",
        answers: [
            {text: "Tim Berners-Lee",correct: false},
            {text: "Håkon Wium Lie",correct: false},
            {text: "Guido Van Rosuum",correct: true},
            {text: "Brendan Eich",correct: false},
        ]
    },
    {
        question: "When was Python released?",
        answers: [
            {text: "jan 20th 1991",correct: false},
            {text: "feb 20th 1990",correct: false},
            {text: "jan 20th 1989",correct: false},
            {text: "feb 20th 1991",correct: true},
        ]
    },
    {
        question: "Which of the following is true for naming variables?",
        answers: [
            {text: "A variable name can start with a number.",correct: false},
            {text: "Variable names can include spaces.",correct: false},
            {text: "Variable names cannot include special characters",correct: false},
            {text: "Variable names are case-sensitive",correct: true},
        ]
    },
    {
        question: "Which of the following is true for rule of identifier?",
        answers: [
            {text: "Identifier can use keyword.",correct: false},
            {text: "Identifier can start with numbers.",correct: false},
            {text: "Identifiers cannot contain white-space",correct: true},
            {text: "Identifers are not case sensitive",correct: false},
        ]
    },
    {
        question: "Which of the following is valid identifier?",
        answers: [
            {text: "1abc",correct: false},
            {text: "a1b2c3",correct: true},
            {text: "1stabc",correct: false},
            {text: "1a2b3c",correct: false},
        ]
    },
    {
        question: "Which of the following is written in CamelSnakeCase?",
        answers: [
            {text: "My_variable_Name",correct: false},
            {text: "my_variable_Name",correct: false},
            {text: "my_variable_name",correct: true},
            {text: "My_Variable_Name",correct: false},
        ]
    },
    {
        question: "Which of the following is written in PascalSnakeCase?",
        answers: [
            {text: "My_variable_Name",correct: false},
            {text: "my_variable_Name",correct: false},
            {text: "my_variable_name",correct: false},
            {text: "My_Variable_Name",correct: true},
        ]
    },
    {
        question: "What is the primary purpose of a garbage collector in programming?",
        answers: [
            {text: "To optimize CPU usage by organizing code",correct: false},
            {text: "To allocate memory dunamically",correct: false},
            {text: "To manage and clean uo unused memory",correct: true},
            {text: "To compile source code into machine code",correct: false},
        ]
    },
    {
        question: "What is the main purpose of '\\r'?",
        answers: [
            {text: "insert a backspace character",correct: false},
            {text: "add a tab space in the text",correct: false},
            {text: "move the cursor to the next line",correct: false},
            {text: "move the cursor to the beginning of current line",correct: true},
        ]
    },
    {
        question: "Which of the following will result in syntax error?",
        answers: [
            {text: "print('Hello,World!')",correct: false},
            {text: "if 5>3 print('Five is greater than three')",correct: true},
            {text: "for i in ranger(5): print(i)",correct: false},
            {text: "x = 10 + 20",correct: false},
        ]
    },
    {
        question: "Which of the following will result in runtime error?",
        answers: [
            {text: "y = 1 / 0",correct: true},
            {text: "for i in ranger(5)",correct: false},
            {text: "x = 5 + 7 print(i)",correct: false},
            {text: "print('Hello,World!')",correct: false},
        ]
    },
    {
        question: "Which of the following will result in Logical error?",
        answers: [
            {text: "result = 5 * (2+3)",correct: false},
            {text: "if x > 0: print('x is positive')",correct: false},
            {text: "total = sum([1,2,3,4])/4",correct: false},
            {text: "average = sum([1,2,3,4])*4",correct: true},
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

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
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
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
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Start the quiz when the page loads
startQuiz();