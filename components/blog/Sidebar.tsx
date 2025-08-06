import { blogCategories, blogPosts, blogTags } from "@/lib/data";
import Link from "next/link";
import React from "react";
import PrimaryHeadline from "../global/primary-headline";
import { Input } from "../ui/input";
import { ChevronRight, SearchIcon } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="basis-full pt-20 lg:basis-[30%] lg:pt-0">
      <div className="relative">
        <SearchIcon
          size={20}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-background"
        />
        <Input
          type="text"
          placeholder="Search"
          className="h-12 w-full rounded-none border-2 border-[#e8e6e6] bg-white px-3 py-4 text-[#1a2431] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <div className="mt-12">
        <PrimaryHeadline
          text="Categories"
          headlineType="h3"
          additionalClass="text-[32px] primary-headline-left"
        />
        <ul>
          {blogCategories.map((item) => (
            <li
              className="relative border-b border-[#313131] py-4 pl-6"
              key={item.id}
            >
              <Link
                href={`/blog/category/${item.id}`}
                className="text-base leading-6 text-[#313131] hover:text-primary-main"
              >
                <ChevronRight
                  size={20}
                  className="absolute left-0 top-1/2 -translate-y-1/2 font-bold"
                />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <PrimaryHeadline
          text="Recent Posts"
          headlineType="h3"
          additionalClass="text-[32px] primary-headline-left text-background"
          formatTwoColor
        />
        <ul>
          {blogPosts.slice(0, 5).map((item) => (
            <li
              className="relative border-b border-[#313131] py-4 pl-6"
              key={item.id}
            >
              <Link
                href="#"
                className="text-base leading-6 text-[#313131] hover:text-primary-main"
              >
                <ChevronRight
                  size={20}
                  className="absolute left-0 top-[30px] -translate-y-1/2 font-bold"
                />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <PrimaryHeadline
          text="Recent Tags"
          headlineType="h3"
          additionalClass="text-[32px] primary-headline-left text-background"
          formatTwoColor
        />
        <ul className="flex">
          {blogTags.map((item) => (
            <li key={item.id}>
              <Link
                className="mr-2 inline-block border-2 border-primary-main bg-primary-main px-4 py-[14px] text-[19px] font-bold text-white hover:bg-white hover:text-primary-main"
                href={`/blog/tag/${item.id}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        <PrimaryHeadline
          text="About Lawyero"
          headlineType="h3"
          additionalClass="text-[32px] primary-headline-left text-background"
          formatTwoColor
        />
        <p className="text-base text-[#333]">
          We never take that trust for granted. We learn our clients’ needs and
          expectations; we communicate openly; we follow up frequently; we
          respond timely; and we are always available. In short, we develop a
          relationship with our clients. Our clients’ goals become our goals. We
          provide aggressive and professional legal representation to every
          client in order to ensure his or her issue is resolved in the best
          possible manner.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
