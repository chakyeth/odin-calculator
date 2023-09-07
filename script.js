add = (x, y) => {
  return x + y;
}

subtract = (x, y) => {
  return x - y;
}

multiply = (x, y) => {
  return x * y;
}

divide = (x, y) => {
  return x / y;
}

operate = (operation, firstNum, secondNum) => {
  switch (operation) {
    case '+':
      return (add(firstNum, secondNum));
    case '-':
      return (subtract(firstNum, secondNum));
    case '*':
      return (multiply(firstNum, secondNum));
    case '/':
      return (divide(firstNum, secondNum));
    default:
      return "unknown operation selected";
  }
}

const operationsArray = ['+', '-', '*', '/'];
const calcDisplayDiv = document.querySelector('.calc-display');
const buttons = document.querySelectorAll('button');

let placeholder = '';
let firstNum = '';
let secondNum = '';
let chosenOperation = '';
let result = '';

for (button of buttons) {
  button.addEventListener('click', (e) => {
    let value = e.target.innerHTML;

    // button pressed: AC
    if (value === 'AC') {
      resetCalc();
      calcDisplayDiv.innerHTML = '';
    }

    // button pressed: +, -, *, /, =
    else if (isNaN(value)) {
      // if a number hasn't been selected first
      if (placeholder == '') {
        calcDisplayDiv.innerHTML = 'ERROR';
      }
      
      // if a number has been selected first
      else if (placeholder !== '' && operationsArray.includes(value)) {
        // if number in both firstNum and secondNum
        if (firstNum && chosenOperation) {
          secondNum = Number(placeholder);
          firstNum = operate(chosenOperation, firstNum, secondNum);
          calcDisplayDiv.innerHTML = firstNum;
          selectOperation(value);
          secondNum = '';
        }

        // place number into firstNum
        else if (firstNum == '') {
          firstNum = Number(placeholder);
          selectOperation(value);
        }
        // place number into secondNum
        else if (firstNum) {
          secondNum = Number(placeholder);
          selectOperation(value);
        }
      }

      // equal button
      else if (value === '=') {
        secondNum = Number(placeholder);
        placeholder = '';

        result = operate(chosenOperation, firstNum, secondNum);
        calcDisplayDiv.innerHTML = result;

        placeholder = result;
        firstNum = '';
        secondNum = '';
        chosenOperation = '';
      }
    }

    // button pressed: numbers
    else if (!isNaN(value)) {
      placeholder = placeholder + value;
      calcDisplayDiv.innerHTML = placeholder;
    }

    console.log("placeholder: " + placeholder);
    console.log("firstNum: " + firstNum);
    console.log("secondNum: " + secondNum);
    console.log("chosenOperation: " + chosenOperation);
    console.log("result: " + result);
    console.log("\n\n\n");
  })
}

resetCalc = () => {
  placeholder = '';
  firstNum = '';
  secondNum = '';
  chosenOperation = '';
  result = '';
}

selectOperation = (value) => {
  placeholder = '';
  chosenOperation = value;
}