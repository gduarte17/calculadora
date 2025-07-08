let isOperationClicked = false;
let isNumberAdded = false;
let operationsClicked = [];
let isResultPressed = false;
let isDotClicked = false;
let isParenthesisOpened = false;
let count = '';

let deleteButton = document.querySelector('#deleteButton');
deleteButton.addEventListener('click', () => {

    let stringInput = count;
    if (stringInput.length == 1) {
        clearCursor();
    }
    else if (stringInput.length > 1) {
        if (stringInput.charAt(stringInput.length - 1).match(/\d/g)) {
            if (stringInput.charAt(stringInput.length - 2).match(/\d/g)) {
                count = stringInput.slice(0, -1);
                document.querySelector('#display').innerText = document.querySelector('#display').innerText.slice(0, -1);
            }
            else if (!stringInput.charAt(stringInput.length - 2).match(/\d/g) && stringInput.charAt(stringInput.length - 2) != '.') {
                count = stringInput.slice(0, -1);
                document.querySelector('#display').innerText = document.querySelector('#display').innerText.slice(0, -1);
                if (stringInput.charAt(stringInput.length - 2) == '*'
                || stringInput.charAt(stringInput.length  - 2) == '/'
                || stringInput.charAt(stringInput.length  - 2) == '+'
                || stringInput.charAt(stringInput.length  - 2) == '-') {
                    isOperationClicked = true;
                }
                isNumberAdded = false;
            }
            else if (!stringInput.charAt(stringInput.length - 2).match(/\d/g) && stringInput.charAt(stringInput.length - 2) == '.') {
                count = stringInput.slice(0, -1);
                document.querySelector('#display').innerText = document.querySelector('#display').innerText.slice(0, -1);
                isDotClicked = true;
            }
        }
        else if (stringInput.charAt(stringInput.length - 1) == '(') {
            count = stringInput.slice(0, -1);
            document.querySelector('#display').innerText = document.querySelector('#display').innerText.slice(0, -1);
            if (stringInput.charAt(stringInput.length - 2).match(/\d/g)) {
                isNumberAdded = true
            }
            else if (stringInput.charAt(stringInput.length - 2) == '*'
            || stringInput.charAt(stringInput.length - 2) == '/'
            || stringInput.charAt(stringInput.length - 2) == '+'
            || stringInput.charAt(stringInput.length - 2) == '-') {
                isOperationClicked = true;
            }

            parenthesisManagement('closing');
        }
        else if (stringInput.charAt(stringInput.length - 1) == ')') {
            count = stringInput.slice(0, -1);
            document.querySelector('#display').innerText = document.querySelector('#display').innerText.slice(0, -1);
            if (stringInput.charAt(stringInput.length - 2).match(/\d/g)) {
                isNumberAdded = true;
            }

            parenthesisManagement('opening');
        }
        else if (stringInput.charAt(stringInput.length - 1) == '.') {
            count = stringInput.slice(0, -1);
            document.querySelector('#display').innerText = document.querySelector('#display').innerText.slice(0, -1);
            isDotClicked = false;
        }
        else if (stringInput.charAt(stringInput.length - 1) == '*'
        || stringInput.charAt(stringInput.length - 1) == '/'
        || stringInput.charAt(stringInput.length - 1) == '+'
        || stringInput.charAt(stringInput.length - 1) == '-') {
            count = stringInput.slice(0, -1);
            document.querySelector('#display').innerText = document.querySelector('#display').innerText.slice(0, -1);
            isOperationClicked = false;
            if (stringInput.charAt(stringInput.length - 2).match(/\d/g)) {
                isNumberAdded = true;
            }
        }
    }
})

//botao C
let cleanButton = document.querySelector('#cleanButton');
cleanButton.addEventListener('click', () => {clearCursor()});

