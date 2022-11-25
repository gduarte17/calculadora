let isOperationClicked = false;
let isNumberAdded = false;
let operationsClicked = [];
let isResultPressed = false;
let isDotClicked = false;
let isParenthesisOpened = false;

let deleteButton = document.querySelector('#deleteButton');
deleteButton.addEventListener('click', () => {
    let stringInput = document.querySelector('#count').innerText;
    if (stringInput.length == 1) {
        clearCursor();
    }
    else if (stringInput.length > 1) {
        // if (isNumber(stringInput.charAt(stringInput.length - 1))) {
        if (stringInput.charAt(stringInput.length - 1).match(/\d/g)) {
            // if (isNumber(stringInput.charAt(stringInput.length - 2))) {
            if (stringInput.charAt(stringInput.length - 2).match(/\d/g)) {
                document.querySelector('#count').innerText = stringInput.slice(0, -1);
            }
            // else if (!isNumber(stringInput.charAt(stringInput.length - 2)) && stringInput.charAt(stringInput.length - 2) != '.') {
            else if (!stringInput.charAt(stringInput.length - 2).match(/\d/g) && stringInput.charAt(stringInput.length - 2) != '.') {
                document.querySelector('#count').innerText = stringInput.slice(0, -1);
                if (stringInput.charAt(stringInput.length - 2) == '*'
                || stringInput.charAt(stringInput.length  - 2) == '/'
                || stringInput.charAt(stringInput.length  - 2) == '+'
                || stringInput.charAt(stringInput.length  - 2) == '-') {
                    isOperationClicked = true;
                    isNumberAdded = false;
                }
            }
            // else if (!isNumber(stringInput.charAt(stringInput.length - 2)) && stringInput.charAt(stringInput.length - 2) == '.') {
            else if (!stringInput.charAt(stringInput.length - 2).match(/\d/g) && stringInput.charAt(stringInput.length - 2) == '.') {
                document.querySelector('#count').innerText = stringInput.slice(0, -1);
                isDotClicked = true;
            }
        }
        else if (stringInput.charAt(stringInput.length - 1) == '(') {
            document.querySelector('#count').innerText = stringInput.slice(0, -1);
            parenthesisManagement('closing');
        }
        else if (stringInput.charAt(stringInput.length - 1) == ')') {
            document.querySelector('#count').innerText = stringInput.slice(0, -1);
            parenthesisManagement('opening');
        }
        else if (stringInput.charAt(stringInput.length - 1) == '.') {
            document.querySelector('#count').innerText = stringInput.slice(0, -1);
            isDotClicked = false;
        }
        else if (stringInput.charAt(stringInput.length - 1) == '*'
        || stringInput.charAt(stringInput.length - 1) == '/'
        || stringInput.charAt(stringInput.length - 1) == '+'
        || stringInput.charAt(stringInput.length - 1) == '-') {
            document.querySelector('#count').innerText = stringInput.slice(0, -1);
            isOperationClicked = false;
        }
    }
})

// function isNumber(value) {
//     return (value.match(/\d/g));
// }

//botao C
let cleanButton = document.querySelector('#cleanButton');
cleanButton.addEventListener('click', () => {clearCursor()});

function clearCursor() {
    document.querySelector('#count').innerText = '';
    document.querySelector('#current-calculation').innerText = '';
    document.querySelector('#result').innerText = '';
    isNumberAdded = false;
    isOperationClicked = false;
    isDotClicked = false;
    operationsClicked = [];
    isResultPressed = false;
    parenthesisManagement('zero');
}

//botao ( )
let openedParenthesisCounter = 0;

document.getElementById('parenthesisButton').addEventListener('click', () => {
    let count = document.getElementById('count').innerText;

    if (!isParenthesisOpened) {
        //ABRINDO PARENTESE
        if (count.charAt(count.length - 1) == ')') {
            document.getElementById('count').innerText += '*(';
            parenthesisManagement('opening');
        }
        else {
            document.getElementById('count').innerText += '(';
            parenthesisManagement('opening');
        }
    }
    else if (isParenthesisOpened && !isNumberAdded) {
        if (count.charAt(count.length - 1) == '(') {
            document.getElementById('count').innerText += '(';
            parenthesisManagement('opening');
        }
        else if (count.charAt(count.length - 1) == ')') {
            document.getElementById('count').innerText += ')';
            parenthesisManagement('closing');
        }
        else if (isOperationClicked) {
            document.getElementById('count').innerText += '(';
            parenthesisManagement('opening');
        }
    }
    else if (isParenthesisOpened && isNumberAdded) {
        //FECHANDO PARENTESE
        document.getElementById('count').innerText += ')';
        parenthesisManagement('closing');
    }
    else if (isOperationClicked) {
        document.getElementById('count').innerText += '(';
    }
    isNumberAdded = false;
})

