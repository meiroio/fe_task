import React from "react";

interface LabelPin {
  text: string;
}

const LabelPin: React.FC<LabelPin> = ({ text }) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2 rounded-full bg-orange-200  h-fit w-fit px-2 py-1">
      <p className="text-xs text-gray-800 text-center">{text}</p>
    </div>
  );
};

export default LabelPin;
