import BlogList from "@/components/blog/BlogList";
import Sidebar from "@/components/blog/Sidebar";
import InnerBanner from "@/components/global/inner-banner";
import { blogCategories } from "@/lib/data";
import { URLParams } from "@/types";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: URLParams): Promise<Metadata> {
  const blogCategoriesTitle = blogCategories
    .filter((item) => item.id === +params.id)
    .map((filteredItem) => filteredItem.title);

  return {
    title: `${blogCategoriesTitle} - Lawyero`,
  };
}

const Page = ({ params }: URLParams) => {
  return (
    <>
      {blogCategories
        .filter((item) => item.id === +params.id)
        .map((item) => (
          <InnerBanner text={item.title} key={item.id} />
        ))}
      <div className="relative py-[90px]">
        <div className="container">
          <div className="flex flex-wrap lg:flex-nowrap">
            <BlogList layoutClass="lg:basis-[70%] basis-full" />
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
