"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { bannerItems } from "@/lib/data";
import ButtonCustom from "../global/button";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const Banner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("scroll", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 8000,
        }),
      ]}
    >
      <CarouselContent className="relative ml-0">
        {bannerItems.map((item) => (
          <CarouselItem
            key={item.id}
            className={`relative overflow-hidden pl-0 text-white before:absolute before:z-10 before:size-full ${
              current === item.id ? "active" : ""
            }`}
          >
            <Image
              src={item.image}
              alt="homepage banner image"
              fill={true}
              className="object-cover object-top"
            />
            <div
              className={`relative top-0 z-10 w-full py-[120px] md:py-[150px] lg:py-[300px]`}
            >
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Banner;