function clearCursor() {
    document.querySelector('#display').innerText = '';
    document.querySelector('#count').innerText = '';
    count = '';
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

    if (isResultPressed) {
        clearCursor();
        count += '(';
        document.querySelector('#display').innerText += '(';
        parenthesisManagement('opening');
    }

    else if (!isParenthesisOpened) {
        //ABRINDO PARENTESE
        if (count.charAt(count.length - 1) == ')' || count.charAt(count.length - 1).match(/\d/g)) {
            count += '*(';
            document.querySelector('#display').innerText += ' x (';
            parenthesisManagement('opening');
        }
        else if (isOperationClicked) {
            count += '(';
            document.querySelector('#display').innerText += ' (';
            parenthesisManagement('opening');
            isOperationClicked = false;
        }
        else {
            count += '(';
            document.querySelector('#display').innerText += '(';
            parenthesisManagement('opening');
        }
    }
    else if (isParenthesisOpened && !isNumberAdded && !isOperationClicked) {
        if (count.charAt(count.length - 1) == '(') {
            count += '(';
            document.querySelector('#display').innerText += '(';
            parenthesisManagement('opening');
        }
        else if (count.charAt(count.length - 1) == ')') {
            count += ')';
            document.querySelector('#display').innerText += ')';
            parenthesisManagement('closing');
        }
        else if (isOperationClicked) {
            count += '(';
            document.querySelector('#display').innerText += ' (';
            parenthesisManagement('opening');
            isOperationClicked = false;
        }
    }
    else if (isParenthesisOpened && isNumberAdded) {
        //FECHANDO PARENTESE
        count += ')';
        document.querySelector('#display').innerText += ')';
        parenthesisManagement('closing');
    }
    else if (isOperationClicked) {
        count += '(';
        document.querySelector('#display').innerText += ' (';
        parenthesisManagement('opening');
        isOperationClicked = false;
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
    alert('Função ainda em desenvolvimento!');
})

function operationButton(operation, symbol, displaySymbol) {
    let operationId = operation + 'Button';
    document.getElementById(operationId).addEventListener('click', () => {
        if (isNumberAdded && !isOperationClicked && operation != 'dot') {

            count += symbol;
            document.querySelector('#display').innerText += displaySymbol;
                
            isOperationClicked = true;
            isNumberAdded = false;
            isDotClicked = false;
            if (!(operationsClicked.includes(operation))) {
                operationsClicked += operation + ' ';
            }
        }
        else if (isNumberAdded && isOperationClicked && operation != 'dot') {
            isOperationClicked = false;

            count += symbol;
            document.querySelector('#display').innerText += displaySymbol;
                
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
            count += '0' + symbol;
            document.querySelector('#display').innerText += ' 0' + symbol;
            isDotClicked = true;
            isOperationClicked = false;
        }
        else if (isNumberAdded && (isOperationClicked || !isOperationClicked) && operation == 'dot') {
            count += symbol;
            document.querySelector('#display').innerText += symbol;
            isDotClicked = true;
            isOperationClicked = false;
        }
        else if (count.charAt(count.length - 1) == ')') {
            count += symbol;
            document.querySelector('#display').innerText += displaySymbol;
            isOperationClicked = true;
            isNumberAdded = false;
            isDotClicked = false;
            if (!(operationsClicked.includes(operation))) {
                operationsClicked += operation + ' ';
            }
        }
        else if (count.charAt(count.length - 1) == '(') {
            if (operation == 'minus') {
                count += symbol;
                document.querySelector('#display').innerText += symbol; //symbol mesmo, nesse caso não quero que seja utilizado o espaço
                isOperationClicked = true;
                isNumberAdded = false;
                if (!(operationsClicked.includes(operation))) {
                    operationsClicked += operation + ' ';
                }
            }
            else {
                console.log('Formato inválido')
            }
        }
        else if (isResultPressed ) {
            isResultPressed = false;

            if (operation != 'dot') {
                count += symbol;
                document.querySelector('#display').innerText += displaySymbol;
                    
                isOperationClicked = true;
                isNumberAdded = false;
                isDotClicked = false;
                if (!(operationsClicked.includes(operation))) {
                    operationsClicked += operation + ' ';
                }
            }
            else if (operation == 'dot') {
                if (isDotClicked){
                    alert('Esse número já tem ponto flutuante!');
                }
                else {
                    if (isNumberAdded) {
                        count += symbol;
                        document.querySelector('#display').innerText += symbol;
                        isDotClicked = true;
                        isOperationClicked = false;
                    }
                    else {
                        count += '0' + symbol;
                        document.querySelector('#display').innerText += '0' + symbol;
                        isDotClicked = true;
                        isOperationClicked = false;
                    }
                }

            }
        }
        else {
            alert('É necessário inserir um número primeiro!');
        }
    })
}

