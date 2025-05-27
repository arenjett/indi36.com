/* eslint-disable @typescript-eslint/no-explicit-any */
import { users } from "@/data/topbar";
import { appendQueryParams } from "@/utils/helpers";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Topbar() {
  const router = useRouter();

  const [amount, setAmount] = useState<any>([]);

  useEffect(() => {
    const temp =
      typeof window !== "undefined"
        ? users.map((user, item) => {
            const amount = Math.floor(Math.random() * (9000 - 1300 + 1)) + 1300;
            return (
              <h5
                className="md:text-[22px] font-medium uppercase text-xs py-2 flex items-center justify-end"
                key={item}
              >
                {user} won{" "}
                <span className="text-primary font-bold">₹{amount}</span>
                &nbsp;this Week
              </h5>
            );
          })
        : [];

    setAmount(temp);
  }, []);

  return (
    <section className="bg-headerBg text-white md:px-[45px] md:py-[15px] px-[15px] py-[3px] flex items-center gap-10">
      <div className="flex justify-between items-center gap-4 md:min-h-[60px] h-[70px] ">
        <Link
          href={appendQueryParams("/", router.asPath)}
          className="w-full md:block hidden"
        >
          <img
            src="/assets/logo.webp"
            alt="logo"
            className="w-auto h-auto md:block hidden object-contain"
          />
        </Link>
        <Link
          href={appendQueryParams("/", router.asPath)}
          className="md:hidden block"
        >
          <img
            src="/assets/logo.webp"
            alt="logo"
            className="w-[100px] h-auto object-contain"
          />
        </Link>
      </div>

      <div className="flex-1  ticker">
        {amount.map((item: any, index: number) => {
          return <span key={index}>{item}</span>;
        })}
      </div>
    </section>
  );
}
