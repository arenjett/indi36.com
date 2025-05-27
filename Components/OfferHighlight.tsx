import { offerSection } from "@/data/offer";
import React from "react";

export default function OfferHighlight() {
  const { title } = offerSection;
  return (
    <section className="px-[34px] pt-[50px] pb-[30px] text-center bg-[#f0f0f0]">
      <div className="lg:container mx-auto">
        <h6 className="text-[24px] font-bold text-[#030c1a] mb-[10px]  ">
          {title}
        </h6>
        <p className="max-w-3xl mx-auto ">
          Step into the electrifying arena of Indibet,India&apos;s ultimate
          destination for cricket and casino enthusiasts. Get ready to be
          greeted with the most exciting Welcome Offer in the world of online
          gaming! <br />
        </p>
        <p className="mt-3">
          Make your first addition and unlock a staggering{" "}
          <strong>250% Welcome bonus </strong> of upto{" "}
          <strong>INR 25,000!</strong>
        </p>
      </div>
    </section>
  );
}
