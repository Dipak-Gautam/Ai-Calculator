import { Dispatch, SetStateAction } from "react";

interface RecentProp {
  allProblems: string[][];
  setIndex: Dispatch<SetStateAction<number | undefined>>;
}

const Recent = ({ allProblems, setIndex }: RecentProp) => {
  return (
    <div className="flex-1  h-full overflow-auto no-scrollbar">
      <div className="font-roboto text-btn-orange font-medium text-xl m-2 ml-5 mt-3">
        Recent
      </div>
      <div className="">
        {allProblems.map((item, index) => (
          <div
            className="p-3 sm:px-5 border-b border-slate-700 hover:bg-[#474646]"
            onClick={() => setIndex(index)}
          >
            <div className="flex flex-col flex-1 justify-end items-end">
              <p className="font-roboto text-[#5c5b5b] font-semibold">
                {item[2]}
              </p>
              <p className="font-roboto text-white font-semibold text-xl">
                {item[1]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;
