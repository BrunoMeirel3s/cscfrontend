import React from "react";

interface LeftIconBoxProps {
  iconName: React.ReactNode;
  headline: string;
  content: string;
}

const LeftIconBox = ({ iconName, headline, content }: LeftIconBoxProps) => {
  return (
    <div className="mb-10 flex pr-0 lg:pr-20">
      <div className="shrink-0 pr-7">{iconName}</div>
      <div>
        <h3 className="mb-2 text-2xl font-bold text-black">{headline}</h3>
        <p className="text-base">{content}</p>
      </div>
    </div>
  );
};

export default LeftIconBox;
