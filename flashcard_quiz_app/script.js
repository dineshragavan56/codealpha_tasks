const defaultFlashcards = [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], correctIndex: 0 },
    { question: "Which language is used for styling web pages?", options: ["HTML", "JQuery", "CSS", "XML"], correctIndex: 2 },
    { question: "What does UI stand for?", options: ["User Identity", "User Interface", "Universal Integration", "Unified Index"], correctIndex: 1 },
    { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets", "Creative Style Sheets"], correctIndex: 1 },
    { question: "Which of these is a JavaScript framework?", options: ["Django", "React", "Laravel", "Flask"], correctIndex: 1 },
    { question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Programming Integration", "Automated Program Interaction", "Application Process Integration"], correctIndex: 0 },
    { question: "Which symbol is used for comments in JavaScript?", options: ["//", "<!--", "/*", "#"], correctIndex: 0 },
    { question: "What does SQL stand for?", options: ["Structured Question Language", "Strong Query Language", "Structured Query Language", "Simple Query Language"], correctIndex: 2 },
    { question: "Which HTML tag is used to define an internal style sheet?", options: ["<css>", "<script>", "<style>", "<link>"], correctIndex: 2 },
    { question: "How do you write 'Hello World' in an alert box?", options: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"], correctIndex: 3 },
    { question: "Which property is used to change the background color?", options: ["color", "bgcolor", "background-color", "bg-color"], correctIndex: 2 },
    { question: "How to write an IF statement in JavaScript?", options: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"], correctIndex: 2 },
    { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Display Object Management"], correctIndex: 0 },
    { question: "Which event occurs when the user clicks on an HTML element?", options: ["onchange", "onclick", "onmouseclick", "onmouseover"], correctIndex: 1 },
    { question: "How do you declare a JavaScript variable?", options: ["v carName;", "variable carName;", "var carName;", "def carName;"], correctIndex: 2 },
    { question: "Which operator is used to assign a value to a variable?", options: ["*", "-", "=", "x"], correctIndex: 2 },
    { question: "What is the correct HTML for creating a hyperlink?", options: ["<a url='http://www.google.com'>Google</a>", "<a name='http://www.google.com'>Google</a>", "<a href='http://www.google.com'>Google</a>", "<a>http://www.google.com</a>"], correctIndex: 2 },
    { question: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], correctIndex: 2 },
    { question: "How do you select an element with id 'demo' in CSS?", options: [".demo", "#demo", "demo", "*demo"], correctIndex: 1 },
    { question: "How do you select elements with class name 'test'?", options: ["#test", ".test", "test", "*test"], correctIndex: 1 },
    { question: "What is the default value of the position property?", options: ["relative", "fixed", "absolute", "static"], correctIndex: 3 },
    { question: "Which HTML tag is used to define a list item?", options: ["<li>", "<ul>", "<ol>", "<list>"], correctIndex: 0 },
    { question: "In HTML, onblur and onfocus are:", options: ["HTML elements", "Event attributes", "Style attributes", "Style tags"], correctIndex: 1 },
    { question: "What does JSON stand for?", options: ["JavaScript Object Notation", "Java Syntax Object Network", "JavaScript Online Notation", "Java Standard Output Network"], correctIndex: 0 },
    { question: "Which method is used to parse a JSON string into an object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.read()"], correctIndex: 1 },
    { question: "What is the correct way to write a JavaScript array?", options: ["var colors = (1:'red', 2:'green')", "var colors = 'red', 'green'", "var colors = ['red', 'green']", "var colors = {red, green}"], correctIndex: 2 },
    { question: "How do you round the number 7.25 to the nearest integer?", options: ["rnd(7.25)", "Math.rnd(7.25)", "round(7.25)", "Math.round(7.25)"], correctIndex: 3 },
    { question: "How do you find the number with the highest value of x and y?", options: ["ceil(x, y)", "Math.ceil(x, y)", "top(x, y)", "Math.max(x, y)"], correctIndex: 3 },
    { question: "JavaScript is the same as Java.", options: ["True", "False", "Partially True", "Depends on the version"], correctIndex: 1 },
    { question: "Which property returns the length of a string in JavaScript?", options: ["length", "size", "index", "count"], correctIndex: 0 }
];

let flashcards = JSON.parse(localStorage.getItem('flashcards')) || defaultFlashcards;
let currentCardIndex = 0;
let isAnswerChecked = false;

const tabQuiz = document.getElementById('tab-quiz');
const tabManage = document.getElementById('tab-manage');
const quizSection = document.getElementById('quiz-section');
const manageSection = document.getElementById('manage-section');

const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const cardCounter = document.getElementById('card-counter');
const flashcardDiv = document.getElementById('flashcard');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');

const addCardForm = document.getElementById('add-card-form');
const flashcardList = document.getElementById('flashcard-list');

function init() {
    renderCard();
    renderManageList();
}

function renderCard() {
    flashcardDiv.className = 'flashcard'; 
    isAnswerChecked = false;

    if (flashcards.length === 0) {
        questionText.textContent = "No flashcards available. Please add some!";
        optionsGrid.innerHTML = "";
        cardCounter.textContent = "0 / 0";
        return;
    }

    const card = flashcards[currentCardIndex];
    questionText.textContent = card.question;
    
    cardCounter.textContent = `${currentCardIndex + 1} / ${flashcards.length}`;

    optionsGrid.innerHTML = "";

    card.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        
        button.onclick = () => checkAnswer(index, button);
        
        optionsGrid.appendChild(button);
    });
}

