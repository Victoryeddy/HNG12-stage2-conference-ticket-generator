import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-700 rounded-full h-1 overflow-hidden">
      <div
        className="bg-[#24A0B5] h-full text-xs text-white text-center flex items-center justify-center transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
