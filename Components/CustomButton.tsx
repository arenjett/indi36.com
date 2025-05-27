import Image from "next/image";
import React, { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  disabled: boolean;
}
export default function CustomButton({
  onClick,
  children,
  className,
  disabled,
}: CustomButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      style={{
        backgroundColor: "#0d6efd",
      }}
      className={
        "w-full py-[3px] lg:py-[5px] px-3 text-white font-semibold rounded-md " +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export const SignUpButton = ({
  onClick,
  disabled,
}: {
  onClick?: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      className="text-[16px] relative w-[70%] h-14  mt-5 mx-auto lg:h-20 "
      onClick={onClick}
      disabled={disabled}
    >
      <Image
        src={"/assets/images/btn-logo.png"}
        alt="button"
        fill
        className="object-contain"
      />
    </button>
  );
};
