/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AboutApp from "@/Components/Install/AboutApp";
import Banner from "@/Components/Install/Banner";
import ScreenShots from "@/Components/Install/ScreenShots";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useRouter } from "next/router";
import { isFacebookOrInstagramBrowser } from "@/utils/helpers";

// Types
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Helpers
const isAndroidDevice = () =>
  navigator.userAgent.toLowerCase().includes("android");



const pushToDataLayer = (event: string, status: string, message: string) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, status, message });
  }
};
const InstallPage = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [installAvailable, setInstallAvailable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const [progress, setProgress] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isChecking, setIsChecking] = useState(true);
  const [checkingAndroid, setCheckingAndroid] = useState(true);
  const [everythingReady, setEverythingReady] = useState(false);
  const [clickDisabled, setClickDisabled] = useState(false);
  const [checkingStandalone, setCheckingStandalone] = useState(true);

  const router = useRouter();

  // // Effect: If already installed, skip loading and show play
  // useEffect(() => {
  //   if (
  //     typeof window !== "undefined" &&
  //     localStorage.getItem("userAppInstalled") === "true"
  //   ) {
  //     setEverythingReady(true);
  //     setInstallAvailable(false);
  //     setIsInstallable(false);
  //     setIsChecking(false);
  //   }
  //   // No cleanup needed
  // }, []);

  // Redirect if not android
  useEffect(() => {
    const redirectIfNotAndroid = () => {
      if (!isAndroidDevice()) {
        const queryParams = new URLSearchParams(
          router.query as Record<string, string>
        ).toString();
        const redirectUrl = queryParams ? `/?${queryParams}` : "/";
        window.location.href = redirectUrl;
      } else {
        setCheckingAndroid(false);
      }
    };

    if (router.isReady) {
      redirectIfNotAndroid();
    }

    setCurrentUrl(window.location.href);

    if (isFacebookOrInstagramBrowser() && isAndroidDevice()) {
      setModalVisible(true);
      openInChrome();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      const queryParams = new URLSearchParams(
        router.query as Record<string, string>
      ).toString();
      const redirectUrl = queryParams ? `/?${queryParams}` : "/";
      router.replace(redirectUrl);
    } else {
      setCheckingStandalone(false);
    }
  }, [router]);

  // Handle PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setIsInstallable(true);
      setInstallAvailable(true);
      setIsChecking(false);
      if (process.env.NODE_ENV === "development") {
        console.log("✅ beforeinstallprompt event fired");
      }
    };

    // Updated checkEverythingReady logic
    const checkEverythingReady = async () => {
      if (document.readyState !== "complete") return;

      try {
        const isHttps = window.location.protocol === "https:";

        const swReady =
          "serviceWorker" in navigator &&
          (await navigator.serviceWorker.ready).active?.state === "activated";

        const manifest = document
          .querySelector("link[rel='manifest']")
          ?.getAttribute("href");

        if (isHttps && swReady && manifest) {
          setEverythingReady(true);
          setIsChecking(false);
        }
      } catch (error) {
        console.warn("Service worker check failed:", error);
      }
    };
    const interval = setInterval(() => {
      checkEverythingReady();
    }, 500);

    const timeoutId = setTimeout(() => {
      setEverythingReady(true);
    }, 8000);

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, []);

  // Install handling
  const handleInstall = () => {
    pushToDataLayer(
      "InstallClick",
      "clicked",
      "User clicked the install button."
    );
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          setIsInstalling(true);
          startProgress(16000); // 16 seconds installation progress
          if (process.env.NODE_ENV === "development") {
            console.log("User accepted the install prompt");
          }
        } else {
          setIsInstallable(true);
          setIsInstalling(false);
          pushToDataLayer(
            "InstallFailed",
            "failed",
            "The app installation was canceled."
          );
          if (process.env.NODE_ENV === "development") {
            console.log("User dismissed the install prompt");
          }
        }
        setDeferredPrompt(null);
      });
    }
  };

  const startProgress = (durationMs: number) => {
    const steps = 100;
    const intervalMs = durationMs / steps;
    let currentProgress = 0;

    const intervalId = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(intervalId);
        setIsInstalling(false);
        setIsInstallable(false);
        setInstallAvailable(false);
        // Store install state in localStorage

        pushToDataLayer(
          "InstallSuccess",
          "success",
          "The app was successfully installed."
        );
      }
    }, intervalMs);
  };

  // Handle clicks
  const handleClickAnywhere = useCallback(() => {
    if (
      isInstallable &&
      everythingReady &&
      !isChecking &&
      deferredPrompt &&
      !isInstalling &&
      !clickDisabled
    ) {
      setClickDisabled(true);
      handleInstall();
      setTimeout(() => setClickDisabled(false), 3000); // prevent double click within 3 sec
    }
  }, [
    isInstallable,
    everythingReady,
    isChecking,
    deferredPrompt,
    isInstalling,
    clickDisabled,
  ]);

  useEffect(() => {
    if (!isInstalling) {
      document.addEventListener("click", handleClickAnywhere);
      return () => {
        document.removeEventListener("click", handleClickAnywhere);
      };
    }
  }, [handleClickAnywhere, isInstalling]);

  const openInChrome = () => {
    const url = window.location.href;
    const intentUrl = `intent://${url.replace(
      "https://",
      ""
    )}#Intent;scheme=https;package=com.android.chrome;end;`;
    window.location.href = intentUrl;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  if (checkingAndroid || checkingStandalone) return null;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Install</title>
      </Head>
      <div className="mb-10">
        <Banner
          everythingReady={everythingReady}
          isInstallable={isInstallable}
          installAvailable={installAvailable}
          isChecking={isChecking}
          isInstalling={isInstalling}
          progress={progress}
        />
        <div className="box-bd">
          <ScreenShots />
          <AboutApp />
        </div>
        {/* <h1>Install Our App</h1>
        <p>Click the button below to install the app on your device.</p> */}
        {/* {isInstallable ? (
          <button onClick={handleInstall}>Install App</button>
        ) : (
          <p>The app is already installed or not eligible for installation.</p>
        )} */}
      </div>
      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div>
            <div className="flex justify-end">
              <button
                onClick={openInChrome}
                className="mt-4 w-fit p-2 text-white border-white border-2 rounded-full mb-2 font-bold"
              >
                <CgClose />
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 lg:max-w-md lg:w-full w-fit max-w-sm">
              <p className="mb-4 text-gray-600">
                1. Open <span className="font-bold">Chrome</span> to install.
              </p>
              <div className="space-y-3">
                <button
                  onClick={openInChrome}
                  className="w-full px-4 py-2 text-white bg-[#00875F] hover:bg-[#00875ee2] rounded-lg flex justify-center items-center gap-2"
                >
                  <img
                    src="/assets/icons/chromicon.png"
                    alt="chrome icon"
                    className="w-[20px] h-[20px]"
                  />{" "}
                  Open in Chrome
                </button>
              </div>
              <p className="mb-4 text-gray-600 mt-8">
                2. Copy the link and paste on chrome to install.
              </p>
              <p className="mt-4 text-sm text-gray-500 whitespace-nowrap text-ellipsis !overflow-hidden">
                <code className="bg-gray-100 px-2 py-1 rounded ">
                  {currentUrl}
                </code>
              </p>
              <button
                onClick={copyLink}
                className="w-full mt-3 px-4 py-2 text-[#00875F] bg-gray-100 hover:bg-gray-200 rounded-lg border border-[#00875F]"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallPage;
