const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const clearButton = document.getElementById('clear-btn');
const equalsButton = document.getElementById('equals-btn');

let lastOperator = '';
let displayBottom = document.querySelector('#display-bottom');
let displayTop = document.querySelector('#display-top');
let displayMiddle = document.querySelector('#display-middle');

numberButtons.forEach(button =>
    button.addEventListener('click', () => {
        if (displayBottom.textContent === '0') {
            resetDisplay();
        }    
        displayBottom.textContent += button.textContent;
    }
));

clearButton.addEventListener('click', () => {
    displayBottom.textContent = '0';
    displayTop.textContent = '';
    displayMiddle.textContent = '';
});

operatorButtons.forEach(button => 
    button.addEventListener('click', () => {
        
        if (displayTop.textContent === '') {
            displayTop.textContent = displayBottom.textContent;
            displayBottom.textContent = '';
            lastOperator = button.textContent;
            displayMiddle.textContent = button.textContent;
        }
        else {
            displayTop.textContent = operate(lastOperator, displayTop.textContent, displayBottom.textContent);
            displayBottom.textContent = '';
            lastOperator = button.textContent;
            displayMiddle.textContent = button.textContent;
        }
    }));


equalsButton.addEventListener('click', () => {
    displayBottom.textContent = operate(lastOperator, displayTop.textContent, displayBottom.textContent);
    displayTop.textContent = '';
    displayMiddle.textContent = '';
});

function resetDisplay() {
    displayBottom.textContent = ''
};

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if (b === 0) {
        alert("You can't divide by 0!");
    }
    return a / b;

};

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            if (b === 0) return null;
            else return divide(a, b);
    }
};




