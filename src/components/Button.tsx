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

  const clickHandlerFunction = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {

    event.preventDefault();
    if (button === 'AC') {
      setClick("0")
      setOperations([])
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