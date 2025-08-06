import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import teammemberbefore from "@/public/assets/team-meber-before.svg";
import { TeamMembers } from "@/lib/data";
import Link from "next/link";

export function TeamMembersCarousel({ textColor }: { textColor?: string }) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="pt-3">
        {TeamMembers.map((item) => (
          <CarouselItem
            key={`team${item.id}`}
            className="md:basis-1/2 lg:basis-1/4"
          >
            <Link href={item.href} className="group">
              <div className="before::content-[''] relative cursor-pointer before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-black before:opacity-30 before:transition-all before:duration-300 before:ease-in group-hover:before:w-full">
                <Image
                  src={item.image}
                  alt="Team Member Img"
                  className="w-full"
                />
                <Image
                  src={teammemberbefore}
                  alt="Team Member Before"
                  className="absolute left-0 top-0 size-11"
                />
                <Image
                  src={teammemberbefore}
                  alt="Team Member Before"
                  className="absolute bottom-0 right-0 size-11 rotate-180"
                />
              </div>
              <div
                className={`${
                  textColor ? "*:" + textColor : "*:text-primary-main"
                } border-b-2 border-primary-main px-2 py-4 *:text-center *:italic`}
              >
                <h3 className="mb-1 text-2xl">{item.name}</h3>
                <h4 className="text-xs">{item.designation}</h4>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex w-full justify-center">
        <div className="absolute mt-14 h-12 w-28 pt-14">
          <CarouselPrevious className="left-0 size-12 rounded-none border-2 border-black bg-white text-black opacity-100 hover:bg-white  disabled:opacity-100" />
          <CarouselNext className="right-0 size-12 rounded-none border-2 border-black bg-white text-black opacity-100 hover:bg-white  disabled:opacity-100" />
        </div>
      </div>
    </Carousel>
  );
}
