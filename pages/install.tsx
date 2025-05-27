/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AboutApp from "@/Components/Install/AboutApp";
import Banner from "@/Components/Install/Banner";
import ScreenShots from "@/Components/Install/ScreenShots";
import Head from "next/head";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useRouter } from "next/router";
import Image from "next/image";

const InstallPage = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFacebookBrowser, setIsFacebookBrowser] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isChecking, setIsChecking] = useState(true);
  const [checkingAndroid, setCheckingAndroid] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const detectAndroidDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      return userAgent.includes("android");
    };

    const redirectIfNotAndroid = () => {
      if (!detectAndroidDevice()) {
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
    const detectFacebookBrowser = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      return (
        userAgent.includes("fban") ||
        userAgent.includes("fbav") ||
        userAgent.includes("instagram")
      );
    };

    setCurrentUrl(window.location.href);

    if (detectFacebookBrowser()) {
      if (!detectAndroidDevice()) {
        return;
      } else {
        const currentUrl = window.location.href;
        const intentUrl = `intent://${currentUrl.replace(
          "https://",
          ""
        )}#Intent;scheme=https;package=com.android.chrome;end;`;
        window.location.href = intentUrl;
        setIsFacebookBrowser(true);
        setModalVisible(true);
      }
    }
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (event: any) => {
      // Prevent the default mini-infobar or popup
      event.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(event);
      // Update installable state
      setIsInstallable(true);
    };
    const timeout = setTimeout(() => setIsChecking(false), 3000);
    // Add event listener for beforeinstallprompt
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      clearTimeout(timeout);
      // Cleanup the event listener
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [router.isReady]);

  const openInChrome = () => {
    const currentUrl = window.location.href;
    const intentUrl = `intent://${currentUrl.replace(
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

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleInstall = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "InstallClick",
      status: "clicked",
      message: "User clicked the install button.",
    });
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user's response
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          setIsInstalling(true);

          let progressValue = 0;
          const interval = setInterval(() => {
            progressValue += 1;
            setProgress(progressValue);

            if (progressValue >= 100) {
              clearInterval(interval);
              setIsInstalling(false);
              setIsInstallable(false);

              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: "InstallSuccess",
                status: "success",
                message: "The app was successfully installed.",
              });
            }
          }, 160);

          console.log("User accepted the install prompt");
        } else {
          setIsInstallable(false);
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "InstallFailed",
            status: "failed",
            message: "The app installation was canceled.",
          });
          console.log("User dismissed the install prompt");
        }
        // Reset the deferred prompt
        setDeferredPrompt(null);
      });
    }
  };

  // useEffect(() => {
  //   const queryParams = window.location.search; // Capture current query params
  //   console.log(queryParams);
  //   // Check if it's the first launch
  //   if (!localStorage.getItem("firstLaunch")) {
  //     localStorage.setItem("firstLaunch", "true");
  //     // Do something special on first launch, like redirecting
  //     const queryParams = window.location.search; // Capture current query params
  //     console.log(queryParams);
  //     window.location.href = `/` + queryParams; //
  //   }
  // }, []);
  if (!checkingAndroid)
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Install</title>
        </Head>
        <div className="mb-10">
          <Banner
            isInstallable={isInstallable}
            handleInstall={handleInstall}
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
                    <Image
                      src="/assets/icons/chromicon.png"
                      alt="chrome icon"
                      width={20}
                      height={20}
                    />
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
  else return <div></div>;
};

export default InstallPage;
