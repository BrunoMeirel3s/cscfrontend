import Image from "next/image";
import ButtonCustom from "../global/button";
import { PAData } from "@/lib/data";
import Link from "next/link";

const PAList = ({ layout }: { layout: string }) => {
  let content;

  layout === "2-column" &&
    (content = (
      <div className="container lg:pb-28 pb-20">
        <div className="grid grid-rows-4 lg:grid-cols-2 grid-cols-1 gap-8">
          {PAData.map((item) => (
            <div key={item.id}>
              <div className="sm:flex block p-4 border-[1px] border-[#ccc] rounded">
                <div className="sm:w-44 w-full shrink-0">
                  <Image
                    src={item.image}
                    alt="Practice Area Image"
                    className="w-full"
                  />
                </div>
                <div className="sm:ml-6 ml-0 sm:mt-0 mt-6">
                  <Link
                    href={item.href}
                    className="text-2xl text-background font-bold hover:text-primary-main mb-2 inline-block"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-[#333]">{item.text}</p>
                  <div className="pt-4">
                    <ButtonCustom
                      href={item.href}
                      text="Learn More"
                      buttonType="secondary"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));

  layout === "3-column" &&
    (content = (
      <div className="container lg:pb-28 pb-20">
        <div className="grid grid-rows-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {PAData.map((item) => (
            <div key={item.id}>
              <div className="border-[1px] border-[#ccc] rounded overflow-hidden">
                <div className="">
                  <Image
                    src={item.image}
                    alt="Practice Area Image"
                    className="w-full"
                  />
                </div>
                <div className="p-5">
                  <Link
                    href={item.href}
                    className="text-2xl text-background font-bold hover:text-primary-main mb-2 inline-block"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-[#333]">{item.text}</p>
                  <div className="pt-4">
                    <ButtonCustom
                      href={item.href}
                      buttonType="secondary"
                      text="Learn More"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));

  return content;
};

export default PAList;
