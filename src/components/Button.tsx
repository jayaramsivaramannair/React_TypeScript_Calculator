import React from 'react';


interface buttonProps {
  button : string
  key : number
}

const Button = ({button}: buttonProps) => {
  return (
    <div className ={`button button-`}>
      {`b-${button}`}
    </div>
  )


}

export default Button;