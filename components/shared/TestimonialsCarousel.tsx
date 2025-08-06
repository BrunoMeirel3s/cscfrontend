import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Testimonials } from "@/lib/data";

export function TestimonialsCarousel() {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {Testimonials.map((item) => (
          <CarouselItem key={`testimonial${item.id}`}>
            <div className="m-auto *:text-white sm:w-full sm:px-[90px] lg:w-[850px] lg:px-0">
              <Image
                src={item.image}
                alt="Testimonial Img"
                className="m-auto size-24 rounded-full border-4 border-white"
              />
              <h3 className="my-4 text-center text-[32px] font-bold">
                {item.organization}
              </h3>
              <p className="mb-[18px]  text-left  text-base italic">
                {item.text}
              </p>
              <h4 className="text-center text-base font-bold">
                {item.designation}
              </h4>
              <h4 className="text-center text-base">{item.name}</h4>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-auto right-[60px] top-[112%] size-12 rounded-none border-2 border-white bg-transparent text-white opacity-100 disabled:opacity-100 sm:left-0 sm:right-auto sm:top-1/2" />
      <CarouselNext className="right-0 top-[112%] size-12 rounded-none border-2 border-white bg-transparent text-white opacity-100 disabled:opacity-100 sm:top-1/2" />
    </Carousel>
  );
}
