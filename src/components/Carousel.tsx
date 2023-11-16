"use client";
import { Carousel } from "flowbite-react";

export default function CarouselI({ image }: { image: string[] }) {
  return (
    <div className="md:h-[500px] h-[300px] w-full">
      <Carousel slide={false}>
        {image.map((e, index) => (
          <img src={e} alt="" key={e} />
        ))}
      </Carousel>
    </div>
  );
}
