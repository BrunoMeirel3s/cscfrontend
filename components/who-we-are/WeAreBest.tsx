import whowecontent2 from "@/public/assets/who-we-content-2.jpg";
import Image from "next/image";
import PrimaryHeadline from "../global/primary-headline";
import { WeAreBestData } from "@/lib/dataWithJSX";

const WeAreBest = () => {
  return (
    <div className="flex flex-wrap bg-lightgrey lg:flex-nowrap">
      <div className="relative basis-full px-8 pb-8 pt-16 sm:pb-12 lg:basis-1/2 lg:px-11 lg:pb-16 lg:pt-24">
        <PrimaryHeadline
          text="We Are Best In Business"
          additionalClass="primary-headline-left"
        />
        {WeAreBestData.map((item) => (
          <div className="mb-8 flex pr-0 lg:pr-20" key={item.id}>
            <div className="shrink-0 pr-7">{item.iconName}</div>
            <div>
              <h3 className="mb-2 text-2xl font-bold text-black">
                {item.headline}
              </h3>
              <p className="text-base">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="relative min-h-96 basis-full lg:min-h-full lg:basis-1/2">
        <Image
          src={whowecontent2}
          alt="Who We Content"
          fill={true}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default WeAreBest;
