import Image, { StaticImageData } from "next/image";
import innerbanner from "@/public/assets/inner-page-banner.jpg";

const InnerBanner = ({
  text,
  image,
}: {
  text: string;
  image?: StaticImageData;
}) => {
  return (
    <div className="relative overflow-hidden py-[70px] before:absolute before:left-0 before:top-0 before:z-[2] before:size-full before:bg-background before:opacity-70 before:content-['']">
      <Image
        src={image || innerbanner}
        alt="Page Banner With Title"
        fill={true}
        className="object-cover"
      />
      <div className="container relative z-[3]">
        <h1 className="text-center text-[30px] font-bold text-white lg:text-[40px]">
          {text}
        </h1>
      </div>
    </div>
  );
};

export default InnerBanner;
