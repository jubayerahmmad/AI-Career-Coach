"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    const imgElement = imgRef.current;

    /**
     * Handles the scroll event to toggle a CSS class on an image element
     * based on the current scroll position.
     *
     * The function compares the current vertical scroll position (`scrollY`)
     * with a predefined threshold (`scrollThreshold`), which is set to 100 pixels.
     * If the scroll position exceeds the threshold, the "scrolled" class is added
     * to the image element. Otherwise, the "scrolled" class is removed.
     */
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      //   console.log("Position", scrollPosition);
      //   console.log("Threshold", scrollThreshold);
      if (scrollPosition > scrollThreshold) {
        imgElement.classList.add("scrolled");
      } else {
        imgElement.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section className="w-full pt-36 md:pt-48 pb-10 z-50">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
            Your AI Career Coach for
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>

        <div className="space-x-2">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="px-8">
              Demo
            </Button>
          </Link>
        </div>

        <div className="hero-image-wrapper">
          <div ref={imgRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
