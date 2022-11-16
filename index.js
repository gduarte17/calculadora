let isOperationClicked = false;
let isNumberAdded = false;
let operationsClicked = [];
let isResultPressed = false;
let isDotClicked = false;
// let calc = [];

let deleteButton = document.querySelector('#deleteButton');
deleteButton.addEventListener('click', () => {
    let stringInput = document.querySelector('#count').innerText;
    if (stringInput.length == 1) {
        clearCursor();
    }
    else if (stringInput.length > 1) {
        document.querySelector('#count').innerText = stringInput.substring(0, stringInput.length - 1);
    }
})

//botao C
let cleanButton = document.querySelector('#cleanButton');
cleanButton.addEventListener('click', () => {clearCursor()});

function clearCursor() {
    document.querySelector('#count').innerText = '';
    document.querySelector('#current-calculation').innerText = '';
    document.querySelector('#result').innerText = '';
    // document.querySelector('#count').innerText = '';
    isNumberAdded = false;
    isOperationClicked = false;
    isDotClicked = false;
    operationsClicked = [];
}

//botao ( )
document.getElementById('parenthesisButton').addEventListener('click', () => {
    document.getElementById('count').innerText += '(';
})

//botao %
document.getElementById('percentButton').addEventListener('click', () => {
    console.log('percentButton');
})

function operationButton(operation, symbol) {
    let operationId = operation + 'Button';
    document.getElementById(operationId).addEventListener('click', () => {
        if (isNumberAdded && !isOperationClicked && operation != 'dot') {

            document.getElementById('count').innerText += symbol;
            isOperationClicked = true;
            isNumberAdded = false;
            if(isDotClicked == true) {
                isDotClicked = false;
            }

            isDotClicked = false;
            if (!(operationsClicked.includes(operation))) {
                operationsClicked += operation + ' ';
            }
        }
        else if (isNumberAdded && isOperationClicked && operation != 'dot') {
            isOperationClicked = false;

            document.getElementById('count').innerText += symbol;
            isOperationClicked = true;
            isNumberAdded = false;
            if(isDotClicked == true) {
                isDotClicked = false;
            }

            isDotClicked = false;
            if (!(operationsClicked.includes(operation))) {
                operationsClicked += operation + ' ';
            }
        }
        else if (operation == 'dot' && isDotClicked) {
            alert('Esse número já tem ponto flutuante!');
        }
        else if (!isNumberAdded && (isOperationClicked || !isOperationClicked) && operation == 'dot') {
            document.querySelector('#count').innerText += '0' + symbol;
            isDotClicked = true;
        }
        else if (isNumberAdded && (isOperationClicked || !isOperationClicked) && operation == 'dot') {
            document.querySelector('#count').innerText += symbol;
            isDotClicked = true;
        }
        else {
            alert('É necessário inserir um número primeiro!');
        }
    })
}

operationButton('divide', '/');
operationButton('multiply', '*');
operationButton('minus', '-');
operationButton('plus', '+');
operationButton('dot', '.');

function numberButton(num) {
    let numberId = num.toString() + '-button';
    document.getElementById(numberId).addEventListener('click', () => {

        //CODIGO PARA LIMPAR AS CONTAS APOS APERTAR =
        if (isResultPressed) {
            document.querySelector('#count').innerText = '';
            document.querySelector('#current-calculation').innerText = '';
            document.querySelector('#result').innerText = '';
            isResultPressed = false;
        }

        //a verificacao serve para permitir numeros com mais de um digito
        if(isOperationClicked) {
            isOperationClicked = false;
            document.querySelector('#count').innerText += num;
            isNumberAdded = true;
        }
        else if (isDotClicked) {
            document.querySelector('#count').innerText += num;

            isNumberAdded = true;
        }
        else {
            document.querySelector("#count").innerText += num;
            isOperationClicked = false;
            isNumberAdded = true;
        }
    })
}

for (let x = 0; x <= 9; x++) {
    numberButton(x);
}

let resultButton = document.getElementById('equalsButton');
resultButton.addEventListener('click', () => {

    let calc = document.getElementById('count').innerText.split(/(\+|\-|\*|\/)/g);

    function multiplyDivideOperations() {
        for (let i = 0; i < calc.length; i++) {
            if (calc[i] == '*' || calc[i] == '/') {
                let numBeforeOperation = parseFloat(calc[i - 1]);
                let numAfterOperation = parseFloat(calc[i + 1]);

                let floatNumBefOps = numBeforeOperation.toString().split(/\./);
                let floatNumAftOps = numAfterOperation.toString().split(/\./);

                let lengthToFixed;
                if(floatNumBefOps[1].length >= floatNumAftOps[1].length) { lengthToFixed = floatNumBefOps[1].length; } 
                else if (floatNumAftOps[1].length > floatNumBefOps[1].length) { lengthToFixed = floatNumAftOps[1].length; }

                if (calc[i] == '*') {
                    let result = parseFloat(numBeforeOperation * numAfterOperation).toFixed(lengthToFixed * 1.5);
                    calc.splice(i - 1, 3, result.toString());
                    i = 0;
                }
                else if (calc[i] == '/') {
                    let result = numBeforeOperation / numAfterOperation;
                    calc.splice(i - 1, 3, result.toString());
                    i = 0;
                }
            }
        }
    }

    function plusMinusOperations() {
        for (let i = 0; i < calc.length; i++) {
            if (calc[i] == '+' || calc[i] == '-') {
                let numBeforeOperation = parseFloat(calc[i - 1]);
                let numAfterOperation = parseFloat(calc[i + 1]);

                let floatNumBefOps = numBeforeOperation.toString().split(/\./);
                let floatNumAftOps = numAfterOperation.toString().split(/\./);

                let lengthToFixed = 0;

                if (floatNumBefOps.length > 1 || floatNumAftOps.length > 1) {
                    if(floatNumBefOps[1].length >= floatNumAftOps[1].length) { lengthToFixed = floatNumBefOps[1].length; } 
                    else if (floatNumAftOps[1].length > floatNumBefOps[1].length) { lengthToFixed = floatNumAftOps[1].length; }
                }

                if (calc[i] == '+') {
                    let result = parseFloat(numBeforeOperation + numAfterOperation).toFixed(lengthToFixed);
                    calc.splice(i - 1, 3, result.toString());
                    i = 0;
                }
                else if (calc[i] == '-') {
                    let result = parseFloat(numBeforeOperation - numAfterOperation).toFixed(lengthToFixed);
                    calc.splice(i - 1, 3, result.toString());
                    i = 0;
                }
            }
        }
    }

    // 2 + 4 * 9 - 7 = 31 
    // 1 * 2 / 8 * 4 * 3 = 3

    if (operationsClicked.length > 1) {
            multiplyDivideOperations();
            plusMinusOperations();
            document.querySelector('#result').innerText = 'Resultado: ' + calc;
    }

    isResultPressed = true;
    operationsClicked = [];
    isDotClicked = false;
})
