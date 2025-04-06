import { Dispatch, SetStateAction, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";

interface RecentProp {
  allProblems: string[][];
  setRecentData: React.Dispatch<SetStateAction<string[]>>;
  changeRecent: React.MutableRefObject<boolean>;
  setAllProblems: Dispatch<SetStateAction<string[][]>>;
}

const AiRecent = ({
  allProblems,
  setRecentData,
  changeRecent,
  setAllProblems,
}: RecentProp) => {
  const [onHover, setHover] = useState(false);
  const showedit = useRef<null | number>();

  function removeNthElement(arr: string[][], n: number) {
    if (n >= 0 && n < arr.length) {
      arr.splice(n, 1);
    }
    return arr;
  }

  const deleteFunction = (index: number) => {
    const tempArray = removeNthElement(allProblems, index);
    console.log("tempArray", tempArray);
    setAllProblems(tempArray);
    localStorage.setItem("allProblems", JSON.stringify(tempArray));
  };

  return (
    <div className="flex-1 h-full overflow-auto no-scrollbar">
      <div className="font-roboto text-btn-orange font-medium text-xl m-2 ml-5 mt-3 mb-5">
        Recent
      </div>
      <div>
        {allProblems.map((item, index) => (
          <div
            key={index}
            className=" relative text-white font-roboto p-2 border-b border-blue-300 m-2 rounded-lg text-lg my-4 hover:border h-11 leading-relaxed overflow-hidden "
            onMouseEnter={() => {
              setHover(true), (showedit.current = index);
            }}
            onMouseLeave={() => {
              setHover(false), (showedit.current = null);
            }}
            onClick={() => {
              (changeRecent.current = true), setRecentData(item);
            }}
          >
            {item[0][0]}
            <div className="absolute  top-0 right-0  h-full flex z-10">
              <div className="h-full w-20  bg-gradient-to-r from-[#2a2a2c2e] via-[#2a2a2cdd] to-[#2a2a2c] "></div>
              {onHover && showedit.current == index && (
                <motion.div
                  className="text-white h-full bg-btn-gray flex justify-center items-center space-x-4"
                  initial={{ width: "10px" }}
                  animate={{ width: onHover ? "80px" : "10px" }}
                >
                  <MdOutlineModeEdit />
                  <IoTrashOutline
                    onClick={(event) => {
                      deleteFunction(index);
                      event.stopPropagation(); // Prevent the click from propagating to the parent
                    }}
                  />
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiRecent;
