"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import FilterInfo from "./filter-info";
import { Filter } from "lucide-react";

export function FilterDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Filter /> <span>Filters</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-5">
        <div className="h-[calc(100vh-200px)] overflow-y-scroll scrollbar-hide">
          <FilterInfo />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
