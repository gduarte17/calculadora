let isOperationClicked = false;
let isNumberAdded = false;
let operationsClicked = [];
let isResultPressed = false;
let isDotClicked = false;

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
    operationsClicked = [];
}

// let addNumToCursor = document.getElementById('addNumToCursor');
// addNumToCursor.addEventListener('click', () => {
//     document.querySelector('#count').innerText += document.querySelector('#inputNumber').value;
//     document.querySelector('#inputNumber').value = '';
//     isNumberAdded = true;
// })

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
        if (isNumberAdded && !isOperationClicked && operation != 'colon') {
            // document.getElementById('count').innerText += symbol;
            let currentValue = document.getElementById('count').innerText;

            //verificacao serve para 
            // if(document.getElementById('current-calculation').innerText == ''){
            //     document.getElementById('current-calculation').innerText = currentValue + " " + symbol;
            // }
            // else {
            //     document.getElementById('current-calculation').innerText += currentValue + " " + symbol;
            // }
            // document.getElementById('current-calculation').innerText += "  " + currentValue + " " + symbol;k

            document.getElementById('count').innerText += symbol;
            isOperationClicked = true;
            isNumberAdded = false;

            if (!(operationsClicked.includes(operation))) {
                operationsClicked += operation + ' ';
            }
        }
        else if (isNumberAdded && isOperationClicked && operation != 'colon') {
            isOperationClicked = false;
            let currentValue = document.getElementById('count').innerText;

            //verificacao serve para 
            // if(document.getElementById('current-calculation').innerText == ''){
            //     document.getElementById('current-calculation').innerText = currentValue + " " + symbol;
            // }
            // else {
            //     document.getElementById('current-calculation').innerText += currentValue + " " + symbol;
            // }
            // document.getElementById('current-calculation').innerText += "  " + currentValue + " " + symbol;k

            // if(document.getElementById('current-calculation').innerText == ''){
            //     document.getElementById('current-calculation').innerText = currentValue;
            // }
            // else {
            //     document.getElementById('current-calculation').innerText = currentValue;
            // }
            document.getElementById('count').innerText += symbol;
            isOperationClicked = true;
            isNumberAdded = false;

            if (!(operationsClicked.includes(operation))) {
                operationsClicked += operation + ' ';
            }
        }
        else if (!isNumberAdded && (isOperationClicked || !isOperationClicked) && operation == 'dot') {
            document.querySelector('#count').innerText += '0' + symbol;
            isDotClicked = true;
        }
        else if (isNumberAdded && (isOperationClicked || !isOperationClicked) && operation == 'dot') {
            console.log(document.querySelector('#count').innerText);
            document.querySelector('#count').innerText += symbol;
            isDotClicked = true;
        }
        else {
            console.log('nao pode burro');
            console.log(isNumberAdded);
            console.log(isOperationClicked);
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
            // document.querySelector('#count').innerText = '';
            isOperationClicked = false;
            // let currentCount =  document.querySelector('#count').innerText;
            // document.querySelector('#count').innerText = num + currentCount;
            document.querySelector('#count').innerText += num;
            isNumberAdded = true;
        }
        else if (isDotClicked) {
            let current = document.querySelector('#count').innerText;
            let floatNum = current + num;
            document.querySelector('#count').innerText = floatNum;
            console.log(document.querySelector('#count').innerText);
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
    let calc = document.querySelector('#count').innerText.split('');
    // console.log(calc);

    // let currentValue = document.getElementById('count').innerText;
    // document.getElementById('current-calculation').innerText += ' ' + currentValue;
    // if (operationsClicked.includes('multiply')) {
    //     let result = calc.split('multiply');
    //     console.log(result);
    // }

    function multiplyDivideOperations() {
        for (let i = 0; i < calc.length; i++) {
            if (calc[i] == '*' || calc[i] == '/') {
                let numBeforeOperation = parseFloat(calc[i - 1]);
                let numAfterOperation = parseFloat(calc[i + 1]);
                if (calc[i] == '*') {
                    let result = numBeforeOperation * numAfterOperation;
                    calc.splice(i - 1, 3, result.toString());
                    i = 0;
                    console.log(calc);
                }
                else if (calc[i] == '/') {
                    let result = numBeforeOperation / numAfterOperation;
                    calc.splice(i - 1, 3, result.toString());
                    i = 0;
                    console.log(calc);
                }
            }
        }
    }

    function plusMinusOperations() {
        for (let i = 0; i < calc.length; i++) {
            if (calc[i] == '+' || calc[i] == '-') {
                let numBeforeOperation = parseFloat(calc[i - 1]);
                let numAfterOperation = parseFloat(calc[i + 1]);
                if (calc[i] == '+') {
                    let result = numBeforeOperation + numAfterOperation;
                    calc.splice(i - 1, 3, result.toString());
                    i = 0;
                    console.log(calc);
                }
                else if (calc[i] == '-') {
                    let result = numBeforeOperation - numAfterOperation;
                    calc.splice(i - 1, 3, result.toString());
                    i = 0;
                    console.log(calc);
                }
            }
        }
    }

    // 2 + 4 * 9 - 7 = 31 
    // 1 * 2 / 8 * 4 * 3 = 3

    if (operationsClicked.length > 1) {
            multiplyDivideOperations();
            plusMinusOperations();
            console.log(calc);  
            document.querySelector('#result').innerText = 'Resultado: ' + calc;
    }

    // if (operationsClicked.includes('plus')) {
    //     let result = (document.getElementById('count').innerText).split('+');
    //     let resultValue = 0;
    //     result.forEach((value) => {resultValue += parseFloat(value)})
    //     document.querySelector('#result').innerText = 'Resultado: ' + resultValue;
    // }
    // else if (operationsClicked.includes('minus')) {
    //     let result = (document.getElementById('count').innerText).split('-');
    //     let resultValue = (result[0] * 2);
    //     result.forEach((value) => {resultValue -= parseFloat(value)})
    //     document.querySelector('#result').innerText = 'Resultado: ' + resultValue;
    // }
    // else if (operationsClicked.includes('multiply')) {
    //     let result = (document.getElementById('count').innerText).split('*');
    //     let resultValue = 1;
    //     result.forEach((value) => {resultValue *= parseFloat(value)});
    //     document.querySelector('#result').innerText = 'Resultado: ' + resultValue;
    // }
    // else if (operationsClicked.includes('divide')) {
    //     let result = (document.getElementById('count').innerText).split('/');
    //     let resultValue = (result[0] * result[0]);
    //     result.forEach((value) => {resultValue /= parseFloat(value)});
    //     document.querySelector('#result').innerText = 'Resultado: ' + resultValue;
    // }

    isResultPressed = true;
    operationsClicked = [];
})

//FUNCAO PARA SABER QUANTAS VEZES O MESMO VALOR SE REPETE NUM ARRAY
// function countInArray(array = [], value) {
//     return array.filter(item => item == value).length;
// }

function countInArray(array, value) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
            count++;
        }
    }
    return count;
}