operationButton('divide', '/', ' /');
operationButton('multiply', '*', ' x');
operationButton('minus', '-', ' -');
operationButton('plus', '+', ' +');
operationButton('dot', '.');

function numberButton(num) {
    let numberId = num.toString() + '-button';
    document.getElementById(numberId).addEventListener('click', () => {

        //CODIGO PARA LIMPAR AS CONTAS APOS APERTAR =
        if (isResultPressed) {
            // document.querySelector('#count').innerText = '';
            // document.querySelector('#current-calculation').innerText = '';
            // document.querySelector('#result').innerText = '';
            // isResultPressed = false; CTRL Z
        }

        //a verificacao serve para permitir numeros com mais de um digito
        if(isOperationClicked) {
            isOperationClicked = false;
            count += num;
            document.querySelector('#display').innerText += ' ' + num;
        }
        else if (isDotClicked) {
            count += num;
            document.querySelector('#display').innerText += num;
        }
        else if (count.charAt(count.length - 1) == '(') {
            count += num;
            document.querySelector('#display').innerText += num;
        }
        else if (count.charAt(count.length - 1) == ')') {
            count += '*' + num;
            document.querySelector('#display').innerText += ' x ' + num;
        }
        else {
            count += num;
            document.querySelector('#display').innerText += num;
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
            let numBeforeOperation = calc[i - 1];
            let numAfterOperation = calc[i + 1];
            
            if (numBeforeOperation.includes('_')) {
                numBeforeOperation = numBeforeOperation.slice(1);
                numBeforeOperation = parseFloat(numBeforeOperation) * -1;
            }
            if (numAfterOperation.includes('_')) {
                numAfterOperation = numAfterOperation.slice(1);
                numAfterOperation = parseFloat(numAfterOperation) * -1;
            }

            numBeforeOperation = parseFloat(numBeforeOperation);
            numAfterOperation = parseFloat(numAfterOperation);

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

            if (calc[i] == '*') {
                let result = parseFloat(numBeforeOperation * numAfterOperation).toFixed(lengthToFixed);
                if (result.includes('.')) {
                    let floating = result.slice(result.indexOf('.') + 1, result.length);
                    let i = floating.length;
                    while (i >= 0) {
                        if (floating[i - 1] == '0') {
                            result = result.slice(0, -1);
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
                if (Math.sign(result) === -1) {
                    result = result.split('');
                    result.shift();
                    result = ('_' + result.toString()).replaceAll(',', ''); //importante
                }
                calc.splice(i - 1, 3, result.toString());
                i = 0;
            }
            else if (calc[i] == '/') {
                let result = numBeforeOperation / numAfterOperation;

                if (Math.sign(result) === -1) {
                    result = result.split('');
                    result.shift();
                    result = ('_' + result.toString()).replaceAll(',', '');
                }
                calc.splice(i - 1, 3, result.toString());
                i = 0;
            }
        }
    }
}

function plusMinusOperations(calc) {
    for (let i = 0; i < calc.length; i++) {
        if (calc[i] == '+' || calc[i] == '-') {
            let numBeforeOperation = calc[i - 1];
            let numAfterOperation = calc[i + 1];
            
            if (numBeforeOperation.includes('_')) {
                numBeforeOperation = numBeforeOperation.slice(1);
                numBeforeOperation = parseFloat(numBeforeOperation) * -1;
            }
            if (numAfterOperation.includes('_')) {
                numAfterOperation = numAfterOperation.slice(1);
                numAfterOperation = parseFloat(numAfterOperation) * -1;
            }

            numBeforeOperation = parseFloat(numBeforeOperation);
            numAfterOperation = parseFloat(numAfterOperation);

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
                if (result.includes('.')) {
                    let floating = result.slice(result.indexOf('.') + 1, result.length);
                    let i = floating.length;
                    while (i >= 0) {
                        if (floating[i - 1] == '0') {
                            result = result.slice(0, -1);
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
                if (Math.sign(result) === -1) {
                    result = result.split('');
                    result.shift();
                    result = ('_' + result.toString()).replaceAll(',', '');
                }
                calc.splice(i - 1, 3, result.toString());
                i = 0;
            }
            else if (calc[i] == '-') {
                let result = parseFloat(numBeforeOperation - numAfterOperation).toFixed(lengthToFixed);
                if (result.includes('.')) {
                    let floating = result.slice(result.indexOf('.') + 1, result.length);
                    let i = floating.length;
                    while (i >= 0) {
                        if (floating[i - 1] == '0') {
                            result = result.slice(0, -1);
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
                if (Math.sign(result) === -1) {
                    result = result.split('');
                    result.shift();
                    result = ('_' + result.toString()).replaceAll(',', '');
                }
                calc.splice(i - 1, 3, result.toString());
                i = 0;
            }
        }
    }
}

let negativeButton = document.getElementById('negativeButton');
negativeButton.addEventListener('click', () => {
    if (count.charAt(count.length - 1) == ')' || count.charAt(count.length - 1).match(/\d/g)) {
        count += '*(-';
        document.querySelector('#display').innerText += ' x (-';
        parenthesisManagement('opening');
    }
    else if (count.charAt(count.length - 1) == '(') {
        count += '(-';
        document.querySelector('#display').innerText += '(-';
        parenthesisManagement('opening');
    }
    else if (count.charAt(count.length - 1).match(/(\*|\/|\+|\-)/)) {
        count += '(-';
        document.querySelector('#display').innerText += ' (-';
        parenthesisManagement('opening');
    }
    else {
        count += '(-';
        document.querySelector('#display').innerText += '(-';
        parenthesisManagement('opening');
    }
})

let resultButton = document.getElementById('equalsButton');
resultButton.addEventListener('click', () => {

    if (isParenthesisOpened) {
        for (let i = 0; i < openedParenthesisCounter; i++) {
            count += ')';
            document.querySelector('#display').innerText += ')';
        }
        parenthesisManagement('zero');
    }

    document.querySelector('#count').innerText = document.querySelector('#display').innerText;

    let calculation = count;

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
                
                let currentCalc = calculation.slice(lastOpenParenthesis + 1, closingLastParenthesis);
                let auxiliarString = calculation.slice(lastOpenParenthesis, closingLastParenthesis + 1);
                
                if(auxiliarString.includes('(-')) {

                    let firstOperation = auxiliarString.slice(2)
                    firstOperation = firstOperation.split(/(\+|\-|\*|\/|\))/);
                    firstOperation = firstOperation[1];

                    let indexOps = auxiliarString.indexOf(firstOperation);

                    let numToReplace = auxiliarString.slice(2, indexOps);
                    let negativeNum = /[-]([0-9]*[.])?[0-9]+/;
                    currentCalc = currentCalc.replace(negativeNum, '_' + numToReplace);
                }

                currentCalc = currentCalc.split(/(\+|\-|\*|\/)/g);
                
                multiplyDivideOperations(currentCalc);
                plusMinusOperations(currentCalc);
                
                calculation = calculation.replace(auxiliarString, currentCalc.toString());
            }
            if (Math.sign(calculation) === -1) {
                break;
            }
        }
        else {
            calculation = calculation.split(/(\+|\-|\*|\/)/g);
            multiplyDivideOperations(calculation);
            plusMinusOperations(calculation);
        }
        
    }

    if (calculation.toString().includes('_')) {
        calculation = calculation.toString().slice(1);
        calculation = parseFloat(calculation) * -1;
    }
    document.querySelector('#display').innerText = calculation;

    isResultPressed = true;
    operationsClicked = [];
    isDotClicked = false;
    console.log(count, calculation);
    count = calculation;
})
