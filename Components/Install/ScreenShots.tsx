import Image from "next/image";
import React from "react";

export default function ScreenShots() {
  return (
    <div className="banner-imgs-box">
      <ul className="banner-imgs gap-3">
        <li className="relative ">
          <Image
            src="/assets/pwa/shot1.webp"
            alt="indibet"
            width={200}
            height={100}
            priority
          />
        </li>
        <li className="relative">
          <Image
            src="/assets/pwa/shot2.webp"
            alt="indibet"
            width={200}
            height={100}
            priority
          />
        </li>
        <li className="relative">
          <Image
            src="/assets/pwa/shot3.webp"
            alt="indibet"
            width={200}
            height={100}
            loading="lazy"
          />
        </li>
        <li className="relative">
          <Image
            src="/assets/pwa/shot4.webp"
            alt="indibet"
            width={200}
            height={100}
            loading="lazy"
          />
        </li>
        <li className="relative">
          <Image
            src="/assets/pwa/shot5.webp"
            alt="indibet"
            width={200}
            height={100}
            loading="lazy"
          />
        </li>
      </ul>
    </div>
  );
}
