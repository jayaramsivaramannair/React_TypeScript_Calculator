import React, {useState} from 'react';
import Button from './Button';
const Calculator = () => {
  const buttonKeys = ['AC', '/', 'x', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '0', '.', '=']

  const [result, setResult] = useState<number>(0);
  const [operations, setOperations] = useState<string []>([]);

  const renderButtonList = (): JSX.Element[] => {
    return buttonKeys.map((button, idx) => {
      return <Button key={idx} button={button} setResult={setResult} setOperations={setOperations} operations={operations}/>
    })
  }

  const displayOperations = (): string => {
    return operations.join(" ");
  }
  
  return (
    <div className="shell">
      <div className="operations">{displayOperations()}</div>
      <div className="display">{result}</div>
      <div className="buttons">
        {renderButtonList()}
      </div>
    </div>
  )

}

export default Calculator;