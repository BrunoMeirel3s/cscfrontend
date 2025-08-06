import Link from "next/link";
import React from "react";

interface IconCardWithLinkProps {
  link: string;
  iconName: React.ReactNode;
  pa: string;
  cardBgClass: string;
}

const IconCardWithLink = ({
  link,
  iconName,
  pa,
  cardBgClass,
}: IconCardWithLinkProps) => {
  return (
    <div className="group mb-4 flex min-h-64 basis-full px-2 text-center md:basis-1/2 lg:basis-1/4">
      <div className={`${cardBgClass}  w-full`}>
        <Link
          className="transition-box-shadow flex size-full flex-col items-center justify-center duration-500 ease-in-out group-hover:shadow-[0_6px_13px_rgba(26,36,49,0.35)]"
          href={link}
        >
          <span className="inline-block">{iconName}</span>
          <h3 className="mt-5 text-2xl font-semibold text-white">{pa}</h3>
        </Link>
      </div>
    </div>
  );
};

export default IconCardWithLink;
