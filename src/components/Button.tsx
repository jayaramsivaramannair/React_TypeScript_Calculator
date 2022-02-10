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
  generateClassName(keyValue: string) : string
  setOperations: React.Dispatch<React.SetStateAction<string[]>>
}



//Button is a functional component which deals with buttonProps
const Button: React.FC<buttonProps> = (
  {button, 
    setOperations, 
    operations, 
    setClick, 
    click, 
    intermediate, 
    setIntermediate,
    generateClassName}) => {

  const performCalculations = (clicked: string) => {
    //Check if the number clicked is a number or decimal
    if(!isNaN(parseInt(clicked)) || clicked === ".") {
      //if the first number is not received yet, then keep adding to it
      if(!intermediate.firstNumberReceived) {
        setIntermediate((intermediate) => {
          return {
            ...intermediate,
            firstNumber: intermediate.firstNumber + clicked
          }
        })
      //Check if the second number is received or not
      } else if (!intermediate.secondNumberReceived) {
        setIntermediate((intermediate) => {
          return {
            ...intermediate,
            secondNumber: intermediate.secondNumber + clicked
          }
        })
      } //Check for negative sign for the first number
    } else if (clicked === "-" && intermediate.firstNumber === "") {
      setIntermediate((intermediate) => {
        return {
          ...intermediate,
          firstNumber: clicked
        }
      })
      // Check for negative sign for the second number
    } else if (clicked === "-" && intermediate.secondNumber === "" && intermediate.operatorReceived) {
      setIntermediate((intermediate) => {
        return {
          ...intermediate,
          secondNumber: clicked
        }
      })
      //If the button clicked is an operator
    } else if (clicked === "+" || clicked === "-" || clicked === "x" || clicked === "/") {
      //If the operator has not been already received
      if(!intermediate.operatorReceived) {
        setIntermediate((intermediate) => {
          return {
            ...intermediate,
            operator: clicked,
            firstNumberReceived: true, 
            operatorReceived: true
          }
        })
        //if the operator has already been received but the second Number is still not set then consider the recently entered operator
      }  else if (intermediate.secondNumber === "") {
        setIntermediate((intermediate) => {
          return {
            ...intermediate, 
            operator: clicked
          }
        })
        //Once the operator has been received then flip the boolean for secondNumberReceived so that calculation can proceed
      } else {
        /*
        setIntermediate((intermediate) => {
          return {
            ...intermediate, 
            secondNumberReceived: true,
          }
        })
        */
        intermediate.secondNumberReceived = true
      } //Check for the equal sign being clicked
    } else if (clicked === "=" && intermediate.firstNumberReceived && intermediate.operatorReceived && intermediate.secondNumber !== "") {
      /*
      setIntermediate((intermediate) => {
        return {
          ...intermediate,
          secondNumberReceived: true
        }
      })
      */
      intermediate.secondNumberReceived = true
    }

    if(intermediate.firstNumberReceived && intermediate.secondNumberReceived && intermediate.operatorReceived) {
      switch(intermediate.operator) {
        case "+":
          setClick(String((parseFloat(intermediate.firstNumber) + parseFloat(intermediate.secondNumber)).toFixed(4)))
          setIntermediate((intermediate) => {
            return {
              ...intermediate,
              firstNumber: String(parseFloat(intermediate.firstNumber) + parseFloat(intermediate.secondNumber))
            }
          })
          break
        case "-":
          setClick(String((parseFloat(intermediate.firstNumber) - parseFloat(intermediate.secondNumber)).toFixed(4)))
          setIntermediate((intermediate) => {
            return {
              ...intermediate,
              firstNumber: String(parseFloat(intermediate.firstNumber) - parseFloat(intermediate.secondNumber))
            }
          })
          break
        case "/":
          setClick(String((parseFloat(intermediate.firstNumber) / parseFloat(intermediate.secondNumber)).toFixed(4)))
          setIntermediate((intermediate) => {
            return {
              ...intermediate,
              firstNumber: String(parseFloat(intermediate.firstNumber) / parseFloat(intermediate.secondNumber))
            }
          })
          break
        case "x": 
          setClick(String((parseFloat(intermediate.firstNumber) * parseFloat(intermediate.secondNumber)).toFixed(4)))
          setIntermediate((intermediate) => {
            return {
              ...intermediate,
              firstNumber: String(parseFloat(intermediate.firstNumber) * parseFloat(intermediate.secondNumber))
            }
          })
          break
      }
      console.log(intermediate)
      setIntermediate((intermediate) => {
        return {
            ...intermediate,
            firstNumberReceived: true,
            secondNumber: "",
            secondNumberReceived: false,
            operatorReceived: (clicked !== "=") ? true: false,
            operator: (clicked !== "=") ? clicked : "",
        }
      })
      return 
    }
    console.log(intermediate)
    return 
  }

  const clickHandlerFunction = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {

    event.preventDefault();

    //Check if the first button in a sequence of opearations is invalid or not
    if(operations.length === 0 && (button === 'x' || button === "/")) {
      setOperations([]) //Set the array to be an empty array if the operations are invalid
      setClick("0")
      console.log(operations)
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
    <div id={`${generateClassName(button)}`}className ={`button button-${button}`} onClick={clickHandlerFunction}>
      {button}
    </div>
  )
}

export default Button;