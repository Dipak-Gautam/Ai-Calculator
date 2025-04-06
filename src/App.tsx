import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiCalculator1 } from "react-icons/ci";
import Calculator from "./Screen/Calculator/Calculator";
import Overlay from "react-bootstrap/Overlay";

import Ai from "./Screen/Ai/Ai";

const App = () => {
  const [navigator, setNavigator] = useState(true);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [prompt, showPrompt] = useState(false);

  useEffect(() => {
    if (!navigator) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto"; // Reset when component unmounts
    };
  }, [navigator]);

  const aiVariants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "100vw", opacity: 0 },
  };

  const delayFunction = () => {
    showPrompt(true);
  };

  useEffect(() => {
    setTimeout(delayFunction, 10000);
  }, []);

  return (
    <div>
      <div>
        <div
          className=" right-2 top-2 md:right-3 md:top-3 rounded-full bg-btn-gray absolute hover:bg-slate-800 z-50"
          onClick={() => {
            setNavigator((currentState) => !currentState), showPrompt(false);
          }}
          ref={target}
        >
          {navigator ? (
            <img
              src="/ai-logo.png"
              alt=""
              className="w-12 h-12 md:h-14 md:w-14 p-2"
            />
          ) : (
            <CiCalculator1 className=" h-12 w-12 md:h-14 md:w-14 text-btn-orange p-1 md:p-2 hover:text-orange-300" />
          )}
        </div>
        {prompt && (
          <Overlay target={target.current} show={true} placement="left">
            {(props) => (
              <>
                <motion.div
                  {...props}
                  className="text-white border border-orange-500  rounded-md overflow-hidden p-1 px-2 mr-3 flex relative"
                  initial={{ opacity: 1, width: 0, height: 35 }}
                  animate={{ opacity: 1, width: 200, height: 35 }}
                >
                  Having Problems ! use Ai
                </motion.div>
              </>
            )}
          </Overlay>
        )}
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <Calculator />
      </div>

      <AnimatePresence>
        {!navigator && (
          <>
            <motion.div
              key="ai"
              variants={aiVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 0.5 }}
              className="absolute top-0 left-0 w-[100vw] h-[100vh] z-10 pb-16 hidden md:flex" // z-index to cover Calculator
            >
              <Ai />
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 0.5 }}
              className="absolute top-0 left-0 w-[100vw] h-[100vh] z-10 pb-16 md:hidden" // z-index to cover Calculator
            >
              <Ai />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
