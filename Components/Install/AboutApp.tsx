import React from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { SlCloudUpload } from "react-icons/sl";
import { MdLockOutline } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
export default function AboutApp() {
  return (
    <>
      <div className="introduce app-about">
        <h2>About this app</h2>
        <div className="text-[#5f6368]">
          Welcome to Indibet – Your Gateway to Ultimate Thrills! Step into a
          world of excitement with 5000+ casino games and sports predictions at
          your fingertips. Whether you&apos;re a casual player or a seasoned pro,
          Indibet offers the best odds and a seamless gaming experience tailored
          to you.
          <br />
          Enjoy fastest withdrawals, ensuring you get your winnings quickly and
          hassle-free. With a community of over 1 crore users, you&apos;re part of
          India&apos;s most trusted and safest platform for gaming. From live sports
          predictions to immersive casino games, there&apos;s something for everyone.
          <br />
          Take advantage of our exclusive 250% deposit bonus up to ₹25,000 to
          kickstart your journey. Discover a platform packed with exciting
          events, real-time stats, and unmatched features to elevate your gaming
          experience.
          <br />
          Join the Indibet family today and make every game a win! Download now
          and get ready for a world of entertainment and rewards. Let the
          winning streak begin!
          <br />
          <br />
          DISCLAIMER:- This product is intended for use by users aged 18 and
          over and is for entertainment purposes only
          <br />
          <br />
        </div>
        <h2>Data safety</h2>
        <div className="text-[#5f6368] mb-4">
          Safety starts with understanding how developers collect and share your
          data. Data privacy and security practices may vary based on your
          use,region, and age. The developer provided this information and may
          update it over time.
        </div>
      </div>
      <div className="data-safety-list text-[#5f6368]">
        <ul>
          <li className="gap-5">
          <IoShareSocialOutline size={20}/>
            <div>
              No data shared with third parties{" "}
              <p><span className="underline">Learn more
                </span> about how developers declare sharing</p>
            </div>
          </li>
          <li className="gap-5">
           <SlCloudUpload size={20}/>
            <div>
              This app may collect these data types{" "}
              <p>Location, Personal info and 5 others</p>
            </div>
          </li>
          <li className="gap-5">
           <MdLockOutline size={20}/>
            <div>Data is encrypted in transit</div>
          </li>
          <li className="gap-5">
           <IoTrashOutline  size={20}/>
            <div>You can request that data be deleted</div>
          </li>
        </ul>
        <p className="!text-[#267E69]">See details</p>
      </div>
    </>
  );
}
