import Image from "next/image";
import paimagetopcontent from "@/public/assets/single-pa-top-content.jpg";
import PrimaryHeadline from "@/components/global/primary-headline";
import { ChevronRight } from "lucide-react";

const listData: string[] = [
  "Divorce",
  "Financial Matters",
  "Agreements",
  "Spouse Abuse",
  "Childern",
  "Martial Matters",
];

const PABottomContent = () => {
  return (
    <div className="flex flex-wrap gap-0 lg:flex-nowrap lg:gap-8">
      <div className="relative basis-full sm:min-h-96 sm:basis-full lg:min-h-full lg:basis-1/2">
        <Image
          src={paimagetopcontent}
          alt="Single Practice Area Top"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="basis-full px-8 py-16 sm:-order-1 lg:order-2 lg:basis-1/2 lg:pl-11 lg:pr-20">
        <PrimaryHeadline
          text="History In Family Law Cases"
          additionalClass="primary-headline-left"
        />
        <p className="mb-5 text-base leading-6 text-[#333]">
          For almost 20 years, Lawyero family law attorneys have helped our
          clients with the following matters
        </p>
        <ul className="pb-8">
          {listData.map((item, index) => (
            <li
              key={index}
              className="relative border-b border-[#313131] py-4 pl-5 text-base leading-6 text-[#313131]"
            >
              <ChevronRight
                size={15}
                className="absolute left-0 top-1/2 -translate-y-1/2"
              />
              {item}
            </li>
          ))}
        </ul>
        <p className="mb-5 text-base font-bold leading-6 text-[#333]">
          Contact us today for an initial case evaluation. You will speak with
          one of our attorneys to discuss your situation. You will receive
          information concerning your particular matter and you can evaluate
          whether our attorney fits your needs and comfort level. You can decide
          whether our attorney is right for you. Contact us today at
          1911-462-242.
        </p>
      </div>
    </div>
  );
};

export default PABottomContent;
