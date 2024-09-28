"use client";
import Image from "next/image";
import React from "react";
import CustomPopup from "./Menupopup";

export default function Navbar() {
  return (
    <div className="bg-[#ffb800]">
      <div className="flex justify-between items-center p-4">
        <Image
          src="/JanSuraajLogo.png"
          alt="Jan Suraaj Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <CustomPopup />
      </div>
    </div>
  );
}
