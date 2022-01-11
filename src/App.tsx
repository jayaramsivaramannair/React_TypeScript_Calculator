import React from 'react';
import './App.css';
import Button from './components/Button'

function App() {

  const buttonKeys = ['AC', '/', 'x', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '0', '.', '=']
  return (
    <div className="App">
      <div className="display">0</div>
      <div className="buttons">
        {
          buttonKeys.map((button, idx) => {
            return <Button key={idx} />
          })
        }
      </div>
    </div>
  );
}

export default App;
