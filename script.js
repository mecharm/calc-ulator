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

document.addEventListener("keydown", keyDown);

let memory = []; // previous number and operator pushed into memory by pressing an operator
let tempMemory = ""; // current number pressed

function pressNumber(e) {
  output.innerHTML += e.target.innerHTML;

  tempMemory += e.target.innerHTML;

  console.log("Temp Memory: " + tempMemory);
  console.log("Memory: " + memory);
} // EOF

function operation(e) {
  if (memory != "" || tempMemory != "") { // to disable starting with an operator
    output.innerHTML += e.target.innerHTML;

    if (tempMemory != "") { memory.push(tempMemory); }// to avoid pushing an empty element into memory after an equal operation was done
    memory.push(e.target.innerHTML);

    tempMemory = "";

    console.log("Temp Memory: " + tempMemory);
    console.log("Memory: " + memory);
  }
} // EOF

function equal() {
  // only runs if there is something in the memory and the tempMemory = two numbers and an operator
  if (memory != "" && tempMemory != "") {
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

    output.innerHTML = memory;

    console.log("Equal Temp Memory: " + tempMemory);
    console.log("Equal Memory: " + memory);
    console.log("Array: " + Array.isArray(memory));
  } // end of if
} // EOF

function clear() {
  output.innerHTML = "";
  memory = [];
  tempMemory = "";

  console.log("Clear Temp Memory: " + tempMemory);
  console.log("Clear Memory: " + memory);
} // EOF

function keyDown (e) {
  console.log(e.key);
  switch (e.key) {
    case "1":
      output.innerHTML += e.key;
      tempMemory += Number(e.key);
      numbers.forEach((x)=>  { if (x.innerHTML == e.key) { animateSelected(x) } });
      console.log("Temp Memory: " + tempMemory);
      console.log("Memory: " + memory);
      break;
    case "2":
      output.innerHTML += e.key;
      tempMemory += Number(e.key);
      numbers.forEach((x)=>  { if (x.innerHTML == e.key) { animateSelected(x) } });
      break;
    case "3":
      output.innerHTML += e.key;
      tempMemory += Number(e.key);
      numbers.forEach((x)=>  { if (x.innerHTML == e.key) { animateSelected(x) } });
      break;
    case "4":
      output.innerHTML += e.key;
      tempMemory += Number(e.key);
      numbers.forEach((x)=>  { if (x.innerHTML == e.key) { animateSelected(x) } });
      break;
    case "5":
      output.innerHTML += e.key;
      tempMemory += Number(e.key);
      numbers.forEach((x)=>  { if (x.innerHTML == e.key) { animateSelected(x) } });
      break;
    case "6":
      output.innerHTML += e.key;
      tempMemory += Number(e.key);
      numbers.forEach((x)=>  { if (x.innerHTML == e.key) { animateSelected(x) } });
      break;
    case "7":
      output.innerHTML += e.key;
      tempMemory += Number(e.key);
      numbers.forEach((x)=>  { if (x.innerHTML == e.key) { animateSelected(x) } });
      break;
    case "8":
      output.innerHTML += e.key;
      tempMemory += Number(e.key);
      numbers.forEach((x)=>  { if (x.innerHTML == e.key) { animateSelected(x) } });
      break;
    case "9":
      output.innerHTML += e.key;
      tempMemory += Number(e.key);
      numbers.forEach((x)=>  { if (x.innerHTML == e.key) { animateSelected(x) } });
      break;
    case "0":
      output.innerHTML += e.key;
      tempMemory += Number(e.key);
      numbers.forEach((x)=>  { if (x.innerHTML == e.key) { animateSelected(x) } });
      break;
    case "+":
      output.innerHTML += e.key;
      if (tempMemory != "") { memory.push(tempMemory); } // to avoid pushing an empty element into memory after an equal operation was done
      memory.push(e.key);
      tempMemory = "";      
      animateSelected(document.querySelector("#plus"));
      console.log("Temp Memory: " + tempMemory);
      console.log("Memory: " + memory);
      break;
    case "-":
      output.innerHTML += e.key;
      if (tempMemory != "") { memory.push(tempMemory); } // to avoid pushing an empty element into memory after an equal operation was done
      memory.push(e.key);
      tempMemory = "";      
      animateSelected(document.querySelector("#minus"));
      break;
    case "*":
      output.innerHTML += e.key;
      if (tempMemory != "") { memory.push(tempMemory); } // to avoid pushing an empty element into memory after an equal operation was done
      memory.push(e.key);
      tempMemory = "";      
      animateSelected(document.querySelector("#multiply"));
      break;
    case "/":
      output.innerHTML += e.key;
      if (tempMemory != "") { memory.push(tempMemory); } // to avoid pushing an empty element into memory after an equal operation was done
      memory.push(e.key);
      tempMemory = "";      
      animateSelected(document.querySelector("#divide"));
      break;
    case "Enter":
      equal();
      animateSelected(document.querySelector("#equal"));
      break;
    case "Escape":
      clear();
      animateSelected(document.querySelector("#clear"));
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
  numbers.forEach((x)=>x.classList.toggle("numberDark"));
  operators.forEach((x)=>x.classList.toggle("operatorDark"));
  modeSwitchButton.classList.toggle("modeSwitchDark");
} // EOF