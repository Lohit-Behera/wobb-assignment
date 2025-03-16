import type React from "react";

import { useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "fitness", label: "Fitness" },
  { value: "food", label: "Food & Beverage" },
  { value: "travel", label: "Travel" },
  { value: "tech", label: "Technology" },
  { value: "lifestyle", label: "Lifestyle" },
];

const payoutTypes = [
  { value: "all", label: "All Types" },
  { value: "fixed", label: "Fixed Pay" },
  { value: "barter", label: "Barter" },
  { value: "refund", label: "Refunds" },
];

interface CampaignFilterProps {
  onFilterChange?: (filters: {
    search: string;
    category: string;
    payoutType: string;
    sort: string;
  }) => void;
}

export function CampaignFilter({ onFilterChange }: CampaignFilterProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [payoutType, setPayoutType] = useState("all");
  const [sort, setSort] = useState("newest");
  const [openCategory, setOpenCategory] = useState(false);
  const [openPayoutType, setOpenPayoutType] = useState(false);

  const handleFilterChange = () => {
    if (onFilterChange) {
      onFilterChange({
        search,
        category,
        payoutType,
        sort,
      });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    handleFilterChange();
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setOpenCategory(false);
    handleFilterChange();
  };

  const handlePayoutTypeChange = (value: string) => {
    setPayoutType(value);
    setOpenPayoutType(false);
    handleFilterChange();
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    handleFilterChange();
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Popover open={openCategory} onOpenChange={setOpenCategory}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCategory}
                className="w-full justify-between sm:w-[200px]"
              >
                {category === "all"
                  ? "All Categories"
                  : categories.find((c) => c.value === category)?.label}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 sm:w-[200px]">
              <Command>
                <CommandInput placeholder="Search categories..." />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((c) => (
                      <CommandItem
                        key={c.value}
                        value={c.value}
                        onSelect={handleCategoryChange}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            category === c.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {c.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover open={openPayoutType} onOpenChange={setOpenPayoutType}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openPayoutType}
                className="w-full justify-between sm:w-[200px]"
              >
                {payoutType === "all"
                  ? "All Payout Types"
                  : payoutTypes.find((p) => p.value === payoutType)?.label}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 sm:w-[200px]">
              <Command>
                <CommandInput placeholder="Search payout types..." />
                <CommandList>
                  <CommandEmpty>No payout type found.</CommandEmpty>
                  <CommandGroup>
                    {payoutTypes.map((p) => (
                      <CommandItem
                        key={p.value}
                        value={p.value}
                        onSelect={handlePayoutTypeChange}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            payoutType === p.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {p.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Tabs
        defaultValue="newest"
        className="w-full"
        onValueChange={handleSortChange}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="closing">Closing Soon</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
