"use client";

import { carouselImages } from "@/constants";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { CircleUser, NotebookText } from "lucide-react";

Autoplay.globalOptions = { delay: 8000 };

const Carousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 100 }, [
    Autoplay(),
  ]);

  return (
    <div
      ref={emblaRef}
      className="overflow-hidden relative cursor-pointer max-h-[600px]"
    >
      <div className="flex">
        {carouselImages.map((image) => (
          <div
            key={image.id}
            className="flex-full min-w-0 relative items-center justify-center flex"
          >
            <Image
              src={`/assets/images/carousel/${image.path}`}
              alt={image.name}
              width={1920}
              height={1080}
              objectPosition="center"
              className="object-cover object-center text-center h-[640px]"
            />
          </div>
        ))}
      </div>
      <div className="bg-slate-950/60 absolute h-full w-full left-0 top-0 flex items-center text-white">
        <div className="wrapper flex justify-start flex-col gap-5">
          <h1 className="text-7xl uppercase leading-tight font-extrabold">
            Flavourful recipes <br /> you{" "}
            <span className="text-rose-500">can afford</span>
          </h1>
          <h2 className="max-w-[550px] text-lg text-white/90">
            Check out some of our own and user created recipes down below. Sign
            up to get started publishing your own recipes.
          </h2>
          <div className="flex flex-row gap-3 mt-10">
            <Button size="lg" asChild>
              <Link
                href="/recipes"
                className="flex flex-row gap-1.5 items-center"
              >
                <NotebookText size={20} /> Recipes
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="bg-white text-rose-600 hover:bg-gray-200 transition-all"
            >
              <Link
                href="/sign-up"
                className="flex flex-row gap-1.5 items-center"
              >
                <CircleUser size={20} /> Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
