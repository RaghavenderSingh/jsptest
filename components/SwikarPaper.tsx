"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";

export default function SwikarPaper({ content }: { content: string }) {
  const [isChecked, setIsChecked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleCheckboxChange = async (checked: boolean) => {
    setIsChecked(checked);
    if (checked && contentRef.current) {
      try {
        // Use a higher scale for better image quality
        const canvas = await html2canvas(contentRef.current, {
          scale: 4, // Increase scale for higher resolution
          useCORS: true, // For handling external images
          logging: true, // For debugging
          backgroundColor: null, // For transparent background
        });

        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create a download link
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "high-quality-swikar-paper.png";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);

              // Share to Facebook
              shareToFacebook(url);
            }
          },
          "image/png",
          1.0
        ); // Use maximum quality for PNG
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

  const shareToFacebook = (imageUrl: string) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      imageUrl
    )}`;
    router.push("/home");
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="bg-[#f2f2f2]">
      <div className="flex justify-center items-center">
        <Image
          src="/thanks.png"
          alt="Jan Suraaj Logo"
          width={180}
          height={180}
          className="rounded-full"
        />
      </div>
      <div
        ref={contentRef}
        className="flex flex-col justify-center items-center text-center mt-4"
      >
        <div
          style={{
            backgroundImage: "url('/frame.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "500px",
            width: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="w-[200px] text-center text-[12px]">
            <p className="text-center">{content}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 gap-2">
        <Checkbox checked={isChecked} onCheckedChange={handleCheckboxChange} />
        <span>
          {"मैं संकल्प लेता हूं कि मैं जन सुराज की सफलता में भागेदार बनता हूं"}
        </span>
      </div>
    </div>
  );
}
