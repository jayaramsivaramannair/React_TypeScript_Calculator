import { setUncaughtExceptionCaptureCallback } from 'node:process';
import React from 'react';

interface buttonProps {
  button : string
  click: string
  key : number
  operations: string[]
  intermediate: {
    firstNumberReceived: boolean,
    firstNumber : string,
    secondNumberReceived: boolean,
    secondNumber: string,
    operatorReceived: boolean,
    operator: string
  }

  setIntermediate: React.Dispatch<React.SetStateAction<{
    firstNumberReceived: boolean,
    firstNumber : string,
    secondNumberReceived: boolean,
    secondNumber: string,
    operatorReceived: boolean,
    operator: string}>>

  setClick: React.Dispatch<React.SetStateAction<string>>
  setOperations: React.Dispatch<React.SetStateAction<string[]>>
}



//Button is a functional component which deals with buttonProps
const Button: React.FC<buttonProps> = ({button, setOperations, operations, setClick, click, intermediate, setIntermediate}) => {

  const performCalculations = (clicked: string) => {
    //Check if the number clicked is a number or not
    if(!isNaN(parseInt(clicked))) {
      //if the first number is not received yet, then keep adding to it
      if(!intermediate.firstNumberReceived) {
        intermediate.firstNumber = intermediate.firstNumber + clicked 
      //Check if the second number is received or not
      } else if (!intermediate.secondNumberReceived) {
        intermediate.secondNumber = intermediate.secondNumber + clicked
      }
    //If the button clicked is an operator
    } else if (clicked === "+" || clicked === "-" || clicked === "*" || clicked === "/") {
      //If the operator has not been already received
      if(!intermediate.operatorReceived) {
        intermediate.operator = clicked
        intermediate.firstNumberReceived = true
        intermediate.operatorReceived = true
        //if the operator has already been received
      } else {
        intermediate.secondNumberReceived = true
      }
    }

    if(intermediate.firstNumberReceived && intermediate.secondNumberReceived && intermediate.operatorReceived) {
      switch(intermediate.operator) {
        case "+":
          setClick(String(parseFloat(intermediate.firstNumber) + parseFloat(intermediate.secondNumber)))
          intermediate.firstNumber = String(parseFloat(intermediate.firstNumber) + parseFloat(intermediate.secondNumber))
          break
        case "-":
          setClick(String(parseFloat(intermediate.firstNumber) - parseFloat(intermediate.secondNumber)))
          intermediate.firstNumber = String(parseFloat(intermediate.firstNumber) - parseFloat(intermediate.secondNumber))
          break
        case "/":
          setClick(String(parseFloat(intermediate.firstNumber) / parseFloat(intermediate.secondNumber)))
          intermediate.firstNumber = String(parseFloat(intermediate.firstNumber) / parseFloat(intermediate.secondNumber))
          break
        case "x": 
          setClick(String(parseFloat(intermediate.firstNumber) * parseFloat(intermediate.secondNumber)))
          intermediate.firstNumber = String(parseFloat(intermediate.firstNumber) * parseFloat(intermediate.secondNumber))
          break
      }

      
      intermediate.firstNumberReceived = true
      intermediate.operatorReceived = true
      intermediate.operator = clicked
      intermediate.secondNumber = ""
      intermediate.secondNumberReceived = false
      console.log(intermediate)
      return 
    }

    console.log(click)
    return 
  }

  const clickHandlerFunction = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {

    event.preventDefault();

    //Check if the first button in a sequence of opearations is invalid or not
    if(operations[0] === "/" || operations[0] === "x") {
      setOperations([]) //Set the array to be an empty array if the operations are invalid
      setClick("0")
      return  
    }

    //Clear the results
    if (button === 'AC') {
      setClick("0")
      setOperations([])
      setIntermediate({...intermediate, 
        firstNumber: "", 
        secondNumber: "", 
        firstNumberReceived: false, 
        secondNumberReceived: false, 
        operator: "",
        operatorReceived: false,
      })
      return 
    }

    setOperations([...operations, button])
    performCalculations(button)
  }
  return (
    <div className ={`button button-${button}`} onClick={clickHandlerFunction}>
      {button}
    </div>
  )
}

export default Button;