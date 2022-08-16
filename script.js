const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const equalsButton = document.getElementById('equals-btn');
const clearButton = document.getElementById('clear-btn');

let lastOperator = '';
let displayTop = document.querySelector('#display-top');
let displayMiddle = document.querySelector('#display-middle');
let displayBottom = document.querySelector('#display-bottom');

numberButtons.forEach(button => {

    button.addEventListener('click', () => {
        if (displayBottom.textContent === '0') {
            resetDisplay();
        }
        displayBottom.textContent += button.textContent;

        if (displayBottom.textContent.length > 16) {
            displayBottom.textContent = displayBottom.textContent.substring(0, 16);
        }
    })
}
);

operatorButtons.forEach(button =>
    button.addEventListener('click', () => {

        if (displayTop.textContent === '') {
            displayTop.textContent = displayBottom.textContent;
            displayBottom.textContent = '';
            lastOperator = button.textContent;
            displayMiddle.textContent = button.textContent;
        }
        else if (displayBottom.textContent !== '') {
            displayMiddle.textContent = button.textContent;
            displayTop.textContent = operate(lastOperator, displayTop.textContent, displayBottom.textContent);
            displayBottom.textContent = '';
            lastOperator = button.textContent;
        }
    }));

equalsButton.addEventListener('click', () => {
    displayBottom.textContent = operate(lastOperator, displayTop.textContent, displayBottom.textContent);
    if (displayBottom.textContent.length > 16) {
        displayBottom.textContent = (Number(displayBottom.textContent)).toPrecision(12);
    }
    displayTop.textContent = '';
    displayMiddle.textContent = '';
});

clearButton.addEventListener('click', () => {
    resetDisplay();
    displayBottom.textContent = '0';
});

function resetDisplay() {
    displayBottom.textContent = '';
    displayTop.textContent = '';
    displayMiddle.textContent = '';
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
            if (b === Number(0)) {
                displayMiddle.textContent = '';
                alert("You can't divide by 0!");
                return null;
            }
            else return divide(a, b);
    }
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
    return a / b;
};





