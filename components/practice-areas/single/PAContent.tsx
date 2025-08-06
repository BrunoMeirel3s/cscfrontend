import PrimaryHeadline from "@/components/global/primary-headline";
import Image from "next/image";
import paimage1 from "@/public/assets/pa-img-1.jpg";

const PAContent = () => {
  return (
    <div className="container py-16 lg:py-24">
      <div className="flex flex-wrap gap-0 lg:flex-nowrap lg:gap-10">
        <div className="basis-full lg:basis-4/6">
          <PrimaryHeadline
            text="Overview"
            additionalClass="primary-headline-left"
          />
          <p className="mb-5 text-base text-[#333]">
            Family law involves a range of matters that are usually very
            personal, unique and emotionally challenging. Decisions involving
            your children and your financial well-being can be complex and
            nuanced and the results can last a lifetime. In these situations,
            you need more than just an attorney who has experience and knowledge
            of the law. You need someone who will provide you with guidance,
            creative thinking, and who understands the big picture and the
            impact your decisions will have on you.
          </p>
          <p className="mb-5 text-base text-[#333]">
            The family law attorneys at lawyero are committed to providing our
            clients with the skill and expertise necessary to meet the client’s
            objectives and goalswhile providing a trusted source of
            representation. We are responsive to our clients’ needs and we pride
            ourselves on our attentiveness and availability to handle client
            matters with care, respect and sensitivity.
          </p>
        </div>
        <div className="basis-full pt-7 lg:basis-1/3 lg:pt-0">
          <Image
            src={paimage1}
            alt="Practice Area Image"
            className="w-full rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default PAContent;
