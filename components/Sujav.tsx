import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BiVideoRecording } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";

import Pkletter from "./Pkletter";

export default function Sujav({
  sujavPercent,
  setSujavPercent,
}: {
  sujavPercent: number;
  setSujavPercent: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="flex flex-row items-center w-full justify-between border border-gray-800 p-3 rounded-full transition-colors duration-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-300 data-[state=open]:bg-gradient-to-r data-[state=open]:from-yellow-400 data-[state=open]:to-yellow-300 hover:no-underline">
            <div className="flex items-center space-x-8 flex-1 justify-between pr-8">
              <div className="flex items-center space-x-8">
                <IoIosMail size={24} />
                <span>प्रशांत को पत्र</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-4">
            <Pkletter
              sujavPercent={sujavPercent}
              setSujavPercent={setSujavPercent}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border-none">
          <AccordionTrigger className="flex flex-row items-center w-full justify-between border border-gray-800 p-3 rounded-full transition-colors duration-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-300 data-[state=open]:bg-gradient-to-r data-[state=open]:from-yellow-400 data-[state=open]:to-yellow-300 hover:no-underline">
            <div className="flex items-center space-x-8 flex-1 justify-between pr-8">
              <div className="flex items-center space-x-8">
                <BiVideoRecording size={24} />
                <span>वीडियो अभियान</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-4">
            {/* <GramContent /> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
