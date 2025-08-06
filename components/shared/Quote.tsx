import { QuoteIcon } from "lucide-react";

interface QuoteProps {
  text: string;
  bgClass: string;
  textClass: string;
}

const Quote = ({ text, bgClass, textClass }: QuoteProps) => {
  return (
    <div className={bgClass}>
      <div className="container">
        <div className="relative px-0 py-[50px] lg:px-12 lg:py-[75px]">
          <QuoteIcon
            size={60}
            className="absolute left-0 top-[60px] z-0 text-white opacity-40"
          />
          <p className={`text-[18px] italic lg:text-xl ${textClass}`}>
            {text}I was struggling to get my legal issues sorted out before i
            met Mr. John at Lawyero. I was amazed by his attitude and attention
            to detail and he sorted my case in no time understanding what i need
            to get done. Thankyou Mr. John.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quote;
