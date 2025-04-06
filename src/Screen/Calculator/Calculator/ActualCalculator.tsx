import { useEffect, useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeyWindow from "./KeyWindow";

export interface ActualCalculatorProp {
  handleAddRecent: (
    expression: string,
    result: string,
    displayEXP: string
  ) => void;
  firstProblem: React.MutableRefObject<boolean>;
  allProblems: string[][];
  index: number | undefined;
}

const ActualCalculator = ({
  handleAddRecent,
  firstProblem,
  allProblems,
  index,
}: ActualCalculatorProp) => {
  const [expression, setExpression] = useState<any>("");
  const [displayEXP, setDisplayEXP] = useState<any>("");
  const [result, setResult] = useState("0");

  const sciFunc = {
    sin: "Math.sin(",
    cos: "Math.cos(",
    tan: "Math.tan(",
    ln: "Math.log(",
    log: "Math.log10(",
    π: "Math.PI",
    e: "Math.E",
    "^": "**",
    "√": "Math.sqrt(",
    "^3": "**3",
    "x²": "**2",
    "∛": "Math.cbrt(",
    "e^": "Math.exp(",
    "sin⁻¹": "Math.asin(",
    "cos⁻¹": "Math.acos(",
    "tan⁻¹": "Math.atan(",
    abs: "Math.abs(",
    Rnd: "Math.random()",
    ceil: "Math.ceil(",
    floor: "Math.floor(",
  };

  function calcResult() {
    if (expression.length !== 0) {
      try {
        let compute = eval(
          expression +
            ")".repeat(
              (expression.match(/\(/g) || []).length -
                (expression.match(/\)/g) || []).length
            )
        );
        compute = parseFloat(compute.toFixed(4));
        setResult(compute);
        handleAddRecent(expression, compute, displayEXP);
      } catch (error) {
        setResult("An Error Occurred!");
        handleAddRecent(expression, result, displayEXP);
      }
    } else {
      setResult("An Error Occurred!");
      handleAddRecent(expression, result, displayEXP);
    }
  }
  function handleButton(value: any) {
    if (value === "AC") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
      firstProblem.current = false;
    } else if (value === "DEL") {
      setDisplayEXP(displayEXP.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (sciFunc.hasOwnProperty(value)) {
      if (
        [
          "sin",
          "cos",
          "tan",
          "ln",
          "log",
          "√",
          "∛",
          "e^",
          "sin-1",
          "cos-1",
          "tan-1",
          "abs",
          "ceil",
          "floor",
        ].includes(value)
      ) {
        setDisplayEXP(displayEXP + value + "(");
        //@ts-ignore
        setExpression(expression + sciFunc[value]);
      } else if (value === "random") {
        setDisplayEXP(displayEXP + value);
        //@ts-ignore
        setExpression(expression + sciFunc[value]);
      } else if (["x^2", "x^3"].includes(value)) {
        const lastNum = extractLastNum(expression);
        if (lastNum != null) {
          setDisplayEXP(displayEXP + value);
          setExpression(
            //@ts-ignore
            expression.replace(lastNum, `(${lastNum}${sciFunc[value]})`)
          );
        }
      } else {
        setDisplayEXP(displayEXP + value);
        //@ts-ignore
        setExpression(expression + sciFunc[value]);
      }
    } else if (value === "!") {
      const lastNum = extractLastNum(expression);
      if (lastNum != null) {
        const num = parseFloat(lastNum);
        setDisplayEXP(displayEXP + value);
        setExpression(expression.replace(lastNum, factorial(num)));
      }
    } else if (value === "=") {
      calcResult();
    } else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  }

  function factorial(n: any) {
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    return result;
  }

  function extractLastNum(exp: any) {
    const numbers = exp.match(/\d+/g);
    return numbers ? numbers[numbers.length - 1] : null;
  }

  useEffect(() => {
    if (index == undefined) {
      return;
    }
    setExpression(allProblems[index][0]);
    setResult(allProblems[index][1]);
    setDisplayEXP(allProblems[index][2]);
  }, [index]);

  return (
    <div className=" h-full mx-1 md:mx-8 flex  flex-col ">
      <div className="flex flex-1 ">
        <DisplayWindow expression={displayEXP} result={result} />
      </div>
      <div className="h-fit ">
        <KeyWindow handleButton={handleButton} />
      </div>
    </div>
  );
};

export default ActualCalculator;
