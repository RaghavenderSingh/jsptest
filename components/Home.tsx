import React from "react";
import Image from "next/image";
import { AlignJustify } from "lucide-react";
import UserInfoPopup from "./UserInfoPopup";

export default function Home() {
  return (
    <div className="relative h-screen bg-yellow-100">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bolder-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-center p-4">
          <Image
            src="/JanSuraajLogo.png"
            alt="Jan Suraaj Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>

        <div className="flex-grow flex flex-col justify-end text-white px-4">
          <div className="text-center mb-[50px]">
            <h1 className="text-3xl md:text-4xl pr-5 font-semibold mb-2">
              लाने को बदलाव
            </h1>
            <h2 className="text-2xl md:text-3xl pl-16 font-semibold">
              हम सब हैं तैयार
            </h2>
          </div>
          <div className="mb-[4rem] w-full text-center flex flex-col gap-2 items-center justify-center">
            <p className="text-2xl md:text-3xl">जन सुराज</p>
            <UserInfoPopup />
          </div>
        </div>
      </div>
    </div>
  );
}
