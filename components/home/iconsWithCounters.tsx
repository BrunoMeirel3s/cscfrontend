import { StatsWithIcon } from "@/lib/dataWithJSX";
import Image from "next/image";
import StatsCounterIconBox from "../shared/statsCounterIconBox";
import library from "@/public/assets/library-home.jpg";
import libraryicon from "@/public/assets/library-icon.svg";

const IconsWithCounters = () => {
  return (
    <div className="relative overflow-hidden bg-black py-16 before:absolute before:left-0 before:top-0 before:z-[2] before:size-full before:bg-[#1a2431] before:opacity-70 before:content-[''] sm:py-20">
      <Image src={library} alt="library" fill={true} className="object-cover" />
      <div className="container relative z-[3]">
        <div className="flex flex-wrap justify-between lg:flex-nowrap">
          {StatsWithIcon.map((item) => {
            return (
              <StatsCounterIconBox
                key={`statbox${item.id}`}
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

      <Image
        src={libraryicon}
        alt="library-icon"
        className="absolute bottom-0 z-[3] w-full"
      />
    </div>
  );
};

export default IconsWithCounters;
