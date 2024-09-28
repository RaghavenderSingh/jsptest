"use client";
import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface CountryCode {
  value: string;
  label: string;
}

interface Country {
  name: {
    common: string;
  };
  idd: {
    root: string;
    suffixes?: string[];
  };
}

const PhoneInput: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,idd"
        );
        const data: Country[] = await response.json();
        const formattedData: CountryCode[] = data
          .filter((country) => country.idd.root) // Some countries might not have dialing codes
          .map((country) => ({
            value: country.idd.root + (country.idd.suffixes?.[0] || ""),
            label: `${country.name.common} (${country.idd.root}${
              country.idd.suffixes?.[0] || ""
            })`,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCountryCodes(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching country codes:", error);
        setLoading(false);
      }
    };

    fetchCountryCodes();
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : value
                ? countryCodes.find((code) => code.value === value)?.label
                : "Select country"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryCodes.map((code) => (
                  <CommandItem
                    key={code.value}
                    onSelect={(currentValue: string) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === code.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {code.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Input
          type="tel"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhoneNumber(e.target.value)
          }
          className="ml-2 flex-grow"
        />
      </div>
      {value && phoneNumber && (
        <p className="text-sm text-gray-500">
          Full number: {value}
          {phoneNumber}
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
