const displayResult = document.querySelector('#display-result');

const buttonsEval = document.querySelectorAll('.btn-eval');
buttonsEval.forEach(btn => {
    btn.addEventListener('click', setOnDisplay);
});

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clearDisplay);

const cutBtn = document.querySelector('#cut');
cutBtn.addEventListener('click', cutDisplay);

const btnResult = document.querySelector('#result');
btnResult.addEventListener('click', makeOperation);


function setOnDisplay(e) {
    const element = e.srcElement;

    resetDisplayAfterErro();

    if (endWithOperator(element) ||
        endWithPoint(element) ||
        startWithZero(element) ||
        startWithOperator(element)) return;

    displayResult.value += element.innerText;
};

function endWithPoint(element) {
    return element.innerText === '.' && 
        displayResult.value.endsWith('.')
};

function endWithOperator(element) {
    if (element.classList.contains('operator')) {
        if (!(displayResult.value.endsWith('-')) && element.innerText == '-') return false;

        return displayResult.value.endsWith('+') ||
            displayResult.value.endsWith('-') ||
            displayResult.value.endsWith('/') ||
            displayResult.value.endsWith('*');
    } else {
        return false;
    };
};

function startWithOperator(element) {
    if (displayResult.value === '') {
        if (element.innerText === '/' || 
            element.innerText === '*') 
            return true;
    };
    
    return false;
};

function startWithZero(element) {
    return element.innerText === '0' &&
        displayResult.value === '0';
};

function cutDisplay() {
    displayResult.value = displayResult.value.slice(0, -1);
};

function clearDisplay() {
    displayResult.value = '';
};

function resetDisplayAfterErro() {
    if (displayResult.value === 'ERRO!' ||
        displayResult.value === 'Infinity') displayResult.value = '';
};

function makeOperation() {
    try {
        const result = eval(displayResult.value);
        displayResult.value = result;
    } catch (erro) {
        displayResult.value = 'ERRO!';
    };
};
