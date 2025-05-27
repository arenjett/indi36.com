import { lato } from "@/utils/fonts";
import Topbar from "./Topbar";
import Footer from "./Footer";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const registration = document.getElementById("registration");
      if (registration) {
        const registrationRect = registration.getBoundingClientRect();
        if (registrationRect.bottom <= 0) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignupClick = () => {
    const registration = document.getElementById("registration");
    if (registration) {
      registration.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className={`${lato.className} flex flex-col min-h-screen`}>
        <Topbar />
        <main className="flex-grow">{children}</main>
        <Footer />

        <CustomButton
          disabled={false}
          onClick={handleSignupClick}
          className={`text-xl py-[13px] rounded-none fixed bottom-0 left-1/2 transform -translate-x-1/2 transition-all md:hidden ${
            isSticky ? "opacity-100" : "opacity-0"
          }`}
        >
          Signup Now!
        </CustomButton>
      </div>
    </>
  );
};

export default Layout;
