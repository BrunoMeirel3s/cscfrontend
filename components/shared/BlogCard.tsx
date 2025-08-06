import { formatDate } from "@/lib/utilFunctons";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface BlogCardProps {
  imageURL: StaticImageData;
  date: string;
  linkHref: string;
  title: string;
}

const BlogCard = ({ imageURL, date, linkHref, title }: BlogCardProps) => {
  return (
    <div className="group basis-1/3">
      <div className="overflow-hidden">
        <Image
          src={imageURL}
          alt="Home BLog Post"
          className="scale-110 transition-transform duration-500 ease-in-out group-hover:scale-100"
        />
      </div>
      <div className="bg-white p-5">
        <span className="mb-4 inline-block text-sm text-primary-main">
          {formatDate(date)}
        </span>
        <h3>
          <Link
            href={linkHref}
            className="inline-block cursor-pointer text-base font-semibold text-background hover:text-primary-main"
          >
            {title}
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default BlogCard;
