
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
    return buttonKeys.map((button: string, idx: number) => {
      return <Button key={idx} button={button}
              click={click}
              setClick={setClick}
              setOperations={setOperations} 
              generateClassName={generateClassName}
              operations={operations}
              intermediate={intermediate}
              setIntermediate={setIntermediate}/>
              
    })
  }

  const displayOperations = (): string => {
    return operations.join(" ");
  }

  const generateClassName = (keyValue: string) : string => {
      let identifier = ''
      switch(keyValue) {
        case 'AC':
          identifier = 'clear'
          break
        case '/':
          identifier = 'divide'
          break
        case '+':
          identifier = 'add'
          break
          
        case '-':
          identifier = 'subtract'
          break
        case 'x':
          identifier = 'multiply'
          break
        case '0':
          identifier = 'zero'
          break
        case '9':
          identifier = 'nine'
          break
        case '8':
          identifier = 'eight'
          break
        case '7':
          identifier = 'seven'
          break
        case '6':
          identifier = 'six'
          break
        case '5':
          identifier = 'five'
          break
        case '4':
          identifier = 'four'
          break
        case '3':
          identifier = 'three'
          break
        case '2':
          identifier = 'two'
          break
        case '1':
          identifier = 'one'
          break
        case '.':
          identifier = 'decimal'
          break
      }

      return identifier
  }
  
  return (
    <div className="shell">
      <div className="display display-operations">{displayOperations()}</div>
      <div id="display" className="display-results">{click}</div>
      <div className="buttons">
        {renderButtonList()}
      </div>
    </div>
  )

}

export default Calculator;