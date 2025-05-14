"use client";

import { useEffect } from "react";

export default function ScrollUnlocker() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const body = document.body;

      if (body.hasAttribute("data-scroll-locked")) {
        body.removeAttribute("data-scroll-locked");
        body.style.overflow = "auto";
        body.style.marginRight = "0px";
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
