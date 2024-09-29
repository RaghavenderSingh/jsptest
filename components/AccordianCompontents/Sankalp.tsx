"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { IoIosMusicalNotes } from "react-icons/io";
import { PiPhoneCall } from "react-icons/pi";
import CustomAvatar from "../CustomAvatar";
import SwikarPaper from "../SwikarPaper";
import { useSession } from "next-auth/react";

export default function Sankalp({
  setSankapPercent,
  sankapPercent,
}: {
  setSankapPercent: React.Dispatch<React.SetStateAction<number>>;
  sankapPercent: number;
}) {
  const [image, setImage] = useState<string | null>(null);
  const [hasUploaded, setHasUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [facebookShared, setFacebookShared] = useState(false);
  const session = useSession();

  // Load image from local storage on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setImage(savedImage);
      setHasUploaded(true);
    }
  }, []);

  // Update percent and store image in local storage
  useEffect(() => {
    if (image && !hasUploaded) {
      setSankapPercent((prevPercent) => prevPercent + 25);
      localStorage.setItem("uploadedImage", image); // Save the image in local storage
      setHasUploaded(true);
    }
  }, [image, hasUploaded, setSankapPercent]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  console.log("facebookShared", facebookShared);
  return (
    <div>
      <div>
        <p className="text-center font-bold text-sm ">
          जन सुराज को दिया संकल्प सार्वजनिक करें — डिजिटल रूप से अपनी आवाज़
          बुलंद करें।
        </p>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
        <button
          onClick={handleButtonClick}
          className="w-full sm:w-auto h-[40px] sm:h-[50px] rounded-3xl flex items-center justify-center px-3 sm:px-4 relative overflow-hidden transition-all duration-300 ease-in-out text-xs sm:text-sm md:text-base bg-white hover:bg-gradient-to-r hover:from-[#ffb800] hover:via-[#efd80b] hover:to-[#efd80b] group"
        >
          <span className="mr-6 sm:mr-8 text-black transition-colors duration-300">
            व्हाट्सएप डी.पी लगाएं
          </span>
          <FaWhatsapp className="absolute right-2 sm:right-4 text-sm sm:text-lg text-black" />
        </button>
        {image && <CustomAvatar selectedImage={image} name="Jan Suraaj" />}
        <button
          onClick={() => {
            setFacebookShared(!facebookShared);
          }}
          className="w-full sm:w-auto h-[40px] sm:h-[50px] rounded-3xl flex items-center justify-center px-3 sm:px-4 relative overflow-hidden transition-all duration-300 ease-in-out text-xs sm:text-sm md:text-base bg-white hover:bg-gradient-to-r hover:from-[#ffb800] hover:via-[#efd80b] hover:to-[#efd80b] group"
        >
          <span className="mr-6 sm:mr-8 text-black transition-colors duration-300">
            फेसबुक पर बताएं
          </span>
          <FaFacebookF className="absolute right-2 sm:right-4 text-sm sm:text-lg text-black" />
        </button>
        {facebookShared === true ? (
          <div className="w-full bg-white">
            <SwikarPaper
              content={`मैं, ${session.data?.user.name}, जन सुराज की विचारधारा को स्वीकार करते हुए यह संकल्प लेता/लेती हूँ कि बिहार के समग्र विकास और इसे देश के अग्रणी राज्यों में शामिल करने के इस ऐतिहासिक अभियान में अपनी सक्रिय भूमिका निभाऊंगा/निभाऊंगी।
मैं जन सुराज को स्वीकार करके, संकल्प में उनका साथ साझा करता हूँ। जन सुराज से जुड़कर आप भी अपना संकल्प देके भागेदार बनें।`}
            />
          </div>
        ) : (
          <></>
        )}
        <button className="w-full sm:w-auto h-[40px] sm:h-[50px] rounded-3xl flex items-center justify-center px-3 sm:px-4 relative overflow-hidden transition-all duration-300 ease-in-out text-xs sm:text-sm md:text-base bg-white hover:bg-gradient-to-r hover:from-[#ffb800] hover:via-[#efd80b] hover:to-[#efd80b] group">
          <span className="mr-6 sm:mr-8 text-black transition-colors duration-300">
            जन सुराज की रिंगटोन लगाएं
          </span>
          <IoIosMusicalNotes className="absolute right-2 sm:right-4 text-sm sm:text-lg text-black" />
        </button>
        <button className="w-full sm:w-auto h-[40px] sm:h-[50px] rounded-3xl flex items-center justify-center px-3 sm:px-4 relative overflow-hidden transition-all duration-300 ease-in-out text-xs sm:text-sm md:text-base bg-white hover:bg-gradient-to-r hover:from-[#ffb800] hover:via-[#efd80b] hover:to-[#efd80b] group">
          <span className="mr-6 sm:mr-8 text-black transition-colors duration-300">
            जन सुराज कॉलर ट्यून लगाएं
          </span>
          <PiPhoneCall className="absolute right-2 sm:right-4 text-sm sm:text-lg text-black" />
        </button>
      </div>
    </div>
  );
}
