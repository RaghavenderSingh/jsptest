"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CircleUserRoundIcon } from "lucide-react";

import SwikarPaper from "./SwikarPaper";
import { signIn } from "next-auth/react";

export default function UserInfoPopup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [displayPaper, setDisplayPaper] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        name,
        phone,
        email,
      });

      if (result?.ok) {
        setDisplayPaper(true);
      } else {
        console.error("Failed to authenticate user");
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-8 py-3 rounded-lg shadow-lg text-lg font-semibold"
        >
          स्वीकार
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[390px] w-[calc(100%-2rem)] mx-auto rounded-lg bg-slate-200">
        {!displayPaper ? (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center justify-between flex-col gap-[6px]">
                  <CircleUserRoundIcon size={60} className="text-yellow-400" />
                  <p className="text-xl font-[900]">कृपया आगे बढ़ने से पहले</p>
                  <p className="text-xl font-[900]">निम्नलिखित जानकारी भरें</p>
                </div>
              </DialogTitle>
              <DialogDescription>
                <div className="flex flex-col gap-4 mt-5">
                  <Input
                    className="bg-white rounded-2xl"
                    placeholder="नाम"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    className="bg-white rounded-2xl"
                    placeholder="फ़ोन नंबर"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <Input
                    className="bg-white rounded-2xl"
                    placeholder="ईमेल"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <div className="flex flex-col gap-4 w-full mt-4">
                <Button
                  className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-2xl w-full"
                  type="submit"
                >
                  स्वीकार करे
                </Button>
                {/* <Button
                className="bg-white text-black rounded-2xl w-full"
                type="button"
              >
                फ़ेसबुक के साथ आगे बड़े
              </Button> */}
              </div>
            </DialogFooter>
          </form>
        ) : (
          <div className="w-full bg-white">
            <SwikarPaper name={name} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
