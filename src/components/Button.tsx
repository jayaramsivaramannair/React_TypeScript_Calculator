import React from 'react';

interface buttonProps {
  button : string
  key : number
  operations: string[]
  setResult: React.Dispatch<React.SetStateAction<number>>
  setOperations: React.Dispatch<React.SetStateAction<string[]>>
}

//Button is a functional component which deals with buttonProps
const Button: React.FC<buttonProps> = ({button, setResult, setOperations, operations}) => {

  const clickHandlerFunction = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
    event.preventDefault();
    console.log(event.currentTarget.firstChild?.textContent)
    setOperations([...operations, button])
  }
  return (
    <div className ={`button button-${button}`} onClick={clickHandlerFunction}>
      {button}
    </div>
  )
}

export default Button;