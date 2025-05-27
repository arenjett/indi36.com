import Image from "next/image";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import OtpRegisterForm from "./OtpRegistration";
import { useRouter } from "next/router";

export default function Banner() {
  const router = useRouter();
  const { cr } = router.query;
  const [bg, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      let folder = null;
      if (cr === undefined) {
        folder = "default";
      } else {
        folder = cr;
      }

      const setBgImageByOrientation = () => {
        if (window.matchMedia("(orientation: portrait)").matches) {
          setBackgroundImage(`/themes/${folder}/002.webp`);
        } else {
          setBackgroundImage(`/themes/${folder}/001.webp`);
        }
      };
      setBgImageByOrientation();
      window.addEventListener("resize", setBgImageByOrientation);
      return () => {
        window.removeEventListener("resize", setBgImageByOrientation);
      };
    }
    // }
  }, [cr,router.isReady]);

  return (
    <section>
      {/* Mobile banner image */}

      {bg && router?.isReady && (
        <Image
          src={bg}
          alt="Banner"
          fill
          sizes="100vw"
          className="md:h-auto w-full !relative object-cover md:hidden block"
        />
      )}

      <div className="bg-[url('/assets/images/banner-bg.webp')] py-[50px] px-[30px] bg-center bg-no-repeat bg-cover h-[310px] md:h-full">
        <div className="md:flex justify-between items-center h-full w-full flex-wrap px-3">
          <div className="md:w-[66%] w-full md:h-full" id="registration">
            {/* Medium to large banner image */}
            <div className=" md:w-[90%] w-full mx-auto md:block hidden md:h-[310px] md:h-full">
              {bg && router?.isReady && (
                <Image
                  src={bg}
                  alt="banner"
                  fill
                  sizes="59vw"
                  className="md:h-auto w-[90%] !relative hidden md:block rounded-2xl object-contain"
                />
              )}
            </div>
          </div>
          <div className="relative flex items-center flex-1">
            <div
              className=" z-[10]
            w-full
            flex justify-center md:block
            md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 
            md:static md:transform-none"
            >
              <div
                className=" h-fit bg-[#f0f0f0] p-5 rounded-xl  max-w-[600px]
            shadow-md border-2 border-[#6a678c]"
              >
                <h6 className="text-md text-black uppercase font-bold mb-2">
                  Win Real Cash with IPL
                </h6>
                <OtpRegisterForm />

                <div className="flex items-center gap-2 md: my-[10px] ">
                  <div className="w-full h-[1px] !bg-[#909090]" />
                  <p className="text-[#8f8f93] text-[14px]">OR</p>
                  <div className="w-full h-[1px] !bg-[#909090]" />
                </div>
                <div className="mt-4 text-center text-sm text-[#808185]">
                  <p className="mb-4">
                    Already have an account?{" "}
                    <Link
                      href="https://www.indibet.in/home"
                      className="text-[#0d6efd] underline hover:text-[#0d6efd]"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
