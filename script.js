function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return Math.round(10*a/b) / 10;
}

function operate(a,b,op){
    if (op == '+'){
       return add(a,b);
    }
    else if (op == '-'){
        return subtract(a,b);
    }
    else if(op == '*'){
        return multiply(a,b);
    }
    else if (op == '/'){
        if (b == 0){
            return "Don't do that!"
        }
        return divide(a,b);
    }
}

const display = document.querySelector(".txt");
const blocks = document.querySelectorAll(".block");

var displaystring = "";

var operands = [];
var operator = "";

function typedigit(dig){
    displaystring += dig;
    display.textContent = displaystring;
}

function insertdot(){
    if (display.textContent.indexOf(".") < 0){
        displaystring += ".";
        display.textContent = displaystring;
    }
}

function deleteone(){
    displaystring = displaystring.slice(0,-1);
    display.textContent = displaystring;
}

function plusminus(){
    if (display.textContent.startsWith("-")){
        displaystring = display.textContent.slice(1);
    }
    else{
        displaystring = "-" + display.textContent;
    }
    display.textContent = displaystring;
}

function clearall(){
    displaystring = "";
    operator = "";
    while (operands.length){
        operands.pop();
    }
    display.textContent = displaystring;
}

function activateop(opr){
    operands.push(parseFloat(display.textContent));
    if (operands.length == 2){
        var res1 = operate(operands[0],operands[1],operator);
        displaystring = res1.toString();
        display.textContent = displaystring;
        displaystring = "";
        operands.pop();
        operands.pop();
        operands.push(res1);
    }
    else{
        displaystring = "";
        display.textContent = opr;
    }
    operator = opr;
}

function clickonequals(){
    operands.push(parseFloat(displaystring));
    if (operands.length == 2){
        displaystring = operate(operands[0],operands[1],operator).toString();
        display.textContent = displaystring;
        displaystring = "";
        operator = "";
        operands.pop();
        operands.pop();
    }
}

blocks.forEach(function(block){
    block.addEventListener('click', function(e){
        if (parseInt(e.target.textContent) >= 0 ){
            typedigit(e.target.textContent.toString());
        }
        else if (e.target.textContent == '.'){
            insertdot();
        }
        else if (e.target.textContent == "<"){
            deleteone();
        }
        else if (e.target.textContent == "±"){
            plusminus();
        }
        else if (e.target.textContent == 'CA'){
            clearall();
        }
        else if (e.target.textContent != '='){
            activateop(e.target.textContent);
        } else if (e.target.textContent == '='){
            clickonequals();
        }
    })
});

document.addEventListener('keydown', function(event) {
    if (event.repeat) return;
    switch (event.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            typedigit(Number(event.key));
            break;
        case '.':
        case ',':
            insertdot();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            activateop(event.key);
            break;
        case '=':
        case 'Enter':
            clickonequals();
            break;
        case 'Delete':
            clearall();
            break;
        case 'Backspace':
            deleteone();
            break;
    }
});