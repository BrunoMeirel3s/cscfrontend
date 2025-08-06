import Link from "next/link";
import { blogPosts } from "@/lib/data";
import Image from "next/image";
import { formatDate } from "@/lib/utilFunctons";
import ButtonCustom from "../global/button";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  User,
} from "lucide-react";

const BlogListTwoColumns = ({ listStyle }: { listStyle?: string }) => {
  return (
    <>
      {blogPosts.map((item, index) => (
        <div
          className="relative mb-12 flex flex-wrap pb-12 before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-full before:bg-background before:content-[''] after:absolute after:bottom-0 after:left-0 after:z-[1] after:h-[3px] after:w-[150px] after:bg-primary-main after:content-[''] lg:flex-nowrap"
          key={item.id}
        >
          <div
            className={`basis-full lg:basis-1/2 ${
              listStyle === "chess" && index % 2 === 1
                ? "order-2 pb-7 pl-0 lg:pb-0 lg:pl-8"
                : "pl-0"
            }`}
          >
            <Image src={item.featuredImage.node.mediaItem} alt="Blog Post" />
          </div>
          <div
            className={`basis-full lg:basis-1/2 ${
              listStyle === "chess" && index % 2 === 1
                ? "order-1 pl-0"
                : "pl-0 pt-7 lg:pl-8 lg:pt-0"
            }`}
          >
            <div className=" bg-white">
              <h3 className="mb-6">
                <Link
                  href={item.linkHref}
                  className="inline-block cursor-pointer text-[25px] font-bold capitalize leading-9 text-background hover:text-primary-main sm:text-[32px]"
                >
                  {item.title}
                </Link>
              </h3>
              <ul className="flex flex-wrap  pb-6 sm:flex-nowrap">
                <li className="mb-4 mr-5 flex basis-full items-center sm:mb-0 sm:basis-auto">
                  <Calendar className="w-5" />
                  <Link
                    className="pl-2 text-base text-[#313131] hover:text-primary-main"
                    href="#"
                  >
                    {formatDate(item.date)}
                  </Link>
                </li>
                <li className="mb-4 mr-5  flex basis-full items-center sm:mb-0 sm:basis-auto">
                  <User className="w-5" />
                  <Link
                    className="pl-2 text-base text-[#313131] hover:text-primary-main"
                    href="mailto:adminlawyerowpadmin"
                  >
                    {item.author}
                  </Link>
                </li>
                <li className="mr-5 flex basis-full items-center text-base text-[#313131] sm:basis-auto">
                  <MessageCircle className="w-5" />
                  <span className="pl-2">{item.comments} Comments</span>
                </li>
              </ul>
              <p className="text-base text-[#333]">{item.excerpt}</p>
              <div className="pt-6 text-right">
                <ButtonCustom
                  href={item.linkHref}
                  buttonType="dark"
                  text="Read More"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <ul className="flex w-full justify-center">
        <li className="group mr-3 flex size-12 cursor-pointer items-center justify-center border-2 border-background bg-white hover:bg-background">
          <ChevronLeft className="w-6 text-background group-hover:text-white" />
        </li>
        <li className="group mr-3 flex size-12 cursor-pointer items-center justify-center border-2 border-background bg-white text-xl font-bold text-background hover:bg-background hover:text-white">
          1
        </li>
        <li className="group mr-3 flex size-12 cursor-pointer items-center justify-center border-2 border-background bg-white text-xl font-bold text-background hover:bg-background hover:text-white">
          2
        </li>
        <li className="group mr-3 flex size-12 cursor-pointer items-center justify-center border-2 border-background bg-white hover:bg-background">
          <ChevronRight className="w-6 text-background group-hover:text-white" />
        </li>
      </ul>
    </>
  );
};

export default BlogListTwoColumns;
