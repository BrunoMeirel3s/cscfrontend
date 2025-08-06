import PrimaryHeadline from "@/components/global/primary-headline";
import Image from "next/image";
import libraryicon from "@/public/assets/library-icon.svg";
import { FAQData } from "@/lib/data";
import FAQItem from "../shared/FAQItem";

const FAQsList = ({
  headline,
  columns,
  separator,
  bgType,
}: {
  headline: string;
  columns?: number;
  separator?: boolean;
  bgType?: string;
}) => {
  return (
    <div
      className={`bg-${bgType || "grey"} relative overflow-hidden pb-9 pt-16 lg:pb-11 lg:pt-20`}
    >
      {separator && (
        <Image
          src={libraryicon}
          alt="library-icon"
          className="absolute top-0 z-[3] w-full rotate-180"
        />
      )}
      <div className="container">
        <PrimaryHeadline text={headline} />
        <div className={`lg:grid-cols- grid${columns || 1} grid-cols-1 pt-3`}>
          {FAQData.map((item) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQsList;
