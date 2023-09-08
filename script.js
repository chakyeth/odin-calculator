// constants
const calcTotalInputDiv = document.querySelector('.total-input');
const calcCurrentInputDiv = document.querySelector('.current-input');
const buttons = document.querySelectorAll('button');
const decimalButton = document.querySelector('.decimal');
const operationsArray = ["+", "-", "*", "/"];


// functions
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

resetCalc = () => {
  enableDecimals();
  placeHolder = '';
  firstNum = '';
  secondNum = '';
  chosenOperation = '';
  result = '';
  totalInput = '';

  calcTotalInputDiv.innerHTML = "";
  calcCurrentInputDiv.innerHTML = '';
}

emptyPlaceHolder = () => {
  placeHolder = '';
}

enableDecimals = () => {
  decimalButton.disabled = false;
  decimalButton.classList.add("input-button");
}

disableDecimals = () => {
  decimalButton.disabled = true;
  decimalButton.classList.remove("input-button");
}


// logic
let placeHolder = '';
let firstNum = '';
let secondNum = '';
let chosenOperation = '';
let result = '';
let totalInput = '';

for (button of buttons) {
  button.addEventListener('click', (e) => {
    let value = e.target.innerHTML;

    // AC or C pressed with nothing in current input placeholder
    if (value == "AC" || (value == "C" && !placeHolder)) {
      resetCalc();
    }

    else {
      // decimal or number pressed
      if (value == "." || !isNaN(value)) {
        placeHolder = placeHolder + value;
        calcCurrentInputDiv.innerHTML = placeHolder;

        if (value == ".") {
          disableDecimals();
        } 
      }

      // operation is pressed
      else if (isNaN(value)) {
        if (!placeHolder) {
          calcCurrentInputDiv.innerHTML = 'nothing to do here';
        }

        else if (placeHolder && value == "C") {
          if (placeHolder.charAt(placeHolder.length - 1) == ".") {
            enableDecimals();
          }

          placeHolder = placeHolder.slice(0, -1);
          calcCurrentInputDiv.innerHTML = placeHolder;
        }

        else if (placeHolder && value == "+/-") {
          placeHolder = String(Number(placeHolder) * -1);
          calcCurrentInputDiv.innerHTML = placeHolder;
        }

        else if (placeHolder && operationsArray.includes(value)) {
          if (!firstNum) {
            firstNum = Number(placeHolder);
            chosenOperation = value;

            totalInput = placeHolder + " " + value;

            calcTotalInputDiv.innerHTML = totalInput;

            emptyPlaceHolder();
            enableDecimals();
          }
          
          else if (firstNum) {
            secondNum = Number(placeHolder);
            
            result = operate(chosenOperation, firstNum, secondNum);

            firstNum = result;
            chosenOperation = value;

            totalInput = String(result) + " " + chosenOperation;

            calcTotalInputDiv.innerHTML = totalInput;

            emptyPlaceHolder();
            enableDecimals();
          }
        }

        else if (placeHolder && value == "=") {
          secondNum = Number(placeHolder);

          result = operate(chosenOperation, firstNum, secondNum);

          totalInput = String(firstNum) + " " + chosenOperation + " " + String(secondNum) + " = " + result;

          calcTotalInputDiv.innerHTML = totalInput;
          calcCurrentInputDiv.innerHTML = result;

          if (String(result).indexOf('.') !== -1) disableDecimals();
          else enableDecimals();

          placeHolder = result;
          firstNum = '';
          secondNum = '';
          chosenOperation = '';
        }
      }
    }
  })
}
