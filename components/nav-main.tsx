"use client";

import { useSearch } from "@/contexts/SearchContext";
import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

interface NavMainProps {
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export function NavMain({ items }: NavMainProps) {
  const { buildQueryParams } = useSearch();
  const router = useRouter();

  const handleClick = useCallback(
    (url: string) => {
      const params = buildQueryParams();
      router.push(`${url}?${params}`);
    },
    [router, buildQueryParams]
  );

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild tooltip={item.name}>
            <a
              href={item.url}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.url);
              }}
            >
              <item.icon />
              <span>{item.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
