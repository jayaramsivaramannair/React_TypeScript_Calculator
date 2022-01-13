import { setUncaughtExceptionCaptureCallback } from 'node:process';
import React from 'react';

interface buttonProps {
  button : string
  click: string
  key : number
  operations: string[]
  setClick: React.Dispatch<React.SetStateAction<string>>
  setResult: React.Dispatch<React.SetStateAction<number>>
  setOperations: React.Dispatch<React.SetStateAction<string[]>>
}



//Button is a functional component which deals with buttonProps
const Button: React.FC<buttonProps> = ({button, setResult, setOperations, operations, setClick}) => {

  const performCalculations = () : number => {
    let calculation = 0
    let firstNumber = 0
    let operator = ""
    let secondNumber = 0
    //watches for negative number
    let negation = false

    //watches for operation
    let receivedOperation = false

    for(let i = 0; i < operations.length; i++) {
      //If the first button clicked is division or multiplication then set the result to 0 as operation is invalid
      if (i === 0 && (operations[i] === "/" || operations[i] === "x")) {
        calculation = -1
        break
      }

      if(operations[i] === "x" || operations[i] === "/" || operations[i] === "+") {
        if(!receivedOperation) {
          operator = operations[i]
        }
      }

      
    }

    return calculation
  }

  const clickHandlerFunction = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
    if (button === 'AC') {
      setClick("0")
      setOperations([])
      return 
    }

    event.preventDefault();
    

    if (button === "=") {
      setClick(performCalculations().toString())
      setOperations([...operations, button, performCalculations().toString()])
      return
    }
    setOperations([...operations, button])
    setClick(button)
  }
  return (
    <div className ={`button button-${button}`} onClick={clickHandlerFunction}>
      {button}
    </div>
  )
}

export default Button;