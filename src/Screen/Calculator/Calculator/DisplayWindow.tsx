interface displayProp {
  expression: string;
  result: string;
}

const DisplayWindow = ({ expression, result }: displayProp) => {
  return (
    <div className=" flex flex-col flex-1 max-w-[850px] mx-auto justify-end items-end p-2 mb-2 md:p-4 md:mb-5 md:gap-4 ">
      <div className="text-lg md:text-3xl font-roboto text-[#5c5b5b] font-semibold">
        {expression}
      </div>
      <div className="text-4xl md:text-7xl font-roboto text-white font-medium">
        {result}
      </div>
    </div>
  );
};

export default DisplayWindow;
