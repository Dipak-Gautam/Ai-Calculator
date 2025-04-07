import { useEffect, useRef, useState } from "react";
import ActualCalculator from "./Calculator/ActualCalculator";
import Recent from "./Recent/Recent";

const Calculator = () => {
  const [recentData, setRecent] = useState<string[]>([]);
  const [allProblems, setAllProblems] = useState<string[][]>([]);
  const [index, setIndex] = useState<number | undefined>();
  const firstRender = useRef(true);

  const handleAddRecent = (
    expression: string,
    result: string,
    displayEXP: string
  ) => {
    setRecent([expression, result, displayEXP]);
  };

  const setLocalData = () => {
    localStorage.setItem("allCalc", JSON.stringify(allProblems));
  };

  const getDataLocal = () => {
    const tempData = localStorage.getItem("allCalc");
    if (tempData == null) {
      setAllProblems([]);
    } else {
      const problems = JSON.parse(tempData);
      setAllProblems(problems);
    }
  };

  const firstProblem = useRef(false);
  useEffect(() => {
    if (!firstProblem.current) {
      setAllProblems((currentProblem) => [recentData, ...currentProblem]);
      firstProblem.current = true;
    } else {
      setAllProblems((Problems) => [recentData, ...Problems.slice(1)]);
    }
  }, [recentData]);

  useEffect(() => {
    getDataLocal();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setLocalData();
  }, [allProblems]);

  return (
    <div className="bg-primary-black flex-1 pb-16 md:pb-0 p-4 h-[100vh] text-white flex space-x-2 ">
      <div className="hidden lg:flex bg-btn-gray  w-[25%] rounded-xl overflow-hidden md:my-2">
        <Recent allProblems={allProblems} setIndex={setIndex} />
      </div>
      <div className="flex-1 rounded-md overflow-hidden ">
        <ActualCalculator
          handleAddRecent={handleAddRecent}
          firstProblem={firstProblem}
          allProblems={allProblems}
          index={index}
        />
      </div>
    </div>
  );
};

export default Calculator;
