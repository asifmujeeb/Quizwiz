$(document).ready(function () {
    // hovered effect to the submit button.
    $("#submit").mouseenter(function () {
        $(this).css({ "color": "#90ccc1" })
    });
    $("#submit").mouseout(function () {
        $(this).css({ "color": "#fff" })
    });
});

// test functionalities.
const testData = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: [
            "Script",
            "JavaScript",
            "Scripting",
            "Js",
        ],
        correct: "Script",
    },
    {
        question: "How do you write (Hello World) in an alert box?",
        options: [
            "AlertBox",
            "MsgBox",
            "Msg",
            "Alert",
        ],
        correct: "Alert",
    },
    {
        question: "How do you create a function in JavaScript?",
        options: [
            "Function== function()",
            "Function = myfunction()",
            "Function:myfunction()",
            "Function myfunction()",
        ],
        correct: "Function myfunction()",
    },
    {
        question: "How do you call a function named (myFunction)?",
        options: [
            "Pick myfunction()",
            "Myfunction()",
            "Call function myfunction()",
            "Call myfunction()",
        ],
        correct: "Myfunction()",
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheet",
            "Computer Style sheet",
            "Colorful style Sheet",
            "creative style sheet",
        ],
        correct: "Cascading Style Sheet",
    },
    {
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        options: [
            "In the head",
            "In the body",
            "In the nav",
            "in the script",
        ],
        correct: "In the head",
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: [
            "Style",
            "Script",
            "Css",
            "jquery",
        ],
        correct: "Style",
    },
    {
        question: "Which property is used to change the background color?",
        options: [
            "Background Color",
            "Bg color",
            "Color",
            "Border-color",
        ],
        correct: "Background Color",
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: [
            "Color",
            "Background",
            "Bg color",
            "Background color",
        ],
        correct: "Color",
    },
    {
        question: "Which CSS property controls the text size?",
        options: [
            "Text-Style",
            "Font-size",
            "Font-weight",
            "Font-style",
        ],
        correct: "Font-size",
    },
];

let currntTest = 0;
let scores = 0;
let countDown;

const testTimer = document.querySelector("#timer");
const testQtn = document.querySelector("#test_question");
const testContent = document.querySelector("#test_knowledge");
const submtBtn = document.querySelector("#submit");

function loadtest() {
    clearInterval(countDown);
    startTimer();

    const currentTestData = testData[currntTest];
    testQtn.innerText = currentTestData.question;

    const options = currentTestData.options.map((option, index) => {
        return `
        <li>
          <input type="radio" name="answer" id="option${index}" class="answer">
          <label for="option${index}">${option}</label>
        </li>
      `;
    });

    testContent.querySelector(".options").innerHTML = options.join("");
}

function startTimer() {
    let time = 30;
    testTimer.textContent = time;

    countDown = setInterval(() => {
        time--;
        testTimer.textContent = time;
        if (time <= 0) {
            clearInterval(countDown);
            nextQuestion();
        }
    }, 1000);
}

function selectAnswer() {
    const answers = document.querySelectorAll(".answer");
    let selectedAnswer = null;
    answers.forEach((answer) => {
        if (answer.checked) {
            selectedAnswer = answer.nextElementSibling.textContent;
        }
    });

    return selectedAnswer;
}
function nextQuestion() {
    const selectedAnswer = selectAnswer();

    if (selectedAnswer) {
        if (selectedAnswer === testData[currntTest].correct) {
            scores++;
        }
    }

    currntTest++;
    if (currntTest < testData.length) {
        loadtest();
    } else {
        testContent.innerHTML = `
        <h2>You scored ${scores} out of ${testData.length} questions.</h2>
        <button id="resetButton" onclick="location.reload()">Reset</button>
      `;
    }
}

submtBtn.addEventListener("click", nextQuestion);
loadtest();
