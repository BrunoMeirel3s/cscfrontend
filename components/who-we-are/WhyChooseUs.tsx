import whowecontent from "@/public/assets/who-we-content.jpg";
import Image from "next/image";
import PrimaryHeadline from "../global/primary-headline";
import { WhyChooseUsData } from "@/lib/dataWithJSX";

const WhyChooseUs = () => {
  return (
    <div className="flex flex-wrap bg-lightgrey lg:flex-nowrap">
      <div className="relative min-h-96 basis-full lg:min-h-full lg:basis-1/2">
        <Image
          src={whowecontent}
          alt="Who We Content"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="-order-1 basis-full pb-8 pl-8 pt-14 md:pb-4 lg:order-2 lg:basis-1/2 lg:pb-16 lg:pl-11 lg:pt-24">
        <PrimaryHeadline
          text="Why Choose Us"
          additionalClass="primary-headline-left"
        />
        {WhyChooseUsData.map((item) => (
          <div className="mb-8 flex pr-8 lg:pr-20" key={item.id}>
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
    </div>
  );
};

export default WhyChooseUs;
