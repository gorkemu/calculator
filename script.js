const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const equalsButton = document.getElementById('equals-btn');
const allClearButton = document.getElementById('ac-btn');
const decimalButton = document.getElementById('decimal-btn');
const clearButton = document.getElementById('c-btn');

let lastOperator = '';
let displayTop = document.querySelector('#display-top');
let displayMiddle = document.querySelector('#display-middle');
let displayBottom = document.querySelector('#display-bottom');

numberButtons.forEach(button => {

    button.addEventListener('click', () => {
        if (lastOperator !== '=') {
            displayBottom.textContent += button.textContent;
        }

        if (displayBottom.textContent.length > 16) {
            displayBottom.textContent = displayBottom.textContent.substring(0, 16);
        }
    })
}
);

operatorButtons.forEach(button =>
    button.addEventListener('click', () => {

        if (displayTop.textContent === '' && displayBottom.textContent !== '') {
            displayTop.textContent = displayBottom.textContent;
            displayBottom.textContent = '';
            displayMiddle.textContent = button.textContent;
            lastOperator = button.textContent;
        }
        else if (displayBottom.textContent !== ''
            && displayBottom.textContent !== '.') {
            displayTop.textContent = operate(lastOperator, displayTop.textContent, displayBottom.textContent);
            displayMiddle.textContent = button.textContent;
            displayBottom.textContent = '';
            lastOperator = button.textContent;
        }
    }));

equalsButton.addEventListener('click', () => {
    if (displayTop.textContent !== ''
        && displayBottom.textContent !== ''
        && displayBottom.textContent !== '.') {
        displayBottom.textContent = operate(lastOperator, displayTop.textContent, displayBottom.textContent);

        if (displayBottom.textContent.length > 16) {
            if (Number(displayBottom.textContent) < 0.001
                || Number(displayBottom.textContent) > -0.001) {
                displayBottom.textContent = parseFloat(Number(displayBottom.textContent).toPrecision(9)).toString();
            } else {
                displayBottom.textContent = parseFloat(Number(displayBottom.textContent).toPrecision(12)).toString();
            }
        }
        displayTop.textContent = '';
        displayMiddle.textContent = '';
        lastOperator = '=';
    }
});

allClearButton.addEventListener('click', () => {
    displayTop.textContent = '';
    displayMiddle.textContent = '';
    displayBottom.textContent = '';
    lastOperator = '';
});

clearButton.addEventListener('click', () => {
    if (lastOperator !== '=') {
        displayBottom.textContent = displayBottom.textContent.slice(0, -1);
    }
});

decimalButton.addEventListener('click', () => {
    if (!displayBottom.textContent.includes('.')
        && lastOperator !== '=') {
        displayBottom.textContent += '.';
    }
});

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