function parenthesisManagement(action) {
    if(action == 'opening') {
        openedParenthesisCounter += 1;
    }
    else if (action == 'closing') {
        openedParenthesisCounter -= 1;
    }
    else if (action == 'zero') {
        openedParenthesisCounter = 0;
    }
    
    if (openedParenthesisCounter <= 0) { isParenthesisOpened = false; } else { isParenthesisOpened = true; }
}

//botao %
document.getElementById('percentButton').addEventListener('click', () => {
    console.log('percentButton');
})

function operationButton(operation, symbol) {
    let operationId = operation + 'Button';
    document.getElementById(operationId).addEventListener('click', () => {
        if (isNumberAdded && !isOperationClicked && operation != 'dot') {

            document.getElementById('count').innerText += symbol;
            // if(isDotClicked == true) {
                //     isDotClicked = false;
                // }
                
            isOperationClicked = true;
            isNumberAdded = false;
            isDotClicked = false;
            if (!(operationsClicked.includes(operation))) {
                operationsClicked += operation + ' ';
            }
        }
        else if (isNumberAdded && isOperationClicked && operation != 'dot') {
            isOperationClicked = false;

            document.getElementById('count').innerText += symbol;
            // if(isDotClicked == true) {
                //     isDotClicked = false;
                // }
                
            isOperationClicked = true;
            isNumberAdded = false;
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
        else if (document.getElementById('count').innerText.charAt(document.getElementById('count').innerText.length - 1) == ')') {
            document.getElementById('count').innerText += symbol;
            isOperationClicked = true;
            isNumberAdded = false;
            isDotClicked = false;
            if (!(operationsClicked.includes(operation))) {
                operationsClicked += operation + ' ';
            }
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
        let count = document.getElementById('count').innerText;

        //CODIGO PARA LIMPAR AS CONTAS APOS APERTAR =
        if (isResultPressed) {
            // document.querySelector('#count').innerText = '';
            // document.querySelector('#current-calculation').innerText = '';
            // document.querySelector('#result').innerText = '';
            // isResultPressed = false;
            clearCursor();
        }

        //a verificacao serve para permitir numeros com mais de um digito
        if(isOperationClicked) {
            isOperationClicked = false;
            document.querySelector('#count').innerText += num;
        }
        else if (isDotClicked) {
            document.querySelector('#count').innerText += num;
        }
        else if (isParenthesisOpened && !isOperationClicked && count.charAt(count.length - 1) == ')' ) {
            document.querySelector('#count').innerText += '*' + num;
        }
        else {
            document.querySelector("#count").innerText += num;
            isOperationClicked = false;
        }
        isNumberAdded = true;
    })
}

for (let x = 0; x <= 9; x++) {
    numberButton(x);
}

function multiplyDivideOperations(calc) {
    for (let i = 0; i < calc.length; i++) {
        if (calc[i] == '*' || calc[i] == '/') {
            let numBeforeOperation = parseFloat(calc[i - 1]);
            let numAfterOperation = parseFloat(calc[i + 1]);

            let floatNumBefOps = numBeforeOperation.toString().split(/\./);
            let floatNumAftOps = numAfterOperation.toString().split(/\./);

            let lengthToFixed = 0;

            if (floatNumBefOps.length > 1 && floatNumAftOps.length > 1) {
                if(floatNumBefOps[1].length >= floatNumAftOps[1].length) { lengthToFixed = floatNumBefOps[1].length; }
                else if (floatNumAftOps[1].length > floatNumBefOps[1].length) { lengthToFixed = floatNumAftOps[1].length; }
            }
            else if (floatNumBefOps.length > 1 || floatNumAftOps.length > 1) {
                if (floatNumBefOps.length > 1) { lengthToFixed = floatNumBefOps[1].length; }
                else if (floatNumAftOps.length > 1) { lengthToFixed = floatNumAftOps[1].length; }
            }

            // 1.333333333 * 1.265349 = 1.687132 - 000
            if (calc[i] == '*') {
                let result = parseFloat(numBeforeOperation * numAfterOperation).toFixed(lengthToFixed);
                if (result.includes('.')) {
                    let floating = result.slice(result.indexOf('.') + 1, result.length);
                    let i = floating.length;
                    console.log(floating);
                    while (i >= 0) {
                        console.log(i);
                        if (floating[i - 1] == '0') {
                            result = result.slice(0, -1);
                            console.log(result);
                        }
                        else if (floating[i - 1] != '0') {
                            break;
                        }
                        i--;
                    }
                    if (result.charAt(result.length - 1) == '.') {
                        result = result.slice(0, -1);
                    }
                }
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

function plusMinusOperations(calc) {
    for (let i = 0; i < calc.length; i++) {
        if (calc[i] == '+' || calc[i] == '-') {
            let numBeforeOperation = parseFloat(calc[i - 1]);
            let numAfterOperation = parseFloat(calc[i + 1]);

            let floatNumBefOps = numBeforeOperation.toString().split(/\./);
            let floatNumAftOps = numAfterOperation.toString().split(/\./);

            let lengthToFixed = 0;

            if (floatNumBefOps.length > 1 && floatNumAftOps.length > 1) {
                if(floatNumBefOps[1].length >= floatNumAftOps[1].length) { lengthToFixed = floatNumBefOps[1].length; }
                else if (floatNumAftOps[1].length > floatNumBefOps[1].length) { lengthToFixed = floatNumAftOps[1].length; }
            }
            else if (floatNumBefOps.length > 1 || floatNumAftOps.length > 1) {
                if (floatNumBefOps.length > 1) { lengthToFixed = floatNumBefOps[1].length; }
                else if (floatNumAftOps.length > 1) { lengthToFixed = floatNumAftOps[1].length; }
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

let resultButton = document.getElementById('equalsButton');
resultButton.addEventListener('click', () => {

    if (isParenthesisOpened) {
        for (let i = 0; i < openedParenthesisCounter; i++) {
            document.getElementById('count').innerText += ')';
        }
        parenthesisManagement('zero');
    }

    let calculation = document.getElementById('count').innerText;
    // let calc = document.getElementById('count').innerText.split(/(\+|\-|\*|\/)/g);

    while (calculation.includes('(') 
    || calculation.includes('*')
    || calculation.includes('/')
    || calculation.includes('+')
    || calculation.includes('-')) {
        if(calculation.includes('(')){
            let howManyOpenParenthesis = calculation.match(/\(/g).length;
            
            for (let i = 0; i < howManyOpenParenthesis; i++) {
                let lastOpenParenthesis = calculation.lastIndexOf('(');
                let closingLastParenthesis = calculation.indexOf(')', lastOpenParenthesis);
                
                let currentCalc = calculation.slice(lastOpenParenthesis + 1, closingLastParenthesis).split(/(\+|\-|\*|\/)/g);  
                let auxiliarString = calculation.slice(lastOpenParenthesis, closingLastParenthesis + 1);
                
                multiplyDivideOperations(currentCalc);
                plusMinusOperations(currentCalc);
                
                calculation = calculation.replace(auxiliarString, currentCalc.toString());
            }
        }
        else {
            calculation = calculation.split(/(\+|\-|\*|\/)/g);
    
            multiplyDivideOperations(calculation);
            plusMinusOperations(calculation);
        }
    }
    
    document.querySelector('#result').innerText = 'Resultado: ' + calculation;
    //////////////////////////////////////////////////////////////////////////////

    // else {
    //     let currentCalc = calculation.split(/(\+|\-|\*|\/)/g);
    //     console.log(currentCalc);

    //     multiplyDivideOperations(currentCalc);
    //     plusMinusOperations(currentCalc);
    //     document.querySelector('#result').innerText = 'Resultado: ' + currentCalc;
    // }

    // 2 + 4 * 9 - 7 = 31 
    // 1 * 2 / 8 * 4 * 3 = 3
    //((( 1 * 2 / 8 * 4 * 3) / 2) - 0.5) = 1

    // if (operationsClicked.length > 1) {
    //         multiplyDivideOperations();
    //         plusMinusOperations();
    //         document.querySelector('#result').innerText = 'Resultado: ' + calc;
    // }

    isResultPressed = true;
    operationsClicked = [];
    isDotClicked = false;
})
