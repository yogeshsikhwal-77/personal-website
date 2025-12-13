let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;

// Function to append numbers and operators to display
function appendToDisplay(value) {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    
    // Handle decimal point
    if (value === '.') {
        if (display.value.includes('.')) {
            return; // Don't add multiple decimal points
        }
        if (display.value === '') {
            display.value = '0.';
            return;
        }
    }
    
    // Handle operators
    if (['+', '-', '*', '/'].includes(value)) {
        if (display.value === '') {
            return; // Don't allow operator as first input
        }
        
        if (previousInput !== '' && currentInput !== '' && operator !== '') {
            calculate(); // Calculate previous operation first
        }
        
        previousInput = display.value;
        operator = value;
        shouldResetDisplay = true;
        return;
    }
    
    // Handle numbers
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
    
    currentInput = display.value;
}

// Function to perform calculation
function calculate() {
    if (previousInput === '' || operator === '' || display.value === '') {
        return;
    }
    
    let prev = parseFloat(previousInput);
    let current = parseFloat(display.value);
    let result;
    
    try {
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    display.value = 'Error';
                    resetCalculator();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        // Handle floating point precision
        if (result % 1 !== 0) {
            result = parseFloat(result.toFixed(10));
        }
        
        display.value = result.toString();
        previousInput = '';
        operator = '';
        currentInput = result.toString();
        shouldResetDisplay = true;
        
    } catch (error) {
        display.value = 'Error';
        resetCalculator();
    }
}

// Function to clear entire display and reset calculator
function clearDisplay() {
    display.value = '';
    resetCalculator();
}

// Function to clear current entry only
function clearEntry() {
    display.value = '';
    currentInput = '';
}

// Function to delete last character
function deleteLast() {
    if (display.value.length > 0) {
        display.value = display.value.slice(0, -1);
        currentInput = display.value;
    }
}

// Function to reset calculator state
function resetCalculator() {
    currentInput = '';
    operator = '';
    previousInput = '';
    shouldResetDisplay = false;
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and decimal point
    if ((key >= '0' && key <= '9') || key === '.') {
        appendToDisplay(key);
    }
    // Operators
    else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    }
    // Enter or equals for calculation
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    // Escape or 'c' for clear
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
    // Backspace for delete
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
    // Delete for clear entry
    else if (key === 'Delete') {
        clearEntry();
    }
});

// Initialize display
display.value = '';
