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

const operationsArray = ["+", "-", "*", "/"];

const calcTotalInputDiv = document.querySelector('.total-input');
const calcCurrentInputDiv = document.querySelector('.current-input');
const buttons = document.querySelectorAll('button');
const decimalButton = document.querySelector('.decimal');

let totalInput = '';
let placeholder = '';
let firstNum = '';
let secondNum = '';
let chosenOperation = '';
let result = '';

for (button of buttons) {
  button.addEventListener('click', (e) => {
    let value = e.target.innerHTML;

    // button pressed: AC
    if (value === 'AC' || (value === 'C' && !placeholder)) {
      resetCalc();
      calcCurrentInputDiv.innerHTML = '';
    }

    else {
      // button pressed: numbers
      if (!isNaN(value) || value == ".") {
        placeholder = placeholder + value;
        calcCurrentInputDiv.innerHTML = placeholder;

        if (value == ".") {
          decimalButton.disabled = true;
          decimalButton.classList.remove("numbers");
        } 
      }

      // button pressed: +, -, *, /, =, C
      else if (isNaN(value)) {
        // if a number hasn't been selected first
        if (!placeholder || (value == '=' && !firstNum)) {
          calcCurrentInputDiv.innerHTML = 'error lol';
        }

        // if there is a placeholder and user presses C
        else if (typeof(placeholder) === "string" && value === 'C') {
          if (placeholder.charAt(placeholder.length - 1) == ".") {
            enableDecimals();
          }

          placeholder = placeholder.slice(0, -1);
          calcCurrentInputDiv.innerHTML = placeholder;
        }

        // if there is a placeholder and user presses pos/neg
        else if (typeof(placeholder) == "string" && value === "+/-") {
          placeholder = String(Number(placeholder) * -1);
          calcCurrentInputDiv.innerHTML = placeholder;
        }
        
        // if a number has been selected first
        else if (placeholder && operationsArray.includes(value)) {
          // if number in both firstNum and secondNum
          if (firstNum && chosenOperation) {
            secondNum = Number(placeholder);
            firstNum = operate(chosenOperation, firstNum, secondNum);
            calcCurrentInputDiv.innerHTML = firstNum;
            selectOperation(value);
            secondNum = '';

            enableDecimals();
          }

          // place number into firstNum
          else if (!firstNum && value !== "+/-") {
            firstNum = Number(placeholder);

            totalInput = placeholder + " " + value;
            calcTotalInputDiv.innerHTML = totalInput;

            selectOperation(value);
            enableDecimals();
          }
          
          // place number into secondNum
          else if (firstNum && value !== "+/-") {
            secondNum = Number(placeholder);
            selectOperation(value);
            enableDecimals();
          }
        }

        // equal button
        else if (value === '=') {
          enableDecimals();

          secondNum = Number(placeholder);

          totalInput = totalInput + " " + placeholder + " = ";
          calcTotalInputDiv.innerHTML = totalInput;

          placeholder = '';

          result = operate(chosenOperation, firstNum, secondNum);
          calcCurrentInputDiv.innerHTML = result;

          placeholder = result;
          firstNum = '';
          secondNum = '';
          chosenOperation = '';
        }
      }
    }
  })
}

resetCalc = () => {
  placeholder = '';
  firstNum = '';
  secondNum = '';
  chosenOperation = '';
  result = '';
  totalInput = '';

  calcTotalInputDiv.innerHTML = "";
}

selectOperation = (value) => {
  placeholder = '';
  chosenOperation = value;
}

enableDecimals = () => {
  decimalButton.disabled = false;
  decimalButton.classList.add("numbers");
}