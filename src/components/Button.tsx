import React from 'react';

interface buttonProps {
  button : string
  key : number
}

//Button is a functional component which deals with buttonProps
const Button: React.FC<buttonProps> = ({button}) => {
  return (
    <div className ={`button`}>
      {button}
    </div>
  )
}

export default Button;