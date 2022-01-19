import React, {useState} from 'react';
import Button from './Button';
const Calculator = () => {
  const buttonKeys = ['AC', '/', 'x', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '0', '.', '=']

  //const [result, setResult] = useState<number>(0);
  const [operations, setOperations] = useState<string []>([]);
  const [intermediate, setIntermediate] = useState({
    firstNumberReceived: false,
    firstNumber : "",
    secondNumberReceived: false,
    secondNumber: "",
    operatorReceived: false,
    operator: ""
  })

  const [click, setClick] = useState<string>("0");

  const renderButtonList = (): JSX.Element[] => {
    return buttonKeys.map((button, idx) => {
      return <Button key={idx} button={button}
              click={click} 
              setClick={setClick}
              setOperations={setOperations} 
              operations={operations}
              intermediate={intermediate}
              setIntermediate={setIntermediate}/>
              
    })
  }

  const displayOperations = (): string => {
    return operations.join(" ");
  }
  
  return (
    <div className="shell">
      <div className="display-operations">{displayOperations()}</div>
      <div className="display-results">{click}</div>
      <div className="buttons">
        {renderButtonList()}
      </div>
    </div>
  )

}

export default Calculator;