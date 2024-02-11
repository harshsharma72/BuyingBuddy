"use client";

import * as React from "react";
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

// const data = [
//     {
//         value: 'next.js',
//         label: 'Next.js',
//     },
//     {
//         value: 'sveltekit',
//         label: 'SvelteKit',
//     },
//     {
//         value: 'nuxt.js',
//         label: 'Nuxt.js',
//     },
//     {
//         value: 'remix',
//         label: 'Remix',
//     },
//     {
//         value: 'astro',
//         label: 'Astro',
//     },
// ];

export function Combobox({
  data,
}: {
  data: { value: string; label: string }[];
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const maxLen = Math.max(...data.map((item) => item.label.length));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          style={{ minWidth: `${maxLen}ch` }}
        >
          {value
            ? data.find((item) => item.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {data.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
