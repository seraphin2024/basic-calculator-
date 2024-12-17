var currentInput = "";
var previousInput = "";
var operator = "";
var result = "";
var  memory = 0;





$("button").click(function(){
    playSound();
   $("#"+this.id).fadeOut(50).fadeIn(100);

    const buttonValue = $(this).text();
    handleButtonClick(buttonValue);
});


function playSound()
{
    var audio = new Audio('./click.mp3');
    audio.play();
}

function handleButtonClick(value)
{
    if(!isNaN(value) || value===".")
    {
        handleNumber(value);

    }

    else if(["+","-","x","/"].includes(value))
    {
        handleOperator(value);
    }

    else if(value==="=")
    {
        calculateResult();
    }

    else if(value==="AC")
    {
        clearAll();
    }

    else if(value==="Back")
    {
        handleBackspace();
    }

    //must do this 
    updateScreen();
}


function handleNumber(value)
{
    if(value==="." && currentInput.includes("."))
    {
        return ;
    }

    currentInput += value; //appending the value 
}

function handleOperator(op)
{
    if(currentInput=== "") return ;

    if(previousInput!="") calculateResult();

    operator = op;
    previousInput = currentInput;
    currentInput = "";

}

function calculateResult()
{
    if(previousInput==="" || currentInput==="" || operator==="") return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch(operator)
    {
        case "+" :
            result = num1 + num2 ;
            break;
        case "-":
            result = num1 - num2 ;
            break;

        case "x":
            result = num1 * num2 ;
            break;

        case "/":
             result = num2!==0?num1/num2 : "ERROR" ;
             break;
        default:
            result = "hey its default mode ";
            break;
    }

    previousInput = result.toString();
    currentInput = "";
    operator = "";

}

function handleBackspace()
{
    currentInput = currentInput.slice(0,-1);
}

function clearAll()
{
    currentInput="";
    previousInput="";
    operator="";
    result="";
}

function updateScreen()
{
    var displayvalue = currentInput || previousInput || "0";
    $(".screen h2").text(displayvalue);
}



function handleMemory(value) {
  const num = parseFloat(currentInput || previousInput);
  if (value === 'M+') memory += num;
  if (value === 'M-') memory -= num;
  if (value === 'MR') currentInput = memory.toString();
  updateScreen();
}