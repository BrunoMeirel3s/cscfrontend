import Image from "next/image";
import LeftIconBox from "../shared/LeftIconBox";
import { HomepageFeatures } from "@/lib/dataWithJSX";
import homeserviceimage from "@/public/assets/home-service-image.jpg";

const Features = () => {
  return (
    <>
      <div className="flex flex-wrap gap-4 bg-grey lg:flex-nowrap lg:gap-12">
        <div className="relative min-h-80 basis-full lg:min-h-full lg:basis-1/2">
          <Image
            src={homeserviceimage}
            alt="Home Service Image"
            fill={true}
            className="object-cover"
          />
        </div>
        <div className="-order-1 basis-full px-8 pt-20 md:pb-4 lg:order-2 lg:basis-1/2">
          {HomepageFeatures.map((item) => (
            <LeftIconBox
              key={`features${item.id}`}
              iconName={item.iconName}
              headline={item.headline}
              content={item.content}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Features;
