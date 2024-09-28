"use client";
import html2canvas from "html2canvas";
import React, { useRef } from "react";
import { IoMdDownload } from "react-icons/io";

interface CustomAvatarProps {
  name: string;
  selectedImage: string | null;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ name, selectedImage }) => {
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = async () => {
    if (!avatarRef.current) return;

    try {
      // Convert the div content into canvas
      const canvas = await html2canvas(avatarRef.current, {
        useCORS: true, // For cross-origin images
        scale: 2, // For higher resolution
      });

      // Convert the canvas to a downloadable image
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${name}_avatar.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading avatar:", error);
      alert("Failed to download avatar. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 m-2">
      {/* Container to capture */}
      <div ref={avatarRef} className="relative w-64 h-64 p-5 m-3">
        {/* Circular frame preview */}
        <div className="absolute inset-0 rounded-full border-4 border-[#f5cd4a] overflow-hidden">
          {selectedImage && (
            <img
              src={selectedImage}
              alt={name}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Bottom yellow section */}
        <div className="absolute bottom-0 left-0 right-0 rounded-lg h-1/4 bg-[#ffcd19] flex flex-col items-center justify-center p-2">
          <img src="/frameLogo.png" alt="Logo" width={160} height={100} />
        </div>
      </div>

      {/* Button to trigger download */}
      <div>
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto h-[40px] sm:h-[50px] rounded-3xl flex items-center justify-center px-3 sm:px-4 bg-white text-black"
        >
          <IoMdDownload />
          {" डाउनलोड"}
        </button>
      </div>
    </div>
  );
};

export default CustomAvatar;
