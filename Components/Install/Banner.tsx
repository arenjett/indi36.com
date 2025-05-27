import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdStar } from "react-icons/io";

export default function Banner({
  handleInstall,
  isInstallable,
  isChecking,
  isInstalling,
  progress,
}: {
  handleInstall: () => void;
  isInstallable: boolean;
  isInstalling: boolean;
  isChecking: boolean;
  progress: number;
}) {
  // const startInstalling = () => {
  //   handleInstall();
  //   setIsInstalling(true);
  //   let progressValue = 0;
  //   const interval = setInterval(() => {
  //     progressValue += 10; // Increment progress every second
  //     setProgress(progressValue);
  //     if (progressValue >= 100) {
  //       clearInterval(interval);
  //     }
  //   }, 1000);
  // };

  const getLinkWithQueryParams = () => {
    const queryParams = window.location.search;

    const link = `/${queryParams}`;
    return link;
  };
  return (
    <div className="box-head">
      <div className=" inner">
        <div className="play-block  !w-screen">
          <Image
            src="/assets/pwa/banner.jpg"
            alt="banner"
            fill
            className="h-full w-full object-cover !relative"
          />
          <div className="jaQz3d"></div>
        </div>

        <div className="info-block">
          <div className="main-up">
            <div className="logo w-[25%]">
              <div className="box"></div>
              <Image
                src={"/assets/pwa/indibet.webp"}
                alt="banner"
                fill
                priority
                className="h-full  object-cover !relative"
                // onError={(e) => {
                //   e.currentTarget.onerror = null;
                //   e.currentTarget.src = "/assets/pwa/icon.webp";
                // }}
              />
            </div>
            <div className="info">
              <h1 className="text-[54px] font-bold">Indibet</h1>
              <h2 className="text-[#6DF378] text-[16px] mt-[5px]">
                IndiGames LLC
              </h2>
              <p className="text-[#C8C8C8] text-[16px]">Verified by App</p>
            </div>
          </div>

          <div className="meta-block">
            <div className="logo">
              <div className="box"></div>
              <Image
                src={"/assets/pwa/indibet.webp"}
                alt="banner"
                fill
                priority
                className="h-full  object-cover !relative"
                // onError={(e) => {
                //   e.currentTarget.onerror = null;
                //   e.currentTarget.src = "/assets/pwa/icon.webp";
                // }}
              />
            </div>

            <ul className="information-list">
              <li>
                <strong>
                  4.8
                  <IoMdStar size={16} />
                </strong>
                <p className="whitespace-nowrap font-light">8M reviews</p>
              </li>
              <li>
                <strong>10M +</strong>
                <p className="whitespace-nowrap font-light">Downloads</p>
              </li>
              <li>
                <strong className="text-[#fff] h-[28px] flex items-center justify-center gap-1 p-1 bg-gray-600 rounded-md w-fit mx-auto">
                  18+
                </strong>
                <p className="whitespace-nowrap font-light">Rated for 18+</p>
              </li>
            </ul>
          </div>
          <div className="other-block">
            {!isChecking && (
              <div className="shiny relative overflow-hidden ">
                {
                  isInstallable ? (
                    !isInstalling ? (
                      <button
                        className="btn hover:bg-[#71ce3c]"
                        onClick={handleInstall}
                      >
                        Install
                      </button>
                    ) : progress < 100 ? (
                      <div className="progress-bar w-full bg-black min-w-[300px]">
                        <div style={{ width: `${progress}%` }}></div>
                        <span>{progress}%</span>
                      </div>
                    ) : (
                      <Link href={getLinkWithQueryParams()} target="_blank">
                        <button
                          id="reInstall"
                          className="btn hover:bg-[#71ce3c]"
                        >
                          Play
                        </button>
                      </Link>
                    )
                  ) : (
                    <Link href={getLinkWithQueryParams()} target="_blank">
                      <button id="reInstall" className="btn hover:bg-[#71ce3c]">
                        Play
                      </button>
                    </Link>
                  )
                  // : (
                  //   <Link href={"https://www.indibet.in/home?"} target="_blank">
                  //     <button
                  //       id="reInstall"
                  //       className="btn hover:bg-[#71ce3c]"
                  //       // onClick={openPWA}
                  //       // onClick={handleInstall}
                  //     >
                  //       Play Now
                  //     </button>
                  //   </Link>
                  // )
                }
                {/* <div id="installing" className="btn">
                <div id="proess"></div>
                <span id="count">0</span>
                <span>%</span>
              </div>
              <button
                id="play"
                onClick={() => console.log("clicked")}
                className="btn"
              >
                Play
              </button> */}
              </div>
            )}
            <ul className="google-share-btns flex items-center justify-center text-[#6DF378] gap-[33px] lg:mt-0 mt-[15px]">
              <li className="flex items-center gap-[8px]">
                <svg
                  className="f70z8e"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
                    fill="#6DF378"
                  />
                </svg>
                <span>Share</span>
              </li>
              <li className="flex items-center gap-[8px]">
                <svg
                  viewBox="0 0 24 24"
                  className="XkAcee"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 3H17C18.1045 3 19 3.8955 19 5V21L12 18L5 21L5.01075 5C5.01075 3.8955 5.8965 3 7 3ZM12 15.824L17 18V5H7V18L12 15.824ZM13 7V9H15V11H13V13H11V11H9V9H11V7H13Z"
                    fill="#6DF378" // Adjust color here
                  />
                </svg>
                <span>Add to wishlist</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
