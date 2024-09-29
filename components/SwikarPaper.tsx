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

    console.log("Sharing image URL:", imageUrl);

    // Download the image
    const downloadImage = () => {
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "swikar_paper.jpg"; // You can set a default filename here
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          setStatus("Image downloaded successfully.");
        })
        .catch((error) => {
          console.error("Error downloading image:", error);
          setStatus("Failed to download image.");
        });
    };

    // Download the image
    downloadImage();

    const shareText = "Check out my Swikar Paper!";

    const shareUrl = `https://www.facebook.com/dialog/share?app_id=${
      process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
    }&display=popup&href=${encodeURIComponent(
      imageUrl
    )}&quote=${encodeURIComponent(shareText)}&redirect_uri=${encodeURIComponent(
      window.location.href
    )}`;

    const windowFeatures =
      "width=600,height=400,resizable=yes,scrollbars=yes,status=yes";
    const shareWindow = window.open(shareUrl, "_blank", windowFeatures);

    if (shareWindow) {
      setStatus("Facebook sharing window opened and image download started.");
    } else {
      setStatus(
        "Failed to open sharing window. Please check your pop-up blocker settings. Image download started."
      );
    }
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
        // Construct the public URL of the uploaded image
        const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${filename}`;
        setImageUrl(publicUrl); // Make sure this is set before sharing
        setStatus("Image uploaded successfully. Preparing to share...");

        // Now, pass the correct publicUrl to the sharing function
        shareToFacebook(publicUrl); // Pass the correct URL
        router.push("/home");
      } else {
        setStatus("Failed to upload image");
      }
    } catch (error) {
      setStatus("Error: " + (error as Error).message);
      console.error("Upload error:", error);
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
      </div>
    </div>
  );
}
