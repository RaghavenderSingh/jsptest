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
          <AlignJustify size={30} className="text-white" />
        </div>

        <div className="flex-grow flex flex-col justify-center items-center text-white px-4">
          <div className="text-center mb-20">
            <h1 className="text-3xl font-semibold mb-2 pr-5">लाने को बदलाव</h1>
            <h2 className="text-3xl font-semibold pl-16">हम सब हैं तैयार</h2>
          </div>
          <p className="text-3xl  mb-4">जन सुराज</p>

          <UserInfoPopup />
        </div>
      </div>
    </div>
  );
}
