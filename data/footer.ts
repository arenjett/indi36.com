import gpay from "@/public/assets/images/gpay.webp";
import upi from "@/public/assets/images/upi.webp";
import paytm from "@/public/assets/images/paytm.webp";
import skrill from "@/public/assets/images/skrill.webp";
import neteller from "@/public/assets/images/netseller.webp";
import astro from "@/public/assets/images/astro.webp";
import bitcoin from "@/public/assets/images/bitcoin.webp";
import fb from "@/public/assets/icons/facebook-icon.webp";
import insta from "@/public/assets/icons/insta-icon.webp";
import twitter from "@/public/assets/icons/twitternew.webp";

export const paymentPartners = [
  gpay,
  upi,
  paytm,
  skrill,
  neteller,
  astro,
  bitcoin,
];

export const socials = [
  {
    logo: fb,
    link: "https://www.facebook.com/indibet.official/",
  },
  {
    logo: insta,
    link: "https://www.instagram.com/indipredict/",
  },
  {
    logo: twitter,
    link: "https://twitter.com/indibetofficial",
  },
];

export const otherLinks = [
  // {
  //   title: "Terms of Use",
  //   link: "/terms-of-use",
  // },
  {
    title: "Privacy Policy",
    link: "/",
  },
  // {
  //   title: "Disclaimer",
  //   link: "/disclaimer",
  // },
];
