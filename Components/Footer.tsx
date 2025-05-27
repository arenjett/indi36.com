import { otherLinks, paymentPartners, socials } from "@/data/footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { appendQueryParams } from "@/utils/helpers";

export default function Footer() {
  const router = useRouter();

  return (
    <section className="md:pt-[70px] md:pb-[50px] bg-[#f0f0f0] pt-[10px] h-fit ">
      <div className="md:flex flex-wrap justify-between gap-16 text-center items-center md:px-[45px] md:py-[15px] px-[15px] py-[3px]">
        {/* Left side */}
        <div className="mb-[35px] md:mb-0 max-w-xl">
          <h3 className="footer-heading">Payment partners</h3>
          <div className="flex flex-wrap justify-center gap-4 text-center mb-0">
            {paymentPartners.map((item, index) => (
              <div
                className="md:rounded-2xl rounded-lg"
                key={index}
                style={{ boxShadow: "0 0 15px -3px #9c999c" }}
              >
                <div className="relative w-[80px] h-[34px] md:w-[100px] md:h-[40px] ">
                  <Image
                    src={item}
                    alt="payment partners logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right side */}
        <div>
          <h3 className="footer-heading">Social Media</h3>
          <div className="flex flex-wrap justify-center gap-3 items-center text-center">
            {socials.map((item, index) => (
              <Link href={item.link} target="_blank" key={index}>
                <div className="relative md:w-[50px] md:h-[50px] md:max-w-[44px] w-[25px] h-[25px]">
                  <Image
                    src={item.logo}
                    alt="payment partners logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap mt-7 justify-center md:bg-inherit py-[20px] md:py-0">
            {otherLinks.map((item, index) => (
              <Link
                href={appendQueryParams(item.link, router.asPath)}
                key={index}
                className="flex justify-center underline underline-offset-2  hover:text-[#040d1c] text-[#636368]"
              >
                <p className="text-base md:text-lg">{item.title}</p>
                {index !== otherLinks.length - 1 && (
                  <div className="h-full w-[1.5px] bg-[#636368] mx-2" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
