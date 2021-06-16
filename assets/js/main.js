const displayResult = document.querySelector('#display-result');

const buttonsEval = document.querySelectorAll('.btn-eval');
buttonsEval.forEach(btn => {
    btn.addEventListener('click', setOnInput);
});

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clearInput);

const cutBtn = document.querySelector('#cut');
cutBtn.addEventListener('click', cutInput);

const btnResult = document.querySelector('#result');
btnResult.addEventListener('click', makeOperation);


function setOnInput(e) {
    const element = e.srcElement;

    resetInputAfterErro();

    if (endWithOperator(element)) return;

    if (endWithPoint(element)) return;

    if (startWithZero(element)) return;

    displayResult.value += element.innerText;
};

function endWithPoint(element) {
    return element.innerText === '.' && displayResult.value.endsWith('.')
};

function endWithOperator(element) {
    if (element.classList.contains('operator')) {
        return displayResult.value.endsWith('+') ||
            displayResult.value.endsWith('-') ||
            displayResult.value.endsWith('/') ||
            displayResult.value.endsWith('*');
    } else {
        return false;
    };
};

function startWithZero(element) {
    return element.innerText === '0' && displayResult.value === '0';
};

function cutInput() {
    displayResult.value = displayResult.value.slice(0, -1);
};

function clearInput() {
    displayResult.value = '';
};

function resetInputAfterErro() {
    if (displayResult.value === 'ERRO!' || displayResult.value === 'Infinity') displayResult.value = '';
};

function makeOperation() {
    try {
        const result = eval(displayResult.value);
        displayResult.value = result;
    } catch (erro) {
        displayResult.value = 'ERRO!';
    };
};
