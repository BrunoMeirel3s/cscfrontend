import Image from "next/image";
import Link from "next/link";
import { URLParams } from "@/types";
import { blogCategories, blogPosts, blogTags } from "@/lib/data";
import { formatDate } from "@/lib/utilFunctons";

import Sidebar from "@/components/blog/Sidebar";
import { Calendar, User, MessageCircle } from "lucide-react";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: URLParams): Promise<Metadata> {
  const blogTitle = blogPosts
    .filter((item) => item.id === +params.id)
    .map((filteredItem) => filteredItem.title);

  return {
    title: `${blogTitle} - Lawyero`,
  };
}

const Page = ({ params }: URLParams) => {
  return (
    <>
      <div className="relative py-[90px]">
        <div className="container">
          <div className="flex flex-wrap lg:flex-nowrap">
            <div className="basis-full pr-0 lg:basis-[70%] lg:pr-8">
              <div className="relative mb-0 pb-0 before:absolute before:bottom-0 before:left-0 lg:mb-12 lg:pb-12">
                {blogPosts
                  .filter((item) => item.id === +params.id)
                  .map((filteredItem) => (
                    <div key={filteredItem.id}>
                      <Image
                        src={filteredItem.featuredImage.node.mediaItem}
                        alt="Home BLog Post"
                        className=""
                      />
                      <div className=" bg-white">
                        <h2 className="my-6 text-[25px] font-bold capitalize leading-9 text-background sm:text-[32px]">
                          {filteredItem.title}
                        </h2>
                        <ul className="flex flex-wrap pb-6 sm:flex-nowrap">
                          <li className="mb-4 mr-5 flex basis-full items-center sm:mb-0 sm:basis-auto">
                            <Calendar className="w-5" />
                            <span className="pl-2 text-base text-[#313131]">
                              {formatDate(filteredItem.date)}
                            </span>
                          </li>
                          <li className="mb-4 mr-5  flex basis-full items-center sm:mb-0 sm:basis-auto">
                            <User className="w-5" />
                            <Link
                              className="pl-2 text-base text-[#313131] hover:text-primary-main"
                              href="#"
                            >
                              {filteredItem.author}
                            </Link>
                          </li>
                          <li className="mr-5 flex basis-full items-center  text-base text-[#313131] sm:basis-auto">
                            <MessageCircle className="w-5" />
                            <span className="pl-2">
                              {filteredItem.comments} Comments
                            </span>
                          </li>
                        </ul>
                        <ul className="flex flex-wrap pb-5 md:flex-nowrap">
                          {blogCategories.map((item, index) => (
                            <li key={item.id}>
                              <Link
                                href={`/blog/category/${item.id}`}
                                className="pr-1 text-base text-primary-main"
                              >
                                {item.title}
                              </Link>
                              {blogCategories.length - 1 !== index && (
                                <span className="pr-1">|</span>
                              )}
                            </li>
                          ))}
                        </ul>
                        <p className="mb-4 text-base leading-[1.62] text-[#333]">
                          Many people are not aware of their legal rights and
                          dont pay attention to the helping hand they can get
                          from legal advise. Therefore it is very important to
                          know that you are aware of your rights and seek legal
                          help when needed.
                        </p>
                        <p className="mb-4 text-base leading-[1.62] text-[#333]">
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                          is that it has a more-or-less normal distribution of
                          letters, as opposed to using ‘Content here, content
                          here’, making it look like readable English. Many
                          desktop publishing packages and web page editors now
                          use Lorem Ipsum as their default model text, and a
                          search for ‘lorem ipsum’ will uncover many web sites
                          still in their infancy. Various versions have evolved
                          over the years, sometimes by accident, sometimes on
                          purpose (injected humour and the like).
                        </p>
                        <h3 className="mb-3 pr-0 text-[25px] font-bold text-[#333] sm:text-[32px] lg:pr-12">
                          What To Do First When Encounter An Accident?
                        </h3>
                        <p className="mb-4 text-base leading-[1.62] text-[#333]">
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form, by injected humour, or randomised words
                          which don’t look even slightly believable. If you are
                          going to use a passage of Lorem Ipsum, you need to be
                          sure there isn’t anything embarrassing hidden in the
                          middle of text. All the Lorem Ipsum generators on the
                          Internet tend to repeat predefined chunks as
                          necessary, making this the first true generator on the
                          Internet. It uses a dictionary of over 200 Latin
                          words, combined with a handful of model sentence
                          structures, to generate Lorem Ipsum which looks
                          reasonable. The generated Lorem Ipsum is therefore
                          always free from repetition, injected humour, or
                          non-characteristic words etc.
                        </p>
                        <div>
                          <h3 className="mb-4 text-2xl font-bold text-[#333]">
                            Tags:
                          </h3>
                          <ul className="flex">
                            {blogTags.map((item, index) => (
                              <li key={item.id}>
                                <Link
                                  href={`/blog/tag/${item.id}`}
                                  className={`relative mr-3 inline-block pr-3 text-base font-semibold leading-[1.62] hover:text-primary-main hover:underline ${
                                    blogTags.length - 1 !== index &&
                                    'before:absolute before:right-[-2.5px] before:top-[11px] before:size-[5px] before:rounded-full before:bg-primary-main before:content-[""]'
                                  }`}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
