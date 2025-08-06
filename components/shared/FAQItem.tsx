import { CircleHelp } from "lucide-react";
import React from "react";

interface FAQProp {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQProp) => {
  return (
    <div className="mb-12 pr-0 sm:basis-full lg:basis-1/2 lg:pr-6">
      <div className="flex">
        <CircleHelp
          size="30"
          className="mt-1 shrink-0 rounded-full bg-white text-primary-main"
        />
        <div className="pl-4">
          <h3 className="mb-3 text-2xl font-bold text-background">
            {question}
          </h3>
          <p className="text-base text-[#333]">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
