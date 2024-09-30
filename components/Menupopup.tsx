import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LayoutDashboard, Phone, Home, AlignJustify, X } from "lucide-react";

const CustomPopup = () => {
  const menuItems = [
    {
      text: "डैशबोर्ड",
      icon: LayoutDashboard,
      link: "",
    },
    { text: "होम", icon: Phone, link: " https://www.jansuraaj.org/" },
    { text: "जुड़ें", icon: Home, link: "https://www.jansuraaj.org/join-us" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AlignJustify size={30} className="text-black" />
      </DialogTrigger>
      <DialogContent className="bg-black bg-opacity-50 p-0 max-w-full max-h-full h-screen w-screen flex items-center justify-center">
        <div className="absolute top-4 right-4">
          <DialogTrigger
            className="text-[#ffb800] hover:text-[#ffd700] transition-colors duration-200"
            asChild
          >
            <button>
              <X size={30} />
            </button>
          </DialogTrigger>
        </div>
        <div className="flex flex-col items-center justify-center space-y-8">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer" // Security best practice
              className="flex gap-2 items-center text-[#ffb800] hover:text-[#ffd700] transition-colors duration-200"
            >
              <item.icon size={20} />
              <span className="text-xl">{item.text}</span>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomPopup;
