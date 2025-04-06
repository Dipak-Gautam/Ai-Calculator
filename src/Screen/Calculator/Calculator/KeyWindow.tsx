interface keyWindowProp {
  handleButton: any;
}

const KeyWindow = ({ handleButton }: keyWindowProp) => {
  const sciKeys = [
    "sin",
    "cos",
    "ln",
    "log",
    "tan",
    "π",
    "e",
    "^",
    "!",
    "√",
    "^3",
    "x²",
    "∛",
    "sin⁻¹",
    "cos⁻¹",
    "tan⁻¹",
    "abs",
    "Rnd",
    "ceil",
    "floor",
  ];

  const basicKeys = [
    "AC",
    "7",
    "8",
    "9",
    "*",
    "DEL",
    "4",
    "5",
    "6",
    "-",
    "(",
    "1",
    "2",
    "3",
    "+",
    ")",
    ".",
    "0",
    "=",
    "/",
  ];

  const btncolor = {
    orange: "bg-btn-orange",
    gray: "bg-[#474646]",
  };

  const colorCheck = (item: string) => {
    if (
      item == "+" ||
      item == "-" ||
      item == "/" ||
      item == "=" ||
      item == "*" ||
      item == "AC"
    ) {
      return btncolor.orange;
    } else if (
      item == "1" ||
      item == "2" ||
      item == "3" ||
      item == "4" ||
      item == "5" ||
      item == "6" ||
      item == "7" ||
      item == "8" ||
      item == "9" ||
      item == "0"
    ) {
      return btncolor.gray;
    } else {
      return "bg-btn-gray";
    }
  };

  const showStringCheck = (key: string) => {
    switch (key) {
      case "*":
        return "x";

      case "-":
        return "-";

      default:
        return key;
    }
  };

  return (
    <>
      <div className="md:flex font-roboto  justify-center space-y-3 md:space-y-0  md:space-x-5  ">
        <div className=" grid grid-cols-5 gap-3 md:gap-4 ">
          {sciKeys.map((item) => (
            <button
              onClick={() => handleButton(item)}
              key={item}
              className="  p-2 md:p-4 w-9 h-9  md:w-16 md:h-16 items-center justify-center flex rounded-full bg-btn-gray"
            >
              <p className="text-sm md:text-lg">{item}</p>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-3 md:gap-4 ">
          {basicKeys.map((item) => (
            <button
              onClick={() => handleButton(item)}
              key={item}
              className={`p-2 md:p-4 w-10 h-10  md:w-16 md:h-16  items-center justify-center flex rounded-full ${colorCheck(
                item
              )}`}
            >
              <p className="text-sm md:text-lg ">{showStringCheck(item)}</p>
            </button>
          ))}
        </div>
      </div>
      <div className=" mt-4 md:mt-5 items-center justify-center text-center text-xs md:text-base">
        Developed by 🧑‍💻{" "}
        <span className="text-orange-500 font-roboto font-bold">
          Dipak Gautam
        </span>
      </div>
    </>
  );
};

export default KeyWindow;
