import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");
  const et = expression.trim();

const operatorRegEx = /[-+*/]/g;

  const buttonPress = (symbol: string) => {
    //console.log(symbol)
    switch(symbol) {
      case "clear":
        setAnswer("");
        setExpression("0");
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if(/[+*/]/.test(et.charAt(et.length - 1)) && symbol === "-") setExpression(et + " " + symbol + " ");
        else if(operatorRegEx.test(et.charAt(et.length - 1))) {
          if(/[+*/]/.test(et.charAt(et.length - 3)) && symbol !== "-") setExpression(et.substring(0, et.length - 3) + " " + symbol + " ");
          else setExpression(et.substring(0, et.length - 1) + " " + symbol + " ");
        }
        else setExpression(et + " " + symbol + " ");
        break;
      case "=":
        calculate();
        break;
      case "0":
        {
          const lastNumber = et.split(operatorRegEx).pop()?.trim();
          if(lastNumber?.includes('.') || (lastNumber?.charAt(0) !== '0')) setExpression(expression + symbol);
        }
        break;
      case ".":
        {
          const lastNumber = expression.split(operatorRegEx).pop()?.trim();
          if(!lastNumber?.includes('.')) setExpression(expression + symbol);
        }
        break;
      default:
        if(expression.charAt(0) === "0") {
          setExpression(expression.slice(1) + symbol);
        } else {
          setExpression(expression + symbol);
        }
        break;
    }

  }
  const calculate = () => {
    //console.log(et);
    if(et === '') return;
    else if(operatorRegEx.test(et.charAt(0))) setAnswer(eval(answer + et));
    else setAnswer(eval(et));
    setExpression("");
  }

  return (
    <div className="container">
      <div id="calculator">
        <div id="display" style={{textAlign: "right"}}>
          <div id="answer">{answer}</div>
          <div id="expression">{expression}</div>
        </div>
        <button id="clear" onClick={() => buttonPress("clear")} className="red">AC</button>
        <button id="divide" onClick={() => buttonPress("/")} className="light-grey">/</button>
        <button id="multiply" onClick={() => buttonPress("*")} className="light-grey">*</button>
        <button id="seven" onClick={() => buttonPress("7")} className="dark-grey">7</button>
        <button id="eight" onClick={() => buttonPress("8")} className="dark-grey">8</button>
        <button id="nine" onClick={() => buttonPress("9")} className="dark-grey">9</button>
        <button id="subtract" onClick={() => buttonPress("-")} className="light-grey">-</button>
        <button id="four" onClick={() => buttonPress("4")} className="dark-grey">4</button>
        <button id="five" onClick={() => buttonPress("5")} className="dark-grey">5</button>
        <button id="six" onClick={() => buttonPress("6")} className="dark-grey">6</button>
        <button id="add" onClick={() => buttonPress("+")} className="light-grey">+</button>
        <button id="one" onClick={() => buttonPress("1")} className="dark-grey">1</button>
        <button id="two" onClick={() => buttonPress("2")} className="dark-grey">2</button>
        <button id="three" onClick={() => buttonPress("3")} className="dark-grey">3</button>
        <button id="equals" onClick={() => buttonPress("=")} className="blue">=</button>
        <button id="zero" onClick={() => buttonPress("0")} className="dark-grey">0</button>
        <button id="decimal" onClick={() => buttonPress(".")} className="dark-grey">.</button>
      </div>
      <div id="head">Created by <a href="https://github.com/ToriusHeart">ToriusHeart</a></div>
    </div>
  )
}

export default App
