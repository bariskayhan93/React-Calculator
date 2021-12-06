import React, { useState } from "react";
import ReactDOM from "react-dom";
import Big from "big.js";
import "./index.css";

function App() {
  const [rechner, setRechner] = useState({
    total: "0",
    next: null,
    operation: null,
  });

  const operate = (total, next, operation) => {
    const bigNumberOne = Number(total) ? Big(Number(total)) : null;
    const bigNumberTwo = Number(next) ? Big(Number(next)) : null;
    switch (operation) {
      case "add":
        return bigNumberOne.plus(bigNumberTwo).toString();
      case "subtract":
        return bigNumberOne.minus(bigNumberTwo).toString();
      case "multiply":
        return bigNumberOne.times(bigNumberTwo).toString();
      case "divide":
        try {
          bigNumberOne.div(bigNumberTwo);
          return (
            Math.round(bigNumberOne.div(bigNumberTwo) * 1000000.0) /
            (1000000.0).toString()
          );
        } catch (err) {
          console.log(err)
          return "Error, Division by 0 Forbidden";
          
        }
      default:
        return "0";
    }
  };

  const { total, next } = rechner;

  const handleClick = (e) => {
    let { total, next, operation } = rechner;
    
    switch (e.target.id) {
      case "zero":
        if (rechner.next === null) {
          rechner.next = "";
        } else if (rechner.next === "0") {
          rechner.next = "0";
        } else {
          rechner.next += "0";
        }
        break;
      case "one":
        while (rechner.next === null) {
          rechner.next = "";
        }
        rechner.next += "1";
        break;
      case "two":
        while (rechner.next === null) {
          rechner.next = "";
        }
        rechner.next += "2";
        break;
      case "three":
        while (rechner.next === null) {
          rechner.next = "";
        }
        rechner.next += "3";
        break;
      case "four":
        while (rechner.next === null) {
          rechner.next = "";
        }
        rechner.next += "4";
        break;
      case "five":
        while (rechner.next === null) {
          rechner.next = "";
        }
        rechner.next += "5";
        break;
      case "six":
        while (rechner.next === null) {
          rechner.next = "";
        }
        rechner.next += "6";
        break;
      case "seven":
        while (rechner.next === null) {
          rechner.next = "";
        }
        rechner.next += "7";
        break;
      case "eight":
        while (rechner.next === null) {
          rechner.next = "";
        }
        rechner.next += "8";
        break;
      case "nine":
        while (rechner.next === null) {
          rechner.next = "";
        }
        rechner.next += "9";
        break;
      case "decimal":
        if (rechner.next === null) {
          rechner.next = "";
        } else if (rechner.next === ".") {
          rechner.next = ".";
        } else if (rechner.next.indexOf(".") === -1) {
          rechner.next += ".";
        }
        break;
      case "subtract":
      case "add":
      case "multiply":
      case "divide":
        console.log(e.target.id)
        if (rechner.next !== null && rechner.operation !== null&&e.target.id!=="subtract") {
          if(rechner.next.indexOf("-")!==-1){
            rechner.operation = e.target.id;
            return rechner.next=null;
          }
          rechner.total = operate(total, next, operation);
          rechner.next = null;
          rechner.operation = null;
        }
        if (rechner.next !== null && rechner.operation !== null&&e.target.id==="subtract") {
          if(rechner.next.indexOf("-")!==-1){
            return rechner.next=null;
          }
          rechner.total = operate(total, next, operation);
          rechner.operation = e.target.id;
          rechner.next = null;
          rechner.operation = null;
        }
        if (rechner.next === null&&rechner.operation!==null&&e.target.id==="subtract") {
          while (rechner.next === null) {
            rechner.next = "";
          }
          rechner.next += "-";
        }
        while (rechner.next !== null&&rechner.operation===null&&e.target.id!=="subtract") {
          rechner.total = rechner.next;
          rechner.next = null;
        }
        while (rechner.next !== null&&e.target.id==="subtract"&&rechner.total === '0') {
          rechner.total = rechner.next;
          rechner.next = null;
        }
        if (rechner.next == null || rechner.operation == null) {
          rechner.operation = e.target.id;
        }
        break;
      case "equals":
        if (rechner.total && !rechner.next) {
          const result = rechner.total;
          rechner.total = result;
        }
        if (!rechner.total && !rechner.next) {
          rechner.total = "0";
        }
        if (rechner.total && rechner.next && rechner.operation) {
          rechner.total = operate(total, next, operation);
          rechner.next = null;
          rechner.operation = null;
        }
        break;
      case "clear":
        setRechner({});
        rechner.next = null;
        rechner.total = "0";
        rechner.operation = null;
        break;
      default:
        return;
    }
    setRechner({ ...rechner });
    console.log(rechner);
    return { total, next, operation };
  };

  const result = next ? next && next.toString() : total && total.toString();
  return (
    <>
    
      <div id="numbers">
      <div id="display">
          <h2>{String(result)}</h2>
        </div>
        <ul>
          <li>
            <button onClick={handleClick} id="one">
              1
            </button>
            <button onClick={handleClick} id="two">
              2
            </button>
            <button onClick={handleClick} id="three">
              3
            </button>
          </li>
          <li>
            <button onClick={handleClick} id="four">
              4
            </button>
            <button onClick={handleClick} id="five">
              5
            </button>
            <button onClick={handleClick} id="six">
              6
            </button>
          </li>
          <li>
            <button onClick={handleClick} id="seven">
              7
            </button>
            <button onClick={handleClick} id="eight">
              8
            </button>
            <button onClick={handleClick} id="nine">
              9
            </button>
          </li>
          <li>
            <button onClick={handleClick} id="zero">
              0
            </button>
            <button onClick={handleClick} id="decimal">
              .
            </button>
          </li>
        </ul>

      </div>
      <div className="controllers">
        <button onClick={handleClick} id="equals">
          =
        </button>
        <button onClick={handleClick} id="add">
          +
        </button>
        <button onClick={handleClick} id="subtract">
          -
        </button>
        <button onClick={handleClick} id="multiply">
          *
        </button>
        <button onClick={handleClick} id="divide">
          /
        </button>
        <button onClick={handleClick} id="clear">
          AC
        </button>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("calculator"));
