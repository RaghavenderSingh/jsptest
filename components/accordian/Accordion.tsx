import React, { ReactElement, ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ButtonProps {
  icon: ReactElement;
  text: string;
  percentage: number;
  component: ReactNode;
}

export function CustomAccordion({
  icon,
  text,
  percentage,
  component,
}: ButtonProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-none">
        <div className="relative md:container md:mx-auto border-[1px] rounded-[19px] border-black bg-[#f2f2f2] w-full overflow-hidden">
          <AccordionTrigger className="hover:no-underline px-3 py-2 w-full">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0">
                <div className="rounded-2xl p-2 box-border w-20 h-14 flex justify-center items-center bg-[#ffb800] border-white border-[2px] text-white">
                  {icon}
                </div>
              </div>
              <div className="flex-grow mx-4 font-bold">
                <div className="text-center">{text}</div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative flex justify-center items-center w-14 h-14">
                  <svg
                    className="absolute transform -rotate-90"
                    width="56"
                    height="56"
                  >
                    <circle
                      cx="28"
                      cy="28"
                      r="18"
                      stroke="lightgray"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="18"
                      stroke="#ffb800"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="113.1"
                      strokeDashoffset={113.1 - (113.1 * percentage) / 100}
                    />
                  </svg>
                  <span className="absolute text-sm font-semibold">
                    {percentage}%
                  </span>
                </div>
              </div>
            </div>
          </AccordionTrigger>
        </div>
        <AccordionContent>
          <div className="p-4 mt-2 w-full bg-[#f2f2f2] border border-gray-300 rounded-md shadow-lg">
            <div className="flex justify-center items-center">{component}</div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
