const display = document.getElementById('display');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
});

// Calculator Logic
function appendNumber(number) {
    if (display.value === '0' && number !== '.') {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    // Prevent multiple operators in a row
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

function clearDisplay() {
    display.value = '';
    display.placeholder = '0';
}

function deleteLast() {
    display.value = display.value.toString().slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}