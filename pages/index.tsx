import Banner from "@/Components/Banner";
import Featured from "@/Components/Featured";
import Layout from "@/Components/Layout";
import OfferHighlight from "@/Components/OfferHighlight";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      navigator.standalone;
    // if (isPWA) {
    //   const elem = document.documentElement;

    //   if (elem.requestFullscreen) {
    //     elem.requestFullscreen().catch((err) => {
    //       console.warn("Fullscreen request failed:", err);
    //     });
    //   } else {
    //     console.warn("Fullscreen API is not supported.");
    //   }
    // }
    if (isPWA && !localStorage.getItem("hasVisitedPWA")) {
      localStorage.setItem("hasVisitedPWA", "true");

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "FirstAppOpen",
        status: "first_visit",
        message: "The user has opened the app as a PWA for the first time.",
      });
    }
  }, []);

  useEffect(() => {
    const { query } = router;

    // Remove 'referral' from query parameters
    const { game = "live", ...otherQueryParams } = query;

    // Determine the path based on 'game' query parameter
    const availablePaths: Record<string, string> = {
      home: "home",
      live: "casino",
      slot: "slot",
      indigames: "indigames",
      sports: "sports",
      footballbook: "footballbook",
    };
    const gameKey = Array.isArray(game)
      ? game[0]?.toLowerCase()
      : game.toLowerCase();
    const path = availablePaths[gameKey] || "live";

    const sanitizedQueryParams: Record<string, string> = Object.entries(
      otherQueryParams
    ).reduce((acc, [key, value]) => {
      if (typeof value === "string") {
        acc[key] = value; // Add string values directly
      } else if (Array.isArray(value)) {
        acc[key] = value.join(","); // Join array values into a comma-separated string
      }
      return acc;
    }, {} as Record<string, string>);

    // Rebuild the query string
    const newQueryString = new URLSearchParams(sanitizedQueryParams).toString();

    // Rebuild the query string (without the 'referral' parameter)
    // const newQueryString = new URLSearchParams(otherQueryParams ).toString();

    // Check logged-in status from localStorage (you can use cookies if needed)
    const loggedInStatus = localStorage.getItem("loggedIn");

    if (loggedInStatus === "1") {
      // Redirect to the appropriate URL
      router.push(`https://www.indibet.in/${path}?${newQueryString}`);
    }
  }, [router]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Indibet| Landing</title>
      </Head>
      <Layout>
        <Banner />
        <Featured />
        <OfferHighlight />
      </Layout>
    </>
  );
}
