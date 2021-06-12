
"use strict";

var input = document.getElementById('input'),
number = document.querySelectorAll('.numbers div'),
operator = document.querySelectorAll('.operators div'),
result = document.getElementById('result'),
clear = document.getElementById('clear'),
resultDisplayed = false;

// adding click handlers to number button
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(e) {
        // storing current input string and its last character in variables
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];
        // if result is not displayed just keep adding
        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML; 
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "x" || lastChar === "/") {
            // if the result is currently displayed and user pressed an operator
            // we need to clear the input string and add the new input to start thr operation
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        } else {
            // if result is currently displayed and user pressed a number
            // we need clear the input string and add tghe new input to start the new operation
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// adding click handles to number buttons
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function(e) {
        // storing current input string and its last character in variables
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];
        // if last character enteres is an operator replace it with the currently placed one
        if (lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "/") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            // if first key pressed is an operator dont do anything
            console.log("enter a number first");
        } else {
            // add the operator pressed to the input
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// onclick of equal button
result.addEventListener("click", function() {
    // string that will be processing 
    var inputString = input.innerHTML;

    // forming an array of numbers
    var numbers = inputString.split(/\+|\-|\x|\//g);

    // forming an array of operators
    var operators = inputString.replace(/[0-9]|\./g,"").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");

    // now we are looping through the array and doing one operation at a time
    // first divide, then multiply, then substract, then add
    // as we move, we'll ulter the original numbers and operators array
    // the final elemeny remaiing in the array will be the output

    var divide = operators.indexOf("/");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("/");

    }
var multiply = operators.indexOf('x');
while (multiply != -1) {
     numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
     operators.splice(multiply, 1);
     multiply = operators.indexOf('x');
}
var substract = operators.indexOf('-');
while (substract != -1) {
     numbers.splice(substract, 2, numbers[substract] - numbers[substract + 1]);
     operators.splice(substract, 1);
     substract = operators.indexOf('-');
}
var add = operators.indexOf('+');
while (add != -1) {
    // use parsefloat to avois it resulting in string concatenation
     numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
     operators.splice(add, 1);
     add = operators.indexOf('+');
}

input.innerHTML = numbers[0]; 
// displaying the output

resultDisplayed = true;
// turning flag of result is displayed
});

// claring the input on press clear
clear.addEventListener("click", function() {
input.innerHTML = "";
})