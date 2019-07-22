const body = document.querySelector("body");

const modeSwitchButton = document.querySelector("#modeSwitch");
modeSwitchButton.addEventListener("click", modeSwitch);

const output = document.querySelector("#output");

const numbers = document.querySelectorAll(".number");
numbers.forEach((x)=>x.addEventListener("click", pressNumber));
const operators = document.querySelectorAll(".operator");

const plusButton = document.querySelector("#plus");
plusButton.addEventListener("click", operation);
const minusButton = document.querySelector("#minus");
minusButton.addEventListener("click", operation);
const multiplyButton = document.querySelector("#multiply");
multiplyButton.addEventListener("click", operation);
const divideButton = document.querySelector("#divide");
divideButton.addEventListener("click", operation);
const equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", equal);
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clear);
const floatingPointButton = document.querySelector(".floatingPoint");
floatingPointButton.addEventListener("click", floatingPoint);

document.addEventListener("keydown", keyDown);

let memory = []; // previous number and operator pushed into memory by pressing an operator
let tempMemory = ""; // current number pressed
let currentOperation = ""; // this check stops operators to be entered after one another, memory can only be number - operator - number
let floatingPointAvailable = true;

function pressNumber(e) {
  if (currentOperation != "equal") {

    currentOperation = "number";

    output.innerHTML += e.target.innerHTML;
    tempMemory += e.target.innerHTML;
  }

  console.log("Temp Memory: " + tempMemory);
  console.log("Memory: " + memory);
} // EOF

function operation(e) {
  if (currentOperation != "operator") {

    if (memory != "" || tempMemory != "") { // to disable starting with an operator
      currentOperation = "operator";
      floatingPointAvailable = true;
      output.innerHTML += e.target.innerHTML;

      if (tempMemory != "") { memory.push(tempMemory); }// to avoid pushing an empty element into memory after an equal operation was done
      memory.push(e.target.innerHTML);

      tempMemory = "";

      console.log("Temp Memory: " + tempMemory);
      console.log("Memory: " + memory);
    }
  }
} // EOF

function equal() {
  // only runs if there is something in the memory and the tempMemory = two numbers and an operator
  if (memory != "" && tempMemory != "") {

    currentOperation = "equal"; // to disable concatenating numbers to the result

    memory.push(tempMemory);
    tempMemory = "";

    // 3 different for loops for operator precedence
    for (let i=0; i<memory.length; i++) {
      if (memory[i] == "*") {
        memory[i] = Number(memory[i-1]) * Number(memory[i+1]);
        memory.splice((i-1),1);
        i--;
        memory.splice((i+1),1);
        i--;
      }
    } // end of * for

    for (let i=0; i<memory.length; i++) {
      if (memory[i] == "/") {
        memory[i] = Number(memory[i-1]) / Number(memory[i+1]);
        memory.splice((i-1),1);
        i--;
        memory.splice((i+1),1);
        i--;
      }
    } // end of / for

    for (let i=0; i<memory.length; i++) {
      if (memory[i] == "+") {
        memory[i] = Number(memory[i-1]) + Number(memory[i+1]);
        memory.splice((i-1),1);
        i--;
        memory.splice((i+1),1);
        i--;
      }
      else if (memory[i] == "-") {
        memory[i] = Number(memory[i-1]) - Number(memory[i+1]);
        memory.splice((i-1),1);
        i--;
        memory.splice((i+1),1);
        i--;
      }
    } // end of + - for

    if (memory == Infinity) {
      output.innerHTML = "Division by 0, bad.";
    }

    else {
      output.innerHTML = Number(memory);
    }

    console.log("Equal Temp Memory: " + tempMemory);
    console.log("Equal Memory: " + memory);
    console.log("Array: " + Array.isArray(memory));
  } // end of if
} // EOF

function clear() {
  output.innerHTML = "";
  memory = [];
  tempMemory = "";
  floatingPointAvailable = true;
  currentOperation = "operator";

  console.log("Clear Temp Memory: " + tempMemory);
  console.log("Clear Memory: " + memory);
} // EOF

function keyDown(e) {
  console.log(e.key);
  switch (e.key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      currentOperation = "number";
      output.innerHTML += e.key;
      tempMemory += Number(e.key);
      numbers.forEach((x)=>  { if (x.innerHTML == e.key) { animateSelected(x) } });
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      if (currentOperation != "operator") {
        if (memory != "" || tempMemory != "") {
          currentOperation = "operator";
          floatingPointAvailable = true;
          output.innerHTML += e.key;
          if (tempMemory != "") { memory.push(tempMemory); } // to avoid pushing an empty element into memory after an equal operation was done
          memory.push(e.key);
          tempMemory = "";    
          operators.forEach((x)=> { if(x.dataset.operator == e.key) { animateSelected(x) } });
        }
      }
      break;
    case "Enter":
      equal();
      animateSelected(document.querySelector("#equal"));
      break;
    case "Escape":
      clear();
      animateSelected(document.querySelector("#clear"));
      break;
    case ".":
      if (floatingPointAvailable == true) {
        floatingPointAvailable = false;
        output.innerHTML += e.key;
        tempMemory += e.key;
        animateSelected(floatingPointButton);
      }
      break;
    case "Backspace":
      if (currentOperation == "number") { floatingPointAvailable = true; } 
      tempMemory = "";
      currentOperation = "operator";
      output.innerHTML = memory.join("");
      break;
  } // end of switch
} // EOF

function animateSelected(x) {
  x.classList.add("selected");
  let timer = window.setTimeout(function() { x.classList.remove("selected") }, 500);
} // EOF

function modeSwitch() {
  body.classList.toggle("bodyDark");
  output.classList.toggle("outputDark");
  floatingPointButton.classList.toggle("floatingPointDark");
  numbers.forEach((x)=>x.classList.toggle("numberDark"));
  operators.forEach((x)=>x.classList.toggle("operatorDark"));
  modeSwitchButton.classList.toggle("modeSwitchDark");
} // EOF

function floatingPoint(e) {
  if (floatingPointAvailable == true && tempMemory != "") {
    floatingPointAvailable = false;
    currentOperation = "operator";
    output.innerHTML += e.target.innerHTML;
    tempMemory += e.target.innerHTML;
  }
} // EOF