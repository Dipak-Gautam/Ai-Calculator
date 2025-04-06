import React, { useEffect, useRef, useState } from "react";
import AiRecent from "./AiRecent/AiRecent";
import AiEngine from "./AiEngine/AiEngine";

const Ai = () => {
  const [recentData, setRecentData] = useState<string[]>([]);
  const [allProblems, setAllProblems] = useState<string[][]>([]);
  const firstQuestion = useRef(true);
  const changeRecent = useRef(false);
  const firstRender = useRef(true);

  const setDataLocal = () => {
    localStorage.setItem("allProblems", JSON.stringify(allProblems));
  };

  const getDataLocal = () => {
    const tempData = localStorage.getItem("allProblems");
    if (tempData == null) {
      setAllProblems([]);
    } else {
      const problems = JSON.parse(tempData);
      setAllProblems(problems);
    }
  };

  useEffect(() => {
    getDataLocal();
  }, []);

  useEffect(() => {
    if (changeRecent.current) {
      changeRecent.current = false;
      return;
    }
    if (firstQuestion.current && recentData.length == 0) {
      return;
    }
    if (firstQuestion.current) {
      setAllProblems((current) => [recentData, ...current]);
      firstQuestion.current = false;
    } else {
      setAllProblems((current) => [recentData, ...current.slice(1)]);
    }
  }, [recentData]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setDataLocal();
  }, [allProblems]);

  return (
    <div className="bg-primary-black h-[100vh] p-4 w-[100vw]   flex space-x-3">
      <div className="hidden md:flex bg-btn-gray  w-[25%] rounded-xl overflow-hidden md:my-2 h-full">
        <AiRecent
          allProblems={allProblems}
          setRecentData={setRecentData}
          changeRecent={changeRecent}
          setAllProblems={setAllProblems}
        />
      </div>
      <div className="flex-1 rounded">
        <AiEngine
          setRecentData={setRecentData}
          recentData={recentData}
          firstQuestion={firstQuestion}
        />
      </div>
    </div>
  );
};

export default Ai;
