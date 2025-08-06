import PrimaryHeadline from "@/components/global/primary-headline";
import { attorneyEducaton } from "@/lib/data";
import { AttorneyPAList } from "@/lib/dataWithJSX";
import React from "react";
import { splitHeadline } from "@/lib/utilFunctons";
import LeftIconBox from "@/components/shared/LeftIconBox";

const BackgroundAndPA = () => {
  return (
    <div className="overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="relative basis-full px-0 pb-12 pt-20 before:absolute before:-right-1/4 before:top-0 before:z-[-1] before:h-full before:w-[150vw] before:bg-grey before:content-[''] lg:basis-2/5 lg:pb-16 lg:pl-12 lg:pr-14 lg:pt-24 lg:before:right-0 lg:before:w-[50vw]">
            <PrimaryHeadline
              text="Attorney Background"
              additionalClass="primary-headline-left text-[32px]"
              headlineType="h3"
            />

            {attorneyEducaton.map((item, index) => (
              <div className="mb-8" key={index}>
                <h3 className="mb-3 text-2xl font-bold text-[#333]">
                  {splitHeadline(item.title)}
                </h3>
                <ol className="list-[square] pl-5">
                  {item.details.map((innerItem) => (
                    <li
                      className="mb-3 text-base text-[#333]"
                      key={innerItem.id}
                    >
                      {innerItem.text}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <div className="relative basis-full px-0 pb-10 pt-16 before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-[80vw] before:bg-white before:content-[''] lg:basis-3/5 lg:pb-16 lg:pl-12 lg:pr-11 lg:pt-24">
            <PrimaryHeadline
              text="Practice Areas"
              additionalClass="primary-headline-left text-[32px]"
              headlineType="h3"
            />
            {AttorneyPAList.map((item) => (
              <React.Fragment key={item.id}>
                <LeftIconBox
                  iconName={item.iconName}
                  headline={item.headline}
                  content={item.content}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundAndPA;
