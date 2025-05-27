import "@/styles/globals.css";
import { isFacebookOrInstagramBrowser } from "@/utils/helpers";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if ("serviceWorker" in navigator && !isFacebookOrInstagramBrowser()) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service Worker Registered", reg))
        .catch((err) =>
          console.error("Service Worker Registration Failed", err)
        );
    }
  }, []);
  useEffect(() => {
    if (router.isReady) {
      const queryParams = new URLSearchParams(
        Object.entries(router.query).reduce((acc, [key, value]) => {
          acc[key] = Array.isArray(value) ? value[0] || "" : value || ""; // Handle undefined by defaulting to an empty string
          return acc;
        }, {} as Record<string, string>)
      ).toString();

      // const manifestUrl = "manifest.json"
      if (typeof window !== "undefined") {
        // Get the domain dynamically from window.location.origin
        const manifestUrl = `${window.location.origin}/manifest.json${
          queryParams ? `?${queryParams}` : ""
        }`;
        // Query and cast to HTMLLinkElement
        let manifestLink = document.querySelector(
          "link[rel='manifest']"
        ) as HTMLLinkElement | null;

        if (!manifestLink) {
          // Create the <link rel="manifest"> if it doesn't exist
          manifestLink = document.createElement("link") as HTMLLinkElement;
          manifestLink.rel = "manifest";
          document.head.appendChild(manifestLink);
        }

        // Update the href attribute of the manifest link
        manifestLink.href = manifestUrl;
      }

      // const manifestUrl = `https://indi36.com/manifest.php${queryParams ? `?${queryParams}` : ""
      //   }`;
      // console.log(manifestUrl);

      // // Query and cast to HTMLLinkElement
      // let manifestLink = document.querySelector(
      //   "link[rel='manifest']"
      // ) as HTMLLinkElement | null;

      // if (!manifestLink) {
      //   // Create the <link rel="manifest"> if it doesn't exist
      //   manifestLink = document.createElement("link") as HTMLLinkElement;
      //   manifestLink.rel = "manifest";
      //   document.head.appendChild(manifestLink);
      // }

      // // Update the href attribute of the manifest link
      // manifestLink.href = manifestUrl;
    }
    // Convert router.query (ParsedUrlQuery) to a Record<string, string>
  }, [router.isReady]);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer position="top-center" theme="colored" />
    </>
  );
}