function checkAnswer(selectedIndex, clickedButton) {
    if (isAnswerChecked) return;
    isAnswerChecked = true;

    const card = flashcards[currentCardIndex];
    const isCorrect = (selectedIndex === card.correctIndex);

    if (isCorrect) {
        flashcardDiv.classList.add('correct');
        clickedButton.classList.add('selected-correct');
    } else {
        flashcardDiv.classList.add('wrong');
        clickedButton.classList.add('selected-wrong');
        
        const buttons = optionsGrid.querySelectorAll('.option-btn');
        buttons[card.correctIndex].classList.add('selected-correct');
    }

    setTimeout(() => {
        nextCard();
    }, 1500);
}

function nextCard() {
    if (flashcards.length === 0) return;
    
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    renderCard();
}

function prevCard() {
    if (flashcards.length === 0) return;

    currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
    renderCard();
}

function renderManageList() {
    flashcardList.innerHTML = "";
    
    if (flashcards.length === 0) {
        flashcardList.innerHTML = "<li>No flashcards added yet.</li>";
        return;
    }

    flashcards.forEach((card, index) => {
        const li = document.createElement('li');
        
        const textSpan = document.createElement('span');
        textSpan.textContent = `${index + 1}. ${card.question}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteCard(index);

        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        flashcardList.appendChild(li);
    });
}

addCardForm.onsubmit = function(event) {
    event.preventDefault();

    const question = document.getElementById('new-question').value;
    const opt0 = document.getElementById('opt-0').value;
    const opt1 = document.getElementById('opt-1').value;
    const opt2 = document.getElementById('opt-2').value;
    const opt3 = document.getElementById('opt-3').value;
    const correctIndex = parseInt(document.getElementById('correct-select').value);

    const newCard = {
        question: question,
        options: [opt0, opt1, opt2, opt3],
        correctIndex: correctIndex
    };

    flashcards.push(newCard);
    
    saveData();
    renderManageList();
    addCardForm.reset();
    
    if (flashcards.length === 1) {
        currentCardIndex = 0;
        renderCard();
    }
};

function deleteCard(index) {
    flashcards.splice(index, 1);
    
    if (currentCardIndex >= flashcards.length) {
        currentCardIndex = Math.max(0, flashcards.length - 1);
    }
    
    saveData();
    renderManageList();
    renderCard();
}

function saveData() {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

tabQuiz.onclick = () => {
    tabQuiz.classList.add('active');
    tabManage.classList.remove('active');
    quizSection.classList.add('active-section');
    quizSection.classList.remove('hidden');
    manageSection.classList.add('hidden');
    manageSection.classList.remove('active-section');
    renderCard();
};

tabManage.onclick = () => {
    tabManage.classList.add('active');
    tabQuiz.classList.remove('active');
    manageSection.classList.add('active-section');
    manageSection.classList.remove('hidden');
    quizSection.classList.add('hidden');
    quizSection.classList.remove('active-section');
};

btnNext.onclick = nextCard;
btnPrev.onclick = prevCard;

init();
