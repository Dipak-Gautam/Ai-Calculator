import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { TbSend2 } from "react-icons/tb";
import { motion } from "framer-motion";
import { TbMessageCirclePlus } from "react-icons/tb";
import callerApi from "../../../callableFunction/callerApi";
import { Alert } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";

interface AiEngineProp {
  setRecentData: Dispatch<SetStateAction<string[]>>;
  recentData: string[];
  firstQuestion: React.MutableRefObject<boolean>;
}

const smoothScrollToBottom = (
  ref: React.RefObject<HTMLDivElement>,
  duration: number
) => {
  if (!ref.current) return;
  const start = ref.current.scrollTop;
  const end = ref.current.scrollHeight - ref.current.clientHeight;
  const distance = end - start;
  let startTime: number | null = null;

  const scrollStep = (timestamp: number) => {
    if (ref.current == null) {
      return;
    }
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const percent = Math.min(progress / duration, 1); // Ensure it does not exceed 1
    ref.current.scrollTop = start + percent * distance;

    if (progress < duration) {
      window.requestAnimationFrame(scrollStep); // Continue the animation
    }
  };

  window.requestAnimationFrame(scrollStep); // Start the animation
};

const AiEngine = ({
  setRecentData,
  recentData,
  firstQuestion,
}: AiEngineProp) => {
  const [onHover, setHover] = useState(false);
  const inputValue = useRef<HTMLTextAreaElement>(null);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (recentData.length > 0) {
      smoothScrollToBottom(scrollContainerRef, 3000); // Smooth scroll with 1000ms duration
    }
  }, [recentData]);

  const handleTopicAdd = (question: string, fullResponse: string) => {
    setRecentData((current: any) => [...current, [question, fullResponse]]);
  };

  const handleSubmit = () => {
    if (inputValue.current?.value) {
      setLoading(true);
      callerApi(inputValue.current.value, setLoading, handleTopicAdd);
      inputValue.current.value = "";
    } else {
      setAlert(true);
    }
  };

  const handleNewTopic = () => {
    firstQuestion.current = true;
    setRecentData([]);
  };

  const handleEnterPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault(); // To prevent a newline in the textarea
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-[98vh] p-4">
      <div
        ref={scrollContainerRef}
        className="flex flex-1 mt-2 rounded-lg overflow-auto no-scrollbar py-2 md:px-10"
      >
        {recentData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} // Slide up from below
            animate={{ opacity: 1, y: 0 }} // Fade in and slide up
            transition={{ duration: 0.5 }} // Control the duration here
            className="text-white font-roboto font-bold text-3xl text-center my-auto mx-auto"
          >
            <div>
              <img src="Asset/KpBa.png" alt="" className="h-48 w-48 mx-auto" />
            </div>
            <p className="text-slate-300">Tell me how can I help you?</p>
          </motion.div>
        )}
        {recentData.length > 0 && (
          <div className="w-full mb-10">
            {recentData.map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 1000 }} // Slide up from below
                animate={{ opacity: 1, y: 0 }} // Fade in and slide up
                transition={{ duration: 10000000 }} // Control the duration of each message
                className="text-white p-2"
              >
                <div className="flex items-end justify-end">
                  <p className="my-3 text-lg bg-[#2f2f2f] p-2 w-fit px-4 rounded-2xl">
                    {item[0]}
                  </p>
                </div>
                <div className="text-white text-sm md:text-base bg-[#1f1f1f] p-2 w-fit px-4 rounded-lg">
                  <div
                    className="text-[#1f1f1f] relative"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {item[1]}
                    <div
                      className="absolute top-0 left-0 text-white "
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {/* <TypeAnimation
                        sequence={[`${item[1]}`, 500]}
                        speed={99}
                        wrapper="span"
                        repeat={0}
                      /> */}
                      ${item[1]}
                      <span className="animate-pulse"></span>{" "}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
        )}
      </div>
      <div className="flex space-x-5 mb-16 md:mb-0">
        <motion.div
          className="relative bg-primary-blue rounded-full overflow-hidden flex space-x-2 items-center justify-center my-2"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          initial={{ width: "80px" }}
          animate={{ width: onHover ? "200px" : "80px" }}
          transition={{ duration: 0.3 }}
          onClick={handleNewTopic}
        >
          <TbMessageCirclePlus className="text-white min-w-10 h-8" />
          {onHover && (
            <motion.p
              className="font-semibold text-white font-roboto text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              New
              <motion.span
                initial={{ visibility: "hidden" }}
                animate={{ visibility: "visible" }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {" "}
                Topic
              </motion.span>
            </motion.p>
          )}
        </motion.div>
        <div className="w-full relative h-full">
          <textarea
            placeholder="Enter your question"
            className="bg-btn-gray p-2 text-base md:text-xl border border-gray-700 rounded-lg font-roboto font-medium w-full text-white no-scrollbar h-20"
            ref={inputValue}
            onKeyDown={handleEnterPress}
          />
          {!loading && (
            <div onClick={handleSubmit} className="absolute bottom-4 right-4">
              <TbSend2 className="text-green-500 text-3xl hover:scale-110 hover:text-green-400" />
            </div>
          )}
          <div className="absolute text-white top-0 m-0 w-full">
            {alert && (
              <Alert
                className="bg-[#8b1f1f53] flex items-center justify-center p-3 rounded-xl h-20"
                onClick={() => setAlert(false)}
              >
                <p className="text-xl font-roboto font-medium">
                  Please Enter Your Question
                </p>
              </Alert>
            )}
            {loading && (
              <div className="p-2 px-4 text-lg text-white font-roboto bg-[#e5e8e586] w-fit mx-auto rounded-lg -translate-y-12">
                Loading ...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiEngine;
