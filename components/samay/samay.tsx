"use client";

import React, { useState } from "react";
import { Home, PhoneCallIcon, Youtube } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TeleContent from "./telephone";
import DigiContent from "./digital";
import GramContent from "./gram";
import { toast } from "sonner";

export default function Swikar({
  setSamayPercent,
  samayPercent,
}: {
  setSamayPercent: React.Dispatch<React.SetStateAction<number>>;
  samayPercent: number;
}) {
  console.log("hello1", samayPercent);
  const [data, setData] = useState({
    state: "",
    district: "",
    block: "",
    hour: "",
  });

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h3 className="font-bold w-full text-center mb-4">
        जन सुराज को दिया समय सार्वजनिक करें — बिहार के बदलाव की आवाज़ बनें।
      </h3>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="flex flex-row items-center w-full justify-between border border-gray-800 p-3 rounded-full transition-colors duration-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-300 data-[state=open]:bg-gradient-to-r data-[state=open]:from-yellow-400 data-[state=open]:to-yellow-300 hover:no-underline">
            <div className="flex items-center space-x-8 flex-1 justify-between pr-8">
              <div className="flex items-center space-x-8">
                <PhoneCallIcon size={24} />
                <span>टेलीप्रचारक</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-4">
            <TeleContent
              data={data}
              setData={setData}
              setSamayPercent={setSamayPercent}
              samayPercent={samayPercent}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-none">
          <AccordionTrigger className="flex flex-row items-center w-full justify-between border border-gray-800 p-3 rounded-full transition-colors duration-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-300 data-[state=open]:bg-gradient-to-r data-[state=open]:from-yellow-400 data-[state=open]:to-yellow-300 hover:no-underline">
            <div className="flex items-center space-x-8 flex-1 justify-between pr-8">
              <div className="flex items-center space-x-8">
                <FaYoutube size={27} />
                <span>डिजिटल योद्धा</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-4">
            <DigiContent
              data={data}
              setData={setData}
              setSamayPercent={setSamayPercent}
              samayPercent={samayPercent}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border-none">
          <AccordionTrigger className="flex flex-row items-center w-full justify-between border border-gray-800 p-3 rounded-full transition-colors duration-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-300 data-[state=open]:bg-gradient-to-r data-[state=open]:from-yellow-400 data-[state=open]:to-yellow-300 hover:no-underline">
            <div className="flex items-center space-x-8 flex-1 justify-between pr-8">
              <div className="flex items-center space-x-8">
                <Home size={27} />
                <span>ग्राम वाहिनी</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-4">
            <GramContent data={data} setData={setData} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
