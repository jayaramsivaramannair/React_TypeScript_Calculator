import React from 'react';
import Button from './Button';
const Calculator = () => {
  const buttonKeys = ['AC', '/', 'x', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '0', '.', '=']
  
  return (
    <div className="shell">
      <div className="display">0</div>
      <div className="buttons">
        {
          buttonKeys.map((button, idx) => {
            return <Button key={idx} button={button}/>
          })
        }
      </div>
    </div>
  )

}

export default Calculator;