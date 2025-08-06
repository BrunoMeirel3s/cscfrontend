import BlogList from "@/components/blog/BlogList";
import Sidebar from "@/components/blog/Sidebar";
import InnerBanner from "@/components/global/inner-banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog with Sidebar - Lawyero",
  description: "Your one stop solution for legal matters",
};

const Page = () => {
  return (
    <>
      <InnerBanner text="Blog With Sidebar" />

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
