"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";

export default function SwikarPaper({ name }: { name: string }) {
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
            <p className="text-center">
              {` मैं, ${name}, जन सुराज की विचारधारा को स्वीकार करते हुए यह संकल्प
              लेता/लेती हूँ कि बिहार के समग्र विकास और इसे देश के अग्रणी राज्यों
              में शामिल करने के इस ऐतिहासिक अभियान में अपनी सक्रिय भूमिका
              निभाऊंगा/निभाऊंगी। यह सत्ता परिवर्तन नहीं, बल्कि व्यवस्था परिवर्तन
              का समय है। मैं शिक्षा, स्वास्थ्य, रोजगार और पलायन जैसी चुनौतियों के
              समाधान के लिए जन सुराज के लक्ष्यों का समर्थन करता/करती हूँ और बिहार
              के उज्ज्वल भविष्य के निर्माण का संकल्प लेता/लेती हूँ। संस्थापक सदस्य
              के रूप में, मैं बदलाव की आवाज बनकर इसे हर कोने तक पहुँचाने का प्रयास
              करूंगा/करूंगी।`}
            </p>
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
