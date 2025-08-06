import Image from "next/image";

import library from "@/public/assets/library-home.jpg";
import libraryicon from "@/public/assets/library-icon.svg";
import StatsCounterIconBox from "@/components/shared/statsCounterIconBox";
import { StatsWithIconTeam } from "@/lib/dataWithJSX";

const Stats = () => {
  return (
    <div className="relative overflow-hidden bg-black pb-16 pt-20 before:absolute before:left-0 before:top-0 before:z-[2] before:size-full before:bg-[#1a2431] before:opacity-70 before:content-[''] lg:pb-20 lg:pt-28">
      <Image
        src={libraryicon}
        alt="library-icon"
        className="absolute top-0 z-[3] w-full rotate-180"
      />
      <Image src={library} alt="library" fill={true} className="object-cover" />
      <div className="container relative z-[3]">
        <div className="flex justify-between sm:flex-wrap lg:flex-nowrap">
          {StatsWithIconTeam.map((item) => {
            return (
              <StatsCounterIconBox
                key={item.id}
                iconName={item.iconName}
                amount={item.amount}
                amountPreText={item.amountPreText}
                amountPostText={item.amountPostText}
                text={item.text}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stats;
