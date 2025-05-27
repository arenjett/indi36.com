import Image from "next/image";
import React from "react";

export default function Featured() {
  return (
    <section className="w-screen relative ">
      {/* Large screen featured image */}
      <div className="md:block hidden">
        <Image
          src={"/assets/images/KPI.webp"}
          alt="Featured"
          fill
          sizes="100vw"
          className="!h-auto !w-full !relative object-cover md:block hidden"
        />
      </div>
      {/* Small Screen */}
      <div
        className="md:hidden  pt-[150px] h-full !w-full"
        style={{
          backgroundColor: "#130e51",
        }}
      >
        <img
          src={"/assets/images/KPI-mob.webp"}
          alt="Featured"
          className="!h-auto !w-full !relative object-cover md:hidden block "
        />
      </div>
    </section>
  );
}
