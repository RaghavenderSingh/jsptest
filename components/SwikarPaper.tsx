"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function SwikarPaper({ content }: { content: string }) {
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState<string>(""); // Store uploaded image URL
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const getPresignedUrl = async () => {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  const uploadAndShareImage = async (blob: Blob) => {
    try {
      setStatus("Generating pre-signed URL...");
      const { url: presignedUrl, filename } = await getPresignedUrl();

      setStatus("Uploading image...");
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: blob,
        headers: {
          "Content-Type": "image/png",
        },
      });

      if (response.ok) {
        const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${filename}`;
        setImageUrl(publicUrl); // Save image URL for sharing
        setStatus("Image uploaded successfully. Preparing to share...");
        shareToFacebook(publicUrl); // Share uploaded image
      } else {
        setStatus("Failed to upload image");
      }
    } catch (error) {
      setStatus("Error: " + (error as Error).message);
      console.error("Upload error:", error);
    }
  };

  const handleCheckboxChange = async (checked: boolean) => {
    setIsChecked(checked);
    if (checked && contentRef.current) {
      try {
        setStatus("Generating image...");
        const canvas = await html2canvas(contentRef.current, {
          scale: 4,
          useCORS: true,
          logging: true,
          backgroundColor: null,
        });

        canvas.toBlob(
          (blob) => {
            if (blob) {
              uploadAndShareImage(blob);
            }
          },
          "image/png",
          1.0
        );
      } catch (error) {
        console.error("Error generating image:", error);
        setStatus("Error generating image");
      }
    }
  };

  const shareToFacebook = (imageUrl: string) => {
    if (!imageUrl) {
      setStatus("Error: No image URL provided");
      return;
    }

    const fullImageUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `${window.location.origin}${
          imageUrl.startsWith("/") ? "" : "/"
        }${imageUrl}`;

    const shareText = "Check out my Swikar Paper!"; // Customize this message

    const shareUrl = `https://www.facebook.com/dialog/share?app_id=${
      process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
    }&display=popup&href=${encodeURIComponent(
      fullImageUrl
    )}&quote=${encodeURIComponent(shareText)}&redirect_uri=${encodeURIComponent(
      window.location.href
    )}`;

    const windowFeatures =
      "width=600,height=400,resizable=yes,scrollbars=yes,status=yes";
    const shareWindow = window.open(shareUrl, "_blank", windowFeatures);

    if (shareWindow) {
      setStatus("Facebook sharing window opened. You can close this page now.");
    } else {
      setStatus(
        "Failed to open sharing window. Please check your pop-up blocker settings."
      );
    }
  };

  return (
    <div className="bg-[#f2f2f2] p-4">
      {/* Adding Open Graph meta tags dynamically based on imageUrl */}
      <Head>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Check out my Swikar Paper!" />
        <meta
          property="og:description"
          content="This is my Swikar Paper generated with Jan Suraaj!"
        />
        <meta
          property="og:image"
          content={
            imageUrl ||
            `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/default-share-image.png`
          } // Fallback to default image if no imageUrl is available
        />
      </Head>

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
      <div className="flex flex-col justify-center items-center mt-4 gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
          />
          <span>
            {
              "मैं संकल्प लेता हूं कि मैं जन सुराज की सफलता में भागेदार बनता हूं"
            }
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {isChecked
            ? "Checking this box will generate and share your Swikar Paper on Facebook."
            : "Check this box to generate and share your Swikar Paper on Facebook."}
        </p>
      </div>
      <p className="text-center mt-4 font-semibold">{status}</p>
    </div>
  );
}
