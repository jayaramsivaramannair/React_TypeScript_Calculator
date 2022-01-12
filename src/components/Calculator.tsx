import React from 'react';
import Button from './Button';
const Calculator = () => {
  const buttonKeys = ['AC', '/', 'x', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '0', '.', '=']

  const renderButtonList = (): JSX.Element[] => {
    return buttonKeys.map((button, idx) => {
      return <Button key={idx} button={button}/>
    })
  }
  
  return (
    <div className="shell">
      <div className="display">0</div>
      <div className="buttons">
        {renderButtonList()}
      </div>
    </div>
  )

}

export default Calculator;